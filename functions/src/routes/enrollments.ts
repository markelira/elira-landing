import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

const db = admin.firestore();

/**
 * Create enrollment for authenticated user
 * POST /api/enrollments
 */
export const createEnrollmentHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get authenticated user from middleware
    const userId = (req as any).user?.uid;
    
    if (!userId) {
      res.status(401).json({ 
        success: false, 
        error: 'Authentication required' 
      });
      return;
    }
    
    const { courseId } = req.body;
    
    if (!courseId) {
      res.status(400).json({ 
        success: false, 
        error: 'Course ID is required' 
      });
      return;
    }
    
    // Check if course exists
    const courseDoc = await db.collection('courses').doc(courseId).get();
    if (!courseDoc.exists) {
      res.status(404).json({ 
        success: false, 
        error: 'Course not found' 
      });
      return;
    }
    
    const courseData = courseDoc.data();
    
    // Check if already enrolled
    const enrollmentId = `${userId}_${courseId}`;
    const existingEnrollment = await db.collection('enrollments').doc(enrollmentId).get();
    
    if (existingEnrollment.exists) {
      res.json({ 
        success: true, 
        message: 'Already enrolled in this course',
        enrollmentId 
      });
      return;
    }
    
    // Check if course is free or paid
    if (!courseData?.isFree && courseData?.price > 0) {
      // For paid courses, check payment status
      const paymentQuery = await db.collection('payments')
        .where('userId', '==', userId)
        .where('courseId', '==', courseId)
        .where('status', '==', 'completed')
        .limit(1)
        .get();
      
      if (paymentQuery.empty) {
        res.status(402).json({ 
          success: false, 
          error: 'Payment required for this course' 
        });
        return;
      }
    }
    
    // Create enrollment
    const batch = db.batch();
    const timestamp = admin.firestore.FieldValue.serverTimestamp();
    
    // Create enrollment document
    const enrollmentRef = db.collection('enrollments').doc(enrollmentId);
    batch.set(enrollmentRef, {
      userId,
      courseId,
      courseTitle: courseData?.title,
      courseSlug: courseData?.slug,
      enrolledAt: timestamp,
      lastAccessedAt: timestamp,
      progress: 0,
      completedLessons: [],
      totalLessons: courseData?.totalLessons || 0,
      status: 'active',
      certificateEarned: false
    });
    
    // Update user document
    const userRef = db.collection('users').doc(userId);
    batch.update(userRef, {
      enrolledCourses: admin.firestore.FieldValue.arrayUnion(courseId),
      totalEnrollments: admin.firestore.FieldValue.increment(1),
      lastEnrollmentAt: timestamp
    });
    
    // Update course statistics
    const courseRef = db.collection('courses').doc(courseId);
    batch.update(courseRef, {
      enrollmentCount: admin.firestore.FieldValue.increment(1),
      lastEnrollmentAt: timestamp
    });
    
    // Create activity log
    const activityRef = db.collection('activities').doc();
    batch.set(activityRef, {
      userId,
      type: 'enrollment_created',
      courseId,
      courseTitle: courseData?.title,
      timestamp
    });
    
    // Commit all changes
    await batch.commit();
    
    res.json({
      success: true,
      message: 'Successfully enrolled in course',
      enrollmentId,
      courseId,
      redirectUrl: `/courses/${courseId}/learn`
    });
    
  } catch (error) {
    console.error('Create enrollment error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create enrollment' 
    });
  }
};

/**
 * Get user's enrollments
 * GET /api/enrollments
 */
export const getUserEnrollmentsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.uid;
    
    if (!userId) {
      res.status(401).json({ 
        success: false, 
        error: 'Authentication required' 
      });
      return;
    }
    
    const enrollmentsSnapshot = await db.collection('enrollments')
      .where('userId', '==', userId)
      .orderBy('enrolledAt', 'desc')
      .get();
    
    const enrollments = enrollmentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      enrolledAt: doc.data().enrolledAt?.toDate(),
      lastAccessedAt: doc.data().lastAccessedAt?.toDate()
    }));
    
    res.json({
      success: true,
      enrollments,
      total: enrollments.length
    });
    
  } catch (error) {
    console.error('Get enrollments error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get enrollments' 
    });
  }
};

/**
 * Check enrollment status for a course
 * GET /api/enrollments/check/:courseId
 */
