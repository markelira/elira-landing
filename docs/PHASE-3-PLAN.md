# Phase 3: Premium Features - Implementation Plan

**Status:** 🎯 Ready to Start
**Prerequisites:** Phase 2 Complete ✅
**Duration:** Estimated 2-3 days
**Last Updated:** 2025-10-08

---

## 📋 Overview

Phase 3 builds on Phase 2's foundation by adding premium engagement features that keep users active and informed throughout their 30-day program.

### Goals
- ✅ Results Tracker (Already Complete from Phase 2)
- 🎯 Notification System (Bell icon with dropdown)
- 🎯 Consultation Reminder Automation
- 🎯 Weekly Progress Insights
- 🎯 Achievement System

---

## 🎯 Phase 3 Components

### ✅ 3.1 Results Tracker (Complete)

**Status:** Already implemented in Phase 2

**What Was Built:**
- File: `components/dashboard/ResultsTracker.tsx`
- Displays implementation deliverables
- Shows progress percentage
- Provides next step recommendations

**Skip to:** 3.2 Notification System

---

### 🎯 3.2 Notification System

**Goal:** Real-time notifications for consultations, new modules, achievements, and instructor messages.

#### 3.2.1 Notification Bell Component

**File:** `components/layout/NotificationBell.tsx`

**Features:**
- Bell icon with unread count badge
- Dropdown list of notifications
- Click to mark as read
- Click to navigate to action URL
- Auto-close when clicking outside
- Color-coded by notification type:
  - Purple: Consultation reminders
  - Blue: New modules
  - Yellow: Achievements
  - Green: Instructor messages
  - Gray: System messages

**Notification Types:**
```typescript
type NotificationType =
  | 'consultation_reminder'
  | 'new_module'
  | 'achievement'
  | 'system'
  | 'instructor_message';
```

**Data Structure:**
```typescript
interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: Timestamp;
  actionUrl?: string;
  metadata?: {
    consultationId?: string;
    moduleId?: string;
    achievementId?: string;
  };
}
```

**API Endpoint:**
```typescript
GET /api/notifications
→ Returns user's notifications, sorted by createdAt desc

PATCH /api/notifications/[id]/read
→ Marks notification as read
```

**Integration Point:**
Add to dashboard layout header (next to profile):
```typescript
// app/dashboard/layout.tsx or components/layout/Header.tsx
import { NotificationBell } from '@/components/layout/NotificationBell';

<header>
  {/* Existing header content */}
  <NotificationBell />
  {/* Profile dropdown */}
</header>
```

---

#### 3.2.2 useNotifications Hook

**File:** `hooks/useNotifications.ts`

**Purpose:** Manage notification state and real-time updates

**Features:**
- Fetch user notifications
- Count unread notifications
- Mark as read
- Real-time updates with Firestore listener (optional)
- Polling fallback (every 30 seconds)

**Interface:**
```typescript
interface UseNotifications {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  refetch: () => Promise<void>;
}
```

---

#### 3.2.3 Notification APIs

**File:** `app/api/notifications/route.ts`

**GET /api/notifications**
```typescript
// Fetch user's notifications
// Query params:
//   - limit (default: 20)
//   - unreadOnly (default: false)

Response:
{
  success: true,
  notifications: Notification[],
  unreadCount: number
}
```

**File:** `app/api/notifications/[id]/read/route.ts`

**PATCH /api/notifications/[id]/read**
```typescript
// Mark notification as read

Request body:
{
  read: true
}

Response:
{
  success: true,
  notification: Notification
}
```

**File:** `app/api/notifications/mark-all-read/route.ts`

**PATCH /api/notifications/mark-all-read**
```typescript
// Mark all user's notifications as read

Response:
{
  success: true,
  updated: number  // Count of notifications updated
}
```

---

#### 3.2.4 Firestore Collections

**Collection:** `notifications`

**Document Structure:**
```typescript
{
  notificationId: string;          // Auto-generated
  userId: string;                  // Indexed
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;                   // Indexed
  createdAt: Timestamp;            // Indexed
  actionUrl?: string;
  metadata?: {
    consultationId?: string;
    moduleId?: string;
    achievementId?: string;
  };
}
```

**Indexes Required:**
```json
{
  "collectionGroup": "notifications",
  "queryScope": "COLLECTION",
  "fields": [
    { "fieldPath": "userId", "order": "ASCENDING" },
    { "fieldPath": "createdAt", "order": "DESCENDING" }
  ]
},
{
  "collectionGroup": "notifications",
  "queryScope": "COLLECTION",
  "fields": [
    { "fieldPath": "userId", "order": "ASCENDING" },
    { "fieldPath": "read", "order": "ASCENDING" },
    { "fieldPath": "createdAt", "order": "DESCENDING" }
  ]
}
```

