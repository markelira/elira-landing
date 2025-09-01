# Phase-Based Development Plan: Single Hardcoded Course MVP

## Phase 1: Foundation & Setup (15 minutes)
**Goal:** Establish the basic infrastructure for a single course page

### 1.1 Create Static Course Route
- Create `/app/courses/[courseSlug]/page.tsx` with hardcoded course data
- Define the course data structure directly in the component
- Set up basic SEO metadata for the course

### 1.2 Course Data Structure
```typescript
const COURSE_DATA = {
  id: 'your-course-id',
  slug: 'your-course-slug', 
  title: 'Course Title',
  description: 'Full description...',
  price: 49900, // in HUF
  isFree: false,
  thumbnailUrl: '/static/course-thumbnail.jpg',
  previewVideoUrl: 'video-url',
  modules: [
    {
      id: 'module-1',
      title: 'Module 1 Title',
      lessons: [
        { id: 'lesson-1', title: 'Lesson 1', type: 'VIDEO', videoUrl: 'url', duration: 900 },
        { id: 'lesson-2', title: 'Lesson 2', type: 'PDF', pdfUrl: 'url' }
      ]
    }
  ]
}
```

## Phase 2: Media Asset Management (15 minutes)
**Goal:** Handle video and PDF file hosting with professional video delivery

### 2.1 Mux Video Upload Process
1. **Upload videos directly to Mux dashboard**
   - Go to mux.com dashboard
   - Upload your course videos
   - Get the Mux Asset ID and Playback ID for each video

2. **Mux Asset Data Structure**
```typescript
const COURSE_DATA = {
  // ... other data
  modules: [
    {
      id: 'module-1',
      title: 'Module 1 Title',
      lessons: [
        { 
          id: 'lesson-1', 
          title: 'Lesson 1', 
          type: 'VIDEO', 
          muxAssetId: 'abc123',
          muxPlaybackId: 'xyz789',
          duration: 900 
        },
        { 
          id: 'lesson-2', 
          title: 'Lesson 2', 
          type: 'PDF', 
          pdfUrl: 'google-drive-public-url' 
        }
      ]
    }
  ]
}
```

### 2.2 Mux Player Implementation
- Use `@mux/mux-player-react` component (already in dependencies)
- Simple embed with Mux's optimized player
- Automatic quality adjustment and fast loading

### 2.3 Example Lesson Component
```typescript
import MuxPlayer from '@mux/mux-player-react';

// In lesson component
<MuxPlayer
  playbackId={lesson.muxPlaybackId}
  streamType="on-demand"
  controls
  style={{ height: '100%', maxWidth: '100%' }}
/>
```

### 2.4 PDF Strategy
- Upload PDFs to Google Drive with public sharing
- Use Google Drive viewer for embedded PDFs
- Direct download links for offline access

## Phase 3: Course Page UI (20 minutes)
**Goal:** Create a clean, functional course page

### 3.1 Page Layout Structure
```
Hero Section (course title, price, instructor, CTA)
├── Course Overview (description, what you'll learn)
├── Curriculum Section (modules and lessons list)
├── Pricing/Enrollment Section (buy button, features)
└── Footer
```

### 3.2 Essential Components
- **CourseHero**: Title, price, main CTA button
- **CourseOverview**: Description and key points
- **CurriculumList**: Simple expandable module/lesson list
- **PurchaseSection**: Price and enrollment button

### 3.3 No Complex Features
- No tabs (single scrolling page)
- No ratings/reviews
- No social sharing
- No instructor profiles
- Keep it minimal and focused

## Phase 4: Enrollment & Access Control (25 minutes)
**Goal:** Connect course page to existing payment system

### 4.1 Purchase Flow Integration
- Use existing payment system (Stripe integration)
- Connect "Buy Now" button to existing payment flow
- Pass hardcoded course data to payment system

### 4.2 Access Control Logic
```typescript
// In course page component
const { user } = useAuth();
const hasAccess = user && user.enrolledCourses?.includes(COURSE_DATA.id);

// Show content based on access
{hasAccess ? <CourseContent /> : <PurchasePrompt />}
```

