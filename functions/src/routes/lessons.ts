/**
 * Lesson Management API Routes
 * Handles lesson CRUD operations within modules
 */

import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { CourseLesson, LessonContent } from '../../../types/course';
import { CourseLessonSchema } from '../validations/course';

const db = admin.firestore();

/**
 * Create a new lesson
 * POST /api/modules/:moduleId/lessons
 */
export const createLessonHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { moduleId } = req.params;
    const userId = (req as any).user?.uid;
    
    if (!userId) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }
    
    if (!moduleId) {
      res.status(400).json({ success: false, error: 'Module ID is required' });
      return;
    }
    
    // Get module and course info
    const moduleDoc = await db.collection('modules').doc(moduleId).get();
    if (!moduleDoc.exists) {
      res.status(404).json({ success: false, error: 'Module not found' });
      return;
    }
    
    const moduleData = moduleDoc.data();
    const courseId = moduleData?.courseId;
    
    // Check course permissions
    const courseDoc = await db.collection('courses').doc(courseId).get();
    const courseData = courseDoc.data();
    
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (userData?.role !== 'ADMIN' && courseData?.instructorId !== userId) {
      res.status(403).json({ success: false, error: 'Insufficient permissions' });
      return;
    }
    
    // Validate lesson data
    const validationResult = CourseLessonSchema.safeParse({
      ...req.body,
      moduleId,
      courseId,
    });
    
    if (!validationResult.success) {
      res.status(400).json({ 
        success: false, 
        error: 'Validation failed',
        errors: validationResult.error.issues 
      });
      return;
    }
    
    const lessonData = validationResult.data;
    
    // Get current lesson count for ordering
    const lessonsSnapshot = await db.collection('lessons')
      .where('moduleId', '==', moduleId)
      .get();
    
    const order = lessonData.order ?? lessonsSnapshot.size;
    
    // Create lesson
    const lessonRef = db.collection('lessons').doc();
    const newLesson: Omit<CourseLesson, 'id'> = {
      moduleId,
      courseId,
      title: lessonData.title,
      description: lessonData.description,
      type: lessonData.type,
      order,
      content: lessonData.content || {},
      duration: lessonData.duration,
      estimatedTime: lessonData.estimatedTime,
      isFreePreview: lessonData.isFreePreview,
      isPublished: lessonData.isPublished,
      isLocked: lessonData.isLocked,
      unlockDate: lessonData.unlockDate,
      resources: [],
      requiresCompletion: lessonData.requiresCompletion,
      allowComments: lessonData.allowComments,
      allowDownload: lessonData.allowDownload,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    } as any;
    
    await lessonRef.set(newLesson);
    
    // Update module and course stats
    const batch = db.batch();
    
    // Update module
    batch.update(db.collection('modules').doc(moduleId), {
      totalLessons: admin.firestore.FieldValue.increment(1),
      totalDuration: admin.firestore.FieldValue.increment(lessonData.duration || 0),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    // Update course
    let updateData: any = {
      totalLessons: admin.firestore.FieldValue.increment(1),
      totalDuration: admin.firestore.FieldValue.increment(lessonData.duration || 0),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    
    if (lessonData.type === 'QUIZ') {
      updateData.totalQuizzes = admin.firestore.FieldValue.increment(1);
    }
    if (lessonData.type === 'ASSIGNMENT') {
      updateData.totalAssignments = admin.firestore.FieldValue.increment(1);
    }
    
    batch.update(db.collection('courses').doc(courseId), updateData);
    
    await batch.commit();
    
    res.json({
      success: true,
      message: 'Lesson created successfully',
      lessonId: lessonRef.id,
      lesson: {
        id: lessonRef.id,
        ...newLesson,
      },
    });
  } catch (error) {
    console.error('Create lesson error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create lesson' 
    });
  }
};

/**
 * Get all lessons for a module
 * GET /api/modules/:moduleId/lessons
 */
