import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPrefixes = [
  '/workspace',
  '/admin',
  // '/cloud', // uncomment if you want cloud gated too
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (protectedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    // TODO: add your auth check here; otherwise redirect to /auth
    // const authorized = ...
    // if (!authorized) return NextResponse.redirect(new URL('/auth', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: protectedPrefixes.map((prefix) => `${prefix}/:path*`),
};
