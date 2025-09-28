import Link from "next/link";

export default function Marketplace() {
  const items = [
    { title: "Meta Marketing Suite", price: "$25/mo", href: "/pricing#plans", desc: "Ads, audiences, reels, page ops — unified." },
    { title: "Listing Portal",      price: "$39/mo", href: "/pricing#plans", desc: "Generate, sync, analyze listings at scale." },
    { title: "Reality Designer",    price: "$29/mo", href: "/pricing#plans", desc: "Sites, landing pages, assets, domains." },
    { title: "WhatsMAP",           price: "$20/mo", href: "/pricing#plans", desc: "WhatsApp market agent — 24/7." },
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Marketplace</h1>
      <p className="text-white/70">Pick a product to activate now. You can add more in Workspace.</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <Link key={i.title} href={i.href} className="rounded-xl border border-white/10 p-5 hover:bg-white/5">
            <div className="font-medium">{i.title}</div>
            <div className="text-sm text-white/70">{i.desc}</div>
            <div className="mt-3 text-sm text-white/80">{i.price}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
