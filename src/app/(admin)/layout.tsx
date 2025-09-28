import type { ReactNode } from 'react'
import BrandShell from '@/components/layout/BrandShell'
import { AdminHeader } from '@/components/nav/AdminHeader'
import { Footer } from '@/components/nav/Footer'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <BrandShell>
      <AdminHeader />
      <main className="mx-auto max-w-7xl px-4 py-10">{children}</main>
      <Footer />
    </BrandShell>
  )
}
