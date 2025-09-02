'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useUserProgress } from '@/hooks/useUserProgress'
import { ProgressBar, CircularProgress } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Calendar,
  Play,
  CheckCircle,
  ArrowRight,
  Trophy,
  Target,
  Zap
} from 'lucide-react'

export default function MyLearningClient() {
  const router = useRouter()
  const { user } = useAuth()
  const { data: progressData, isLoading } = useUserProgress()
  const [activeTab, setActiveTab] = useState<'courses' | 'completed' | 'certificates'>('courses')

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user && !isLoading) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
            <div className="h-32 bg-gray-300 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-48 bg-gray-300 rounded"></div>
              <div className="h-48 bg-gray-300 rounded"></div>
              <div className="h-48 bg-gray-300 rounded"></div>
            </div>
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

  const getMotivationalMessage = (progress: number) => {
    if (progress === 0) return "Kezdd el a tanulási utadat!"
    if (progress < 25) return "Remek kezdés! Így tovább!"
    if (progress < 50) return "Félúton vagy! Ne add fel!"
    if (progress < 75) return "Közel a cél! Hajrá!"
    if (progress < 100) return "Majdnem kész! Utolsó erőfeszítés!"
    return "Gratulálunk! Befejezted a kurzust!"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tanulási Központ</h1>
              <p className="text-gray-600 mt-1">Üdv újra, {user?.firstName || user?.email?.split('@')[0]}!</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                onClick={() => router.push('/courses')}
                variant="primary"
                className="gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Új kurzusok böngészése
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Beiratkozott kurzusok</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {progressData?.totalCourses || 0}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Befejezett kurzusok</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {progressData?.completedCourses || 0}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tanulási idő</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatTime(progressData?.totalLearningTime || 0)}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tanúsítványok</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {progressData?.certificates?.length || 0}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Learning Streak / Motivation */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Zap className="w-6 h-6" />
                Tanulási sorozat
              </h3>
              <p className="mt-2 opacity-90">
                {getMotivationalMessage(progressData?.overallProgress || 0)}
              </p>
            </div>
            <div>
              <CircularProgress
                value={progressData?.overallProgress || 0}
                size="lg"
                color="green"
                className="bg-white/20 rounded-full p-2"
              />
            </div>
          </div>
        </Card>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm p-1 mb-6">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'courses'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Folyamatban ({progressData?.inProgressCourses || 0})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'completed'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Befejezett ({progressData?.completedCourses || 0})
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'certificates'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Tanúsítványok ({progressData?.certificates?.length || 0})
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
                  <Card key={course.courseId} className="overflow-hidden bg-white hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-600 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-white/50" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {course.courseTitle}
                      </h3>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Haladás</span>
                          <span className="font-medium">{isNaN(course.progressPercentage) ? 0 : Math.round(course.progressPercentage)}%</span>
                        </div>
                        <ProgressBar 
                          value={isNaN(course.progressPercentage) ? 0 : course.progressPercentage}
                          color="blue"
                          height="sm"
                          animated
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {course.completedLessons}/{course.totalLessons} lecke befejezve
                        </p>
                      </div>

                      {course.lastActivityAt && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Utoljára: {new Date(course.lastActivityAt).toLocaleDateString('hu-HU')}
                          </span>
                        </div>
                      )}

                      <Button
                        onClick={() => {
                          if (course.nextLessonId) {
                            router.push(`/courses/${course.courseId}/lessons/${course.nextLessonId}`)
                          } else {
                            router.push(`/courses/${course.courseId}`)
                          }
                        }}
                        variant="primary"
                        className="w-full gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Tanulás folytatása
                      </Button>
                    </div>
                  </Card>
                ))}

              {(!progressData?.enrolledCourses || progressData.enrolledCourses.filter(c => !c.isCompleted).length === 0) && (
                <div className="col-span-full text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Nincs folyamatban lévő kurzusod
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Fedezd fel a kurzusainkat és kezdj el tanulni még ma!
                  </p>
                  <Button
                    onClick={() => router.push('/courses')}
                    variant="primary"
                  >
                    Kurzusok böngészése
                  </Button>
                </div>
              )}
            </>
          )}

          {activeTab === 'completed' && (
            <>
              {progressData?.enrolledCourses
                ?.filter(course => course.isCompleted)
                .map((course) => (
                  <Card key={course.courseId} className="overflow-hidden bg-white">
                    <div className="aspect-video bg-gradient-to-br from-green-400 to-emerald-600 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Trophy className="w-12 h-12 text-white" />
                      </div>
                      <Badge className="absolute top-4 right-4 bg-white text-green-600">
                        Befejezve
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg text-gray-900 mb-4">
                        {course.courseTitle}
                      </h3>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Összes lecke</span>
                          <span className="font-medium">{course.totalLessons}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Befejezve</span>
                          <span className="text-green-600 font-medium flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            100%
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => router.push(`/courses/${course.courseId}`)}
                          variant="outline"
                          className="flex-1"
                        >
                          Újranézés
                        </Button>
                        <Button
                          onClick={() => router.push(`/certificates/${course.courseId}`)}
                          variant="primary"
                          className="flex-1"
                        >
                          Tanúsítvány
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}

              {(!progressData?.enrolledCourses || progressData.enrolledCourses.filter(c => c.isCompleted).length === 0) && (
                <div className="col-span-full text-center py-12">
                  <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Még nincs befejezett kurzusod
                  </h3>
                  <p className="text-gray-600">
                    Folytasd a megkezdett kurzusaidat a tanúsítvány megszerzéséhez!
                  </p>
                </div>
              )}
            </>
          )}

          {activeTab === 'certificates' && (
            <>
              {progressData?.certificates?.map((cert: any) => (
                <Card key={cert.id} className="overflow-hidden bg-white">
                  <div className="aspect-video bg-gradient-to-br from-yellow-400 to-orange-500 relative p-6 flex items-center justify-center">
                    <Award className="w-24 h-24 text-white" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {cert.courseName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Kiállítva: {new Date(cert.issuedAt).toLocaleDateString('hu-HU')}
                    </p>
                    <Button
                      onClick={() => router.push(`/certificates/${cert.id}`)}
                      variant="primary"
                      className="w-full"
                    >
                      Tanúsítvány megtekintése
                    </Button>
                  </div>
                </Card>
              ))}

              {(!progressData?.certificates || progressData.certificates.length === 0) && (
                <div className="col-span-full text-center py-12">
                  <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Még nincs tanúsítványod
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Fejezz be egy kurzust a tanúsítvány megszerzéséhez!
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Learning Goals Section */}
        <Card className="mt-8 p-6 bg-white">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Tanulási célok
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900">Heti cél</span>
                <Badge variant="outline" className="bg-blue-100 text-blue-700">
                  3/5 nap
                </Badge>
              </div>
              <ProgressBar value={60} color="blue" height="sm" />
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-900">Havi leckék</span>
                <Badge variant="outline" className="bg-green-100 text-green-700">
                  12/20
                </Badge>
              </div>
              <ProgressBar value={60} color="green" height="sm" />
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-purple-900">Szint</span>
                <Badge variant="outline" className="bg-purple-100 text-purple-700">
                  Haladó
                </Badge>
              </div>
              <ProgressBar value={75} color="yellow" height="sm" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}