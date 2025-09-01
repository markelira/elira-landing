import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/contexts/AuthContext'

interface PlayerData {
  success: boolean
  course?: {
    id: string
    title: string
    description: string
    modules: Array<{
      id: string
      title: string
      order: number
      lessons: Array<{
        id: string
        title: string
        content: string
        type: 'VIDEO' | 'TEXT' | 'QUIZ' | 'PDF' | 'AUDIO' | 'READING' | 'PDF' | 'AUDIO' | 'READING'
        order: number
        videoUrl?: string
        duration?: number
        pdfUrl?: string
      }>
    }>
  }
  signedPlaybackUrl?: string | null
  currentLesson?: {
    id: string
    title: string
    content: string
    type: 'VIDEO' | 'TEXT' | 'QUIZ' | 'PDF' | 'AUDIO' | 'READING'
    videoUrl?: string
    duration?: number
    pdfUrl?: string
  }
  error?: string
}

// MVP sample course data - using same data as useCourse hook for consistency
const getMVPCourseData = (courseId: string) => ({
  id: courseId,
  title: 'AI Copywriting Mastery Kurzus',
  description: 'Tanulj meg hatékony szövegeket írni AI eszközökkel és ChatGPT-vel. Ez a gyakorlatorientált kurzus mindent megtanít, amit tudnod kell a modern copywriting világában.',
  modules: [
    {
      id: 'module-1',
      title: 'AI Copywriting Alapok',
      order: 1,
      lessons: [
        {
          id: 'lesson-1',
          title: 'Bevezetés az AI copywritingba',
          content: 'AI copywriting alapjai és lehetőségei. Ebben a leckében megismered az AI copywriting alapjait és azt, hogy hogyan segíthetnek az AI eszközök hatékonyabb szövegek írásában.',
          type: 'VIDEO' as const,
          order: 1,
          videoUrl: 'https://stream.mux.com/example-video-1.m3u8',
          duration: 900 // 15 minutes in seconds
        },
        {
          id: 'lesson-2', 
          title: 'ChatGPT beállítása copywritinghoz',
          content: 'ChatGPT optimális konfigurálása copywriting célokra. Megtanulod, hogyan állítsd be a ChatGPT-t a legjobb eredmények eléréséhez.',
          type: 'VIDEO' as const,
          order: 2,
          videoUrl: 'https://stream.mux.com/example-video-2.m3u8',
          duration: 1200 // 20 minutes
        },
        {
          id: 'lesson-3',
          title: 'Az első AI szöveg',
          content: 'Az első szöveg létrehozása AI segítségével. Gyakorlati lépések és tippek az első professzionális szöveg elkészítéséhez.',
          type: 'TEXT' as const,
          order: 3,
          duration: 600 // 10 minutes reading time
        }
      ]
    },
    {
      id: 'module-2',
      title: 'Haladó AI technikák',
      order: 2,
      lessons: [
        {
          id: 'lesson-4',
          title: 'Haladó prompt engineering',
          content: 'Fejlett prompting technikák elsajátítása. Megtanulod a leghatékonyabb promptokat és technikákat a professzionális copywritinghoz.',
          type: 'VIDEO' as const,
          order: 1,
          videoUrl: 'https://stream.mux.com/example-video-3.m3u8',
          duration: 1800 // 30 minutes
        }
      ]
    }
  ]
})

// Function to get course player data with real video URLs
const getCoursePlayerData = async (courseId: string, lessonId?: string, userToken?: string): Promise<PlayerData> => {
  // Simulate API delay for realistic UX
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const mockCourse = getMVPCourseData(courseId)

  let currentLesson
  if (lessonId) {
    // Find the specific lesson
    for (const module of mockCourse.modules) {
      const lesson = module.lessons.find(l => l.id === lessonId)
      if (lesson) {
        currentLesson = lesson
        break
      }
    }
  }

  let signedPlaybackUrl = null
  
  // Fetch real video URL for video lessons
  if (currentLesson?.type === 'VIDEO' && lessonId && userToken) {
    try {
      const response = await fetch(`/api/lessons/${lessonId}/video-url`, {
        headers: {
          'Authorization': `Bearer ${userToken}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        signedPlaybackUrl = data.videoUrl || null
      } else {
        // Fallback to mock URL if API fails
        signedPlaybackUrl = currentLesson.videoUrl || null
      }
    } catch (error) {
      console.error('Error fetching video URL:', error)
      // Fallback to mock URL
      signedPlaybackUrl = currentLesson?.videoUrl || null
    }
  }

  return {
    success: true,
    course: mockCourse,
    currentLesson,
    signedPlaybackUrl
  }
}

export const usePlayerData = (courseId: string | undefined, lessonId: string | undefined) => {
  const { user } = useAuth()
  const isAuthenticated = !!user
  
  return useQuery({
    queryKey: ['player-data', courseId, lessonId],
    queryFn: async () => {
      if (!courseId) return null
      
      console.log('🔍 [usePlayerData] Calling getCoursePlayerData with:', { courseId, lessonId })
      
      // Check authentication state
      if (!isAuthenticated || !user) {
        throw new Error('Authentication required to load player data')
      }
      
      try {
        // Get user token for authenticated video URL fetching
        // Skip token for now since User type doesn't have getIdToken
        const token = undefined
        const result = await getCoursePlayerData(courseId, lessonId, token)
        
        console.log('🔍 [usePlayerData] Result:', {
          success: result.success,
          hasCourse: !!result.course,
          hasSignedUrl: !!result.signedPlaybackUrl,
          courseTitle: result.course?.title,
          currentLessonTitle: result.currentLesson?.title
        })
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to load player data')
        }
        
        return result
      } catch (error) {
        console.error('Error fetching player data:', error)
        throw error
      }
    },
    enabled: !!courseId && isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry auth-related errors
      if (error.message.includes('Authentication')) {
        return false
      }
      return failureCount < 3
    }
  })
}