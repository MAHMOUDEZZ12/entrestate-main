import '@/app/globals.css';
import type { ReactNode } from 'react';
import BrandShell from '@/components/layout/BrandShell';
import { Providers } from '@/components/layout/Providers';

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <BrandShell>
        <div className="mx-auto w-full max-w-7xl px-4 py-10">
          {children}
        </div>
      </BrandShell>
    </Providers>
  );
}
