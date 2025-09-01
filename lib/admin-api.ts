'use client'

import { auth } from '@/lib/firebase'
import { UserRole } from '@/types/index'
import { getFirebaseFunctionsURL } from '@/lib/config'

// Types for API responses
export interface User {
  id: string
  uid: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  createdAt: string
  lastLoginAt?: string
  isActive: boolean
  profilePictureUrl?: string
  courseAccess: boolean
  stripeCustomerId?: string
}

export interface DashboardStats {
  userCount: number
  courseCount: number
  totalEnrollments: number
  totalRevenue: number
  activeUsers: number
  completedCourses: number
  averageCompletionRate: number
  monthlyGrowth: number
  lastUpdated: string
}

export interface UserStats {
  totalUsers: number
  activeUsers: number
  newUsersThisMonth: number
  students: number
  instructors: number
  admins: number
}

export interface Course {
  id: string
  title: string
  description: string
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED" | "PENDING_REVIEW"
  instructorId: string
  categoryId: string
  language: string
  slug?: string
  certificateEnabled: boolean
  createdAt: string
  updatedAt: string
  enrollmentCount: number
  completionRate: number
  instructor: {
    id: string
    firstName: string
    lastName: string
  }
  category: {
    id: string
    name: string
  }
}

export interface CourseStats {
  totalCourses: number
  publishedCourses: number
  draftCourses: number
  totalEnrollments: number
}

export interface Payment {
  id: string
  orderId: string
  userId: string
  courseId?: string
  amount: number
  currency: string
  status: 'completed' | 'pending' | 'failed' | 'refunded'
  paymentMethod: string
  transactionId: string
  createdAt: string
  updatedAt: string
  customerName: string
  customerEmail: string
  courseName?: string
  stripePaymentId?: string
}

export interface PaymentStats {
  totalRevenue: number
  monthlyRevenue: number
  pendingAmount: number
  refundedAmount: number
  totalTransactions: number
  successfulTransactions: number
  failedTransactions: number
  averageOrderValue: number
}

export interface PaymentFilters {
  status?: string
  search?: string
  dateRange?: string
}

export interface Enrollment {
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

export interface EnrollmentStats {
  totalEnrollments: number
  activeEnrollments: number
  completedEnrollments: number
  droppedEnrollments: number
  averageCompletionRate: number
  averageTimeToComplete: number
  certificatesIssued: number
  recentEnrollments: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  color: string
  icon: string
  courseCount: number
  enrollmentCount: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  parentId?: string
  children?: Category[]
}

export interface CategoryStats {
  totalCategories: number
  activeCategories: number
  totalCourses: number
  totalEnrollments: number
  topCategory: {
    name: string
    courses: number
  }
}

export interface CreateCategoryData {
  name: string
  description: string
  color: string
  icon: string
}

export interface SystemSettings {
  general: {
    siteName: string
    siteDescription: string
    siteUrl: string
    adminEmail: string
    timezone: string
    language: string
    maintenanceMode: boolean
  }
  email: {
    smtpHost: string
    smtpPort: string
    smtpUsername: string
    smtpPassword: string
    fromEmail: string
    fromName: string
    emailVerificationRequired: boolean
  }
  notifications: {
    enableEmailNotifications: boolean
    enablePushNotifications: boolean
    enableSMSNotifications: boolean
    newUserNotifications: boolean
    courseCompletionNotifications: boolean
    paymentNotifications: boolean
  }
  security: {
    requireTwoFactor: boolean
    passwordMinLength: number
    sessionTimeout: number
    maxLoginAttempts: number
    enableCaptcha: boolean
    allowedFileTypes: string[]
  }
  payments: {
    stripePublishableKey: string
    stripeSecretKey: string
    defaultCurrency: string
    enablePaypal: boolean
    paypalClientId: string
    paypalClientSecret: string
  }
  storage: {
    storageProvider: string
    awsAccessKey: string
    awsSecretKey: string
    s3BucketName: string
    s3Region: string
    maxFileSize: number
  }
}

export interface AnalyticsData {
  overview: {
    totalUsers: number
    activeUsers: number
    totalCourses: number
    completedCourses: number
    totalRevenue: number
    monthlyRevenue: number
    averageEngagement: number
    retentionRate: number
  }
  lastUpdated: string
  userGrowth: Array<{
    month: string
    newUsers: number
    activeUsers: number
  }>
  coursePerformance: Array<{
    courseId: string
    courseTitle: string
    enrollments: number
    completionRate: number
    rating: number
  }>
  revenueData: Array<{
    month: string
    revenue: number
    subscriptions: number
  }>
  topCategories: Array<{
    id: string
    name: string
    courses: number
    enrollments: number
    revenue: number
  }>
}

// API Error class
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message)
    this.name = 'APIError'
  }
}

// Centralized Admin API Client
class AdminAPIClient {
  private baseURL: string
  
  constructor() {
    this.baseURL = getFirebaseFunctionsURL()
  }

