import Link from 'next/link'
export default function AdminHome() {
  const tiles = [
    { href: '/admin/plans', title: 'Plans' },
    { href: '/admin/orders', title: 'Orders' },
    { href: '/admin/agents', title: 'Agents' },
  ]
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tiles.map(t => (
        <Link key={t.href} href={t.href} className="rounded-xl border border-white/10 p-6 hover:bg-white/5">
          <div className="font-medium">{t.title}</div>
          <div className="text-sm text-white/70">Open</div>
        </Link>
      ))}
    </div>
  )
}