export const getLessonsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { moduleId } = req.params;
    
    if (!moduleId) {
      res.status(400).json({ success: false, error: 'Module ID is required' });
      return;
    }
    
    // Check if module exists
    const moduleDoc = await db.collection('modules').doc(moduleId).get();
    if (!moduleDoc.exists) {
      res.status(404).json({ success: false, error: 'Module not found' });
      return;
    }
    
    // Get lessons
    const lessonsSnapshot = await db.collection('lessons')
      .where('moduleId', '==', moduleId)
      .orderBy('order', 'asc')
      .get();
    
    const lessons: CourseLesson[] = [];
    lessonsSnapshot.forEach(doc => {
      const lessonData = doc.data();
      lessons.push({
        id: doc.id,
        ...lessonData,
        createdAt: lessonData.createdAt?.toDate() || new Date(),
        updatedAt: lessonData.updatedAt?.toDate() || new Date(),
        unlockDate: lessonData.unlockDate?.toDate(),
      } as CourseLesson);
    });
    
    res.json({
      success: true,
      lessons,
      total: lessons.length,
    });
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get lessons' 
    });
  }
};

/**
 * Get single lesson
 * GET /api/lessons/:lessonId
 */
export const getLessonHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lessonId } = req.params;
    
    if (!lessonId) {
      res.status(400).json({ success: false, error: 'Lesson ID is required' });
      return;
    }
    
    // Get lesson
    const lessonDoc = await db.collection('lessons').doc(lessonId).get();
    
    if (!lessonDoc.exists) {
      res.status(404).json({ success: false, error: 'Lesson not found' });
      return;
    }
    
    const lessonData = lessonDoc.data();
    
    // Get module info
    const moduleDoc = await db.collection('modules').doc(lessonData?.moduleId).get();
    const moduleData = moduleDoc.exists ? moduleDoc.data() : null;
    
    // Get course info
    const courseDoc = await db.collection('courses').doc(lessonData?.courseId).get();
    const courseData = courseDoc.exists ? courseDoc.data() : null;
    
    res.json({
      success: true,
      lesson: {
        id: lessonDoc.id,
        ...lessonData,
        createdAt: lessonData?.createdAt?.toDate() || new Date(),
        updatedAt: lessonData?.updatedAt?.toDate() || new Date(),
        unlockDate: lessonData?.unlockDate?.toDate(),
      },
      module: moduleData ? {
        id: moduleDoc.id,
        title: moduleData.title,
        order: moduleData.order,
      } : null,
      course: courseData ? {
        id: courseDoc.id,
        title: courseData.title,
        slug: courseData.slug,
      } : null,
    });
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get lesson' 
    });
  }
};

/**
 * Update lesson
 * PUT /api/lessons/:lessonId
 */
