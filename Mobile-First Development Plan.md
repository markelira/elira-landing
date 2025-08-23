## Senior Developer Mobile-First Development Plan: Path to 100% Score

### Project Overview
**Current Score:** 78/100  
**Target Score:** 100/100  
**Timeline:** 4 sprints (1 week each)  
**Tech Stack:** Next.js 15.5, Tailwind v4, Framer Motion, TypeScript

---

## Sprint 1: Critical Foundation (Days 1-2) 🔴
*Goal: Fix all blocking issues, establish mobile-first patterns*

### Day 1: Core Infrastructure & Critical Fixes

**Task 1.1 - Create Mobile-First Component Library**
Prompt for Claude Code:
"Create a new directory `/components/mobile` with reusable mobile-first components:
1. Create `TouchTarget.tsx` wrapper that enforces 44px minimum touch areas with visual debugging in dev mode
2. Create `ResponsiveContainer.tsx` that prevents horizontal overflow using `max-w-[100vw]` and `overflow-x-hidden`
3. Create `MobileButton.tsx` extending Button.tsx with enforced minimums: sm=44px, md=48px, lg=52px height
4. Create `MobileInput.tsx` with hardcoded 16px font-size to prevent iOS zoom, minimum 48px height
5. Add a `useMobileDevice()` hook that detects touch devices and viewport size
6. Create `useSwipeGesture()` hook for consistent swipe handling across components"

**Task 1.2 - Fix All Touch Targets**
Prompt for Claude Code:
"Audit and fix all interactive elements to meet touch target minimums:
1. Update `/components/ui/Button.tsx` sizes object to include `min-h-[44px]` for small, `min-h-[48px]` for medium
2. Find and wrap all icon-only buttons with the new TouchTarget component
3. Add `touch-manipulation` class to all interactive elements
4. Create a development-only visual overlay that highlights elements below 44px (toggle with ctrl+shift+T)
5. Update FloatingNavbar nav items to have proper padding for touch
6. Fix Footer links by adding `inline-block py-2 px-1` for proper touch areas"

**Task 1.3 - Eliminate Horizontal Scroll**
Prompt for Claude Code:
"Fix all fixed-width elements causing overflow:
1. Replace all decorative blur elements using `w-64 h-64` with `w-[min(16rem,40vw)] h-[min(16rem,40vw)]`
2. Audit all `absolute` positioned elements and add `max-w-[100vw]` constraint
3. Wrap HeroSection in ResponsiveContainer to prevent any overflow
4. Add global CSS rule: `body { overflow-x: hidden; }` with comment explaining mobile overflow prevention
5. Create a utility class `.safe-blur` that safely handles decorative elements without overflow"

### Day 2: Navigation & Forms

**Task 1.4 - Mobile Navigation Overhaul**
Prompt for Claude Code:
"Implement a proper mobile navigation pattern:
1. Create `MobileNavigation.tsx` with hamburger menu that slides in from right using Framer Motion
2. Show only logo and hamburger icon on mobile (<768px)
3. Implement focus trap when menu is open
4. Add backdrop click and ESC key to close
5. Ensure PDF dropdown in mobile nav uses full width with proper padding
6. Add bottom border to active nav item for clarity
7. Implement `useScrollLock()` hook to prevent body scroll when menu open"

**Task 1.5 - Form Input Optimization**
Prompt for Claude Code:
"Fix all form inputs for mobile:
1. Update EmailCaptureModal: replace all inputs with MobileInput component
2. Add explicit `fontSize: '16px'` style to prevent iOS zoom
3. Change form spacing from `space-y-4` to `space-y-6` for better touch separation
4. Implement custom Select component using Radix UI or HeadlessUI for consistent mobile experience
5. Add visual focus indicators with 2px ring for accessibility
6. Ensure all form labels are clickable and focus their associated input"

---

## Sprint 2: High Priority UX (Days 3-5) 🟠
*Goal: Enhance core user interactions and performance*

### Day 3: Modal & Interaction Patterns

**Task 2.1 - Modal Enhancement**
Prompt for Claude Code:
"Upgrade all modals for better mobile UX:
1. Add swipe-down-to-close gesture using Framer Motion drag with visual rubber band effect
2. Implement dual close options: top X button AND bottom 'Close' button for one-handed use
3. Add `overscroll-behavior-contain` to modal content to prevent background scroll
4. Reduce CookieBanner max-height from 80vh to 50vh on mobile
5. Add minimized state for cookie banner (swipe down to minimize, not dismiss)
6. Implement `aria-modal` and proper focus management for accessibility"

