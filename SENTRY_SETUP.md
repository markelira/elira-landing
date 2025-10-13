# Sentry Error Tracking Setup Guide

**Last Updated**: 2025-10-12
**Purpose**: Complete guide for setting up and using Sentry error tracking in production

---

## Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Configuration Files](#configuration-files)
4. [Environment Variables](#environment-variables)
5. [Usage Examples](#usage-examples)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

---

## Overview

Sentry is configured for comprehensive error tracking across three runtime environments:

| Runtime | Configuration File | Purpose |
|---------|-------------------|---------|
| **Browser** | `instrumentation-client.ts` | Client-side errors, session replay, user feedback |
| **Node.js** | `instrumentation-node.ts` | Server-side API errors, background jobs |
| **Edge** | `instrumentation-edge.ts` | Edge runtime middleware errors |

### Key Features Enabled

✅ **Error Tracking** - Automatic error capture across all runtimes
✅ **Performance Monitoring** - Transaction tracing with configurable sampling
✅ **Session Replay** - Visual reproduction of user sessions (10% sampling, 100% on errors)
✅ **User Feedback** - Collect user feedback on errors
✅ **Source Maps** - Automatic upload via Vercel integration
✅ **Release Tracking** - Track errors by git commit SHA
✅ **Context Enrichment** - Custom tags, user context, breadcrumbs

---

## Quick Start

### 1. Create Sentry Project

1. Go to [sentry.io](https://sentry.io) and create an account
2. Create a new project:
   - **Platform**: Next.js
   - **Project Name**: elira-landing (or your preference)
   - **Team**: Your team
3. Copy your **DSN** (Data Source Name)

### 2. Set Environment Variables

**Local Development** (`.env.local`):
```env
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=elira-landing
SENTRY_AUTH_TOKEN=your-auth-token
```

**Vercel** (Settings → Environment Variables):
```
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
SENTRY_ORG=your-org-slug
SENTRY_PROJECT=elira-landing
SENTRY_AUTH_TOKEN=your-auth-token
```

### 3. Get Auth Token (for Source Maps)

1. Go to Sentry → Settings → Developer Settings → Auth Tokens
2. Click "Create New Token"
3. Set scopes:
   - `project:read`
   - `project:releases`
   - `project:write`
   - `org:read`
4. Copy the token and set as `SENTRY_AUTH_TOKEN`

### 4. Verify Setup

```bash
# Development
npm run dev

# Production build (with source map upload)
npm run build

# Check Sentry dashboard for test error
```

---

## Configuration Files

### Client-side (`instrumentation-client.ts`)

**Purpose**: Track errors in the browser (React components, client-side logic)

**Key Configuration**:
```typescript
- Session Replay: 10% of sessions, 100% of error sessions
- Performance Tracing: 10% in production, 100% in development
- User Feedback Integration: Available (manual trigger)
- Error Filtering: ResizeObserver, hydration, chunk loading errors
- Breadcrumbs: Automatic (clicks, navigation, console logs)
```

**What's Tracked**:
- React component errors
- Unhandled promise rejections
- Network request failures
- User interactions (as breadcrumbs)
- Route changes
- Console errors/warnings

**What's Filtered**:
- Browser extension errors
- ResizeObserver errors (browser-specific, not actionable)
- Hydration mismatches (often benign in development)
- Chunk loading errors (network issues, often transient)

### Server-side (`instrumentation-node.ts`)

**Purpose**: Track errors on the server (API routes, server components)

**Key Configuration**:
```typescript
- Performance Tracing: 10% in production, 100% in development
- HTTP Integration: Automatic instrumentation of HTTP requests
- Console Capture: Errors and warnings logged as breadcrumbs
- Spotlight: Enabled in development (local debugging UI)
- Error Filtering: Network timeouts, Firebase transient errors
```

**What's Tracked**:
- API route errors
- Server-side rendering errors
- Database/Firestore errors
- External API failures (Stripe, SendGrid, Mux)
- Background job failures
- Console errors/warnings

**What's Filtered**:
- Network timeouts (ECONNRESET, ETIMEDOUT)
- Firebase transient errors (DEADLINE_EXCEEDED, UNAVAILABLE)
- Connection resets (often client disconnects)

### Edge Runtime (`instrumentation-edge.ts`)

**Purpose**: Track errors in Edge runtime (middleware, edge API routes)

**Key Configuration**:
```typescript
- Performance Tracing: 5% in production (lower due to volume), 100% in development
- Error Filtering: Timeouts, network failures, abort errors
```

**What's Tracked**:
- Middleware errors
- Edge API route errors
- Geolocation/IP-based logic errors

**What's Filtered**:
- Request timeouts (often client-side cancellations)
- Abort errors (user navigation away)
- Network request failures (transient)

---

## Environment Variables

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SENTRY_DSN` | Public DSN for error reporting | `https://abc123@o123.ingest.sentry.io/456` |

### Optional (but recommended for production)

| Variable | Description | Example |
|----------|-------------|---------|
| `SENTRY_ORG` | Organization slug (for source maps) | `your-company` |
| `SENTRY_PROJECT` | Project slug (for source maps) | `elira-landing` |
| `SENTRY_AUTH_TOKEN` | Auth token (for source maps) | `sntrys_abc123...` |
| `NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA` | Git commit SHA (auto-set by Vercel) | Auto |
| `VERCEL_GIT_COMMIT_SHA` | Git commit SHA (server-side, auto-set) | Auto |

---

## Usage Examples

### Manually Capture Errors

```typescript
import * as Sentry from '@sentry/nextjs';

try {
  riskyOperation();
} catch (error) {
  Sentry.captureException(error, {
    tags: {
      section: 'checkout',
      operation: 'payment',
    },
    level: 'error',
  });
}
```

### Add User Context

```typescript
import * as Sentry from '@sentry/nextjs';

// In auth callback or user login
Sentry.setUser({
  id: user.uid,
  email: user.email,
  username: user.displayName,
});

// On logout
Sentry.setUser(null);
```

### Add Custom Tags

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.setTag('subscription_tier', 'premium');
Sentry.setTag('feature_flag', 'new_checkout_enabled');
```

### Add Breadcrumbs

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.addBreadcrumb({
  category: 'payment',
  message: 'User initiated checkout',
  level: 'info',
  data: {
    course_id: 'course-123',
    amount: 49.99,
  },
});
```

### Capture Messages

```typescript
import * as Sentry from '@sentry/nextjs';

// Info message
Sentry.captureMessage('User completed onboarding', 'info');

// Warning
Sentry.captureMessage('Payment retry attempted', 'warning');

// Error
Sentry.captureMessage('Critical: Payment gateway unreachable', 'error');
```

### Performance Monitoring

```typescript
import * as Sentry from '@sentry/nextjs';

const transaction = Sentry.startTransaction({
  name: 'Process Course Enrollment',
  op: 'enrollment',
});

try {
  // Your code
  const span = transaction.startChild({ op: 'firestore.write' });
  await enrollUser(userId, courseId);
  span.finish();

  transaction.setStatus('ok');
} catch (error) {
  transaction.setStatus('internal_error');
  throw error;
} finally {
  transaction.finish();
}
```

### Scoped Context

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.withScope((scope) => {
  scope.setTag('payment_provider', 'stripe');
  scope.setLevel('warning');
  scope.setContext('payment_details', {
    amount: 99.99,
    currency: 'USD',
    customer: 'cus_123',
  });

  Sentry.captureMessage('Payment processed with unusual amount');
});
```

### Error Boundaries (React)

```typescript
'use client';

import * as Sentry from '@sentry/nextjs';
import { ErrorBoundary as SentryErrorBoundary } from '@sentry/nextjs';

export default function MyApp() {
  return (
    <SentryErrorBoundary
      fallback={<ErrorFallback />}
      showDialog
      onError={(error, errorInfo) => {
        console.error('Error caught by boundary:', error);
      }}
    >
      <YourApp />
    </SentryErrorBoundary>
  );
}

function ErrorFallback({ error, resetError }) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={resetError}>Try again</button>
    </div>
  );
}
```

### User Feedback Widget

```typescript
'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function FeedbackButton() {
  const showFeedback = () => {
    const feedback = Sentry.getFeedback();
    if (feedback) {
      feedback.createForm().appendToDom();
    }
  };

  return <button onClick={showFeedback}>Report Issue</button>;
}
```

---

## Best Practices

### 1. Error Grouping

Group related errors together with consistent naming:

```typescript
// Good
throw new Error('Checkout: Payment failed - insufficient funds');
throw new Error('Checkout: Payment failed - invalid card');
throw new Error('Checkout: Payment failed - gateway timeout');

