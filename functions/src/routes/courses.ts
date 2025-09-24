/**
 * Course Management API Routes
 * Handles all course-related operations
 */

import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { 
  Course, 
  CourseModule, 
  CourseLesson,
  CourseStatus,
  CourseListResponse 
} from '../../../types/course';
import { 
  CourseCreationSchema, 
  CourseUpdateSchema,
  CourseFilterSchema
} from '../validations/course';

const db = admin.firestore();

/**
 * Helper function to remove undefined values from an object
 * Firestore doesn't accept undefined values
 */
function removeUndefinedFields(obj: any): any {
  const cleaned: any = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      cleaned[key] = obj[key];
    }
  }
  return cleaned;
}

/**
 * Create a new course
 * POST /api/courses
 */
export const createCourseHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get authenticated user from request (middleware should set this)
    const userId = (req as any).user?.uid;
    if (!userId) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }

    // Check user role (must be ADMIN or INSTRUCTOR)
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (!userData || (userData.role !== 'ADMIN' && userData.role !== 'INSTRUCTOR')) {
      res.status(403).json({ success: false, error: 'Insufficient permissions' });
      return;
    }

    // Validate request body
    const validationResult = CourseCreationSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({ 
        success: false, 
        error: 'Validation failed',
        errors: validationResult.error.issues 
      });
      return;
    }

    const { basicInfo, modules, lessons, settings } = validationResult.data;

    // Check if slug is unique
    const slugExists = await db.collection('courses')
      .where('slug', '==', basicInfo.slug)
      .limit(1)
      .get();

    if (!slugExists.empty) {
      res.status(400).json({ 
        success: false, 
        error: 'This URL slug is already taken' 
      });
      return;
    }

    // Begin transaction
    const batch = db.batch();
    
    // Create course document
    const courseRef = db.collection('courses').doc();
    const courseId = courseRef.id;
    
    // Calculate statistics
    let totalLessons = 0;
    let totalDuration = 0;
    let totalQuizzes = 0;
    let totalAssignments = 0;
    
    // Count lessons and calculate duration
    for (const moduleId in lessons) {
      const moduleLessons = lessons[moduleId];
      totalLessons += moduleLessons.length;
      
      moduleLessons.forEach((lesson: any) => {
        totalDuration += lesson.duration || 0;
        if (lesson.type === 'QUIZ') totalQuizzes++;
        if (lesson.type === 'ASSIGNMENT') totalAssignments++;
      });
    }

    const courseData: Omit<Course, 'id'> = removeUndefinedFields({
      // Basic Info
      title: basicInfo.title,
      slug: basicInfo.slug,
      description: basicInfo.description,
      shortDescription: basicInfo.shortDescription || '',
      status: settings.status,
      visibility: settings.visibility,
      
      // Instructor
      instructorId: settings.instructorId || userId,
      instructorName: userData.firstName && userData.lastName 
        ? `${userData.firstName} ${userData.lastName}`
        : userData.email,
      instructorEmail: userData.email,
      
      // Category
      categoryId: basicInfo.categoryId,
      subcategoryId: basicInfo.subcategoryId || null, // Use null instead of undefined
      tags: basicInfo.tags || [],
      language: basicInfo.language,
      difficulty: basicInfo.difficulty,
      
      // Media
      thumbnailUrl: basicInfo.thumbnailUrl || null,
      previewVideoUrl: basicInfo.previewVideoUrl || null,
      
      // Pricing
      price: settings.price,
      currency: settings.currency || 'HUF',
      isFree: settings.isFree,
      stripePriceId: settings.stripePriceId || null,
      
      // Statistics
      totalModules: modules.length,
      totalLessons,
      totalDuration,
      totalQuizzes,
      totalAssignments,
      totalResources: 0,
      
      // Learning
      objectives: settings.objectives,
      prerequisites: settings.prerequisites,
      
      // Certificate
      certificateEnabled: settings.certificateEnabled,
      
      // SEO
      metaTitle: settings.metaTitle || null,
      metaDescription: settings.metaDescription || null,
      keywords: settings.keywords || [],
      
      // Analytics
      enrollmentCount: 0,
      completionCount: 0,
      
      // Settings
      maxStudents: settings.maxStudents,
      
      // Timestamps
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      publishedAt: settings.status === 'PUBLISHED' 
        ? FieldValue.serverTimestamp() 
        : null, // Use null instead of undefined
    }) as any;

    batch.set(courseRef, courseData);

    // Create modules
    for (let moduleIndex = 0; moduleIndex < modules.length; moduleIndex++) {
      const module = modules[moduleIndex];
      const moduleRef = db.collection('modules').doc();
      const moduleId = moduleRef.id;
      
      const moduleData: Omit<CourseModule, 'id'> = {
        courseId,
        title: module.title,
        description: module.description,
        order: moduleIndex,
        totalLessons: (lessons[module.id || ''] as any[])?.length || 0,
        totalDuration: (lessons[module.id || ''] as any[])?.reduce((sum: number, l: any) => sum + (l.duration || 0), 0) || 0,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      } as any;
      
      batch.set(moduleRef, moduleData);
      
      // Create lessons for this module
      const moduleLessons = (lessons[module.id || ''] as any[]) || [];
      for (let lessonIndex = 0; lessonIndex < moduleLessons.length; lessonIndex++) {
        const lesson = moduleLessons[lessonIndex];
        const lessonRef = db.collection('lessons').doc();
        
        const lessonData: Omit<CourseLesson, 'id'> = {
          moduleId,
          courseId,
          title: lesson.title,
          description: lesson.description,
          type: lesson.type,
          order: lessonIndex,
          content: lesson.content,
          duration: lesson.duration,
          estimatedTime: lesson.estimatedTime,
          isFreePreview: lesson.isFreePreview,
          isPublished: lesson.isPublished !== false,
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        } as any;
        
        batch.set(lessonRef, lessonData);
      }
    }

    // Create course analytics document
    const analyticsRef = db.collection('course-analytics').doc(courseId);
    batch.set(analyticsRef, {
      courseId,
      totalEnrollments: 0,
      activeStudents: 0,
      completedStudents: 0,
      dropoutRate: 0,
      averageProgress: 0,
      averageTimeSpent: 0,
      totalRevenue: 0,
      createdAt: FieldValue.serverTimestamp(),
    });

    // Commit all changes
    await batch.commit();

    res.json({
      success: true,
      courseId,
      message: 'Course created successfully',
      course: {
        id: courseId,
        ...courseData,
      },
    });
  } catch (error) {
    console.error('Create course error:', error);
    console.error('Error details:', {
      message: (error as any).message,
      stack: (error as any).stack,
      code: (error as any).code
    });
    res.status(500).json({ 
      success: false, 
      error: (error as any).message || 'Failed to create course',
      details: process.env.NODE_ENV !== 'production' ? {
        message: (error as any).message,
        code: (error as any).code
      } : undefined
    });
  }
};

