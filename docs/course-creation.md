# 🚀 Course Creation Migration - Claude Code Implementation Prompts

## 📋 Migration Strategy Overview

Based on the comprehensive analysis, we have a **production-ready course creation system** that can save 3-4 weeks of development. Here are the detailed prompts for Claude Code to execute this migration:

## 🎯 Phase 1: Environment Setup & Dependencies (Prompt 1)

### **Prompt for Claude Code:**
```
Install the required dependencies for the course creation system migration. The analysis shows we need these specific packages:

1. Install Mux video processing packages:
   - @mux/mux-node@^12.3.0 (for backend video processing)
   - @mux/mux-player-react@^3.5.1 (for video playback)

2. Install PDF handling packages:
   - react-pdf@^10.0.1 (for PDF viewer component)
   - pdfjs-dist@^5.4.54 (PDF.js core library)

3. Install rich text editor packages:
   - react-quill@^2.0.0 (Quill-based rich text editor)
   - quill-resize-image@^1.0.11 (image resize plugin)

4. Install state management (if not already present):
   - zustand (for course wizard state management)

5. Create the following directory structure:
   - src/components/course-creation/
   - src/components/lesson/
   - src/stores/
   - src/types/course/

After installation, verify all packages are properly installed and check for any peer dependency warnings that need to be resolved.
```

## 🎯 Phase 2: Core Store Migration (Prompt 2)

### **Prompt for Claude Code:**
```
Create a comprehensive course wizard store using Zustand with persistence. Based on the analysis, this store needs to handle:

1. Create `/src/stores/courseWizardStore.ts` with the following features:
   - Multi-step wizard state (3 steps: BasicInfo → Curriculum → Publishing)
   - Course data management with proper TypeScript interfaces
   - Module and lesson management (add, update, delete)
   - Form validation for each step
   - LocalStorage persistence to prevent data loss
   - Loading states for async operations

2. Define these TypeScript interfaces:
   - CourseData (with all required fields from the analysis)
   - Module (with lessons array)
   - Lesson (supporting VIDEO, PDF, TEXT, QUIZ types)
   - Step validation logic

3. Implement these store methods:
   - setStep() - navigate between wizard steps
   - updateCourseData() - update course basic info
   - addModule(), updateModule(), deleteModule() - module management
   - addLesson(), updateLesson(), deleteLesson() - lesson management
   - isStepValid() - validation for each step
   - reset() - clear all data

4. Add persistence configuration to save progress to localStorage with the key 'course-wizard-store'

The store should handle Hungarian UI language but keep code in English.
```

## 🎯 Phase 3: Main Wizard Component (Prompt 3)

### **Prompt for Claude Code:**
```
Create the main CourseCreationWizard component based on the existing ELIRA implementation. This should be a comprehensive 3-step wizard:

1. Create `/src/components/course-creation/CourseCreationWizard.tsx`:
   - Progress indicator showing current step (1/3, 2/3, 3/3)
   - Visual step indicators with checkmarks for completed steps
   - Step names in Hungarian: "Alapadatok", "Tanterv", "Publikálás"
   - Navigation buttons (Előző/Következő/Kurzus létrehozása)
   - Integration with the Zustand store

2. Implement step routing logic:
   - Step 1: BasicInfoStep component
   - Step 2: CurriculumStep component 
   - Step 3: PublishingStep component
   - Conditional rendering based on currentStep

3. Add form validation:
   - Disable "Következő" button if current step is invalid
   - Use store's isStepValid() method
   - Show validation messages where appropriate

4. Handle wizard completion:
   - Call Firebase Cloud Function to create course
   - Show loading states during creation
   - Handle success/error states
   - Reset wizard on completion
   - Provide onComplete callback with courseId

5. Use Shadcn/UI components: Progress, Badge, Card, Button
   Include proper Hungarian text for all user-facing strings.
```

## 🎯 Phase 4: Step Components (Prompt 4)

