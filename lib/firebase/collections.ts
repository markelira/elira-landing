/**
 * Firebase Firestore Collection References and Helpers
 * Centralized collection management for course-related data
 */

import {
  collection,
  doc,
  CollectionReference,
  DocumentReference,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type {
  Course,
  CourseModule,
  CourseLesson,
  Quiz,
  Assignment,
} from '@/types/course';

/**
 * Collection Names
 */
export const COLLECTIONS = {
  COURSES: 'courses',
  MODULES: 'modules',
  LESSONS: 'lessons',
  QUIZZES: 'quizzes',
  ASSIGNMENTS: 'assignments',
  RESOURCES: 'resources',
  ENROLLMENTS: 'enrollments',
  PROGRESS: 'user-progress',
  CERTIFICATES: 'certificates',
  REVIEWS: 'reviews',
  DISCUSSIONS: 'discussions',
  SUBMISSIONS: 'submissions',
  ANALYTICS: 'course-analytics',
} as const;

/**
 * Type-safe collection references
 */
export const coursesCollection = collection(db, COLLECTIONS.COURSES) as CollectionReference<Course>;
export const modulesCollection = collection(db, COLLECTIONS.MODULES) as CollectionReference<CourseModule>;
export const lessonsCollection = collection(db, COLLECTIONS.LESSONS) as CollectionReference<CourseLesson>;
export const quizzesCollection = collection(db, COLLECTIONS.QUIZZES) as CollectionReference<Quiz>;
export const assignmentsCollection = collection(db, COLLECTIONS.ASSIGNMENTS) as CollectionReference<Assignment>;

/**
 * Get document reference helpers
 */
export const getCourseRef = (courseId: string): DocumentReference<Course> => 
  doc(coursesCollection, courseId);

export const getModuleRef = (moduleId: string): DocumentReference<CourseModule> => 
  doc(modulesCollection, moduleId);

export const getLessonRef = (lessonId: string): DocumentReference<CourseLesson> => 
  doc(lessonsCollection, lessonId);

export const getQuizRef = (quizId: string): DocumentReference<Quiz> => 
  doc(quizzesCollection, quizId);

export const getAssignmentRef = (assignmentId: string): DocumentReference<Assignment> => 
  doc(assignmentsCollection, assignmentId);

/**
 * Subcollection references
 */
export const getCourseModulesCollection = (courseId: string) =>
  collection(db, COLLECTIONS.COURSES, courseId, 'modules') as CollectionReference<CourseModule>;

export const getModuleLessonsCollection = (courseId: string, moduleId: string) =>
  collection(db, COLLECTIONS.COURSES, courseId, 'modules', moduleId, 'lessons') as CollectionReference<CourseLesson>;

export const getCourseEnrollmentsCollection = (courseId: string) =>
  collection(db, COLLECTIONS.COURSES, courseId, 'enrollments');

export const getCourseReviewsCollection = (courseId: string) =>
  collection(db, COLLECTIONS.COURSES, courseId, 'reviews');

export const getUserProgressCollection = (userId: string) =>
  collection(db, COLLECTIONS.PROGRESS, userId, 'courses');

export const getLessonProgressCollection = (userId: string, courseId: string) =>
  collection(db, COLLECTIONS.PROGRESS, userId, 'courses', courseId, 'lessons');

/**
 * Convert Date to Firestore Timestamp
 */
export const toTimestamp = (date: Date | undefined): Timestamp | undefined => {
  return date ? Timestamp.fromDate(date) : undefined;
};

/**
 * Convert Firestore Timestamp to Date
 */
export const fromTimestamp = (timestamp: Timestamp | undefined): Date | undefined => {
  return timestamp ? timestamp.toDate() : undefined;
};

/**
 * Prepare course data for Firestore
 */
export const prepareCourseForFirestore = (course: Partial<Course>) => {
  const { id, ...courseData } = course;
  return {
    ...courseData,
    createdAt: courseData.createdAt || serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
};

/**
 * Prepare module data for Firestore
 */
export const prepareModuleForFirestore = (module: Partial<CourseModule>) => {
  const { id, ...moduleData } = module;
  return {
    ...moduleData,
    createdAt: moduleData.createdAt || serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
};

/**
 * Prepare lesson data for Firestore
 */
export const prepareLessonForFirestore = (lesson: Partial<CourseLesson>) => {
  const { id, ...lessonData } = lesson;
  return {
    ...lessonData,
    createdAt: lessonData.createdAt || serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
};

/**
 * Batch operation helpers
 */
export const createBatchOperations = () => {
  const operations: Array<() => Promise<any>> = [];
  
  return {
    add: (operation: () => Promise<any>) => {
      operations.push(operation);
    },
    
    execute: async () => {
      const results = await Promise.allSettled(operations);
      const errors = results
        .filter(result => result.status === 'rejected')
        .map(result => (result as PromiseRejectedResult).reason);
      
      if (errors.length > 0) {
        throw new Error(`Batch operation failed: ${errors.join(', ')}`);
      }
      
      return results
        .filter(result => result.status === 'fulfilled')
        .map(result => (result as PromiseFulfilledResult<any>).value);
    }
  };
};

/**
 * Generate unique document ID
 */
export const generateDocId = (collection: string): string => {
  return doc(db, collection).id;
};

/**
 * Course status helpers
 */
export const COURSE_STATUS = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
  UPCOMING: 'UPCOMING',
} as const;

export const canEditCourse = (course: Course): boolean => {
  return course.status === COURSE_STATUS.DRAFT || course.status === COURSE_STATUS.PUBLISHED;
};

export const canPublishCourse = (course: Course): boolean => {
  return (
    course.status === COURSE_STATUS.DRAFT &&
    course.totalModules > 0 &&
    course.totalLessons > 0
  );
};

export const canArchiveCourse = (course: Course): boolean => {
  return course.status === COURSE_STATUS.PUBLISHED;
};

/**
 * Module order helpers
 */
export const reorderModules = (modules: CourseModule[], fromIndex: number, toIndex: number): CourseModule[] => {
  const result = Array.from(modules);
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  
  // Update order property
  return result.map((module, index) => ({
    ...module,
    order: index,
  }));
};

/**
 * Lesson order helpers
 */
export const reorderLessons = (lessons: CourseLesson[], fromIndex: number, toIndex: number): CourseLesson[] => {
  const result = Array.from(lessons);
  const [removed] = result.splice(fromIndex, 1);
  result.splice(toIndex, 0, removed);
  
  // Update order property
  return result.map((lesson, index) => ({
    ...lesson,
    order: index,
  }));
};

/**
 * Calculate course statistics
 */
export const calculateCourseStats = (modules: CourseModule[], lessonsMap: Map<string, CourseLesson[]>) => {
  let totalLessons = 0;
  let totalDuration = 0;
  let totalQuizzes = 0;
  let totalAssignments = 0;
  let totalResources = 0;
  
  modules.forEach(module => {
    const lessons = lessonsMap.get(module.id) || [];
    totalLessons += lessons.length;
    
    lessons.forEach(lesson => {
      totalDuration += lesson.duration || 0;
      
      if (lesson.type === 'QUIZ') totalQuizzes++;
      if (lesson.type === 'ASSIGNMENT') totalAssignments++;
      
      totalResources += lesson.resources?.length || 0;
    });
  });
  
  return {
    totalModules: modules.length,
    totalLessons,
    totalDuration,
    totalQuizzes,
    totalAssignments,
    totalResources,
  };
};

/**
 * Format duration in seconds to human-readable string
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}ó ${minutes}p`;
  }
  return `${minutes} perc`;
};

/**
 * Check if course has minimum content for publishing
 */
export const validateCourseContent = (course: Partial<Course>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!course.title || course.title.length < 5) {
    errors.push('A kurzus címe túl rövid');
  }
  
  if (!course.description || course.description.length < 50) {
    errors.push('A kurzus leírása túl rövid');
  }
  
  if (!course.categoryId) {
    errors.push('Kategória kiválasztása kötelező');
  }
  
  if (!course.instructorId) {
    errors.push('Oktató kiválasztása kötelező');
  }
  
  if ((course.totalModules || 0) < 1) {
    errors.push('Legalább egy modul szükséges');
  }
  
  if ((course.totalLessons || 0) < 1) {
    errors.push('Legalább egy lecke szükséges');
  }
  
  if (!course.slug) {
    errors.push('URL slug megadása kötelező');
  }
  
  if (!course.thumbnailUrl) {
    errors.push('Borítókép feltöltése kötelező');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};