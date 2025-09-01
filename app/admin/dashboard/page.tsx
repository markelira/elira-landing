'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  BookOpen, 
  BarChart, 
  CreditCard, 
  TrendingUp, 
  Activity, 
  Award, 
  Wifi, 
  WifiOff, 
  Sparkles, 
  Zap,
  Plus,
  Filter
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Import our admin API infrastructure
import { useAdminDashboardStats, useAdminHealthCheck } from '@/lib/admin-hooks'
import type { DashboardStats } from '@/lib/admin-hooks'

// All mock functions removed - now using real API integration

export default function AdminDashboardPage() {
  // Use our new admin hooks with real API integration
  const { data: stats, isLoading: statsLoading, error: statsError } = useAdminDashboardStats()
  const { data: healthStatus } = useAdminHealthCheck()
  
  const connectionStatus = healthStatus?.status === 'ok' ? 'online' : 'offline'

  // Enhanced loading and error states
  if (statsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        <span className="ml-2 text-gray-600">Loading dashboard data...</span>
      </div>
    )
  }

  if (statsError) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Error loading dashboard: {statsError.message}</div>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-teal-100 text-lg">
                Platform performance and user activity overview
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end space-x-2 mb-2">
                {connectionStatus === 'online' ? (
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Wifi className="h-3 w-3 mr-1" />
                    Online
                  </Badge>
                ) : (
                  <Badge className="bg-red-500/20 text-white border-red-300">
                    <WifiOff className="h-3 w-3 mr-1" />
                    Offline
                  </Badge>
                )}
              </div>
              <div className="text-sm text-teal-100">
                Last updated: {stats?.lastUpdated ? new Date(stats.lastUpdated).toLocaleString() : 'Just now'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Platform Overview</h2>
          <Badge className="bg-teal-100 text-teal-700">
            <Sparkles className="w-3 h-3 mr-1" />
            Live Data
          </Badge>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                {stats?.monthlyGrowth && stats.monthlyGrowth > 0 && (
                  <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                    +{stats.monthlyGrowth}%
                  </Badge>
                )}
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stats?.userCount || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Total Users
                </div>
                <div className="text-xs text-gray-500">
                  Students and instructors
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <Badge variant="outline" className="text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  +5 new
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stats?.courseCount || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Active Courses
                </div>
                <div className="text-xs text-gray-500">
                  Published courses
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                  <BarChart className="w-6 h-6 text-purple-600" />
                </div>
                {stats?.monthlyGrowth && stats.monthlyGrowth > 0 && (
                  <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                    +{stats.monthlyGrowth}%
                  </Badge>
                )}
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stats?.totalEnrollments || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Total Enrollments
                </div>
                <div className="text-xs text-gray-500">
                  Active learning sessions
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-orange-600" />
                </div>
                <Badge variant="outline" className="text-xs">
                  Revenue
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  ${(stats?.totalRevenue || 0).toLocaleString()}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Platform Revenue
                </div>
                <div className="text-xs text-gray-500">
                  All time earnings
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Metrics Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Performance Metrics</h2>
          <Badge className="bg-green-100 text-green-700">
            <Activity className="w-3 h-3 mr-1" />
            Real-time
          </Badge>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-teal-50 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-teal-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stats?.activeUsers || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Active Users
                </div>
                <div className="text-xs text-gray-500">
                  Last 30 days
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stats?.completedCourses || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Completed Courses
                </div>
                <div className="text-xs text-gray-500">
                  {stats?.averageCompletionRate || 0}% completion rate
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
                  {stats?.averageCompletionRate || 0}%
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Average Completion
                </div>
                <div className="text-xs text-gray-500">
                  Across all courses
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-lg ${connectionStatus === 'online' ? 'bg-green-50' : 'bg-red-50'} flex items-center justify-center`}>
                  <Wifi className={`w-6 h-6 ${connectionStatus === 'online' ? 'text-green-600' : 'text-red-600'}`} />
                </div>
                <Badge className={connectionStatus === 'online' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                  {connectionStatus === 'online' ? '99.9%' : 'Offline'}
                </Badge>
              </div>
              <div className="mt-4">
                <div className={`text-2xl font-bold ${connectionStatus === 'online' ? 'text-green-600' : 'text-red-600'} mb-1`}>
                  {connectionStatus === 'online' ? 'Operational' : 'Down'}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  System Status
                </div>
                <div className="text-xs text-gray-500">
                  {connectionStatus === 'online' ? 'All systems operational' : 'Check connection'}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Quick Actions</h3>
              <p className="text-teal-100">Common administrative functions</p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8" />
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/admin/users" className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-200 group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <Badge className="bg-white/20 text-white border-white/30">New</Badge>
              </div>
              <h4 className="font-semibold mb-1">User Management</h4>
              <p className="text-sm text-teal-100">Add or manage users</p>
            </Link>
            
            <Link href="/admin/courses" className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-200 group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-5 h-5" />
                </div>
                <Badge className="bg-white/20 text-white border-white/30">Popular</Badge>
              </div>
              <h4 className="font-semibold mb-1">Course Management</h4>
              <p className="text-sm text-teal-100">Create and manage courses</p>
            </Link>
            
            <Link href="/admin/analytics" className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-200 group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BarChart className="w-5 h-5" />
                </div>
              </div>
              <h4 className="font-semibold mb-1">Detailed Analytics</h4>
              <p className="text-sm text-teal-100">Performance analysis</p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}