# Course Detail Page Development Plan

## Executive Summary
Complete migration and enhancement of the course detail page to fetch and display real course data from Firebase, incorporating the best UI/UX patterns from the Elira codebase.

## Current State Analysis

### Existing Implementation (`/app/courses/[id]/`)
- **Structure**: Basic server/client component split
- **Data**: Currently using hardcoded sample data
- **Components**: Minimal CourseDetailLayout implementation
- **Missing**: Real data fetching, complete UI components, enrollment logic

### Elira Reference Implementation (`/elira/src/app/(marketing)/courses/[courseId]/`)
- **Strengths**: 
  - Complete UI components (Hero, Tabs, Sidebar)
  - Glass morphism effects and modern design
  - Enrollment and purchase flow
  - Instructor/University display
- **Components to Migrate**:
  - CourseHero with glass effects
  - CourseDetailLayout with tab navigation
  - CourseSidebar with CTA
  - Tab components (Overview, Curriculum, Instructors, Reviews, FAQ)

## Data Requirements

### Course Data Structure
```typescript
interface CourseDetailData {
  // Core Course Info
  id: string
  title: string
  slug: string
  description: string
  shortDescription: string
  status: CourseStatus
  
  // Media
  thumbnailUrl: string
  previewVideoUrl?: string
  
  // Instructor
  instructor: {
    id: string
    firstName: string
    lastName: string
    email: string
    profilePictureUrl?: string
    title?: string
    bio?: string
  }
  
  // Category
  category: {
    id: string
    name: string
  }
  
  // Modules & Lessons
  modules: CourseModule[]
  
  // Pricing
  price: number
  isFree: boolean
  stripePriceId?: string
  
  // Stats
  enrollmentCount: number
  averageRating?: number
  totalReviews?: number
  
  // Learning Info
  objectives: string[]
  prerequisites: string[]
  targetAudience: string[]
  
  // Timestamps
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
}
```

## Development Tasks

### Phase 1: API Integration (Priority: HIGH)

#### 1.1 Update Course Hook
```typescript
// /hooks/useCourseQueries.ts
- Remove hardcoded sample data
- Implement real API call to Firebase function
- Add proper error handling
- Include enrollment status check
```

#### 1.2 Create Course Detail API Endpoint
```typescript
// /functions/src/routes/courses.ts - getCourseHandler
- Enhance to include instructor details
- Add module/lesson aggregation
- Include enrollment status for authenticated users
- Calculate real statistics
```

#### 1.3 Data Transformation Layer
```typescript
// /lib/course-utils.ts (NEW)
- Transform Firestore timestamps
- Calculate course duration
- Format pricing data
- Aggregate module/lesson counts
```

### Phase 2: Component Migration (Priority: HIGH)

#### 2.1 Migrate Core Components
From `/elira/src/components/course-detail/`:
- [ ] CourseHero.tsx → Enhanced with real data
- [ ] CourseDetailLayout.tsx → Full implementation
- [ ] CourseTabNavigation.tsx → Tab system
- [ ] CourseSidebar.tsx → Enrollment/Purchase CTAs

#### 2.2 Migrate Tab Components
From `/elira/src/components/course-detail/tabs/`:
- [ ] OverviewTab.tsx → Course overview with objectives
- [ ] CurriculumTab.tsx → Module/lesson listing
- [ ] InstructorsTab.tsx → Instructor bio and credentials
- [ ] ReviewsTab.tsx → Student reviews (Phase 2)
- [ ] FAQTab.tsx → Frequently asked questions

#### 2.3 Additional Components
- [ ] RelatedCoursesSection.tsx → Similar courses
- [ ] CourseCertificatePreview.tsx → Certificate preview

### Phase 3: Enrollment & Purchase Flow (Priority: HIGH)

#### 3.1 Enrollment Logic
```typescript
// /hooks/useEnrollment.ts (NEW)
- Check authentication status
- Verify enrollment status
- Handle free course enrollment
- Redirect to purchase for paid courses
```

#### 3.2 Purchase Integration
```typescript
// /components/course/PurchaseButton.tsx
- Integrate with Stripe checkout
- Handle success/cancel callbacks
- Update enrollment after purchase
```