export const updateLessonHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lessonId } = req.params;
    const userId = (req as any).user?.uid;
    
    if (!userId) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }
    
    if (!lessonId) {
      res.status(400).json({ success: false, error: 'Lesson ID is required' });
      return;
    }
    
    // Get lesson
    const lessonDoc = await db.collection('lessons').doc(lessonId).get();
    if (!lessonDoc.exists) {
      res.status(404).json({ success: false, error: 'Lesson not found' });
      return;
    }
    
    const lessonData = lessonDoc.data();
    const courseId = lessonData?.courseId;
    const oldDuration = lessonData?.duration || 0;
    const oldType = lessonData?.type;
    
    // Check course permissions
    const courseDoc = await db.collection('courses').doc(courseId).get();
    const courseData = courseDoc.data();
    
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (userData?.role !== 'ADMIN' && courseData?.instructorId !== userId) {
      res.status(403).json({ success: false, error: 'Insufficient permissions' });
      return;
    }
    
    // Validate update data
    const validationResult = CourseLessonSchema.partial().safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({ 
        success: false, 
        error: 'Validation failed',
        errors: validationResult.error.issues 
      });
      return;
    }
    
    const updateData = {
      ...validationResult.data,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    
    // Update lesson
    await db.collection('lessons').doc(lessonId).update(updateData);
    
    // Update course and module stats if duration or type changed
    if (updateData.duration !== undefined || updateData.type !== undefined) {
      const batch = db.batch();
      
      const newDuration = updateData.duration ?? oldDuration;
      const durationDiff = newDuration - oldDuration;
      
      if (durationDiff !== 0) {
        // Update module duration
        batch.update(db.collection('modules').doc(lessonData?.moduleId), {
          totalDuration: admin.firestore.FieldValue.increment(durationDiff),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        
        // Update course duration
        batch.update(db.collection('courses').doc(courseId), {
          totalDuration: admin.firestore.FieldValue.increment(durationDiff),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      }
      
      // Update quiz/assignment counts if type changed
      if (updateData.type && updateData.type !== oldType) {
        const courseUpdate: any = {
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        };
        
        if (oldType === 'QUIZ') {
          courseUpdate.totalQuizzes = admin.firestore.FieldValue.increment(-1);
        }
        if (oldType === 'ASSIGNMENT') {
          courseUpdate.totalAssignments = admin.firestore.FieldValue.increment(-1);
        }
        if (updateData.type === 'QUIZ') {
          courseUpdate.totalQuizzes = admin.firestore.FieldValue.increment(1);
        }
        if (updateData.type === 'ASSIGNMENT') {
          courseUpdate.totalAssignments = admin.firestore.FieldValue.increment(1);
        }
        
        batch.update(db.collection('courses').doc(courseId), courseUpdate);
      }
      
      await batch.commit();
    }
    
    res.json({
      success: true,
      message: 'Lesson updated successfully',
      lessonId,
    });
  } catch (error) {
    console.error('Update lesson error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update lesson' 
    });
  }
};

/**
 * Delete lesson
 * DELETE /api/lessons/:lessonId
 */
export const deleteLessonHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lessonId } = req.params;
    const userId = (req as any).user?.uid;
    
    if (!userId) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }
    
    if (!lessonId) {
      res.status(400).json({ success: false, error: 'Lesson ID is required' });
      return;
    }
    
    // Get lesson
    const lessonDoc = await db.collection('lessons').doc(lessonId).get();
    if (!lessonDoc.exists) {
      res.status(404).json({ success: false, error: 'Lesson not found' });
      return;
    }
    
    const lessonData = lessonDoc.data();
    const courseId = lessonData?.courseId;
    const moduleId = lessonData?.moduleId;
    const duration = lessonData?.duration || 0;
    const type = lessonData?.type;
    
    // Check course permissions
    const courseDoc = await db.collection('courses').doc(courseId).get();
    const courseData = courseDoc.data();
    
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (userData?.role !== 'ADMIN' && courseData?.instructorId !== userId) {
      res.status(403).json({ success: false, error: 'Insufficient permissions' });
      return;
    }
    
    // Delete lesson and update stats
    const batch = db.batch();
    
    // Delete lesson
    batch.delete(lessonDoc.ref);
    
    // Update module stats
    batch.update(db.collection('modules').doc(moduleId), {
      totalLessons: admin.firestore.FieldValue.increment(-1),
      totalDuration: admin.firestore.FieldValue.increment(-duration),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    // Update course stats
    const courseUpdate: any = {
      totalLessons: admin.firestore.FieldValue.increment(-1),
      totalDuration: admin.firestore.FieldValue.increment(-duration),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    
    if (type === 'QUIZ') {
      courseUpdate.totalQuizzes = admin.firestore.FieldValue.increment(-1);
    }
    if (type === 'ASSIGNMENT') {
      courseUpdate.totalAssignments = admin.firestore.FieldValue.increment(-1);
    }
    
    batch.update(db.collection('courses').doc(courseId), courseUpdate);
    
    // Reorder remaining lessons
    const remainingLessons = await db.collection('lessons')
      .where('moduleId', '==', moduleId)
      .orderBy('order', 'asc')
      .get();
    
    let newOrder = 0;
    remainingLessons.forEach(doc => {
      if (doc.id !== lessonId) {
        batch.update(doc.ref, { order: newOrder++ });
      }
    });
    
    await batch.commit();
    
    res.json({
      success: true,
      message: 'Lesson deleted successfully',
      lessonId,
    });
  } catch (error) {
    console.error('Delete lesson error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete lesson' 
    });
  }
};

/**
 * Reorder lessons within a module
 * PUT /api/modules/:moduleId/lessons/reorder
 */
