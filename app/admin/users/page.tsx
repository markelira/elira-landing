'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  UserCheck, 
  UserX,
  Plus,
  Eye,
  Mail,
  Calendar,
  Shield,
  GraduationCap,
  Activity,
  Sparkles
} from 'lucide-react'
import { toast } from 'sonner'

// Import our new admin API infrastructure
import { 
  useAdminUsers, 
  useAdminUserStats, 
  useUpdateUserRole, 
  useDeleteUser, 
  useToggleUserStatus 
} from '@/lib/admin-hooks'
import type { User, UserStats } from '@/lib/admin-hooks'
import { UserRole } from '@/types/index'

// All mock functions removed - now using real API integration

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Use our new admin hooks with real API integration
  const { data: users, isLoading: usersLoading, error: usersError } = useAdminUsers()
  const { data: stats, isLoading: statsLoading } = useAdminUserStats()

  // Use integrated mutation hooks with error handling
  const updateRoleMutation = useUpdateUserRole()
  const deleteUserMutation = useDeleteUser()
  const toggleStatusMutation = useToggleUserStatus()

  // Enhanced filtering with type safety
  const filteredUsers = users?.filter((user: User) => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive)
    
    return matchesSearch && matchesRole && matchesStatus
  }) || []

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-100 text-red-700 border-red-200'
      case 'INSTRUCTOR':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'STUDENT':
        return 'bg-green-100 text-green-700 border-green-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'Administrator'
      case 'INSTRUCTOR':
        return 'Instructor'
      case 'STUDENT':
        return 'Student'
      default:
        return role
    }
  }

  // Enhanced loading and error states
  if (usersLoading || statsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        <span className="ml-2 text-gray-600">Loading users...</span>
      </div>
    )
  }

  if (usersError) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Error loading users: {usersError.message}</div>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">User Management</h1>
              <p className="text-blue-100 text-lg">
                Platform user overview and administration
              </p>
            </div>
            <div className="hidden lg:block">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New User
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">User Statistics</h2>
          <Badge className="bg-blue-100 text-blue-700">
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
                <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                  +{stats?.newUsersThisMonth || 0}
                </Badge>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stats?.totalUsers || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Total Users
                </div>
                <div className="text-xs text-gray-500">
                  {stats?.newUsersThisMonth || 0} new this month
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {stats?.totalUsers ? Math.round((stats.activeUsers / stats.totalUsers) * 100) : 0}%
                </Badge>
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
                <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stats?.students || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Students
                </div>
                <div className="text-xs text-gray-500">
                  {stats?.totalUsers ? Math.round((stats.students / stats.totalUsers) * 100) : 0}% of total
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stats?.instructors || 0}
                </div>
                <div className="text-sm font-medium text-gray-600 mb-1">
                  Instructors
                </div>
                <div className="text-xs text-gray-500">
                  {stats?.totalUsers ? Math.round((stats.instructors / stats.totalUsers) * 100) : 0}% of total
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Search and Filter</span>
            <Badge variant="outline" className="text-xs">
              <Filter className="w-3 h-3 mr-1" />
              {filteredUsers.length} results
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors hover:border-gray-400"
            >
              <option value="all">All Roles</option>
              <option value="STUDENT">Student</option>
              <option value="INSTRUCTOR">Instructor</option>
              <option value="ADMIN">Administrator</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors hover:border-gray-400"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <Button 
              variant="outline" 
              className="flex items-center gap-2 hover:bg-gray-50"
              onClick={() => {
                setSearchTerm('')
                setRoleFilter('all')
                setStatusFilter('all')
              }}
            >
              <Filter className="h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Users List</CardTitle>
            <div className="flex items-center gap-2">
              <Badge className="bg-indigo-100 text-indigo-700">
                <Users className="w-3 h-3 mr-1" />
                {filteredUsers.length} users
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">User</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Joined</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Last Login</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Users className="w-12 h-12 text-gray-300" />
                        <p className="text-gray-500">No users found with current filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          {user.profilePictureUrl ? (
                            <img 
                              src={user.profilePictureUrl} 
                              alt={`${user.firstName} ${user.lastName}`}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-medium">
                              {user.firstName[0]}{user.lastName[0]}
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{user.firstName} {user.lastName}</div>
                          <div className="text-sm text-gray-500">ID: {user.id.slice(0, 8)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                        {user.role === 'ADMIN' && <Shield className="w-3 h-3 mr-1" />}
                        {user.role === 'INSTRUCTOR' && <UserCheck className="w-3 h-3 mr-1" />}
                        {user.role === 'STUDENT' && <GraduationCap className="w-3 h-3 mr-1" />}
                        {getRoleLabel(user.role)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {user.lastLoginAt ? (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date(user.lastLoginAt).toLocaleDateString()}
                        </div>
                      ) : (
                        <span className="text-gray-500">Never</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <Badge 
                        variant="outline" 
                        className={user.isActive ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-50 text-gray-700 border-gray-200"}
                      >
                        <div className={`w-2 h-2 rounded-full mr-2 ${user.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                        {user.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            const newRole: UserRole = user.role === 'STUDENT' ? 'INSTRUCTOR' : 'STUDENT'
                            updateRoleMutation.mutate({ 
                              userId: user.id, 
                              role: newRole
                            })
                          }}
                          disabled={updateRoleMutation.isPending}
                          title="Toggle Role"
                        >
                          <UserCheck className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toggleStatusMutation.mutate({ 
                            userId: user.id, 
                            isActive: !user.isActive 
                          })}
                          disabled={toggleStatusMutation.isPending}
                          title={user.isActive ? 'Deactivate User' : 'Activate User'}
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-700"
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}? This action cannot be undone.`)) {
                              deleteUserMutation.mutate(user.id)
                            }
                          }}
                          disabled={deleteUserMutation.isPending}
                          title="Delete User"
                        >
                          <Trash2 className="h-4 w-4" />
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