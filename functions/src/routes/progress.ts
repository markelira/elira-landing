import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

const db = admin.firestore();

// Types for progress tracking (used for documentation and type safety)

// Mark lesson as complete
export const markLessonCompleteHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lessonId } = req.params;
    const { userId, courseId } = req.body;

    if (!lessonId || !userId || !courseId) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: lessonId, userId, courseId'
      });
      return;
    }

    // Verify user exists and has course access
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      res.status(404).json({
        success: false,
        error: 'User not found'
      });
      return;
    }

    const userData = userDoc.data();
    if (!userData?.courseAccess) {
      res.status(403).json({
        success: false,
        error: 'User does not have course access'
      });
      return;
    }

    const batch = db.batch();
    const timestamp = admin.firestore.FieldValue.serverTimestamp();

    // Update lesson progress
    const lessonProgressRef = db
      .collection('user-progress')
      .doc(userId)
      .collection('lessons')
      .doc(lessonId);

    batch.set(lessonProgressRef, {
      lessonId,
      courseId,
      userId,
      progress: 100,
      completed: true,
      completedAt: timestamp,
      lastWatchedAt: timestamp
    }, { merge: true });

    // Update course progress
    const courseProgressRef = db
      .collection('user-progress')
      .doc(userId)
      .collection('courses')
      .doc(courseId);

    // Get current course progress to update
    const courseProgressDoc = await courseProgressRef.get();
    const currentProgress = courseProgressDoc.data() || {};
    
    const completedLessons = currentProgress.completedLessons || [];
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
    }

    // Get total lessons count (you'll need to fetch from course-content)
    const courseDoc = await db.collection('course-content').doc(courseId).get();
    const courseData = courseDoc.data();
    let totalLessons = 0;
    
    if (courseData?.modules) {
      courseData.modules.forEach((module: any) => {
        totalLessons += module.lessons ? module.lessons.length : 0;
      });
    }

    const overallProgress = totalLessons > 0 
      ? Math.round((completedLessons.length / totalLessons) * 100)
      : 0;

    batch.set(courseProgressRef, {
      courseId,
      userId,
      overallProgress,
      completedLessons,
      totalLessons,
      lastAccessedAt: timestamp,
      currentLesson: lessonId,
      ...(overallProgress === 100 ? { completedAt: timestamp } : {})
    }, { merge: true });

    // Update user's overall progress
    const userProgressRef = db.collection('user-progress').doc(userId);
    batch.set(userProgressRef, {
      userId,
      totalLessonsCompleted: admin.firestore.FieldValue.increment(1),
      lastActivityAt: timestamp,
      ...(overallProgress === 100 ? {
        coursesCompleted: admin.firestore.FieldValue.increment(1),
        coursesInProgress: admin.firestore.FieldValue.increment(-1)
      } : {})
    }, { merge: true });

    // Add activity record
    const activityRef = db.collection('activities').doc();
    batch.set(activityRef, {
      userId,
      type: 'lesson_completed',
      lessonId,
      courseId,
      title: `Completed lesson ${lessonId}`,
      createdAt: timestamp
    });

    await batch.commit();

    res.json({
      success: true,
      data: {
        lessonId,
        courseId,
        completed: true,
        overallProgress
      }
    });
  } catch (error) {
    console.error('Mark lesson complete error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to mark lesson as complete'
    });
  }
};

