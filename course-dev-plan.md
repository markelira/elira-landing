# Elira Course Platform - Developer Roadmap

## Project Overview

**Launch Target:** Thursday (4-day sprint)  
**Course Type:** AI-powered Market Research Copywriting (Hungarian)  
**Price Point:** 7,990 HUF  
**Expected Users:** ~100 paid users  
**Architecture:** Extend existing Next.js + Firebase landing page

## Tech Stack Assumptions

- **Frontend:** Next.js 15.5.0 + React 19 + TypeScript + Tailwind CSS
- **Backend:** Firebase Cloud Functions (Node.js/Express)
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth (Email/Password + Google OAuth)
- **Payments:** Stripe (HUF currency)
- **Video:** Mux (video hosting + streaming)
- **Hosting:** Firebase Hosting + Cloud Functions
- **Email:** SendGrid (existing integration)

---

## Phase 1: Core Infrastructure (Days 1-2)

### 1.1 Firebase Authentication Setup

#### 1.1.1 Configure Firebase Auth Providers
```bash
# Firebase Console Configuration
- Enable Email/Password authentication
- Enable Google OAuth provider
- Configure authorized domains
- Set up OAuth consent screen
```

#### 1.1.2 Frontend Auth Components
**File:** `/src/components/auth/AuthWrapper.tsx`
```typescript
interface AuthWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireCourseAccess?: boolean;
}
```

**File:** `/src/components/auth/LoginForm.tsx`
```typescript
interface LoginFormData {
  email: string;
  password: string;
}
// Implement: email/password login + Google OAuth button
```

**File:** `/src/components/auth/RegisterForm.tsx`
```typescript
interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
```

#### 1.1.3 Auth Cloud Functions

**Endpoint:** `POST /api/auth/register`
```typescript
interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  success: boolean;
  uid: string;
  linkedDownloads?: string[];
}
```

**Implementation Notes:**
- Create Firebase user account
- Store additional user data in Firestore `users` collection
- Run email matching logic to link existing PDF downloads
- Return linked downloads count for UX feedback

**Endpoint:** `POST /api/auth/google-callback`
```typescript
interface GoogleAuthRequest {
  idToken: string;
}
```

**Endpoint:** `GET /api/user/profile`
```typescript
interface UserProfileResponse {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  courseAccess: boolean;
  linkedDownloads: string[];
  createdAt: string;
  lastLogin: string;
}
```

**Endpoint:** `POST /api/user/link-downloads`
```typescript
interface LinkDownloadsRequest {
  uid: string;
  email: string;
}
// Logic: Query leads collection by email, associate with user
```

### 1.2 Payment Integration

#### 1.2.1 Stripe Configuration
```bash
# Environment Variables
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
```

#### 1.2.2 Payment Cloud Functions

**Endpoint:** `POST /api/payment/create-session`
```typescript
interface CreateSessionRequest {
  uid: string;
  email: string;
  successUrl: string;
  cancelUrl: string;
}

interface CreateSessionResponse {
  sessionId: string;
  checkoutUrl: string;
}
```

**Implementation:**
- Create Stripe checkout session for 7,990 HUF
- Store session ID in Firestore `payments` collection
- Set metadata: `userId`, `courseAccess: true`

**Endpoint:** `POST /api/payment/webhook`
```typescript
// Stripe webhook handler
// Events: checkout.session.completed
// Actions: 
// - Update user.courseAccess = true
// - Update payment status
// - Send confirmation email via SendGrid
```

**Endpoint:** `GET /api/payment/status/:sessionId`
```typescript
interface PaymentStatusResponse {
  status: 'pending' | 'completed' | 'failed';
  courseAccess: boolean;
}
```

### 1.3 Database Schema Updates

#### New Firestore Collections

**Collection:** `users`
```typescript
interface UserDocument {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  courseAccess: boolean;
  linkedDownloads: string[]; // IDs from leads collection
  stripeCustomerId?: string;
  createdAt: FirebaseFirestore.Timestamp;
  lastLogin: FirebaseFirestore.Timestamp;
}
```

