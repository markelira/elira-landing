# Course Player Production Issue - Diagnostic Logs Added

## Date: 2025-10-13

## Problem Summary
The production course player is experiencing two critical issues:
1. **CSP Violations**: Enrollment API calls to `api-5k33v562ya-ew.a.run.app` are blocked by Content Security Policy
2. **404 Errors**: Course API calls to `europe-west1-elira-landing-ce927.cloudfunctions.net/api/courses/...` return 404

## Root Cause Analysis

### Issue #1: CSP Missing Cloud Run Domain ✅ FIXED
**Problem**: CSP only allowed `*.cloudfunctions.net` but enrollment API is on Cloud Run (`*.run.app`)

**Evidence from console**:
```
Refused to connect to 'https://api-5k33v562ya-ew.a.run.app/api/enrollments/check/...'
because it violates the following Content Security Policy directive: "connect-src ... https://*.cloudfunctions.net ..."
```

**Fix Applied**: Added `https://*.run.app` and `https://region1.google-analytics.com` to CSP in `middleware.ts:27`

### Issue #2: URL Configuration Mismatch (Pending Validation)
**Hypothesis**: `NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL` environment variable is set to wrong URL in production

**Expected**: `https://api-5k33v562ya-ew.a.run.app/api`
**Actual (suspected)**: `https://europe-west1-elira-landing-ce927.cloudfunctions.net/api`

**Evidence**: 404 error shows request to `cloudfunctions.net` domain, but API is deployed to Cloud Run

## Diagnostic Logs Added

### 1. Config URL Resolution (`lib/config.ts:169-175`)
```javascript
console.log('🔧 [getFirebaseFunctionsURL] Configuration:', {
  isDevelopment,
  useEmulators,
  envVar: process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL,
  resolvedUrl: url,
  nodeEnv: process.env.NODE_ENV
})
```
**Purpose**: Shows what Firebase Functions URL is being used and where it comes from

### 2. Course Queries Base URL (`hooks/useCourseQueries.ts:11-15`)
```javascript
console.log('🔧 [useCourseQueries] FUNCTIONS_BASE_URL:', {
  url: FUNCTIONS_BASE_URL,
  envVar: process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL,
  nodeEnv: process.env.NODE_ENV
});
```
**Purpose**: Confirms the base URL used for course API calls

### 3. Course API Request (`hooks/useCourseQueries.ts:50-55`)
```javascript
console.log('🌐 [useCourse] Making API request:', {
  baseUrl: FUNCTIONS_BASE_URL,
  fullUrl,
  courseId: id,
  hasAuth: !!headers['Authorization']
});
```
**Purpose**: Shows the exact URL being called when fetching course data

### 4. Course Access Base URL (`lib/api/courseAccess.ts:15-18`)
```javascript
console.log('🔧 [courseAccess] FUNCTIONS_BASE_URL:', {
  url: FUNCTIONS_BASE_URL,
  nodeEnv: process.env.NODE_ENV
});
```
**Purpose**: Shows base URL for enrollment checks

### 5. Enrollment Check Request (`lib/api/courseAccess.ts:39-45`)
```javascript
console.log('🌐 [checkCourseAccess] Making enrollment check request:', {
  baseUrl: FUNCTIONS_BASE_URL,
  fullUrl,
  courseId,
  userId,
  hasAuth: !!token
});
```
**Purpose**: Shows exact URL and parameters for enrollment verification

### 6. Middleware CSP (`middleware.ts:34`)
```javascript
console.log('🛡️ [Middleware] CSP Header set for:', pathname)
```
**Purpose**: Confirms CSP headers are being applied

## Expected Log Output

When you refresh the course player in production, you should see:

```
🔧 [useCourseQueries] FUNCTIONS_BASE_URL: {
  url: 'https://europe-west1-elira-landing-ce927.cloudfunctions.net/api', // <- PROBLEM IF THIS
  envVar: 'https://europe-west1-elira-landing-ce927.cloudfunctions.net/api',
  nodeEnv: 'production'
}

🌐 [useCourse] Making API request: {
  baseUrl: 'https://europe-west1-elira-landing-ce927.cloudfunctions.net/api',
  fullUrl: 'https://europe-west1-elira-landing-ce927.cloudfunctions.net/api/courses/ai-copywriting-course',
  courseId: 'ai-copywriting-course',
  hasAuth: true
}

🔧 [courseAccess] FUNCTIONS_BASE_URL: {
  url: 'https://api-5k33v562ya-ew.a.run.app/api',
  nodeEnv: 'production'
}

🌐 [checkCourseAccess] Making enrollment check request: {
  baseUrl: 'https://api-5k33v562ya-ew.a.run.app/api',
  fullUrl: 'https://api-5k33v562ya-ew.a.run.app/api/enrollments/check/ai-copywriting-course?userId=...',
  courseId: 'ai-copywriting-course',
  userId: 's3oUvVBfihRNpZIbNVT9NxrZ5f92',
  hasAuth: true
}
```

## Validation Checklist

Once deployed, check the browser console for:

- [ ] ✅ **CSP violations resolved**: No more "Refused to connect" errors for `*.run.app`
- [ ] 🔍 **URL mismatch identified**: Logs show which env var is misconfigured
- [ ] 📊 **API endpoint validation**: Logs confirm correct base URLs being used
- [ ] 🔐 **Auth token presence**: Logs show if auth headers are being sent

## Next Steps

### After Log Analysis:

1. **If env var is wrong**:
   - Update `NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL` in Vercel to: `https://api-5k33v562ya-ew.a.run.app/api`
   - Redeploy application

2. **If Cloud Functions endpoint doesn't exist**:
   - Verify Firebase Functions are deployed to Cloud Run (not Cloud Functions)
   - Update all references to use Cloud Run URL consistently

3. **If API is on wrong platform**:
   - Decision needed: Migrate to Cloud Functions OR ensure all code uses Cloud Run URLs

## Files Modified

1. `middleware.ts` - Added CSP domains and logging
2. `lib/config.ts` - Added URL resolution logging
3. `hooks/useCourseQueries.ts` - Added base URL and request logging
4. `lib/api/courseAccess.ts` - Added base URL and request logging

## Changes Made

### CSP Update (`middleware.ts:27`)
**Before**:
```
connect-src 'self' ... https://*.cloudfunctions.net https://*.firebaseapp.com ...
```

**After**:
```
connect-src 'self' ... https://*.cloudfunctions.net https://*.firebaseapp.com https://*.run.app https://region1.google-analytics.com ...
```

This allows:
- ✅ Cloud Run API calls (`api-5k33v562ya-ew.a.run.app`)
- ✅ Google Analytics regional endpoints (`region1.google-analytics.com`)

## Deployment Instructions

1. Build and test locally:
   ```bash
   npm run build
   npm run start
   ```

2. Deploy to production:
   ```bash
   git add -A
   git commit -m "Add diagnostic logs for course player API issues and fix CSP"
   git push origin main
   ```

3. Check Vercel deployment logs

4. Refresh course player in production and examine browser console

5. Review logs and determine if env var update is needed

## Expected Resolution

After CSP fix is deployed:
- ✅ Enrollment checks should work (no more CSP blocks)
- ❌ Course API may still 404 until env var is corrected
- 📊 Logs will show exact configuration being used
