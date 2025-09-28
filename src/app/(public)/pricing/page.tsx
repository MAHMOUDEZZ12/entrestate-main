'use client'

import PayPalButton from '@/components/platform/payments/PayPalButton'
import type { PlanId } from '@/lib/payments/utils'

type Plan = {
  id: PlanId
  name: string
  price: string
  features: string[]
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: '$0/mo',
    features: ['Workspace access', 'Sample projects', 'Community resources'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$25/mo',
    features: ['Meta Marketing Suite', 'Listing automation toolkit', 'Priority support'],
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$39/mo',
    features: ['Everything in Pro', 'Advanced analytics', 'Team collaboration'],
  },
  {
    id: 'scale',
    name: 'Scale',
    price: '$59/mo',
    features: ['Everything in Growth', 'Dedicated success manager', 'Custom integrations'],
  },
]

const hasPayPal = !!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID

const planEnvKey = (planId: PlanId) => `NEXT_PUBLIC_PAYPAL_PLAN_ID_${planId.toUpperCase()}`

const missingPlanKeys = plans
  .map((plan) => planEnvKey(plan.id))
  .filter((key) => !process.env[key])

const missingConfig = [
  ...(!hasPayPal ? ['NEXT_PUBLIC_PAYPAL_CLIENT_ID'] : []),
  ...missingPlanKeys,
]

export default function PricingPage() {
  return (
    <div className="space-y-6" id="plans">
      <h1 className="text-2xl font-semibold">Simple pricing</h1>

      {missingConfig.length > 0 && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-amber-200">
          PayPal purchase flow disabled. Set the following environment variables to enable checkout:
          <ul className="mt-2 list-disc list-inside text-xs text-amber-100/80">
            {missingConfig.map((key) => (
              <li key={key}><code className="font-mono">{key}</code></li>
            ))}
          </ul>
          <p className="mt-2">You can still explore the workspace &amp; tools.</p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {plans.map(p => (
          <div key={p.id} className="rounded-xl border border-white/10 p-5">
            <div className="font-medium">{p.name}</div>
            <div className="text-white/70 text-sm mt-1">{p.price}</div>
            <ul className="mt-3 text-sm list-disc list-inside text-white/70">
              {p.features.map(f => <li key={f}>{f}</li>)}
            </ul>
            {hasPayPal && process.env[planEnvKey(p.id)] ? (
              <PayPalButton planId={p.id} successUrl="/workspace?activated=1" className="mt-4 w-full" />
            ) : (
              <a
                href="/workspace"
                className="mt-4 block rounded-md border border-white/10 px-3 py-2 text-center text-sm hover:bg-white/5"
              >
                Explore Workspace
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
