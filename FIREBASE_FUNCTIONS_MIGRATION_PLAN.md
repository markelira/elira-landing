# 🚀 Firebase Functions Migration Plan
## Migrating Next.js API Routes to Firebase Cloud Functions

### Project Overview
**Goal**: Migrate server-side API routes from Next.js to Firebase Cloud Functions while maintaining Firebase Hosting for the static frontend.

**Timeline**: 4-6 hours
**Risk Level**: Medium
**Rollback Strategy**: Available

---

## 📊 Architecture Transformation

### Current Architecture (BROKEN)
```
┌──────────────┐
│  Next.js App │ ──→ Static Export ──→ Firebase Hosting
│  + API Routes│                       (Cannot execute API)
└──────────────┘
```

### Target Architecture (SOLUTION)
```
┌──────────────┐      ┌─────────────────┐
│  Next.js App │ ──→  │ Firebase Hosting│
│  (Frontend)  │      │  (Static Files) │
└──────────────┘      └────────┬────────┘
                               │
                               ↓ API Calls
                      ┌─────────────────┐
                      │Firebase Functions│
                      │  (API Endpoints) │
                      └─────────────────┘
```

---

## 🎯 Phase 1: Environment Setup (30 mins)

### Step 1.1: Initialize Firebase Functions
```bash
# In project root
firebase init functions

# Select:
# - JavaScript or TypeScript? → TypeScript
# - ESLint? → Yes
# - Install dependencies? → Yes
```

### Step 1.2: Install Required Dependencies
```bash
cd functions
npm install --save express cors
npm install --save @sendgrid/mail
npm install --save-dev @types/express @types/cors
```

### Step 1.3: Configure TypeScript for Functions
```typescript
// functions/tsconfig.json
{
  "compilerOptions": {
    "module": "commonjs",
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "outDir": "lib",
    "sourceMap": true,
    "strict": true,
    "target": "es2017",
    "esModuleInterop": true
  },
  "compileOnSave": true,
  "include": ["src"]
}
```

### Step 1.4: Update Firebase Configuration
```json
// firebase.json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "/api/**",
        "function": "api"  // Route API calls to Functions
      },
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "functions": {
    "source": "functions",
    "predeploy": "npm --prefix \"$RESOURCE_DIR\" run build"
  }
}
```

### Deliverables - Phase 1:
- [ ] Firebase Functions initialized
- [ ] Dependencies installed
- [ ] TypeScript configured
- [ ] Firebase.json updated with rewrites

---

## 🔧 Phase 2: API Migration (1.5 hours)

### Step 2.1: Create Express App Structure
```typescript
// functions/src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';

// Initialize Firebase Admin
admin.initializeApp();

// Create Express app
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Import route handlers
import { subscribeHandler } from './routes/subscribe';

// Mount routes
app.post('/api/subscribe', subscribeHandler);

// Export as Firebase Function
export const api = functions.https.onRequest(app);
```

### Step 2.2: Migrate Subscribe Route
```typescript
// functions/src/routes/subscribe.ts
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import * as sgMail from '@sendgrid/mail';
import { z } from 'zod';

// Initialize SendGrid
sgMail.setApiKey(functions.config().sendgrid.key);

const subscribeSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(1),
  job: z.string().optional(),
  education: z.string().optional(),
  magnetId: z.string().optional(),
  magnetTitle: z.string().optional(),
  magnetSelected: z.string().optional(),
});

export async function subscribeHandler(req: Request, res: Response) {
  try {
    // Validate input
    const data = subscribeSchema.parse(req.body);
    
    // Save to Firestore
    const db = admin.firestore();
    const leadRef = await db.collection('leads').add({
      ...data,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      source: 'website',
      status: 'active'
    });

    // Send email
    await sendWelcomeEmail(data);

    // Send Discord notification
    await sendDiscordNotification(data);

    res.json({
      success: true,
      message: 'Subscription successful',
      id: leadRef.id
    });

  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process subscription'
    });
  }
}
```

