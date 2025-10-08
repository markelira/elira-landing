'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useUserProgress } from '@/hooks/useUserProgress'
import { ProgressBar, CircularProgress } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/Card'
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
  const [activeTab, setActiveTab] = useState<'courses' | 'completed'>('courses')

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user && !isLoading) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50/90 via-white to-gray-50/70 relative overflow-hidden">
        {/* Liquid Glass Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-teal-100/20 to-cyan-100/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-orange-100/20 to-amber-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="relative z-10 px-4 md:px-6 py-6 md:py-8">
          <div className="max-w-6xl mx-auto animate-pulse space-y-6">
            <div className="h-8 bg-white/40 rounded-2xl w-1/4"></div>
            <div className="h-32 bg-white/40 rounded-3xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-48 bg-white/40 rounded-3xl"></div>
              <div className="h-48 bg-white/40 rounded-3xl"></div>
              <div className="h-48 bg-white/40 rounded-3xl"></div>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50/90 via-white to-gray-50/70 relative overflow-hidden">
      {/* Liquid Glass Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-teal-100/20 to-cyan-100/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-orange-100/20 to-amber-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Header */}
      <div className="relative z-10 bg-white/40 backdrop-blur-xl border-b border-white/30">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-white/40 px-5 py-3 rounded-full shadow-lg shadow-gray-100/50 mb-4 hover:shadow-xl hover:bg-white/70 transition-all duration-300">
                <BookOpen className="w-5 h-5 text-teal-600" />
                <span className="font-medium text-gray-900 tracking-tight">Tanulási Központ</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 tracking-tight leading-tight">
                Üdv újra, {user?.firstName || user?.email?.split('@')[0]}!
              </h1>
              <p className="text-lg text-gray-600">Kövesd nyomon a masterclass programjaid haladását</p>
            </div>
            <div className="mt-6 md:mt-0">
              <Button
                onClick={() => router.push('/courses')}
                variant="primary"
                className="gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <BookOpen className="w-4 h-4" />
                Új programok felfedezése
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="p-8 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-2">Masterclass beiratkozások</p>
                <p className="text-4xl font-bold text-gray-900 tracking-tight">
                  {progressData?.totalCourses || 0}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-8 h-8 text-teal-600" />
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white/70 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-2">Befejezett programok</p>
                <p className="text-4xl font-bold text-gray-900 tracking-tight">
                  {progressData?.completedCourses || 0}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Learning Progress / Motivation */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-teal-600 via-cyan-600 to-teal-700 text-white rounded-3xl border border-white/20 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float" />
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg animate-pulse" />
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold flex items-center gap-3 mb-3 tracking-tight">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                Masterclass Haladás
              </h3>
              <p className="text-white/90 text-lg leading-relaxed">
                {getMotivationalMessage(progressData?.overallProgress || 0)}
              </p>
            </div>
            <div className="ml-6">
              <CircularProgress
                value={progressData?.overallProgress || 0}
                size="lg"
                color="green"
                className="bg-white/20 rounded-full p-3 shadow-lg"
              />
            </div>
          </div>
        </Card>

        {/* Tab Navigation */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl shadow-gray-200/50 p-2 mb-8">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex-1 py-3 px-6 rounded-2xl font-medium transition-all duration-300 ${
                activeTab === 'courses'
                  ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              Folyamatban ({progressData?.inProgressCourses || 0})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 py-3 px-6 rounded-2xl font-medium transition-all duration-300 ${
                activeTab === 'completed'
                  ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
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
                  <Card key={course.courseId} className="overflow-hidden bg-white/70 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500 group">
                    <div className="aspect-video bg-gradient-to-br from-teal-500 to-cyan-600 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                          <BookOpen className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-white text-sm font-medium">Masterclass</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight group-hover:text-teal-700 transition-colors duration-300">
                        {course.courseTitle}
                      </h3>
                      
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600 font-medium">Haladás</span>
                          <span className="font-bold text-gray-900">{isNaN(course.progressPercentage) ? 0 : Math.round(course.progressPercentage)}%</span>
                        </div>
                        <ProgressBar 
                          value={isNaN(course.progressPercentage) ? 0 : course.progressPercentage}
                          color="blue"
                          height="sm"
                          animated
                        />
                        <p className="text-sm text-gray-600 mt-2">
                          {course.completedLessons}/{course.totalLessons} modul befejezve
                        </p>
                      </div>

                      {course.lastActivityAt && (
                        <div className="flex items-center gap-3 text-sm text-gray-600 mb-6 bg-gray-50/50 rounded-xl p-3">
                          <Calendar className="w-4 h-4 text-teal-600" />
                          <span className="font-medium">
                            Utoljára: {new Date(course.lastActivityAt).toLocaleDateString('hu-HU')}
                          </span>
                        </div>
                      )}

                      <Button
                        onClick={() => {
                          router.push(`/courses/${course.courseId}/learn`)
                        }}
                        variant="primary"
                        className="w-full gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <Play className="w-4 h-4" />
                        Tanulás folytatása
                      </Button>
                    </div>
                  </Card>
                ))}

              {(!progressData?.enrolledCourses || progressData.enrolledCourses.filter(c => !c.isCompleted).length === 0) && (
                <div className="col-span-full text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <BookOpen className="w-10 h-10 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                    Nincs folyamatban lévő programod
                  </h3>
                  <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                    Fedezd fel a masterclass programjainkat és kezdj el tanulni még ma!
                  </p>
                  <Button
                    onClick={() => router.push('/courses')}
                    variant="primary"
                    className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Programok felfedezése
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
                  <Card key={course.courseId} className="overflow-hidden bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm">
                    <div className="aspect-video bg-gradient-to-br from-emerald-500 to-emerald-600 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Trophy className="w-12 h-12 text-white" />
                      </div>
                      <Badge className="absolute top-4 right-4 bg-white/90 text-emerald-700 font-light">
                        Befejezve
                      </Badge>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif font-medium text-lg text-slate-900 mb-4">
                        {course.courseTitle}
                      </h3>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600 font-light">Összes lecke</span>
                          <span className="font-medium text-slate-800">{course.totalLessons}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600 font-light">Befejezve</span>
                          <span className="text-emerald-700 font-medium flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            100%
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={() => router.push(`/courses/${course.courseId}`)}
                        variant="primary"
                        className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Program újranézése
                      </Button>
                    </div>
                  </Card>
                ))}

              {(!progressData?.enrolledCourses || progressData.enrolledCourses.filter(c => c.isCompleted).length === 0) && (
                <div className="col-span-full text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Trophy className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                    Még nincs befejezett programod
                  </h3>
                  <p className="text-lg text-gray-600 max-w-md mx-auto">
                    Folytasd a megkezdett masterclass programjaidat!
                  </p>
                </div>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  )
}