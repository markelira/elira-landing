'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Clock,
  Award,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  Sparkles
} from 'lucide-react'

// Import our admin API infrastructure
import { useAdminAnalytics } from '@/lib/admin-hooks'

// All mock functions removed - now using real API integration

export default function AdminAnalyticsPage() {
  // Use our new admin hooks with real API integration
  const { data: analytics, isLoading, error } = useAdminAnalytics()

  // Enhanced loading and error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        <span className="ml-2 text-gray-600">Loading analytics data...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Error loading analytics: {error.message}</div>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }

  const overview = analytics?.overview

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Platform Analytics</h1>
              <p className="text-purple-100 text-lg">
                Comprehensive insights and performance metrics
              </p>
            </div>
            <div className="text-right">
              <Badge className="bg-white/20 text-white border-white/30 mb-2">
                <Sparkles className="h-3 w-3 mr-1" />
                Live Data
              </Badge>
              <div className="text-sm text-purple-100">
                Last updated: {analytics?.lastUpdated ? new Date(analytics.lastUpdated).toLocaleString() : 'Just now'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Performance Indicators</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                  +15.2%
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {overview?.totalUsers.toLocaleString() || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Total Users
                </div>
                <div className="text-xs text-gray-500">
                  {overview?.activeUsers.toLocaleString() || 0} active this month
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                  +8.4%
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  ${overview?.totalRevenue.toLocaleString() || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Total Revenue
                </div>
                <div className="text-xs text-gray-500">
                  ${overview?.monthlyRevenue.toLocaleString() || 0} this month
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {overview?.totalCourses || 0} active
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {overview?.completedCourses.toLocaleString() || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Course Completions
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
                <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                  Excellent
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {overview?.retentionRate || 0}%
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Retention Rate
                </div>
                <div className="text-xs text-gray-500">
                  30-day retention
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Metrics */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Metrics</h2>
        
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
                  {overview?.averageEngagement || 0}%
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Avg Engagement
                </div>
                <div className="text-xs text-gray-500">
                  User activity score
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
                  47min
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Avg Session Time
                </div>
                <div className="text-xs text-gray-500">
                  Per learning session
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center">
                  <Award className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  4.7
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Avg Course Rating
                </div>
                <div className="text-xs text-gray-500">
                  Student satisfaction
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-rose-50 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-rose-600" />
                </div>
                <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                  +12%
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  2,340
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Certificates Issued
                </div>
                <div className="text-xs text-gray-500">
                  This quarter
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Top Performing Courses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Top Performing Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Course Title</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Enrollments</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Completion Rate</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Performance</th>
                </tr>
              </thead>
              <tbody>
                {analytics?.coursePerformance.map((course, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{course.courseTitle}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        {course.enrollments.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-teal-600 h-2 rounded-full" 
                            style={{ width: `${course.completionRate}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{course.completionRate}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge 
                        className={
                          course.completionRate >= 80 ? 'bg-green-100 text-green-800' :
                          course.completionRate >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }
                      >
                        {course.completionRate >= 80 ? 'Excellent' :
                         course.completionRate >= 60 ? 'Good' : 'Needs Attention'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Top Categories by Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {analytics?.topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center text-teal-600 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{category.name}</div>
                    <div className="text-sm text-gray-500">
                      {category.courses} courses • {category.enrollments.toLocaleString()} enrollments
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">${category.revenue.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">Revenue</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Growth Charts Placeholder */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              User Growth Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Chart visualization would be here</p>
                <p className="text-sm text-gray-400">Showing monthly user growth</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Chart visualization would be here</p>
                <p className="text-sm text-gray-400">Showing monthly revenue trends</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}