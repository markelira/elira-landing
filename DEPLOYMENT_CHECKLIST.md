# Elira Landing Platform - Production Deployment Checklist

**Date Created**: 2025-10-12
**Target Environment**: Production (Vercel + Firebase)
**Deployment Strategy**: Frontend (Vercel) + Backend (Firebase Functions & Firestore)

---

## Pre-Deployment Verification

### 1. Code Quality & Build
- [x] TypeScript checking disabled for deployment (`next.config.ts` - `ignoreBuildErrors: true`)
- [x] ESLint warnings documented (150+ warnings, won't block build)
- [x] TypeScript errors documented in `TYPESCRIPT_ERRORS_TODO.md` (343 errors)
- [ ] Production build tested locally (`npm run build`)
- [ ] Build artifacts verified in `.next/` directory
- [ ] No critical console errors in build output

### 2. Environment Variables
**Required for Vercel (Frontend)**:
- [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
- [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`
- [ ] `NEXT_PUBLIC_MUX_ENV_KEY` (if using Mux)
- [ ] `SENTRY_DSN` (optional, for error tracking)
- [ ] `SENTRY_ORG` (optional)
- [ ] `SENTRY_PROJECT` (optional)
- [ ] `SENTRY_AUTH_TOKEN` (optional)

**Required for Firebase Functions (Backend)**:
- [ ] `STRIPE_SECRET_KEY`
- [ ] `STRIPE_WEBHOOK_SECRET`
- [ ] `SENDGRID_API_KEY`
- [ ] `MUX_TOKEN_ID`
- [ ] `MUX_TOKEN_SECRET`

### 3. Firebase Configuration
- [ ] Firebase project selected: `firebase use production` (or appropriate alias)
- [ ] Firestore indexes deployed: `firebase deploy --only firestore:indexes`
- [ ] Firestore rules reviewed for security (⚠️ Currently permissive - see `SECURITY_AUDIT.md`)
- [ ] Storage rules reviewed
- [ ] Firebase Functions runtime: Node.js 18 (⚠️ Upgrade to Node.js 20 pending)

### 4. Dependencies & Security
- [ ] Run `npm audit` and review critical vulnerabilities
- [ ] Critical dependencies updated (see `SECURITY_AUDIT.md` Section 5)
- [ ] `package-lock.json` committed

---

## Deployment Steps

### Phase 1: Firebase Backend Deployment

#### 1.1 Deploy Firestore Rules & Indexes
```bash
# Review rules first
cat firestore.rules

# Deploy indexes
firebase deploy --only firestore:indexes

# Deploy rules (⚠️ Review security first!)
firebase deploy --only firestore:rules
```

#### 1.2 Set Firebase Functions Environment Variables
```bash
# Check current config
firebase functions:config:get

# Set required variables (example)
firebase functions:config:set \
  stripe.secret_key="sk_live_..." \
  stripe.webhook_secret="whsec_..." \
  sendgrid.api_key="SG..." \
  mux.token_id="..." \
  mux.token_secret="..."

# Verify config
firebase functions:config:get
```

#### 1.3 Deploy Firebase Functions
```bash
# Build functions first
npm --prefix functions run build

# Deploy all functions
firebase deploy --only functions

# OR deploy specific functions
firebase deploy --only functions:createCheckoutSession,functions:stripeWebhook
```

#### 1.4 Verify Firebase Deployment
```bash
# Check function logs
firebase functions:log --limit 50

# List deployed functions
firebase functions:list

# Test health endpoint (if exists)
curl https://us-central1-YOUR_PROJECT.cloudfunctions.net/health
```

### Phase 2: Vercel Frontend Deployment

#### 2.1 Configure Vercel Project
```bash
# Login to Vercel
npx vercel login

# Link project (first time only)
npx vercel link

# Set environment variables in Vercel dashboard or via CLI
npx vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
# ... repeat for all required env vars
```

#### 2.2 Test Preview Deployment
```bash
# Deploy to preview
npx vercel

# Test the preview URL thoroughly
# Verify:
# - Homepage loads
# - Course enrollment works
# - Payment flow functional
# - Firebase connection working
# - No console errors
```

#### 2.3 Production Deployment
```bash
# Deploy to production
npx vercel --prod

# OR use Vercel dashboard "Promote to Production" button
```

#### 2.4 Verify Vercel Deployment
- [ ] Visit production URL and test critical paths
- [ ] Check Vercel deployment logs for errors
- [ ] Verify all environment variables loaded correctly
- [ ] Test Firebase connection (auth, Firestore, Functions)
- [ ] Verify images loading (Image Optimization enabled)
- [ ] Check browser console for errors
- [ ] Test on mobile device (PWA install prompt)

---

## Post-Deployment Verification

### Critical User Flows
- [ ] **Homepage**: Loads without errors, CTAs functional
- [ ] **Course Enrollment**: User can browse and enroll in courses
- [ ] **Payment Flow**: Stripe checkout works end-to-end
- [ ] **Dashboard**: Authenticated users can access dashboard
- [ ] **Video Playback**: Mux videos load and play correctly
- [ ] **Email Capture**: Lead magnet downloads work, emails sent
- [ ] **Mobile Experience**: Responsive design, PWA install works
- [ ] **Blog**: Posts load, navigation works

### Performance Checks
- [ ] Lighthouse score > 90 (Performance, Accessibility, Best Practices, SEO)
- [ ] Core Web Vitals passing (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Time to First Byte (TTFB) < 600ms
- [ ] First Contentful Paint (FCP) < 1.8s

### Monitoring Setup
- [ ] Vercel Analytics enabled
- [ ] Sentry error tracking configured (optional)
- [ ] Firebase performance monitoring enabled
- [ ] Set up uptime monitoring (e.g., UptimeRobot, Pingdom)
- [ ] Configure alerting for critical errors

### SEO & Metadata
- [ ] `robots.txt` accessible at `/robots.txt`
- [ ] `sitemap.xml` accessible at `/sitemap.xml`
- [ ] Open Graph tags present on key pages
- [ ] Google Search Console verification
- [ ] Google Analytics tracking (if configured)

---

## Known Issues & Technical Debt

### TypeScript Errors (343 remaining)
**Status**: Build configured to ignore errors (`ignoreBuildErrors: true`)
**Documentation**: See `TYPESCRIPT_ERRORS_TODO.md`
**Post-Launch Priority**: Schedule 4-6 hour session to fix systematically

**Error Breakdown**:
- Missing type declarations: ~50 errors (quick win)
- Firebase Timestamp conversions: ~10 errors
- Component type mismatches: ~10 errors
- Implicit 'any' types: ~270 errors

### Security Considerations
**Status**: Multiple security improvements needed
**Documentation**: See `SECURITY_AUDIT.md`

**High Priority**:
1. **Firestore Rules**: Currently permissive, need tightening
2. **Firebase Functions Runtime**: Upgrade Node.js 18 → 20
3. **Security Headers**: Add via `middleware.ts`
4. **Dependency Vulnerabilities**: 6 moderate, 2 high severity
5. **Console Logging**: Replace with Sentry for production

### ESLint Warnings (150+)
**Status**: Build configured to allow warnings (`ignoreDuringBuilds: true`)
**Common Issues**:
- Unused variables and imports
- Missing alt text on images
- Module assignment warnings
- TS-ignore comments

---

## Rollback Procedures

### Vercel Rollback
```bash
# Via Vercel dashboard:
# 1. Go to Deployments tab
# 2. Find previous working deployment
# 3. Click "..." menu → "Promote to Production"

# Via CLI:
npx vercel rollback
```

### Firebase Rollback

#### Functions Rollback
```bash
# List recent deployments
firebase functions:log --limit 100

# Redeploy previous version (manual)
git checkout <previous-commit>
npm --prefix functions run build
firebase deploy --only functions
git checkout main
```

#### Firestore Rules Rollback
```bash
# Rules are versioned in Firebase Console
# Go to: Firestore → Rules → View History → Restore
```

### Emergency Contacts
- **Vercel Support**: https://vercel.com/support
- **Firebase Support**: https://firebase.google.com/support
- **Stripe Support**: https://support.stripe.com

---

## Post-Deployment Tasks

### Immediate (Within 24 hours)
- [ ] Monitor error rates in Vercel and Firebase
- [ ] Check Stripe webhook deliveries
- [ ] Verify email deliveries (SendGrid)
- [ ] Test user flows with real accounts
- [ ] Monitor performance metrics
- [ ] Check for broken links (use Screaming Frog or similar)

### Short-term (Within 1 week)
- [ ] Fix critical TypeScript errors (~20 high-impact errors)
- [ ] Tighten Firestore security rules
- [ ] Add security headers to middleware
- [ ] Set up comprehensive error monitoring
- [ ] Document environment variables in README
- [ ] Create incident response plan

### Medium-term (Within 1 month)
- [ ] Fix all TypeScript errors (343 total)
- [ ] Upgrade Firebase Functions to Node.js 20
- [ ] Update critical dependencies
- [ ] Replace console.log with structured logging
- [ ] Implement comprehensive testing (unit, integration, e2e)
- [ ] Optimize bundle size (currently ~1.4GB cache)
- [ ] Add automated deployment pipeline (CI/CD)

---

## Deployment Commands Quick Reference

```bash
# Firebase Backend
firebase use production
firebase deploy --only firestore:indexes
firebase deploy --only functions
firebase functions:log --limit 50

# Vercel Frontend
npx vercel --prod
npx vercel logs production

# Rollback
npx vercel rollback
# (Firebase: redeploy previous version manually)

# Health Checks
curl https://your-domain.com
firebase functions:list
```

---

## Success Criteria

**Deployment is successful when**:
- [ ] Production URL accessible and loads correctly
- [ ] All critical user flows working (enrollment, payment, auth)
- [ ] No critical errors in logs (Vercel, Firebase, Sentry)
- [ ] Performance metrics within acceptable range
- [ ] Monitoring and alerting active
- [ ] Rollback plan tested and documented

**Deployment should be ROLLED BACK if**:
- Critical user flows broken (payment, auth, enrollment)
- Error rate > 5% on critical endpoints
- Performance degradation > 50% compared to previous version
- Data loss or corruption detected
- Security vulnerability exposed

---

**Last Updated**: 2025-10-12
**Next Review**: After first production deployment
**Maintained by**: Development Team
