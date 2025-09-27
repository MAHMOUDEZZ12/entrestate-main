import { ok, bad, readJson } from '@/lib/api';
import { getDb } from '@/lib/firebaseAdmin';
import { PLAN_PRICES, PlanId, normalizeEmail } from '@/lib/payments/utils';

interface CreateSessionBody {
  plan?: PlanId;
  email?: string;
}

async function persistStripeSession(sessionId: string, plan: PlanId, email?: string) {
  await getDb()
    .collection('orders')
    .doc(`stripe_${sessionId}`)
    .set(
      {
        provider: 'stripe',
        sessionId,
        plan,
        email: normalizeEmail(email),
        status: 'created',
        ts: new Date(),
      },
      { merge: true },
    );
}

export async function POST(req: Request) {
  const body = await readJson<CreateSessionBody>(req);
  const plan: PlanId = body.plan || 'starter';
  const publishable = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
  const secret = process.env.STRIPE_SECRET_KEY || '';

  if (!publishable || !secret) {
    return bad('stripe not configured', 503);
  }

  const amount = Math.round(parseFloat(PLAN_PRICES[plan] || PLAN_PRICES.starter) * 100);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const params = new URLSearchParams({
    mode: 'payment',
    success_url: `${siteUrl}/pricing?success=1`,
    cancel_url: `${siteUrl}/pricing?canceled=1`,
    'line_items[0][price_data][currency]': 'usd',
    'line_items[0][price_data][product_data][name]': plan,
    'line_items[0][price_data][unit_amount]': String(amount),
    'line_items[0][quantity]': '1',
  });

  if (body.email) {
    params.set('customer_email', normalizeEmail(body.email));
    params.set('metadata[email]', normalizeEmail(body.email));
  }

  params.set('metadata[plan]', plan);

  const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  const json = await response.json();
  if (!response.ok) {
    return bad(json?.error?.message || 'stripe create failed', 500);
  }

  await persistStripeSession(json.id, plan, body.email);
  return ok({ id: json.id });
}
