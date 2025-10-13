import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Environment
  environment: process.env.NODE_ENV || 'development',

  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || process.env.VERCEL_GIT_COMMIT_SHA,

  // Performance monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Debug mode (only in development)
  debug: process.env.NODE_ENV === 'development',

  // Spotlight for local development
  spotlight: process.env.NODE_ENV === 'development',

  // Integrations for Node.js
  integrations: [
    // Automatically instrument Node.js http module
    Sentry.httpIntegration({ tracing: true }),

    // Capture console logs as breadcrumbs
    Sentry.captureConsoleIntegration({
      levels: ['error', 'warn'],
    }),
  ],

  // Error filtering and sampling
  beforeSend(event, hint) {
    // Filter out Firebase Admin SDK timeout errors (usually transient)
    if (event.message?.includes('DEADLINE_EXCEEDED') ||
        event.message?.includes('UNAVAILABLE')) {
      return null;
    }

    // Filter out expected errors
    const ignoredErrors = [
      'ECONNRESET',
      'ENOTFOUND',
      'ETIMEDOUT',
      'Client network socket disconnected',
    ];

    if (event.message && ignoredErrors.some(err => event.message?.includes(err))) {
      return null;
    }

    // Add server context
    event.tags = {
      ...event.tags,
      runtime: 'nodejs',
      'app.version': process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'dev',
    };

    return event;
  },

  // Ignore specific errors
  ignoreErrors: [
    'ECONNRESET',
    'ENOTFOUND',
    'ETIMEDOUT',
    'Client network socket disconnected before secure TLS connection was established',
    /Firebase.*DEADLINE_EXCEEDED/,
    /Firebase.*UNAVAILABLE/,
  ],

  // Track performance of these operations
  tracePropagationTargets: [
    'localhost',
    /^https:\/\/[a-z0-9-]+\.firebaseapp\.com/,
    /^https:\/\/[a-z0-9-]+\.cloudfunctions\.net/,
    /^https:\/\/firestore\.googleapis\.com/,
  ],
});
