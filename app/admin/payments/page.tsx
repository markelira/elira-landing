'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Calendar,
  Eye,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles
} from 'lucide-react'

// Import our admin API infrastructure
import { 
  useAdminPayments, 
  useAdminPaymentStats 
} from '@/lib/admin-hooks'
import type { Payment, PaymentStats, PaymentFilters } from '@/lib/admin-hooks'

// All mock functions removed - now using real API integration

export default function AdminPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateRange, setDateRange] = useState<string>('all')

  // Create filters object for API call
  const filters: PaymentFilters = {
    ...(statusFilter !== 'all' && { status: statusFilter }),
    ...(searchTerm && { search: searchTerm }),
    ...(dateRange !== 'all' && { dateRange })
  }

  // Use our new admin hooks with real API integration
  const { data: payments, isLoading: paymentsLoading, error: paymentsError } = useAdminPayments(filters)
  const { data: stats, isLoading: statsLoading } = useAdminPaymentStats()

  const filteredPayments = payments?.filter(payment => {
    const matchesSearch = 
      payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.courseName?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter
    
    return matchesSearch && matchesStatus
  }) || []

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case 'failed':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        )
      case 'refunded':
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            <RefreshCw className="w-3 h-3 mr-1" />
            Refunded
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  // Enhanced loading and error states
  if (paymentsLoading || statsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        <span className="ml-2 text-gray-600">Loading payment data...</span>
      </div>
    )
  }

  if (paymentsError) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Error loading payments: {paymentsError.message}</div>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Payment Management</h1>
              <p className="text-emerald-100 text-lg">
                Track payments, orders, and financial transactions
              </p>
            </div>
            <div className="hidden lg:block">
              <Button className="bg-white text-emerald-600 hover:bg-gray-100 flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Stats */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Revenue Overview</h2>
          <Badge className="bg-emerald-100 text-emerald-700">
            <Sparkles className="w-3 h-3 mr-1" />
            Live Data
          </Badge>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                  +12.5%
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  ${stats?.totalRevenue.toLocaleString() || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Total Revenue
                </div>
                <div className="text-xs text-gray-500">
                  All time earnings
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                  +8.2%
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  ${stats?.monthlyRevenue.toLocaleString() || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  This Month
                </div>
                <div className="text-xs text-gray-500">
                  Monthly revenue
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  ${stats?.pendingAmount.toLocaleString() || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Pending Payments
                </div>
                <div className="text-xs text-gray-500">
                  Awaiting processing
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {stats?.totalTransactions ? Math.round((stats.successfulTransactions / stats.totalTransactions) * 100) : 0}%
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stats?.totalTransactions.toLocaleString() || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Total Transactions
                </div>
                <div className="text-xs text-gray-500">
                  {stats?.successfulTransactions || 0} successful
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Transaction Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stats?.successfulTransactions || 0}
              </div>
              <div className="text-sm font-medium text-gray-600 mb-1">
                Successful Payments
              </div>
              <div className="text-xs text-gray-500">
                {stats?.totalTransactions ? Math.round((stats.successfulTransactions / stats.totalTransactions) * 100) : 0}% success rate
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stats?.failedTransactions || 0}
              </div>
              <div className="text-sm font-medium text-gray-600 mb-1">
                Failed Payments
              </div>
              <div className="text-xs text-gray-500">
                Require attention
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                ${stats?.averageOrderValue.toFixed(2) || 0}
              </div>
              <div className="text-sm font-medium text-gray-600 mb-1">
                Average Order Value
              </div>
              <div className="text-xs text-gray-500">
                Per transaction
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors hover:border-gray-400"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors hover:border-gray-400"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>

            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payment Transactions</CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-emerald-100 text-emerald-700">
                <CreditCard className="w-3 h-3 mr-1" />
                {filteredPayments.length} transactions
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Order ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Customer</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Course</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Date</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <CreditCard className="w-12 h-12 text-gray-300" />
                        <p className="text-gray-500">No payments found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-medium">{payment.orderId}</div>
                        <div className="text-sm text-gray-500">{payment.transactionId}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium">{payment.customerName}</div>
                        <div className="text-sm text-gray-500">{payment.customerEmail}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium">{payment.courseName}</div>
                        <div className="text-sm text-gray-500">{payment.paymentMethod}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-gray-900">
                          ${payment.amount.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">{payment.currency.toUpperCase()}</div>
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(payment.status)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(payment.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" title="View Details">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {payment.status === 'failed' && (
                            <Button variant="ghost" size="sm" title="Retry Payment">
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}