/**
 * Get all courses with filtering
 * GET /api/courses
 */
export const getCoursesHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate filters
    const filters = CourseFilterSchema.parse(req.query);
    
    // Build query
    let query = db.collection('courses') as any;
    
    // Apply filters
    if (filters.status && filters.status.length > 0) {
      query = query.where('status', 'in', filters.status);
    }
    
    if (filters.categoryId) {
      query = query.where('categoryId', '==', filters.categoryId);
    }
    
    if (filters.instructorId) {
      query = query.where('instructorId', '==', filters.instructorId);
    }
    
    if (filters.language && filters.language.length > 0) {
      query = query.where('language', 'in', filters.language);
    }
    
    if (filters.difficulty && filters.difficulty.length > 0) {
      query = query.where('difficulty', 'in', filters.difficulty);
    }
    
    // Apply price range filter
    if (filters.priceRange) {
      query = query
        .where('price', '>=', filters.priceRange.min)
        .where('price', '<=', filters.priceRange.max);
    }
    
    // Apply sorting
    const sortBy = filters.sortBy || 'createdAt';
    const sortOrder = filters.sortOrder || 'desc';
    query = query.orderBy(sortBy, sortOrder);
    
    // Get total count for pagination
    const countSnapshot = await query.get();
    const total = countSnapshot.size;
    
    // Apply pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const offset = (page - 1) * limit;
    
    query = query.limit(limit).offset(offset);
    
    // Execute query
    const snapshot = await query.get();
    
    const courses: Course[] = [];
    snapshot.forEach((doc: any) => {
      courses.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        publishedAt: doc.data().publishedAt?.toDate(),
      });
    });
    
    // Apply text search if provided (client-side filtering for now)
    let filteredCourses = courses;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredCourses = courses.filter(course => 
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.tags?.some((tag: string) => tag.toLowerCase().includes(searchLower))
      );
    }
    
    const response: CourseListResponse = {
      courses: filteredCourses,
      total,
      page,
      limit,
      hasMore: total > page * limit,
      filters,
    };
    
    res.json(response);
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get courses' 
    });
  }
};

