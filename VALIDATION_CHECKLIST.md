# Production Validation Checklist

## Deployment Status: ⏳ In Progress

Vercel is now deploying your changes. This should take 2-3 minutes.

---

## Step 1: Verify Deployment ✅

1. Go to [Vercel Dashboard](https://vercel.com/markelira/elira-landing)
2. Wait for deployment to complete (status should be "Ready")
3. Note the deployment URL (usually `www.elira.hu`)

---

## Step 2: Check Browser Console Logs 🔍

Once deployed, open the course player in production:

1. Navigate to: `https://www.elira.hu/courses/ai-copywriting-course/learn`
2. Open browser DevTools (F12 or Cmd+Option+I)
3. Go to **Console** tab
4. Look for diagnostic logs with these prefixes:
   - 🔧 `[getFirebaseFunctionsURL]`
   - 🔧 `[useCourseQueries]`
   - 🔧 `[courseAccess]`
   - 🌐 `[useCourse]`
   - 🌐 `[checkCourseAccess]`
   - 🛡️ `[Middleware]`

---

## Step 3: Validate CSP Fix ✅

**Expected Result**: No more CSP violations

### Before (Error):
```
❌ Refused to connect to 'https://api-5k33v562ya-ew.a.run.app/...'
   because it violates the following Content Security Policy directive
```

### After (Fixed):
```
✅ No CSP errors in console
✅ Enrollment API calls succeed
✅ Google Analytics works without CSP blocks
```

---

## Step 4: Analyze URL Configuration 📊

Look for these specific logs in the console:

### Example Log Output:
```javascript
🔧 [useCourseQueries] FUNCTIONS_BASE_URL: {
  url: 'https://api-5k33v562ya-ew.a.run.app',  // ← Check this!
  envVar: 'https://api-5k33v562ya-ew.a.run.app', // ← And this!
  nodeEnv: 'production'
}
```

### What to Check:

**Enrollment API** (should work now):
- `🔧 [courseAccess] FUNCTIONS_BASE_URL`
- Should be: `https://api-5k33v562ya-ew.a.run.app/api` ✅
- Look for: `🌐 [checkCourseAccess] Making enrollment check request`
- Check if request succeeds (no 404)

**Course API** (may still 404):
- `🔧 [useCourseQueries] FUNCTIONS_BASE_URL`
- Check what `envVar` shows
- Look for: `🌐 [useCourse] Making API request`
- Note the `fullUrl` being called

---

## Step 5: Check Network Tab 🌐

1. Open DevTools → **Network** tab
2. Filter by "XHR" or "Fetch"
3. Look for these requests:

### Should Work Now (CSP Fixed):
```
✅ GET https://api-5k33v562ya-ew.a.run.app/api/enrollments/check/...
   Status: 200 OK
```

### May Still 404 (env var issue):
```
❌ GET https://europe-west1-elira-landing-ce927.cloudfunctions.net/api/courses/...
   Status: 404 Not Found
```
OR
```
✅ GET https://api-5k33v562ya-ew.a.run.app/api/courses/...
   Status: 200 OK  (if env var is correct)
```

---

## Step 6: Decision Point 🎯

Based on the logs, you'll know if you need to update the environment variable.

### Scenario A: Enrollment Works, Course API 404s

**Console shows**:
```javascript
🔧 [useCourseQueries] FUNCTIONS_BASE_URL: {
  url: 'https://europe-west1-elira-landing-ce927.cloudfunctions.net/api',
  envVar: 'https://europe-west1-elira-landing-ce927.cloudfunctions.net/api',
  ...
}
```

**Action Required**:
1. Go to [Vercel Dashboard](https://vercel.com/markelira/elira-landing/settings/environment-variables)
2. Find `NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL`
3. Update value to: `https://api-5k33v562ya-ew.a.run.app/api`
4. Redeploy from Vercel dashboard

### Scenario B: Everything Works! 🎉

**Console shows**:
```javascript
🔧 [useCourseQueries] FUNCTIONS_BASE_URL: {
  url: 'https://api-5k33v562ya-ew.a.run.app/api',
  envVar: 'https://api-5k33v562ya-ew.a.run.app/api',
  ...
}
```

**Network shows**:
```
✅ GET https://api-5k33v562ya-ew.a.run.app/api/courses/... → 200 OK
✅ GET https://api-5k33v562ya-ew.a.run.app/api/enrollments/... → 200 OK
```

**Action**: Nothing! CSP and URLs are correct 🎉

### Scenario C: Both Fail with Same URL

**Console shows** both using same base URL but still failing:
```javascript
🔧 [useCourseQueries] FUNCTIONS_BASE_URL: {
  url: 'https://api-5k33v562ya-ew.a.run.app/api',
  ...
}
🔧 [courseAccess] FUNCTIONS_BASE_URL: {
  url: 'https://api-5k33v562ya-ew.a.run.app/api',
  ...
}
```

**But Network shows**:
```
❌ GET https://api-5k33v562ya-ew.a.run.app/api/courses/... → 404
❌ GET https://api-5k33v562ya-ew.a.run.app/api/enrollments/... → 404
```

**Action**: API might not be deployed to Cloud Run. Check:
1. Firebase Functions deployment status
2. Cloud Run service exists: `api-5k33v562ya-ew`
3. May need to redeploy Firebase Functions

---

## Step 7: Remove Diagnostic Logs (Optional) 🧹

Once everything works, you can remove the diagnostic logs:

```bash
# Remove console.log statements from:
# - lib/config.ts (lines 169-175)
# - hooks/useCourseQueries.ts (lines 11-15, 50-55)
# - lib/api/courseAccess.ts (lines 15-18, 39-45)
# - middleware.ts (line 34)

# Then commit and redeploy
git add -A
git commit -m "Remove diagnostic logs after issue resolution"
git push origin main
```

---

## Expected Timeline

- ⏱️ **Now**: Deployment in progress (2-3 minutes)
- ⏱️ **+3 min**: Check console logs for diagnostics
- ⏱️ **+5 min**: Update env var if needed
- ⏱️ **+8 min**: Redeploy complete if env var changed
- ✅ **+10 min**: Course player fully functional

---

## What Was Fixed

### CSP Policy Update
**Before**:
```
connect-src 'self' ... https://*.cloudfunctions.net ...
```

**After**:
```
connect-src 'self' ... https://*.cloudfunctions.net https://*.run.app https://region1.google-analytics.com ...
```

### Diagnostic Logs Added
- URL resolution tracking
- API request logging
- Environment variable validation
- Full request details for debugging

---

## Success Criteria ✅

You'll know everything is working when:

1. ✅ No CSP errors in console
2. ✅ Course loads without 404 errors
3. ✅ Enrollment status shows correctly
4. ✅ Videos play properly
5. ✅ Progress tracking works
6. ✅ No red errors in browser console

---

## Need Help?

If you see unexpected logs or errors:

1. Copy the full console output
2. Copy the Network tab requests (especially URLs and status codes)
3. Share with me for further debugging

The diagnostic logs will tell us exactly what's happening! 🔍
