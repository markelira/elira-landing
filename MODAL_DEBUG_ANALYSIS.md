# 🐛 MODAL DEBUG ANALYSIS

## Issue Validation Plan

### 1. Add Logs to VideoSelectionModal to Test URL Resolution
```typescript
// Add before line 195 in VideoSelectionModal.tsx
console.log('🔍 Environment check:', {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL: process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL,
  currentURL: window.location.origin
});

const apiUrl = process.env.NODE_ENV === 'production' 
  ? `${process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL}/subscribe`
  : '/api/subscribe';

console.log('🎯 Calling API URL:', apiUrl);
```

### 2. Add Network Request Logging 
```typescript
// Add before fetch call
console.log('📡 Request details:', {
  url: apiUrl,
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: requestData
});
```

### 3. Add Response Logging
```typescript
// Add after response
console.log('📥 Response details:', {
  status: response.status,
  statusText: response.statusText,
  headers: Object.fromEntries(response.headers),
  url: response.url
});
```

### 4. Test Firebase Functions Endpoint Directly
```bash
curl -X POST https://api-5k33v562ya-ew.a.run.app/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User", 
    "email": "test@example.com",
    "magnetId": "test-video",
    "source": "video-modal"
  }'
```

### 5. Verify Environment Variables in Production
```typescript
// Add to component mount
useEffect(() => {
  console.log('🌍 Production environment check:', {
    NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL: process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL,
    NODE_ENV: process.env.NODE_ENV,
    buildTime: process.env.NEXT_PUBLIC_BUILD_TIME
  });
}, []);
```

## Expected Results:

1. **If URL Issue:** Console will show wrong URL being called
2. **If Environment Issue:** Environment variables will be undefined/wrong
3. **If CORS Issue:** Network tab will show CORS error
4. **If Data Issue:** Firebase Functions will return validation error

## Quick Fixes to Test:

1. **Fix EmailCaptureModal URL:**
   ```typescript
   const response = await fetch(`${process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL}/subscribe`, {
   ```

2. **Fix VideoSelectionModal URL:**
   ```typescript
   const apiUrl = process.env.NODE_ENV === 'production' 
     ? `${process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL}/subscribe`
     : '/api/subscribe';
   
   const response = await fetch(apiUrl, {
   ```

3. **Standardize Data Format:**
   Ensure both modals send consistent data structure that matches Firebase Functions schema.