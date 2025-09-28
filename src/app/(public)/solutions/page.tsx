export default function SolutionsIndex() {
  const items = [
    {
      href: "/solutions/meta-suite",
      title: "Meta Marketing Suite",
      punch: "All Meta growth, one panel.",
      bullets: ["AI ads & creatives", "Reels + posts", "Page ops & sanity checks"],
    },
    {
      href: "/solutions/listing-portal",
      title: "Listing Portal",
      punch: "From listing to MEGA Listing.",
      bullets: ["Smart sync to portals/site", "Media & title lab", "Visit tracking & alerts"],
    },
    {
      href: "/solutions/reality-designer",
      title: "Reality Designer",
      punch: "Sites, landing, assets, domains.",
      bullets: ["Instant sites", "Brand assets", "Domain connect"],
    },
    {
      href: "/solutions/whatsmap",
      title: "WhatsMAP",
      punch: "WhatsApp market agent 24/7.",
      bullets: ["Market library", "Sales packs", "APIs"],
    },
  ];
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold">Solutions</h1>
        <p className="mt-2 text-white/70 max-w-2xl">
          Four flagship engines that feel like one product — discover, list, market, and sell faster.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <a key={c.href} href={c.href} className="rounded-xl border border-white/10 p-5 hover:bg-white/5">
            <div className="font-semibold">{c.title}</div>
            <div className="text-sm text-white/70 mt-1">{c.punch}</div>
            <ul className="mt-3 text-sm text-white/70 list-disc list-inside space-y-1">
              {c.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </a>
        ))}
      </div>
    </div>
  );
}
