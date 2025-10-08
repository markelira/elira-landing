'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/badge'
import {
  CreditCard,
  Download,
  FileText,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  ArrowUpRight,
  Receipt,
  DollarSign,
  TrendingUp,
  AlertCircle
} from 'lucide-react'

interface Payment {
  id: string
  courseId: string
  courseTitle: string
  amount: number
  currency: string
  status: 'succeeded' | 'pending' | 'failed' | 'refunded'
  paymentMethod: string
  createdAt: Date
  receiptUrl?: string
  invoiceUrl?: string
  refundedAt?: Date
  refundAmount?: number
}

// Mock function to get payment history
const getPaymentHistory = async (userId: string, token?: string): Promise<Payment[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500))

  // For MVP, return mock data
  const mockPayments: Payment[] = [
    {
      id: 'pay_1',
      courseId: 'ai-copywriting-mastery',
      courseTitle: 'AI Copywriting Mastery Kurzus',
      amount: 7990,
      currency: 'HUF',
      status: 'succeeded',
      paymentMethod: 'card',
      createdAt: new Date('2024-01-15'),
      receiptUrl: '#',
      invoiceUrl: '#'
    },
    {
      id: 'pay_2',
      courseId: 'advanced-seo',
      courseTitle: 'Haladó SEO Stratégiák',
      amount: 9990,
      currency: 'HUF',
      status: 'succeeded',
      paymentMethod: 'card',
      createdAt: new Date('2023-12-20'),
      receiptUrl: '#',
      invoiceUrl: '#'
    }
  ]

  // Try to fetch real data from Firebase Functions API
  try {
    const functionsUrl = process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL || 
                        'https://api-7wtrvbj3mq-ew.a.run.app'
    
    // For now, we'll try to get payment data from Firestore via Firebase Functions
    // This would require a dedicated payments endpoint to be added to functions/src/index.ts
    const response = await fetch(`${functionsUrl}/api/users/${userId}/payments`, {
      headers: { 
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    })

    if (response.ok) {
      const data = await response.json()
      return data.payments || mockPayments
    }
  } catch (error) {
    console.log('API not available, using mock payment data:', error)
  }

  return mockPayments
}