**Collection:** `payments`
```typescript
interface PaymentDocument {
  userId: string;
  stripeSessionId: string;
  stripeCustomerId: string;
  amount: 7990;
  currency: 'huf';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  courseAccess: boolean;
  createdAt: FirebaseFirestore.Timestamp;
  completedAt?: FirebaseFirestore.Timestamp;
}
```

---

## Phase 2: Dashboard & Course Structure (Days 2-3)

### 2.1 User Dashboard Implementation

#### 2.1.1 Dashboard Layout
**File:** `/src/app/dashboard/layout.tsx`
```typescript
// Protected layout with:
// - Navigation sidebar
// - User profile header
// - Course progress indicator
// - Logout functionality
```

#### 2.1.2 Dashboard Components

**File:** `/src/components/dashboard/UserProfile.tsx`
```typescript
interface UserProfileProps {
  user: UserDocument;
  downloadedPDFs: string[];
}
// Display: name, email, registration date, course access status
```

**File:** `/src/components/dashboard/DownloadedPDFs.tsx`
```typescript
interface DownloadedPDFsProps {
  linkedDownloads: string[];
}
// Show grid of previously downloaded PDFs with re-download links
```

**File:** `/src/components/dashboard/CourseAccess.tsx`
```typescript
interface CourseAccessProps {
  hasAccess: boolean;
  onPurchase: () => void;
}
// Conditional render: Purchase button OR Course entry point
```

**File:** `/src/components/dashboard/CourseProgress.tsx`
```typescript
interface CourseProgressProps {
  userId: string;
  modules: ModuleProgress[];
}

interface ModuleProgress {
  moduleId: string;
  title: string;
  completedLessons: number;
  totalLessons: number;
  overallProgress: number; // 0-100
}
```

### 2.2 Course Content Structure

#### 2.2.1 Course Data Schema

**Collection:** `course-content`
```typescript
interface CourseDocument {
  id: 'ai-copywriting-course';
  title: 'AI-alapú piac-kutatásos copywriting';
  description: string;
  totalDuration: number; // seconds
  modules: Module[];
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  estimatedDuration: number;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  order: number;
  videoId: string; // Mux video ID
  duration: number; // seconds
  practiceSimulation?: PracticeSimulation;
  resources?: LessonResource[];
}

interface PracticeSimulation {
  type: 'interactive-form' | 'text-exercise' | 'scenario';
  title: string;
  instructions: string;
  content: any; // Flexible JSON structure
}

interface LessonResource {
  title: string;
  type: 'pdf' | 'link' | 'template';
  url: string;
}
```

#### 2.2.2 User Progress Tracking

**Collection:** `user-progress/{userId}`
```typescript
interface UserProgressDocument {
  userId: string;
  courseId: string;
  startedAt: FirebaseFirestore.Timestamp;
  lastAccessedAt: FirebaseFirestore.Timestamp;
  overallProgress: number; // 0-100
  completedModules: string[];
  currentModule: string;
  currentLesson: string;
}
```

**SubCollection:** `user-progress/{userId}/lessons`
```typescript
interface LessonProgressDocument {
  lessonId: string;
  moduleId: string;
  watchTime: number; // seconds watched
  duration: number; // total lesson duration
  progress: number; // 0-100
  completed: boolean;
  completedAt?: FirebaseFirestore.Timestamp;
  practiceCompleted?: boolean;
  lastWatchedAt: FirebaseFirestore.Timestamp;
}
```

### 2.3 Course Management Cloud Functions

**Endpoint:** `GET /api/course/content`
```typescript
interface CourseContentResponse {
  course: CourseDocument;
  userAccess: boolean;
  userProgress?: UserProgressDocument;
}
```

**Endpoint:** `POST /api/course/start`
```typescript
interface StartCourseRequest {
  userId: string;
  courseId: string;
}
// Initialize user progress tracking
```

**Endpoint:** `PUT /api/course/progress`
```typescript
interface UpdateProgressRequest {
  userId: string;
  lessonId: string;
  watchTime: number;
  completed?: boolean;
  practiceCompleted?: boolean;
}
```

---

## Phase 3: Video Player & Progress Tracking (Days 3-4)

### 3.1 Mux Integration