export const reorderLessonsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { moduleId } = req.params;
    const { lessonIds } = req.body;
    const userId = (req as any).user?.uid;
    
    if (!userId) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }
    
    if (!moduleId || !lessonIds || !Array.isArray(lessonIds)) {
      res.status(400).json({ 
        success: false, 
        error: 'Module ID and lesson IDs array are required' 
      });
      return;
    }
    
    // Get module
    const moduleDoc = await db.collection('modules').doc(moduleId).get();
    if (!moduleDoc.exists) {
      res.status(404).json({ success: false, error: 'Module not found' });
      return;
    }
    
    const moduleData = moduleDoc.data();
    const courseId = moduleData?.courseId;
    
    // Check course permissions
    const courseDoc = await db.collection('courses').doc(courseId).get();
    const courseData = courseDoc.data();
    
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (userData?.role !== 'ADMIN' && courseData?.instructorId !== userId) {
      res.status(403).json({ success: false, error: 'Insufficient permissions' });
      return;
    }
    
    // Verify all lessons belong to this module
    const lessonsSnapshot = await db.collection('lessons')
      .where('moduleId', '==', moduleId)
      .get();
    
    const existingLessonIds = lessonsSnapshot.docs.map(doc => doc.id);
    const allLessonsValid = lessonIds.every(id => existingLessonIds.includes(id));
    
    if (!allLessonsValid || lessonIds.length !== existingLessonIds.length) {
      res.status(400).json({ 
        success: false, 
        error: 'Invalid lesson IDs provided' 
      });
      return;
    }
    
    // Update lesson orders
    const batch = db.batch();
    
    for (let i = 0; i < lessonIds.length; i++) {
      const lessonRef = db.collection('lessons').doc(lessonIds[i]);
      batch.update(lessonRef, { 
        order: i,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
    
    // Update module and course timestamps
    batch.update(db.collection('modules').doc(moduleId), {
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    batch.update(db.collection('courses').doc(courseId), {
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    await batch.commit();
    
    res.json({
      success: true,
      message: 'Lessons reordered successfully',
    });
  } catch (error) {
    console.error('Reorder lessons error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to reorder lessons' 
    });
  }
};

/**
 * Move lesson to different module
 * PUT /api/lessons/:lessonId/move
 */
export const moveLessonHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lessonId } = req.params;
    const { targetModuleId } = req.body;
    const userId = (req as any).user?.uid;
    
    if (!userId) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }
    
    if (!lessonId || !targetModuleId) {
      res.status(400).json({ 
        success: false, 
        error: 'Lesson ID and target module ID are required' 
      });
      return;
    }
    
    // Get lesson
    const lessonDoc = await db.collection('lessons').doc(lessonId).get();
    if (!lessonDoc.exists) {
      res.status(404).json({ success: false, error: 'Lesson not found' });
      return;
    }
    
    const lessonData = lessonDoc.data();
    const sourceModuleId = lessonData?.moduleId;
    const courseId = lessonData?.courseId;
    const duration = lessonData?.duration || 0;
    
    if (sourceModuleId === targetModuleId) {
      res.status(400).json({ 
        success: false, 
        error: 'Source and target modules are the same' 
      });
      return;
    }
    
    // Get target module
    const targetModuleDoc = await db.collection('modules').doc(targetModuleId).get();
    if (!targetModuleDoc.exists) {
      res.status(404).json({ success: false, error: 'Target module not found' });
      return;
    }
    
    const targetModuleData = targetModuleDoc.data();
    
    // Verify modules are in the same course
    if (targetModuleData?.courseId !== courseId) {
      res.status(400).json({ 
        success: false, 
        error: 'Cannot move lesson to a module in a different course' 
      });
      return;
    }
    
    // Check course permissions
    const courseDoc = await db.collection('courses').doc(courseId).get();
    const courseData = courseDoc.data();
    
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (userData?.role !== 'ADMIN' && courseData?.instructorId !== userId) {
      res.status(403).json({ success: false, error: 'Insufficient permissions' });
      return;
    }
    
    // Get target module lesson count for new order
    const targetLessonsSnapshot = await db.collection('lessons')
      .where('moduleId', '==', targetModuleId)
      .get();
    
    const newOrder = targetLessonsSnapshot.size;
    
    // Update lesson and module stats
    const batch = db.batch();
    
    // Update lesson
    batch.update(lessonDoc.ref, {
      moduleId: targetModuleId,
      order: newOrder,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    // Update source module stats
    batch.update(db.collection('modules').doc(sourceModuleId), {
      totalLessons: admin.firestore.FieldValue.increment(-1),
      totalDuration: admin.firestore.FieldValue.increment(-duration),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    // Update target module stats
    batch.update(db.collection('modules').doc(targetModuleId), {
      totalLessons: admin.firestore.FieldValue.increment(1),
      totalDuration: admin.firestore.FieldValue.increment(duration),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    // Update course timestamp
    batch.update(db.collection('courses').doc(courseId), {
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    // Reorder lessons in source module
    const sourceLessons = await db.collection('lessons')
      .where('moduleId', '==', sourceModuleId)
      .orderBy('order', 'asc')
      .get();
    
    let sourceOrder = 0;
    sourceLessons.forEach(doc => {
      if (doc.id !== lessonId) {
        batch.update(doc.ref, { order: sourceOrder++ });
      }
    });
    
    await batch.commit();
    
    res.json({
      success: true,
      message: 'Lesson moved successfully',
      lessonId,
      newModuleId: targetModuleId,
    });
  } catch (error) {
    console.error('Move lesson error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to move lesson' 
    });
  }
};

/**
 * Duplicate lesson
 * POST /api/lessons/:lessonId/duplicate
 */
export const duplicateLessonHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lessonId } = req.params;
    const userId = (req as any).user?.uid;
    
    if (!userId) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }
    
    if (!lessonId) {
      res.status(400).json({ success: false, error: 'Lesson ID is required' });
      return;
    }
    
    // Get original lesson
    const lessonDoc = await db.collection('lessons').doc(lessonId).get();
    if (!lessonDoc.exists) {
      res.status(404).json({ success: false, error: 'Lesson not found' });
      return;
    }
    
    const lessonData = lessonDoc.data();
    const moduleId = lessonData?.moduleId;
    const courseId = lessonData?.courseId;
    const duration = lessonData?.duration || 0;
    const type = lessonData?.type;
    
    // Check course permissions
    const courseDoc = await db.collection('courses').doc(courseId).get();
    const courseData = courseDoc.data();
    
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (userData?.role !== 'ADMIN' && courseData?.instructorId !== userId) {
      res.status(403).json({ success: false, error: 'Insufficient permissions' });
      return;
    }
    
    // Get current lesson count for order
    const lessonsSnapshot = await db.collection('lessons')
      .where('moduleId', '==', moduleId)
      .get();
    
    // Create duplicated lesson
    const newLessonRef = db.collection('lessons').doc();
    const newLessonData: any = {
      ...lessonData,
      title: `${lessonData?.title} (Copy)`,
      order: lessonsSnapshot.size,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    
    delete newLessonData.id;
    
    // Use batch for atomic operation
    const batch = db.batch();
    
    // Create new lesson
    batch.set(newLessonRef, newLessonData);
    
    // Update module stats
    batch.update(db.collection('modules').doc(moduleId), {
      totalLessons: admin.firestore.FieldValue.increment(1),
      totalDuration: admin.firestore.FieldValue.increment(duration),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    // Update course stats
    const courseUpdate: any = {
      totalLessons: admin.firestore.FieldValue.increment(1),
      totalDuration: admin.firestore.FieldValue.increment(duration),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    
    if (type === 'QUIZ') {
      courseUpdate.totalQuizzes = admin.firestore.FieldValue.increment(1);
    }
    if (type === 'ASSIGNMENT') {
      courseUpdate.totalAssignments = admin.firestore.FieldValue.increment(1);
    }
    
    batch.update(db.collection('courses').doc(courseId), courseUpdate);
    
    await batch.commit();
    
    res.json({
      success: true,
      message: 'Lesson duplicated successfully',
      newLessonId: newLessonRef.id,
    });
  } catch (error) {
    console.error('Duplicate lesson error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to duplicate lesson' 
    });
  }
};

/**
 * Update lesson content
 * PUT /api/lessons/:lessonId/content
 */
export const updateLessonContentHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lessonId } = req.params;
    const { content }: { content: LessonContent } = req.body;
    const userId = (req as any).user?.uid;
    
    if (!userId) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }
    
    if (!lessonId) {
      res.status(400).json({ success: false, error: 'Lesson ID is required' });
      return;
    }
    
    if (!content) {
      res.status(400).json({ success: false, error: 'Content is required' });
      return;
    }
    
    // Get lesson
    const lessonDoc = await db.collection('lessons').doc(lessonId).get();
    if (!lessonDoc.exists) {
      res.status(404).json({ success: false, error: 'Lesson not found' });
      return;
    }
    
    const lessonData = lessonDoc.data();
    const courseId = lessonData?.courseId;
    
    // Check course permissions
    const courseDoc = await db.collection('courses').doc(courseId).get();
    const courseData = courseDoc.data();
    
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (userData?.role !== 'ADMIN' && courseData?.instructorId !== userId) {
      res.status(403).json({ success: false, error: 'Insufficient permissions' });
      return;
    }
    
    // Update lesson content
    await db.collection('lessons').doc(lessonId).update({
      content,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    // Update course timestamp
    await db.collection('courses').doc(courseId).update({
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    res.json({
      success: true,
      message: 'Lesson content updated successfully',
      lessonId,
    });
  } catch (error) {
    console.error('Update lesson content error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update lesson content' 
    });
  }
};