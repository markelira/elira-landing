'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useUserProgress } from '@/hooks/useUserProgress'
import { useTrendingCourses } from '@/hooks/useCoursesCatalog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { UniversalCourseCard } from '@/components/course/UniversalCourseCard'
import { DashboardRoleRedirect } from '@/components/RoleBasedRedirect'
import type { CourseData, EnrollmentData } from '@/components/course/UniversalCourseCard'
import { 
  BookOpen, 
  TrendingUp, 
  Clock, 
  Award,
  Play,
  ArrowRight,
  Target,
  CheckCircle,
  Star
} from 'lucide-react'

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const { data: progressData, isLoading } = useUserProgress()
  const { data: catalogData, isLoading: coursesLoading } = useTrendingCourses(6, 'popular')
  const router = useRouter()

  // Redirect to auth if not logged in
  React.useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  const isPageLoading = authLoading || isLoading || coursesLoading

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  // Get available courses (excluding enrolled ones)
  const availableCourses = React.useMemo(() => {
    if (!catalogData?.courses) return [];
    
    const enrolledCourseIds = progressData?.enrolledCourses?.map(c => c.courseId) || [];
    
    return catalogData.courses
      .filter(course => !course.isEnrolled && !enrolledCourseIds.includes(course.id))
      .slice(0, 3) // Show only 3 available courses
      .map((catalogCourse): CourseData => ({
        id: catalogCourse.id,
        title: catalogCourse.title,
        description: catalogCourse.description,
        thumbnail: catalogCourse.thumbnailUrl,
        instructor: {
          firstName: catalogCourse.instructor.firstName,
          lastName: catalogCourse.instructor.lastName,
          title: 'Oktató'
        },
        category: catalogCourse.category,
        price: 9990, // Use consistent pricing
        currency: 'HUF',
        duration: 480, // 8 hours default
        lessonsCount: 24, // Default lesson count
        studentsCount: catalogCourse.enrollmentCount,
        rating: catalogCourse.averageRating,
        level: catalogCourse.difficulty === 'EXPERT' ? 'ADVANCED' : catalogCourse.difficulty,
        status: 'PUBLISHED' as const
      }));
  }, [catalogData, progressData])

  // Mock enrollment data (check if user is enrolled in any featured courses)
  const getEnrollmentData = (courseId: string): EnrollmentData | undefined => {
    const enrolledCourse = progressData?.enrolledCourses?.find(c => c.courseId === courseId)
    if (enrolledCourse) {
      return {
        isEnrolled: true,
        progressPercentage: enrolledCourse.progressPercentage,
        completedLessons: enrolledCourse.completedLessons,
        totalLessons: enrolledCourse.totalLessons,
        lastAccessedAt: enrolledCourse.lastActivityAt || undefined,
        nextLessonId: enrolledCourse.nextLessonId,
        isCompleted: enrolledCourse.isCompleted
      }
    }
    return { isEnrolled: false }
  }

  if (isPageLoading) {
    return (
      <>
        <DashboardRoleRedirect />
        <div className="min-h-screen bg-gray-50">
          <div className="px-6 py-8">
            <div className="max-w-4xl mx-auto animate-pulse space-y-6">
              <div className="h-8 bg-gray-300 rounded w-1/3"></div>
              <div className="h-32 bg-gray-300 rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="h-24 bg-gray-300 rounded"></div>
                <div className="h-24 bg-gray-300 rounded"></div>
                <div className="h-24 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardRoleRedirect />
      <div className="px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          
          {/* Welcome Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Üdvözöljük, {user?.firstName || user?.email?.split('@')[0]}!
            </h1>
            <p className="text-gray-600">Itt követheti nyomon a tanulási előrehaladását</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-4 md:p-6 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Beiratkozott kurzusok</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                    {progressData?.totalCourses || 0}
                  </p>
                </div>
                <div className="bg-blue-100 p-2 md:p-3 rounded-full">
                  <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="p-4 md:p-6 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Befejezett kurzusok</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                    {progressData?.completedCourses || 0}
                  </p>
                </div>
                <div className="bg-green-100 p-2 md:p-3 rounded-full">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="p-4 md:p-6 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600">Tanulási idő</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                    {formatTime(progressData?.totalLearningTime || 0)}
                  </p>
                </div>
                <div className="bg-purple-100 p-2 md:p-3 rounded-full">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Available Courses Section */}
          {availableCourses.length > 0 && (
            <Card className="p-4 md:p-6 bg-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Elérhető kurzusok
                </h2>
                <Button
                  onClick={() => router.push('/courses')}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  Összes kurzus
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {availableCourses.map((course) => (
                  <UniversalCourseCard
                    key={course.id}
                    course={course}
                    enrollment={{ isEnrolled: false }}
                    variant="featured"
                    onEnroll={(courseId) => router.push(`/courses/${courseId}`)}
                  />
                ))}
              </div>
            </Card>
          )}

          {/* Continue Learning Section */}
          {progressData?.enrolledCourses && progressData.enrolledCourses.length > 0 ? (
            <Card className="p-4 md:p-6 bg-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">Folyamatban lévő kurzusai</h2>
                <Button
                  onClick={() => router.push('/dashboard/learning')}
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  Mind megtekintése
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {progressData.enrolledCourses
                  .filter(course => !course.isCompleted)
                  .slice(0, 2)
                  .map((course) => (
                    <div key={course.courseId} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-2">{course.courseTitle}</h3>
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Haladás</span>
                              <span className="font-medium">{isNaN(course.progressPercentage) ? 0 : Math.round(course.progressPercentage)}%</span>
                            </div>
                            <ProgressBar 
                              value={isNaN(course.progressPercentage) ? 0 : course.progressPercentage}
                              color="blue"
                              height="sm"
                            />
                          </div>
                          <Button
                            onClick={() => {
                              if (course.nextLessonId) {
                                router.push(`/courses/${course.courseId}/lessons/${course.nextLessonId}`)
                              } else {
                                router.push(`/courses/${course.courseId}/learn`)
                              }
                            }}
                            size="sm"
                            className="gap-2"
                          >
                            <Play className="w-4 h-4" />
                            Tanulás folytatása
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          ) : (
            /* Featured Course Card when not enrolled */
            <Card className="overflow-hidden bg-white">
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-white/20 backdrop-blur rounded-full">
                    NÉPSZERŰ KURZUS
                  </span>
                  <span className="text-2xl font-bold">9 990 Ft</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">AI Copywriting Mastery Kurzus</h2>
                <p className="text-white/90 mb-4">
                  Tanulj meg hatékony szövegeket írni AI eszközökkel
                </p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <Clock className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-900">8 óra</div>
                    <div className="text-xs text-gray-500">Videó tartalom</div>
                  </div>
                  <div className="text-center">
                    <BookOpen className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-900">12 lecke</div>
                    <div className="text-xs text-gray-500">Gyakorlatokkal</div>
                  </div>
                  <div className="text-center">
                    <Award className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-900">Tanúsítvány</div>
                    <div className="text-xs text-gray-500">Befejezéskor</div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">Gyakorlati példák valós projektekből</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">AI promptok és sablonok</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">Életfogytig tartó hozzáférés</span>
                  </div>
                </div>
                
                <Button
                  onClick={() => router.push('/courses/ai-copywriting-course')}
                  size="lg"
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white"
                >
                  Részletek és vásárlás
                </Button>
              </div>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => router.push('/dashboard/learning')}
              variant="outline"
              className="p-6 h-auto flex-col items-start hover:border-blue-300"
            >
              <div className="flex items-center gap-3 w-full mb-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Tanulási központ</span>
              </div>
              <p className="text-sm text-gray-600 text-left">Kurzusok, haladás és tanúsítványok</p>
            </Button>

            <Button
              onClick={() => router.push('/dashboard/payments')}
              variant="outline"
              className="p-6 h-auto flex-col items-start hover:border-green-300"
            >
              <div className="flex items-center gap-3 w-full mb-2">
                <Award className="w-5 h-5 text-green-600" />
                <span className="font-medium">Fizetési előzmények</span>
              </div>
              <p className="text-sm text-gray-600 text-left">Számlák és tranzakciók</p>
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}