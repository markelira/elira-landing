import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Course } from '@/src/types';
import { httpsCallable } from 'firebase/functions';
import { functions } from '@/lib/firebase';
import { useAuthStore } from '@/src/stores/authStore'

export const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const getCoursesFn = httpsCallable(functions, 'getCoursesCallable');
      const result: any = await getCoursesFn();
      return result.data.courses || [];
    },
  });
};

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      console.log('🔍 [useCourse] Calling getCourse with ID:', id);
      const getCourseFn = httpsCallable(functions, 'getCourse');
      const result: any = await getCourseFn({ courseId: id });
      
      if (!result.data.success) {
        console.error('❌ [useCourse] Error from backend:', result.data.error);
        throw new Error(result.data.error || 'Kurzus betöltése sikertelen');
      }
      
      const course = result.data.course as Course;
      return course;
    },
    enabled: !!id,
  });
};

export const useUpdateLessonProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      courseId,
      lessonId,
      progress,
    }: {
      courseId: string;
      lessonId: string;
      progress: number;
    }) => {
      const markLessonAsCompleteFn = httpsCallable(functions, 'markLessonAsComplete');
      const result: any = await markLessonAsCompleteFn({
        courseId,
        lessonId,
        progress,
      });
      return result.data;
    },
    onSuccess: (_, { courseId }) => {
      // Invalidate and refetch course data
      queryClient.invalidateQueries({ queryKey: ['course', courseId] });
    },
  });
};

export const useEnrollInCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: string) => {
      const { user, isAuthenticated, authReady } = useAuthStore.getState();
      
      // Wait for auth to be ready
      if (!authReady) {
        throw new Error('Autentikáció inicializálódik, kérjük várjon...');
      }
      
      // Check authentication
      if (!isAuthenticated || !user) {
        throw new Error('Bejelentkezés szükséges a kurzusra való feliratkozáshoz');
      }
      
      const enrollInCourseFn = httpsCallable(functions, 'enrollInCourse');
      const result: any = await enrollInCourseFn({ courseId });
      
      if (!result.data.success) {
        throw new Error(result.data.error || 'Beiratkozás sikertelen');
      }
      
      return result.data;
    },
    onSuccess: (_, courseId) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['course', courseId] });
      queryClient.invalidateQueries({ queryKey: ['featuredCourses'] });
    },
  });
};