#### 3.1.1 Mux Configuration
```bash
# Environment Variables
MUX_TOKEN_ID=...
MUX_TOKEN_SECRET=...
MUX_WEBHOOK_SECRET=...
```

#### 3.1.2 Video Player Component

**File:** `/src/components/course/VideoPlayer.tsx`
```typescript
interface VideoPlayerProps {
  videoId: string; // Mux playback ID
  lessonId: string;
  userId: string;
  onProgress: (progress: number, currentTime: number) => void;
  onComplete: () => void;
  initialPosition?: number; // Resume from last position
}

// Implementation Requirements:
// - Use Mux Player React component
// - Auto-save progress every 30 seconds
// - Mark complete at 90% watched
// - Handle network interruptions gracefully
// - Show loading/buffering states
```

#### 3.1.3 Progress Tracking Logic

**File:** `/src/hooks/useVideoProgress.ts`
```typescript
interface UseVideoProgressProps {
  userId: string;
  lessonId: string;
  duration: number;
}

interface UseVideoProgressReturn {
  progress: number;
  saveProgress: (currentTime: number) => void;
  markComplete: () => void;
  isCompleted: boolean;
  lastPosition: number;
}
```

### 3.2 Course Navigation

#### 3.2.1 Lesson Navigation Component

**File:** `/src/components/course/LessonNavigation.tsx`
```typescript
interface LessonNavigationProps {
  currentLesson: Lesson;
  nextLesson?: Lesson;
  previousLesson?: Lesson;
  module: Module;
  onLessonChange: (lessonId: string) => void;
  progress: UserProgressDocument;
}
```

#### 3.2.2 Course Sidebar

**File:** `/src/components/course/CourseSidebar.tsx`
```typescript
interface CourseSidebarProps {
  modules: Module[];
  userProgress: UserProgressDocument;
  currentLessonId: string;
  onLessonSelect: (lessonId: string) => void;
}
// Show expandable module list with progress indicators
```

### 3.3 Practice Simulations

#### 3.3.1 Interactive Components

**File:** `/src/components/course/practice/InteractiveForm.tsx`
```typescript
interface InteractiveFormProps {
  simulation: PracticeSimulation;
  onComplete: (responses: any) => void;
}
// Simple form-based exercises (no complex validation)
```

**File:** `/src/components/course/practice/TextExercise.tsx`
```typescript
interface TextExerciseProps {
  simulation: PracticeSimulation;
  onComplete: (response: string) => void;
}
// Text area for copywriting exercises
```

**File:** `/src/components/course/practice/ScenarioPlayer.tsx`
```typescript
interface ScenarioPlayerProps {
  simulation: PracticeSimulation;
  onComplete: () => void;
}
// Step-through scenario simulations
```

### 3.4 Progress Cloud Functions

**Endpoint:** `POST /api/course/lesson/progress`
```typescript
interface LessonProgressRequest {
  userId: string;
  lessonId: string;
  currentTime: number;
  duration: number;
  completed?: boolean;
}
```

**Endpoint:** `POST /api/course/practice/complete`
```typescript
interface PracticeCompleteRequest {
  userId: string;
  lessonId: string;
  responses?: any;
}
```

---

## Phase 4: Frontend Integration & Launch (Days 4-5)

### 4.1 Hero Section Update

#### 4.1.1 Course Preview Section
**File:** `/src/components/landing/CoursePreview.tsx`
```typescript
interface CoursePreviewProps {
  courseData: {
    title: string;
    description: string;
    price: number;
    modules: number;
    duration: string;
    highlights: string[];
  };
}

// Implementation:
// - Compelling course preview under existing hero
// - Price display (7,990 HUF)
// - Course highlights/benefits
// - "Kezdd el most" CTA button
// - Testimonials placeholder
```

### 4.2 Authentication Flow Integration

#### 4.2.1 Auth Modal System
**File:** `/src/components/modals/AuthModal.tsx`
```typescript
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab: 'login' | 'register';
  onAuthSuccess: (user: UserDocument) => void;
}
```

#### 4.2.2 Route Protection
**File:** `/src/middleware.ts`
```typescript
// Protect dashboard routes
// Redirect unauthorized users to auth modal
// Handle course access verification
```

