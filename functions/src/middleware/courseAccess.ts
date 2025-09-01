import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

const db = admin.firestore();

/**
 * Middleware to verify user has access to a specific course
 * Should be used after authenticateUser middleware
 */
export const verifyCourseAccess = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = (req as any).user;
    // Extract courseId from various possible locations
    const courseId = req.params.courseId || 
                    req.params.id || 
                    req.body.courseId || 
                    req.query.courseId || 
                    'ai-copywriting-course';

    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
      return;
    }

    console.log(`🔐 Checking course access for user ${user.uid} and course ${courseId}`);

    // Get user document
    const userDoc = await db.collection('users').doc(user.uid).get();
    if (!userDoc.exists) {
      res.status(404).json({
        success: false,
        error: 'User not found'
      });
      return;
    }

    const userData = userDoc.data();
    
    // Check if user has general course access
    if (!userData?.courseAccess) {
      console.log(`❌ User ${user.uid} does not have course access`);
      res.status(403).json({
        success: false,
        error: 'Course access required',
        hasAccess: false,
        reason: 'No course access'
      });
      return;
    }

    // Check if user has purchased this specific course
    const paymentQuery = await db
      .collection('payments')
      .where('userId', '==', user.uid)
      .where('status', '==', 'completed')
      .limit(1)
      .get();

    if (!paymentQuery.empty) {
      console.log(`✅ User ${user.uid} has paid access to course ${courseId}`);
      // Add course access info to request
      (req as any).courseAccess = {
        hasAccess: true,
        courseId,
        purchasedAt: paymentQuery.docs[0].data().completedAt?.toDate?.()?.toISOString(),
        paymentId: paymentQuery.docs[0].id
      };
      next();
      return;
    }

    // For MVP, if user has courseAccess flag, grant access to default course
    if (courseId === 'ai-copywriting-course' && userData.courseAccess) {
      console.log(`✅ User ${user.uid} has legacy access to default course ${courseId}`);
      (req as any).courseAccess = {
        hasAccess: true,
        courseId,
        grantedAt: userData.courseAccessGrantedAt?.toDate?.()?.toISOString()
      };
      next();
      return;
    }

    console.log(`❌ User ${user.uid} does not have access to course ${courseId}`);
    res.status(403).json({
      success: false,
      error: 'Course not purchased',
      hasAccess: false,
      reason: 'Course not purchased',
      courseId
    });
  } catch (error) {
    console.error('Course access verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to verify course access'
    });
  }
};

/**
 * Optional course access middleware - doesn't block request if no access
 * Adds course access info to request object for conditional logic
 */
export const optionalCourseAccess = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = (req as any).user;
    const courseId = req.params.courseId || req.body.courseId || 'ai-copywriting-course';

    if (!user) {
      (req as any).courseAccess = { hasAccess: false, reason: 'Not authenticated' };
      next();
      return;
    }

    // Get user document
    const userDoc = await db.collection('users').doc(user.uid).get();
    if (!userDoc.exists) {
      (req as any).courseAccess = { hasAccess: false, reason: 'User not found' };
      next();
      return;
    }

    const userData = userDoc.data();
    
    // Check course access
    if (!userData?.courseAccess) {
      (req as any).courseAccess = { hasAccess: false, reason: 'No course access' };
      next();
      return;
    }

    // Check payment
    const paymentQuery = await db
      .collection('payments')
      .where('userId', '==', user.uid)
      .where('status', '==', 'completed')
      .limit(1)
      .get();

    if (!paymentQuery.empty || (courseId === 'ai-copywriting-course' && userData.courseAccess)) {
      (req as any).courseAccess = {
        hasAccess: true,
        courseId,
        purchasedAt: paymentQuery.docs[0]?.data?.()?.completedAt?.toDate?.()?.toISOString(),
        grantedAt: userData.courseAccessGrantedAt?.toDate?.()?.toISOString()
      };
    } else {
      (req as any).courseAccess = { hasAccess: false, reason: 'Course not purchased' };
    }

    next();
  } catch (error) {
    console.error('Optional course access error:', error);
    (req as any).courseAccess = { hasAccess: false, reason: 'Access check failed' };
    next();
  }
};