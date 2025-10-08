import { onRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';

// Initialize Firebase Admin
if (process.env.NODE_ENV !== 'production') {
  // Configure for local emulator development
  process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
  process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
  process.env.FIREBASE_STORAGE_EMULATOR_HOST = '127.0.0.1:9199';
}

// Initialize Firebase Admin with proper emulator configuration
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.GCLOUD_PROJECT || 'elira-landing-ce927',
    storageBucket: 'elira-landing-ce927.firebasestorage.app'
  });
}

// Create Express app
const app = express();

// Middleware
app.use(cors({ origin: true }));

// Use express.raw for webhook with detailed logging
app.use('/api/payment/webhook', (req, res, next) => {
  console.log('🔧 Webhook middleware: Starting raw body processing');
  express.raw({ type: 'application/json' })(req, res, (err) => {
    if (err) {
      console.error('🚨 Raw middleware error:', err);
      return next(err);
    }
    console.log('🔧 Raw middleware completed:', {
      bodyType: typeof req.body,
      isBuffer: req.body instanceof Buffer,
      bodyLength: req.body instanceof Buffer ? req.body.length : (req.body ? String(req.body).length : 0)
    });
    next();
  });
});

// Apply JSON middleware to everything EXCEPT webhook routes  
app.use((req, res, next) => {
  if (req.path === '/api/payment/webhook') {
    console.log('🔧 Skipping JSON middleware for webhook');
    return next();
  }
  return express.json()(req, res, next);
});

// Import middleware
import { authenticateUser } from './middleware/auth';
import { verifyCourseAccess, optionalCourseAccess } from './middleware/courseAccess';

// Import route handlers
import { subscribeHandler } from './routes/subscribe';
import { initStats } from './routes/init-stats';
import { registerHandler, googleCallbackHandler, updateLoginHandler } from './routes/auth';
import { 
  getProfileHandler, 
  linkDownloadsHandler, 
  updateProfileHandler,
  getUserCoursesHandler,
  checkCourseAccessHandler,
  enrollUserInCourseHandler,
  updateUserRoleHandler,
  getUsersHandler,
  getPlatformAnalyticsHandler,
  getUserPaymentsHandler,
  deleteUserHandler,
  toggleUserStatusHandler,
  getUserStatsHandler,
  getDashboardStatsHandler,
  getUserProgressHandler as getUserProgressFromUser
} from './routes/user';
import { 
  createSessionHandler, 
  stripeWebhookHandler, 
  getPaymentStatusHandler, 
  getSessionDetailsHandler,
  getAdminPaymentsHandler,
  getAdminPaymentStatsHandler
} from './routes/payment';
import { 
  createCourseHandler,
  getCoursesHandler,
  getCourseHandler, 
  updateCourseHandler,
  deleteCourseHandler,
  publishCourseHandler,
  archiveCourseHandler,
  getAdminCoursesHandler,
  getAdminCourseStatsHandler,
  deleteAdminCourseHandler,
  publishAdminCourseHandler,
  purchaseCourseHandler
} from './routes/courses';
import {
  createModuleHandler,
  getModulesHandler,
  getModuleHandler,
  updateModuleHandler,
  deleteModuleHandler,
  reorderModulesHandler,
  duplicateModuleHandler
} from './routes/modules';
import {
  createLessonHandler,
  getLessonsHandler,
  getLessonHandler,
  updateLessonHandler,
  deleteLessonHandler,
  reorderLessonsHandler,
  moveLessonHandler,
  duplicateLessonHandler,
  updateLessonContentHandler
} from './routes/lessons';
import {
  generateUploadUrlHandler,
  confirmUploadHandler,
  getSignedUrlHandler,
  deleteFileHandler,
  listFilesHandler
} from './routes/storage';
import {
  createMuxUploadHandler,
  getMuxUploadStatusHandler,
  muxWebhookHandler
} from './routes/mux';
import {
  getAdminCategoriesHandler,
  getAdminCategoryStatsHandler,
  createAdminCategoryHandler,
  updateAdminCategoryHandler,
  deleteAdminCategoryHandler
} from './routes/categories';
import { 
  markLessonCompleteHandler, 
  updateLessonProgressHandler, 
  getCourseProgressHandler,
  getLastWatchedHandler 
} from './routes/progress';
import {
  createEnrollmentHandler,
  getUserEnrollmentsHandler,
  checkEnrollmentHandler,
  migrateUserEnrollment,
  removeDuplicateEnrollments
} from './routes/enrollments';
import {
  getAdminSettingsHandler,
  updateAdminSettingsHandler,
  getSettingsHealthHandler,
  getSystemInfoHandler
} from './routes/settings';