// Bad (creates separate issues for each user)
throw new Error(`Payment failed for ${userId}`);
```

### 2. Add Context Before Errors

Always add context before errors occur:

```typescript
Sentry.setTag('operation', 'enrollment');
Sentry.setContext('enrollment', {
  courseId,
  userId,
  timestamp: new Date().toISOString(),
});

try {
  await enrollUser();
} catch (error) {
  // Error will include above context
  Sentry.captureException(error);
}
```

### 3. Use Appropriate Log Levels

```typescript
// info: Informational, not an error
Sentry.captureMessage('User completed tutorial', 'info');

// warning: Potential issue, not blocking
Sentry.captureMessage('Slow database query detected', 'warning');

// error: Actual error requiring attention
Sentry.captureException(error, { level: 'error' });

// fatal: Critical error, service degradation
Sentry.captureException(error, { level: 'fatal' });
```

### 4. Sample High-Volume Events

For high-traffic endpoints, use sampling:

```typescript
// Only track 10% of successful operations
if (Math.random() < 0.1) {
  Sentry.captureMessage('Checkout completed', 'info');
}

// Always track errors
Sentry.captureException(error);
```

### 5. Scrub Sensitive Data

Never log sensitive information:

```typescript
// Bad
Sentry.setContext('payment', {
  cardNumber: '4111111111111111',  // ❌ PCI violation
  cvv: '123',                       // ❌ PCI violation
});