export default function PaymentsClient() {
  const router = useRouter()
  const { user } = useAuth()
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const { data: payments, isLoading } = useQuery({
    queryKey: ['payments', user?.id],
    queryFn: async () => {
      if (!user) throw new Error('User not authenticated')
      // For now, we'll pass undefined as token since the User type doesn't have getIdToken
      return getPaymentHistory(user.id, undefined)
    },
    enabled: !!user
  })

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
            <div className="space-y-3">
              <div className="h-20 bg-slate-300 rounded"></div>
              <div className="h-20 bg-slate-300 rounded"></div>
              <div className="h-20 bg-slate-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const formatAmount = (amount: number, currency: string) => {
    return new Intl.NumberFormat('hu-HU', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const getStatusBadge = (status: Payment['status']) => {
    switch (status) {
      case 'succeeded':
        return (
          <Badge className="bg-emerald-100/60 text-emerald-800 border-emerald-300/50 font-light">
            <CheckCircle className="w-3 h-3 mr-1" />
            Sikeres
          </Badge>
        )
      case 'pending':
        return (
          <Badge className="bg-amber-100/60 text-amber-800 border-amber-300/50 font-light">
            <Clock className="w-3 h-3 mr-1" />
            Folyamatban
          </Badge>
        )
      case 'failed':
        return (
          <Badge className="bg-red-100/60 text-red-800 border-red-300/50 font-light">
            <XCircle className="w-3 h-3 mr-1" />
            Sikertelen
          </Badge>
        )
      case 'refunded':
        return (
          <Badge className="bg-slate-100/60 text-slate-800 border-slate-300/50 font-light">
            <RefreshCw className="w-3 h-3 mr-1" />
            Visszatérítve
          </Badge>
        )
    }
  }

  // Calculate statistics
  const totalSpent = payments?.reduce((sum, p) => p.status === 'succeeded' ? sum + p.amount : sum, 0) || 0
  const totalRefunded = payments?.reduce((sum, p) => p.refundAmount || 0, 0) || 0
  const successfulPayments = payments?.filter(p => p.status === 'succeeded').length || 0

  // Filter payments by year
  const filteredPayments = payments?.filter(p => 
    new Date(p.createdAt).getFullYear() === selectedYear
  ) || []

  // Get available years
  const yearSet = new Set(payments?.map(p => 
    new Date(p.createdAt).getFullYear()
  ) || [])
  const availableYears = Array.from(yearSet).sort((a, b) => b - a)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F7F5' }}>
      {/* Academic Header */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-slate-200/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mb-4"></div>
              <h1 className="text-2xl font-serif font-medium text-slate-900">Fizetési előzmények</h1>
              <p className="text-slate-700 font-light mt-1">Kezeld a vásárlásaidat és számláidat</p>
              <div className="h-px bg-gradient-to-r from-transparent via-amber-600/40 to-transparent mt-4"></div>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                onClick={() => router.push('/dashboard/settings')}
                variant="outline"
                className="gap-2 border-slate-300 text-slate-700 hover:border-amber-400 hover:text-amber-700"
              >
                <CreditCard className="w-4 h-4" />
                Fizetési módok
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Academic Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-light">Teljes költés</p>
                <p className="text-2xl font-serif font-medium text-slate-900 mt-1">
                  {formatAmount(totalSpent, 'HUF')}
                </p>
              </div>
              <div className="bg-emerald-100/60 p-3 rounded border border-emerald-200/50">
                <DollarSign className="w-6 h-6 text-emerald-700" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-light">Vásárlások száma</p>
                <p className="text-2xl font-serif font-medium text-slate-900 mt-1">
                  {successfulPayments}
                </p>
              </div>
              <div className="bg-amber-100/60 p-3 rounded border border-amber-200/50">
                <TrendingUp className="w-6 h-6 text-amber-700" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-light">Visszatérítések</p>
                <p className="text-2xl font-serif font-medium text-slate-900 mt-1">
                  {formatAmount(totalRefunded, 'HUF')}
                </p>
              </div>
              <div className="bg-violet-100/60 p-3 rounded border border-violet-200/50">
                <RefreshCw className="w-6 h-6 text-violet-700" />
              </div>
            </div>
          </Card>
        </div>

        {/* Academic Year Filter */}
        {availableYears.length > 1 && (
          <div className="mb-6 flex gap-2">
            {availableYears.map(year => (
              <Button
                key={year}
                onClick={() => setSelectedYear(year)}
                variant={selectedYear === year ? 'primary' : 'outline'}
                size="sm"
                className={selectedYear === year 
                  ? 'bg-amber-600 hover:bg-amber-700 text-white border-amber-600' 
                  : 'border-slate-300 text-slate-700 hover:border-amber-400 hover:text-amber-700'
                }
              >
                {year}
              </Button>
            ))}
          </div>
        )}

        {/* Academic Payments Table */}
        <Card className="bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200/50">
            <h2 className="text-lg font-serif font-medium text-slate-900">Tranzakciók</h2>
            <div className="h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mt-2"></div>
          </div>
          
          {filteredPayments.length > 0 ? (
            <div className="divide-y">
              {filteredPayments.map((payment) => (
                <div key={payment.id} className="px-6 py-4 hover:bg-slate-50/60 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="bg-amber-100/60 p-2 rounded border border-amber-200/50">
                          <Receipt className="w-5 h-5 text-amber-700" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif font-medium text-slate-900">
                            {payment.courseTitle}
                          </h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
                            <span className="flex items-center gap-1 font-light">
                              <Calendar className="w-3 h-3" />
                              {new Date(payment.createdAt).toLocaleDateString('hu-HU')}
                            </span>
                            <span className="flex items-center gap-1 font-light">
                              <CreditCard className="w-3 h-3" />
                              {payment.paymentMethod === 'card' ? 'Bankkártya' : payment.paymentMethod}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="font-serif font-medium text-slate-900">
                          {formatAmount(payment.amount, payment.currency)}
                        </div>
                        {payment.refundAmount && (
                          <div className="text-sm text-red-600 font-light">
                            -{formatAmount(payment.refundAmount, payment.currency)}
                          </div>
                        )}
                      </div>
                      
                      {getStatusBadge(payment.status)}
                      
                      <div className="flex items-center gap-2">
                        {payment.receiptUrl && (
                          <Button
                            onClick={() => window.open(payment.receiptUrl, '_blank')}
                            variant="ghost"
                            size="sm"
                            className="p-2"
                            title="Nyugta letöltése"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                        {payment.invoiceUrl && (
                          <Button
                            onClick={() => window.open(payment.invoiceUrl, '_blank')}
                            variant="ghost"
                            size="sm"
                            className="p-2"
                            title="Számla letöltése"
                          >
                            <FileText className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          onClick={() => router.push(`/courses/${payment.courseId}`)}
                          variant="ghost"
                          size="sm"
                          className="p-2"
                          title="Kurzus megtekintése"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {payment.refundedAt && (
                    <div className="mt-3 pl-14">
                      <div className="inline-flex items-center gap-2 text-sm text-slate-700 bg-slate-100/60 px-3 py-1 rounded border border-slate-200/50">
                        <AlertCircle className="w-3 h-3" />
                        <span className="font-light">Visszatérítve: {new Date(payment.refundedAt).toLocaleDateString('hu-HU')}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <Receipt className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-serif font-medium text-slate-900 mb-2">
                Nincs tranzakció
              </h3>
              <p className="text-slate-600 font-light mb-6">
                {selectedYear === new Date().getFullYear() 
                  ? 'Még nem vásároltál kurzust.'
                  : `Nincs tranzakció ${selectedYear}-ben.`}
              </p>
              {selectedYear === new Date().getFullYear() && (
                <Button
                  onClick={() => router.push('/courses')}
                  variant="primary"
                  className="bg-amber-600 hover:bg-amber-700 text-white border-amber-600"
                >
                  Kurzusok böngészése
                </Button>
              )}
            </div>
          )}
        </Card>

        {/* Academic Help Section */}
        <Card className="mt-8 p-6 bg-amber-50/60 border-amber-200/50 backdrop-blur-sm shadow-sm">
          <h3 className="font-serif font-medium text-amber-900 mb-2">
            Segítségre van szükséged a számlázással kapcsolatban?
          </h3>
          <p className="text-sm text-amber-800 font-light mb-4">
            Ha kérdésed van a fizetésekkel vagy számlákkal kapcsolatban, vagy visszatérítést szeretnél kérni, 
            vedd fel velünk a kapcsolatot.
          </p>
          <Button
            onClick={() => router.push('/support')}
            variant="primary"
            size="sm"
            className="bg-amber-600 hover:bg-amber-700 text-white border-amber-600"
          >
            Kapcsolatfelvétel
          </Button>
        </Card>
      </div>
    </div>
  )
}