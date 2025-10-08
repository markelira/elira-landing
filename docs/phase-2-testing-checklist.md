# Phase 2 Testing Checklist

Before deploying Phase 2 to production, complete this comprehensive testing checklist.

---

## ✅ Pre-Deployment Testing

### 1. Component Rendering Tests

#### JourneyTimeline
- [ ] Component renders without errors
- [ ] Displays current day count (e.g., "Nap 6/30")
- [ ] Shows 4 weekly milestones
- [ ] Week 1 shows "In Progress" status with purple indicator
- [ ] Weeks 2-4 show "Locked" status with gray lock icons
- [ ] Progress bar displays correct percentage
- [ ] Encouragement message appears
- [ ] Responsive design works on mobile/tablet/desktop

#### ConsultationCard
- [ ] Component renders without errors
- [ ] Displays next consultation date and time
- [ ] Shows countdown (e.g., "2 nap múlva")
- [ ] Renders 3 prep task checkboxes
- [ ] Task completion counter shows "0/3" initially
- [ ] Meeting platform indicator appears (Google Meet)
- [ ] "Csatlakozás" button is visible
- [ ] Clicking checkboxes updates completion counter
- [ ] API call updates Firestore when checkbox clicked

#### ResultsTracker
- [ ] Component renders without errors
- [ ] Market Research shows completion status
- [ ] Buyer Personas shows count (e.g., "1/3")
- [ ] Campaigns Launched shows count
- [ ] A/B Tests shows active count
- [ ] Overall progress bar displays
- [ ] Next step recommendation appears
- [ ] All metrics update when data changes

#### TemplateLibrary
- [ ] Component renders without errors
- [ ] Shows template count (e.g., "13 sablon")
- [ ] Displays 4 category buttons
- [ ] Category buttons show template counts
- [ ] Clicking category filters templates
- [ ] Download buttons appear on each template
- [ ] Clicking download tracks activity
- [ ] "Sablon könyvtár megtekintése" button appears

---

### 2. API Endpoint Tests

#### GET /api/users/[userId]/progress
```bash
# Test with authenticated user token
curl -H "Authorization: Bearer <TOKEN>" \
     http://localhost:3000/api/users/g0Vv742sKuclSHmpsP1sCklxit53/progress
```
- [ ] Returns 200 status
- [ ] Response includes `totalCourses`
- [ ] Response includes `enrolledCourses` array
- [ ] Response includes course progress data
- [ ] Returns 401 without authentication
- [ ] Returns 403 for unauthorized user

#### GET /api/implementations/[userId]
```bash
curl -H "Authorization: Bearer <TOKEN>" \
     http://localhost:3000/api/implementations/g0Vv742sKuclSHmpsP1sCklxit53
```
- [ ] Returns 200 status
- [ ] Response includes `currentDay` (e.g., 6)
- [ ] Response includes `totalDays` (30)
- [ ] Response includes `implementationProgress` percentage
- [ ] Response includes deliverables data
- [ ] Returns 401 without authentication

#### GET /api/consultations
```bash
curl -H "Authorization: Bearer <TOKEN>" \
     http://localhost:3000/api/consultations
```
- [ ] Returns 200 status
- [ ] Response includes consultations array
- [ ] Each consultation has `scheduledAt` timestamp
- [ ] Each consultation has `prepTasks` array
- [ ] Each consultation has `meetingLink`
- [ ] Returns empty array if no consultations
- [ ] Returns 401 without authentication

#### PATCH /api/consultations/[id]/tasks/[taskId]
```bash
curl -X PATCH \
     -H "Authorization: Bearer <TOKEN>" \
     -H "Content-Type: application/json" \
     -d '{"completed": true}' \
     http://localhost:3000/api/consultations/CONSULTATION_ID/tasks/TASK_ID
```
- [ ] Returns 200 status
- [ ] Updates task completion in Firestore
- [ ] Response includes updated consultation
- [ ] Returns 401 without authentication
- [ ] Returns 404 for invalid IDs

#### GET /api/templates
```bash
curl -H "Authorization: Bearer <TOKEN>" \
     http://localhost:3000/api/templates
```
- [ ] Returns 200 status
- [ ] Response includes templates array
- [ ] Each template has category, title, description
- [ ] Each template has fileUrl
- [ ] Can filter by category with query param
- [ ] Returns 401 without authentication

---

### 3. Data Integration Tests

#### Firestore Queries
- [ ] User progress query returns correct data
- [ ] Implementation tracker query uses correct userId
- [ ] Consultations query filters by userId
- [ ] Templates query supports category filtering
- [ ] All queries use composite indexes (no warnings)

#### Firestore Indexes
```bash
firebase firestore:indexes
```
- [ ] `consultations` index exists (userId + scheduledAt)
- [ ] `templates` index exists (category + createdAt)
- [ ] Both indexes show "READY" status
- [ ] No index warnings in Firebase console

#### Data Seeding
- [ ] Templates seeded (13 total)
  - [ ] 3 Landing Pages
  - [ ] 4 Email Campaigns
  - [ ] 3 Buyer Personas
  - [ ] 3 Market Research