### Step 2.3: Migrate Helper Functions
```typescript
// functions/src/services/sendgrid.ts
export async function sendWelcomeEmail(data: SubscriptionData) {
  const msg = {
    to: data.email,
    from: 'info@elira.hu',
    subject: 'Üdvözöljük az Elira Education-nél!',
    html: generateEmailTemplate(data)
  };
  
  await sgMail.send(msg);
}

// functions/src/services/discord.ts
export async function sendDiscordNotification(data: SubscriptionData) {
  const webhookUrl = functions.config().discord.webhook;
  
  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: `New subscription: ${data.firstName} ${data.lastName}`
    })
  });
}
```

### Step 2.4: Migrate Environment Variables
```bash
# Set Firebase Functions config
firebase functions:config:set \
  sendgrid.key="YOUR_SENDGRID_KEY" \
  discord.webhook="YOUR_DISCORD_WEBHOOK" \
  app.url="https://elira-landing.web.app"
```

### Deliverables - Phase 2:
- [ ] Express app structure created
- [ ] Subscribe route migrated
- [ ] Helper functions migrated
- [ ] Environment variables configured

---

## 🔄 Phase 3: Frontend Integration (1 hour)

### Step 3.1: Update API Call URLs
```typescript
// components/modals/EmailCaptureModal.tsx
const response = await fetch('/api/subscribe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data)
});

// No change needed - Firebase rewrites handle routing!
```

### Step 3.2: Implement Proper Error Handling
```typescript
// components/modals/EmailCaptureModal.tsx
const onSubmit = async (data: FormData) => {
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    // Check response status first
    if (!response.ok) {
      // Try client-side fallback
      if (response.status === 404 || response.status === 500) {
        console.log('API unavailable, using client-side submission');
        return await submitFormDirectly(data);
      }
      throw new Error(`HTTP ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      setSubmissionState('success');
      // ... success handling
    } else {
      throw new Error(result.error);
    }
    
  } catch (error) {
    console.error('Submission error:', error);
    // Fallback to client-side
    try {
      await submitFormDirectly(data);
      setSubmissionState('success');
    } catch (fallbackError) {
      setSubmissionState('error');
      setErrorMessage('Failed to submit form');
    }
  }
};
```

### Step 3.3: Update Next.js Configuration
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export', // Full static export
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Better for static hosting
};
```

### Step 3.4: Remove API Routes from Next.js
```bash
# Remove API routes (they're in Functions now)
rm -rf app/api/
```

### Deliverables - Phase 3:
- [ ] Frontend API calls verified
- [ ] Error handling improved
- [ ] Next.js configured for static export
- [ ] Old API routes removed

---

## 🧪 Phase 4: Testing & Validation (1 hour)

### Step 4.1: Local Testing Setup
```bash
# Terminal 1: Run Functions emulator
cd functions
npm run serve

# Terminal 2: Run Firebase emulators
firebase emulators:start

# Terminal 3: Run Next.js dev
npm run dev
```

### Step 4.2: Test Checklist
```markdown
## Functional Tests
- [ ] Form submission works locally
- [ ] Email is sent successfully
- [ ] Data saved to Firestore
- [ ] Discord notification sent
- [ ] Error handling works
- [ ] Client-side fallback triggers

## Integration Tests
- [ ] API endpoint responds at /api/subscribe
- [ ] CORS headers correct
- [ ] JSON parsing works
- [ ] Status codes correct (200, 400, 500)

## Security Tests
- [ ] Input validation working
- [ ] No sensitive data in responses
- [ ] Rate limiting considered
- [ ] CORS properly configured
```

### Step 4.3: Build & Preview
```bash
# Build static site
npm run build

# Build functions
cd functions && npm run build

# Preview with Firebase
firebase hosting:channel:deploy preview
```

### Deliverables - Phase 4:
- [ ] All tests passing
- [ ] Preview deployment working
- [ ] No console errors
- [ ] Forms submitting successfully

---

## 🚀 Phase 5: Deployment (30 mins)

### Step 5.1: Pre-Deployment Checklist
```markdown
- [ ] All environment variables set in Functions config
- [ ] Firestore rules updated if needed
- [ ] Backup current production data
- [ ] Document rollback procedure
- [ ] Notify team of deployment
```

### Step 5.2: Deploy Functions First
```bash
# Deploy only functions
firebase deploy --only functions

# Test the function endpoint directly
curl -X POST https://us-central1-elira-landing.cloudfunctions.net/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","firstName":"Test","lastName":"User"}'
```