// Mount routes
app.post('/api/subscribe', subscribeHandler);
app.post('/api/init-stats', initStats);

// Auth routes
app.post('/api/auth/register', registerHandler);
app.post('/api/auth/google-callback', googleCallbackHandler);
app.post('/api/user/update-login', updateLoginHandler);

// User routes
app.get('/api/user/profile', getProfileHandler);
app.post('/api/user/link-downloads', linkDownloadsHandler);
app.put('/api/user/profile', updateProfileHandler);
app.get('/api/users/:userId/courses', getUserCoursesHandler);
app.get('/api/users/:userId/payments', getUserPaymentsHandler);

// Admin routes
app.put('/api/admin/users/:userId/role', authenticateUser, updateUserRoleHandler);
app.delete('/api/admin/users/:userId', authenticateUser, deleteUserHandler);
app.put('/api/admin/users/:userId/status', authenticateUser, toggleUserStatusHandler);
app.get('/api/admin/users', authenticateUser, getUsersHandler);
app.get('/api/admin/user-stats', authenticateUser, getUserStatsHandler);
app.get('/api/admin/analytics', authenticateUser, getPlatformAnalyticsHandler);
app.get('/api/admin/dashboard-stats', authenticateUser, getDashboardStatsHandler);
app.get('/api/courses/:courseId/access-check', checkCourseAccessHandler);
app.post('/api/courses/:courseId/enroll', enrollUserInCourseHandler);

// Payment routes
app.post('/api/payment/create-session', createSessionHandler);
app.post('/api/payment/webhook', stripeWebhookHandler); // No auth for webhooks
app.get('/api/payment/status/:sessionId', getPaymentStatusHandler);
app.get('/api/payment/session/:sessionId', getSessionDetailsHandler);

// Admin payment routes
app.get('/api/admin/payments', getAdminPaymentsHandler);
app.get('/api/admin/payment-stats', getAdminPaymentStatsHandler);

// Course routes
app.post('/api/courses', authenticateUser, createCourseHandler);
app.get('/api/courses', getCoursesHandler);
app.get('/api/courses/:courseId', optionalCourseAccess, getCourseHandler);
app.put('/api/courses/:courseId', authenticateUser, updateCourseHandler);
app.delete('/api/courses/:courseId', authenticateUser, deleteCourseHandler);
app.post('/api/courses/:courseId/publish', authenticateUser, publishCourseHandler);
app.post('/api/courses/:courseId/archive', authenticateUser, archiveCourseHandler);
app.post('/api/courses/:courseId/purchase', authenticateUser, purchaseCourseHandler);

// Module routes
app.post('/api/courses/:courseId/modules', authenticateUser, createModuleHandler);
app.get('/api/courses/:courseId/modules', getModulesHandler);
app.put('/api/courses/:courseId/modules/reorder', authenticateUser, reorderModulesHandler);
app.get('/api/modules/:moduleId', getModuleHandler);
app.put('/api/modules/:moduleId', authenticateUser, updateModuleHandler);
app.delete('/api/modules/:moduleId', authenticateUser, deleteModuleHandler);
app.post('/api/modules/:moduleId/duplicate', authenticateUser, duplicateModuleHandler);

// Lesson routes (protected by course access)
app.post('/api/modules/:moduleId/lessons', authenticateUser, createLessonHandler);
app.get('/api/modules/:moduleId/lessons', authenticateUser, verifyCourseAccess, getLessonsHandler);
app.put('/api/modules/:moduleId/lessons/reorder', authenticateUser, reorderLessonsHandler);
app.get('/api/lessons/:lessonId', authenticateUser, verifyCourseAccess, getLessonHandler);
app.put('/api/lessons/:lessonId', authenticateUser, updateLessonHandler);
app.delete('/api/lessons/:lessonId', authenticateUser, deleteLessonHandler);
app.put('/api/lessons/:lessonId/move', authenticateUser, moveLessonHandler);
app.post('/api/lessons/:lessonId/duplicate', authenticateUser, duplicateLessonHandler);
app.put('/api/lessons/:lessonId/content', authenticateUser, updateLessonContentHandler);

// Admin course routes
app.get('/api/admin/courses', authenticateUser, getAdminCoursesHandler);
app.get('/api/admin/course-stats', authenticateUser, getAdminCourseStatsHandler);
app.delete('/api/admin/courses/:courseId', authenticateUser, deleteAdminCourseHandler);
app.put('/api/admin/courses/:courseId/publish', authenticateUser, publishAdminCourseHandler);

