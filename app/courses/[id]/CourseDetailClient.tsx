'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useCourse, useEnrollInCourse } from '@/hooks/useCourseQueries'
import { useAuth } from '@/contexts/AuthContext'
import { CourseDetailWithTabs } from '@/components/course/CourseDetailWithTabs'

interface Props {
  courseId: string
}

export default function CourseDetailClient({ courseId }: Props) {
  const router = useRouter()
  const { user } = useAuth()
  const { data: course, isLoading, error } = useCourse(courseId)
  const enrollMutation = useEnrollInCourse()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section Skeleton */}
          <div className="mb-8 sm:mb-12 animate-pulse">
            <div className="h-8 sm:h-12 bg-gray-300 rounded w-3/4 mb-3 sm:mb-4"></div>
            <div className="h-4 sm:h-6 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 sm:h-6 bg-gray-200 rounded w-2/3 mb-6 sm:mb-8"></div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="h-12 bg-gray-300 rounded w-full sm:w-32"></div>
              <div className="h-12 bg-gray-200 rounded w-full sm:w-24"></div>
            </div>
          </div>
          
          {/* Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <div className="h-48 sm:h-64 bg-gray-300 rounded"></div>
              <div className="space-y-3 sm:space-y-4">
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
            <div className="lg:col-span-1 mt-6 lg:mt-0">
              <div className="h-80 sm:h-96 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Kurzus nem található</h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">A keresett kurzus nem létezik vagy nem érhető el.</p>
          <button
            onClick={() => router.push('/courses')}
            className="mobile-btn bg-teal-600 text-white hover:bg-teal-700 transition-colors w-full sm:w-auto"
          >
            Vissza a kurzusokhoz
          </button>
        </div>
      </div>
    )
  }

  // Calculate course statistics
  const totalLessons = course.modules?.reduce((acc, module) => 
    acc + (module.lessons?.length || 0), 0
  ) || 0
  
  const totalDuration = course.modules?.reduce((acc, module) => 
    acc + (module.lessons?.reduce((lessonAcc, lesson) => 
      lessonAcc + (lesson.duration || 0), 0
    ) || 0), 0
  ) || 0

  // Format duration to hours and minutes
  const hours = Math.floor(totalDuration / 3600)
  const minutes = Math.floor((totalDuration % 3600) / 60)
  const durationText = hours > 0 ? `${hours}ó ${minutes}p` : `${minutes} perc`

  // Free course enrollment handler
  const handleFreeEnroll = () => {
    if (!user) {
      router.push('/login?redirect=' + encodeURIComponent(`/courses/${courseId}`))
      return
    }

    if (course.isFree === true) {
      enrollMutation.mutate(courseId, {
        onSuccess: () => {
          // Redirect to success page
          router.push(`/courses/${courseId}/enrolled`)
        },
        onError: (error) => {
          console.error('Enrollment failed:', error)
          alert('Hiba történt a beiratkozás során. Kérjük próbálja újra.')
        }
      })
    }
  }

  // Enhanced course data for display
  const enhancedCourse = {
    ...course,
    stats: {
      modules: course.modules?.length || 0,
      lessons: totalLessons,
      duration: durationText,
      students: course.enrollmentCount || 0,
      rating: course.averageRating || 0,
      reviews: course.reviewCount || 0
    }
  }

  return (
    <CourseDetailWithTabs
      courseData={enhancedCourse}
      courseId={courseId}
    />
  )
}