import type { ReactNode } from 'react'
import BrandShell from '@/components/layout/BrandShell'
import { WorkspaceHeader } from '@/components/nav/WorkspaceHeader'
import { Footer } from '@/components/nav/Footer'

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <BrandShell>
      <WorkspaceHeader />
      <main className="mx-auto max-w-7xl px-4 py-10">{children}</main>
      <Footer />
    </BrandShell>
  )
}