// Admin category routes
app.get('/api/admin/categories', authenticateUser, getAdminCategoriesHandler);
app.get('/api/admin/category-stats', authenticateUser, getAdminCategoryStatsHandler);
app.post('/api/admin/categories', authenticateUser, createAdminCategoryHandler);
app.put('/api/admin/categories/:categoryId', authenticateUser, updateAdminCategoryHandler);
app.delete('/api/admin/categories/:categoryId', authenticateUser, deleteAdminCategoryHandler);

// Progress routes (protected by course access)
app.post('/api/lessons/:lessonId/complete', authenticateUser, verifyCourseAccess, markLessonCompleteHandler);
app.post('/api/lessons/:lessonId/progress', authenticateUser, verifyCourseAccess, updateLessonProgressHandler);
app.get('/api/users/:userId/progress', authenticateUser, getUserProgressFromUser);
app.get('/api/courses/:courseId/user-progress', authenticateUser, verifyCourseAccess, getCourseProgressHandler);
app.get('/api/users/:userId/last-watched', authenticateUser, getLastWatchedHandler);

// Enrollment routes
app.post('/api/enrollments', authenticateUser, createEnrollmentHandler);
app.get('/api/enrollments', authenticateUser, getUserEnrollmentsHandler);
app.get('/api/enrollments/check/:courseId', authenticateUser, checkEnrollmentHandler);

// Admin migration routes
app.post('/api/admin/migrate-user-enrollment', migrateUserEnrollment);
app.post('/api/admin/remove-duplicate-enrollments', removeDuplicateEnrollments);

// Admin settings routes
app.get('/api/admin/settings', authenticateUser, getAdminSettingsHandler);
app.put('/api/admin/settings', authenticateUser, updateAdminSettingsHandler);
app.get('/api/admin/settings/health', authenticateUser, getSettingsHealthHandler);
app.get('/api/admin/system-info', authenticateUser, getSystemInfoHandler);

// Storage routes (with authentication)
app.post('/api/storage/upload-url', authenticateUser, generateUploadUrlHandler);
app.post('/api/storage/confirm-upload', authenticateUser, confirmUploadHandler);
app.get('/api/storage/signed-url', authenticateUser, getSignedUrlHandler);
app.delete('/api/storage/file', authenticateUser, deleteFileHandler);
app.get('/api/storage/list', authenticateUser, listFilesHandler);

// Mux video processing routes
app.post('/api/mux/upload', authenticateUser, createMuxUploadHandler);
app.get('/api/mux/upload/:uploadId/status', authenticateUser, getMuxUploadStatusHandler);
app.post('/api/mux/webhook', muxWebhookHandler); // No auth for webhooks

// Seed course data endpoint (for development)
app.post('/api/seed-course-data', async (req, res) => {
  try {
    const { createSimpleCourse } = await import('./scripts/create-simple-course');
    const result = await createSimpleCourse();
    res.json(result);
  } catch (error: any) {
    console.error('Seed error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to seed course data'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('✅ Health check endpoint hit');
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'elira-functions' 
  });
});

// Debug endpoint to list routes
app.get('/api/debug/routes', (req, res) => {
  const routes: any[] = [];
  app._router.stack.forEach((middleware: any) => {
    if (middleware.route) { // routes registered directly on the app
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods)
      });
    } else if (middleware.name === 'router') { // router middleware 
      middleware.handle.stack.forEach((handler: any) => {
        if (handler.route) {
          routes.push({
            path: handler.route.path,
            methods: Object.keys(handler.route.methods)
          });
        }
      });
    }
  });
  res.json({ routes });
});

// Import new course actions
import {
  createCourse,
  updateCourse,
  publishCourse,
  deleteCourse,
  getCoursesByInstructor,
  getMuxUploadUrl,
  getMuxAssetStatus,
  testVideoUpload,
  processUploadedFile,
  generateCourseCertificate
} from './courseActions';

// Export Cloud Functions with environment variables
export const api = onRequest(
  {
    region: 'europe-west1',
    cors: true,
    secrets: [
      'STRIPE_SECRET_KEY',
      'STRIPE_WEBHOOK_SECRET',
      'SENDGRID_API_KEY',
      'MUX_TOKEN_SECRET'
    ]
  },
  app
);

// Export dedicated webhook function
export { webhook } from './webhook';

// Export new callable functions
export {
  createCourse,
  updateCourse,
  publishCourse,
  deleteCourse,
  getCoursesByInstructor,
  getMuxUploadUrl,
  getMuxAssetStatus,
  testVideoUpload,
  processUploadedFile,
  generateCourseCertificate
};

// Export triggers
export { onUserCreate } from './triggers/onUserCreate';