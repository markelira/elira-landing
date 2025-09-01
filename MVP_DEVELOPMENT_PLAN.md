# MVP Development Plan - Essential Features Only

## MVP User Journey

**Simple Flow:**
1. User visits landing page → sees course
2. User clicks course → sees course details (title, description, lessons list)
3. User registers/login → purchases course
4. User accesses dashboard → sees purchased course with progress
5. User clicks course → watches lessons sequentially
6. User completes lessons → course marked complete

## ✅ Current Status (Infrastructure Complete)
- ✅ Authentication (register, login, logout)
- ✅ Payment processing (Stripe integration)
- ✅ Basic dashboard structure
- ✅ Course purchase flow

## 🎯 MVP Requirements - Only Essential Features

### Phase 1: Course Viewing & Access (Week 1)
**Goal: Users can see course details and access after purchase**

#### Essential Components to Migrate:
```
/course-detail/CourseDetailLayout.tsx    - Basic course info display
/course-detail/CourseHero.tsx           - Course title, description, price
/course-detail/tabs/CurriculumTab.tsx   - Simple lessons list
/course-detail/tabs/OverviewTab.tsx     - Course description
```

#### Essential Backend:
```
courseActions.ts - getCourse() function only
lessonActions.ts - getLessons() function only
```

### Phase 2: Basic Course Player (Week 2) 
**Goal: Users can watch lessons and track basic progress**

#### Essential Components to Migrate:
```
/lesson/VideoPlayer.tsx                 - Basic video playback
/lesson/LessonSidebar.tsx              - Lesson navigation
/course-player/PlayerLayout.tsx        - Simple lesson layout
/lesson/LessonContentRenderer.tsx      - Display lesson content
```

#### Essential Backend:
```
lessonProgressActions.ts - markLessonComplete(), getUserProgress()
progressSyncActions.ts - syncProgress() (basic version)
```

### Phase 3: Dashboard with Progress (Week 3)
**Goal: Users see course progress and can continue learning**

#### Enhanced Dashboard Components:
```
/dashboard/MyCoursesSection.tsx        - Show enrolled courses
/dashboard/ContinueLearningSection.tsx - Resume last lesson
/course/CourseCard.tsx                 - Course with progress bar
```

#### Essential Backend:
```
userActions.ts - getUserCourses(), getUserProgress()
```

## 🚫 Features Explicitly EXCLUDED from MVP

### Interactive Features (Later)
- Quiz system and quiz editor
- Interactive exercises
- Video chapters/bookmarks
- Note-taking features
- Advanced video controls

### Gamification (Later)
- Points, badges, leaderboards
- Achievement system
- Streaks and rewards

### Analytics & Admin (Later)
- Advanced analytics dashboard
- User management interface
- Course creation wizard
- Bulk operations

### Multi-tenant (Later)
- University management
- Branding customization
- Department organization

### Advanced Course Features (Later)
- Course Q&A system
- Course reviews/ratings
- Related courses suggestions
- Course certificates

## Essential File Structure for MVP

```
/app
  /courses
    /[id]
      /page.tsx                    ✅ (exists - enhance)
      /lessons
        /[lessonId]
          /page.tsx                ❌ NEED TO CREATE
  /dashboard
    /page.tsx                      ✅ (exists - enhance)
    /my-learning
      /page.tsx                    ✅ (exists - enhance)

/components
  /course
    /CourseDetailLayout.tsx        ❌ MIGRATE
    /CourseHero.tsx               ❌ MIGRATE  
    /CurriculumTab.tsx            ❌ MIGRATE
  /lesson
    /VideoPlayer.tsx              ✅ (exists - may need enhance)
    /LessonSidebar.tsx            ❌ MIGRATE
    /PlayerLayout.tsx             ❌ MIGRATE
  /dashboard
    /MyCoursesSection.tsx         ✅ (exists - enhance)
    /ContinueLearningSection.tsx  ✅ (exists - enhance)

/functions/src
  /courseActions.ts               ❌ MIGRATE (basic functions only)
  /lessonActions.ts               ❌ MIGRATE (basic functions only) 
  /lessonProgressActions.ts       ❌ MIGRATE
  /userActions.ts                 ❌ MIGRATE (basic functions only)
```

## MVP Backend Functions Needed

### 1. Course Management (courseActions.ts)
```typescript
getCourse(courseId)              // Get course details
getUserCourses(userId)           // Get user's enrolled courses  
```

### 2. Lesson Management (lessonActions.ts)  
```typescript
getLessons(courseId)             // Get lessons for course
getLesson(lessonId)              // Get single lesson content
```

### 3. Progress Tracking (lessonProgressActions.ts)
```typescript
markLessonComplete(userId, lessonId)     // Mark lesson done
getUserProgress(userId, courseId)        // Get course progress
getLastWatchedLesson(userId, courseId)   // Resume functionality
```

### 4. User Data (userActions.ts)
```typescript
getUserDashboardData(userId)     // Dashboard course list with progress
updateUserCourseAccess(userId)   // Sync after payment
```

## Data Models for MVP

### Course
```typescript
interface Course {
  id: string
  title: string
  description: string
  thumbnailUrl?: string
  lessons: Lesson[]
  totalLessons: number
  estimatedDuration: number
}
```

### Lesson  
```typescript
interface Lesson {
  id: string
  courseId: string
  title: string
  videoUrl: string
  duration: number
  order: number
}
```

### Progress
```typescript
interface CourseProgress {
  userId: string
  courseId: string
  completedLessons: string[]
  lastWatchedLessonId?: string
  completionPercentage: number
  lastUpdated: Date
}
```

## Development Timeline (3 Weeks)

### Week 1: Course Details & Access Control
- [ ] Migrate course detail components
- [ ] Create basic courseActions backend functions  
- [ ] Update course pages to show lesson list
- [ ] Test: User can see course details after purchase

### Week 2: Course Player
- [ ] Migrate basic video player components
- [ ] Create lesson pages with video playback
- [ ] Implement progress tracking backend
- [ ] Test: User can watch lessons and progress saves

### Week 3: Dashboard Integration  
- [ ] Enhance dashboard with real course data
- [ ] Add "Continue Learning" functionality
- [ ] Show course progress visually
- [ ] Test: Complete user journey works

## Success Criteria for MVP

1. ✅ **Course Discovery**: User can see course details and lessons list
2. ✅ **Purchase Flow**: User can buy course (already working)
3. ✅ **Course Access**: User can access purchased course content
4. ✅ **Lesson Playback**: User can watch video lessons
5. ✅ **Progress Tracking**: System remembers which lessons are completed
6. ✅ **Dashboard**: User can see course progress and resume learning
7. ✅ **Course Completion**: User can complete all lessons

## Testing Approach

- Test with Firebase emulators during development
- Create sample course data for testing
- Test complete user journey end-to-end
- Ensure mobile responsiveness (already optimized)

## Post-MVP Roadmap (Later Phases)

1. **Polish Phase**: UI improvements, loading states, error handling
2. **Interactive Phase**: Add quizzes and interactive elements  
3. **Social Phase**: Add course reviews and community features
4. **Creator Phase**: Add course creation tools for instructors
5. **Analytics Phase**: Add progress analytics and reporting

---

**This MVP focuses on the core learning experience with minimal complexity.**  
**Goal: Transform your marketing site into a functional course platform in 3 weeks.**