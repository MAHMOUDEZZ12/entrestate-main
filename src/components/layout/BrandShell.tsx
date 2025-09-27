'use client';

import type { ReactNode } from 'react';
import { AppHeader } from '@/components/nav/AppHeader';
import { AppFooter } from '@/components/nav/AppFooter';

export default function BrandShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <AppHeader />
      <main className="flex-1">{children}</main>
      <AppFooter />
    </div>
  );
}