- [ ] Consultation seeded for test user
- [ ] Implementation tracker seeded for test user
- [ ] User progress includes enrolled course

---

### 4. Authentication Tests

#### Firebase Admin
- [ ] Server logs show "🔐 Using Production Firebase"
- [ ] Server logs show "emulatorHost: undefined"
- [ ] No emulator mode warnings in logs
- [ ] Production credentials loaded correctly

#### User Authentication
- [ ] User can login with Google
- [ ] User can login with email/password
- [ ] Auth token properly generated
- [ ] Auth token includes custom claims
- [ ] APIs accept valid tokens
- [ ] APIs reject invalid tokens

---

### 5. Conditional Rendering Tests

#### Dashboard Page
- [ ] Phase 2 components hidden for non-enrolled users
- [ ] Phase 2 components visible for enrolled users
- [ ] Check: `progressData?.enrolledCourses?.length > 0`
- [ ] Components render in correct order:
  1. JourneyTimeline (left) & ConsultationCard (right)
  2. TemplateLibrary (full width)
  3. ResultsTracker (full width)

---

### 6. Error Handling Tests

#### Network Errors
- [ ] Components show loading state initially
- [ ] Components handle API 500 errors gracefully
- [ ] Components handle API 404 errors gracefully
- [ ] Components show error messages to user
- [ ] Error logs include helpful debugging info

#### Data Validation
- [ ] Components handle missing data fields
- [ ] Components handle null/undefined values
- [ ] Components handle empty arrays
- [ ] Components handle invalid date formats

---

### 7. Performance Tests

#### Load Times
- [ ] Dashboard loads in < 3 seconds
- [ ] API responses return in < 1 second
- [ ] No console errors or warnings
- [ ] No React hydration errors

#### Firestore Reads
- [ ] Monitor read count in Firebase console
- [ ] Verify indexes reduce read operations
- [ ] Check for unnecessary re-fetching
- [ ] Verify React Query caching works

---

### 8. Mobile Responsiveness Tests

#### Viewport Sizes
- [ ] Mobile (375px): Components stack vertically
- [ ] Tablet (768px): Grid layout adapts
- [ ] Desktop (1024px+): Full grid layout

#### Touch Interactions
- [ ] Checkboxes work on touch screens
- [ ] Buttons have proper touch targets
- [ ] Category selection works on mobile
- [ ] Download buttons trigger properly

---

### 9. Browser Compatibility Tests

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

### 10. Production Environment Tests

#### Environment Variables
```bash
# Verify all required env vars set
echo $FIREBASE_PROJECT_ID
echo $FIREBASE_CLIENT_EMAIL
# Verify FIREBASE_PRIVATE_KEY set (don't echo!)
```
- [ ] `FIREBASE_PROJECT_ID` set
- [ ] `FIREBASE_CLIENT_EMAIL` set
- [ ] `FIREBASE_PRIVATE_KEY` set
- [ ] All values match production credentials

#### Build Test
```bash
npm run build
```
- [ ] Build completes without errors
- [ ] No TypeScript errors in Phase 2 code
- [ ] Build output includes all Phase 2 routes
- [ ] Static optimization successful

---

### 11. Security Tests

#### Authentication
- [ ] Unauthenticated requests return 401
- [ ] Users can only access their own data
- [ ] API validates user ownership
- [ ] No sensitive data exposed in logs

#### Firestore Rules
- [ ] Users can read their own userProgress
- [ ] Users can read their own implementations
- [ ] Users can read their own consultations
- [ ] Users can read public templates
- [ ] Users cannot modify other users' data

---

### 12. User Acceptance Tests

#### Real User Flow
1. [ ] User logs in successfully
2. [ ] Dashboard loads with Phase 2 components
3. [ ] JourneyTimeline shows correct day
4. [ ] ConsultationCard shows next meeting
5. [ ] User can check/uncheck prep tasks
6. [ ] ResultsTracker shows current progress
7. [ ] TemplateLibrary displays templates
8. [ ] User can filter templates by category
9. [ ] User can download a template
10. [ ] Download activity is tracked

---

## 📝 Testing Notes

### Known Issues
- None currently - all components working

### Browser-Specific Issues
- None identified

### Performance Concerns
- Monitor Firestore read count in production
- Consider implementing pagination for templates if count grows > 50

---

## ✅ Sign-Off Checklist

Before marking Phase 2 as production-ready:

- [ ] All component rendering tests passed
- [ ] All API endpoint tests passed
- [ ] All data integration tests passed
- [ ] All authentication tests passed
- [ ] All error handling tests passed
- [ ] All performance tests passed
- [ ] All mobile responsiveness tests passed
- [ ] All browser compatibility tests passed
- [ ] All production environment tests passed
- [ ] All security tests passed
- [ ] All user acceptance tests passed
- [ ] Documentation complete
- [ ] Code committed to git
- [ ] Final approval from stakeholder

---

**Testing Started:** 2025-10-08
**Testing Status:** ⏳ Pending User Testing
**Last Updated:** 2025-10-08
