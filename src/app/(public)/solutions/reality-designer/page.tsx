import Link from "next/link";

export default function RealityDesigner() {
  const features = [
    ["Instant Sites", "Project pages with capture, analytics, and SEO basics."],
    ["Asset Studio", "Banners, posts, reels scripts, thumbnails."],
    ["Domains", "Attach your domain or use company.entrestate.com."],
    ["Library", "Versioned assets & team share with approvals."],
  ];
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold">Reality Designer</h1>
        <p className="mt-2 text-white/70 max-w-2xl">
          Sites, landing pages, logos, brochures, and ad-ready assets — fast.
        </p>
        <div className="mt-4 flex gap-3">
          <Link href="/pricing#plans" className="rounded-md bg-white text-black px-4 py-2.5 text-sm font-medium">Start for $29/mo</Link>
          <Link href="/workspace/tools/brochure-rebrand" className="rounded-md border border-white/10 px-4 py-2.5 text-sm hover:bg-white/5">Rebrand a Brochure</Link>
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
