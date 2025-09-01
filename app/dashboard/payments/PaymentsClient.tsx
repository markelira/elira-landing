'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-1/4"></div>
            <div className="h-32 bg-gray-300 rounded"></div>
            <div className="space-y-3">
              <div className="h-20 bg-gray-300 rounded"></div>
              <div className="h-20 bg-gray-300 rounded"></div>
              <div className="h-20 bg-gray-300 rounded"></div>
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
          <Badge className="bg-green-100 text-green-800 border-green-300">
            <CheckCircle className="w-3 h-3 mr-1" />
            Sikeres
          </Badge>
        )
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
            <Clock className="w-3 h-3 mr-1" />
            Folyamatban
          </Badge>
        )
      case 'failed':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-300">
            <XCircle className="w-3 h-3 mr-1" />
            Sikertelen
          </Badge>
        )
      case 'refunded':
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-300">
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Fizetési előzmények</h1>
              <p className="text-gray-600 mt-1">Kezeld a vásárlásaidat és számláidat</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button
                onClick={() => router.push('/dashboard/settings')}
                variant="outline"
                className="gap-2"
              >
                <CreditCard className="w-4 h-4" />
                Fizetési módok
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Teljes költés</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatAmount(totalSpent, 'HUF')}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Vásárlások száma</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {successfulPayments}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Visszatérítések</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatAmount(totalRefunded, 'HUF')}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <RefreshCw className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Year Filter */}
        {availableYears.length > 1 && (
          <div className="mb-6 flex gap-2">
            {availableYears.map(year => (
              <Button
                key={year}
                onClick={() => setSelectedYear(year)}
                variant={selectedYear === year ? 'primary' : 'outline'}
                size="sm"
              >
                {year}
              </Button>
            ))}
          </div>
        )}

        {/* Payments Table */}
        <Card className="bg-white overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Tranzakciók</h2>
          </div>
          
          {filteredPayments.length > 0 ? (
            <div className="divide-y">
              {filteredPayments.map((payment) => (
                <div key={payment.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-100 p-2 rounded-lg">
                          <Receipt className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {payment.courseTitle}
                          </h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(payment.createdAt).toLocaleDateString('hu-HU')}
                            </span>
                            <span className="flex items-center gap-1">
                              <CreditCard className="w-3 h-3" />
                              {payment.paymentMethod === 'card' ? 'Bankkártya' : payment.paymentMethod}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          {formatAmount(payment.amount, payment.currency)}
                        </div>
                        {payment.refundAmount && (
                          <div className="text-sm text-red-600">
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
                      <div className="inline-flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded">
                        <AlertCircle className="w-3 h-3" />
                        Visszatérítve: {new Date(payment.refundedAt).toLocaleDateString('hu-HU')}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <Receipt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nincs tranzakció
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedYear === new Date().getFullYear() 
                  ? 'Még nem vásároltál kurzust.'
                  : `Nincs tranzakció ${selectedYear}-ben.`}
              </p>
              {selectedYear === new Date().getFullYear() && (
                <Button
                  onClick={() => router.push('/courses')}
                  variant="primary"
                >
                  Kurzusok böngészése
                </Button>
              )}
            </div>
          )}
        </Card>

        {/* Help Section */}
        <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">
            Segítségre van szükséged a számlázással kapcsolatban?
          </h3>
          <p className="text-sm text-blue-800 mb-4">
            Ha kérdésed van a fizetésekkel vagy számlákkal kapcsolatban, vagy visszatérítést szeretnél kérni, 
            vedd fel velünk a kapcsolatot.
          </p>
          <Button
            onClick={() => router.push('/support')}
            variant="primary"
            size="sm"
          >
            Kapcsolatfelvétel
          </Button>
        </Card>
      </div>
    </div>
  )
}