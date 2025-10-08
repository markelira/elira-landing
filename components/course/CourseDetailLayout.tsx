"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CourseHero } from './CourseHero'
import { CurriculumTab } from './CurriculumTab'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { 
  Clock, 
  BookOpen, 
  Award, 
  Users, 
  Shield, 
  Download,
  CheckCircle,
  TrendingUp 
} from 'lucide-react'
import PurchaseButton from './PurchaseButton'
import { useAuth } from '@/contexts/AuthContext'

interface CourseDetailLayoutProps {
  courseData: any
  courseId: string
  courseProgress?: any
}

export function CourseDetailLayout({ courseData, courseId, courseProgress }: CourseDetailLayoutProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum'>('overview')
  const router = useRouter()
  const { user } = useAuth()
  
  // For MVP, assume enrolled if authenticated
  const isEnrolled = !!user

  const handleStartLearning = () => {
    const firstLesson = courseData.modules[0]?.lessons[0]
    if (firstLesson) {
      router.push(`/courses/${courseId}/lessons/${firstLesson.id}`)
    }
  }

  // Calculate course stats
  const totalLessons = courseData.modules.reduce((sum: number, module: any) => {
    return sum + (Array.isArray(module.lessons) ? module.lessons.length : 0)
  }, 0)

  const totalDuration = courseData.modules.reduce((sum: number, module: any) => {
    const moduleLessons = Array.isArray(module.lessons) ? module.lessons : []
    return sum + moduleLessons.reduce((lessonSum: number, lesson: any) => {
      return lessonSum + (lesson.duration || 600)
    }, 0)
  }, 0)

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    return hours > 0 ? `${hours} óra` : `${Math.floor(seconds / 60)} perc`
  }

  const learningOutcomes = [
    "AI eszközök hatékony használata copywritinghoz",
    "ChatGPT prompt engineering technikák",
    "Konverziót növelő szövegtípusok",
    "Gyakorlati példák és esettanulmányok"
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <CourseHero
        courseData={courseData}
        courseId={courseId}
        onStartLearning={handleStartLearning}
      />

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm p-1">
              <div className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'overview'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Áttekintés
                </button>
                <button
                  onClick={() => setActiveTab('curriculum')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'curriculum'
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  Tananyag
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* What You'll Learn */}
                <section className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Mit fogsz tanulni?</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {learningOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Course Description */}
                <section className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Kurzus leírása</h2>
                  <div className="prose max-w-none text-gray-700">
                    <p className="leading-relaxed mb-4">
                      {courseData.description}
                    </p>
                    <p className="leading-relaxed">
                      Ez a gyakorlatorientált kurzus mindent megtanít, amit tudnod kell a modern 
                      copywriting világában. Az AI eszközök használatától kezdve a gyakorlati 
                      implementációig, minden lépést részletesen megismerhetsz.
                    </p>
                  </div>
                </section>

                {/* Instructor Info */}
                <section className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Az oktatóról</h2>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {courseData.instructor.firstName[0]}{courseData.instructor.lastName[0]}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">
                        {courseData.instructor.firstName} {courseData.instructor.lastName}
                      </div>
                      <div className="text-gray-600 mb-3">{courseData.instructor.title}</div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Tapasztalt digital marketing szakértő, aki több mint 5 éve segíti a 
                        vállalkozásokat online jelenlétük növelésében. Specializációja az AI-alapú 
                        copywriting és a konverziós szövegírás.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <CurriculumTab courseData={courseData} courseId={courseId} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  7,990 Ft
                </div>
                <p className="text-gray-600">Egyszeri fizetés</p>
              </div>

              {isEnrolled ? (
                <>
                  {/* Progress Display */}
                  {courseProgress && courseProgress.progressPercentage > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Haladás</span>
                        <span className="text-sm font-medium text-gray-900">
                          {Math.round(courseProgress.progressPercentage)}%
                        </span>
                      </div>
                      <ProgressBar 
                        value={courseProgress.progressPercentage}
                        color="blue"
                        height="md"
                        animated
                      />
                      <p className="text-xs text-gray-600 mt-1">
                        {courseProgress.completedLessons} / {courseProgress.totalLessons} lecke befejezve
                      </p>
                    </div>
                  )}
                  
                  <Button 
                    className="w-full mb-6"
                    size="lg"
                    onClick={() => {
                      if (courseProgress?.nextLesson) {
                        router.push(`/courses/${courseId}/lessons/${courseProgress.nextLesson.id}`)
                      } else {
                        handleStartLearning()
                      }
                    }}
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    {courseProgress?.nextLesson ? 'Tanulás folytatása' : 'Tanulás kezdése'}
                  </Button>
                  
                  {courseProgress?.isCompleted && (
                    <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">Kurzus befejezve!</span>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <PurchaseButton 
                  className="mb-6 w-full"
                  onPurchaseStart={() => console.log('Purchase started')}
                  onPurchaseSuccess={() => console.log('Purchase successful')}
                  onPurchaseError={(error) => console.error('Purchase error:', error)}
                />
              )}

              {/* Course Features */}
              <div className="space-y-4 text-sm border-t pt-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span>{formatDuration(totalDuration)} videó tartalom</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-gray-600" />
                  <span>{courseData.modules.length} modul, {totalLessons} lecke</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-gray-600" />
                  <span>Letölthető anyagok</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-gray-600" />
                  <span>Tanúsítvány a befejezés után</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-600" />
                  <span>Élethosszig elérhető</span>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span>Közösségi hozzáférés</span>
                </div>
              </div>
            </div>

            {/* Money Back Guarantee */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">30 napos garancia</h3>
                  <p className="text-sm text-green-800">
                    Ha nem vagy elégedett a kurzussal, 30 napon belül teljes összegű visszatérítést kapsz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}