**Task 2.2 - Exit Intent Mobile Strategy**
Prompt for Claude Code:
"Adapt ExitIntentPopup for mobile devices:
1. Replace mouse-leave detection with scroll-based trigger (show after 70% scroll on mobile)
2. Add time-based fallback (show after 45 seconds if not triggered)
3. Implement 'rapid scroll up' detection as exit intent signal
4. Add localStorage flag to prevent showing more than once per session
5. Create smaller, less intrusive mobile version of the popup"

### Day 4: Performance Optimization

**Task 2.3 - Animation Performance**
Prompt for Claude Code:
"Optimize animations for mobile performance:
1. Implement `prefers-reduced-motion` media query support in all Framer Motion animations
2. Replace CSS blur effects with backdrop-filter where possible for better performance
3. Reduce blur radius on mobile: desktop 3xl -> mobile xl
4. Add `will-change-transform` to animated elements but remove after animation
5. Implement intersection observer to pause off-screen animations
6. Create `useReducedMotion()` hook for consistent motion preferences"

**Task 2.4 - Image & Asset Optimization**
Prompt for Claude Code:
"Optimize all images and assets for mobile:
1. Convert all img tags to Next.js Image component with proper sizing
2. Add loading='lazy' and fetchPriority='low' for below-fold images
3. Implement responsive images with srcSet for different screen densities
4. Add blur placeholder for hero images using Next.js plaiceholder
5. Reduce decorative element sizes by 40% on mobile
6. Implement critical CSS inlining for above-fold content"

### Day 5: Text & Content Optimization

**Task 2.5 - Typography Scaling**
Prompt for Claude Code:
"Implement proper progressive text scaling:
1. Update HeroSection headline from `text-4xl lg:text-6xl` to `text-3xl sm:text-4xl md:text-5xl lg:text-6xl`
2. Audit all text sizes and add intermediate breakpoints where jumps are >1.5x
3. Implement fluid typography using clamp() for smooth scaling
4. Ensure minimum 16px font size for body text on mobile
5. Add `.text-balance` utility for better headline wrapping
6. Increase line-height on mobile for better readability outdoors"

**Task 2.6 - Grid & Layout Optimization**
Prompt for Claude Code:
"Optimize grid layouts for mobile devices:
1. Update LeadMagnetsGrid from single column to `grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3`
2. Implement card carousel option for mobile using Framer Motion swipe
3. Add numbered indicators for carousel pages
4. Ensure cards have consistent height with flex-grow content areas
5. Add subtle shadows for better card separation on white backgrounds"

---

## Sprint 3: Enhanced Mobile Features (Days 6-8) 🟡
*Goal: Add mobile-specific enhancements*

### Day 6: Touch Gestures & Interactions

**Task 3.1 - Comprehensive Gesture Support**
Prompt for Claude Code:
"Implement native mobile gestures throughout:
1. Add swipe navigation between PDF options in PDFSelectorModal
2. Implement pull-to-refresh on main page using Framer Motion
3. Add long-press context menus for PDF downloads
4. Implement pinch-to-zoom for PDF previews
5. Add momentum scrolling for all scrollable areas with `-webkit-overflow-scrolling: touch`
6. Create gesture hints/tutorials for first-time users"

**Task 3.2 - Mobile-Specific Features**
Prompt for Claude Code:
"Add mobile-native functionality:
1. Implement Web Share API for sharing PDFs with native share sheet
2. Add 'Add to Home Screen' PWA prompt after 2 visits
3. Implement offline support with service worker for cached content
4. Add haptic feedback using Vibration API for key actions (if supported)
5. Create floating action button (FAB) for primary CTA on mobile
6. Add 'Back to Top' button that appears after scrolling"

### Day 7: Accessibility & Testing

**Task 3.3 - Mobile Accessibility**
Prompt for Claude Code:
"Ensure complete mobile accessibility:
1. Add skip links for keyboard navigation
2. Implement proper heading hierarchy (h1 -> h2 -> h3)
3. Ensure 4.5:1 contrast ratio for all text on mobile
4. Add aria-labels for all icon-only buttons
5. Implement focus-visible styles for keyboard users
6. Add screen reader announcements for dynamic content changes"

**Task 3.4 - Testing Infrastructure**
Prompt for Claude Code:
"Set up comprehensive mobile testing:
1. Create `/app/test/mobile` route with device frame preview
2. Add viewport size indicator overlay in development
3. Create Storybook stories for all mobile components
4. Implement visual regression tests for key breakpoints
5. Add console warnings for components missing mobile optimization
6. Create mobile performance budget monitoring"

