# Update Vercel Environment Variable

## Status: 🔄 Redeploy Triggered

I've pushed an empty commit to trigger a new Vercel deployment. However, **the environment variable still needs to be manually updated** in the Vercel dashboard.

---

## CRITICAL: Update Environment Variable Now

### Option 1: Via Vercel Dashboard (Recommended) 🖥️

1. **Open Vercel Environment Variables**:
   - Direct link: https://vercel.com/markelira/elira-landing/settings/environment-variables
   - Or: Vercel Dashboard → elira-landing → Settings → Environment Variables

2. **Find the Variable**:
   - Look for: `NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL`

3. **Update the Value**:
   - **Current (wrong)**: `https://europe-west1-elira-landing-ce927.cloudfunctions.net/api`
   - **Change to**: `https://api-5k33v562ya-ew.a.run.app/api`

4. **Apply to All Environments**:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

5. **Save Changes**

6. **Redeploy** (if not triggered automatically):
   - Go to: https://vercel.com/markelira/elira-landing
   - Click on the latest deployment
   - Click "Redeploy"

---

### Option 2: Via Vercel CLI (If You Have It Installed) 💻

```bash
# Install Vercel CLI if needed
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Update environment variable
vercel env rm NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL production
vercel env add NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL production
# When prompted, enter: https://api-5k33v562ya-ew.a.run.app/api

# Also update for preview
vercel env rm NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL preview
vercel env add NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL preview
# When prompted, enter: https://api-5k33v562ya-ew.a.run.app/api

# Trigger redeploy
vercel --prod
```

---

## What Happens Next

### Timeline:
- ⏱️ **Now**: Env var update (1 minute)
- ⏱️ **+1 min**: Redeploy triggered automatically
- ⏱️ **+4 min**: Deployment completes
- ⏱️ **+5 min**: Test in browser

### After Deployment:

1. **Wait for deployment** to complete (check Vercel dashboard)

2. **Hard refresh** the browser:
   - Mac: `Cmd + Shift + R`
   - Windows: `Ctrl + Shift + R`

3. **Open course player**:
   ```
   https://www.elira.hu/courses/ai-copywriting-course/learn
   ```

4. **Check console** for these logs:
   ```javascript
   🔧 [useCourseQueries] FUNCTIONS_BASE_URL: {
     url: 'https://api-5k33v562ya-ew.a.run.app/api',  // ✅ Should be correct now
     envVar: 'https://api-5k33v562ya-ew.a.run.app/api', // ✅ Should be correct now
     nodeEnv: 'production'
   }
   ```

5. **Check Network tab**:
   ```
   ✅ GET https://api-5k33v562ya-ew.a.run.app/api/courses/... → 200 OK
   ✅ GET https://api-5k33v562ya-ew.a.run.app/api/enrollments/... → 200 OK
   ```

---

## Verification Checklist

After updating the env var and redeploying, verify:

### Console Logs ✅
- [ ] No CSP violations for `*.run.app`
- [ ] Diagnostic logs show correct URL
- [ ] No 404 errors
- [ ] Course data loads successfully

### Network Tab ✅
- [ ] API calls go to `api-5k33v562ya-ew.a.run.app`
- [ ] Status codes are 200 OK
- [ ] Enrollment check succeeds
- [ ] Course data returns properly

### User Experience ✅
- [ ] Course player loads
- [ ] Video plays
- [ ] Progress tracking works
- [ ] No error messages

---

## Why Manual Update Is Needed

Environment variables in Vercel are **not stored in git** - they're platform configuration. That's why:

1. ✅ Code changes (CSP fix, diagnostic logs) → Pushed to git → Will deploy
2. ❌ Environment variable → Must be updated in Vercel dashboard → Manual step

This is a security feature - sensitive variables like API keys aren't committed to your repository.

---

## Current Deployment Status

- ✅ Git push complete: Commit `5bdbdaf`
- ⏳ Vercel deployment: In progress (2-3 minutes)
- ⚠️ Env var update: **Requires manual action in Vercel dashboard**

---

## What I Fixed in the Code

The redeploy will include:

1. **CSP Update** (`middleware.ts`):
   - Added: `https://*.run.app`
   - Added: `https://region1.google-analytics.com`
   - Added: `https://static.hotjar.com` (for Hotjar analytics)

2. **Diagnostic Logs** (multiple files):
   - URL resolution logging
   - API request logging
   - Environment variable tracking

3. **Backend**: Already deployed to Cloud Run

---

## Quick Command Reference

### Check if deployment is complete:
```bash
# Check CSP header
curl -s "https://www.elira.hu" -I | grep "content-security-policy" | grep -o "run.app"

# If it returns "run.app", CSP is updated ✅
# If it returns nothing, CSP not updated yet ⏳
```

### Test API directly:
```bash
# Test course API
curl "https://api-5k33v562ya-ew.a.run.app/api/courses/ai-copywriting-course"

# Should return course JSON, not 404
```

---

## Need Help?

If after updating the env var and redeploying you still see issues:

1. Copy the full console output
2. Copy the Network tab (especially the URLs being called)
3. Check if the env var update took effect:
   - Vercel Dashboard → Settings → Environment Variables
   - Verify the value is: `https://api-5k33v562ya-ew.a.run.app/api`

---

## Summary

**What I Did**:
- ✅ Fixed CSP in code
- ✅ Added diagnostic logs
- ✅ Deployed Firebase Functions
- ✅ Triggered Vercel redeploy

**What You Need to Do**:
1. 🔧 Update `NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL` in Vercel
2. ⏳ Wait for deployment (auto-triggered after env var update)
3. 🧪 Test in browser

**Expected Time**: 5-7 minutes total
