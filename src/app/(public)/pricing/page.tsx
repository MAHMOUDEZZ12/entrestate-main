'use client'

import PayPalButton from '@/components/platform/payments/PayPalButton'

const plans = [
  { id: 'meta-suite-basic', name: 'Meta Marketing Suite', price: '$25/mo', features: ['AI Ads','Reels','Page Ops'] },
  { id: 'listing-portal-basic', name: 'Listing Portal', price: '$39/mo', features: ['Sync','Analytics','Trackers'] },
  { id: 'reality-designer', name: 'Reality Designer', price: '$29/mo', features: ['Sites','Landing Pages','Assets'] },
  { id: 'whatsmap', name: 'WhatsMAP', price: '$20/mo', features: ['WhatsApp Agent','Market Library'] },
]

const hasPayPal = !!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID

export default function PricingPage() {
  return (
    <div className="space-y-6" id="plans">
      <h1 className="text-2xl font-semibold">Simple pricing</h1>

      {!hasPayPal && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-amber-200">
          PayPal sandbox not configured. Set <code className="font-mono">NEXT_PUBLIC_PAYPAL_CLIENT_ID</code> to enable purchase.
          You can still explore the workspace & tools.
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
            {hasPayPal ? (
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
