import { useState, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'

interface LessonProgress {
  lessonId: string
  courseId: string
  userId: string
  completedAt?: Date
  watchedPercentage: number
  timeSpent: number
  lastWatchedAt: Date
  isCompleted: boolean
}

interface UseLessonProgressReturn {
  progress: LessonProgress | null
  updateProgress: (data: {
    lessonId: string
    courseId: string
    watchedPercentage: number
    timeSpent: number
  }) => Promise<void>
  markAsCompleted: (lessonId: string, courseId: string) => Promise<void>
  isLoading: boolean
  error: string | null
}

export const useLessonProgress = (): UseLessonProgressReturn => {
  const { user } = useAuth()
  const [progress, setProgress] = useState<LessonProgress | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateProgress = useCallback(async (data: {
    lessonId: string
    courseId: string
    watchedPercentage: number
    timeSpent: number
  }) => {
    if (!user) {
      setError('Felhasználói bejelentkezés szükséges')
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      // Call the API endpoint with authentication
      // Skip token for now since User type doesn't have getIdToken
      
      const response = await fetch(`/api/lessons/${data.lessonId}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer dummy-token` // Placeholder
        },
        body: JSON.stringify({
          userId: user.id,
          courseId: data.courseId,
          watchedPercentage: data.watchedPercentage,
          timeSpent: data.timeSpent
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update progress')
      }

      const result = await response.json()

      // Update local state
      const newProgress: LessonProgress = {
        lessonId: data.lessonId,
        courseId: data.courseId,
        userId: user.uid,
        watchedPercentage: data.watchedPercentage,
        timeSpent: data.timeSpent,
        lastWatchedAt: new Date(),
        isCompleted: data.watchedPercentage >= 90
      }

      if (newProgress.isCompleted && !progress?.isCompleted) {
        newProgress.completedAt = new Date()
      }

      setProgress(newProgress)
      
      console.log('📊 [useLessonProgress] Progress updated:', result.data)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Hiba történt a folyamat mentésekor'
      setError(errorMessage)
      console.error('❌ [useLessonProgress] Update error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [user, progress])

  const markAsCompleted = useCallback(async (lessonId: string, courseId: string) => {
    if (!user) {
      setError('Felhasználói bejelentkezés szükséges')
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      // Call the API endpoint with authentication
      // Skip token for now since User type doesn't have getIdToken
      
      const response = await fetch(`/api/lessons/${lessonId}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer dummy-token` // Placeholder
        },
        body: JSON.stringify({
          userId: user.id,
          courseId,
          watchedPercentage: 100,
          timeSpent: progress?.timeSpent || 0
        })
      })

      if (!response.ok) {
        throw new Error('Failed to mark lesson as completed')
      }

      const result = await response.json()

      // Update local state
      const completedProgress: LessonProgress = {
        lessonId,
        courseId,
        userId: user.uid,
        watchedPercentage: 100,
        timeSpent: progress?.timeSpent || 0,
        lastWatchedAt: new Date(),
        isCompleted: true,
        completedAt: new Date()
      }

      setProgress(completedProgress)
      
      console.log('✅ [useLessonProgress] Lesson marked as completed:', result.data)

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Hiba történt a befejezés mentésekor'
      setError(errorMessage)
      console.error('❌ [useLessonProgress] Mark completed error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [user, progress])

  return {
    progress,
    updateProgress,
    markAsCompleted,
    isLoading,
    error
  }
}