### Step 5.3: Deploy Full Application
```bash
# Build production frontend
npm run build

# Deploy everything
firebase deploy

# Or deploy separately
firebase deploy --only functions
firebase deploy --only hosting
```

### Step 5.4: Post-Deployment Validation
```markdown
## Production Checks
- [ ] Visit https://elira-landing.web.app
- [ ] Submit test form
- [ ] Check Firestore for new entry
- [ ] Verify email received
- [ ] Check Discord notification
- [ ] Monitor Functions logs
- [ ] Check for console errors
```

### Deliverables - Phase 5:
- [ ] Functions deployed successfully
- [ ] Hosting updated
- [ ] All features working in production
- [ ] Monitoring active

---

## 📊 Phase 6: Monitoring & Optimization (30 mins)

### Step 6.1: Setup Monitoring
```typescript
// functions/src/monitoring.ts
export function logPerformance(functionName: string, duration: number) {
  console.log(`Function: ${functionName}, Duration: ${duration}ms`);
  
  // Send to monitoring service if needed
  if (duration > 3000) {
    console.warn(`Slow function execution: ${functionName}`);
  }
}
```

### Step 6.2: Implement Caching
```typescript
// Add caching headers for API responses
res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
```

### Step 6.3: Setup Alerts
```bash
# Firebase Alerts for function errors
firebase functions:log --only api

# Setup budget alerts in Firebase Console
# Setup uptime monitoring
```

### Deliverables - Phase 6:
- [ ] Monitoring implemented
- [ ] Performance logging active
- [ ] Alerts configured
- [ ] Documentation updated

---

## 🔄 Rollback Plan

### If Issues Occur:
```bash
# 1. Immediate rollback
firebase hosting:rollback

# 2. Disable functions
firebase functions:delete api

# 3. Restore previous Next.js build
git checkout HEAD~1
npm run build
firebase deploy --only hosting

# 4. Update DNS if needed
# Point to backup deployment
```

---

## 📝 Success Criteria

### Metrics to Validate Success:
- ✅ Zero 404 errors on /api/subscribe
- ✅ Form submissions processing < 3 seconds
- ✅ 100% email delivery rate
- ✅ Zero console errors in production
- ✅ All leads captured in Firestore
- ✅ No data loss during migration

---

## 🎯 Final Checklist

### Before Marking Complete:
- [ ] All API routes migrated to Functions
- [ ] Frontend fully static (no SSR)
- [ ] Error handling robust
- [ ] Client-side fallback working
- [ ] Documentation updated
- [ ] Team trained on new architecture
- [ ] Monitoring active
- [ ] Backup strategy documented

---

## 📚 Additional Resources

### Documentation:
- [Firebase Functions Guide](https://firebase.google.com/docs/functions)
- [Express on Cloud Functions](https://firebase.google.com/docs/functions/http-events)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)

### Troubleshooting:
- Functions logs: `firebase functions:log`
- Test locally: `firebase emulators:start`
- Debug CORS: Check Functions console for origin errors

---

## 🚦 Go/No-Go Decision Points

### Phase Gates:
1. **After Phase 1**: Environment ready? → Continue or fix
2. **After Phase 2**: API migrated? → Continue or debug
3. **After Phase 3**: Frontend working? → Continue or rollback
4. **After Phase 4**: Tests passing? → Continue or fix
5. **After Phase 5**: Production stable? → Complete or rollback

---

## 📅 Timeline Summary

| Phase | Duration | Critical Path |
|-------|----------|--------------|
| Setup | 30 mins | Yes |
| Migration | 1.5 hours | Yes |
| Integration | 1 hour | Yes |
| Testing | 1 hour | Yes |
| Deployment | 30 mins | Yes |
| Monitoring | 30 mins | No |
| **Total** | **4.5 hours** | |

---

## 🎉 Completion Criteria

The migration is complete when:
1. All forms submit successfully in production
2. No 404 errors on API routes
3. Emails are being sent
4. Data is saved to Firestore
5. No console errors
6. Client-side fallback works
7. Monitoring is active

---

*Last Updated: August 22, 2025*
*Version: 1.0*
*Status: Ready for Execution*