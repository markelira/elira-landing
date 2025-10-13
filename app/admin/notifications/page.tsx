'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Bell, 
  Plus, 
  Send, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  Users,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  Calendar,
  Mail
} from 'lucide-react'
import { toast } from 'sonner'

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  targetAudience: 'all' | 'students' | 'instructors' | 'admins'
  status: 'draft' | 'scheduled' | 'sent' | 'failed'
  createdAt: string
  scheduledAt?: string
  sentAt?: string
  recipientCount: number
  openRate?: number
  clickRate?: number
  author: {
    name: string
    email: string
  }
}

interface NotificationStats {
  totalNotifications: number
  sentNotifications: number
  scheduledNotifications: number
  draftNotifications: number
  totalRecipients: number
  averageOpenRate: number
  averageClickRate: number
}

// Mock data - replace with actual API calls
const fetchNotifications = async (): Promise<Notification[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return [
    {
      id: '1',
      title: 'New Course Release: Advanced React Patterns',
      message: 'We\'re excited to announce the launch of our new Advanced React Patterns course...',
      type: 'info',
      targetAudience: 'students',
      status: 'sent',
      createdAt: '2024-08-20T10:00:00Z',
      sentAt: '2024-08-20T14:00:00Z',
      recipientCount: 2456,
      openRate: 68.5,
      clickRate: 23.2,
      author: {
        name: 'Admin User',
        email: 'admin@elira.com'
      }
    },
    {
      id: '2',
      title: 'Platform Maintenance Scheduled',
      message: 'We will be performing routine maintenance on our platform this weekend...',
      type: 'warning',
      targetAudience: 'all',
      status: 'scheduled',
      createdAt: '2024-08-22T09:00:00Z',
      scheduledAt: '2024-08-25T02:00:00Z',
      recipientCount: 12470,
      author: {
        name: 'System Admin',
        email: 'system@elira.com'
      }
    },
    {
      id: '3',
      title: 'Certificate Generation Update',
      message: 'We\'ve improved our certificate generation system for better performance...',
      type: 'success',
      targetAudience: 'students',
      status: 'sent',
      createdAt: '2024-08-19T15:30:00Z',
      sentAt: '2024-08-19T16:00:00Z',
      recipientCount: 8920,
      openRate: 72.1,
      clickRate: 34.8,
      author: {
        name: 'Product Team',
        email: 'product@elira.com'
      }
    },
    {
      id: '4',
      title: 'Monthly Newsletter Draft',
      message: 'August newsletter highlighting top courses and student achievements...',
      type: 'info',
      targetAudience: 'all',
      status: 'draft',
      createdAt: '2024-08-23T11:00:00Z',
      recipientCount: 0,
      author: {
        name: 'Marketing Team',
        email: 'marketing@elira.com'
      }
    }
  ]
}

const fetchNotificationStats = async (): Promise<NotificationStats> => {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return {
    totalNotifications: 48,
    sentNotifications: 42,
    scheduledNotifications: 3,
    draftNotifications: 3,
    totalRecipients: 45620,
    averageOpenRate: 65.8,
    averageClickRate: 28.4
  }
}

