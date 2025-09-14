'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useUserProgress } from '@/hooks/useUserProgress'
import { ProgressBar, CircularProgress } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
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
  const [activeTab, setActiveTab] = useState<'courses' | 'completed' | 'certificates'>('courses')

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user && !isLoading) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen py-8" style={{ backgroundColor: '#F8F7F5' }}>
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-300 rounded w-1/4"></div>
            <div className="h-32 bg-slate-300 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-48 bg-slate-300 rounded"></div>
              <div className="h-48 bg-slate-300 rounded"></div>
              <div className="h-48 bg-slate-300 rounded"></div>
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
    <div className="min-h-screen" style={{ backgroundColor: '#F8F7F5' }}>
      {/* Academic Header */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-slate-200/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mb-4"></div>
              <h1 className="text-2xl font-serif font-medium text-slate-900">Tanulási Központ</h1>
              <p className="text-slate-700 font-light mt-1">Üdv újra, {user?.firstName || user?.email?.split('@')[0]}!</p>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mt-4"></div>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                onClick={() => router.push('/courses')}
                variant="primary"
                className="gap-2 bg-amber-600 hover:bg-amber-700 text-white border-amber-600"
              >
                <BookOpen className="w-4 h-4" />
                Új kurzusok böngészése
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Academic Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-light">Beiratkozott kurzusok</p>
                <p className="text-2xl font-serif font-medium text-slate-900 mt-1">
                  {progressData?.totalCourses || 0}
                </p>
              </div>
              <div className="bg-amber-100/60 p-3 rounded border border-amber-200/50">
                <BookOpen className="w-6 h-6 text-amber-700" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-light">Befejezett kurzusok</p>
                <p className="text-2xl font-serif font-medium text-slate-900 mt-1">
                  {progressData?.completedCourses || 0}
                </p>
              </div>
              <div className="bg-emerald-100/60 p-3 rounded border border-emerald-200/50">
                <CheckCircle className="w-6 h-6 text-emerald-700" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-light">Tanulási idő</p>
                <p className="text-2xl font-serif font-medium text-slate-900 mt-1">
                  {formatTime(progressData?.totalLearningTime || 0)}
                </p>
              </div>
              <div className="bg-violet-100/60 p-3 rounded border border-violet-200/50">
                <Clock className="w-6 h-6 text-violet-700" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-light">Tanúsítványok</p>
                <p className="text-2xl font-serif font-medium text-slate-900 mt-1">
                  {progressData?.certificates?.length || 0}
                </p>
              </div>
              <div className="bg-amber-100/60 p-3 rounded border border-amber-200/50">
                <Award className="w-6 h-6 text-amber-700" />
              </div>
            </div>
          </Card>
        </div>

        {/* Academic Learning Streak / Motivation */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-amber-600 to-amber-700 text-white border border-amber-500/50 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-serif font-medium flex items-center gap-2">
                <Zap className="w-6 h-6" />
                Tanulási sorozat
              </h3>
              <p className="mt-2 opacity-90 font-light">
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

        {/* Academic Tab Navigation */}
        <div className="bg-white/60 backdrop-blur-sm rounded border border-slate-200/50 shadow-sm p-1 mb-6">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex-1 py-2 px-4 rounded text-sm font-light transition-colors ${
                activeTab === 'courses'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              Folyamatban ({progressData?.inProgressCourses || 0})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 py-2 px-4 rounded text-sm font-light transition-colors ${
                activeTab === 'completed'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              Befejezett ({progressData?.completedCourses || 0})
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`flex-1 py-2 px-4 rounded text-sm font-light transition-colors ${
                activeTab === 'certificates'
                  ? 'bg-amber-600 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
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
                  <Card key={course.courseId} className="overflow-hidden bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-amber-400 to-amber-600 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-white/60" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif font-medium text-lg text-slate-900 mb-2">
                        {course.courseTitle}
                      </h3>
                      
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-600 font-light">Haladás</span>
                          <span className="font-medium text-slate-800">{isNaN(course.progressPercentage) ? 0 : Math.round(course.progressPercentage)}%</span>
                        </div>
                        <ProgressBar 
                          value={isNaN(course.progressPercentage) ? 0 : course.progressPercentage}
                          color="blue"
                          height="sm"
                          animated
                        />
                        <p className="text-xs text-slate-600 font-light mt-1">
                          {course.completedLessons}/{course.totalLessons} lecke befejezve
                        </p>
                      </div>

                      {course.lastActivityAt && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                          <Calendar className="w-4 h-4" />
                          <span className="font-light">
                            Utoljára: {new Date(course.lastActivityAt).toLocaleDateString('hu-HU')}
                          </span>
                        </div>
                      )}

                      <Button
                        onClick={() => {
                          router.push(`/courses/${course.courseId}/learn`)
                        }}
                        variant="primary"
                        className="w-full gap-2 bg-amber-600 hover:bg-amber-700 text-white border-amber-600"
                      >
                        <Play className="w-4 h-4" />
                        Tanulás folytatása
                      </Button>
                    </div>
                  </Card>
                ))}

              {(!progressData?.enrolledCourses || progressData.enrolledCourses.filter(c => !c.isCompleted).length === 0) && (
                <div className="col-span-full text-center py-12">
                  <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-serif font-medium text-slate-900 mb-2">
                    Nincs folyamatban lévő kurzusod
                  </h3>
                  <p className="text-slate-600 font-light mb-6">
                    Fedezd fel a kurzusainkat és kezdj el tanulni még ma!
                  </p>
                  <Button
                    onClick={() => router.push('/courses')}
                    variant="primary"
                    className="bg-amber-600 hover:bg-amber-700 text-white border-amber-600"
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

                      <div className="flex gap-2">
                        <Button
                          onClick={() => router.push(`/courses/${course.courseId}`)}
                          variant="outline"
                          className="flex-1 border-slate-300 text-slate-700 hover:border-amber-400 hover:text-amber-700"
                        >
                          Újranézés
                        </Button>
                        <Button
                          onClick={() => router.push(`/certificates/${course.courseId}`)}
                          variant="primary"
                          className="flex-1 bg-amber-600 hover:bg-amber-700 text-white border-amber-600"
                        >
                          Tanúsítvány
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}

              {(!progressData?.enrolledCourses || progressData.enrolledCourses.filter(c => c.isCompleted).length === 0) && (
                <div className="col-span-full text-center py-12">
                  <Trophy className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-serif font-medium text-slate-900 mb-2">
                    Még nincs befejezett kurzusod
                  </h3>
                  <p className="text-slate-600 font-light">
                    Folytasd a megkezdett kurzusaidat a tanúsítvány megszerzéséhez!
                  </p>
                </div>
              )}
            </>
          )}

          {activeTab === 'certificates' && (
            <>
              {progressData?.certificates?.map((cert: any) => (
                <Card key={cert.id} className="overflow-hidden bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm">
                  <div className="aspect-video bg-gradient-to-br from-amber-500 to-amber-600 relative p-6 flex items-center justify-center">
                    <Award className="w-24 h-24 text-white" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif font-medium text-lg text-slate-900 mb-2">
                      {cert.courseName}
                    </h3>
                    <p className="text-sm text-slate-600 font-light mb-4">
                      Kiállítva: {new Date(cert.issuedAt).toLocaleDateString('hu-HU')}
                    </p>
                    <Button
                      onClick={() => router.push(`/certificates/${cert.id}`)}
                      variant="primary"
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white border-amber-600"
                    >
                      Tanúsítvány megtekintése
                    </Button>
                  </div>
                </Card>
              ))}

              {(!progressData?.certificates || progressData.certificates.length === 0) && (
                <div className="col-span-full text-center py-12">
                  <Award className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-serif font-medium text-slate-900 mb-2">
                    Még nincs tanúsítványod
                  </h3>
                  <p className="text-slate-600 font-light mb-6">
                    Fejezz be egy kurzust a tanúsítvány megszerzéséhez!
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Academic Learning Goals Section */}
        <Card className="mt-8 p-6 bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm">
          <h3 className="text-lg font-serif font-medium text-slate-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-700" />
            Tanulási célok
          </h3>
          <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-amber-50/60 rounded border border-amber-200/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-light text-amber-900">Heti cél</span>
                <Badge variant="outline" className="bg-amber-100/60 text-amber-700 border-amber-300/50 font-light">
                  3/5 nap
                </Badge>
              </div>
              <ProgressBar value={60} color="blue" height="sm" />
            </div>
            
            <div className="p-4 bg-emerald-50/60 rounded border border-emerald-200/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-light text-emerald-900">Havi leckék</span>
                <Badge variant="outline" className="bg-emerald-100/60 text-emerald-700 border-emerald-300/50 font-light">
                  12/20
                </Badge>
              </div>
              <ProgressBar value={60} color="green" height="sm" />
            </div>
            
            <div className="p-4 bg-violet-50/60 rounded border border-violet-200/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-light text-violet-900">Szint</span>
                <Badge variant="outline" className="bg-violet-100/60 text-violet-700 border-violet-300/50 font-light">
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