---

### 🎯 3.3 Consultation Reminder System

**Goal:** Automated reminders for upcoming consultations

#### 3.3.1 Consultation Reminder Cloud Function

**File:** `functions/src/scheduled/consultationReminders.ts`

**Trigger:** Cloud Scheduler (runs hourly or every 30 minutes)

**Logic:**
1. Query consultations scheduled in next 24 hours
2. Check if reminder already sent (metadata.reminderSent)
3. For each consultation without reminder:
   - Create notification for user
   - Send email reminder (optional)
   - Mark consultation.metadata.reminderSent = true

**Notification Created:**
```typescript
{
  type: 'consultation_reminder',
  title: 'Közelgő konzultáció',
  message: 'A konzultációd 24 órán belül kezdődik: {consultationDate}',
  actionUrl: '/dashboard#consultation',
  metadata: {
    consultationId: 'cons-123'
  }
}
```

**Cloud Scheduler Config:**
```yaml
# firebase.json
{
  "functions": {
    "cron": {
      "consultationReminders": "0 */1 * * *"  # Every hour
    }
  }
}
```

---

#### 3.3.2 Consultation Data Update

**Extend Consultation Interface:**
```typescript
interface Consultation {
  // Existing fields...
  metadata: {
    reminderSent: boolean;
    reminderSentAt?: Timestamp;
  };
}
```

**Update seed script:**
```bash
# scripts/seed-consultations.js
# Add metadata field when creating consultations
```

---

### 🎯 3.4 Weekly Insights System

**Goal:** Automated weekly progress summaries sent to users

#### 3.4.1 Weekly Insights Cloud Function

**File:** `functions/src/scheduled/weeklyInsights.ts`

**Trigger:** Cloud Scheduler (runs every Monday at 9 AM)

**Logic:**
1. Query all users with active implementations
2. For each user:
   - Calculate week's progress
   - Compare to previous week
   - Generate insights notification
   - Optionally send email summary

**Insights Calculated:**
- Days completed this week
- Deliverables completed
- Comparison to program average
- Upcoming milestones
- Encouragement message

**Notification Created:**
```typescript
{
  type: 'system',
  title: 'Heti összefoglaló',
  message: 'Gratulálunk! {daysCompleted} napot teljesítettél ezen a héten.',
  actionUrl: '/dashboard',
  metadata: {
    weekNumber: 2,
    daysCompleted: 5,
    deliverablesCompleted: 2
  }
}
```

**Cloud Scheduler Config:**
```yaml
{
  "functions": {
    "cron": {
      "weeklyInsights": "0 9 * * 1"  # Every Monday at 9 AM
    }
  }
}
```

---

#### 3.4.2 Weekly Insights Email Template

**File:** `functions/src/templates/weeklyInsightsEmail.ts`

**Content:**
```html
Subject: Heti Haladásod - {week}. Hét

Szia {userName},

Gratulálunk! Íme a heted összefoglalója:

📊 Ezen a héten:
- {daysCompleted} nap teljesítve
- {deliverablesCompleted} eredmény leadva
- {lessonsCompleted} lecke befejezve

🎯 Következő héten:
- {upcomingMilestone}

📈 Haladásod: {progressPercentage}% (Program átlag: {averageProgress}%)

{encouragementMessage}

[Mutasd a részleteket a dashboardon]

Üdvözlettel,
Elira Csapat
```

---

### 🎯 3.5 Achievement System

**Goal:** Gamification with badges and milestones

#### 3.5.1 Achievement Definitions

**File:** `lib/achievements.ts`