// Update lesson progress (for video watch tracking)
export const updateLessonProgressHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { lessonId } = req.params;
    const { userId, courseId, progress, watchTime } = req.body;

    if (!lessonId || !userId || !courseId || progress === undefined) {
      res.status(400).json({
        success: false,
        error: 'Missing required fields: lessonId, userId, courseId, progress'
      });
      return;
    }

    // Validate progress value
    if (progress < 0 || progress > 100) {
      res.status(400).json({
        success: false,
        error: 'Progress must be between 0 and 100'
      });
      return;
    }

    // Verify user exists and has course access
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      res.status(404).json({
        success: false,
        error: 'User not found'
      });
      return;
    }

    const userData = userDoc.data();
    if (!userData?.courseAccess) {
      res.status(403).json({
        success: false,
        error: 'User does not have course access'
      });
      return;
    }

    const timestamp = admin.firestore.FieldValue.serverTimestamp();
    const batch = db.batch();

    // Update lesson progress
    const lessonProgressRef = db
      .collection('user-progress')
      .doc(userId)
      .collection('lessons')
      .doc(lessonId);

    const lessonProgressData: any = {
      lessonId,
      courseId,
      userId,
      progress,
      lastWatchedAt: timestamp
    };

    if (watchTime !== undefined) {
      lessonProgressData.watchTime = watchTime;
    }

    // Mark as completed if progress is 100
    if (progress === 100) {
      lessonProgressData.completed = true;
      lessonProgressData.completedAt = timestamp;
    }

    batch.set(lessonProgressRef, lessonProgressData, { merge: true });

    // Update course's last accessed time and current lesson
    const courseProgressRef = db
      .collection('user-progress')
      .doc(userId)
      .collection('courses')
      .doc(courseId);

    batch.set(courseProgressRef, {
      lastAccessedAt: timestamp,
      currentLesson: lessonId
    }, { merge: true });

    // Update user's overall last activity
    const userProgressRef = db.collection('user-progress').doc(userId);
    batch.set(userProgressRef, {
      lastActivityAt: timestamp,
      ...(watchTime ? { totalWatchTime: admin.firestore.FieldValue.increment(watchTime) } : {})
    }, { merge: true });

    await batch.commit();

    res.json({
      success: true,
      data: {
        lessonId,
        courseId,
        progress,
        watchTime
      }
    });
  } catch (error) {
    console.error('Update lesson progress error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update lesson progress'
    });
  }
};

// Get all user progress
export const getUserProgressHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
      return;
    }

    // Get user's overall progress
    const userProgressDoc = await db.collection('user-progress').doc(userId).get();
    const userProgress = userProgressDoc.data() || {
      userId,
      totalCoursesEnrolled: 0,
      totalLessonsCompleted: 0,
      totalWatchTime: 0,
      coursesInProgress: 0,
      coursesCompleted: 0
    };

    // Get user's course progress
    const coursesSnapshot = await db
      .collection('user-progress')
      .doc(userId)
      .collection('courses')
      .get();

    const enrolledCourses: any[] = [];
    
    for (const doc of coursesSnapshot.docs) {
      const courseProgress = doc.data();
      
      // Get course details
      const courseDoc = await db.collection('course-content').doc(doc.id).get();
      const courseData = courseDoc.data();
      
      if (courseData) {
        enrolledCourses.push({
          courseId: doc.id,
          courseTitle: courseData.title || 'Unknown Course',
          courseDescription: courseData.description,
          courseThumbnailUrl: courseData.thumbnailUrl,
          instructorName: courseData.instructorName || 'Elira Team',
          categoryName: courseData.category || 'General',
          difficulty: courseData.difficulty || 'BEGINNER',
          totalLessons: courseProgress.totalLessons || 0,
          completedLessons: courseProgress.completedLessons?.length || 0,
          completionPercentage: courseProgress.overallProgress || 0,
          courseState: courseProgress.overallProgress === 100 ? 'COMPLETED' : 
                      courseProgress.overallProgress > 0 ? 'IN_PROGRESS' : 'NOT_STARTED',
          lastAccessedAt: courseProgress.lastAccessedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          enrolledAt: courseProgress.enrolledAt?.toDate?.()?.toISOString() || new Date().toISOString(),
          estimatedTimeToComplete: courseData.totalDuration || 0,
          certificateUrl: courseProgress.certificateUrl
        });
      }
    }

    // Get recent activities
    const activitiesSnapshot = await db
      .collection('activities')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();

    const recentActivities = activitiesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString()
    }));

    res.json({
      success: true,
      enrolledCourses,
      totalCoursesEnrolled: enrolledCourses.length,
      totalLessonsCompleted: userProgress.totalLessonsCompleted || 0,
      totalCertificatesEarned: enrolledCourses.filter(c => c.certificateUrl).length,
      totalHoursLearned: Math.round((userProgress.totalWatchTime || 0) / 3600),
      coursesInProgress: enrolledCourses.filter(c => c.courseState === 'IN_PROGRESS').length,
      coursesCompleted: enrolledCourses.filter(c => c.courseState === 'COMPLETED').length,
      overallCompletionRate: enrolledCourses.length > 0 
        ? Math.round(enrolledCourses.reduce((acc, c) => acc + c.completionPercentage, 0) / enrolledCourses.length)
        : 0,
      recentActivities
    });
  } catch (error) {
    console.error('Get user progress error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get user progress'
    });
  }
};

