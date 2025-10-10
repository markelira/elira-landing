'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useUserProgress } from '@/hooks/useUserProgress'
import { Button } from '@/components/ui/button'
import { featuredMasterclass } from '@/components/FeaturedMasterclassSpotlight'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { DashboardRoleRedirect } from '@/components/RoleBasedRedirect'
import PurchaseButton from '@/components/course/PurchaseButton'
import Image from 'next/image'
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

// Phase 2: Dashboard enhancement components
import { TemplateLibrary } from '@/components/dashboard/TemplateLibrary'
import { CourseQuickAccess } from '@/components/dashboard/CourseQuickAccess'
// Phase 3: Premium features
import { LearningPathVisualizer } from '@/components/dashboard/LearningPathVisualizer'

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const { data: progressData, isLoading } = useUserProgress()
  const router = useRouter()

  // Redirect to auth if not logged in
  React.useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  const isPageLoading = authLoading || isLoading

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }


  if (isPageLoading) {
    return (
      <>
        <DashboardRoleRedirect />
        <div className="min-h-screen bg-white">
          <div className="px-6 py-8">
            <div className="max-w-6xl mx-auto animate-pulse space-y-8">
              <div className="border-b border-gray-200 pb-6">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-28 bg-gray-200 rounded-xl"></div>
                <div className="h-28 bg-gray-200 rounded-xl"></div>
                <div className="h-28 bg-gray-200 rounded-xl"></div>
              </div>
              <div className="h-64 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </>
    )
  }

  // Check if user has any enrollments
  const hasEnrollments = progressData?.enrolledCourses && progressData.enrolledCourses.length > 0;

  return (
    <div className="min-h-screen bg-white">
      <DashboardRoleRedirect />
      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Welcome Header */}
          <div className="border-b border-gray-200 pb-6">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Üdvözöljük, {user?.firstName || user?.email?.split('@')[0]}
            </h1>
            <p className="text-base text-gray-600">
              {hasEnrollments
                ? 'Itt követheti nyomon a tanulási előrehaladását és hozzáférhet a masterclass anyagokhoz'
                : 'Fedezze fel szakértői masterclass programjainkat és kezdje el tanulási útját'
              }
            </p>
          </div>

          {/* Stats Cards - Only show for enrolled users */}
          {hasEnrollments && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Masterclass beiratkozások</p>
                    <p className="text-3xl font-semibold text-gray-900">
                      {progressData?.totalCourses || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Befejezett programok</p>
                    <p className="text-3xl font-semibold text-gray-900">
                      {progressData?.completedCourses || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Tanulási idő</p>
                    <p className="text-3xl font-semibold text-gray-900">
                      {formatTime(progressData?.totalLearningTime || 0)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-gray-700" />
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Phase 2 & 3: Engagement Features - Only show for enrolled users */}
          {hasEnrollments && (
            <>
              {/* Course Quick Access - Full Width */}
              <CourseQuickAccess />

              {/* Template Library - Full Width */}
              <TemplateLibrary />
            </>
          )}

          {/* Continue Learning Section */}
          {hasEnrollments ? (
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Folyamatban lévő programok
                </h2>
                <Button
                  onClick={() => router.push('/dashboard/learning')}
                  variant="outline"
                  size="sm"
                  className="gap-2 text-gray-700 hover:text-gray-900 rounded-lg"
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
                    <div key={course.courseId} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 mb-3">{course.courseTitle}</h3>
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                              <span className="text-gray-600">Haladás</span>
                              <span className="font-semibold text-gray-900">{isNaN(course.progressPercentage) ? 0 : Math.round(course.progressPercentage)}%</span>
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
                            className="gap-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg"
                          >
                            <Play className="w-4 h-4" />
                            Tanulás folytatása
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            /* Masterclass Featured Offer Card when not enrolled */
            <>
              {/* Professional capacity notice */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Kiemelt Masterclass
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      A személyre szabott rendszer és egyéni támogatás biztosítása érdekében
                      az októberi beiratkozás maximum 15 főre limitált.
                    </p>
                  </div>
                  <div className="flex-shrink-0 px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Kapacitás</p>
                    <p className="text-base font-semibold text-gray-900">Max. 15 fő</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Image Side */}
                <div className="relative h-64 lg:h-auto min-h-[400px]">
                  <Image
                    src={featuredMasterclass.thumbnailUrl}
                    alt={featuredMasterclass.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content Side */}
                <div className="p-8 flex flex-col">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-gray-600">
                        {featuredMasterclass.subtitle}
                      </span>
                      <span className="text-2xl font-semibold text-gray-900">{featuredMasterclass.price.toLocaleString('hu-HU')} Ft</span>
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                      {featuredMasterclass.title}
                    </h2>

                    <div className="flex items-center gap-6 mb-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{featuredMasterclass.duration} nap</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{featuredMasterclass.modulesCount} modul · {featuredMasterclass.lessonsCount} videó</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        <span>Heti konzultáció</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {featuredMasterclass.outcomes.slice(0, 3).map((outcome, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <PurchaseButton
                    courseId={featuredMasterclass.id}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            </>
          )}

          {/* Learning Path Visualizer - Only show for non-enrolled users */}
          {!hasEnrollments && <LearningPathVisualizer />}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => router.push('/dashboard/learning')}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-gray-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">Tanulási központ</h3>
                  <p className="text-sm text-gray-600">Masterclass programok, haladás és eredmények</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>
            </button>

            <button
              onClick={() => router.push('/dashboard/payments')}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-gray-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">Fizetési előzmények</h3>
                  <p className="text-sm text-gray-600">Számlák, tranzakciók és vásárlások</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}