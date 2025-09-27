import type { ReactNode } from 'react';

interface PlatformHeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  actions?: ReactNode;
  achievements?: { label: string; value: string }[];
  className?: string;
}

export function PlatformHero({ eyebrow, title, subtitle, actions, achievements, className }: PlatformHeroProps) {
  return (
    <section
      className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br from-slate-950 via-indigo-900 to-slate-900 p-8 text-white shadow-xl ${className ?? ''}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18)_0%,_rgba(255,255,255,0)_55%)]" />
      <div className="relative flex flex-col gap-6">
        <div className="max-w-2xl space-y-4">
          {eyebrow ? (
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/80">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="text-3xl font-semibold md:text-4xl">{title}</h1>
          <p className="text-base text-white/80 md:text-lg">{subtitle}</p>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        {achievements && achievements.length ? (
          <dl className="grid gap-4 md:grid-cols-3">
            {achievements.map((item) => (
              <div
                key={`${item.label}-${item.value}`}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
              >
                <dt className="text-xs uppercase tracking-wide text-white/70">{item.label}</dt>
                <dd className="mt-1 text-2xl font-semibold text-white">{item.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