**Achievement Types:**
```typescript
interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;  // Icon name from lucide-react
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  criteria: {
    type: 'days_completed' | 'deliverables_submitted' | 'lessons_completed' | 'consultation_attended';
    threshold: number;
  };
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_week',
    name: 'Első hét hőse',
    description: 'Teljesítetted az első 7 napot',
    icon: 'Trophy',
    tier: 'bronze',
    criteria: { type: 'days_completed', threshold: 7 }
  },
  {
    id: 'halfway_there',
    name: 'Félúton',
    description: '15 nap teljesítve',
    icon: 'Award',
    tier: 'silver',
    criteria: { type: 'days_completed', threshold: 15 }
  },
  {
    id: 'program_complete',
    name: 'Program bajnok',
    description: 'Teljesítetted a 30 napos programot',
    icon: 'Star',
    tier: 'gold',
    criteria: { type: 'days_completed', threshold: 30 }
  },
  {
    id: 'first_deliverable',
    name: 'Első eredmény',
    description: 'Leadtad az első eredményedet',
    icon: 'CheckCircle',
    tier: 'bronze',
    criteria: { type: 'deliverables_submitted', threshold: 1 }
  },
  {
    id: 'consultation_master',
    name: 'Konzultáció mester',
    description: '3 konzultáción részt vettél',
    icon: 'Users',
    tier: 'silver',
    criteria: { type: 'consultation_attended', threshold: 3 }
  }
];
```

---

#### 3.5.2 Achievement Checker Cloud Function

**File:** `functions/src/triggers/checkAchievements.ts`

**Trigger:** Firestore onUpdate for `implementations` collection

**Logic:**
1. When implementation updates, check all achievements
2. Compare user progress against achievement criteria
3. Award new achievements
4. Create notification for each new achievement
5. Update user's `userProgress.achievements` array

**Firestore Trigger:**
```typescript
export const checkAchievements = functions.firestore
  .document('implementations/{userId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const userId = context.params.userId;

    // Check each achievement
    for (const achievement of ACHIEVEMENTS) {
      // Check if already earned
      const hasAchievement = await checkUserHasAchievement(userId, achievement.id);
      if (hasAchievement) continue;

      // Check if criteria met
      const meetsCriteria = checkCriteria(after, achievement.criteria);
      if (meetsCriteria) {
        await awardAchievement(userId, achievement);
      }
    }
  });
```

---

#### 3.5.3 Achievement Display Component

**File:** `components/dashboard/AchievementsCard.tsx`

**Purpose:** Show earned achievements in dashboard

**Features:**
- Grid of earned achievement badges
- Lock icon for unearned achievements
- Progress bar to next achievement
- Click to see achievement details

**Layout:**
```tsx
<div className="bg-white rounded-xl p-6">
  <h3>Eredmények</h3>

  <div className="grid grid-cols-3 gap-4">
    {achievements.map(achievement => (
      <AchievementBadge
        key={achievement.id}
        achievement={achievement}
        earned={userAchievements.includes(achievement.id)}
      />
    ))}
  </div>

  <div className="mt-4">
    <p>Következő: {nextAchievement.name}</p>
    <ProgressBar progress={progressToNext} />
  </div>
</div>
```

---

## 📁 File Structure

```
Phase 3 New Files:

components/
  layout/
    NotificationBell.tsx          (New - notification dropdown)
  dashboard/
    AchievementsCard.tsx          (New - achievement badges)

hooks/
  useNotifications.ts             (New - notification state)

app/api/
  notifications/
    route.ts                      (New - GET notifications)
    [id]/
      read/
        route.ts                  (New - PATCH mark as read)
    mark-all-read/
      route.ts                    (New - PATCH mark all read)

functions/src/
  scheduled/
    consultationReminders.ts      (New - hourly reminder check)
    weeklyInsights.ts             (New - Monday morning insights)
  triggers/
    checkAchievements.ts          (New - achievement checker)
  templates/
    weeklyInsightsEmail.ts        (New - email template)

lib/
  achievements.ts                 (New - achievement definitions)

types/
  database.ts                     (Update - add Notification, Achievement)

firestore.indexes.json            (Update - add notification indexes)
firebase.json                     (Update - add cron schedules)
```

---

## 🔧 Implementation Steps

### Step 1: Notification System Foundation (Day 1)

1. **Create Notification Data Model**
   - [ ] Update `types/database.ts` with Notification interface
   - [ ] Add Firestore indexes to `firestore.indexes.json`
   - [ ] Deploy indexes: `firebase deploy --only firestore:indexes`

2. **Build Notification APIs**
   - [ ] Create `app/api/notifications/route.ts` (GET)
   - [ ] Create `app/api/notifications/[id]/read/route.ts` (PATCH)
   - [ ] Create `app/api/notifications/mark-all-read/route.ts` (PATCH)
   - [ ] Test with curl/Postman

3. **Build useNotifications Hook**
   - [ ] Create `hooks/useNotifications.ts`
   - [ ] Implement fetch, markAsRead, markAllAsRead
   - [ ] Add polling (30s interval)
   - [ ] Test with mock data

