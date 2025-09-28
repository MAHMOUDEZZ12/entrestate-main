import type { ReactNode } from 'react'
import BrandShell from '@/components/layout/BrandShell'
import { PublicHeader } from '@/components/nav/PublicHeader'
import { Footer } from '@/components/nav/Footer'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <BrandShell>
      <PublicHeader />
      <main className="mx-auto max-w-7xl px-4 py-10">{children}</main>
      <Footer />
    </BrandShell>
  )
}