### Day 8: Advanced Optimizations

**Task 3.5 - Progressive Enhancement**
Prompt for Claude Code:
"Implement progressive enhancement features:
1. Add CSS Grid fallbacks for older browsers
2. Implement feature detection for modern APIs
3. Add loading skeletons for all async content
4. Implement optimistic UI updates for form submissions
5. Add error boundaries with mobile-friendly error states
6. Create lightweight version for 2G/3G connections"

---

## Sprint 4: Polish & PWA Features (Days 9-10) ✅
*Goal: Final polish and advanced features for 100% score*

### Day 9: PWA Implementation

**Task 4.1 - Full PWA Setup**
Prompt for Claude Code:
"Convert to Progressive Web App:
1. Create manifest.json with all required fields and app icons
2. Implement service worker with offline caching strategy
3. Add install prompt with custom UI
4. Implement background sync for form submissions
5. Add push notification support (optional)
6. Create app shell architecture for instant loading"

**Task 4.2 - Advanced Mobile Features**
Prompt for Claude Code:
"Add premium mobile features:
1. Implement dark mode with system preference detection
2. Add landscape-specific layouts for tablets
3. Create bottom tab navigation for main sections
4. Implement iOS safe area handling for notched devices
5. Add reading progress indicator
6. Create adaptive icons for Android 8+"

### Day 10: Final Audit & Optimization

**Task 4.3 - Performance Fine-tuning**
Prompt for Claude Code:
"Final performance optimizations:
1. Implement route prefetching for instant navigation
2. Add resource hints (preconnect, dns-prefetch)
3. Optimize Critical Rendering Path
4. Implement adaptive loading based on connection speed
5. Add memory management for long sessions
6. Reduce JavaScript bundle with code splitting"

**Task 4.4 - Final Audit & Documentation**
Prompt for Claude Code:
"Complete final audit and documentation:
1. Run Lighthouse audit and fix any remaining issues
2. Test on real devices using BrowserStack
3. Create mobile testing checklist document
4. Document all mobile-specific features
5. Create troubleshooting guide for common issues
6. Set up monitoring for Web Vitals"

---

## Validation Checklist for 100% Score

### Core Requirements ✓
- [ ] All touch targets ≥44px
- [ ] No horizontal scroll on any viewport
- [ ] Forms don't zoom on iOS
- [ ] Mobile navigation pattern implemented
- [ ] All modals closeable with multiple methods

### Performance Metrics ✓
- [ ] Lighthouse Mobile: 95+
- [ ] First Contentful Paint: <1.8s
- [ ] Largest Contentful Paint: <2.5s
- [ ] Total Blocking Time: <200ms
- [ ] Cumulative Layout Shift: <0.1

### Enhanced Features ✓
- [ ] PWA installable
- [ ] Offline support
- [ ] Share functionality
- [ ] Gesture navigation
- [ ] Dark mode support

### Testing Coverage ✓
- [ ] iPhone SE (375px)
- [ ] iPhone 14 (390px)
- [ ] Android Standard (360px)
- [ ] iPad Portrait (768px)
- [ ] Landscape orientations

---

## Continuous Improvement Process

**Weekly Mobile Review:**
1. Check Web Vitals dashboard
2. Review user feedback for mobile issues
3. Test new features on mobile first
4. Update component library with new patterns
5. Run automated mobile tests

**Monthly Audits:**
1. Full Lighthouse audit
2. Real device testing
3. Accessibility audit
4. Performance budget review
5. Update mobile documentation

---

## Success Metrics

**Technical Metrics:**
- Lighthouse Mobile Score: 100/100
- Zero horizontal scroll issues
- All touch targets validated
- <2% mobile bounce rate improvement

**Business Metrics:**
- Mobile conversion rate +25%
- Mobile session duration +40%
- Mobile form completion +35%
- App installs: 100+ monthly

---

## Risk Mitigation

**Rollback Strategy:**
- Feature flags for each sprint
- Canary deployment (5% -> 25% -> 100%)
- A/B testing for major changes
- Automated rollback on error spike

**Browser Compatibility:**
- Test on iOS 14+
- Test on Android 9+
- Progressive enhancement for older browsers
- Graceful degradation for unsupported features

This plan will take you from 78% to 100% mobile score with modern, maintainable patterns that scale with your application.