/**
 * Get course by ID
 * GET /api/courses/:courseId
 */
export const getCourseHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId } = req.params;
    
    if (!courseId) {
      res.status(400).json({ 
        success: false, 
        error: 'Course ID is required' 
      });
      return;
    }
    
    // Get course document
    const courseDoc = await db.collection('courses').doc(courseId).get();
    
    if (!courseDoc.exists) {
      res.status(404).json({ 
        success: false, 
        error: 'Course not found' 
      });
      return;
    }
    
    const courseData = courseDoc.data();
    
    // Get modules
    const modulesSnapshot = await db.collection('modules')
      .where('courseId', '==', courseId)
      .orderBy('order', 'asc')
      .get();
    
    const modules: CourseModule[] = [];
    const lessonsMap: Record<string, CourseLesson[]> = {};
    
    // Get modules and their lessons
    for (const moduleDoc of modulesSnapshot.docs) {
      const moduleData = moduleDoc.data();
      modules.push({
        id: moduleDoc.id,
        ...moduleData,
        createdAt: moduleData.createdAt?.toDate() || new Date(),
        updatedAt: moduleData.updatedAt?.toDate() || new Date(),
      } as CourseModule);
      
      // Get lessons for this module
      const lessonsSnapshot = await db.collection('lessons')
        .where('moduleId', '==', moduleDoc.id)
        .orderBy('order', 'asc')
        .get();
      
      const lessons: CourseLesson[] = [];
      lessonsSnapshot.forEach(lessonDoc => {
        const lessonData = lessonDoc.data();
        lessons.push({
          id: lessonDoc.id,
          ...lessonData,
          createdAt: lessonData.createdAt?.toDate() || new Date(),
          updatedAt: lessonData.updatedAt?.toDate() || new Date(),
        } as CourseLesson);
      });
      
      lessonsMap[moduleDoc.id] = lessons;
    }
    
    res.json({
      success: true,
      course: {
        id: courseDoc.id,
        ...courseData,
        createdAt: courseData?.createdAt?.toDate() || new Date(),
        updatedAt: courseData?.updatedAt?.toDate() || new Date(),
        publishedAt: courseData?.publishedAt?.toDate(),
      },
      modules,
      lessons: lessonsMap,
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get course' 
    });
  }
};

/**
 * Update course
 * PUT /api/courses/:courseId
 */
export const updateCourseHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId } = req.params;
    const userId = (req as any).user?.uid;
    
    if (!userId) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }
    
    if (!courseId) {
      res.status(400).json({ success: false, error: 'Course ID is required' });
      return;
    }
    
    // Check if course exists
    const courseDoc = await db.collection('courses').doc(courseId).get();
    if (!courseDoc.exists) {
      res.status(404).json({ success: false, error: 'Course not found' });
      return;
    }
    
    const courseData = courseDoc.data();
    
    // Check permissions
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (userData?.role !== 'ADMIN' && courseData?.instructorId !== userId) {
      res.status(403).json({ success: false, error: 'Insufficient permissions' });
      return;
    }
    
    // Log the incoming request body for debugging
    console.log('📥 Course update request body:', JSON.stringify(req.body, null, 2));
    
    // Validate update data
    const validationResult = CourseUpdateSchema.safeParse(req.body);
    if (!validationResult.success) {
      console.error('❌ Validation failed:', validationResult.error.issues);
      res.status(400).json({ 
        success: false, 
        error: 'Validation failed',
        errors: validationResult.error.issues 
      });
      return;
    }
    
    console.log('✅ Validation passed, validated data:', JSON.stringify(validationResult.data, null, 2));
    
    const updateData: any = {
      ...validationResult.data,
      updatedAt: FieldValue.serverTimestamp(),
      lastModifiedBy: userId,
    };
    
    console.log('📤 Final update data being sent to Firestore:', JSON.stringify(updateData, null, 2));
    
    // If publishing, add publishedAt timestamp
    if (updateData.status === 'PUBLISHED' && courseData?.status !== 'PUBLISHED') {
      updateData.publishedAt = FieldValue.serverTimestamp();
    }
    
    // Update course
    await db.collection('courses').doc(courseId).update(updateData);
    
    res.json({
      success: true,
      message: 'Course updated successfully',
      courseId,
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update course' 
    });
  }
};

