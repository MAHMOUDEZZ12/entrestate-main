'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/(platform)/workspace', label: 'Workspace' },
  { href: '/(platform)/cloud', label: 'Cloud' },
  { href: '/(platform)/admin', label: 'Admin' },
];

export function AppHeader() {
  const pathname = usePathname();
  return (
    <header className="border-b bg-white/70 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">ENTRESTATE</Link>
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => {
            const normalized = n.href.replace('/(platform)', '');
            const isActive = pathname === n.href || pathname === normalized;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`text-sm hover:opacity-80 ${isActive ? 'font-semibold' : 'text-muted-foreground'}`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/pricing"><Button size="sm">Pricing</Button></Link>
          <Link href="/auth"><Button size="sm" variant="outline">Sign in</Button></Link>
        </div>
      </div>
    </header>
  );
}
