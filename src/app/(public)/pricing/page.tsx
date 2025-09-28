'use client'
import PayPalButton from '@/components/platform/payments/PayPalButton'

const plans = [
  { id: 'meta-suite-basic', name: 'Meta Marketing Suite', price: '$25/mo', features: ['AI Ads','Reels','Page Ops'] },
  { id: 'listing-portal-basic', name: 'Listing Portal', price: '$39/mo', features: ['Sync','Analytics','Trackers'] },
  { id: 'reality-designer', name: 'Reality Designer', price: '$29/mo', features: ['Sites','Landing Pages','Assets'] },
  { id: 'whatsmap', name: 'WhatsMAP', price: '$20/mo', features: ['WhatsApp Agent','Market Library'] },
]

export default function PricingPage() {
  return (
    <div className="space-y-6" id="plans">
      <h1 className="text-2xl font-semibold">Simple pricing</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {plans.map(p => (
          <div key={p.id} className="rounded-xl border border-white/10 p-5">
            <div className="font-medium">{p.name}</div>
            <div className="text-white/70 text-sm mt-1">{p.price}</div>
            <ul className="mt-3 text-sm list-disc list-inside text-white/70">
              {p.features.map(f => <li key={f}>{f}</li>)}
            </ul>
            <div className="mt-4">
              <PayPalButton planId={p.id} successUrl="/workspace?activated=1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
