import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Create response (with or without modifications)
  const response = NextResponse.next()

  // ============================================
  // Security Headers
  // ============================================

  // 1. Content Security Policy (CSP)
  // Prevents XSS attacks by controlling which resources can be loaded
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://js.stripe.com https://www.google-analytics.com https://cdn.mux.com https://vercel.live https://*.sentry.io https://static.hotjar.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https: http://localhost:* http://127.0.0.1:*;
    font-src 'self' data: https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://www.youtube.com https://player.vimeo.com https://stream.mux.com;
    connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://*.ingest.sentry.io https://api.stripe.com https://firestore.googleapis.com https://firebase.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://*.cloudfunctions.net https://*.firebaseapp.com https://*.run.app https://region1.google-analytics.com https://*.hotjar.com https://stream.mux.com https://*.mux.com http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* wss://*.vercel.live;
    media-src 'self' blob: https://stream.mux.com https://*.mux.com https://storage.googleapis.com;
    worker-src 'self' blob:;
    manifest-src 'self';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim()

  console.log('🛡️ [Middleware] CSP Header set for:', pathname)

  // 2. X-Frame-Options
  // Prevents clickjacking attacks
  response.headers.set('X-Frame-Options', 'DENY')

  // 3. X-Content-Type-Options
  // Prevents MIME sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // 4. Referrer-Policy
  // Controls how much referrer information should be included
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // 5. Permissions-Policy (formerly Feature-Policy)
  // Controls which browser features can be used
  const permissionsPolicy = [
    'camera=()',
    'microphone=()',
    'geolocation=(self)',
    'interest-cohort=()',
    'payment=(self)',
    'usb=()',
    'magnetometer=()',
    'gyroscope=()',
    'accelerometer=()',
  ].join(', ')
  response.headers.set('Permissions-Policy', permissionsPolicy)

  // 6. Strict-Transport-Security (HSTS)
  // Enforce HTTPS (only in production)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    )
  }

  // 7. X-XSS-Protection (legacy, but still useful for older browsers)
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // 8. X-DNS-Prefetch-Control
  // Control DNS prefetching
  response.headers.set('X-DNS-Prefetch-Control', 'on')

  // 9. Content-Security-Policy
  response.headers.set('Content-Security-Policy', cspHeader)

  // 10. Cross-Origin Policies
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
  response.headers.set('Cross-Origin-Embedder-Policy', 'credentialless')
  response.headers.set('Cross-Origin-Resource-Policy', 'same-site')

  // ============================================
  // Custom Security Headers
  // ============================================

  // Prevent search engine indexing of sensitive pages
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive')
  }

  // ============================================
  // Routing Logic
  // ============================================

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
    return response
  }

  // For role-protected routes, let the RouteGuard components handle the protection
  // This middleware just ensures proper routing structure and adds security headers
  return response
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