4. **Build NotificationBell Component**
   - [ ] Create `components/layout/NotificationBell.tsx`
   - [ ] Implement dropdown with notifications list
   - [ ] Add click-outside-to-close logic
   - [ ] Style with color-coded types
   - [ ] Test interactions

5. **Integrate into Dashboard**
   - [ ] Add NotificationBell to header
   - [ ] Test with real user data
   - [ ] Verify unread count updates

---

### Step 2: Consultation Reminders (Day 2 Morning)

1. **Update Consultation Model**
   - [ ] Add `metadata.reminderSent` field to Consultation type
   - [ ] Update seed script with metadata

2. **Build Reminder Cloud Function**
   - [ ] Create `functions/src/scheduled/consultationReminders.ts`
   - [ ] Query consultations in next 24 hours
   - [ ] Create notifications for each
   - [ ] Mark consultation as reminded

3. **Configure Cloud Scheduler**
   - [ ] Add cron schedule to `firebase.json`
   - [ ] Deploy function: `firebase deploy --only functions`
   - [ ] Test with Firebase Emulator
   - [ ] Verify notifications created

---

### Step 3: Weekly Insights (Day 2 Afternoon)

1. **Build Insights Cloud Function**
   - [ ] Create `functions/src/scheduled/weeklyInsights.ts`
   - [ ] Calculate weekly progress
   - [ ] Generate insight notification
   - [ ] Optionally send email

2. **Create Email Template**
   - [ ] Create `functions/src/templates/weeklyInsightsEmail.ts`
   - [ ] Design HTML email
   - [ ] Add dynamic content placeholders

3. **Configure Scheduler**
   - [ ] Add Monday 9 AM cron to `firebase.json`
   - [ ] Deploy and test

---

### Step 4: Achievement System (Day 3)

1. **Define Achievements**
   - [ ] Create `lib/achievements.ts`
   - [ ] Define 5-10 achievements
   - [ ] Set criteria and tiers

2. **Build Achievement Checker**
   - [ ] Create `functions/src/triggers/checkAchievements.ts`
   - [ ] Implement Firestore trigger
   - [ ] Award achievement logic
   - [ ] Create notification

3. **Build Achievement Display**
   - [ ] Create `components/dashboard/AchievementsCard.tsx`
   - [ ] Design badge grid
   - [ ] Add progress to next achievement

4. **Integration**
   - [ ] Add to dashboard below Phase 2 components
   - [ ] Test achievement unlocking
   - [ ] Verify notifications appear

---

## 🧪 Testing Checklist

### Notification System
- [ ] Notifications fetch correctly
- [ ] Unread count accurate
- [ ] Mark as read updates badge
- [ ] Dropdown closes on outside click
- [ ] Action URLs navigate correctly
- [ ] Different notification types styled correctly

### Consultation Reminders
- [ ] Cloud Function runs on schedule
- [ ] Reminders created 24h before consultation
- [ ] Duplicate reminders prevented
- [ ] Notification appears in bell

### Weekly Insights
- [ ] Function runs every Monday at 9 AM
- [ ] Insights calculate correctly
- [ ] Notifications created for all active users
- [ ] Email sent (if implemented)

### Achievements
- [ ] Achievements unlock at correct thresholds
- [ ] No duplicate achievements awarded
- [ ] Notifications created on unlock
- [ ] Badge display correct
- [ ] Progress to next achievement accurate

---

## 📊 Success Metrics

Phase 3 complete when:
- [ ] NotificationBell component functional in header
- [ ] All 3 notification APIs working (GET, PATCH read, PATCH all read)
- [ ] Consultation reminders automated
- [ ] Weekly insights scheduled
- [ ] Achievement system unlocking badges
- [ ] Zero TypeScript errors
- [ ] All tests passing
- [ ] Documentation complete

---

## 🚀 Deployment

See detailed deployment guide in `PHASE-3-DEPLOYMENT.md` (to be created).

**Quick Deploy:**
```bash
# 1. Deploy Firestore indexes
firebase deploy --only firestore:indexes

# 2. Deploy Cloud Functions
firebase deploy --only functions

# 3. Seed notification test data
node scripts/seed-notifications.js USER_ID

# 4. Test in dashboard
npm run dev
# Navigate to /dashboard and check notification bell
```

---

## 📚 Documentation

- Implementation guide: This document
- Testing checklist: To be created
- Deployment guide: To be created
- API reference: To be added to PHASE-2-SUMMARY.md

---

**Created:** 2025-10-08
**Status:** 🎯 Ready to Start
**Prerequisites:** Phase 2 Complete ✅
