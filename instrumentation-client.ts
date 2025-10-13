import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Environment
  environment: process.env.NODE_ENV || 'development',

  // Release tracking
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,

  // Performance monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Session replay
  replaysSessionSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 0.5,
  replaysOnErrorSampleRate: 1.0,

  // Debug mode (only in development)
  debug: process.env.NODE_ENV === 'development',

  // Integrations
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
      maskAllInputs: true,
    }),
    Sentry.browserTracingIntegration({
      // Track all route changes
      tracePropagationTargets: ['localhost', /^\//],
    }),
    Sentry.feedbackIntegration({
      // Enable user feedback collection
      colorScheme: 'light',
      autoInject: false, // Manually inject when needed
    }),
  ],

  // Error filtering and sampling
  beforeSend(event, hint) {
    // Filter out low-priority browser errors
    const lowPriorityErrors = [
      'ResizeObserver',
      'Non-Error promise rejection',
      'Non-Error exception captured',
      'ChunkLoadError',
      'Loading chunk',
      'SecurityError',
    ];

    if (event.message && lowPriorityErrors.some(err => event.message?.includes(err))) {
      return null;
    }

    // Filter out errors from browser extensions
    if (event.exception?.values?.[0]?.stacktrace?.frames?.some(
      frame => frame.filename?.includes('extension://')
    )) {
      return null;
    }

    // Add custom context
    if (event.user) {
      event.user.ip_address = '{{auto}}'; // Use Sentry's IP detection
    }

    return event;
  },

  // Ignore specific errors
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',
    'Non-Error exception captured',
    'ChunkLoadError',
    'Loading chunk',
    /^Hydration/,
    /^Minified React error/,
  ],

  // Additional context
  initialScope: {
    tags: {
      'runtime': 'browser',
      'app.version': process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'dev',
    },
  },
});
