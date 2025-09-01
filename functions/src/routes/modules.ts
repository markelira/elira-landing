/**
 * Module Management API Routes
 * Handles module CRUD operations within courses
 */

import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { CourseModule } from '../../../types/course';
import { CourseModuleSchema } from '../../../lib/validations/course';

const db = admin.firestore();

/**
 * Create a new module
 * POST /api/courses/:courseId/modules
 */
export const createModuleHandler = async (req: Request, res: Response): Promise<void> => {
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
    
    // Validate module data
    const validationResult = CourseModuleSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({ 
        success: false, 
        error: 'Validation failed',
        errors: validationResult.error.errors 
      });
      return;
    }
    
    const moduleData = validationResult.data;
    
    // Get current module count for ordering
    const modulesSnapshot = await db.collection('modules')
      .where('courseId', '==', courseId)
      .get();
    
    const order = moduleData.order ?? modulesSnapshot.size;
    
    // Create module
    const moduleRef = db.collection('modules').doc();
    const newModule: Omit<CourseModule, 'id'> = {
      courseId,
      title: moduleData.title,
      description: moduleData.description,
      order,
      totalLessons: 0,
      totalDuration: 0,
      isLocked: moduleData.isLocked,
      unlockDate: moduleData.unlockDate,
      prerequisites: moduleData.prerequisites,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    } as any;
    
    await moduleRef.set(newModule);
    
    // Update course module count
    await db.collection('courses').doc(courseId).update({
      totalModules: admin.firestore.FieldValue.increment(1),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    res.json({
      success: true,
      message: 'Module created successfully',
      moduleId: moduleRef.id,
      module: {
        id: moduleRef.id,
        ...newModule,
      },
    });
  } catch (error) {
    console.error('Create module error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create module' 
    });
  }
};

/**
 * Get all modules for a course
 * GET /api/courses/:courseId/modules
 */
export const getModulesHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId } = req.params;
    
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
    
    // Get modules
    const modulesSnapshot = await db.collection('modules')
      .where('courseId', '==', courseId)
      .orderBy('order', 'asc')
      .get();
    
    const modulesWithLessons: any[] = [];
    
    // Get modules and their lesson counts
    for (const moduleDoc of modulesSnapshot.docs) {
      const moduleData = moduleDoc.data();
      const module = {
        id: moduleDoc.id,
        ...moduleData,
        createdAt: moduleData.createdAt?.toDate() || new Date(),
        updatedAt: moduleData.updatedAt?.toDate() || new Date(),
        unlockDate: moduleData.unlockDate?.toDate(),
      } as CourseModule;
      
      // Get lesson count for this module
      const lessonsSnapshot = await db.collection('lessons')
        .where('moduleId', '==', moduleDoc.id)
        .get();
      
      modulesWithLessons.push({
        ...module,
        lessonCount: lessonsSnapshot.size,
      });
    }
    
    res.json({
      success: true,
      modules: modulesWithLessons,
      total: modulesWithLessons.length,
    });
  } catch (error) {
    console.error('Get modules error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get modules' 
    });
  }
};

/**
 * Get single module
 * GET /api/modules/:moduleId
 */
export const getModuleHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { moduleId } = req.params;
    
    if (!moduleId) {
      res.status(400).json({ success: false, error: 'Module ID is required' });
      return;
    }
    
    // Get module
    const moduleDoc = await db.collection('modules').doc(moduleId).get();
    
    if (!moduleDoc.exists) {
      res.status(404).json({ success: false, error: 'Module not found' });
      return;
    }
    
    const moduleData = moduleDoc.data();
    
    // Get lessons for this module
    const lessonsSnapshot = await db.collection('lessons')
      .where('moduleId', '==', moduleId)
      .orderBy('order', 'asc')
      .get();
    
    const lessons: any[] = [];
    lessonsSnapshot.forEach(lessonDoc => {
      lessons.push({
        id: lessonDoc.id,
        ...lessonDoc.data(),
        createdAt: lessonDoc.data().createdAt?.toDate() || new Date(),
        updatedAt: lessonDoc.data().updatedAt?.toDate() || new Date(),
      });
    });
    
    res.json({
      success: true,
      module: {
        id: moduleDoc.id,
        ...moduleData,
        createdAt: moduleData?.createdAt?.toDate() || new Date(),
        updatedAt: moduleData?.updatedAt?.toDate() || new Date(),
        unlockDate: moduleData?.unlockDate?.toDate(),
      },
      lessons,
    });
  } catch (error) {
    console.error('Get module error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get module' 
    });
  }
};

/**
 * Update module
 * PUT /api/modules/:moduleId
 */
export const updateModuleHandler = async (req: Request, res: Response): Promise<void> => {
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
    
    // Validate update data
    const validationResult = CourseModuleSchema.partial().safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({ 
        success: false, 
        error: 'Validation failed',
        errors: validationResult.error.errors 
      });
      return;
    }
    
    const updateData = {
      ...validationResult.data,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    
    // Update module
    await db.collection('modules').doc(moduleId).update(updateData);
    
    // Update course timestamp
    await db.collection('courses').doc(courseId).update({
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    res.json({
      success: true,
      message: 'Module updated successfully',
      moduleId,
    });
  } catch (error) {
    console.error('Update module error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to update module' 
    });
  }
};

/**
 * Delete module
 * DELETE /api/modules/:moduleId
 */
