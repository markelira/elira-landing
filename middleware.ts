import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Allow public routes
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname === '/' ||
    pathname === '/auth' ||
    pathname === '/privacy' ||
    pathname === '/terms' ||
    pathname.startsWith('/public')
  ) {
    return NextResponse.next()
  }

  // For role-protected routes, let the RouteGuard components handle the protection
  // This middleware just ensures proper routing structure
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}