/**
 * Delete course
 * DELETE /api/courses/:courseId
 */
export const deleteCourseHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId } = req.params;
    const userId = (req as any).user?.uid;
    
    if (!userId) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }
    
    if (!courseId) {
      res.status(400).json({ success: false, error: 'Course ID is required' });
      return;
    }
    
    // Check if course exists
    const courseDoc = await db.collection('courses').doc(courseId).get();
    if (!courseDoc.exists) {
      res.status(404).json({ success: false, error: 'Course not found' });
      return;
    }
    
    // Check permissions (only ADMIN can delete)
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (userData?.role !== 'ADMIN') {
      res.status(403).json({ success: false, error: 'Only administrators can delete courses' });
      return;
    }
    
    // Check if course has enrollments
    const enrollmentsSnapshot = await db.collection('enrollments')
      .where('courseId', '==', courseId)
      .limit(1)
      .get();
    
    if (!enrollmentsSnapshot.empty) {
      res.status(400).json({ 
        success: false, 
        error: 'Cannot delete course with active enrollments. Archive it instead.' 
      });
      return;
    }
    
    // Begin batch delete
    const batch = db.batch();
    
    // Delete course
    batch.delete(courseDoc.ref);
    
    // Delete modules
    const modulesSnapshot = await db.collection('modules')
      .where('courseId', '==', courseId)
      .get();
    
    for (const moduleDoc of modulesSnapshot.docs) {
      batch.delete(moduleDoc.ref);
      
      // Delete lessons for this module
      const lessonsSnapshot = await db.collection('lessons')
        .where('moduleId', '==', moduleDoc.id)
        .get();
      
      lessonsSnapshot.forEach(lessonDoc => {
        batch.delete(lessonDoc.ref);
      });
    }
    
    // Delete course analytics
    const analyticsRef = db.collection('course-analytics').doc(courseId);
    batch.delete(analyticsRef);
    
    // Commit batch
    await batch.commit();
    
    res.json({
      success: true,
      message: 'Course deleted successfully',
      courseId,
    });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete course' 
    });
  }
};

/**
 * Publish course
 * POST /api/courses/:courseId/publish
 */
