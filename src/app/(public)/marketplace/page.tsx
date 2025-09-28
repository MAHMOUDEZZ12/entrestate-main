import Link from 'next/link'
export default function Marketplace() {
  const items = [
    { title: 'Meta Marketing Suite', price: '$25/mo', href: '/pricing#plans' },
    { title: 'Listing Portal', price: '$39/mo', href: '/pricing#plans' },
    { title: 'Reality Designer', price: '$29/mo', href: '/pricing#plans' },
    { title: 'WhatsMAP', price: '$20/mo', href: '/pricing#plans' },
  ]
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Marketplace</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map(i => (
          <Link key={i.title} href={i.href} className="rounded-xl border border-white/10 p-5 hover:bg-white/5">
            <div className="font-medium">{i.title}</div>
            <div className="text-sm text-white/70">{i.price}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