### 4.3 Dashboard Routes

#### 4.3.1 Dashboard Pages Structure
```
/dashboard
  ├── /dashboard/page.tsx          # Overview + quick stats
  ├── /dashboard/profile/page.tsx  # User profile management
  ├── /dashboard/pdfs/page.tsx     # Downloaded PDFs list
  └── /course
      ├── /course/page.tsx         # Course overview
      ├── /course/[moduleId]/page.tsx        # Module overview
      └── /course/[moduleId]/[lessonId]/page.tsx # Lesson player
```

### 4.4 Payment Flow Integration

#### 4.4.1 Checkout Integration
**File:** `/src/components/course/PurchaseButton.tsx`
```typescript
interface PurchaseButtonProps {
  userId: string;
  courseId: string;
  price: number;
  onPurchaseStart: () => void;
}
```

#### 4.4.2 Success/Cancel Pages
```
/payment/success/page.tsx  # Post-purchase confirmation
/payment/cancel/page.tsx   # Purchase cancellation handling
```

---

## Testing & Quality Assurance

### Critical Test Cases

1. **Authentication Flow**
   - Email/password registration and login
   - Google OAuth flow
   - Password reset functionality
   - Email matching for existing leads

2. **Payment Processing**
   - Stripe checkout session creation
   - Webhook processing
   - Course access grant after payment
   - Payment failure handling

3. **Course Access Control**
   - Unauthorized access prevention
   - Course content protection
   - Progress persistence
   - Video playback functionality

4. **User Experience**
   - Dashboard navigation
   - Course progression flow
   - Video player responsiveness
   - Mobile compatibility

### Pre-Launch Checklist

- [ ] Firebase security rules updated
- [ ] Stripe webhook endpoint configured
- [ ] SendGrid email templates for course access
- [ ] Mux video content uploaded and configured
- [ ] Rate limiting implemented on critical endpoints
- [ ] Error monitoring (Firebase Crashlytics)
- [ ] Performance monitoring
- [ ] Backup strategy for user data

---

## Deployment Notes

### Environment Configuration
```bash
# Production Environment Variables
FIREBASE_PROJECT_ID=elira-landing-ce927
STRIPE_SECRET_KEY=sk_live_...
MUX_TOKEN_ID=...
SENDGRID_API_KEY=...
```

### Deployment Commands
```bash
# Deploy Cloud Functions
firebase deploy --only functions

# Deploy Frontend
firebase deploy --only hosting

# Deploy Firestore Rules
firebase deploy --only firestore:rules
```

### Launch Day Protocol

1. **Pre-launch (Wednesday evening)**
   - Deploy to production
   - Run full test suite
   - Verify payment processing
   - Test email notifications

2. **Launch Day (Thursday)**
   - Monitor error rates
   - Watch payment conversions
   - Check video streaming performance
   - Respond to user support requests

3. **Post-launch monitoring**
   - User registration metrics
   - Payment conversion rates
   - Video engagement analytics
   - System performance metrics

---

**Estimated Development Time: 4 days**  
**Risk Level: High (tight timeline)**  
**Recommended Team Size: 2-3 senior developers**

Perfect! This developer roadmap provides your team with a comprehensive, step-by-step implementation guide that covers every aspect of the Thursday launch. The roadmap is structured to be immediately actionable while maintaining the aggressive timeline.

**Key benefits of this roadmap:**
- **Phase-dependent structure** ensures logical build progression  
- **Complete API specifications** with TypeScript interfaces
- **Detailed database schemas** for consistent data modeling
- **Component-level implementation guidance** with file paths
- **Production deployment protocols** and monitoring setup

**Critical success factors highlighted:**
- **Day 1-2:** Core auth and payment infrastructure (blocking dependencies)
- **Day 3-4:** Course platform and video integration (user-facing features)  
- **Day 4-5:** Frontend integration and launch preparation

The roadmap acknowledges the tight timeline while providing enough detail that your senior developers can execute efficiently without needing additional clarification.

Would you like me to elaborate on any specific phase or help prioritize features if the timeline becomes too aggressive? We could also discuss a potential MVP vs full-feature approach if needed during development.