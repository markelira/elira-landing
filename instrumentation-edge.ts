import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Environment
  environment: process.env.NODE_ENV || 'development',

  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || process.env.VERCEL_GIT_COMMIT_SHA,

  // Performance monitoring (lower sample rate for edge due to higher volume)
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.05 : 1.0,

  // Debug mode (only in development)
  debug: process.env.NODE_ENV === 'development',

  // Error filtering
  beforeSend(event, hint) {
    // Filter out common edge runtime errors
    const ignoredErrors = [
      'timeout',
      'AbortError',
      'Network request failed',
    ];

    if (event.message && ignoredErrors.some(err => event.message?.includes(err))) {
      return null;
    }

    // Add edge runtime context
    event.tags = {
      ...event.tags,
      runtime: 'edge',
      'app.version': process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'dev',
    };

    return event;
  },

  // Ignore specific errors
  ignoreErrors: [
    'timeout',
    'AbortError',
    'Network request failed',
    /The operation was aborted/,
  ],
});
