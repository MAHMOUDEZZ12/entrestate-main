'use client'

import type { ReactNode } from 'react'
import { Toaster } from '@/components/ui/toaster'

export default function BrandShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {children}
      <Toaster />
    </div>
  )
}
