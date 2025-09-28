import Link from 'next/link'

const metrics = [
  { label: 'Listings Enhanced', value: '87K+' },
  { label: 'Global Agents Onboarded', value: '12,400' },
  { label: 'Average Activation Time', value: '48 hrs' },
]

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-gradient-to-br from-cyan-900/40 via-indigo-900/40 to-amber-900/40 p-8 ring-1 ring-white/10">
        <div className="text-xs mb-3 tracking-wider text-white/70">ENTRESTATE PLATFORM</div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">The AI operating system for real estate brands.</h1>
        <p className="mt-4 max-w-2xl text-white/70">
          Deploy an always-on growth engine with market intelligence, omni-channel campaigns,
          and white-glove automations — all within your branded experience.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/workspace" className="rounded-md bg-white text-black px-4 py-2.5 text-sm font-medium">Launch Workspace</Link>
          <Link href="/solutions" className="rounded-md border border-white/10 px-4 py-2.5 text-sm hover:bg-white/5">Explore Solutions</Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {metrics.map(m => (
            <div key={m.label} className="rounded-xl border border-white/10 p-4">
              <div className="text-xs text-white/60">{m.label}</div>
              <div className="text-2xl font-semibold">{m.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Meta Marketing Suite', href: '/solutions/meta-suite', desc: 'Ads, audiences, reels, page ops — unified.' },
          { title: 'Listing Portal', href: '/solutions/listing-portal', desc: 'Generate, sync, analyze listings at scale.' },
          { title: 'Reality Designer', href: '/solutions/reality-designer', desc: 'Sites, landing pages, assets, domains.' },
          { title: 'WhatsMAP', href: '/solutions/whatsmap', desc: 'WhatsApp market agent — 24/7.' },
        ].map((c) => (
          <Link key={c.href} href={c.href} className="rounded-xl border border-white/10 p-5 hover:bg-white/5">
            <div className="font-semibold">{c.title}</div>
            <div className="text-sm text-white/70 mt-1">{c.desc}</div>
          </Link>
        ))}
      </section>
    </div>
  )
}
