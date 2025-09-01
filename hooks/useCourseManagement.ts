/**
 * Course Management Hooks
 * React hooks for managing courses with Firebase backend
 */

import { useState, useEffect, useCallback } from 'react';
import { FIREBASE_FUNCTIONS_URL } from '@/lib/config';
import { Course, CourseModule, CourseLesson, CourseStatus } from '@/types/course';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';

export interface CourseStats {
  totalCourses: number;
  publishedCourses: number;
  draftCourses: number;
  archivedCourses: number;
  totalEnrollments: number;
  totalRevenue: number;
}

/**
 * Hook for managing courses
 */
export function useCourseManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) {
        throw new Error('Authentication required');
      }

      const token = await user.getIdToken();
      const response = await fetch(`${FIREBASE_FUNCTIONS_URL}/api/admin/courses`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }

      const data = await response.json();
      setCourses(data.courses || []);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err instanceof Error ? err.message : 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const deleteCourse = async (courseId: string): Promise<boolean> => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Authentication required');
      }

      const token = await user.getIdToken();
      const response = await fetch(`${FIREBASE_FUNCTIONS_URL}/api/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

      // Remove from local state
      setCourses(courses.filter(c => c.id !== courseId));
      toast.success('Course deleted successfully');
      return true;
    } catch (err) {
      console.error('Error deleting course:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to delete course');
      return false;
    }
  };

  const duplicateCourse = async (courseId: string): Promise<string | null> => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Authentication required');
      }

      const course = courses.find(c => c.id === courseId);
      if (!course) {
        throw new Error('Course not found');
      }

      const token = await user.getIdToken();
      
      // Create a duplicate course
      const newCourseData = {
        ...course,
        title: `${course.title} (Copy)`,
        slug: `${course.slug}-copy-${Date.now()}`,
        status: 'DRAFT',
      };

      delete (newCourseData as any).id;
      delete (newCourseData as any).createdAt;
      delete (newCourseData as any).updatedAt;

      const response = await fetch(`${FIREBASE_FUNCTIONS_URL}/api/courses`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourseData),
      });

      if (!response.ok) {
        throw new Error('Failed to duplicate course');
      }

      const data = await response.json();
      await fetchCourses(); // Refresh courses list
      toast.success('Course duplicated successfully');
      return data.courseId;
    } catch (err) {
      console.error('Error duplicating course:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to duplicate course');
      return null;
    }
  };

  const updateCourseStatus = async (courseId: string, status: string): Promise<boolean> => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Authentication required');
      }

      const token = await user.getIdToken();
      
      let endpoint = '';
      if (status === 'PUBLISHED') {
        endpoint = `${FIREBASE_FUNCTIONS_URL}/api/courses/${courseId}/publish`;
      } else if (status === 'ARCHIVED') {
        endpoint = `${FIREBASE_FUNCTIONS_URL}/api/courses/${courseId}/archive`;
      } else {
        // For other status changes, use update endpoint
        endpoint = `${FIREBASE_FUNCTIONS_URL}/api/courses/${courseId}`;
      }

      const response = await fetch(endpoint, {
        method: status === 'PUBLISHED' || status === 'ARCHIVED' ? 'POST' : 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: status !== 'PUBLISHED' && status !== 'ARCHIVED' ? 
          JSON.stringify({ status }) : undefined,
      });

      if (!response.ok) {
        throw new Error(`Failed to update course status to ${status}`);
      }

      // Update local state
      setCourses(courses.map(c => 
        c.id === courseId ? { ...c, status: status as CourseStatus } : c
      ));
      
      toast.success(`Course ${status.toLowerCase()} successfully`);
      return true;
    } catch (err) {
      console.error('Error updating course status:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to update course status');
      return false;
    }
  };

  return {
    courses,
    loading,
    error,
    refetch: fetchCourses,
    deleteCourse,
    duplicateCourse,
    updateCourseStatus,
  };
}

/**
 * Hook for fetching course statistics
 */
export function useCourseStats() {
  const [stats, setStats] = useState<CourseStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);

        const user = auth.currentUser;
        if (!user) {
          throw new Error('Authentication required');
        }

        const token = await user.getIdToken();
        const response = await fetch(`${FIREBASE_FUNCTIONS_URL}/api/admin/course-stats`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch course statistics');
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        console.error('Error fetching course stats:', err);
        setError(err instanceof Error ? err.message : 'Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}

/**
 * Hook for managing course modules
 */
export function useCourseModules(courseId: string) {
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchModules = useCallback(async () => {
    if (!courseId) return;

    try {
      setLoading(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) {
        throw new Error('Authentication required');
      }

      const token = await user.getIdToken();
      const response = await fetch(`${FIREBASE_FUNCTIONS_URL}/api/courses/${courseId}/modules`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch modules');
      }

      const data = await response.json();
      setModules(data.modules || []);
    } catch (err) {
      console.error('Error fetching modules:', err);
      setError(err instanceof Error ? err.message : 'Failed to load modules');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

  const addModule = async (moduleData: Partial<CourseModule>): Promise<string | null> => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Authentication required');
      }

      const token = await user.getIdToken();
      const response = await fetch(`${FIREBASE_FUNCTIONS_URL}/api/courses/${courseId}/modules`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(moduleData),
      });

      if (!response.ok) {
        throw new Error('Failed to add module');
      }

      const data = await response.json();
      await fetchModules(); // Refresh modules list
      toast.success('Module added successfully');
      return data.moduleId;
    } catch (err) {
      console.error('Error adding module:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to add module');
      return null;
    }
  };

  const updateModule = async (moduleId: string, moduleData: Partial<CourseModule>): Promise<boolean> => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Authentication required');
      }

      const token = await user.getIdToken();
      const response = await fetch(`${FIREBASE_FUNCTIONS_URL}/api/modules/${moduleId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(moduleData),
      });

      if (!response.ok) {
        throw new Error('Failed to update module');
      }

      await fetchModules(); // Refresh modules list
      toast.success('Module updated successfully');
      return true;
    } catch (err) {
      console.error('Error updating module:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to update module');
      return false;
    }
  };

  const deleteModule = async (moduleId: string): Promise<boolean> => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Authentication required');
      }

      const token = await user.getIdToken();
      const response = await fetch(`${FIREBASE_FUNCTIONS_URL}/api/modules/${moduleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete module');
      }

      setModules(modules.filter(m => m.id !== moduleId));
      toast.success('Module deleted successfully');
      return true;
    } catch (err) {
      console.error('Error deleting module:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to delete module');
      return false;
    }
  };

  const reorderModules = async (moduleIds: string[]): Promise<boolean> => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Authentication required');
      }

      const token = await user.getIdToken();
      const response = await fetch(`${FIREBASE_FUNCTIONS_URL}/api/courses/${courseId}/modules/reorder`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ moduleIds }),
      });

      if (!response.ok) {
        throw new Error('Failed to reorder modules');
      }

      await fetchModules(); // Refresh modules list
      toast.success('Modules reordered successfully');
      return true;
    } catch (err) {
      console.error('Error reordering modules:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to reorder modules');
      return false;
    }
  };

  return {
    modules,
    loading,
    error,
    refetch: fetchModules,
    addModule,
    updateModule,
    deleteModule,
    reorderModules,
  };
}

/**
 * Hook for managing course lessons
 */
export function useCourseLessons(moduleId: string) {
  const [lessons, setLessons] = useState<CourseLesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLessons = useCallback(async () => {
    if (!moduleId) return;

    try {
      setLoading(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) {
        throw new Error('Authentication required');
      }

      const token = await user.getIdToken();
      const response = await fetch(`${FIREBASE_FUNCTIONS_URL}/api/modules/${moduleId}/lessons`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch lessons');
      }

      const data = await response.json();
      setLessons(data.lessons || []);
    } catch (err) {
      console.error('Error fetching lessons:', err);
      setError(err instanceof Error ? err.message : 'Failed to load lessons');
    } finally {
      setLoading(false);
    }
  }, [moduleId]);

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  const addLesson = async (lessonData: Partial<CourseLesson>): Promise<string | null> => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Authentication required');
      }

      const token = await user.getIdToken();
      const response = await fetch(`${FIREBASE_FUNCTIONS_URL}/api/modules/${moduleId}/lessons`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lessonData),
      });

      if (!response.ok) {
        throw new Error('Failed to add lesson');
      }

      const data = await response.json();
      await fetchLessons(); // Refresh lessons list
      toast.success('Lesson added successfully');
      return data.lessonId;
    } catch (err) {
      console.error('Error adding lesson:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to add lesson');
      return null;
    }
  };

  const updateLesson = async (lessonId: string, lessonData: Partial<CourseLesson>): Promise<boolean> => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Authentication required');
      }

      const token = await user.getIdToken();
      const response = await fetch(`${FIREBASE_FUNCTIONS_URL}/api/lessons/${lessonId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lessonData),
      });

      if (!response.ok) {
        throw new Error('Failed to update lesson');
      }

      await fetchLessons(); // Refresh lessons list
      toast.success('Lesson updated successfully');
      return true;
    } catch (err) {
      console.error('Error updating lesson:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to update lesson');
      return false;
    }
  };

  const deleteLesson = async (lessonId: string): Promise<boolean> => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Authentication required');
      }

      const token = await user.getIdToken();
      const response = await fetch(`${FIREBASE_FUNCTIONS_URL}/api/lessons/${lessonId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete lesson');
      }

      setLessons(lessons.filter(l => l.id !== lessonId));
      toast.success('Lesson deleted successfully');
      return true;
    } catch (err) {
      console.error('Error deleting lesson:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to delete lesson');
      return false;
    }
  };

  const reorderLessons = async (lessonIds: string[]): Promise<boolean> => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Authentication required');
      }

      const token = await user.getIdToken();
      const response = await fetch(`${FIREBASE_FUNCTIONS_URL}/api/modules/${moduleId}/lessons/reorder`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lessonIds }),
      });

      if (!response.ok) {
        throw new Error('Failed to reorder lessons');
      }

      await fetchLessons(); // Refresh lessons list
      toast.success('Lessons reordered successfully');
      return true;
    } catch (err) {
      console.error('Error reordering lessons:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to reorder lessons');
      return false;
    }
  };

  const moveLesson = async (lessonId: string, targetModuleId: string): Promise<boolean> => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Authentication required');
      }

      const token = await user.getIdToken();
      const response = await fetch(`${FIREBASE_FUNCTIONS_URL}/api/lessons/${lessonId}/move`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ targetModuleId }),
      });

      if (!response.ok) {
        throw new Error('Failed to move lesson');
      }

      await fetchLessons(); // Refresh lessons list
      toast.success('Lesson moved successfully');
      return true;
    } catch (err) {
      console.error('Error moving lesson:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to move lesson');
      return false;
    }
  };

  return {
    lessons,
    loading,
    error,
    refetch: fetchLessons,
    addLesson,
    updateLesson,
    deleteLesson,
    reorderLessons,
    moveLesson,
  };
}