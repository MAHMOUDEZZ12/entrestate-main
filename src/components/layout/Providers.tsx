'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { AuthProvider } from '@/lib/auth/provider';
import { Toaster } from '@/components/ui/toaster';

export function Providers({ children }: { children: ReactNode }) {
  // const client = new QueryClient();
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {/* <QueryClientProvider client={client}> */}
      {/* <AuthProvider> */}
        {children}
        <Toaster />
      {/* </AuthProvider> */}
      {/* </QueryClientProvider> */}
    </ThemeProvider>
  );
}
