'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useCourse } from '@/hooks/useCourseQueries'
import { auth } from '@/lib/firebase'
import { CreditCard, Lock, CheckCircle, ArrowLeft } from 'lucide-react'

export default function PaymentClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const courseId = searchParams.get('courseId')
  
  const { data: course, isLoading } = useCourse(courseId || '')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('card')
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/login?redirect=' + encodeURIComponent(`/payment?courseId=${courseId}`))
    }
  }, [user, courseId, router, isLoading])
  
  // Handle mock payment
  const handlePayment = async () => {
    if (!user || !courseId || !course) return
    
    setIsProcessing(true)
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create enrollment after "payment"
      const response = await fetch('/api/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await auth.currentUser?.getIdToken()}`
        },
        body: JSON.stringify({ courseId })
      })
      
      if (!response.ok) {
        throw new Error('Failed to create enrollment')
      }
      
      // Redirect to success page
      router.push(`/payment/success?courseId=${courseId}`)
      
    } catch (error) {
      console.error('Payment error:', error)
      alert('Hiba történt a fizetés során. Kérjük próbálja újra.')
    } finally {
      setIsProcessing(false)
    }
  }
  
  if (isLoading || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => router.push(`/courses/${courseId}`)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Vissza a kurzushoz
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Fizetés</h1>
              
              {/* Payment Methods */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Fizetési mód választása</h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'transfer')}
                      className="mr-3"
                    />
                    <CreditCard className="w-5 h-5 mr-3 text-gray-600" />
                    <span className="font-medium">Bankkártya</span>
                  </label>
                  
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="payment"
                      value="transfer"
                      checked={paymentMethod === 'transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'card' | 'transfer')}
                      className="mr-3"
                    />
                    <span className="font-medium">Banki átutalás</span>
                  </label>
                </div>
              </div>
              
              {/* Card Form (Mock) */}
              {paymentMethod === 'card' && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Kártya adatok</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kártyaszám
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        disabled={isProcessing}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Lejárat
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          disabled={isProcessing}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          disabled={isProcessing}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kártyabirtokos neve
                      </label>
                      <input
                        type="text"
                        placeholder="Példa János"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        disabled={isProcessing}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Transfer Info */}
              {paymentMethod === 'transfer' && (
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Átutalási információk</h2>
                  <div className="space-y-2 text-sm">
                    <p><strong>Kedvezményezett:</strong> Elira Oktatási Kft.</p>
                    <p><strong>Számlaszám:</strong> 12345678-12345678-12345678</p>
                    <p><strong>Közlemény:</strong> {courseId}-{user?.uid}</p>
                    <p><strong>Összeg:</strong> {course.price?.toLocaleString('hu-HU')} Ft</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Az átutalás beérkezése után automatikusan hozzáférést kap a kurzushoz.
                  </p>
                </div>
              )}
              
              {/* Terms */}
              <div className="mb-6">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    className="mt-1 mr-3"
                    required
                    disabled={isProcessing}
                  />
                  <span className="text-sm text-gray-600">
                    Elfogadom az <a href="#" className="text-teal-600 underline">Általános Szerződési Feltételeket</a> és 
                    az <a href="#" className="text-teal-600 underline">Adatvédelmi Nyilatkozatot</a>.
                  </span>
                </label>
              </div>
              
              {/* Submit Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessing || paymentMethod === 'transfer'}
                className="w-full py-3 px-6 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Feldolgozás...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    {paymentMethod === 'transfer' ? 'Átutalási információk mentése' : 'Fizetés most'}
                  </>
                )}
              </button>
              
              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
                <Lock className="w-4 h-4" />
                <span>Biztonságos fizetés 256-bit SSL titkosítással</span>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Rendelés összesítő</h2>
              
              {/* Course Info */}
              <div className="mb-6 pb-6 border-b">
                <h3 className="font-medium text-gray-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600">
                  {course.stats?.modules} modul • {course.stats?.lessons} lecke
                </p>
              </div>
              
              {/* Pricing */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Kurzus ára</span>
                  <span className="font-medium">{course.price?.toLocaleString('hu-HU')} Ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ÁFA (27%)</span>
                  <span className="font-medium">
                    {Math.round((course.price || 0) * 0.27).toLocaleString('hu-HU')} Ft
                  </span>
                </div>
              </div>
              
              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-gray-900">Összesen</span>
                <span className="text-2xl font-bold text-teal-600">
                  {course.price?.toLocaleString('hu-HU')} Ft
                </span>
              </div>
              
              {/* Benefits */}
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-sm text-gray-600">Azonnali hozzáférés</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-sm text-gray-600">Élethosszig tartó hozzáférés</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-sm text-gray-600">30 napos pénzvisszafizetési garancia</span>
                </div>
                {course.certificateEnabled && (
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <span className="text-sm text-gray-600">Tanúsítvány a befejezés után</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}