import Link from "next/link";

export default function ListingPortal() {
  const features = [
    ["Smart Sync", "Push to Property Finder, Bayut, and your site with diffs + history."],
    ["Media Optimizer", "Auto-check resolution, aspect, and order; flag low performers."],
    ["Title Lab", "Rotate titles & copy with safe tests; measure uplift automatically."],
    ["Visit Tracking", "See traction; trigger follow-ups via ESTChat."],
  ];
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold">Listing Portal</h1>
        <p className="mt-2 text-white/70 max-w-2xl">
          Generate, sync, and analyze listings. Turn every listing into a MEGA Listing.
        </p>
        <div className="mt-4 flex gap-3">
          <Link href="/pricing#plans" className="rounded-md bg-white text-black px-4 py-2.5 text-sm font-medium">Start for $39/mo</Link>
          <Link href="/workspace/tools/listing-health" className="rounded-md border border-white/10 px-4 py-2.5 text-sm hover:bg-white/5">Try Listing Health</Link>
        </div>
      </header>
      <section className="grid gap-4 md:grid-cols-2">
        {features.map(([title, desc]) => (
          <div key={title} className="rounded-xl border border-white/10 p-5">
            <div className="font-medium">{title}</div>
            <div className="text-sm text-white/70">{desc}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
