import './globals.css'
import type { ReactNode } from 'react'
import { Providers } from '@/components/layout/Providers'

export const metadata = {
  title: 'Entrestate - The Market Assistant for Real Estate',
  description: 'Discover, list, market, and sell — faster than ever.',
}
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
