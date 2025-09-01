'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCourse } from '@/hooks/useCourseQueries'
import { CheckCircle, BookOpen, Users, Award, ArrowRight } from 'lucide-react'
import confetti from 'canvas-confetti'

interface Props {
  courseId: string
}

export default function EnrolledClient({ courseId }: Props) {
  const router = useRouter()
  const { data: course, isLoading } = useCourse(courseId)
  
  // Trigger confetti animation on mount
  useEffect(() => {
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }
    
    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }
    
    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now()
      
      if (timeLeft <= 0) {
        return clearInterval(interval)
      }
      
      const particleCount = 50 * (timeLeft / duration)
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      })
    }, 250)
    
    return () => clearInterval(interval)
  }, [])
  
  if (isLoading || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    )
  }
  
  const handleStartLearning = () => {
    // Navigate to course player
    router.push(`/courses/${courseId}/learn`)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-teal-50">
      {/* Success Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-cyan-600 opacity-10"></div>
        <div className="relative container max-w-4xl mx-auto px-4 py-16 text-center">
          {/* Success Icon */}
          <div className="mb-8 inline-flex">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
                <CheckCircle className="w-20 h-20 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-2xl">🎉</span>
              </div>
            </div>
          </div>
          
          {/* Success Message */}
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Gratulálunk! 🎊
          </h1>
          <p className="text-xl text-gray-700 mb-2">
            Sikeresen beiratkoztál a kurzusra:
          </p>
          <p className="text-2xl font-semibold text-teal-700 mb-8">
            {course.title}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={handleStartLearning}
              className="px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Tanulás megkezdése
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => router.push('/dashboard')}
              className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all border border-gray-300 shadow-lg"
            >
              Irányítópult megtekintése
            </button>
          </div>
        </div>
      </div>
      
      {/* What's Next Section */}
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Mi következik?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">1. Kezdd el a tanulást</h3>
              <p className="text-sm text-gray-600">
                Férj hozzá az összes kurzus tartalomhoz és kezdd el az első leckét
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">2. Csatlakozz a közösséghez</h3>
              <p className="text-sm text-gray-600">
                Kapcsolódj más tanulókkal és oszd meg tapasztalataidat
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">3. Szerezz tanúsítványt</h3>
              <p className="text-sm text-gray-600">
                Teljesítsd a kurzust és szerezz hivatalos tanúsítványt
              </p>
            </div>
          </div>
        </div>
        
        {/* Course Info Card */}
        <div className="mt-8 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-xl p-8 text-white">
          <h3 className="text-xl font-bold mb-4">A kurzusod részletei:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-teal-100 text-sm">Modulok</p>
              <p className="text-2xl font-bold">{course.stats?.modules || 0}</p>
            </div>
            <div>
              <p className="text-teal-100 text-sm">Leckék</p>
              <p className="text-2xl font-bold">{course.stats?.lessons || 0}</p>
            </div>
            <div>
              <p className="text-teal-100 text-sm">Időtartam</p>
              <p className="text-2xl font-bold">{course.stats?.duration || 'N/A'}</p>
            </div>
            <div>
              <p className="text-teal-100 text-sm">Hozzáférés</p>
              <p className="text-2xl font-bold">Örökre</p>
            </div>
          </div>
        </div>
        
        {/* Tips */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="font-semibold text-yellow-900 mb-2">💡 Tipp a sikeres tanuláshoz:</h3>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Állíts be napi tanulási célokat</li>
            <li>• Készíts jegyzeteket a leckék során</li>
            <li>• Gyakorolj a tanult technikákkal</li>
            <li>• Kérdezz bátran a közösségben</li>
          </ul>
        </div>
      </div>
    </div>
  )
}