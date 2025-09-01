import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'

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

// Mock function to get user progress data
const getUserProgress = async (userId: string, token?: string): Promise<UserProgressData> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))

  // For MVP, return mock data
  // In production, this would fetch from Firestore
  const mockProgress: UserProgressData = {
    enrolledCourses: [
      {
        courseId: 'ai-copywriting-mastery',
        courseTitle: 'AI Copywriting Mastery Kurzus',
        totalLessons: 4,
        completedLessons: 2,
        progressPercentage: 50,
        lastActivityAt: new Date(),
        isCompleted: false,
        nextLessonId: 'lesson-3',
        nextLessonTitle: 'Az első AI szöveg'
      }
    ],
    totalCourses: 1,
    completedCourses: 0,
    inProgressCourses: 1,
    overallProgress: 50,
    totalLearningTime: 3600, // 1 hour in seconds
    certificates: []
  }

  // Try to fetch real data from API
  try {
    const response = await fetch(`/api/users/${userId}/progress`, {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    })

    if (response.ok) {
      const data = await response.json()
      return data
    }
  } catch (error) {
    console.log('Using mock progress data')
  }

  return mockProgress
}

export const useUserProgress = () => {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['userProgress', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated')
      
      // Skip token for now since User type doesn't have getIdToken  
      const progress = await getUserProgress(user.id, undefined)
      
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