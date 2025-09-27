import type { ReactNode } from 'react';

interface ToolLayoutProps {
  form: ReactNode;
  helpPanel: ReactNode;
}

export function ToolLayout({ form, helpPanel }: ToolLayoutProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6">
        {form}
      </div>
      {helpPanel}
    </div>
  );
}
