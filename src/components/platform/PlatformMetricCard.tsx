import type { ReactNode } from 'react';

interface PlatformMetricCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  trend?: string;
  description?: string;
}

export function PlatformMetricCard({ icon, title, value, trend, description }: PlatformMetricCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-card p-5 shadow-sm">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-primary">
        {icon}
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-2xl font-semibold text-foreground">{value}</p>
        {trend ? <p className="text-xs text-emerald-500">{trend}</p> : null}
      </div>
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
    </div>
  );
}