export const checkEnrollmentHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.uid;
    const { courseId } = req.params;
    
    if (!userId) {
      res.json({ 
        success: true, 
        isEnrolled: false,
        requiresAuth: true 
      });
      return;
    }
    
    if (!courseId) {
      res.status(400).json({ 
        success: false, 
        error: 'Course ID is required' 
      });
      return;
    }
    
    const enrollmentId = `${userId}_${courseId}`;
    const enrollment = await db.collection('enrollments').doc(enrollmentId).get();
    
    res.json({
      success: true,
      isEnrolled: enrollment.exists,
      enrollmentData: enrollment.exists ? {
        progress: enrollment.data()?.progress,
        completedLessons: enrollment.data()?.completedLessons?.length || 0,
        totalLessons: enrollment.data()?.totalLessons || 0,
        certificateEarned: enrollment.data()?.certificateEarned || false
      } : null
    });
    
  } catch (error) {
    console.error('Check enrollment error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to check enrollment' 
    });
  }
};

/**
 * Migrate single user enrollment document
 * POST /api/admin/migrate-user-enrollment
 */
export const migrateUserEnrollment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      res.status(400).json({
        success: false,
        error: 'userId and courseId are required'
      });
      return;
    }

    console.log(`🔄 Migrating enrollment for user ${userId}, course ${courseId}`);

    // Find existing enrollment document
    const enrollmentsSnapshot = await db.collection('enrollments')
      .where('userId', '==', userId)
      .where('courseId', '==', courseId)
      .get();

    if (enrollmentsSnapshot.empty) {
      res.status(404).json({
        success: false,
        error: 'No enrollment found for this user and course'
      });
      return;
    }

    const expectedId = `${userId}_${courseId}`;
    const existingDoc = enrollmentsSnapshot.docs[0];

    if (existingDoc.id === expectedId) {
      res.json({
        success: true,
        message: 'Enrollment already has correct ID format',
        documentId: expectedId
      });
      return;
    }

    // Create new document with correct ID
    const data = existingDoc.data();
    await db.collection('enrollments').doc(expectedId).set({
      ...data,
      migratedAt: admin.firestore.FieldValue.serverTimestamp(),
      originalDocId: existingDoc.id
    });

    // Delete old document
    await existingDoc.ref.delete();

    console.log(`✅ Successfully migrated: ${existingDoc.id} → ${expectedId}`);

    res.json({
      success: true,
      message: 'Enrollment migrated successfully',
      oldId: existingDoc.id,
      newId: expectedId
    });

  } catch (error) {
    console.error('❌ Single user migration failed:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Migration failed'
    });
  }
};

/**
 * Remove duplicate enrollments for a user
 * POST /api/admin/remove-duplicate-enrollments
 */
export const removeDuplicateEnrollments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      res.status(400).json({
        success: false,
        error: 'userId and courseId are required'
      });
      return;
    }

    console.log(`🔄 Removing duplicate enrollments for user ${userId}, course ${courseId}`);

    // Find all enrollment documents for this user/course
    const enrollmentsSnapshot = await db.collection('enrollments')
      .where('userId', '==', userId)
      .where('courseId', '==', courseId)
      .get();

    if (enrollmentsSnapshot.empty) {
      res.json({
        success: true,
        message: 'No enrollments found',
        removed: 0
      });
      return;
    }

    const expectedId = `${userId}_${courseId}`;
    const docsToDelete = [];

    // Find the document with correct ID or keep the first one
    for (const doc of enrollmentsSnapshot.docs) {
      if (doc.id !== expectedId) {
        docsToDelete.push(doc);
      }
    }

    // Delete duplicate documents
    const batch = db.batch();
    for (const doc of docsToDelete) {
      batch.delete(doc.ref);
    }

    if (docsToDelete.length > 0) {
      await batch.commit();
    }

    console.log(`✅ Removed ${docsToDelete.length} duplicate enrollments, kept document: ${expectedId}`);

    res.json({
      success: true,
      message: `Removed ${docsToDelete.length} duplicate enrollments`,
      removed: docsToDelete.length,
      keptDocumentId: expectedId
    });

  } catch (error) {
    console.error('❌ Remove duplicates failed:', error);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to remove duplicates'
    });
  }
};