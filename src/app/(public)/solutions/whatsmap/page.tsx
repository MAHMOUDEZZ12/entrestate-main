import Link from "next/link";

export default function WhatsMap() {
  const features = [
    ["Market Library", "Developers, projects, specs, pricing snapshots."],
    ["Lead Ops", "Qualify, route, and follow-up templates in any language."],
    ["Sales Packs", "One-tap multi-project offers assembled for a client."],
    ["APIs", "Bring WhatsMAP into your CRM or site chatbot."],
  ];
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-semibold">WhatsMAP</h1>
        <p className="mt-2 text-white/70 max-w-2xl">
          Your WhatsApp market assistant. Ask for projects, availability, prices, brochures, or campaign assets — 24/7.
        </p>
        <div className="mt-4 flex gap-3">
          <Link href="/pricing#plans" className="rounded-md bg-white text-black px-4 py-2.5 text-sm font-medium">Start for $20/mo</Link>
          <Link href="/workspace" className="rounded-md border border-white/10 px-4 py-2.5 text-sm hover:bg-white/5">Open Workspace</Link>
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
