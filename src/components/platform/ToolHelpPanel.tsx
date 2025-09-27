import type { ReactNode } from 'react';

interface ToolHelpPanelProps {
  title: string;
  description: string;
  tips: { label: string; detail: string }[];
  footer?: ReactNode;
}

export function ToolHelpPanel({ title, description, tips, footer }: ToolHelpPanelProps) {
  return (
    <aside className="space-y-4 rounded-2xl border bg-muted/30 p-5 lg:sticky lg:top-24 lg:h-max">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <ul className="space-y-3">
        {tips.map((tip) => (
          <li key={tip.label} className="rounded-xl border border-dashed border-primary/30 bg-background/80 px-3 py-2">
            <p className="text-sm font-medium text-foreground">{tip.label}</p>
            <p className="text-xs text-muted-foreground">{tip.detail}</p>
          </li>
        ))}
      </ul>
      {footer ? <div className="border-t pt-3 text-xs text-muted-foreground">{footer}</div> : null}
    </aside>
  );
}
