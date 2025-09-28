import { ok, bad, readJson } from '@/lib/api'
import { getDb } from '@/lib/firebaseAdmin'
import { PLAN_PRICES, PlanId, normalizeEmail } from '@/lib/payments/utils'

interface CreateOrderBody {
  planId?: PlanId
  plan?: PlanId
  email?: string
}

function paypalBaseUrl() {
  const env = (process.env.PAYPAL_ENV || 'sandbox').toLowerCase()
  return env === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com'
}

async function persistOrder(orderId: string, plan: PlanId, status: string, email?: string) {
  try {
    const db = getDb()
    await db
      .collection('orders')
      .doc(`paypal_${orderId}`)
      .set(
        {
          provider: 'paypal',
          orderId,
          plan,
          email: normalizeEmail(email),
          status,
          ts: new Date(),
        },
        { merge: true },
      )
  } catch (error) {
    console.warn('[paypal] persist order failed (mock env likely)', error)
  }
}

export async function POST(req: Request) {
  const body = await readJson<CreateOrderBody>(req)
  const plan = ((body.planId || body.plan) as PlanId | undefined) ?? 'pro'
  if (!plan) {
    return bad('planId required', 400)
  }

  const clientId = process.env.PAYPAL_CLIENT_ID || ''
  const secret = process.env.PAYPAL_CLIENT_SECRET || ''

  if (!clientId || !secret) {
    const id = `TEST-${plan}-${Date.now()}`
    return ok({ id, status: 'CREATED', mode: 'mock' })
  }

  const price = plan ? PLAN_PRICES[plan] : PLAN_PRICES['pro']
  const auth = Buffer.from(`${clientId}:${secret}`).toString('base64')
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
  })

  const json = await response.json()
  if (!response.ok || !json?.id) {
    return bad(json?.message || 'paypal create failed', 500)
  }

  const status = typeof json.status === 'string' ? json.status : 'CREATED'
  await persistOrder(json.id, plan, status, body.email)
  return ok({ id: json.id, status, mode: 'live' })
}