// Good
Sentry.setContext('payment', {
  last4: '1111',                    // ✅ Safe
  brand: 'visa',                    // ✅ Safe
  customer_id: 'cus_abc123',        // ✅ Safe
});
```

### 6. Test Error Tracking

Create a test error endpoint:

```typescript
// app/api/sentry-test/route.ts
export async function GET() {
  throw new Error('Sentry test error - this is intentional');
}
```

Visit `/api/sentry-test` and check Sentry dashboard.

---

## Troubleshooting

### Errors not appearing in Sentry

**Check**:
1. `NEXT_PUBLIC_SENTRY_DSN` is set correctly
2. DSN starts with `https://` and ends with project ID
3. Restart dev server after setting environment variables
4. Check browser console for Sentry initialization messages
5. Verify network requests to `sentry.io` are not blocked

**Debug**:
```typescript
// Add to instrumentation-client.ts
debug: true,  // Enables verbose logging
```

### Source maps not uploaded

**Check**:
1. `SENTRY_AUTH_TOKEN` is set in Vercel environment variables
2. `SENTRY_ORG` and `SENTRY_PROJECT` match Sentry dashboard
3. Auth token has correct scopes (project:releases, project:write)
4. Build logs show "Uploading source maps to Sentry"

**Manual upload** (if automatic upload fails):
```bash
npx sentry-cli releases new YOUR_RELEASE_NAME
npx sentry-cli releases files YOUR_RELEASE_NAME upload-sourcemaps .next/static
npx sentry-cli releases finalize YOUR_RELEASE_NAME
```

### High event volume / quota exceeded

**Solutions**:
1. Lower `tracesSampleRate` in production (currently 10%)
2. Add more error filters in `beforeSend`
3. Use `ignoreErrors` to filter common non-actionable errors
4. Upgrade Sentry plan for higher quota

**Adjust sampling**:
```typescript
// instrumentation-client.ts
tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.05 : 1.0, // Changed from 0.1 to 0.05
```

### User context not showing

**Solution**:
```typescript
// Ensure user context is set after authentication
useEffect(() => {
  if (user) {
    Sentry.setUser({
      id: user.uid,
      email: user.email,
      username: user.displayName || user.email,
    });
  } else {
    Sentry.setUser(null);
  }
}, [user]);
```

### Session replay not working

**Check**:
1. Session replay is only available on client-side
2. User hasn't opted out of tracking
3. Browser supports session replay (modern browsers only)
4. Replay quota not exceeded in Sentry plan

---

## Sentry Dashboard Tips

### 1. Create Alerts

**Recommended alerts**:
- Error spike: > 10 errors/min
- New error type detected
- Regression (previously resolved error returns)
- Performance degradation: P95 > 3 seconds

### 2. Use Releases

Releases help track which deployment introduced errors:

```bash
# Automatic via Vercel (uses VERCEL_GIT_COMMIT_SHA)
# Manual:
sentry-cli releases new VERSION
sentry-cli releases set-commits --auto VERSION
sentry-cli releases finalize VERSION
```

### 3. Set up Ownership Rules

Assign errors to team members:

```
# .github/CODEOWNERS
path:app/api/payment/** team-backend
path:components/checkout/** team-frontend
```

---

## Cost Optimization

### Free Tier Limits
- **5,000 errors/month**
- **10,000 performance units/month**
- **50 replays/month**

### Staying Within Limits

1. **Lower sample rates in production**:
   ```typescript
   tracesSampleRate: 0.05,  // 5% instead of 10%
   replaysSessionSampleRate: 0.05,  // 5% instead of 10%
   ```

2. **Filter aggressively**:
   - Add common non-actionable errors to `ignoreErrors`
   - Filter low-priority errors in `beforeSend`

3. **Use inbound filters** (Sentry dashboard):
   - Filter by browser version (ignore IE11)
   - Filter by error message patterns
   - Filter by URL patterns

---

**Last Updated**: 2025-10-12
**Maintained by**: Development Team
**Related Docs**:
- `DEPLOYMENT_CHECKLIST.md` - Deployment guide
- `ENV_SETUP.md` - Environment variables
- [Sentry Next.js Docs](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
