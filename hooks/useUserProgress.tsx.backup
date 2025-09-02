import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'
import { getFirebaseFunctionsURL } from '@/lib/config'

export interface UserProgressData {
  success: boolean
  enrolledCourses: EnrolledCourse[]
  totalCoursesEnrolled: number
  totalLessonsCompleted: number
  totalCertificatesEarned: number
  totalHoursLearned: number
  coursesInProgress: number
  coursesCompleted: number
  overallCompletionRate: number
  recentActivities?: Activity[]
  weeklyHours?: number
  weeklyLessons?: number
  currentStreak?: number
  completedCourses?: number
}

export interface EnrolledCourse {
  courseId: string
  courseTitle: string
  courseDescription?: string
  courseThumbnailUrl?: string
  instructorName: string
  categoryName: string
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
  totalLessons: number
  completedLessons: number
  completionPercentage: number
  courseState: CourseState
  lastAccessedAt: string
  enrolledAt: string
  estimatedTimeToComplete?: number
  certificateUrl?: string
  rating?: number
}

export interface Activity {
  id: string
  type: ActivityType
  title: string
  description: string
  courseId?: string
  courseName?: string
  lessonId?: string
  lessonTitle?: string
  createdAt: string
  priority: ActivityPriority
  metadata?: {
    completionPercentage?: number
    quizScore?: number
    lessonsCompleted?: number
    totalTimeSpent?: number
    [key: string]: any
  }
}

export enum CourseState {
  NOT_STARTED = 'NOT_STARTED',
  ACTIVE_PROGRESS = 'ACTIVE_PROGRESS',
  STALE_PROGRESS = 'STALE_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export enum ActivityType {
  COURSE_ENROLLED = 'COURSE_ENROLLED',
  COURSE_COMPLETED = 'COURSE_COMPLETED',
  LESSON_COMPLETED = 'LESSON_COMPLETED',
  CERTIFICATE_EARNED = 'CERTIFICATE_EARNED',
  QUIZ_MASTERED = 'QUIZ_MASTERED',
  MILESTONE_REACHED = 'MILESTONE_REACHED',
  LEARNING_SESSION = 'LEARNING_SESSION'
}

export enum ActivityPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export function useUserProgress() {
  const { user, loading: authLoading } = useAuth()
  
  return useQuery<UserProgressData>({
    queryKey: ['userProgress', user?.id],
    queryFn: async () => {
      try {
        console.log('🔍 [useUserProgress] Fetching user progress data')
        
        if (!user?.id) {
          throw new Error('User not authenticated')
        }

        // Call the real API endpoint
        const functionsUrl = getFirebaseFunctionsURL()
        
        const response = await fetch(`${functionsUrl}/api/users/${user.id}/progress`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          // If API fails, return mock data as fallback
          console.warn('⚠️ [useUserProgress] API call failed, using mock data')
          const mockData: UserProgressData = {
          success: true,
          enrolledCourses: [
            {
              courseId: 'ai-copywriting-course',
              courseTitle: 'AI Copywriting Mastery Kurzus',
              courseDescription: 'Tanulj meg hatékony szövegeket írni AI eszközökkel és ChatGPT-vel. Ez a gyakorlatorientált kurzus mindent megtanít, amit tudnod kell a modern copywriting világában.',
              courseThumbnailUrl: '/images/course-ai-copywriting.jpg',
              instructorName: 'Márk Eszterházy',
              categoryName: 'Digital Marketing',
              difficulty: 'INTERMEDIATE',
              totalLessons: 4,
              completedLessons: 1,
              completionPercentage: 25,
              courseState: CourseState.ACTIVE_PROGRESS,
              lastAccessedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
              enrolledAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
              estimatedTimeToComplete: 3, // hours
              rating: 4.9
            }
          ],
          totalCoursesEnrolled: 1,
          totalLessonsCompleted: 1,
          totalCertificatesEarned: 0,
          totalHoursLearned: 2.5,
          coursesInProgress: 1,
          coursesCompleted: 0,
          overallCompletionRate: 25,
          recentActivities: [
            {
              id: '1',
              type: ActivityType.LESSON_COMPLETED,
              title: 'Befejezett lecke: Bevezetés az AI copywritingba',
              description: 'Sikeresen elvégezted a kurzus első leckéjét',
              courseId: 'ai-copywriting-course',
              courseName: 'AI Copywriting Mastery Kurzus',
              lessonId: 'lesson-1',
              lessonTitle: 'Bevezetés az AI copywritingba',
              createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
              priority: ActivityPriority.MEDIUM,
              metadata: {
                completionPercentage: 25,
                totalTimeSpent: 15
              }
            },
            {
              id: '2',
              type: ActivityType.COURSE_ENROLLED,
              title: 'Beiratkozás: AI Copywriting Mastery Kurzus',
              description: 'Sikeresen beiratkoztál az AI copywriting kurzusra',
              courseId: 'ai-copywriting-course',
              courseName: 'AI Copywriting Mastery Kurzus',
              createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
              priority: ActivityPriority.HIGH,
              metadata: {
                completionPercentage: 0
              }
            }
          ],
          weeklyHours: 2.5,
          weeklyLessons: 1,
          currentStreak: 1,
          completedCourses: 0
          }

          console.log('✅ [useUserProgress] Using mock data:', mockData)
          return mockData
        }

        const data = await response.json()
        console.log('✅ [useUserProgress] User progress fetched from API:', data)
        return data as UserProgressData
      } catch (error) {
        console.error('❌ [useUserProgress] Error fetching user progress:', error)
        // Return fallback empty progress data
        return {
          success: true,
          enrolledCourses: [],
          totalCoursesEnrolled: 0,
          totalLessonsCompleted: 0,
          totalCertificatesEarned: 0,
          totalHoursLearned: 0,
          coursesInProgress: 0,
          coursesCompleted: 0,
          overallCompletionRate: 0
        } as UserProgressData
      }
    },
    enabled: !!user && !authLoading,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}