#### 3.3 Access Control
```typescript
// /lib/course-access.ts (NEW)
- Check if user has access to course
- Determine preview vs full access
- Handle subscription-based access
```

### Phase 4: UI Enhancements (Priority: MEDIUM)

#### 4.1 Glass Morphism Effects
- Apply to stats cards
- University/institution badges
- Floating elements

#### 4.2 Responsive Design
- Mobile-first approach
- Tablet optimizations
- Desktop enhancements

#### 4.3 Loading States
- Skeleton loaders
- Progressive content loading
- Error boundaries

### Phase 5: Features & Polish (Priority: LOW)

#### 5.1 Video Preview
- Integrate Mux player for preview
- Add play button overlay
- Handle video loading states

#### 5.2 Social Proof
- Student count display
- Rating stars
- Success stories

#### 5.3 SEO Optimization
- Dynamic meta tags
- Structured data
- Open Graph tags

## File Structure

```
/app/courses/[id]/
├── page.tsx                    # Server component
├── CourseDetailClient.tsx      # Client wrapper
├── loading.tsx                 # Loading state
└── error.tsx                   # Error boundary

/components/course/
├── CourseDetailLayout.tsx      # Main layout
├── CourseHero.tsx              # Hero section
├── CourseTabNavigation.tsx     # Tab navigation
├── CourseSidebar.tsx           # Sidebar with CTA
├── tabs/
│   ├── OverviewTab.tsx
│   ├── CurriculumTab.tsx
│   ├── InstructorsTab.tsx
│   ├── ReviewsTab.tsx
│   └── FAQTab.tsx
├── RelatedCoursesSection.tsx
└── CourseCertificatePreview.tsx

/hooks/
├── useCourseQueries.ts         # Updated with real API
├── useEnrollment.ts            # NEW - Enrollment logic
└── useCourseAccess.ts          # NEW - Access control

/lib/
├── course-utils.ts             # NEW - Data utilities
└── course-access.ts            # NEW - Access helpers
```

## Implementation Steps

### Step 1: API Setup (2 hours)
1. Update Firebase function to return complete course data
2. Modify useCourse hook to fetch real data
3. Test API endpoint with Postman/Thunder Client

### Step 2: Component Migration (4 hours)
1. Copy components from Elira codebase
2. Update imports and dependencies
3. Adapt to current project structure
4. Replace hardcoded data with props

### Step 3: Data Integration (2 hours)
1. Connect components to real data
2. Handle loading and error states
3. Test with different course IDs

### Step 4: Enrollment Flow (3 hours)
1. Implement enrollment check
2. Add purchase button for paid courses
3. Handle success/cancel flows
4. Test complete user journey

### Step 5: UI Polish (2 hours)
1. Apply glass morphism effects
2. Ensure responsive design
3. Add loading skeletons
4. Final visual adjustments

### Step 6: Testing & QA (1 hour)
1. Test all user flows
2. Verify data display
3. Check responsive behavior
4. Performance optimization

## Success Metrics

- [ ] Course detail page loads real data from Firebase
- [ ] All course information displays correctly
- [ ] Enrollment/purchase flow works end-to-end
- [ ] Page is fully responsive
- [ ] Loading states are smooth
- [ ] Error handling is robust
- [ ] SEO meta tags are dynamic

## Risk Mitigation

1. **Data Structure Mismatch**: Create adapter functions to transform data
2. **Missing Components**: Build simplified versions first, enhance later
3. **API Performance**: Implement caching and pagination
4. **Authentication Issues**: Add proper error messages and redirect flows

## Timeline

**Total Estimated Time**: 14 hours

- Day 1: API Setup + Component Migration (6 hours)
- Day 2: Data Integration + Enrollment Flow (5 hours)
- Day 3: UI Polish + Testing (3 hours)

## Next Steps

1. ✅ Review this plan
2. Start with API endpoint enhancement
3. Begin component migration
4. Implement in phases with testing at each step
5. Deploy to staging for UAT

## Notes

- Prioritize core functionality over visual polish initially
- Ensure backward compatibility with existing course creation
- Keep SEO and performance in mind throughout
- Document API changes for other developers