### **Prompt for Claude Code:**
```
Create the three wizard step components that integrate with the course wizard store:

1. Create `/src/components/course-creation/steps/BasicInfoStep.tsx`:
   - Course title input (required)
   - Short and long description textareas
   - Category selection dropdown
   - Difficulty level selection (Kezdő/Haladó/Szakértő)
   - Language selection (default: Hungarian)
   - Thumbnail upload component
   - Connect all inputs to the Zustand store
   - Real-time validation with error messages

2. Create `/src/components/course-creation/steps/CurriculumStep.tsx`:
   - Module management (add, edit, delete, reorder)
   - Lesson management within modules
   - Drag-and-drop reordering for modules and lessons
   - Lesson type selection (Video, PDF, Text, Quiz)
   - Integration with lesson content components
   - Preview functionality for each lesson type
   - Validation: at least 1 module with 1 lesson required

3. Create `/src/components/course-creation/steps/PublishingStep.tsx`:
   - Price setting in HUF currency
   - Visibility options (Public/Private)
   - Certificate settings (enabled/disabled)
   - Course preview section
   - Final validation summary
   - Terms acceptance checkbox
   - Integration with course creation Cloud Function

Each component should use Hungarian labels but English code, integrate with the store, and include proper form validation.
```

## 🎯 Phase 5: Mux Video Integration (Prompt 5)

### **Prompt for Claude Code:**
```
Migrate the Mux video upload system that handles video processing for lessons:

1. Create `/src/components/course-creation/MuxVideoUploader.tsx`:
   - File selection with drag-and-drop support
   - File validation (type: mp4, mov, avi, webm; size: max 500MB)
   - Upload progress tracking with visual progress bar
   - Mux asset creation and status polling
   - Error handling for upload failures
   - Retry functionality for failed uploads
   - Preview thumbnail generation
   - Duration detection and display

2. Implementation requirements:
   - Use HTML5 file input with proper validation
   - Show file details (name, size, duration) before upload
   - Upload to backend endpoint `/api/upload-video`
   - Poll Mux asset status every 5 seconds until ready
   - Display processing states: "Feltöltés", "Feldolgozás", "Kész"
   - Handle all error scenarios with user-friendly messages
   - Return assetId and playbackId on success

3. Create supporting API route `/src/app/api/upload-video/route.ts`:
   - Handle multipart form upload
   - Create Mux asset with video file
   - Return asset details for frontend polling
   - Proper error handling and logging

4. Environment variables needed:
   - MUX_TOKEN_ID
   - MUX_TOKEN_SECRET

The component should integrate seamlessly with the lesson creation flow and provide real-time feedback to users.
```

## 🎯 Phase 6: PDF Lesson Component (Prompt 6)

### **Prompt for Claude Code:**
```
Create an advanced PDF viewer component for PDF-based lessons:

1. Create `/src/components/lesson/PDFViewer.tsx`:
   - Multi-page PDF rendering using react-pdf
   - Page navigation (previous/next, jump to page)
   - Zoom controls (zoom in, zoom out, fit width, fit page)
   - Download functionality
   - Print support
   - Search within PDF content
   - Bookmark system for important pages
   - Reading progress tracking
   - Annotations support (if feasible)

2. Create `/src/components/course-creation/PDFUploader.tsx`:
   - File upload with validation (PDF files only, max 50MB)
   - Upload progress tracking
   - PDF preview after upload
   - Metadata extraction (page count, file size)
   - Integration with Firebase Storage
   - Error handling for corrupted PDFs

3. Implementation details:
   - Use pdfjs-dist for PDF processing
   - Implement lazy loading for large PDFs
   - Add loading skeletons for better UX
   - Handle PDF rendering errors gracefully
   - Support both local and remote PDF files
   - Mobile-responsive design

4. Integration requirements:
   - Store PDF metadata in lesson content
   - Track reading progress for analytics
   - Support offline viewing capabilities
   - Proper accessibility features

The PDF system should be production-ready with comprehensive error handling and performance optimization.
```

## 🎯 Phase 7: Rich Text Editor (Prompt 7)

