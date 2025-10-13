# Environment Variables Setup Guide

**Last Updated**: 2025-10-12
**Purpose**: Complete guide for setting up environment variables for production deployment

---

## Overview

The Elira Landing Platform requires environment variables for:
- **Frontend (Next.js on Vercel)**: Public Firebase config, API keys, analytics
- **Backend (Firebase Functions)**: Private API keys, secrets, service accounts

---

## Table of Contents

1. [Frontend Environment Variables (Vercel)](#frontend-environment-variables-vercel)
2. [Backend Environment Variables (Firebase Functions)](#backend-environment-variables-firebase-functions)
3. [Setup Instructions](#setup-instructions)
4. [Security Best Practices](#security-best-practices)
5. [Troubleshooting](#troubleshooting)

---

## Frontend Environment Variables (Vercel)

### Firebase Configuration (Required)

These are **public** variables exposed to the client. They're safe to commit to version control.

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web API Key | `AIzaSyC...` | ✅ Yes |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | `project-id.firebaseapp.com` | ✅ Yes |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID | `elira-landing-ce927` | ✅ Yes |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | `project-id.appspot.com` | ✅ Yes |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID | `123456789012` | ✅ Yes |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase App ID | `1:123:web:abc` | ✅ Yes |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Firebase Analytics Measurement ID | `G-XXXXXXXXXX` | ⚠️ Optional |

**Where to find these values**:
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Click the gear icon ⚙️ → Project settings
4. Scroll down to "Your apps" → Web apps → SDK setup and configuration
5. Copy the `firebaseConfig` object values

### Firebase Admin SDK (Server-side - PRIVATE)

⚠️ **NEVER commit these to version control!**

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `FIREBASE_PROJECT_ID` | Firebase Project ID (same as above) | `elira-landing-ce927` | ✅ Yes |
| `FIREBASE_CLIENT_EMAIL` | Service Account Email | `firebase-adminsdk-xxx@project.iam.gserviceaccount.com` | ✅ Yes |
| `FIREBASE_PRIVATE_KEY` | Service Account Private Key | `"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"` | ✅ Yes |

**Where to find these values**:
1. Go to [Firebase Console](https://console.firebase.google.com) → Project settings
2. Click "Service accounts" tab
3. Click "Generate new private key"
4. Download the JSON file
5. Extract values from the JSON:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (keep `\n` newlines!)

### Stripe (Required for Payments)

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Publishable Key (public) | `pk_live_...` or `pk_test_...` | ✅ Yes |
| `STRIPE_SECRET_KEY` | Stripe Secret Key (PRIVATE) | `sk_live_...` or `sk_test_...` | ✅ Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook Signing Secret | `whsec_...` | ✅ Yes |

**Where to find these values**:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Click "Developers" → "API keys"
3. Copy "Publishable key" and "Secret key"
4. For webhook secret:
   - Go to "Developers" → "Webhooks"
   - Click on your webhook endpoint (or create one)
   - Copy "Signing secret"

**Webhook Setup**:
- **Endpoint URL**: `https://your-domain.com/api/webhooks/stripe`
- **Events to listen**: `checkout.session.completed`, `payment_intent.succeeded`, `customer.subscription.updated`

### Mux (Required for Video Hosting)

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_MUX_ENV_KEY` | Mux Environment Key (public) | `env-xxx...` | ⚠️ Optional |
| `MUX_TOKEN_ID` | Mux Access Token ID (PRIVATE) | `xxx...` | ✅ Yes (if using Mux) |
| `MUX_TOKEN_SECRET` | Mux Access Token Secret (PRIVATE) | `yyy...` | ✅ Yes (if using Mux) |
| `MUX_SIGNING_KEY` | Mux Signing Key (PRIVATE) | `zzz...` | ⚠️ Optional |
| `MUX_SIGNING_KEY_ID` | Mux Signing Key ID (PRIVATE) | `aaa...` | ⚠️ Optional |

**Where to find these values**:
1. Go to [Mux Dashboard](https://dashboard.mux.com)
2. Click "Settings" → "Access Tokens"
3. Create new token with permissions: `Mux Video` (Read + Write)
4. Copy Token ID and Token Secret
5. For signing keys (optional, for private playback):
   - Go to "Settings" → "Signing Keys"
   - Create new signing key
   - Copy Signing Key ID and Signing Key

### SendGrid (Required for Email)

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `SENDGRID_API_KEY` | SendGrid API Key (PRIVATE) | `SG.xxx...` | ✅ Yes |
| `SENDGRID_FROM_EMAIL` | Verified Sender Email | `noreply@elira.hu` | ✅ Yes |

**Where to find these values**:
1. Go to [SendGrid Dashboard](https://app.sendgrid.com)
2. Click "Settings" → "API Keys"
3. Create new API key with "Full Access"
4. Copy the API key (shown only once!)
5. For sender email:
   - Go to "Settings" → "Sender Authentication"
   - Verify your domain or email address
   - Use the verified email

### Sentry (Optional - Error Tracking)

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry DSN (public) | `https://xxx@yyy.ingest.sentry.io/zzz` | ⚠️ Optional |
| `SENTRY_ORG` | Sentry Organization Slug | `your-org` | ⚠️ Optional |
| `SENTRY_PROJECT` | Sentry Project Slug | `elira-landing` | ⚠️ Optional |
| `SENTRY_AUTH_TOKEN` | Sentry Auth Token (PRIVATE) | `sntrys_xxx...` | ⚠️ Optional |

**Where to find these values**:
1. Go to [Sentry Dashboard](https://sentry.io)
2. Select your project
3. Click "Settings" → "Client Keys (DSN)"
4. Copy the DSN
5. For auth token (for source maps):
   - Go to "Settings" → "Developer Settings" → "Auth Tokens"
   - Create new token with scope: `project:releases`

### Analytics (Optional)

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager ID | `GTM-XXXXXXX` | ⚠️ Optional |
| `DISCORD_WEBHOOK_URL` | Discord Webhook URL (for notifications) | `https://discord.com/api/webhooks/...` | ⚠️ Optional |

---

## Backend Environment Variables (Firebase Functions)

Firebase Functions use **Firebase Config** (key-value pairs) instead of `.env` files in production.

### Required Variables

| Variable | Description | Set via Firebase Config? |
|----------|-------------|---------------------------|
| `STRIPE_SECRET_KEY` | Stripe Secret Key | ✅ Yes |
| `STRIPE_WEBHOOK_SECRET` | Stripe Webhook Secret | ✅ Yes |
| `SENDGRID_API_KEY` | SendGrid API Key | ✅ Yes |
| `SENDGRID_FROM_EMAIL` | Verified Sender Email | ✅ Yes |
| `MUX_TOKEN_ID` | Mux Access Token ID | ✅ Yes (if using Mux) |
| `MUX_TOKEN_SECRET` | Mux Access Token Secret | ✅ Yes (if using Mux) |

### Optional Variables

| Variable | Description | Set via Firebase Config? |
|----------|-------------|---------------------------|
| `DISCORD_WEBHOOK_URL` | Discord webhook for notifications | ✅ Yes |
| `MUX_SIGNING_KEY` | Mux Signing Key | ✅ Yes |
| `MUX_SIGNING_KEY_ID` | Mux Signing Key ID | ✅ Yes |

**Note**: Firebase Admin SDK credentials (project ID, client email, private key) are automatically available in Firebase Functions via `admin.initializeApp()`.

---

## Setup Instructions

### Local Development Setup

1. **Copy example file**:
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in values** in `.env.local` (see sections above for where to get values)

3. **For Firebase Functions**:
   ```bash
   cd functions
   cp .env.example .env
   # Fill in values in functions/.env
   cd ..
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

### Vercel Production Setup

#### Option 1: Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click "Settings" → "Environment Variables"
4. Add each variable:
   - **Key**: Variable name (e.g., `NEXT_PUBLIC_FIREBASE_API_KEY`)
   - **Value**: Variable value
   - **Environment**: Select "Production" (or "Preview", "Development" as needed)
5. Click "Save"
6. Redeploy to apply changes

#### Option 2: Vercel CLI

```bash
# Login to Vercel
npx vercel login

# Set environment variables
npx vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production
# Enter value when prompted

# Or set all at once from .env.production file
npx vercel env pull .env.vercel.production
```

#### Option 3: Import from .env file

1. Create `.env.production` with all variables (DO NOT commit this file!)
2. Go to Vercel Dashboard → Project → Settings → Environment Variables
3. Click "Import .env" button
4. Upload `.env.production` file
5. Delete `.env.production` from your local machine

### Firebase Functions Production Setup

Firebase Functions use `firebase functions:config:set` instead of `.env` files.

```bash
# Set Stripe config
firebase functions:config:set \
  stripe.secret_key="sk_live_..." \
  stripe.webhook_secret="whsec_..."

# Set SendGrid config
firebase functions:config:set \
  sendgrid.api_key="SG...." \
  sendgrid.from_email="noreply@elira.hu"

# Set Mux config
firebase functions:config:set \
  mux.token_id="..." \
  mux.token_secret="..." \
  mux.signing_key="..." \
  mux.signing_key_id="..."

# Set Discord webhook (optional)
firebase functions:config:set \
  discord.webhook_url="https://discord.com/api/webhooks/..."

# View all config
firebase functions:config:get

# Download config to .runtimeconfig.json (for local emulator)
firebase functions:config:get > functions/.runtimeconfig.json
```

**Important**:
- Config changes require redeploying functions: `firebase deploy --only functions`
- Config is stored per Firebase project, so use `firebase use` to switch between projects

---

## Security Best Practices

### 1. Never Commit Secrets

Add to `.gitignore`:
```gitignore
# Environment variables
.env
.env.local
.env.production
.env.staging
.env.vercel
.env.vercel.production
functions/.env
functions/.runtimeconfig.json

# Service account keys
*-service-account.json
firebase-adminsdk-*.json
```

### 2. Rotate Keys Regularly

- **Stripe**: Rotate API keys every 90 days
- **SendGrid**: Rotate API keys every 90 days
- **Firebase Service Account**: Rotate every 6 months
- **Mux**: Rotate access tokens every 6 months

### 3. Use Different Keys for Different Environments

| Environment | Stripe Key | SendGrid Key | Firebase Project |
|-------------|------------|--------------|------------------|
| **Local Dev** | `sk_test_...` | Test API key | Development project |
| **Staging** | `sk_test_...` | Test API key | Staging project |
| **Production** | `sk_live_...` | Production API key | Production project |

### 4. Verify Environment Variable Loading

Add this to your Next.js config or a setup file:

```typescript
// lib/env-check.ts
const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'FIREBASE_PRIVATE_KEY',
  'STRIPE_SECRET_KEY',
  'SENDGRID_API_KEY',
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});
```

### 5. Secure Webhook Endpoints

Always verify webhook signatures:

**Stripe Webhook**:
```typescript
const sig = req.headers['stripe-signature'];
const event = stripe.webhooks.constructEvent(
  req.body,
  sig,
  process.env.STRIPE_WEBHOOK_SECRET
);
```

---

## Troubleshooting

### Problem: `NEXT_PUBLIC_` variables not available in client

**Solution**:
- Ensure variables start with `NEXT_PUBLIC_` prefix
- Restart dev server after adding new variables
- For Vercel: redeploy after adding variables

### Problem: Firebase Admin "Project ID not found"

**Solution**:
- Verify `FIREBASE_PROJECT_ID` is set correctly
- Check `FIREBASE_PRIVATE_KEY` has proper newline characters (`\n`)
- Ensure private key is wrapped in quotes in `.env.local`

### Problem: Stripe webhook signature verification fails

**Solution**:
- Verify `STRIPE_WEBHOOK_SECRET` matches the webhook endpoint in Stripe Dashboard
- Ensure webhook endpoint URL is correct: `https://your-domain.com/api/webhooks/stripe`
- Check webhook is sending to production URL, not localhost

### Problem: SendGrid emails not sending

**Solution**:
- Verify `SENDGRID_API_KEY` is valid (check in SendGrid dashboard)
- Ensure `SENDGRID_FROM_EMAIL` is verified in SendGrid
- Check SendGrid activity feed for delivery errors

### Problem: Firebase Functions config not loading

**Solution**:
- Run `firebase functions:config:get` to verify config is set
- Redeploy functions after config changes: `firebase deploy --only functions`
- For local testing, download config: `firebase functions:config:get > functions/.runtimeconfig.json`

### Problem: Mux videos not loading

**Solution**:
- Verify `MUX_TOKEN_ID` and `MUX_TOKEN_SECRET` are correct
- Check token permissions include "Mux Video" read/write
- For private playback, ensure signing keys are set correctly

---

## Environment Variables Checklist

### Before Production Deployment

- [ ] All **required** Vercel variables set in Vercel Dashboard
- [ ] All **required** Firebase Functions config set via `firebase functions:config:set`
- [ ] No `.env` files committed to git
- [ ] Service account JSON files in `.gitignore`
- [ ] Stripe webhook endpoint configured with production URL
- [ ] SendGrid sender email verified
- [ ] All keys using production values (not test keys)
- [ ] Environment variable loading verified (run env-check script)
- [ ] Webhook signature verification tested

### After Production Deployment

- [ ] Test Stripe payment flow end-to-end
- [ ] Verify SendGrid emails are delivered
- [ ] Check Firebase Functions logs for errors
- [ ] Verify Mux videos load and play
- [ ] Test Sentry error reporting (if configured)
- [ ] Monitor for missing environment variable errors

---

**Last Updated**: 2025-10-12
**Maintained by**: Development Team
**Related Docs**:
- `DEPLOYMENT_CHECKLIST.md` - Full deployment guide
- `.env.example` - Example environment file
- `functions/.env.example` - Firebase Functions example
