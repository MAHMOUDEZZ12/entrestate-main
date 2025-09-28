import type { ReactNode } from 'react'
import BrandShell from '@/components/layout/BrandShell'
import { CloudHeader } from '@/components/nav/CloudHeader'
import { Footer } from '@/components/nav/Footer'

export default function CloudLayout({ children }: { children: ReactNode }) {
  return (
    <BrandShell>
      <CloudHeader />
      <main className="mx-auto max-w-7xl px-4 py-10">{children}</main>
      <Footer />
    </BrandShell>
  )
}