export const deleteModuleHandler = async (req: Request, res: Response): Promise<void> => {
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
    
    // Check if module has lessons
    const lessonsSnapshot = await db.collection('lessons')
      .where('moduleId', '==', moduleId)
      .limit(1)
      .get();
    
    if (!lessonsSnapshot.empty) {
      res.status(400).json({ 
        success: false, 
        error: 'Cannot delete module with lessons. Delete lessons first.' 
      });
      return;
    }
    
    // Delete module
    await db.collection('modules').doc(moduleId).delete();
    
    // Update course module count and reorder remaining modules
    const remainingModules = await db.collection('modules')
      .where('courseId', '==', courseId)
      .orderBy('order', 'asc')
      .get();
    
    // Reorder modules
    const batch = db.batch();
    let newOrder = 0;
    remainingModules.forEach(doc => {
      batch.update(doc.ref, { order: newOrder++ });
    });
    
    // Update course stats
    batch.update(db.collection('courses').doc(courseId), {
      totalModules: admin.firestore.FieldValue.increment(-1),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    await batch.commit();
    
    res.json({
      success: true,
      message: 'Module deleted successfully',
      moduleId,
    });
  } catch (error) {
    console.error('Delete module error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete module' 
    });
  }
};

/**
 * Reorder modules
 * PUT /api/courses/:courseId/modules/reorder
 */
export const reorderModulesHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId } = req.params;
    const { moduleIds } = req.body;
    const userId = (req as any).user?.uid;
    
    if (!userId) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }
    
    if (!courseId || !moduleIds || !Array.isArray(moduleIds)) {
      res.status(400).json({ 
        success: false, 
        error: 'Course ID and module IDs array are required' 
      });
      return;
    }
    
    // Check course permissions
    const courseDoc = await db.collection('courses').doc(courseId).get();
    if (!courseDoc.exists) {
      res.status(404).json({ success: false, error: 'Course not found' });
      return;
    }
    
    const courseData = courseDoc.data();
    
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (userData?.role !== 'ADMIN' && courseData?.instructorId !== userId) {
      res.status(403).json({ success: false, error: 'Insufficient permissions' });
      return;
    }
    
    // Verify all modules belong to this course
    const modulesSnapshot = await db.collection('modules')
      .where('courseId', '==', courseId)
      .get();
    
    const existingModuleIds = modulesSnapshot.docs.map(doc => doc.id);
    const allModulesValid = moduleIds.every(id => existingModuleIds.includes(id));
    
    if (!allModulesValid || moduleIds.length !== existingModuleIds.length) {
      res.status(400).json({ 
        success: false, 
        error: 'Invalid module IDs provided' 
      });
      return;
    }
    
    // Update module orders
    const batch = db.batch();
    
    for (let i = 0; i < moduleIds.length; i++) {
      const moduleRef = db.collection('modules').doc(moduleIds[i]);
      batch.update(moduleRef, { 
        order: i,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
    
    // Update course timestamp
    batch.update(db.collection('courses').doc(courseId), {
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    await batch.commit();
    
    res.json({
      success: true,
      message: 'Modules reordered successfully',
    });
  } catch (error) {
    console.error('Reorder modules error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to reorder modules' 
    });
  }
};

/**
 * Duplicate module with all its lessons
 * POST /api/modules/:moduleId/duplicate
 */
export const duplicateModuleHandler = async (req: Request, res: Response): Promise<void> => {
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
    
    // Get original module
    const moduleDoc = await db.collection('modules').doc(moduleId).get();
    if (!moduleDoc.exists) {
      res.status(404).json({ success: false, error: 'Module not found' });
      return;
    }
    
    const moduleData = moduleDoc.data();
    const courseId = moduleData?.courseId;
    
    // Check permissions
    const courseDoc = await db.collection('courses').doc(courseId).get();
    const courseData = courseDoc.data();
    
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (userData?.role !== 'ADMIN' && courseData?.instructorId !== userId) {
      res.status(403).json({ success: false, error: 'Insufficient permissions' });
      return;
    }
    
    // Get current module count
    const modulesSnapshot = await db.collection('modules')
      .where('courseId', '==', courseId)
      .get();
    
    // Create duplicated module
    const newModuleRef = db.collection('modules').doc();
    const newModuleData: any = {
      ...moduleData,
      title: `${moduleData?.title} (Copy)`,
      order: modulesSnapshot.size,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    
    delete newModuleData.id;
    
    // Get original lessons
    const lessonsSnapshot = await db.collection('lessons')
      .where('moduleId', '==', moduleId)
      .orderBy('order', 'asc')
      .get();
    
    // Use batch for atomic operation
    const batch = db.batch();
    
    // Create new module
    batch.set(newModuleRef, newModuleData);
    
    // Duplicate lessons
    let totalDuration = 0;
    lessonsSnapshot.forEach(lessonDoc => {
      const lessonData = lessonDoc.data();
      const newLessonRef = db.collection('lessons').doc();
      
      const newLessonData: any = {
        ...lessonData,
        moduleId: newModuleRef.id,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      
      delete newLessonData.id;
      totalDuration += lessonData.duration || 0;
      
      batch.set(newLessonRef, newLessonData);
    });
    
    // Update module with lesson stats
    batch.update(newModuleRef, {
      totalLessons: lessonsSnapshot.size,
      totalDuration,
    });
    
    // Update course stats
    batch.update(db.collection('courses').doc(courseId), {
      totalModules: admin.firestore.FieldValue.increment(1),
      totalLessons: admin.firestore.FieldValue.increment(lessonsSnapshot.size),
      totalDuration: admin.firestore.FieldValue.increment(totalDuration),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    
    await batch.commit();
    
    res.json({
      success: true,
      message: 'Module duplicated successfully',
      newModuleId: newModuleRef.id,
    });
  } catch (error) {
    console.error('Duplicate module error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to duplicate module' 
    });
  }
};