⏺ 🎯 MVP-ONLY MIGRATION PLAN

  Timeline: 2-3 weeks | Focus: Must-have features for course platform

  ---
  PHASE 0: PRE-PRODUCTION SETUP ⚙️

  Duration: 1 day | Blocked without this

  🔥 CRITICAL INFRASTRUCTURE

  # 1. Backup Current State
  git branch backup-landing-page
  git add . && git commit -m "Backup before elira migration"

  # 2. Dependencies Analysis & Installation
  npm install @tanstack/react-query zustand @mux/mux-player-react
  npm install @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-progress
  npm install class-variance-authority clsx tailwind-merge
  npm install zod react-hook-form @hookform/resolvers

  # 3. Environment Configuration
  # Copy these from elira to .env.local:
  NEXT_PUBLIC_MUX_ENV_KEY=xxx
  STRIPE_SECRET_KEY=sk_xxx
  STRIPE_PUBLISHABLE_KEY=pk_xxx

  🗂️ Directory Structure Setup

  mkdir -p src/{stores,hooks,types,components/ui}
  mkdir -p src/app/{dashboard,admin,courses}
  mkdir -p functions/src/{routes,services,utils}

  🔧 Config Files Migration

  - Copy tailwind.config.js advanced config from elira
  - Copy tsconfig.json with path aliases
  - Update next.config.ts with optimizations
  - Copy Firebase emulator config

  ---
  PHASE 1: CORE INFRASTRUCTURE MIGRATION 🏗️

  Duration: 2 days | Foundation for everything

  🎯 1.1 Firebase Backend (CRITICAL)

  // Priority Files to Copy & Adapt:
  functions/src/
  ├── authActions.ts          # User auth & registration
  ├── courseActions.ts        # Course CRUD operations
  ├── paymentActions.ts       # Stripe integration
  ├── userActions.ts          # User management
  └── config.ts              # Firebase config

  Implementation:
  - Copy all Firebase Functions from elira
  - Update Firebase project IDs to match elira-landing
  - Deploy functions: firebase deploy --only functions
  - Test emulator: firebase emulators:start

  🎯 1.2 Type System Migration

  // Copy from elira/src/types/index.ts
  interface Course {
    id: string
    title: string
    description: string
    price: number
    instructorId: string
    modules: Module[]
    status: 'DRAFT' | 'PUBLISHED'
  }

  interface User {
    id: string
    email: string
    role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN'
    enrolledCourses: string[]
  }

  🎯 1.3 State Management Setup

  // Copy & adapt elira/src/stores/authStore.ts
  // Must have: user, isAuthenticated, login, logout
  // Remove: university multi-tenancy features

  ---
  PHASE 2: AUTHENTICATION SYSTEM UPGRADE 🔐

  Duration: 2 days | Blocks user access

  🎯 2.1 Replace Current Auth System

  # Files to Replace:
  contexts/AuthContext.tsx → Use elira's AuthProvider
  components/ClientProviders.tsx → Upgrade to Zustand
  components/modals/AuthModal.tsx → Use elira's auth components

  🎯 2.2 Auth Components Migration

  // Copy from elira:
  src/components/auth/
  ├── LoginForm.tsx
  ├── RegisterForm.tsx
  └── AuthWrapper.tsx

  // Must-have features only:
  - Email/password login
  - Registration with role assignment
  - Role-based route protection
  - Session persistence

  🎯 2.3 Firebase Auth Rules

  // Copy firestore.rules from elira
  // Simplify: Remove university multi-tenancy
  // Keep: Role-based access control

  ---
  PHASE 3: COURSE MANAGEMENT MVP 📚

  Duration: 3 days | Core business logic

  🎯 3.1 Course Creation (Instructors)

  // Copy & simplify elira's course creation:
  src/components/course-creation/
  ├── CourseCreationWizard.tsx  # 3-step wizard
  ├── CourseBasicInfoStep.tsx   # Title, description, price
  └── CoursePublishStep.tsx     # Publish course

  // MVP Features ONLY:
  ✅ Basic course info (title, description, price)
  ✅ Simple curriculum structure
  ✅ Publish/unpublish
  ❌ Advanced modules/lessons (Phase 4)
  ❌ Assessments/quizzes
  ❌ Advanced content types

  🎯 3.2 Course Browsing (Students)

  // Copy from elira:
  src/app/courses/
  ├── page.tsx              # Course catalog
  └── [courseId]/page.tsx   # Course details

  // MVP Features:
  ✅ Course listing with filters
  ✅ Course detail page
  ✅ Enrollment button
  ✅ Basic search
  ❌ Advanced filtering
  ❌ Recommendations

  🎯 3.3 Database Schema

  // Firestore Collections (MVP):
  courses/
    {courseId}: {
      title: string,
      description: string,
      price: number,
      instructorId: string,
      status: 'DRAFT' | 'PUBLISHED',
      createdAt: timestamp
    }

  enrollments/
    {userId_courseId}: {
      userId: string,
      courseId: string,
      enrolledAt: timestamp,
      status: 'ACTIVE' | 'COMPLETED'
    }

  ---
  PHASE 4: VIDEO PLAYER MVP 🎥

  Duration: 3 days | Core learning experience

  🎯 4.1 Mux Integration Setup

  # Required: Mux account setup
  1. Create Mux account
  2. Get API keys
  3. Configure webhook endpoints

  🎯 4.2 Basic Video Player

  // Copy from elira (simplified):
  src/components/lesson/
  ├── VideoPlayer.tsx           # Mux player component
  ├── LessonSidebar.tsx        # Course navigation
  └── UnifiedLessonPlayer.tsx  # Player layout

  // MVP Features ONLY:
  ✅ Play/pause video
  ✅ Progress tracking
  ✅ Course navigation
  ✅ Resume functionality
  ❌ Advanced controls (speed, quality)
  ❌ Note-taking
  ❌ Bookmarks
  ❌ Analytics

  🎯 4.3 Learning Routes

  // Copy from elira:
  src/app/courses/[courseId]/
  ├── learn/page.tsx      # Course learning page
  └── player/[lessonId]/page.tsx # Individual lesson player

  🎯 4.4 Progress Tracking (Basic)

  // Firestore schema:
  lessonProgress/
    {userId_lessonId}: {
      userId: string,
      lessonId: string,
      courseId: string,
      watchTime: number,
      completed: boolean,
      lastPosition: number
    }

  ---
  PHASE 5: PAYMENT INTEGRATION MVP 💳

  Duration: 2 days | Revenue generation

  🎯 5.1 Stripe Integration

  // Copy from elira (enable disabled code):
  functions/src/
  ├── paymentActions.ts    # Course purchase
  ├── services/stripe.ts   # Stripe service
  └── routes/payment.ts    # Webhook handling

  // MVP Features:
  ✅ Course purchase flow
  ✅ Stripe Checkout
  ✅ Payment success/failure handling
  ✅ Course access after payment
  ❌ Subscriptions
  ❌ Coupons/discounts
  ❌ Refunds

  🎯 5.2 Purchase Flow

  // User journey:
  1. Browse course → 2. Click "Enroll" → 3. Stripe Checkout → 4. Access course

  🎯 5.3 Replace Current Lead Capture

  # Remove current email capture modals
  # Replace with course enrollment flow
  # Keep pricing: 7,990 HUF (convert to EUR)

  ---
  PHASE 6: USER DASHBOARD MVP 👤

  Duration: 2 days | User experience

  🎯 6.1 Student Dashboard

  // Copy from elira (simplified):
  src/app/dashboard/
  ├── page.tsx              # Main dashboard
  ├── my-learning/page.tsx  # Enrolled courses
  └── profile/page.tsx      # User profile

  // MVP Features:
  ✅ Enrolled courses list
  ✅ Continue learning section
  ✅ Basic progress overview
  ✅ Profile management
  ❌ Analytics/charts
  ❌ Achievements
  ❌ Social features

  🎯 6.2 Instructor Dashboard

  // MVP Features:
  ✅ My courses list
  ✅ Create new course
  ✅ Basic course stats (enrollments)
  ❌ Detailed analytics
  ❌ Student management
  ❌ Revenue reports

  ---
  PHASE 7: ADMIN PANEL MVP 👑

  Duration: 2 days | Platform management

  🎯 7.1 Basic Admin Interface

  // Copy from elira (simplified):
  src/app/admin/
  ├── dashboard/page.tsx  # Basic stats
  ├── users/page.tsx      # User management
  └── courses/page.tsx    # Course management

  // MVP Features:
  ✅ User list & role management
  ✅ Course approval/rejection
  ✅ Basic platform stats
  ✅ Payment status overview
  ❌ Advanced analytics
  ❌ Bulk operations
  ❌ Audit logs

  🎯 7.2 Admin Functions

  // Firebase Functions (admin only):
  - getUsers() - User management
  - updateUserRole() - Role changes
  - approveCourse() - Course moderation
  - getPayments() - Payment overview

  ---
  PHASE 8: PRODUCTION DEPLOYMENT 🚀

  Duration: 1 day | Go live

  🎯 8.1 Environment Setup

  # Production environment variables
  # Firebase project setup (production)
  # Mux production environment  
  # Stripe live keys
  # Domain configuration

  🎯 8.2 Testing & Launch

  # Critical user journeys:
  1. User registration → Dashboard
  2. Course creation → Publishing
  3. Course purchase → Access
  4. Video playback → Progress tracking
  5. Admin user management

  ---
  ⚡ CRITICAL SUCCESS METRICS (MVP)

  🎯 Must Work Perfectly:

  1. User Registration/Login - No bugs
  2. Course Purchase Flow - Money collection
  3. Video Playback - Core learning experience
  4. Progress Tracking - User retention
  5. Admin User Management - Platform control

  🎯 MVP Feature Checklist:

  - Users can register/login
  - Instructors can create basic courses
  - Students can browse and purchase courses
  - Video player works with progress tracking
  - Payment processing (Stripe) functional
  - Basic dashboards for all user types
  - Admin can manage users and courses

  ---
  🚨 RISK MITIGATION

  High Risk Items:

  1. Mux Integration - Have fallback video hosting ready
  2. Payment Processing - Thoroughly test Stripe webhooks
  3. Data Migration - Backup current Firebase data
  4. Authentication - Don't break current user sessions

  Go/No-Go Decision Points:

  - End of Phase 2: Auth system must work flawlessly
  - End of Phase 4: Video player must be stable
  - End of Phase 5: Payment flow must be tested

  ---
  🎯 BOTTOM LINE: 2-3 weeks to MVP with 5 core user journeys working perfectly. No bells and whistles, just a functional 
  course platform that generates revenue.

  Ready to start with Phase 0? 🚀