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
import PurchaseButton from '@/components/course/PurchaseButton'
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50/90 via-white to-gray-50/70 relative overflow-hidden">
      {/* Liquid Glass Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-teal-100/20 to-cyan-100/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-orange-100/20 to-amber-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <DashboardRoleRedirect />
      <div className="relative z-10 px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          
          {/* Welcome Header */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/60 p-8 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-white/40 px-5 py-3 rounded-full shadow-lg shadow-gray-100/50 mb-6 hover:shadow-xl hover:bg-white/70 transition-all duration-300">
                <Target className="w-5 h-5 text-teal-600" />
                <span className="font-medium text-gray-900 tracking-tight">Dashboard</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
                Üdvözöljük, {user?.firstName || user?.email?.split('@')[0]}!
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Itt követheti nyomon a tanulási előrehaladását és hozzáférhet a masterclass anyagokhoz
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-2">Masterclass beiratkozások</p>
                  <p className="text-3xl font-bold text-gray-900 tracking-tight">
                    {progressData?.totalCourses || 0}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-7 h-7 text-teal-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-2">Befejezett programok</p>
                  <p className="text-3xl font-bold text-gray-900 tracking-tight">
                    {progressData?.completedCourses || 0}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-7 h-7 text-emerald-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-2">Tanulási idő</p>
                  <p className="text-3xl font-bold text-gray-900 tracking-tight">
                    {formatTime(progressData?.totalLearningTime || 0)}
                  </p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg">
                  <Clock className="w-7 h-7 text-orange-600" />
                </div>
              </div>
            </Card>
          </div>

          {/* Available Courses Section */}
          {availableCourses.length > 0 && (
            <Card className="p-8 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 tracking-tight">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-teal-600" />
                  </div>
                  Elérhető programok
                </h2>
                <Button
                  onClick={() => router.push('/courses')}
                  variant="outline"
                  size="sm"
                  className="gap-2 border-teal-300 text-teal-700 hover:border-teal-400 hover:text-teal-800 rounded-xl"
                >
                  Összes program
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <Card className="p-8 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 tracking-tight">
                  <div className="w-8 h-8 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-teal-600" />
                  </div>
                  Folyamatban lévő programok
                </h2>
                <Button
                  onClick={() => router.push('/dashboard/learning')}
                  variant="outline"
                  size="sm"
                  className="gap-2 border-teal-300 text-teal-700 hover:border-teal-400 hover:text-teal-800 rounded-xl"
                >
                  Mind megtekintése
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {progressData.enrolledCourses
                  .filter(course => !course.isCompleted)
                  .slice(0, 2)
                  .map((course) => (
                    <div key={course.courseId} className="bg-white/50 backdrop-blur-sm rounded-2xl border border-white/40 p-6 hover:bg-white/60 hover:border-white/60 hover:shadow-lg transition-all duration-300 shadow-sm">
                      <div className="flex items-start gap-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center shadow-lg">
                          <BookOpen className="w-7 h-7 text-teal-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{course.courseTitle}</h3>
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600 font-medium">Haladás</span>
                              <span className="font-bold text-gray-900">{isNaN(course.progressPercentage) ? 0 : Math.round(course.progressPercentage)}%</span>
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
                            className="gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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
            /* Masterclass Featured Offer Card when not enrolled */
            <Card className="overflow-hidden bg-white/70 backdrop-blur-xl border border-white/60 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500">
              <div className="bg-gradient-to-br from-slate-900 via-teal-800 to-teal-700 p-8 text-white relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-4 py-2 text-sm font-medium bg-yellow-400/20 border border-yellow-400/30 rounded-full shadow-sm">
                      🎯 CSAK 10 HELY ELÉRHETŐ
                    </span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">49.990 Ft</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-3 leading-tight">
                    Online vevőpszichológia masterclass
                  </h2>
                  <p className="text-white/90 text-lg mb-4 leading-relaxed">
                    Megérted, mit akar valójában a vevőd, és ezzel többet adsz el (akár drágábban is) anélkül, hogy bármit újat kellene fejlesztened.
                  </p>
                  <div className="bg-red-500/20 backdrop-blur-sm rounded-2xl p-4 border border-red-400/50">
                    <p className="text-red-200 font-bold text-center">⚠️ November más kurzus lesz (nem ez)</p>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-teal-600" />
                    </div>
                    <div className="text-lg font-semibold text-gray-900">4 webinár</div>
                    <div className="text-sm text-gray-600">Október 6-21</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-lg font-semibold text-gray-900">5×1 óra 1:1 meeting</div>
                    <div className="text-sm text-gray-600">Személyes mentorálás</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Award className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div className="text-lg font-semibold text-gray-900">Tripla garancia</div>
                    <div className="text-sm text-gray-600">100% pénz vissza</div>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Végre megérted, mit akar a vevőd - 10 perc alatt készítesz buyer personát, ami pontosan célba talál</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Mindig egy lépéssel előrébb leszel a versenytársaidnál - AI-val automatizálod az elemzést</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Az üzeneteid végre hatnak - és eladnak. Pszichológiai triggerekkel írsz, amikre nem tudnak nemet mondani</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Órák helyett percek alatt készülnek a kampányaid - email, social media, Facebook hirdetés - mind automatizálva</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 mb-8">
                  <h4 className="text-lg font-semibold text-teal-900 mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-teal-600" />
                    3x több érdeklődő 30 nap alatt
                  </h4>
                  <p className="text-teal-800 leading-relaxed">
                    Nem csak egy kurzust kapsz - egy teljes rendszert, ami garantáltan 3x több érdeklődőt hoz 30 nap alatt, 
                    <span className="font-semibold"> 2 exkluzív csomag + 3 értékes bónusz</span> kíséretében.
                  </p>
                </div>
                
                <div className="bg-white backdrop-blur-md rounded-2xl p-8 border border-white shadow-2xl">
                  <PurchaseButton
                    courseId="ai-copywriting-course"
                    className="transform hover:scale-105 transition-transform duration-300 w-full"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              className="p-8 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500 cursor-pointer group"
              onClick={() => router.push('/dashboard/learning')}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-7 h-7 text-teal-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-teal-700 transition-colors duration-300">Tanulási központ</h3>
                  <p className="text-gray-600 leading-relaxed">Masterclass programok, haladás és eredmények</p>
                </div>
              </div>
              <div className="flex items-center text-teal-600 group-hover:text-teal-700 transition-colors duration-300">
                <span className="text-sm font-medium">Megnyitás</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Card>

            <Card 
              className="p-8 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500 cursor-pointer group"
              onClick={() => router.push('/dashboard/payments')}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-7 h-7 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-orange-700 transition-colors duration-300">Fizetési előzmények</h3>
                  <p className="text-gray-600 leading-relaxed">Számlák, tranzakciók és vásárlások</p>
                </div>
              </div>
              <div className="flex items-center text-orange-600 group-hover:text-orange-700 transition-colors duration-300">
                <span className="text-sm font-medium">Megnyitás</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}