import Link from "next/link";

export default function MetaSuite() {
  const features = [
    ["AI Ad Creator", "Compliant, high-performing copy + creative variants."],
    ["Precision Targeting", "Audiences, lookalikes, Advantage+ coverage."],
    ["Reels & Social", "Reel scripts, posts, and scheduling workflows."],
    ["Landing Pages", "Instant pages with capture + CRM memory."],
  ];
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold">Meta Marketing Suite</h1>
        <p className="mt-2 text-white/70 max-w-2xl">
          Ads, audiences, reels, page ops — fully packaged for real estate performance.
        </p>
        <div className="mt-4 flex gap-3">
          <Link href="/pricing#plans" className="rounded-md bg-white text-black px-4 py-2.5 text-sm font-medium">Start for $25/mo</Link>
          <Link href="/workspace/tools/meta-audit" className="rounded-md border border-white/10 px-4 py-2.5 text-sm hover:bg-white/5">Run a free Meta Audit</Link>
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
