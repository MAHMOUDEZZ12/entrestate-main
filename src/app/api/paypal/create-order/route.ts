import { ok, bad, readJson } from '@/lib/api';
import { getDb } from '@/lib/firebaseAdmin';
import { PLAN_PRICES, PlanId, normalizeEmail } from '@/lib/payments/utils';

interface CreateOrderBody {
  plan?: PlanId;
  email?: string;
}

function paypalBaseUrl() {
  const env = (process.env.PAYPAL_ENV || 'sandbox').toLowerCase();
  return env === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';
}

async function persistOrder(orderId: string, plan: PlanId, email?: string) {
  await getDb()
    .collection('orders')
    .doc(`paypal_${orderId}`)
    .set(
      {
        provider: 'paypal',
        orderId,
        plan,
        email: normalizeEmail(email),
        status: 'created',
        ts: new Date(),
      },
      { merge: true },
    );
}

export async function POST(req: Request) {
  const body = await readJson<CreateOrderBody>(req);
  const plan: PlanId = body.plan || 'starter';
  const clientId = process.env.PAYPAL_CLIENT_ID || '';
  const secret = process.env.PAYPAL_CLIENT_SECRET || '';

  if (!clientId || !secret) {
    return bad('paypal not configured', 503);
  }

  const price = PLAN_PRICES[plan] || PLAN_PRICES.starter;
  const auth = Buffer.from(`${clientId}:${secret}`).toString('base64');
  const response = await fetch(`${paypalBaseUrl()}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: { currency_code: 'USD', value: price },
          custom_id: plan,
        },
      ],
    }),
  });

  const json = await response.json();
  if (!response.ok) {
    return bad(json?.message || 'paypal create failed', 500);
  }

  await persistOrder(json.id, plan, body.email);
  return ok({ id: json.id });
}
