# URGENT: Vercel Configuration Issues

## Current Status: ❌ Deployment Not Applied

Your console logs show the deployment **hasn't taken effect** yet. Here's what's wrong:

---

## Issue #1: CSP Still Blocking Cloud Run ❌

**Current CSP** (from production):
```
connect-src ... https://*.cloudfunctions.net https://*.firebaseapp.com ...
```

**Missing**:
- `https://*.run.app` (for Cloud Run API)
- `https://region1.google-analytics.com` (for GA4)

**Impact**: Enrollment API calls are blocked by CSP

---

## Issue #2: Wrong Environment Variable ❌

**Console shows**:
```
❌ GET https://europe-west1-elira-landing-ce927.cloudfunctions.net/api/courses/...
```

**Should be**:
```
✅ GET https://api-5k33v562ya-ew.a.run.app/api/courses/...
```

**Root Cause**: `NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL` in Vercel is set to the wrong URL

---

## Immediate Actions Required

### Step 1: Update Environment Variable in Vercel 🔧

1. Go to: https://vercel.com/markelira/elira-landing/settings/environment-variables

2. Find: `NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL`

3. **Current value** (wrong):
   ```
   https://europe-west1-elira-landing-ce927.cloudfunctions.net/api
   ```

4. **Update to** (correct):
   ```
   https://api-5k33v562ya-ew.a.run.app/api
   ```

5. Make sure it's set for: **Production**, **Preview**, and **Development**

6. Click **Save**

### Step 2: Force Redeploy 🚀

After updating the env var:

**Option A: Trigger redeploy from Vercel Dashboard**
1. Go to: https://vercel.com/markelira/elira-landing
2. Click on latest deployment
3. Click "Redeploy" button

**Option B: Empty commit push**
```bash
git commit --allow-empty -m "Force redeploy with correct env vars"
git push origin main
```

### Step 3: Clear CDN Cache (If Still Not Working) 🧹

Vercel might be caching the old middleware. After redeploy:

1. Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Or clear browser cache for elira.hu
3. Or try incognito/private window

---

## Why This Happened

### Local vs Production Mismatch

**Your local .env**:
```bash
NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL=https://api-5k33v562ya-ew.a.run.app
```

**Vercel production**:
```bash
NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL=https://europe-west1-elira-landing-ce927.cloudfunctions.net/api
```

The production env var was probably set when using the old Cloud Functions (Gen 1) URL format, but your Firebase Functions are now deployed to Cloud Run (Gen 2).

---

## Validation After Fix

Once you've updated the env var and redeployed, check:

### 1. CSP Headers
```bash
curl -s "https://www.elira.hu" -I | grep -i "content-security-policy"
```

Should include:
- ✅ `https://*.run.app`
- ✅ `https://region1.google-analytics.com`

### 2. Console Logs
Open: https://www.elira.hu/courses/ai-copywriting-course/learn

Should see:
```javascript
🔧 [useCourseQueries] FUNCTIONS_BASE_URL: {
  url: 'https://api-5k33v562ya-ew.a.run.app/api',  // ✅ Correct!
  envVar: 'https://api-5k33v562ya-ew.a.run.app/api', // ✅ Correct!
  nodeEnv: 'production'
}
```

### 3. Network Tab
Should see:
```
✅ GET https://api-5k33v562ya-ew.a.run.app/api/courses/ai-copywriting-course → 200 OK
✅ GET https://api-5k33v562ya-ew.a.run.app/api/enrollments/check/... → 200 OK
```

### 4. No Errors
- ✅ No CSP violations
- ✅ No 404 errors
- ✅ Course loads properly
- ✅ Videos play
- ✅ Enrollment status shows

---

## Quick Reference

### Correct URLs

**Backend API**: `https://api-5k33v562ya-ew.a.run.app/api`

**Environment Variable**:
```
NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL=https://api-5k33v562ya-ew.a.run.app/api
```

### Incorrect URLs (Do Not Use)

❌ `https://europe-west1-elira-landing-ce927.cloudfunctions.net/api` (Gen 1, doesn't exist)
❌ `https://us-central1-elira-landing-ce927.cloudfunctions.net` (wrong region)

---

## Timeline

- ⏱️ **Now**: Update env var in Vercel (2 minutes)
- ⏱️ **+2 min**: Trigger redeploy (1 minute)
- ⏱️ **+3 min**: Wait for deployment (2-3 minutes)
- ⏱️ **+6 min**: Hard refresh browser
- ✅ **+7 min**: Course player fully functional

---

## If You Need Help

The Vercel environment variables page shows all current values. Look for:
- `NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL`

Make sure it matches: `https://api-5k33v562ya-ew.a.run.app/api`

That's the Cloud Run URL where your Firebase Functions are actually deployed.