  async authenticatedRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!auth.currentUser) {
      throw new APIError('Authentication required - no user signed in', 401)
    }

    try {
      const token = await auth.currentUser.getIdToken()
      
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      if (!response.ok) {
        let errorMessage = `Request failed: ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch {
          // If JSON parsing fails, use status text
          errorMessage = response.statusText || errorMessage
        }
        
        throw new APIError(errorMessage, response.status)
      }

      return response.json()
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      
      // Handle network errors, token errors, etc.
      console.error('API request failed:', error)
      throw new APIError(
        error instanceof Error ? error.message : 'Unknown API error'
      )
    }
  }

  // Dashboard & Analytics Methods
  async getDashboardStats(): Promise<DashboardStats> {
    return this.authenticatedRequest('/api/admin/dashboard-stats')
  }

  async getPlatformAnalytics(): Promise<AnalyticsData> {
    const response = await this.authenticatedRequest<{ success: boolean; analytics: AnalyticsData }>('/api/admin/analytics')
    return response.analytics
  }

  // User Management Methods
  async getUsers(): Promise<User[]> {
    const response = await this.authenticatedRequest<{ success: boolean; users: User[] }>('/api/admin/users')
    return response.users || []
  }

  async getUserStats(): Promise<UserStats> {
    const response = await this.authenticatedRequest<{ success: boolean; stats: UserStats }>('/api/admin/user-stats')
    return response.stats
  }

  async updateUserRole(userId: string, role: UserRole): Promise<void> {
    return this.authenticatedRequest(`/api/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ newRole: role, reason: 'Admin dashboard update' })
    })
  }

  async deleteUser(userId: string): Promise<void> {
    return this.authenticatedRequest(`/api/admin/users/${userId}`, {
      method: 'DELETE'
    })
  }

  async toggleUserStatus(userId: string, isActive: boolean): Promise<void> {
    return this.authenticatedRequest(`/api/admin/users/${userId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ isActive })
    })
  }

  // Course Management Methods  
  async getCourses(): Promise<{ courses: Course[]; total: number }> {
    return this.authenticatedRequest('/api/admin/courses')
  }

  async getCourseStats(): Promise<CourseStats> {
    return this.authenticatedRequest('/api/admin/course-stats')
  }

  async deleteCourse(courseId: string): Promise<void> {
    return this.authenticatedRequest(`/api/admin/courses/${courseId}`, {
      method: 'DELETE'
    })
  }

  async publishCourse(courseId: string): Promise<void> {
    return this.authenticatedRequest(`/api/admin/courses/${courseId}/publish`, {
      method: 'PUT'
    })
  }

  // Payment Management Methods
  async getPayments(filters?: PaymentFilters): Promise<Payment[]> {
    const params = new URLSearchParams()
    if (filters?.status && filters.status !== 'all') params.append('status', filters.status)
    if (filters?.search) params.append('search', filters.search)
    if (filters?.dateRange && filters.dateRange !== 'all') params.append('dateRange', filters.dateRange)
    
    const queryString = params.toString()
    const endpoint = `/api/admin/payments${queryString ? `?${queryString}` : ''}`
    
    return this.authenticatedRequest(endpoint)
  }

  async getPaymentStats(): Promise<PaymentStats> {
    return this.authenticatedRequest('/api/admin/payment-stats')
  }

  // Enrollment Management Methods
  async getEnrollments(): Promise<Enrollment[]> {
    return this.authenticatedRequest('/api/admin/enrollments')
  }

  async getEnrollmentStats(): Promise<EnrollmentStats> {
    return this.authenticatedRequest('/api/admin/enrollment-stats')
  }

  // Category Management Methods
  async getCategories(): Promise<Category[]> {
    return this.authenticatedRequest('/api/admin/categories')
  }

  async getCategoryStats(): Promise<CategoryStats> {
    return this.authenticatedRequest('/api/admin/category-stats')
  }

  async createCategory(categoryData: CreateCategoryData): Promise<Category> {
    return this.authenticatedRequest('/api/admin/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData)
    })
  }

  async updateCategory(categoryId: string, categoryData: Partial<CreateCategoryData>): Promise<Category> {
    return this.authenticatedRequest(`/api/admin/categories/${categoryId}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData)
    })
  }

  async deleteCategory(categoryId: string): Promise<void> {
    return this.authenticatedRequest(`/api/admin/categories/${categoryId}`, {
      method: 'DELETE'
    })
  }

  // Settings Management Methods
  async getSystemSettings(): Promise<SystemSettings> {
    return this.authenticatedRequest('/api/admin/settings')
  }

  async updateSystemSettings(settings: SystemSettings): Promise<void> {
    return this.authenticatedRequest('/api/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings)
    })
  }

  // Health Check
  async healthCheck(): Promise<{ status: string; timestamp: string; service: string }> {
    return this.authenticatedRequest('/api/health')
  }
}

// Export singleton instance
export const adminAPI = new AdminAPIClient()