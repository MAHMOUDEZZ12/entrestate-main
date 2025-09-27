import { ok, bad, readJson } from '@/lib/api';
import { getDb } from '@/lib/firebaseAdmin';
import { PlanId, normalizeEmail } from '@/lib/payments/utils';

interface CaptureOrderBody {
  orderId?: string;
  plan?: PlanId;
  email?: string;
}

function paypalBaseUrl() {
  const env = (process.env.PAYPAL_ENV || 'sandbox').toLowerCase();
  return env === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';
}

async function updateOrder(orderId: string, status: string, email?: string, plan?: PlanId) {
  await getDb()
    .collection('orders')
    .doc(`paypal_${orderId}`)
    .set(
      {
        status,
        email: normalizeEmail(email),
        plan,
        updatedAt: new Date(),
      },
      { merge: true },
    );
}

async function activatePlan(email: string, plan: PlanId) {
  if (!email) return;
  await getDb()
    .collection('users')
    .doc(normalizeEmail(email))
    .set(
      {
        email: normalizeEmail(email),
        plan,
        planActive: true,
        planUpdatedAt: new Date(),
      },
      { merge: true },
    );
}

export async function POST(req: Request) {
  const body = await readJson<CaptureOrderBody>(req);
  const { orderId, plan, email } = body;
  if (!orderId) {
    return bad('orderId required');
  }

  const clientId = process.env.PAYPAL_CLIENT_ID || '';
  const secret = process.env.PAYPAL_CLIENT_SECRET || '';
  if (!clientId || !secret) {
    return bad('paypal not configured', 503);
  }

  const auth = Buffer.from(`${clientId}:${secret}`).toString('base64');
  const response = await fetch(`${paypalBaseUrl()}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    },
  });
  const json = await response.json();
  if (!response.ok) {
    return bad(json?.message || 'paypal capture failed', 500);
  }

  await updateOrder(orderId, 'captured', email, plan);
  if (email && plan) {
    await activatePlan(email, plan);
  }

  return ok(json);
}
