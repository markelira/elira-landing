'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useUserProgress } from '@/hooks/useUserProgress'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/Card'
import {
  BookOpen,
  Clock,
  Calendar,
  Play,
  CheckCircle,
  ArrowRight,
  Trophy
} from 'lucide-react'

export default function MyLearningClient() {
  const router = useRouter()
  const { user } = useAuth()
  const { data: progressData, isLoading } = useUserProgress()
  const [activeTab, setActiveTab] = useState<'courses' | 'completed'>('courses')

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user && !isLoading) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
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
    )
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Header */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                  Tanulási központ
                </h1>
                <p className="text-base text-gray-600">
                  Kövesd nyomon a masterclass programjaid haladását
                </p>
              </div>
              <Button
                onClick={() => router.push('/courses')}
                variant="outline"
                size="sm"
                className="gap-2 text-gray-700 hover:text-gray-900 rounded-lg"
              >
                <BookOpen className="w-4 h-4" />
                Új programok
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Beiratkozások</p>
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
                  <p className="text-sm text-gray-600 mb-2">Befejezett</p>
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

          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('courses')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'courses'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                Folyamatban ({progressData?.enrolledCourses?.filter(c => !c.isCompleted).length || 0})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'completed'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                Befejezett ({progressData?.completedCourses || 0})
              </button>
            </div>
          </div>

          {/* Content based on active tab */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 'courses' && (
              <>
                {progressData?.enrolledCourses
                  ?.filter(course => !course.isCompleted)
                  .map((course) => (
                    <Card key={course.courseId} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      {/* Thumbnail */}
                      <div className="aspect-video bg-gray-100 relative">
                        <Image
                          src="/u9627734718_Medium_shot_of_a_confident_business_professional__53d1a818-cc67-4292-a15b-e0247195f505_0 (1).png"
                          alt={course.courseTitle}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {course.courseTitle}
                        </h3>

                        {/* Progress */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Haladás</span>
                            <span className="font-semibold text-gray-900">
                              {isNaN(course.progressPercentage) ? 0 : Math.round(course.progressPercentage)}%
                            </span>
                          </div>
                          <ProgressBar
                            value={isNaN(course.progressPercentage) ? 0 : course.progressPercentage}
                            color="blue"
                            height="sm"
                          />
                          <p className="text-sm text-gray-600 mt-2">
                            {course.completedLessons}/{course.totalLessons} modul befejezve
                          </p>
                        </div>

                        {/* Last activity */}
                        {course.lastActivityAt && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                            <Calendar className="w-4 h-4" />
                            <span>
                              Utoljára: {new Date(course.lastActivityAt).toLocaleDateString('hu-HU')}
                            </span>
                          </div>
                        )}

                        {/* Action button */}
                        <Button
                          onClick={() => {
                            router.push(`/courses/${course.courseId}/learn`)
                          }}
                          size="sm"
                          className="w-full gap-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg"
                        >
                          <Play className="w-4 h-4" />
                          Tanulás folytatása
                        </Button>
                      </div>
                    </Card>
                  ))}

                {(!progressData?.enrolledCourses || progressData.enrolledCourses.filter(c => !c.isCompleted).length === 0) && (
                  <div className="col-span-full">
                    <div className="bg-white border border-gray-200 rounded-xl p-16 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="w-8 h-8 text-gray-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Nincs folyamatban lévő program
                      </h3>
                      <p className="text-base text-gray-600 mb-6 max-w-md mx-auto">
                        Fedezd fel a masterclass programjainkat és kezdj el tanulni még ma
                      </p>
                      <Button
                        onClick={() => router.push('/courses')}
                        className="gap-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg"
                      >
                        Programok felfedezése
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}

            {activeTab === 'completed' && (
              <>
                {progressData?.enrolledCourses
                  ?.filter(course => course.isCompleted)
                  .map((course) => (
                    <Card key={course.courseId} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      {/* Thumbnail */}
                      <div className="aspect-video bg-gray-100 relative">
                        <Image
                          src="/u9627734718_Medium_shot_of_a_confident_business_professional__53d1a818-cc67-4292-a15b-e0247195f505_0 (1).png"
                          alt={course.courseTitle}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 border border-gray-200 shadow-sm">
                          <span className="text-xs font-medium text-gray-900">Befejezve</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {course.courseTitle}
                        </h3>

                        {/* Stats */}
                        <div className="space-y-3 mb-4 pb-4 border-b border-gray-100">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Összes modul</span>
                            <span className="font-medium text-gray-900">{course.totalLessons}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Befejezve</span>
                            <span className="text-gray-900 font-medium flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              100%
                            </span>
                          </div>
                        </div>

                        {/* Action button */}
                        <Button
                          onClick={() => router.push(`/courses/${course.courseId}`)}
                          variant="outline"
                          size="sm"
                          className="w-full text-gray-700 hover:text-gray-900 rounded-lg"
                        >
                          Program újranézése
                        </Button>
                      </div>
                    </Card>
                  ))}

                {(!progressData?.enrolledCourses || progressData.enrolledCourses.filter(c => c.isCompleted).length === 0) && (
                  <div className="col-span-full">
                    <div className="bg-white border border-gray-200 rounded-xl p-16 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                        <Trophy className="w-8 h-8 text-gray-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Még nincs befejezett program
                      </h3>
                      <p className="text-base text-gray-600 max-w-md mx-auto">
                        Folytasd a megkezdett masterclass programjaidat
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
