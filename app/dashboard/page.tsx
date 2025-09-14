'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useUserProgress } from '@/hooks/useUserProgress'
import { useTrendingCourses } from '@/hooks/useCoursesCatalog'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
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
        <div className="min-h-screen" style={{ backgroundColor: '#F8F7F5' }}>
          <div className="px-6 py-8">
            <div className="max-w-4xl mx-auto animate-pulse space-y-6">
              <div className="h-8 bg-slate-300 rounded w-1/3"></div>
              <div className="h-32 bg-slate-300 rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="h-24 bg-slate-300 rounded"></div>
                <div className="h-24 bg-slate-300 rounded"></div>
                <div className="h-24 bg-slate-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F7F5' }}>
      <DashboardRoleRedirect />
      <div className="px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          
          {/* Academic Welcome Header */}
          <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 p-6 shadow-sm">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mb-4"></div>
            <h1 className="text-2xl font-serif font-medium text-slate-900 mb-2">
              Üdvözöljük, {user?.firstName || user?.email?.split('@')[0]}!
            </h1>
            <p className="text-slate-700 font-light">Itt követheti nyomon a tanulási előrehaladását</p>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mt-4"></div>
          </div>

          {/* Academic Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-4 md:p-6 bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-slate-600 font-light">Beiratkozott kurzusok</p>
                  <p className="text-xl md:text-2xl font-serif font-medium text-slate-900 mt-1">
                    {progressData?.totalCourses || 0}
                  </p>
                </div>
                <div className="bg-amber-100/60 p-2 md:p-3 rounded border border-amber-200/50">
                  <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-amber-700" />
                </div>
              </div>
            </Card>

            <Card className="p-4 md:p-6 bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-slate-600 font-light">Befejezett kurzusok</p>
                  <p className="text-xl md:text-2xl font-serif font-medium text-slate-900 mt-1">
                    {progressData?.completedCourses || 0}
                  </p>
                </div>
                <div className="bg-emerald-100/60 p-2 md:p-3 rounded border border-emerald-200/50">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-700" />
                </div>
              </div>
            </Card>

            <Card className="p-4 md:p-6 bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-slate-600 font-light">Tanulási idő</p>
                  <p className="text-xl md:text-2xl font-serif font-medium text-slate-900 mt-1">
                    {formatTime(progressData?.totalLearningTime || 0)}
                  </p>
                </div>
                <div className="bg-violet-100/60 p-2 md:p-3 rounded border border-violet-200/50">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-violet-700" />
                </div>
              </div>
            </Card>
          </div>

          {/* Academic Available Courses Section */}
          {availableCourses.length > 0 && (
            <Card className="p-4 md:p-6 bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg md:text-xl font-serif font-medium text-slate-900 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-600" />
                  Elérhető kurzusok
                </h2>
                <Button
                  onClick={() => router.push('/courses')}
                  variant="outline"
                  size="sm"
                  className="gap-2 border-slate-300 text-slate-700 hover:border-amber-400 hover:text-amber-700"
                >
                  Összes kurzus
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mb-6"></div>
              
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

          {/* Academic Continue Learning Section */}
          {progressData?.enrolledCourses && progressData.enrolledCourses.length > 0 ? (
            <Card className="p-4 md:p-6 bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg md:text-xl font-serif font-medium text-slate-900">Folyamatban lévő kurzusai</h2>
                <Button
                  onClick={() => router.push('/dashboard/learning')}
                  variant="outline"
                  size="sm"
                  className="gap-2 border-slate-300 text-slate-700 hover:border-amber-400 hover:text-amber-700"
                >
                  Mind megtekintése
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mb-6"></div>
              
              <div className="grid grid-cols-1 gap-4">
                {progressData.enrolledCourses
                  .filter(course => !course.isCompleted)
                  .slice(0, 2)
                  .map((course) => (
                    <div key={course.courseId} className="border border-slate-300/50 rounded bg-white/60 p-4 hover:border-amber-300 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="bg-amber-100/60 p-2 rounded border border-amber-200/50">
                          <BookOpen className="w-5 h-5 text-amber-700" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif font-medium text-slate-900 mb-2">{course.courseTitle}</h3>
                          <div className="mb-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-slate-600 font-light">Haladás</span>
                              <span className="font-medium text-slate-800">{isNaN(course.progressPercentage) ? 0 : Math.round(course.progressPercentage)}%</span>
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
                            className="gap-2 bg-amber-600 hover:bg-amber-700 text-white border-amber-600"
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
            /* Academic Featured Course Card when not enrolled */
            <Card className="overflow-hidden bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm">
              <div className="bg-gradient-to-br from-amber-600 to-amber-700 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-block px-3 py-1 text-xs font-serif font-medium bg-white/20 backdrop-blur rounded border border-white/30">
                    NÉPSZERŰ KURZUS
                  </span>
                  <span className="text-2xl font-serif font-light">9 990 Ft</span>
                </div>
                <h2 className="text-2xl font-serif font-medium mb-2">AI Copywriting Mastery Kurzus</h2>
                <p className="text-white/90 font-light mb-4">
                  Tanulj meg hatékony szövegeket írni AI eszközökkel
                </p>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <Clock className="w-5 h-5 text-slate-500 mx-auto mb-1" />
                    <div className="text-sm font-serif font-medium text-slate-900">8 óra</div>
                    <div className="text-xs text-slate-600 font-light">Videó tartalom</div>
                  </div>
                  <div className="text-center">
                    <BookOpen className="w-5 h-5 text-slate-500 mx-auto mb-1" />
                    <div className="text-sm font-serif font-medium text-slate-900">12 lecke</div>
                    <div className="text-xs text-slate-600 font-light">Gyakorlatokkal</div>
                  </div>
                  <div className="text-center">
                    <Award className="w-5 h-5 text-slate-500 mx-auto mb-1" />
                    <div className="text-sm font-serif font-medium text-slate-900">Tanúsítvány</div>
                    <div className="text-xs text-slate-600 font-light">Befejezéskor</div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-slate-700 font-light">Gyakorlati példák valós projektekből</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-slate-700 font-light">AI promptok és sablonok</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-slate-700 font-light">Életfogytig tartó hozzáférés</span>
                  </div>
                </div>
                
                <Button
                  onClick={() => router.push('/courses/ai-copywriting-course')}
                  size="lg"
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-light"
                >
                  Részletek és vásárlás
                </Button>
              </div>
            </Card>
          )}

          {/* Academic Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => router.push('/dashboard/learning')}
              variant="outline"
              className="p-6 h-auto flex-col items-start bg-white/60 backdrop-blur-sm border-slate-300 hover:border-amber-400 hover:bg-white/80"
            >
              <div className="flex items-center gap-3 w-full mb-2">
                <BookOpen className="w-5 h-5 text-amber-700" />
                <span className="font-serif font-medium text-slate-900">Tanulási központ</span>
              </div>
              <p className="text-sm text-slate-600 text-left font-light">Kurzusok, haladás és tanúsítványok</p>
            </Button>

            <Button
              onClick={() => router.push('/dashboard/payments')}
              variant="outline"
              className="p-6 h-auto flex-col items-start bg-white/60 backdrop-blur-sm border-slate-300 hover:border-amber-400 hover:bg-white/80"
            >
              <div className="flex items-center gap-3 w-full mb-2">
                <Award className="w-5 h-5 text-amber-700" />
                <span className="font-serif font-medium text-slate-900">Fizetési előzmények</span>
              </div>
              <p className="text-sm text-slate-600 text-left font-light">Számlák és tranzakciók</p>
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}