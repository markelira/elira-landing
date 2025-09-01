'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { Badge } from '@/components/ui/badge'
import { User, Shield, BookOpen, GraduationCap, Settings } from 'lucide-react'
import Link from 'next/link'
import { useAuthStore } from '@/src/stores/authStore'

export default function TestAdminPage() {
  const { user } = useAuth()
  const { setUser } = useAuthStore()
  const [isUpdatingRole, setIsUpdatingRole] = useState(false)

  const updateUserRole = (role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN') => {
    if (!user) return
    
    setIsUpdatingRole(true)
    // Simulate role update
    setTimeout(() => {
      const updatedUser = { ...user, role }
      setUser(updatedUser)
      setIsUpdatingRole(false)
    }, 500)
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return <Badge className="bg-red-100 text-red-700 border-red-200">Administrator</Badge>
      case 'INSTRUCTOR':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Instructor</Badge>
      case 'STUDENT':
        return <Badge className="bg-green-100 text-green-700 border-green-200">Student</Badge>
      default:
        return <Badge>{role}</Badge>
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
              <p className="text-gray-500 mb-6">Please log in to test the admin panel</p>
              <Link href="/auth-test">
                <Button>Go to Login</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel Testing</h1>
          <p className="text-gray-600">Test role-based access and admin functionality</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* User Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Current User
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Name</label>
                <div className="text-lg font-medium">{user.firstName} {user.lastName}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <div className="text-gray-900">{user.email}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Current Role</label>
                <div className="mt-1">{getRoleBadge(user.role)}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">User ID</label>
                <div className="text-sm text-gray-500 font-mono">{user.id}</div>
              </div>
            </CardContent>
          </Card>

          {/* Role Testing Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Role Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Switch between different user roles to test access permissions
              </p>
              
              <div className="space-y-2">
                <Button
                  onClick={() => updateUserRole('STUDENT')}
                  disabled={isUpdatingRole || user.role === 'STUDENT'}
                  variant={user.role === 'STUDENT' ? 'default' : 'outline'}
                  className="w-full justify-start"
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Set as Student
                </Button>
                
                <Button
                  onClick={() => updateUserRole('INSTRUCTOR')}
                  disabled={isUpdatingRole || user.role === 'INSTRUCTOR'}
                  variant={user.role === 'INSTRUCTOR' ? 'default' : 'outline'}
                  className="w-full justify-start"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Set as Instructor
                </Button>
                
                <Button
                  onClick={() => updateUserRole('ADMIN')}
                  disabled={isUpdatingRole || user.role === 'ADMIN'}
                  variant={user.role === 'ADMIN' ? 'default' : 'outline'}
                  className="w-full justify-start"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Set as Administrator
                </Button>
              </div>

              {isUpdatingRole && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-teal-600 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">Updating role...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Navigation Links */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <GraduationCap className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Student Dashboard</h3>
                <p className="text-sm text-gray-600 mb-4">Access learning dashboard and courses</p>
                <Link href="/dashboard">
                  <Button variant="outline" className="w-full">
                    Go to Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <Shield className="w-12 h-12 text-red-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Admin Panel</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Administrative tools and management
                  {user.role !== 'ADMIN' && (
                    <span className="block text-xs text-red-500 mt-1">
                      Requires Admin role
                    </span>
                  )}
                </p>
                <Link href="/admin/dashboard">
                  <Button 
                    variant={user.role === 'ADMIN' ? 'default' : 'outline'} 
                    className="w-full"
                    disabled={user.role !== 'ADMIN'}
                  >
                    {user.role === 'ADMIN' ? 'Go to Admin Panel' : 'Access Denied'}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Course Catalog</h3>
                <p className="text-sm text-gray-600 mb-4">Browse available courses</p>
                <Link href="/courses">
                  <Button variant="outline" className="w-full">
                    Browse Courses
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Access Guide */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Role-Based Access Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="font-medium text-green-700 mb-2 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Student Access
                </h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Personal Dashboard</li>
                  <li>• Course Enrollment</li>
                  <li>• Progress Tracking</li>
                  <li>• Certificate Downloads</li>
                  <li>• Profile Management</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-blue-700 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Instructor Access
                </h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Course Creation</li>
                  <li>• Student Management</li>
                  <li>• Analytics Dashboard</li>
                  <li>• Content Management</li>
                  <li>• Grading Tools</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-red-700 mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Admin Access
                </h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• User Management</li>
                  <li>• Course Administration</li>
                  <li>• Payment Management</li>
                  <li>• System Analytics</li>
                  <li>• Platform Settings</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h5 className="font-medium text-blue-900 mb-1">Testing Instructions</h5>
                  <p className="text-sm text-blue-700">
                    1. Use the role switching buttons above to test different access levels<br />
                    2. Try accessing the Admin Panel with different roles<br />
                    3. Verify that authentication guards work correctly<br />
                    4. Test responsive design on mobile devices
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}