// Get course-specific user progress
export const getCourseProgressHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { courseId } = req.params;
    const { userId } = req.query;

    if (!courseId || !userId || typeof userId !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Course ID and User ID are required'
      });
      return;
    }

    // Get course progress
    const courseProgressDoc = await db
      .collection('user-progress')
      .doc(userId)
      .collection('courses')
      .doc(courseId)
      .get();

    if (!courseProgressDoc.exists) {
      res.json({
        success: true,
        data: {
          courseId,
          userId,
          overallProgress: 0,
          completedLessons: [],
          totalLessons: 0,
          currentLesson: null,
          lastAccessedAt: null
        }
      });
      return;
    }

    const courseProgress = courseProgressDoc.data();

    // Get individual lesson progress
    const lessonsSnapshot = await db
      .collection('user-progress')
      .doc(userId)
      .collection('lessons')
      .where('courseId', '==', courseId)
      .get();

    const lessonProgress: any = {};
    lessonsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      lessonProgress[doc.id] = {
        progress: data.progress || 0,
        completed: data.completed || false,
        watchTime: data.watchTime || 0,
        lastWatchedAt: data.lastWatchedAt?.toDate?.()?.toISOString()
      };
    });

    res.json({
      success: true,
      data: {
        courseId,
        userId,
        overallProgress: courseProgress?.overallProgress || 0,
        completedLessons: courseProgress?.completedLessons || [],
        totalLessons: courseProgress?.totalLessons || 0,
        currentLesson: courseProgress?.currentLesson,
        currentModule: courseProgress?.currentModule,
        lastAccessedAt: courseProgress?.lastAccessedAt?.toDate?.()?.toISOString(),
        completedAt: courseProgress?.completedAt?.toDate?.()?.toISOString(),
        lessonProgress
      }
    });
  } catch (error) {
    console.error('Get course progress error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get course progress'
    });
  }
};

// Get last watched lesson for resume functionality
export const getLastWatchedHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { courseId } = req.query;

    if (!userId) {
      res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
      return;
    }

    let query: any = db
      .collection('user-progress')
      .doc(userId)
      .collection('lessons')
      .orderBy('lastWatchedAt', 'desc');

    // If courseId is provided, filter by course
    if (courseId && typeof courseId === 'string') {
      query = query.where('courseId', '==', courseId);
    }

    const snapshot = await query.limit(1).get();

    if (snapshot.empty) {
      res.json({
        success: true,
        data: null
      });
      return;
    }

    const lastWatchedDoc = snapshot.docs[0];
    const lastWatched = lastWatchedDoc.data();

    // Get lesson details
    const lessonDoc = await db
      .collection('course-content')
      .doc(lastWatched.courseId)
      .get();

    const courseData = lessonDoc.data();
    let lessonDetails = null;

    if (courseData?.modules) {
      for (const module of courseData.modules) {
        const lesson = module.lessons?.find((l: any) => l.id === lastWatched.lessonId);
        if (lesson) {
          lessonDetails = {
            ...lesson,
            moduleId: module.id,
            moduleTitle: module.title
          };
          break;
        }
      }
    }

    res.json({
      success: true,
      data: {
        lessonId: lastWatched.lessonId,
        courseId: lastWatched.courseId,
        courseTitle: courseData?.title,
        lessonTitle: lessonDetails?.title,
        moduleTitle: lessonDetails?.moduleTitle,
        progress: lastWatched.progress || 0,
        watchTime: lastWatched.watchTime || 0,
        lastWatchedAt: lastWatched.lastWatchedAt?.toDate?.()?.toISOString()
      }
    });
  } catch (error) {
    console.error('Get last watched error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get last watched lesson'
    });
  }
};