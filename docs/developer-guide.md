# **Elira Landing Page - Technical Project Introduction**

## **Executive Summary**

We're building a conversion-optimized landing page that leverages psychological triggers and modern web technologies to maximize lead capture for Elira's pre-launch campaign. Our approach combines **Next.js 14's blazing-fast performance** with **attention-commanding animations** via Framer Motion, creating an experience that not only captures attention but guides users naturally toward conversion. By implementing **progressive profiling** through Mailchimp's behavioral automation, we reduce initial friction while gathering rich user data over time. The architecture prioritizes both immediate impact (sub-2s load times, 90+ Lighthouse scores) and long-term scalability through Firebase's serverless infrastructure, ensuring we can handle viral growth without infrastructure concerns.

## **Phase 1: Foundation Sprint (3-4 days)**

### **Day 1: Core Infrastructure Setup**

```bash
# Project initialization
npx create-next-app@latest elira-landing --typescript --tailwind --app
cd elira-landing

# Essential dependencies
npm install framer-motion@^11.0.0
npm install react-hook-form@^7.51.0 zod@^3.22.0
npm install firebase@^10.11.0
npm install @mailchimp/mailchimp_marketing@^3.0.80
npm install @next/third-parties@^14.2.0
```

**Firebase Configuration:**
```typescript
// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  // Config from Firebase Console
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
```

**Environment Structure:**
```env
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
MAILCHIMP_API_KEY=
MAILCHIMP_AUDIENCE_ID=
MAILCHIMP_SERVER_PREFIX=
NEXT_PUBLIC_GTM_ID=
```

### **Day 2: Design System & Component Library**

**Tailwind Configuration with Aceternity:**
```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    }
  }
}
```

**Core Component Structure:**
```typescript
// components/ui/Button.tsx
interface ButtonProps {
  variant: 'primary' | 'ghost' | 'glow';
  size: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

// components/ui/Card.tsx
// Glassmorphism effect cards for lead magnets

// components/ui/AnimatedText.tsx
// Framer Motion text reveals
```

**Animation Presets:**
```typescript
// lib/animations.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

### **Day 3: Email Capture & Mailchimp Integration**

**Progressive Capture Modal:**
```typescript
// components/EmailCaptureModal.tsx
const stages = {
  QUICK: 'email_only',
  PROFILE: 'career_goals', 
  COMPLETE: 'thank_you'
};

// API Route for Mailchimp
// app/api/subscribe/route.ts
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export async function POST(request: Request) {
  const { email, merge_fields } = await request.json();
  
  // Add to Mailchimp with tags for segmentation
  const response = await mailchimp.lists.addListMember(
    process.env.MAILCHIMP_AUDIENCE_ID,
    {
      email_address: email,
      status: 'subscribed',
      merge_fields,
      tags: ['pre-launch', 'landing-page']
    }
  );
  
  // Store in Firestore for redundancy
  await addDoc(collection(db, 'leads'), {
    email,
    ...merge_fields,
    timestamp: serverTimestamp(),
    source: 'landing_page'
  });
}
```

**GTM Event Tracking:**
```typescript
// hooks/useAnalytics.ts
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      timestamp: new Date().toISOString()
    });
  }
  
  // Also log to Firebase Analytics
  if (analytics) {
    logEvent(analytics, eventName, parameters);
  }
};
```

### **Day 4: Testing & Deployment Prep**

**Firebase Hosting Configuration:**
```json
// firebase.json
{
  "hosting": {
    "public": "out",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{
      "source": "**",
      "destination": "/index.html"
    }]
  }
}
```

**Performance Optimization Checklist:**
- [ ] Image optimization with next/image
- [ ] Font subsetting and preloading
- [ ] Critical CSS inlining
- [ ] Lazy loading for below-fold content
- [ ] Bundle analysis (<200KB initial JS)

**A/B Testing Foundation (Optional):**
```typescript
// lib/experiments.ts
import { RemoteConfig } from 'firebase/remote-config';

export const getVariant = async (experimentKey: string) => {
  // Fetch from Firebase Remote Config
  const variant = getValue(remoteConfig, experimentKey);
  return variant.asString();
};
```

## **Success Metrics for Phase 1**

- ✅ **Performance**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- ✅ **Email Capture**: Working Mailchimp integration with double opt-in
- ✅ **Analytics**: GTM firing on all key events (page_view, email_submit, scroll_depth)
- ✅ **Responsive**: Flawless experience on all devices (320px → 2560px)
- ✅ **Database**: Firestore collecting leads with proper indexes

**Next Phase Preview**: Hero section with countdown timer, lead magnet grid system, social proof components, and advanced scroll-triggered animations.