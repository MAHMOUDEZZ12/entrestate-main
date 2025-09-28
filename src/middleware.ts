import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const pathname = url.pathname

  const demoUser = req.cookies.get('demo-user')?.value
  const isAdmin = demoUser === 'admin'

  if (pathname.startsWith('/admin') && !isAdmin) {
    const redirectUrl = new URL('/pricing', req.url)
    redirectUrl.searchParams.set('need', 'admin')
    return NextResponse.redirect(redirectUrl)
  }

  const activatedViaQuery = url.searchParams.get('activated') === '1'
  const hasActivatedCookie = req.cookies.get('activated')?.value === '1'
  const isActivated = activatedViaQuery || hasActivatedCookie

  if (activatedViaQuery) {
    const cleanUrl = new URL(req.url)
    cleanUrl.searchParams.delete('activated')
    const res = NextResponse.redirect(cleanUrl)
    res.cookies.set('activated', '1', { path: '/', httpOnly: false })
    return res
  }

  if (pathname.startsWith('/workspace/tools') && !isActivated) {
    const redirectUrl = new URL('/pricing', req.url)
    redirectUrl.searchParams.set('need', 'activation')
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/workspace/:path*'],
}