export const publishCourseHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId } = req.params;
    const userId = (req as any).user?.uid;
    
    if (!userId) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }
    
    if (!courseId) {
      res.status(400).json({ success: false, error: 'Course ID is required' });
      return;
    }
    
    // Get course
    const courseDoc = await db.collection('courses').doc(courseId).get();
    if (!courseDoc.exists) {
      res.status(404).json({ success: false, error: 'Course not found' });
      return;
    }
    
    const courseData = courseDoc.data();
    
    // Check permissions
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (userData?.role !== 'ADMIN' && courseData?.instructorId !== userId) {
      res.status(403).json({ success: false, error: 'Insufficient permissions' });
      return;
    }
    
    // Validate course is ready for publishing
    const validationErrors: string[] = [];
    
    if (!courseData?.title || courseData.title.length < 5) {
      validationErrors.push('Course title is too short');
    }
    
    if (!courseData?.description || courseData.description.length < 50) {
      validationErrors.push('Course description is too short');
    }
    
    if (!courseData?.categoryId) {
      validationErrors.push('Course category is required');
    }
    
    if (!courseData?.thumbnailUrl) {
      validationErrors.push('Course thumbnail is required');
    }
    
    if ((courseData?.totalModules || 0) < 1) {
      validationErrors.push('Course must have at least one module');
    }
    
    if ((courseData?.totalLessons || 0) < 1) {
      validationErrors.push('Course must have at least one lesson');
    }
    
    if (!courseData?.slug) {
      validationErrors.push('Course URL slug is required');
    }
    
    if (!courseData?.objectives || courseData.objectives.length === 0) {
      validationErrors.push('Course must have learning objectives');
    }
    
    
    if (validationErrors.length > 0) {
      res.status(400).json({ 
        success: false, 
        error: 'Course is not ready for publishing',
        validationErrors 
      });
      return;
    }
    
    // Update course status to published
    await db.collection('courses').doc(courseId).update({
      status: 'PUBLISHED' as CourseStatus,
      publishedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      lastModifiedBy: userId,
    });
    
    res.json({
      success: true,
      message: 'Course published successfully',
      courseId,
    });
  } catch (error) {
    console.error('Publish course error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to publish course' 
    });
  }
};

/**
 * Archive course
 * POST /api/courses/:courseId/archive
 */
export const archiveCourseHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId } = req.params;
    const userId = (req as any).user?.uid;
    
    if (!userId) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }
    
    if (!courseId) {
      res.status(400).json({ success: false, error: 'Course ID is required' });
      return;
    }
    
    // Get course
    const courseDoc = await db.collection('courses').doc(courseId).get();
    if (!courseDoc.exists) {
      res.status(404).json({ success: false, error: 'Course not found' });
      return;
    }
    
    const courseData = courseDoc.data();
    
    // Check permissions
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (userData?.role !== 'ADMIN' && courseData?.instructorId !== userId) {
      res.status(403).json({ success: false, error: 'Insufficient permissions' });
      return;
    }
    
    // Update course status to archived
    await db.collection('courses').doc(courseId).update({
      status: 'ARCHIVED' as CourseStatus,
      archivedAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      lastModifiedBy: userId,
    });
    
    res.json({
      success: true,
      message: 'Course archived successfully',
      courseId,
    });
  } catch (error) {
    console.error('Archive course error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to archive course' 
    });
  }
};

/**
 * Purchase course - creates Stripe payment session
 * POST /api/courses/:courseId/purchase
 */
export const purchaseCourseHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId } = req.params;
    const { successUrl, cancelUrl } = req.body;
    const user = (req as any).user;
    
    console.log('[Purchase] Starting purchase for course:', courseId, 'user:', user?.uid);
    
    if (!user) {
      console.error('[Purchase] No user in request');
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }
    
    // Get user data from Firestore - create if doesn't exist
    console.log('[Purchase] Getting user data for:', user.uid);
    const userDoc = await db.collection('users').doc(user.uid).get();
    
    let userData;
    if (!userDoc.exists) {
      console.log('[Purchase] User document not found, creating one for:', user.email);
      // Create user document if it doesn't exist
      const newUserData = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.name || user.email?.split('@')[0] || '',
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ').slice(1).join(' ') || '',
        photoURL: user.picture || '',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        lastLogin: admin.firestore.FieldValue.serverTimestamp(),
        courseAccess: false,
        enrolledCourses: []
      };
      
      await db.collection('users').doc(user.uid).set(newUserData);
      userData = newUserData;
    } else {
      userData = userDoc.data()!;
    }
    
    console.log('[Purchase] User data obtained:', { uid: userData.uid, email: userData.email });
    
    // Check if user already has course access
    if (userData.courseAccess) {
      res.status(400).json({
        success: false,
        error: 'User already has course access'
      });
      return;
    }
    
    // Get course data
    const courseDoc = await db.collection('courses').doc(courseId).get();
    if (!courseDoc.exists) {
      console.error('[Purchase] Course not found:', courseId);
      res.status(404).json({ success: false, error: 'Course not found' });
      return;
    }
    
    const courseData = courseDoc.data()!;
    const stripePriceId = courseData.stripePriceId || process.env.NEXT_PUBLIC_STRIPE_DEFAULT_PRICE_ID || 'price_1SAbPbHhqyKpFIBMcfdPF1Lh';
    
    console.log('[Purchase] Course found:', { courseId, stripePriceId, price: courseData.price });
    
    // Create payment session request
    const sessionRequest = {
      uid: user.uid,
      email: userData.email,
      courseId,
      stripePriceId,
      successUrl: successUrl || `${req.get('origin') || 'https://elira-landing.vercel.app'}/payment/success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}`,
      cancelUrl: cancelUrl || `${req.get('origin') || 'https://elira-landing.vercel.app'}/payment/cancel?courseId=${courseId}`
    };
    
    console.log('[Purchase] Creating payment session with:', sessionRequest);
    
    // Use existing payment handler
    const { createSessionHandler } = await import('./payment');
    
    // Modify request body and call payment handler
    req.body = sessionRequest;
    await createSessionHandler(req, res);
    
  } catch (error: any) {
    console.error('Course purchase error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process course purchase',
      details: error.message
    });
  }
};