### **Prompt for Claude Code:**
```
Implement a feature-rich text editor for text-based lessons:

1. Create `/src/components/lesson/RichTextEditor.tsx`:
   - Quill-based editor with custom toolbar
   - Support for: bold, italic, underline, headers, lists, links
   - Image upload and resize functionality
   - Video embedding support
   - Table insertion and editing
   - LaTeX formula support (if available in Quill)
   - Code syntax highlighting
   - Drag-and-drop for images and media

2. Custom features to implement:
   - Slash commands menu (/heading, /image, /video, etc.)
   - Auto-save functionality every 30 seconds
   - Word count display
   - Reading time estimation
   - Content sanitization for security
   - Export to different formats (HTML, Markdown)

3. Create supporting components:
   - ImageUploader for embedding images
   - VideoEmbedder for YouTube/Vimeo links
   - TableBuilder for creating tables
   - FormulaEditor for mathematical expressions

4. Integration requirements:
   - Store content as structured JSON
   - Support for collaborative editing (future)
   - Version history tracking
   - Content search and indexing
   - Mobile-friendly editing experience

5. Security considerations:
   - Sanitize all user input
   - Prevent XSS attacks
   - Validate embedded media URLs
   - Implement content moderation hooks

The editor should provide a professional writing experience while maintaining security and performance.
```

## 🎯 Phase 8: Firebase Storage Integration (Prompt 8)

### **Prompt for Claude Code:**
```
Implement Firebase Storage for all non-video file uploads since the analysis shows this is missing:

1. Create `/src/lib/storage.ts`:
   - Upload functions for images, PDFs, and documents
   - Progress tracking for all uploads
   - File validation (type, size, security)
   - Unique filename generation with timestamps
   - Metadata storage (original name, size, type)
   - Error handling and retry logic

2. Create storage security rules in `/storage.rules`:
   - Authenticated users can upload to their folders
   - File size limits per file type
   - Allowed file types validation
   - Read permissions based on course enrollment
   - Protection against malicious file uploads

3. Implement these upload functions:
   - uploadCourseImage() - for thumbnails and course images
   - uploadLessonPDF() - for PDF lesson content
   - uploadUserAvatar() - for instructor profile pictures
   - uploadLessonImage() - for rich text editor images

4. Create helper functions:
   - getFileURL() - generate signed URLs for private files
   - deleteFile() - clean up unused files
   - compressImage() - optimize images before upload
   - generateThumbnail() - create thumbnails for images

5. Integration points:
   - Connect to course creation wizard
   - Integrate with rich text editor
   - Support batch uploads for multiple files
   - Implement upload queuing system

Ensure all uploads are secure, efficient, and properly tracked for analytics and billing purposes.
```

## 🎯 Phase 9: Cloud Functions Migration (Prompt 9)

### **Prompt for Claude Code:**
```
Migrate and enhance the Cloud Functions for course management:

1. Update `/functions/src/courseActions.ts`:
   - createCourse() function with full validation
   - updateCourse() function for editing
   - publishCourse() function for going live
   - deleteCourse() function with cascade deletion
   - getCoursesByInstructor() for instructor dashboard
   - Integration with Stripe for pricing

2. Add new functions for file handling:
   - uploadVideoToMux() - handle Mux video processing
   - getMuxAssetStatus() - poll video processing status
   - processUploadedFile() - handle non-video files
   - generateCourseCertificate() - create completion certificates

3. Implement proper validation:
   - Use Zod schemas for all input validation
   - Check user permissions (instructor/admin roles)
   - Validate file types and sizes
   - Sanitize all text inputs
   - Check for duplicate course titles

4. Add database operations:
   - Batch writes for course creation with modules/lessons
   - Transaction support for data consistency
   - Proper error handling and rollback
   - Audit logging for all operations
   - Search indexing for course discovery

5. Configure environment variables:
   - MUX_TOKEN_ID and MUX_TOKEN_SECRET
   - Stripe API keys for payment processing
   - SendGrid for email notifications
   - Storage bucket configuration

6. Error handling and logging:
   - Structured error responses
   - Detailed logging for debugging
   - User-friendly error messages in Hungarian
   - Automatic retry logic for transient failures

All functions should be production-ready with proper security, validation, and error handling.
```

## 🎯 Phase 10: Integration & Testing (Prompt 10)