export default function AdminNotificationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [audienceFilter, setAudienceFilter] = useState<string>('all')
  const [_isCreating, setIsCreating] = useState(false)
  
  const queryClient = useQueryClient()

  const { data: notifications, isLoading: notificationsLoading } = useQuery<Notification[]>({
    queryKey: ['adminNotifications'],
    queryFn: fetchNotifications,
  })

  const { data: stats, isLoading: statsLoading } = useQuery<NotificationStats>({
    queryKey: ['adminNotificationStats'],
    queryFn: fetchNotificationStats,
  })

  const sendNotificationMutation = useMutation({
    mutationFn: async (_notificationId: string) => {
      await new Promise(resolve => setTimeout(resolve, 1500))
      return { success: true }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminNotifications'] })
      queryClient.invalidateQueries({ queryKey: ['adminNotificationStats'] })
      toast.success('Notification sent successfully')
    },
    onError: () => {
      toast.error('Failed to send notification')
    }
  })

  const deleteNotificationMutation = useMutation({
    mutationFn: async (_notificationId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { success: true }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminNotifications'] })
      queryClient.invalidateQueries({ queryKey: ['adminNotificationStats'] })
      toast.success('Notification deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete notification')
    }
  })

  const filteredNotifications = notifications?.filter(notification => {
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || notification.status === statusFilter
    const matchesType = typeFilter === 'all' || notification.type === typeFilter
    const matchesAudience = audienceFilter === 'all' || notification.targetAudience === audienceFilter
    
    return matchesSearch && matchesStatus && matchesType && matchesAudience
  }) || []

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Sent
          </Badge>
        )
      case 'scheduled':
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Clock className="w-3 h-3 mr-1" />
            Scheduled
          </Badge>
        )
      case 'draft':
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            <Edit className="w-3 h-3 mr-1" />
            Draft
          </Badge>
        )
      case 'failed':
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'info':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Info</Badge>
      case 'warning':
        return <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">Warning</Badge>
      case 'success':
        return <Badge className="bg-green-50 text-green-700 border-green-200">Success</Badge>
      case 'error':
        return <Badge className="bg-red-50 text-red-700 border-red-200">Error</Badge>
      default:
        return <Badge>{type}</Badge>
    }
  }

  const getAudienceBadge = (audience: string) => {
    switch (audience) {
      case 'all':
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200">All Users</Badge>
      case 'students':
        return <Badge className="bg-green-50 text-green-700 border-green-200">Students</Badge>
      case 'instructors':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Instructors</Badge>
      case 'admins':
        return <Badge className="bg-red-50 text-red-700 border-red-200">Admins</Badge>
      default:
        return <Badge>{audience}</Badge>
    }
  }

  if (notificationsLoading || statsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Notification Center</h1>
              <p className="text-amber-100 text-lg">
                Manage and send notifications to users
              </p>
            </div>
            <div className="hidden lg:block">
              <Button 
                onClick={() => setIsCreating(true)}
                className="bg-white text-amber-600 hover:bg-gray-100 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Create Notification
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stats?.totalNotifications || 0}
              </div>
              <div className="text-sm font-medium text-gray-600 mb-1">
                Total Notifications
              </div>
              <div className="text-xs text-gray-500">
                {stats?.sentNotifications || 0} sent successfully
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
              <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                {stats?.totalNotifications ? Math.round((stats.sentNotifications / stats.totalNotifications) * 100) : 0}%
              </Badge>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stats?.sentNotifications || 0}
              </div>
              <div className="text-sm font-medium text-gray-600 mb-1">
                Sent Notifications
              </div>
              <div className="text-xs text-gray-500">
                Delivered successfully
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
                {stats?.scheduledNotifications || 0}
              </div>
              <div className="text-sm font-medium text-gray-600 mb-1">
                Scheduled
              </div>
              <div className="text-xs text-gray-500">
                Pending delivery
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stats?.totalRecipients.toLocaleString() || 0}
              </div>
              <div className="text-sm font-medium text-gray-600 mb-1">
                Total Reach
              </div>
              <div className="text-xs text-gray-500">
                {stats?.averageOpenRate || 0}% avg open rate
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search notifications..."
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
              <option value="sent">Sent</option>
              <option value="scheduled">Scheduled</option>
              <option value="draft">Draft</option>
              <option value="failed">Failed</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors hover:border-gray-400"
            >
              <option value="all">All Types</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="success">Success</option>
              <option value="error">Error</option>
            </select>

            <select
              value={audienceFilter}
              onChange={(e) => setAudienceFilter(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors hover:border-gray-400"
            >
              <option value="all">All Audiences</option>
              <option value="students">Students</option>
              <option value="instructors">Instructors</option>
              <option value="admins">Admins</option>
            </select>

            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <div className="text-gray-500 mb-4">
                  {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' || audienceFilter !== 'all' 
                    ? "No notifications found matching your criteria." 
                    : "No notifications available."}
                </div>
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Notification
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card key={notification.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{notification.title}</h3>
                      {getStatusBadge(notification.status)}
                      {getTypeBadge(notification.type)}
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {notification.message}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {getAudienceBadge(notification.targetAudience)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {notification.recipientCount.toLocaleString()} recipients
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {notification.status === 'sent' && notification.openRate && (
                      <div className="flex items-center gap-4 text-sm">
                        <div className="text-green-600">
                          Open Rate: {notification.openRate}%
                        </div>
                        <div className="text-blue-600">
                          Click Rate: {notification.clickRate}%
                        </div>
                      </div>
                    )}

                    {notification.status === 'scheduled' && notification.scheduledAt && (
                      <div className="text-sm text-orange-600">
                        Scheduled for: {new Date(notification.scheduledAt).toLocaleString()}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button variant="ghost" size="sm" title="View Details">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" title="Edit Notification">
                      <Edit className="h-4 w-4" />
                    </Button>
                    {(notification.status === 'draft' || notification.status === 'scheduled') && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        title="Send Now"
                        onClick={() => sendNotificationMutation.mutate(notification.id)}
                        disabled={sendNotificationMutation.isPending}
                        className="text-green-600 hover:text-green-700"
                      >
                        {sendNotificationMutation.isPending ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      title="Delete Notification"
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${notification.title}"?`)) {
                          deleteNotificationMutation.mutate(notification.id)
                        }
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Create Button for Mobile */}
      <div className="lg:hidden">
        <Button 
          onClick={() => setIsCreating(true)}
          className="w-full flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Notification
        </Button>
      </div>
    </div>
  )
}