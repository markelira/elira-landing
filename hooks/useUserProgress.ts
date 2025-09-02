import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { auth } from '@/lib/firebase'

export interface CourseProgress {
  courseId: string
  courseTitle: string
  totalLessons: number
  completedLessons: number
  progressPercentage: number
  lastActivityAt: Date | null
  isCompleted: boolean
  nextLessonId?: string
  nextLessonTitle?: string
}

export interface UserProgressData {
  enrolledCourses: CourseProgress[]
  totalCourses: number
  completedCourses: number
  inProgressCourses: number
  overallProgress: number
  totalLearningTime: number
  certificates: any[]
}

// Function to get user progress data from Firebase Functions
const getUserProgress = async (userId: string, token?: string): Promise<UserProgressData> => {
  if (!token) {
    throw new Error('Authentication token required');
  }

  try {
    const response = await fetch(`/api/users/${userId}/progress`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      const data = await response.json();
      
      // Ensure progress percentages are valid numbers
      if (data.enrolledCourses) {
        data.enrolledCourses = data.enrolledCourses.map((course: any) => ({
          ...course,
          progressPercentage: isNaN(course.progressPercentage) ? 0 : course.progressPercentage,
          completedLessons: course.completedLessons || 0,
          totalLessons: course.totalLessons || 0,
          lastActivityAt: course.lastActivityAt ? new Date(course.lastActivityAt) : null
        }));
      }
      
      return {
        ...data,
        overallProgress: isNaN(data.overallProgress) ? 0 : data.overallProgress
      };
    }
    
    throw new Error(`API request failed with status ${response.status}`);
  } catch (error) {
    console.error('Failed to fetch user progress:', error);
    
    // Return empty progress data instead of mock data
    return {
      enrolledCourses: [],
      totalCourses: 0,
      completedCourses: 0,
      inProgressCourses: 0,
      overallProgress: 0,
      totalLearningTime: 0,
      certificates: []
    };
  }
}

export const useUserProgress = () => {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['userProgress', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated')
      
      // Get Firebase auth token
      const token = await auth.currentUser?.getIdToken()
      if (!token) throw new Error('Failed to get authentication token')
      
      const progress = await getUserProgress(user.id, token)
      
      console.log('📊 User progress loaded:', {
        courses: progress.totalCourses,
        completed: progress.completedCourses,
        overall: progress.overallProgress
      })
      
      return progress
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000 // Refresh every 30 seconds
  })
}

// Hook to get progress for a specific course
export const useCourseProgress = (courseId: string) => {
  const { data: userProgress } = useUserProgress()
  
  const courseProgress = userProgress?.enrolledCourses.find(
    course => course.courseId === courseId
  )

  return {
    progress: courseProgress,
    isLoading: !userProgress,
    progressPercentage: courseProgress?.progressPercentage || 0,
    completedLessons: courseProgress?.completedLessons || 0,
    totalLessons: courseProgress?.totalLessons || 0,
    isCompleted: courseProgress?.isCompleted || false,
    nextLesson: courseProgress?.nextLessonId ? {
      id: courseProgress.nextLessonId,
      title: courseProgress.nextLessonTitle || ''
    } : null
  }
}