/**
 * Get admin course statistics
 * GET /api/admin/course-stats
 */
export const getAdminCourseStatsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.uid;
    
    // Check admin permissions
    if (userId) {
      const userDoc = await db.collection('users').doc(userId).get();
      const userData = userDoc.data();
      
      if (userData?.role !== 'ADMIN') {
        res.status(403).json({ success: false, error: 'Admin access required' });
        return;
      }
    }
    
    // Get course statistics
    const coursesSnapshot = await db.collection('courses').get();
    
    let totalCourses = 0;
    let publishedCourses = 0;
    let draftCourses = 0;
    let archivedCourses = 0;
    let totalEnrollments = 0;
    let totalRevenue = 0;
    
    coursesSnapshot.forEach(doc => {
      const course = doc.data();
      totalCourses++;
      
      if (course.status === 'PUBLISHED') publishedCourses++;
      if (course.status === 'DRAFT') draftCourses++;
      if (course.status === 'ARCHIVED') archivedCourses++;
      
      totalEnrollments += course.enrollmentCount || 0;
      totalRevenue += (course.price || 0) * (course.enrollmentCount || 0);
    });
    
    res.json({
      success: true,
      stats: {
        totalCourses,
        publishedCourses,
        draftCourses,
        archivedCourses,
        totalEnrollments,
        totalRevenue,
        averageEnrollmentsPerCourse: totalCourses > 0 ? Math.round(totalEnrollments / totalCourses) : 0,
        averageRevenuePerCourse: totalCourses > 0 ? Math.round(totalRevenue / totalCourses) : 0,
      },
    });
  } catch (error) {
    console.error('Get course stats error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get course statistics' 
    });
  }
};

/**
 * Get admin courses (with full details)
 * GET /api/admin/courses
 */
export const getAdminCoursesHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.uid;
    
    // Check permissions
    if (userId) {
      const userDoc = await db.collection('users').doc(userId).get();
      const userData = userDoc.data();
      
      if (!userData || (userData.role !== 'ADMIN' && userData.role !== 'INSTRUCTOR')) {
        res.status(403).json({ success: false, error: 'Insufficient permissions' });
        return;
      }
      
      // If instructor, only show their courses
      if (userData.role === 'INSTRUCTOR') {
        req.query.instructorId = userId;
      }
    }
    
    // Use the general courses handler with admin context
    await getCoursesHandler(req, res);
  } catch (error) {
    console.error('Get admin courses error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get admin courses' 
    });
  }
};

/**
 * Delete admin course (force delete)
 * DELETE /api/admin/courses/:courseId
 */
export const deleteAdminCourseHandler = async (req: Request, res: Response): Promise<void> => {
  // Alias to deleteCourseHandler with admin validation
  await deleteCourseHandler(req, res);
};

/**
 * Publish admin course
 * PUT /api/admin/courses/:courseId/publish
 */
export const publishAdminCourseHandler = async (req: Request, res: Response): Promise<void> => {
  // Alias to publishCourseHandler with admin context
  await publishCourseHandler(req, res);
};