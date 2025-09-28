import { ok, bad, readJson } from '@/lib/api'
import { getDb } from '@/lib/firebaseAdmin'
import { PlanId, normalizeEmail } from '@/lib/payments/utils'

interface CaptureOrderBody {
  orderId?: string
  planId?: PlanId
  plan?: PlanId
  email?: string
}

function paypalBaseUrl() {
  const env = (process.env.PAYPAL_ENV || 'sandbox').toLowerCase()
  return env === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com'
}

async function updateOrder(orderId: string, status: string, email?: string, plan?: PlanId) {
  try {
    const db = getDb()
    await db
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
      )
  } catch (error) {
    console.warn('[paypal] order update skipped (mock env likely)', error)
  }
}

async function activatePlan(email: string, plan: PlanId) {
  try {
    if (!email) return
    const db = getDb()
    await db
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
      )
  } catch (error) {
    console.warn('[paypal] activation skipped (mock env likely)', error)
  }
}

export async function POST(req: Request) {
  const body = await readJson<CaptureOrderBody>(req)
  const orderId = body.orderId
  const plan = (body.planId || body.plan) as PlanId | undefined
  const email = body.email

  if (!orderId) {
    return bad('orderId required', 400)
  }

  const clientId = process.env.PAYPAL_CLIENT_ID || ''
  const secret = process.env.PAYPAL_CLIENT_SECRET || ''
  if (!clientId || !secret) {
    const status = 'COMPLETED'
    const record = { orderId, planId: plan ?? 'unknown', status, ts: new Date().toISOString(), mode: 'mock' }
    await updateOrder(orderId, status.toLowerCase(), email, plan)
    if (email && plan) {
      await activatePlan(email, plan)
    }
    return ok(record)
  }

  const auth = Buffer.from(`${clientId}:${secret}`).toString('base64')
  const response = await fetch(`${paypalBaseUrl()}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    },
  })
  const json = await response.json()
  if (!response.ok) {
    return bad(json?.message || 'paypal capture failed', 500)
  }

  const status = typeof json.status === 'string' ? json.status : 'CAPTURED'
  await updateOrder(orderId, status.toLowerCase(), email, plan)
  if (email && plan) {
    await activatePlan(email, plan)
  }

  return ok({ orderId, planId: plan ?? 'unknown', status, ts: new Date().toISOString(), mode: 'live' })
}
