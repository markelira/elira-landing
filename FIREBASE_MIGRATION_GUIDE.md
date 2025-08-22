  # Firebase Project Migration Guide

## Current Issue
Billing account `01F45D-892D51-5EEBE6` has issues preventing Compute Engine API activation, which is required for Firebase Functions v2.

## Migration Steps

### 1. Create New Firebase Project
1. Go to https://console.firebase.google.com
2. Create new project (suggested name: `elira-landing-v2`)
3. Enable billing with a working account
4. Set location to `europe-west` during setup

### 2. Enable Required APIs
In the new project, enable:
- Cloud Functions API
- Cloud Build API
- Compute Engine API (this is the one failing in current project)
- Artifact Registry API
- Cloud Run API
- Firestore API

### 3. Export Firestore Data from Old Project
```bash
# Export current data
gcloud firestore export gs://elira-landing.appspot.com/firestore-backup --project=elira-landing

# Or use Firebase CLI
firebase firestore:export --project elira-landing
```

### 4. Environment Variables to Transfer
From `.env.local`:
- `NEXT_PUBLIC_FIREBASE_API_KEY` → Update with new project
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` → Update with new project
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` → Update with new project
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` → Update with new project
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` → Update with new project
- `NEXT_PUBLIC_FIREBASE_APP_ID` → Update with new project
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` → Update with new project

Server-side variables:
- `FIREBASE_PROJECT_ID` → Update with new project
- `FIREBASE_CLIENT_EMAIL` → From new service account
- `FIREBASE_PRIVATE_KEY` → From new service account
- `SENDGRID_API_KEY` → Keep the same
- `DISCORD_WEBHOOK_URL` → Keep the same

### 5. Update Firebase Configuration

#### Update `.firebaserc`:
```json
{
  "projects": {
    "default": "elira-landing-v2"
  }
}
```

#### Update `lib/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: "new-api-key",
  authDomain: "elira-landing-v2.firebaseapp.com",
  projectId: "elira-landing-v2",
  storageBucket: "elira-landing-v2.appspot.com",
  messagingSenderId: "new-sender-id",
  appId: "new-app-id",
  measurementId: "new-measurement-id"
};
```

### 6. Import Firestore Data to New Project
```bash
# Import to new project
gcloud firestore import gs://elira-landing.appspot.com/firestore-backup --project=elira-landing-v2
```

### 7. Deploy to New Project
```bash
# Login and set project
firebase use elira-landing-v2

# Deploy everything
firebase deploy
```

### 8. Update Domain Settings
- Update any custom domains in Firebase Hosting
- Update OAuth redirect URLs if using authentication

## Time Estimate
- Setup new project: 15 minutes
- Export/Import data: 30 minutes
- Update configurations: 30 minutes
- Testing: 30 minutes
- **Total: ~2 hours**

## Rollback Plan
Keep old project intact until new one is fully working. You can switch back by:
1. Reverting `.firebaserc` changes
2. Reverting environment variables
3. Running `firebase use elira-landing`
