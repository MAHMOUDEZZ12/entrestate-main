import Link from 'next/link'
export default function CloudHome() {
  const tiles = [
    { href: '/cloud/market-data', title: 'Market Data', desc: 'Searchable, exportable datasets with SEO views.' },
    { href: '/cloud/agents', title: 'Agents', desc: 'Chat/Search/Mega Listing agents.' },
    { href: '/cloud/reports', title: 'Reports', desc: 'Scheduled + on-demand intelligence.' },
  ]
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tiles.map(t => (
        <Link key={t.href} href={t.href} className="rounded-xl border border-white/10 p-5 hover:bg-white/5">
          <div className="font-medium">{t.title}</div>
          <div className="text-sm text-white/70">{t.desc}</div>
        </Link>
      ))}
    </div>
  )
}