### **Prompt for Claude Code:**
```
Complete the integration and create comprehensive tests for the course creation system:

1. Create integration components:
   - Course preview component for final review
   - Progress tracking throughout the creation process
   - Auto-save functionality to prevent data loss
   - Draft management for incomplete courses
   - Instructor dashboard integration

2. Implement error boundaries:
   - Wrap the entire wizard in error boundary
   - Handle component-level errors gracefully
   - Provide recovery options for users
   - Log errors for monitoring and debugging

3. Add loading states and skeletons:
   - Loading indicators for all async operations
   - Skeleton screens for better perceived performance
   - Progressive enhancement for slow connections
   - Optimistic updates where appropriate

4. Create comprehensive tests:
   - Unit tests for store logic and validation
   - Component tests for UI interactions
   - Integration tests for the complete flow
   - E2E tests using Playwright for the full wizard

5. Performance optimization:
   - Implement code splitting for the wizard
   - Lazy load heavy components (PDF viewer, video player)
   - Optimize bundle size with proper imports
   - Add service worker for offline support

6. Accessibility improvements:
   - ARIA labels for all interactive elements
   - Keyboard navigation support
   - Screen reader compatibility
   - Focus management between steps

7. Mobile responsiveness:
   - Responsive design for all screen sizes
   - Touch-friendly interactions
   - Mobile-optimized file uploads
   - Progressive web app features

Test all lesson types (Video, PDF, Text) end-to-end to ensure everything works seamlessly from creation to student consumption.
```

## 🎯 Phase 11: Environment Configuration (Prompt 11)

### **Prompt for Claude Code:**
```
Configure all environment variables and deployment settings for the course creation system:

1. Update environment configuration:
   - Add Mux API credentials to .env.local
   - Configure Firebase Storage bucket settings
   - Set up Stripe product/price creation keys
   - Add any missing Firebase configuration

2. Update Firebase configuration:
   - Deploy new storage.rules for file uploads
   - Configure Firestore indexes for course queries
   - Set up Cloud Function environment variables
   - Update hosting configuration if needed

3. Create configuration validation:
   - Runtime checks for required environment variables
   - Fallback configurations for development
   - Clear error messages for missing configurations
   - Documentation for all required settings

4. Deployment preparation:
   - Build optimization for production
   - Bundle analysis to check for bloat
   - Performance testing with large files
   - Security audit of all file upload endpoints

5. Create documentation:
   - README for course creation setup
   - Environment variable documentation
   - API documentation for Cloud Functions
   - Troubleshooting guide for common issues

Ensure all configurations are secure, well-documented, and ready for production deployment.
```

## 🎯 Final Integration Prompt

### **Prompt for Claude Code:**
```
Perform final integration and validation of the complete course creation system:

1. Integration testing:
   - Test the complete flow: login → create course → add lessons → publish
   - Verify all lesson types work (Video upload to Mux, PDF upload to Storage, Rich text editing)
   - Test wizard state persistence across browser sessions
   - Validate all form inputs and error handling

2. Performance validation:
   - Test with large video files (up to 500MB)
   - Test with large PDF files (up to 50MB)
   - Verify upload progress tracking works correctly
   - Check memory usage during file processing

3. Security validation:
   - Verify file type validation prevents malicious uploads
   - Test authentication and authorization for all endpoints
   - Validate input sanitization in rich text editor
   - Check Firebase Storage security rules

4. User experience testing:
   - Test wizard navigation (previous/next buttons)
   - Verify Hungarian text throughout the interface
   - Test responsive design on mobile devices
   - Validate accessibility features

5. Error handling testing:
   - Test network failures during uploads
   - Verify graceful handling of Mux processing failures
   - Test storage quota exceeded scenarios
   - Validate user-friendly error messages in Hungarian

6. Create deployment checklist:
   - All environment variables configured
   - All dependencies installed
   - Database indexes created
   - Storage rules deployed
   - Cloud Functions deployed and tested

The system should be ready for Day 8-9 implementation with all components working together seamlessly.
```

---

## 📊 Expected Outcome

Following these prompts will give you:
- ✅ Complete course creation wizard (3 steps)
- ✅ Mux video integration with progress tracking
- ✅ Advanced PDF viewer with annotations
- ✅ Rich text editor with media embedding
- ✅ Firebase Storage for all file types
- ✅ Production-ready Cloud Functions
- ✅ Comprehensive error handling
- ✅ Mobile-responsive design
- ✅ Hungarian UI with English code

This migration approach will save 3-4 weeks of development time and provide a professional course creation experience that rivals major e-learning platforms.