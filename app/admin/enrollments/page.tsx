'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/Button'
import { 
  GraduationCap, 
  Search, 
  Filter, 
  Users, 
  BookOpen, 
  TrendingUp,
  Calendar,
  Eye,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  Sparkles
} from 'lucide-react'

interface Enrollment {
  id: string
  userId: string
  courseId: string
  enrolledAt: string
  completedAt?: string
  progressPercentage: number
  status: 'active' | 'completed' | 'dropped' | 'pending'
  lastAccessedAt?: string
  certificateIssued: boolean
  paymentStatus: 'paid' | 'pending' | 'failed'
  user: {
    firstName: string
    lastName: string
    email: string
  }
  course: {
    title: string
    instructor: string
    category: string
  }
}

interface EnrollmentStats {
  totalEnrollments: number
  activeEnrollments: number
  completedEnrollments: number
  droppedEnrollments: number
  averageCompletionRate: number
  averageTimeToComplete: number
  certificatesIssued: number
  recentEnrollments: number
}

// Mock data - replace with actual API calls
const fetchEnrollments = async (): Promise<Enrollment[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return [
    {
      id: '1',
      userId: 'user123',
      courseId: 'course1',
      enrolledAt: '2024-08-01T10:00:00Z',
      completedAt: '2024-08-20T15:30:00Z',
      progressPercentage: 100,
      status: 'completed',
      lastAccessedAt: '2024-08-20T15:30:00Z',
      certificateIssued: true,
      paymentStatus: 'paid',
      user: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      },
      course: {
        title: 'Complete Web Development Bootcamp',
        instructor: 'Jane Smith',
        category: 'Web Development'
      }
    },
    {
      id: '2',
      userId: 'user456',
      courseId: 'course2',
      enrolledAt: '2024-08-15T09:00:00Z',
      progressPercentage: 65,
      status: 'active',
      lastAccessedAt: '2024-08-23T14:20:00Z',
      certificateIssued: false,
      paymentStatus: 'paid',
      user: {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com'
      },
      course: {
        title: 'Data Science Fundamentals',
        instructor: 'Dr. Robert Brown',
        category: 'Data Science'
      }
    },
    {
      id: '3',
      userId: 'user789',
      courseId: 'course3',
      enrolledAt: '2024-08-10T11:30:00Z',
      progressPercentage: 25,
      status: 'dropped',
      lastAccessedAt: '2024-08-18T16:45:00Z',
      certificateIssued: false,
      paymentStatus: 'paid',
      user: {
        firstName: 'Bob',
        lastName: 'Wilson',
        email: 'bob.wilson@example.com'
      },
      course: {
        title: 'Machine Learning Basics',
        instructor: 'Sarah Davis',
        category: 'AI & Machine Learning'
      }
    }
  ]
}

const fetchEnrollmentStats = async (): Promise<EnrollmentStats> => {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return {
    totalEnrollments: 3420,
    activeEnrollments: 2156,
    completedEnrollments: 1050,
    droppedEnrollments: 214,
    averageCompletionRate: 73.5,
    averageTimeToComplete: 42,
    certificatesIssued: 1050,
    recentEnrollments: 89
  }
}

export default function AdminEnrollmentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [courseFilter, setCourseFilter] = useState<string>('all')

  const { data: enrollments, isLoading: enrollmentsLoading } = useQuery<Enrollment[]>({
    queryKey: ['adminEnrollments'],
    queryFn: fetchEnrollments,
  })

  const { data: stats, isLoading: statsLoading } = useQuery<EnrollmentStats>({
    queryKey: ['adminEnrollmentStats'],
    queryFn: fetchEnrollmentStats,
  })

  const filteredEnrollments = enrollments?.filter(enrollment => {
    const matchesSearch = 
      enrollment.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.course.title.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || enrollment.status === statusFilter
    
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
      case 'active':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Clock className="w-3 h-3 mr-1" />
            Active
          </Badge>
        )
      case 'dropped':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Dropped
          </Badge>
        )
      case 'pending':
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-500'
    if (percentage >= 60) return 'bg-blue-500'
    if (percentage >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  if (enrollmentsLoading || statsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Enrollment Management</h1>
              <p className="text-cyan-100 text-lg">
                Track student enrollments and course progress
              </p>
            </div>
            <div className="hidden lg:block">
              <Button className="bg-white text-cyan-600 hover:bg-gray-100 flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enrollment Stats */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Enrollment Overview</h2>
          <Badge className="bg-cyan-100 text-cyan-700">
            <Sparkles className="w-3 h-3 mr-1" />
            Live Data
          </Badge>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                  +{stats?.recentEnrollments || 0} new
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stats?.totalEnrollments.toLocaleString() || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Total Enrollments
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
                <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {stats?.totalEnrollments ? Math.round((stats.completedEnrollments / stats.totalEnrollments) * 100) : 0}%
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stats?.completedEnrollments.toLocaleString() || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Completed
                </div>
                <div className="text-xs text-gray-500">
                  With certificates
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
                <Badge variant="outline" className="text-xs">
                  {stats?.totalEnrollments ? Math.round((stats.activeEnrollments / stats.totalEnrollments) * 100) : 0}%
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stats?.activeEnrollments.toLocaleString() || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Active Students
                </div>
                <div className="text-xs text-gray-500">
                  Currently learning
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stats?.averageCompletionRate || 0}%
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Avg Completion Rate
                </div>
                <div className="text-xs text-gray-500">
                  {stats?.averageTimeToComplete || 0} days avg time
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search enrollments..."
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
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="dropped">Dropped</option>
              <option value="pending">Pending</option>
            </select>

            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors hover:border-gray-400"
            >
              <option value="all">All Courses</option>
              <option value="web">Web Development</option>
              <option value="data">Data Science</option>
              <option value="mobile">Mobile Development</option>
            </select>

            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enrollments Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Student Enrollments</CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-cyan-100 text-cyan-700">
                <Users className="w-3 h-3 mr-1" />
                {filteredEnrollments.length} enrollments
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Student</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Course</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Progress</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Enrolled</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Last Access</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnrollments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <GraduationCap className="w-12 h-12 text-gray-300" />
                        <p className="text-gray-500">No enrollments found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredEnrollments.map((enrollment) => (
                    <tr key={enrollment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">
                            {enrollment.user.firstName} {enrollment.user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{enrollment.user.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{enrollment.course.title}</div>
                          <div className="text-sm text-gray-500">by {enrollment.course.instructor}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getProgressColor(enrollment.progressPercentage)}`}
                              style={{ width: `${enrollment.progressPercentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{enrollment.progressPercentage}%</span>
                        </div>
                        {enrollment.certificateIssued && (
                          <div className="text-xs text-green-600 mt-1">Certificate issued</div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(enrollment.status)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date(enrollment.enrolledAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {enrollment.lastAccessedAt ? (
                          <div className="text-sm text-gray-600">
                            {new Date(enrollment.lastAccessedAt).toLocaleDateString()}
                          </div>
                        ) : (
                          <span className="text-gray-400">Never</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" title="View Details">
                            <Eye className="h-4 w-4" />
                          </Button>
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