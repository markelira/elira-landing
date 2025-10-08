# Elira Dashboard Enhancement - Complete Developer Plan

**Project**: Premium Educational Dashboard Implementation
**Platform**: Next.js 15.5.0 + Firebase + TypeScript
**Timeline**: 3 Phases (Foundation → Engagement → Premium)
**Author**: Full-Stack Development Team
**Date**: October 8, 2025

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Database Schema Design](#database-schema-design)
3. [Phase 1: Foundation & Infrastructure](#phase-1-foundation--infrastructure)
4. [Phase 2: Engagement Features](#phase-2-engagement-features)
5. [Phase 3: Premium Features](#phase-3-premium-features)
6. [Testing Strategy](#testing-strategy)
7. [Deployment Plan](#deployment-plan)
8. [Monitoring & Analytics](#monitoring--analytics)

---

## Architecture Overview

### Current Stack
- **Frontend**: Next.js 15.5.0 (App Router), React 19, TypeScript
- **Backend**: Firebase Functions (Node.js)
- **Database**: Firestore
- **Auth**: Firebase Authentication
- **Storage**: Firebase Storage
- **Hosting**: Vercel (Frontend) + Firebase (Backend)

### Data Flow Architecture
```
User Action → Frontend Component → API Route → Firebase Function → Firestore
                    ↓                                                  ↓
              Local State Update                            Real-time Listener
                    ↓                                                  ↓
              UI Re-render ← ← ← ← ← ← ← ← ← ← ← ← ← ← Data Sync
```

### Key Principles
1. **No Mock Data**: All data must come from Firestore collections
2. **Real-time Updates**: Use Firestore real-time listeners where applicable
3. **Scalability**: Design for 10,000+ concurrent users
4. **Performance**: Target < 200ms API response time
5. **Accessibility**: WCAG 2.1 AA compliance minimum

---

## Database Schema Design

### 1. User Progress Collection (`userProgress`)
**Path**: `/userProgress/{userId}`

```typescript
interface UserProgress {
  userId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;

  // Learning Statistics
  totalCourses: number;
  completedCourses: number;
  totalLearningTime: number; // seconds
  lastActivityAt: Timestamp;

  // Streak Tracking
  currentStreak: number; // consecutive days
  longestStreak: number;
  lastStreakDate: string; // YYYY-MM-DD format

  // Course-specific Progress
  enrolledCourses: Array<{
    courseId: string;
    courseTitle: string;
    enrolledAt: Timestamp;
    lastAccessedAt: Timestamp;
    progressPercentage: number;
    completedLessons: number;
    totalLessons: number;
    nextLessonId?: string;
    isCompleted: boolean;
    completedAt?: Timestamp;
  }>;
}
```

### 2. Learning Activities Collection (`learningActivities`)
**Path**: `/learningActivities/{userId}/activities/{activityId}`

```typescript
interface LearningActivity {
  activityId: string;
  userId: string;
  timestamp: Timestamp;
  type: 'lesson_started' | 'lesson_completed' | 'quiz_taken' | 'template_downloaded' | 'consultation_attended' | 'module_completed';

  courseId: string;
  lessonId?: string;
  moduleId?: string;

  metadata: {
    duration?: number; // seconds spent
    score?: number; // for quizzes
    templateId?: string;
    consultationId?: string;
  };
}
```

### 3. Consultations Collection (`consultations`)
**Path**: `/consultations/{consultationId}`

```typescript
interface Consultation {
  consultationId: string;
  courseId: string;
  userId: string;
  instructorId: string;

  scheduledAt: Timestamp;
  duration: number; // minutes
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';

  meetingLink?: string;
  meetingPlatform: 'zoom' | 'google_meet' | 'teams';

  // Preparation
  prepTasks: Array<{
    taskId: string;
    title: string;
    completed: boolean;
    completedAt?: Timestamp;
  }>;

  // Post-consultation
  notes?: string; // Instructor notes
  recordingUrl?: string;
  attendanceStatus: 'attended' | 'no_show' | 'cancelled' | null;
  attendedAt?: Timestamp;

  // Notifications
  remindersSent: {
    '24h': boolean;
    '1h': boolean;
  };

  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### 4. Implementation Tracking Collection (`implementations`)
**Path**: `/implementations/{userId}`

```typescript
interface Implementation {
  userId: string;
  courseId: string;

  // 30-day program tracking
  programStartDate: string; // YYYY-MM-DD
  currentDay: number; // 1-30

  // Milestones
  milestones: Array<{
    milestoneId: string;
    title: string;
    description: string;
    targetDay: number;
    completed: boolean;
    completedAt?: Timestamp;
    proofUrl?: string; // screenshot/document upload
  }>;

  // Deliverables
  deliverables: {
    marketResearchCompleted: boolean;
    marketResearchCompletedAt?: Timestamp;

    buyerPersonasCreated: number;
    buyerPersonasData?: Array<{
      personaId: string;
      name: string;
      createdAt: Timestamp;
    }>;

    campaignsLaunched: number;
    campaignsData?: Array<{
      campaignId: string;
      type: 'email' | 'landing_page' | 'ad' | 'other';
      title: string;
      launchedAt: Timestamp;
      status: 'draft' | 'active' | 'paused' | 'completed';
    }>;

    abTestsRunning: number;
    abTestsData?: Array<{
      testId: string;
      title: string;
      startedAt: Timestamp;
      status: 'running' | 'completed';
    }>;
  };

  // Overall Progress
  implementationProgress: number; // 0-100

  updatedAt: Timestamp;
}
```

### 5. Templates Collection (`templates`)
**Path**: `/templates/{templateId}`

```typescript
interface Template {
  templateId: string;
  title: string;
  description: string;
  category: 'landing_page' | 'email_campaign' | 'buyer_persona' | 'research_framework' | 'ad_copy';

  fileUrl: string; // Firebase Storage URL
  fileType: 'pdf' | 'docx' | 'xlsx' | 'figma' | 'html';
  thumbnailUrl?: string;

  courseId: string; // Which course this belongs to
  moduleId?: string; // Which module introduces this

  downloadCount: number;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### 6. Template Downloads Collection (`templateDownloads`)
**Path**: `/templateDownloads/{userId}/downloads/{downloadId}`

```typescript
interface TemplateDownload {
  downloadId: string;
  userId: string;
  templateId: string;

  downloadedAt: Timestamp;

  // Usage tracking
  used: boolean;
  usedAt?: Timestamp;
  feedback?: {
    rating: number; // 1-5
    comment?: string;
  };
}
```

### 7. Notifications Collection (`notifications`)
**Path**: `/notifications/{userId}/items/{notificationId}`

```typescript
interface Notification {
  notificationId: string;
  userId: string;

  type: 'consultation_reminder' | 'new_module' | 'achievement' | 'system' | 'instructor_message';
  title: string;
  message: string;

  actionUrl?: string;
  actionText?: string;

  icon?: string; // Icon identifier
  priority: 'low' | 'medium' | 'high';

  read: boolean;
  readAt?: Timestamp;

  metadata?: {
    consultationId?: string;
    courseId?: string;
    achievementId?: string;
  };

  createdAt: Timestamp;
  expiresAt?: Timestamp; // Auto-delete after date
}
```

### 8. Achievements Collection (`achievements`)
**Path**: `/achievements/{userId}/earned/{achievementId}`

```typescript
interface UserAchievement {
  achievementId: string;
  userId: string;

  achievementType: 'first_module' | 'week_streak' | 'template_master' | 'consultation_champion' | 'course_complete';
  title: string;
  description: string;
  iconUrl: string;

  earnedAt: Timestamp;
  progress: number; // 0-100 if in progress
  targetValue: number;
  currentValue: number;
}
```

### 9. Weekly Insights Collection (`weeklyInsights`)
**Path**: `/weeklyInsights/{userId}/weeks/{weekId}`

```typescript
interface WeeklyInsight {
  weekId: string; // YYYY-WW format
  userId: string;

  weekStartDate: string; // YYYY-MM-DD
  weekEndDate: string; // YYYY-MM-DD

  metrics: {
    totalLearningTime: number; // seconds
    lessonsCompleted: number;
    modulesCompleted: number;
    templatesDownloaded: number;
    consultationsAttended: number;
  };

  comparison: {
    previousWeekLearningTime: number;
    percentageChange: number; // -100 to +100
    trend: 'improving' | 'stable' | 'declining';
  };

  recommendations: string[];

  generatedAt: Timestamp;
}
```

### 10. Course Timeline Collection (`courseTimelines`)
**Path**: `/courseTimelines/{courseId}`

```typescript
interface CourseTimeline {
  courseId: string;

  duration: number; // total days (e.g., 30)

  modules: Array<{
    moduleId: string;
    moduleNumber: number;
    title: string;
    targetDay: number; // When this should be completed

    lessons: Array<{
      lessonId: string;
      lessonNumber: number;
      title: string;
      duration: number; // minutes
      videoUrl?: string;
      unlockDay: number; // Day when lesson becomes available
    }>;
  }>;

  milestones: Array<{
    milestoneId: string;
    title: string;
    day: number;
    description: string;
    type: 'module_complete' | 'consultation' | 'deliverable' | 'checkpoint';
  }>;

  updatedAt: Timestamp;
}
```

---

## Phase 1: Foundation & Infrastructure

**Duration**: Week 1-2
**Goal**: Build database infrastructure, API layer, and data collection mechanisms

### 1.1 Database Setup

#### Task 1.1.1: Create Firestore Collections
**File**: `functions/src/scripts/initializeCollections.ts`

```typescript
import * as admin from 'firebase-admin';

export async function initializeCollections() {
  const db = admin.firestore();

  // Create indexes
  await createIndexes();

  // Set up security rules
  await updateSecurityRules();

  console.log('Collections initialized successfully');
}

async function createIndexes() {
  // Composite indexes for efficient queries
  // These will be created via Firebase Console or CLI
  const indexes = [
    {
      collection: 'learningActivities',
      fields: ['userId', 'timestamp'],
    },
    {
      collection: 'notifications',
      fields: ['userId', 'read', 'createdAt'],
    },
    {
      collection: 'consultations',
      fields: ['userId', 'scheduledAt'],
    },
  ];

  console.log('Indexes to create:', indexes);
}
```

**Firestore Security Rules**:
```javascript
// File: firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // User Progress - users can read/write their own
    match /userProgress/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Learning Activities - users can create their own
    match /learningActivities/{userId}/activities/{activityId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
    }

    // Consultations - users can read/update their own
    match /consultations/{consultationId} {
      allow read: if request.auth != null &&
        (request.auth.uid == resource.data.userId ||
         request.auth.uid == resource.data.instructorId);
      allow update: if request.auth != null && request.auth.uid == resource.data.userId;
    }

    // Implementations - users can read/write their own
    match /implementations/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Templates - all authenticated users can read
    match /templates/{templateId} {
      allow read: if request.auth != null;
    }

    // Template Downloads - users can read/write their own
    match /templateDownloads/{userId}/downloads/{downloadId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
    }

    // Notifications - users can read/update their own
    match /notifications/{userId}/items/{notificationId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId;
    }

    // Achievements - users can read their own
    match /achievements/{userId}/earned/{achievementId} {
      allow read: if request.auth != null && request.auth.uid == userId;
    }

    // Weekly Insights - users can read their own
    match /weeklyInsights/{userId}/weeks/{weekId} {
      allow read: if request.auth != null && request.auth.uid == userId;
    }

    // Course Timelines - all authenticated users can read
    match /courseTimelines/{courseId} {
      allow read: if request.auth != null;
    }
  }
}
```

#### Task 1.1.2: Initialize User Progress on Signup
**File**: `functions/src/triggers/onUserCreate.ts`

```typescript
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  const db = admin.firestore();

  const userProgress: UserProgress = {
    userId: user.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    totalCourses: 0,
    completedCourses: 0,
    totalLearningTime: 0,
    lastActivityAt: admin.firestore.FieldValue.serverTimestamp(),
    currentStreak: 0,
    longestStreak: 0,
    lastStreakDate: new Date().toISOString().split('T')[0],
    enrolledCourses: [],
  };

  await db.collection('userProgress').doc(user.uid).set(userProgress);

  console.log(`Initialized progress for user ${user.uid}`);
});
```

### 1.2 API Layer Development

#### Task 1.2.1: User Progress API
**File**: `app/api/users/[userId]/progress/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/firebase-admin';
import { db } from '@/lib/firebase-admin';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);

    // Verify user is requesting their own data
    if (decodedToken.uid !== params.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Fetch user progress
    const progressDoc = await db.collection('userProgress').doc(params.userId).get();

    if (!progressDoc.exists) {
      // Initialize if doesn't exist
      const initialProgress = {
        userId: params.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        totalCourses: 0,
        completedCourses: 0,
        totalLearningTime: 0,
        lastActivityAt: new Date(),
        currentStreak: 0,
        longestStreak: 0,
        lastStreakDate: new Date().toISOString().split('T')[0],
        enrolledCourses: [],
      };

      await db.collection('userProgress').doc(params.userId).set(initialProgress);

      return NextResponse.json({ success: true, data: initialProgress });
    }

    const data = progressDoc.data();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

#### Task 1.2.2: Learning Activities API
**File**: `app/api/learning-activities/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const body = await request.json();
    const { type, courseId, lessonId, moduleId, metadata } = body;

    // Create activity record
    const activityRef = db
      .collection('learningActivities')
      .doc(userId)
      .collection('activities')
      .doc();

    const activity: LearningActivity = {
      activityId: activityRef.id,
      userId,
      timestamp: new Date(),
      type,
      courseId,
      lessonId,
      moduleId,
      metadata: metadata || {},
    };

    await activityRef.set(activity);

    // Update user progress
    await updateUserProgress(userId, type, metadata);

    // Check for achievements
    await checkAchievements(userId, type);

    return NextResponse.json({ success: true, activityId: activityRef.id });
  } catch (error) {
    console.error('Error creating learning activity:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

async function updateUserProgress(userId: string, type: string, metadata: any) {
  const progressRef = db.collection('userProgress').doc(userId);

  const updates: any = {
    lastActivityAt: new Date(),
    updatedAt: new Date(),
  };

  // Add learning time if provided
  if (metadata?.duration) {
    updates.totalLearningTime = admin.firestore.FieldValue.increment(metadata.duration);
  }

  // Update streak
  const today = new Date().toISOString().split('T')[0];
  const progressDoc = await progressRef.get();
  const progressData = progressDoc.data();

  if (progressData?.lastStreakDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (progressData?.lastStreakDate === yesterdayStr) {
      // Continue streak
      updates.currentStreak = admin.firestore.FieldValue.increment(1);
      updates.lastStreakDate = today;

      // Update longest streak if needed
      const newStreak = (progressData?.currentStreak || 0) + 1;
      if (newStreak > (progressData?.longestStreak || 0)) {
        updates.longestStreak = newStreak;
      }
    } else {
      // Streak broken, reset
      updates.currentStreak = 1;
      updates.lastStreakDate = today;
    }
  }

  await progressRef.update(updates);
}

async function checkAchievements(userId: string, activityType: string) {
  // Achievement logic will be implemented in Phase 3
  // For now, just log
  console.log(`Checking achievements for user ${userId} after ${activityType}`);
}
```

#### Task 1.2.3: Consultations API
**File**: `app/api/consultations/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase-admin';

// GET: Fetch user's consultations
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    // Fetch consultations
    const consultationsSnapshot = await db
      .collection('consultations')
      .where('userId', '==', userId)
      .orderBy('scheduledAt', 'desc')
      .limit(10)
      .get();

    const consultations = consultationsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, consultations });
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST: Create new consultation
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const body = await request.json();
    const { courseId, scheduledAt, instructorId } = body;

    const consultationRef = db.collection('consultations').doc();

    const consultation: Consultation = {
      consultationId: consultationRef.id,
      courseId,
      userId,
      instructorId: instructorId || 'default-instructor-id',
      scheduledAt: new Date(scheduledAt),
      duration: 60, // 60 minutes default
      status: 'scheduled',
      meetingPlatform: 'zoom',
      prepTasks: [
        { taskId: '1', title: 'Videók 1-3 megtekintése', completed: false },
        { taskId: '2', title: 'Sablon kitöltése', completed: false },
        { taskId: '3', title: 'Kérdések beküldése', completed: false },
      ],
      attendanceStatus: null,
      remindersSent: {
        '24h': false,
        '1h': false,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await consultationRef.set(consultation);

    // Schedule reminder notifications
    await scheduleConsultationReminders(consultationRef.id, userId, scheduledAt);

    return NextResponse.json({ success: true, consultationId: consultationRef.id });
  } catch (error) {
    console.error('Error creating consultation:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

async function scheduleConsultationReminders(
  consultationId: string,
  userId: string,
  scheduledAt: Date
) {
  // This will be implemented with Cloud Scheduler or Pub/Sub
  console.log(`Scheduling reminders for consultation ${consultationId}`);
}
```

#### Task 1.2.4: Notifications API
**File**: `app/api/notifications/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase-admin';

// GET: Fetch user's notifications
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const { searchParams } = new URL(request.url);
    const unreadOnly = searchParams.get('unreadOnly') === 'true';

    let query = db
      .collection('notifications')
      .doc(userId)
      .collection('items')
      .orderBy('createdAt', 'desc')
      .limit(50);

    if (unreadOnly) {
      query = query.where('read', '==', false);
    }

    const notificationsSnapshot = await query.get();

    const notifications = notificationsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const unreadCount = notifications.filter(n => !n.read).length;

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH: Mark notification as read
export async function PATCH(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const body = await request.json();
    const { notificationId } = body;

    await db
      .collection('notifications')
      .doc(userId)
      .collection('items')
      .doc(notificationId)
      .update({
        read: true,
        readAt: new Date(),
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating notification:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

### 1.3 Data Collection Hooks

#### Task 1.3.1: Video Tracking Hook
**File**: `hooks/useVideoTracking.ts`

```typescript
import { useEffect, useRef } from 'react';
import { auth } from '@/lib/firebase';

export function useVideoTracking(
  courseId: string,
  lessonId: string,
  videoElement: HTMLVideoElement | null
) {
  const startTimeRef = useRef<number>(0);
  const totalWatchTimeRef = useRef<number>(0);

  useEffect(() => {
    if (!videoElement) return;

    const handlePlay = () => {
      startTimeRef.current = Date.now();
    };

    const handlePause = () => {
      if (startTimeRef.current > 0) {
        const watchTime = (Date.now() - startTimeRef.current) / 1000; // seconds
        totalWatchTimeRef.current += watchTime;
        startTimeRef.current = 0;
      }
    };

    const handleEnded = async () => {
      handlePause();

      // Log lesson completion
      try {
        const user = auth.currentUser;
        if (!user) return;

        const token = await user.getIdToken();

        await fetch('/api/learning-activities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            type: 'lesson_completed',
            courseId,
            lessonId,
            metadata: {
              duration: Math.round(totalWatchTimeRef.current),
            },
          }),
        });

        console.log('Lesson completion tracked');
      } catch (error) {
        console.error('Error tracking lesson completion:', error);
      }
    };

    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('ended', handleEnded);

    return () => {
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, [videoElement, courseId, lessonId]);

  return {
    totalWatchTime: totalWatchTimeRef.current,
  };
}
```

#### Task 1.3.2: Template Download Tracking
**File**: `hooks/useTemplateDownload.ts`

```typescript
import { auth } from '@/lib/firebase';

export function useTemplateDownload() {
  const trackDownload = async (templateId: string) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const token = await user.getIdToken();

      await fetch('/api/templates/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ templateId }),
      });

      // Also log as learning activity
      await fetch('/api/learning-activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          type: 'template_downloaded',
          courseId: 'ai-copywriting-course', // Get from context
          metadata: { templateId },
        }),
      });

      console.log('Template download tracked');
    } catch (error) {
      console.error('Error tracking template download:', error);
    }
  };

  return { trackDownload };
}
```

### 1.4 Frontend Hooks

#### Task 1.4.1: Real-time Progress Hook
**File**: `hooks/useUserProgressRealtime.ts`

```typescript
import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export function useUserProgressRealtime() {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setProgressData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const unsubscribe = onSnapshot(
      doc(db, 'userProgress', user.uid),
      (snapshot) => {
        if (snapshot.exists()) {
          setProgressData(snapshot.data());
        } else {
          setProgressData(null);
        }
        setIsLoading(false);
      },
      (err) => {
        console.error('Error listening to progress:', err);
        setError(err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  return { progressData, isLoading, error };
}
```

#### Task 1.4.2: Notifications Hook
**File**: `hooks/useNotifications.ts`

```typescript
import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export function useNotifications(unreadOnly = false) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    let q = query(
      collection(db, 'notifications', user.uid, 'items'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    if (unreadOnly) {
      q = query(q, where('read', '==', false));
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const notifs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNotifications(notifs);
        setUnreadCount(notifs.filter(n => !n.read).length);
        setIsLoading(false);
      },
      (error) => {
        console.error('Error listening to notifications:', error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, unreadOnly]);

  const markAsRead = async (notificationId: string) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ notificationId }),
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return { notifications, unreadCount, isLoading, markAsRead };
}
```

### 1.5 Testing Phase 1

**Test Checklist**:
- [ ] User progress document created on signup
- [ ] Learning activities logged correctly
- [ ] Streak calculation works (test consecutive days)
- [ ] API authentication works
- [ ] Firestore security rules enforce user permissions
- [ ] Real-time listeners update UI immediately
- [ ] Video tracking logs watch time accurately
- [ ] Template downloads tracked

---

## Phase 2: Engagement Features

**Duration**: Week 3-4
**Goal**: Implement consultation management, template library, progress visualization

### 2.1 Consultation Management System

#### Task 2.1.1: Consultation Scheduler Component
**File**: `components/dashboard/ConsultationCard.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export function ConsultationCard() {
  const { user } = useAuth();
  const [nextConsultation, setNextConsultation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNextConsultation();
  }, [user]);

  const fetchNextConsultation = async () => {
    if (!user) return;

    try {
      const token = await user.getIdToken();
      const response = await fetch('/api/consultations', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();

      // Find next upcoming consultation
      const upcoming = data.consultations?.find(
        (c: any) => c.status === 'scheduled' && new Date(c.scheduledAt) > new Date()
      );

      setNextConsultation(upcoming);
    } catch (error) {
      console.error('Error fetching consultation:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (taskId: string, completed: boolean) => {
    // Update task completion status
    try {
      const token = await user?.getIdToken();
      await fetch(`/api/consultations/${nextConsultation.id}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ completed }),
      });

      // Refresh consultation data
      fetchNextConsultation();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (loading) {
    return <div className="animate-pulse bg-gray-200 rounded-xl h-64"></div>;
  }

  if (!nextConsultation) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <p className="text-gray-600">Nincs közelgő konzultáció</p>
        <Button className="mt-4">Konzultáció foglalása</Button>
      </div>
    );
  }

  const scheduledDate = new Date(nextConsultation.scheduledAt);
  const timeUntil = getTimeUntil(scheduledDate);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-white border-purple-200 border rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Következő konzultáció
        </h3>
        <span className="text-sm font-medium text-purple-600">
          {timeUntil}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-600" />
          <span className="text-sm text-gray-700">
            {scheduledDate.toLocaleDateString('hu-HU', {
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            })}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-gray-600" />
          <span className="text-sm text-gray-700">
            {scheduledDate.toLocaleTimeString('hu-HU', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
        <p className="text-sm font-medium text-gray-900 mb-3">
          Előkészítő feladatok:
        </p>
        <div className="space-y-2">
          {nextConsultation.prepTasks.map((task: any) => (
            <label key={task.taskId} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => toggleTask(task.taskId, e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className={`text-sm ${task.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>
                {task.title}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
        <Video className="w-4 h-4 mr-2" />
        Csatlakozás a konzultációhoz
      </Button>
    </div>
  );
}

function getTimeUntil(date: Date): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) return `${days} nap múlva`;
  if (hours > 0) return `${hours} óra múlva`;
  return 'Hamarosan';
}
```

#### Task 2.1.2: Consultation Task Update API
**File**: `app/api/consultations/[consultationId]/tasks/[taskId]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase-admin';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { consultationId: string; taskId: string } }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid;

    const body = await request.json();
    const { completed } = body;

    // Get consultation
    const consultationRef = db.collection('consultations').doc(params.consultationId);
    const consultationDoc = await consultationRef.get();

    if (!consultationDoc.exists) {
      return NextResponse.json({ error: 'Consultation not found' }, { status: 404 });
    }

    const consultationData = consultationDoc.data();

    // Verify user owns this consultation
    if (consultationData?.userId !== userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Update task
    const updatedTasks = consultationData.prepTasks.map((task: any) => {
      if (task.taskId === params.taskId) {
        return {
          ...task,
          completed,
          completedAt: completed ? new Date() : null,
        };
      }
      return task;
    });

    await consultationRef.update({
      prepTasks: updatedTasks,
      updatedAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating consultation task:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

### 2.2 Template Library System

#### Task 2.2.1: Seed Template Data
**File**: `functions/src/scripts/seedTemplates.ts`

```typescript
import * as admin from 'firebase-admin';

export async function seedTemplates() {
  const db = admin.firestore();

  const templates = [
    // Landing Page Templates
    {
      templateId: 'landing-hero-section',
      title: 'Landing Page Hero Section',
      description: 'Kutatás-alapú hero section sablon buyer persona adatokkal',
      category: 'landing_page',
      fileUrl: 'gs://elira-templates/landing-hero-section.pdf',
      fileType: 'pdf',
      thumbnailUrl: '/templates/thumbs/landing-hero.png',
      courseId: 'ai-copywriting-course',
      moduleId: 'module-3',
      downloadCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      templateId: 'landing-benefits-section',
      title: 'Landing Page Benefits Section',
      description: 'Haszon-orientált tartalom sablon fájdalompont-megoldás párokkal',
      category: 'landing_page',
      fileUrl: 'gs://elira-templates/landing-benefits.pdf',
      fileType: 'pdf',
      courseId: 'ai-copywriting-course',
      moduleId: 'module-3',
      downloadCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Email Campaign Templates
    {
      templateId: 'email-welcome-sequence',
      title: 'Welcome Email Sequence (5 részből)',
      description: '5 emailes onboarding sorozat sablon személyre szabott üzenetekkel',
      category: 'email_campaign',
      fileUrl: 'gs://elira-templates/email-welcome-sequence.docx',
      fileType: 'docx',
      courseId: 'ai-copywriting-course',
      moduleId: 'module-4',
      downloadCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Buyer Persona Templates
    {
      templateId: 'buyer-persona-template',
      title: 'Buyer Persona Sablon',
      description: 'Részletes buyer persona építő sablon piaci kutatási mezőkkel',
      category: 'buyer_persona',
      fileUrl: 'gs://elira-templates/buyer-persona.xlsx',
      fileType: 'xlsx',
      courseId: 'ai-copywriting-course',
      moduleId: 'module-2',
      downloadCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    // Research Frameworks
    {
      templateId: 'market-research-framework',
      title: 'Piackutatási Keretrendszer',
      description: 'Strukturált piackutatási sablon kompetitor elemzéssel',
      category: 'research_framework',
      fileUrl: 'gs://elira-templates/market-research.pdf',
      fileType: 'pdf',
      courseId: 'ai-copywriting-course',
      moduleId: 'module-1',
      downloadCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const batch = db.batch();

  templates.forEach((template) => {
    const docRef = db.collection('templates').doc(template.templateId);
    batch.set(docRef, template);
  });

  await batch.commit();

  console.log(`Seeded ${templates.length} templates`);
}
```

#### Task 2.2.2: Template Library Component
**File**: `components/dashboard/TemplateLibrary.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { FileText, Mail, Users, Search, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTemplateDownload } from '@/hooks/useTemplateDownload';

const categoryIcons = {
  landing_page: FileText,
  email_campaign: Mail,
  buyer_persona: Users,
  research_framework: Search,
};

export function TemplateLibrary() {
  const { user } = useAuth();
  const { trackDownload } = useTemplateDownload();
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const token = await user?.getIdToken();
      const response = await fetch('/api/templates', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();
      setTemplates(data.templates || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (template: any) => {
    await trackDownload(template.templateId);

    // Trigger actual download
    window.open(template.fileUrl, '_blank');
  };

  const categories = [
    { id: 'landing_page', label: 'Landing oldalak', count: templates.filter(t => t.category === 'landing_page').length },
    { id: 'email_campaign', label: 'Email kampányok', count: templates.filter(t => t.category === 'email_campaign').length },
    { id: 'buyer_persona', label: 'Buyer personák', count: templates.filter(t => t.category === 'buyer_persona').length },
    { id: 'research_framework', label: 'Kutatási keretrendszer', count: templates.filter(t => t.category === 'research_framework').length },
  ];

  const filteredTemplates = selectedCategory
    ? templates.filter(t => t.category === selectedCategory)
    : templates;

  if (loading) {
    return <div className="animate-pulse bg-gray-200 rounded-xl h-64"></div>;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Marketing sablonok
        </h3>
        <span className="text-xs font-medium text-gray-500">
          {templates.length} sablon
        </span>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {categories.map((category) => {
          const Icon = categoryIcons[category.id];
          const isSelected = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(isSelected ? null : category.id)}
              className={`p-4 border rounded-lg text-left transition-all ${
                isSelected
                  ? 'border-purple-300 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-200 hover:bg-purple-50/50'
              }`}
            >
              <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-purple-600' : 'text-gray-600'}`} />
              <p className="text-sm font-medium text-gray-900">{category.label}</p>
              <p className="text-xs text-gray-500">{category.count} sablon</p>
            </button>
          );
        })}
      </div>

      {/* Template List */}
      <div className="space-y-2">
        {filteredTemplates.map((template) => (
          <div
            key={template.templateId}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{template.title}</p>
              <p className="text-xs text-gray-500">{template.description}</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleDownload(template)}
              className="ml-4"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          Nincs sablon ebben a kategóriában
        </p>
      )}
    </div>
  );
}
```

#### Task 2.2.3: Templates API
**File**: `app/api/templates/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase-admin';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    await auth.verifyIdToken(token);

    const templatesSnapshot = await db
      .collection('templates')
      .orderBy('category')
      .orderBy('createdAt', 'desc')
      .get();

    const templates = templatesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, templates });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

### 2.3 Progress Visualization

#### Task 2.3.1: 30-Day Journey Timeline Component
**File**: `components/dashboard/JourneyTimeline.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Circle, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function JourneyTimeline({ courseId }: { courseId: string }) {
  const { user } = useAuth();
  const [timeline, setTimeline] = useState<any>(null);
  const [userProgress, setUserProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [courseId, user]);

  const fetchData = async () => {
    if (!user) return;

    try {
      const token = await user.getIdToken();

      // Fetch course timeline
      const timelineRes = await fetch(`/api/courses/${courseId}/timeline`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const timelineData = await timelineRes.json();

      // Fetch user implementation progress
      const implRes = await fetch(`/api/implementations/${user.uid}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const implData = await implRes.json();

      setTimeline(timelineData.timeline);
      setUserProgress(implData.implementation);
    } catch (error) {
      console.error('Error fetching journey data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !timeline) {
    return <div className="animate-pulse bg-gray-200 rounded-xl h-64"></div>;
  }

  const currentDay = userProgress?.currentDay || 1;
  const weeks = [
    { number: 1, title: 'Kutatási alapok', days: 1-7 },
    { number: 2, title: 'Buyer Personák', days: 8-14 },
    { number: 3, title: 'Kampányírás', days: 15-21 },
    { number: 4, title: 'Tesztelés & Optimalizálás', days: 22-30 },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          30 napos út
        </h3>
        <span className="text-sm text-gray-600">
          Nap {currentDay}/30
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-violet-600 transition-all duration-500"
            style={{ width: `${(currentDay / 30) * 100}%` }}
          />
        </div>
      </div>

      {/* Weekly Milestones */}
      <div className="space-y-4">
        {weeks.map((week) => {
          const isCompleted = currentDay > week.days[1];
          const isCurrent = currentDay >= week.days[0] && currentDay <= week.days[1];
          const isLocked = currentDay < week.days[0];

          return (
            <div
              key={week.number}
              className={`flex items-center gap-4 p-4 rounded-lg border ${
                isCurrent
                  ? 'border-purple-300 bg-purple-50'
                  : isCompleted
                  ? 'border-green-200 bg-green-50/50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex-shrink-0">
                {isCompleted ? (
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                ) : isCurrent ? (
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                    <Circle className="w-6 h-6 text-white fill-white" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-gray-500" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {week.number}. hét: {week.title}
                </p>
                <p className="text-xs text-gray-500">
                  Nap {week.days[0]}-{week.days[1]}
                </p>
              </div>

              {isCurrent && (
                <span className="text-xs font-medium text-purple-600 px-3 py-1 bg-purple-100 rounded-full">
                  Folyamatban
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Status Message */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          {currentDay <= 15 ? (
            '📚 Jól haladsz! Tartsd meg az ütemet a konzisztens eredményekért.'
          ) : currentDay <= 25 ? (
            '🎯 Az utolsó egyenesben vagy! A kampányoptimalizálás kulcsfontosságú.'
          ) : (
            '🏁 Már majdnem befejezted! Összpontosíts a tesztelésre és finomításra.'
          )}
        </p>
      </div>
    </div>
  );
}
```

#### Task 2.3.2: Implementation Tracker API
**File**: `app/api/implementations/[userId]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { auth, db } from '@/lib/firebase-admin';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(token);

    if (decodedToken.uid !== params.userId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const implDoc = await db.collection('implementations').doc(params.userId).get();

    if (!implDoc.exists) {
      // Initialize implementation tracking
      const startDate = new Date().toISOString().split('T')[0];

      const initialImpl = {
        userId: params.userId,
        courseId: 'ai-copywriting-course',
        programStartDate: startDate,
        currentDay: 1,
        milestones: [],
        deliverables: {
          marketResearchCompleted: false,
          buyerPersonasCreated: 0,
          campaignsLaunched: 0,
          abTestsRunning: 0,
        },
        implementationProgress: 0,
        updatedAt: new Date(),
      };

      await db.collection('implementations').doc(params.userId).set(initialImpl);

      return NextResponse.json({ success: true, implementation: initialImpl });
    }

    const implementation = implDoc.data();

    // Calculate current day based on start date
    const startDate = new Date(implementation.programStartDate);
    const today = new Date();
    const daysDiff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const currentDay = Math.min(Math.max(daysDiff + 1, 1), 30);

    // Update current day if changed
    if (implementation.currentDay !== currentDay) {
      await db.collection('implementations').doc(params.userId).update({
        currentDay,
        updatedAt: new Date(),
      });
      implementation.currentDay = currentDay;
    }

    return NextResponse.json({ success: true, implementation });
  } catch (error) {
    console.error('Error fetching implementation:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```

### 2.4 Testing Phase 2

**Test Checklist**:
- [ ] Consultation data fetched correctly
- [ ] Prep tasks can be toggled
- [ ] Time until consultation calculated accurately
- [ ] Template library displays all categories
- [ ] Template downloads tracked in database
- [ ] Journey timeline shows correct progress
- [ ] Current day calculation works
- [ ] Week status indicators display correctly

---

## Phase 3: Premium Features

**Duration**: Week 5-6
**Goal**: Results tracking, notifications, achievements, weekly insights

### 3.1 Results Tracker

#### Task 3.1.1: Results Tracker Component
**File**: `components/dashboard/ResultsTracker.tsx`

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Target, TrendingUp, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ProgressBar } from '@/components/ui/ProgressBar';

export function ResultsTracker() {
  const { user } = useAuth();
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, [user]);

  const fetchResults = async () => {
    if (!user) return;

    try {
      const token = await user.getIdToken();
      const response = await fetch(`/api/implementations/${user.uid}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();
      setResults(data.implementation);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !results) {
    return <div className="animate-pulse bg-gray-200 rounded-xl h-64"></div>;
  }

  const { deliverables, implementationProgress } = results;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Eredmények követése
        </h3>
        <Target className="w-5 h-5 text-gray-600" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Piackutatás</span>
          {deliverables.marketResearchCompleted ? (
            <span className="flex items-center gap-1 text-sm font-medium text-green-600">
              <CheckCircle className="w-4 h-4" />
              Kész
            </span>
          ) : (
            <span className="text-sm text-gray-400">Folyamatban</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Buyer personák létrehozva</span>
          <span className="text-sm font-medium text-gray-900">
            {deliverables.buyerPersonasCreated}/3
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Kampányok indítva</span>
          <span className="text-sm font-medium text-gray-900">
            {deliverables.campaignsLaunched}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">A/B tesztek futnak</span>
          <span className="text-sm font-medium text-blue-600">
            {deliverables.abTestsRunning} aktív
          </span>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">Implementálás</span>
            <span className="text-sm font-semibold text-gray-900">
              {Math.round(implementationProgress)}%
            </span>
          </div>
          <ProgressBar value={implementationProgress} color="purple" height="sm" />
        </div>
      </div>
    </div>
  );
}
```

### 3.2 Notification System

#### Task 3.2.1: Notification Bell Component
**File**: `components/layout/NotificationBell.tsx`

```typescript
'use client';

import { useState, useRef, useEffect } from 'react';
import { Bell, Calendar, PlayCircle, Trophy, X } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';

const notificationIcons = {
  consultation_reminder: Calendar,
  new_module: PlayCircle,
  achievement: Trophy,
  system: Bell,
  instructor_message: Bell,
};

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = async (notification: any) => {
    if (!notification.read) {
      await markAsRead(notification.id);
    }

    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-purple-600 rounded-full" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Értesítések</h3>
            {unreadCount > 0 && (
              <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                {unreadCount} új
              </span>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Nincs értesítésed</p>
              </div>
            ) : (
              notifications.map((notification) => {
                const Icon = notificationIcons[notification.type] || Bell;
                const bgColor = {
                  consultation_reminder: 'bg-purple-100',
                  new_module: 'bg-blue-100',
                  achievement: 'bg-yellow-100',
                  system: 'bg-gray-100',
                  instructor_message: 'bg-green-100',
                }[notification.type] || 'bg-gray-100';

                const iconColor = {
                  consultation_reminder: 'text-purple-600',
                  new_module: 'text-blue-600',
                  achievement: 'text-yellow-600',
                  system: 'text-gray-600',
                  instructor_message: 'text-green-600',
                }[notification.type] || 'text-gray-600';

                return (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                      !notification.read ? 'bg-purple-50/30' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 ${bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-4 h-4 ${iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${!notification.read ? 'font-semibold' : 'font-medium'} text-gray-900`}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {formatTimestamp(notification.createdAt)}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200">
              <button className="text-xs text-purple-600 hover:text-purple-700 font-medium w-full text-center">
                Összes megtekintése
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function formatTimestamp(timestamp: any): string {
  if (!timestamp) return '';

  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Most';
  if (diffMins < 60) return `${diffMins} perce`;
  if (diffHours < 24) return `${diffHours} órája`;
  if (diffDays < 7) return `${diffDays} napja`;

  return date.toLocaleDateString('hu-HU');
}
```

#### Task 3.2.2: Consultation Reminder Cloud Function
**File**: `functions/src/scheduled/consultationReminders.ts`

```typescript
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const sendConsultationReminders = functions.pubsub
  .schedule('every 1 hours')
  .onRun(async (context) => {
    const db = admin.firestore();
    const now = new Date();
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const in1Hour = new Date(now.getTime() + 60 * 60 * 1000);

    // Find consultations in the next 24 hours
    const consultationsSnapshot = await db
      .collection('consultations')
      .where('status', '==', 'scheduled')
      .where('scheduledAt', '>', now)
      .where('scheduledAt', '<=', in24Hours)
      .get();

    const batch = db.batch();
    let remindersSent = 0;

    for (const doc of consultationsSnapshot.docs) {
      const consultation = doc.data();
      const scheduledAt = consultation.scheduledAt.toDate();
      const timeDiff = scheduledAt.getTime() - now.getTime();
      const hoursUntil = timeDiff / (1000 * 60 * 60);

      // Send 24h reminder
      if (hoursUntil <= 24 && hoursUntil > 23 && !consultation.remindersSent['24h']) {
        await createNotification(
          consultation.userId,
          'consultation_reminder',
          'Konzultáció holnap',
          `Ne felejtsd el kitölteni az előkészítő feladatokat a holnapi konzultációhoz (${scheduledAt.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' })})`,
          `/dashboard/consultations/${doc.id}`,
          { consultationId: doc.id }
        );

        batch.update(doc.ref, {
          'remindersSent.24h': true,
        });
        remindersSent++;
      }

      // Send 1h reminder
      if (hoursUntil <= 1 && hoursUntil > 0.5 && !consultation.remindersSent['1h']) {
        await createNotification(
          consultation.userId,
          'consultation_reminder',
          'Konzultáció 1 óra múlva',
          'A konzultációd 1 órán belül kezdődik. Csatlakozz időben!',
          `/dashboard/consultations/${doc.id}`,
          { consultationId: doc.id }
        );

        batch.update(doc.ref, {
          'remindersSent.1h': true,
        });
        remindersSent++;
      }
    }

    await batch.commit();

    console.log(`Sent ${remindersSent} consultation reminders`);
    return null;
  });

async function createNotification(
  userId: string,
  type: string,
  title: string,
  message: string,
  actionUrl?: string,
  metadata?: any
) {
  const db = admin.firestore();

  const notificationRef = db
    .collection('notifications')
    .doc(userId)
    .collection('items')
    .doc();

  await notificationRef.set({
    notificationId: notificationRef.id,
    userId,
    type,
    title,
    message,
    actionUrl,
    priority: 'high',
    read: false,
    metadata: metadata || {},
    createdAt: new Date(),
  });
}
```

### 3.3 Weekly Insights Generation

#### Task 3.3.1: Weekly Insights Cloud Function
**File**: `functions/src/scheduled/generateWeeklyInsights.ts`

```typescript
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const generateWeeklyInsights = functions.pubsub
  .schedule('every sunday 18:00')
  .timeZone('Europe/Budapest')
  .onRun(async (context) => {
    const db = admin.firestore();

    // Get all users with progress
    const usersSnapshot = await db.collection('userProgress').get();

    let insightsGenerated = 0;

    for (const userDoc of usersSnapshot.docs) {
      const userId = userDoc.id;
      const progress = userDoc.data();

      // Skip if no recent activity
      if (!progress.lastActivityAt) continue;

      const lastActivity = progress.lastActivityAt.toDate();
      const daysSinceActivity = (Date.now() - lastActivity.getTime()) / (1000 * 60 * 60 * 24);

      if (daysSinceActivity > 14) continue; // Skip inactive users

      // Calculate week ID
      const now = new Date();
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay()); // Start of week (Sunday)
      weekStart.setHours(0, 0, 0, 0);

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      const weekId = `${weekStart.getFullYear()}-W${getWeekNumber(weekStart)}`;

      // Fetch this week's activities
      const activitiesSnapshot = await db
        .collection('learningActivities')
        .doc(userId)
        .collection('activities')
        .where('timestamp', '>=', weekStart)
        .where('timestamp', '<=', weekEnd)
        .get();

      const activities = activitiesSnapshot.docs.map(doc => doc.data());

      // Calculate metrics
      const totalLearningTime = activities.reduce((sum, a) => sum + (a.metadata?.duration || 0), 0);
      const lessonsCompleted = activities.filter(a => a.type === 'lesson_completed').length;
      const modulesCompleted = activities.filter(a => a.type === 'module_completed').length;
      const templatesDownloaded = activities.filter(a => a.type === 'template_downloaded').length;
      const consultationsAttended = activities.filter(a => a.type === 'consultation_attended').length;

      // Fetch previous week for comparison
      const prevWeekStart = new Date(weekStart);
      prevWeekStart.setDate(weekStart.getDate() - 7);
      const prevWeekEnd = new Date(weekEnd);
      prevWeekEnd.setDate(weekEnd.getDate() - 7);

      const prevActivitiesSnapshot = await db
        .collection('learningActivities')
        .doc(userId)
        .collection('activities')
        .where('timestamp', '>=', prevWeekStart)
        .where('timestamp', '<=', prevWeekEnd)
        .get();

      const prevActivities = prevActivitiesSnapshot.docs.map(doc => doc.data());
      const prevLearningTime = prevActivities.reduce((sum, a) => sum + (a.metadata?.duration || 0), 0);

      const percentageChange = prevLearningTime > 0
        ? ((totalLearningTime - prevLearningTime) / prevLearningTime) * 100
        : totalLearningTime > 0 ? 100 : 0;

      const trend = percentageChange > 10 ? 'improving' : percentageChange < -10 ? 'declining' : 'stable';

      // Generate recommendations
      const recommendations = generateRecommendations({
        totalLearningTime,
        lessonsCompleted,
        modulesCompleted,
        consultationsAttended,
        trend,
        currentStreak: progress.currentStreak || 0,
      });

      // Save weekly insight
      const insightRef = db
        .collection('weeklyInsights')
        .doc(userId)
        .collection('weeks')
        .doc(weekId);

      await insightRef.set({
        weekId,
        userId,
        weekStartDate: weekStart.toISOString().split('T')[0],
        weekEndDate: weekEnd.toISOString().split('T')[0],
        metrics: {
          totalLearningTime,
          lessonsCompleted,
          modulesCompleted,
          templatesDownloaded,
          consultationsAttended,
        },
        comparison: {
          previousWeekLearningTime: prevLearningTime,
          percentageChange: Math.round(percentageChange),
          trend,
        },
        recommendations,
        generatedAt: new Date(),
      });

      // Send notification
      await createWeeklyInsightNotification(userId, weekId);

      insightsGenerated++;
    }

    console.log(`Generated ${insightsGenerated} weekly insights`);
    return null;
  });

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

function generateRecommendations(data: any): string[] {
  const recommendations: string[] = [];

  if (data.totalLearningTime < 7200) { // Less than 2 hours
    recommendations.push('Próbálj meg legalább 2-3 órát tanulni hetente a jobb eredményekért');
  }

  if (data.currentStreak < 7) {
    recommendations.push('Építs egy 7 napos sorozatot a konzisztens tanuláshoz');
  }

  if (data.consultationsAttended === 0) {
    recommendations.push('Foglalj időpontot a következő konzultációra a személyre szabott támogatásért');
  }

  if (data.modulesCompleted === 0) {
    recommendations.push('Fejezd be legalább egy modult ezen a héten');
  }

  if (data.trend === 'declining') {
    recommendations.push('A tanulási időd csökken - próbálj meg visszatérni az előző heti ütemhez');
  } else if (data.trend === 'improving') {
    recommendations.push('Nagyszerű munka! Tartsd meg ezt a pozitív momentum-ot');
  }

  return recommendations;
}

async function createWeeklyInsightNotification(userId: string, weekId: string) {
  const db = admin.firestore();

  const notificationRef = db
    .collection('notifications')
    .doc(userId)
    .collection('items')
    .doc();

  await notificationRef.set({
    notificationId: notificationRef.id,
    userId,
    type: 'system',
    title: 'Heti tanulási összefoglaló elérhető',
    message: 'Nézd meg az előrehaladásodat és a személyre szabott javaslatokat',
    actionUrl: '/dashboard/insights',
    priority: 'medium',
    read: false,
    metadata: { weekId },
    createdAt: new Date(),
  });
}
```

### 3.4 Testing Phase 3

**Test Checklist**:
- [ ] Results tracker displays real implementation data
- [ ] Notification bell shows unread count
- [ ] Notifications can be marked as read
- [ ] Consultation reminders sent at correct times
- [ ] Weekly insights generated every Sunday
- [ ] Recommendations personalized based on user behavior
- [ ] All real-time listeners working
- [ ] No mock data anywhere in the system

---

## Testing Strategy

### Unit Tests
**File**: `__tests__/api/learning-activities.test.ts`

```typescript
import { POST } from '@/app/api/learning-activities/route';
import { auth, db } from '@/lib/firebase-admin';

jest.mock('@/lib/firebase-admin');

describe('Learning Activities API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a learning activity with valid auth', async () => {
    // Mock auth verification
    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: 'test-user-id' });

    // Mock Firestore operations
    const mockSet = jest.fn().mockResolvedValue(undefined);
    (db.collection as jest.Mock).mockReturnValue({
      doc: jest.fn().mockReturnValue({
        collection: jest.fn().mockReturnValue({
          doc: jest.fn().mockReturnValue({
            id: 'activity-id',
            set: mockSet,
          }),
        }),
      }),
    });

    const request = new Request('http://localhost/api/learning-activities', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer test-token',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'lesson_completed',
        courseId: 'test-course',
        lessonId: 'test-lesson',
        metadata: { duration: 600 },
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(mockSet).toHaveBeenCalled();
  });

  it('should reject unauthorized requests', async () => {
    const request = new Request('http://localhost/api/learning-activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'lesson_completed' }),
    });

    const response = await POST(request);

    expect(response.status).toBe(401);
  });
});
```

### Integration Tests
**File**: `__tests__/integration/dashboard-flow.test.ts`

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import DashboardPage from '@/app/dashboard/page';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProgressRealtime } from '@/hooks/useUserProgressRealtime';

jest.mock('@/contexts/AuthContext');
jest.mock('@/hooks/useUserProgressRealtime');

describe('Dashboard Integration', () => {
  it('should display user progress data', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { uid: 'test-user', firstName: 'John' },
      loading: false,
    });

    (useUserProgressRealtime as jest.Mock).mockReturnValue({
      progressData: {
        totalCourses: 1,
        completedCourses: 0,
        totalLearningTime: 3600,
        currentStreak: 5,
      },
      isLoading: false,
    });

    render(<DashboardPage />);

    await waitFor(() => {
      expect(screen.getByText('Üdvözöljük, John')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument(); // Total courses
      expect(screen.getByText('5 nap')).toBeInTheDocument(); // Current streak
    });
  });
});
```

### E2E Tests
**File**: `e2e/dashboard.spec.ts` (using Playwright)

```typescript
import { test, expect } from '@playwright/test';

test.describe('Dashboard E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('/auth');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'testpassword123');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
  });

  test('should display all dashboard sections', async ({ page }) => {
    await expect(page.locator('text=Masterclass beiratkozások')).toBeVisible();
    await expect(page.locator('text=Befejezett programok')).toBeVisible();
    await expect(page.locator('text=Tanulási idő')).toBeVisible();
    await expect(page.locator('text=Tanulási sorozat')).toBeVisible();
  });

  test('should open notification dropdown', async ({ page }) => {
    await page.click('button:has-text("Bell")');
    await expect(page.locator('text=Értesítések')).toBeVisible();
  });

  test('should toggle consultation prep task', async ({ page }) => {
    const checkbox = page.locator('input[type="checkbox"]').first();
    const initialState = await checkbox.isChecked();

    await checkbox.click();

    await expect(checkbox).toHaveAttribute('checked', initialState ? '' : 'checked');
  });
});
```

---

## Deployment Plan

### Pre-Deployment Checklist

1. **Environment Variables**
   - [ ] Firebase credentials configured
   - [ ] API keys secured in environment
   - [ ] Database URLs correct for production

2. **Database Setup**
   - [ ] Firestore indexes created
   - [ ] Security rules deployed
   - [ ] Collections initialized

3. **Cloud Functions**
   - [ ] All functions deployed
   - [ ] Cloud Scheduler jobs created
   - [ ] Pub/Sub topics configured

4. **Frontend**
   - [ ] Build successful (npm run build)
   - [ ] No TypeScript errors
   - [ ] All imports resolved

### Deployment Steps

#### Step 1: Deploy Firestore Rules
```bash
firebase deploy --only firestore:rules
```

#### Step 2: Deploy Cloud Functions
```bash
cd functions
npm run build
firebase deploy --only functions
```

#### Step 3: Create Cloud Scheduler Jobs
```bash
# Consultation reminders (every hour)
gcloud scheduler jobs create pubsub consultation-reminders \
  --schedule="0 * * * *" \
  --topic=consultation-reminders \
  --message-body='{"run":"reminders"}'

# Weekly insights (every Sunday at 18:00)
gcloud scheduler jobs create pubsub weekly-insights \
  --schedule="0 18 * * 0" \
  --time-zone="Europe/Budapest" \
  --topic=weekly-insights \
  --message-body='{"run":"insights"}'
```

#### Step 4: Deploy Frontend
```bash
npm run build
vercel --prod
```

#### Step 5: Seed Data (One-time)
```bash
# Seed templates
firebase functions:shell
> seedTemplates()

# Seed course timeline
> seedCourseTimeline('ai-copywriting-course')
```

### Post-Deployment Verification

1. **Test User Flow**
   - [ ] New user signup creates userProgress document
   - [ ] Video watching logs learning activities
   - [ ] Consultation created successfully
   - [ ] Template download tracked
   - [ ] Notifications appear in real-time

2. **Monitor Cloud Functions**
   - [ ] Check Cloud Functions logs
   - [ ] Verify scheduled jobs running
   - [ ] Test notification delivery

3. **Performance**
   - [ ] Dashboard loads < 2 seconds
   - [ ] API responses < 200ms
   - [ ] Real-time listeners efficient

---

## Monitoring & Analytics

### Firebase Analytics Events

Track these custom events:

```typescript
// app/lib/analytics.ts
import { logEvent } from 'firebase/analytics';
import { analytics } from './firebase';

export const trackEvent = (eventName: string, params?: any) => {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
};

// Usage examples:
trackEvent('lesson_completed', { courseId, lessonId, duration });
trackEvent('template_downloaded', { templateId, category });
trackEvent('consultation_joined', { consultationId });
trackEvent('achievement_earned', { achievementId, type });
```

### Performance Monitoring

```typescript
// app/lib/performance.ts
import { trace } from 'firebase/performance';
import { performance } from './firebase';

export const measurePerformance = (name: string) => {
  if (!performance) return { stop: () => {} };

  const t = trace(performance, name);
  t.start();

  return {
    stop: () => t.stop(),
  };
};

// Usage:
const perf = measurePerformance('fetch_user_progress');
await fetchUserProgress();
perf.stop();
```

### Error Tracking

```typescript
// app/lib/errorTracking.ts
import { logEvent } from 'firebase/analytics';

export const trackError = (error: Error, context?: any) => {
  console.error('Error:', error, context);

  logEvent(analytics, 'error', {
    error_message: error.message,
    error_stack: error.stack,
    context: JSON.stringify(context),
  });
};
```

---

## Rollback Plan

If issues arise post-deployment:

1. **Frontend Rollback**
   ```bash
   vercel rollback
   ```

2. **Cloud Functions Rollback**
   ```bash
   firebase functions:delete functionName
   firebase deploy --only functions:functionName@previous
   ```

3. **Database Rollback**
   - Firestore has automatic backups
   - Restore from backup if data corruption occurs
   - Security rules can be reverted via Firebase Console

---

## Success Metrics

### Technical Metrics
- **Uptime**: 99.9%
- **API Response Time**: < 200ms (p95)
- **Dashboard Load Time**: < 2s (p95)
- **Error Rate**: < 0.1%

### User Engagement Metrics
- **Daily Active Users (DAU)**
- **Average Session Duration**
- **Course Completion Rate**
- **Consultation Attendance Rate**
- **Template Download Rate**
- **Weekly Active Streak**

### Business Metrics
- **User Retention (7-day, 30-day)**
- **Course Purchase Conversion**
- **Implementation Completion Rate**
- **User Satisfaction (NPS)**

---

## Maintenance Plan

### Daily
- Monitor error logs
- Check API performance
- Review user feedback

### Weekly
- Analyze user engagement metrics
- Review new feature requests
- Check database performance

### Monthly
- Generate usage reports
- Optimize slow queries
- Update dependencies
- Security audit

---

## Conclusion

This plan provides a complete roadmap for building a premium, professional educational dashboard with:

- ✅ Real data collection (no mocks)
- ✅ Scalable architecture
- ✅ Real-time updates
- ✅ Comprehensive tracking
- ✅ User-centric design
- ✅ Production-ready code

**Estimated Timeline**: 6 weeks
**Team Size**: 1 full-stack engineer
**Technology**: Next.js 15.5 + Firebase + TypeScript

---

**Next Steps**:
1. Review and approve this plan
2. Begin Phase 1 implementation
3. Set up development environment
4. Initialize database collections
5. Start coding! 🚀