### 4.3 Course Content Display
- **For enrolled users**: Show all videos and PDFs
- **For non-enrolled**: Show preview/description only
- Simple conditional rendering based on enrollment status

## Phase 5: Content Delivery (15 minutes)
**Goal:** Secure content access for enrolled users

### 5.1 Lesson Content Pages
- Create `/app/courses/[courseSlug]/lessons/[lessonId]/page.tsx`
- Hardcode lesson content data
- Simple video/PDF viewer components

### 5.2 Content Security
**Simple Approach:**
- Check enrollment status on page load
- Redirect to course page if not enrolled
- No complex streaming tokens - rely on obscure URLs

### 5.3 Progress Tracking (Optional)
- Simple localStorage tracking of watched lessons
- Update user's progress in Firestore
- Basic completion percentages

## Phase 6: Testing & Launch (10 minutes)
**Goal:** Verify end-to-end flow works

### 6.1 Test Scenarios
1. Anonymous user visits course page → sees preview
2. User clicks buy → goes through payment
3. Enrolled user visits course → sees full content
4. Enrolled user clicks lesson → watches video/downloads PDF

### 6.2 Quick Fixes
- Ensure all hardcoded URLs work
- Test payment flow integration
- Verify access control logic

---

## Development Steps for Claude

### Step 1: Create Static Course Page
1. Create `/app/courses/[courseSlug]/page.tsx`
2. Define hardcoded COURSE_DATA object
3. Create basic course hero and overview sections
4. Add enrollment check and conditional content display

### Step 2: Media Setup Instructions
1. Upload videos to Mux dashboard and get Playback IDs
2. Upload PDFs to Google Drive with public sharing
3. Update hardcoded COURSE_DATA with Mux Playback IDs and PDF URLs

### Step 3: Course Content Components
1. Create simple CourseHero component
2. Create CurriculumList component (no expansion/interaction)
3. Create PurchaseSection with existing payment integration
4. Wire up enrollment status checking

### Step 4: Lesson Pages
1. Create lesson page template
2. Add video/PDF viewer components
3. Implement basic access control
4. Connect to existing auth system

### Step 5: Integration Testing
1. Test anonymous user flow
2. Test payment integration
3. Test enrolled user access
4. Fix any integration issues

---

## Why This Approach Works

1. **Speed**: No database schema, no complex CRUD operations
2. **Reliability**: Hardcoded data can't have validation errors
3. **Simplicity**: Fewer moving parts = fewer bugs
4. **Scalable**: Easy to migrate to dynamic system later
5. **Testable**: Clear, predictable behavior

**Time to market: 90 minutes total**
**Risk level: Very low**
**Maintenance: Minimal until you need multiple courses**

## Media Upload Strategy

### For Videos:
1. **Mux Video Hosting** (Recommended)
   - Upload videos directly to Mux dashboard at mux.com
   - Get Mux Asset ID and Playback ID for each video
   - Use `@mux/mux-player-react` for professional video delivery
   - Benefits: Adaptive bitrate, global CDN, analytics, security options
   - Professional quality with minimal setup complexity

### For PDFs:
1. **Google Drive Public Links** (Recommended)
   - Upload to Google Drive
   - Set sharing to "Anyone with link"
   - Embed using Google Drive viewer
   - Free, reliable

2. **Direct File Upload**
   - Upload to `/public/course-assets/pdfs/`
   - Use browser PDF viewer or PDF.js
   - Direct download links

### File Organization:
```
/public/course-assets/
├── images/
│   └── course-thumbnail.jpg
├── videos/
│   ├── lesson-1-intro.mp4
│   ├── lesson-2-fundamentals.mp4
│   └── lesson-3-advanced.mp4
└── pdfs/
    ├── lesson-1-notes.pdf
    ├── lesson-2-worksheet.pdf
    └── course-certificate-template.pdf
```

## Implementation Priority:
1. **MVP Features Only**: Course page + purchase + basic lesson access
2. **External Media Hosting**: Use YouTube + Google Drive for speed
3. **Existing Payment System**: Leverage what's already built
4. **Minimal Security**: Basic enrollment checks, no complex streaming auth
5. **Simple UI**: Clean, fast, mobile-friendly but not over-engineered

This approach gets you live with a real course in under 2 hours while maintaining professional quality.