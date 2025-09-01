// Admin-specific type definitions for backend integration
// This file contains types that are specifically used by admin dashboard components

import { UserRole } from './index'

// Re-export main types for convenience
export type { UserRole } from './index'

// Backend-aligned Admin User interface (extends base User)
export interface AdminUser {
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
  // Admin-specific fields
  emailVerified: boolean
  phoneNumber?: string
  metadata?: {
    source: 'google' | 'email' | 'manual'
    lastIpAddress?: string
    loginCount: number
    failedLoginAttempts: number
    lastFailedLoginAt?: string
  }
}

// Dashboard Statistics (real data from backend)
export interface AdminDashboardStats {
  userCount: number
  courseCount: number
  totalEnrollments: number
  totalRevenue: number
  activeUsers: number
  completedCourses: number
  averageCompletionRate: number
  monthlyGrowth: number
  lastUpdated: string
  // Additional metrics
  metrics: {
    userGrowthRate: number
    revenueGrowthRate: number
    courseCompletionTrend: number
    churnRate: number
  }
}

// User Statistics for admin dashboard
export interface AdminUserStats {
  totalUsers: number
  activeUsers: number
  newUsersThisMonth: number
  students: number
  instructors: number
  admins: number
  // Detailed breakdowns
  usersByMonth: Array<{
    month: string
    count: number
    newRegistrations: number
    activeUsers: number
  }>
  usersByRole: {
    [key in UserRole]: number
  }
  geographicDistribution?: Array<{
    country: string
    count: number
  }>
}

// Course Management Types
export interface AdminCourse {
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
  rating?: number
  // Nested objects
  instructor: {
    id: string
    firstName: string
    lastName: string
    email: string
    profilePictureUrl?: string
  }
  category: {
    id: string
    name: string
    slug: string
  }
  // Admin-specific fields
  metadata: {
    totalLessons: number
    totalDuration: number // in minutes
    avgLessonDuration: number
    lastActivity: string
    views: number
    revenue: number
  }
  pricing?: {
    price: number
    currency: string
    discountedPrice?: number
  }
}

export interface AdminCourseStats {
  totalCourses: number
  publishedCourses: number
  draftCourses: number
  archivedCourses: number
  pendingReviewCourses: number
  totalEnrollments: number
  averageRating: number
  // Performance metrics
  topPerformingCourses: Array<{
    id: string
    title: string
    enrollments: number
    revenue: number
    rating: number
  }>
  coursesByCategory: Array<{
    categoryId: string
    categoryName: string
    count: number
  }>
}

// Payment and Revenue Types
export interface AdminPayment {
  id: string
  orderId: string
  userId: string
  courseId?: string
  amount: number
  currency: string
  status: 'completed' | 'pending' | 'failed' | 'refunded' | 'disputed'
  paymentMethod: string
  transactionId: string
  createdAt: string
  updatedAt: string
  customerName: string
  customerEmail: string
  courseName?: string
  stripePaymentId?: string
  // Additional payment details
  paymentDetails: {
    processingFees: number
    netAmount: number
    refundedAmount?: number
    disputedAmount?: number
    paymentMethodDetails: {
      type: string
      last4?: string
      brand?: string
      country?: string
    }
  }
}

export interface AdminPaymentStats {
  totalRevenue: number
  monthlyRevenue: number
  pendingAmount: number
  refundedAmount: number
  disputedAmount: number
  totalTransactions: number
  successfulTransactions: number
  failedTransactions: number
  averageOrderValue: number
  // Advanced metrics
  revenueGrowth: {
    monthly: number
    quarterly: number
    yearly: number
  }
  paymentMethodBreakdown: Array<{
    method: string
    count: number
    percentage: number
    totalAmount: number
  }>
  geographicRevenue: Array<{
    country: string
    revenue: number
    transactionCount: number
  }>
}

// Enrollment Management Types
export interface AdminEnrollment {
  id: string
  userId: string
  courseId: string
  enrolledAt: string
  completedAt?: string
  progressPercentage: number
  status: 'active' | 'completed' | 'dropped' | 'pending' | 'suspended'
  lastAccessedAt?: string
  certificateIssued: boolean
  paymentStatus: 'paid' | 'pending' | 'failed' | 'refunded'
  // Nested user and course data
  user: {
    id: string
    firstName: string
    lastName: string
    email: string
    profilePictureUrl?: string
  }
  course: {
    id: string
    title: string
    instructor: string
    category: string
    price: number
  }
  // Progress tracking
  progressDetails: {
    lessonsCompleted: number
    totalLessons: number
    timeSpent: number // in minutes
    averageSessionDuration: number
    lastLessonCompleted?: string
    certificateIssuedAt?: string
  }
}

export interface AdminEnrollmentStats {
  totalEnrollments: number
  activeEnrollments: number
  completedEnrollments: number
  droppedEnrollments: number
  suspendedEnrollments: number
  averageCompletionRate: number
  averageTimeToComplete: number // in days
  certificatesIssued: number
  recentEnrollments: number
  // Advanced analytics
  enrollmentTrends: Array<{
    month: string
    enrollments: number
    completions: number
    dropouts: number
  }>
  completionRateByCategory: Array<{
    categoryId: string
    categoryName: string
    completionRate: number
  }>
}

// Category Management Types  
export interface AdminCategory {
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
  children?: AdminCategory[]
  // Admin-specific metrics
  metrics: {
    totalRevenue: number
    averageCoursePrice: number
    averageRating: number
    popularityScore: number
  }
}

export interface AdminCategoryStats {
  totalCategories: number
  activeCategories: number
  totalCourses: number
  totalEnrollments: number
  topCategory: {
    id: string
    name: string
    courses: number
    revenue: number
  }
  categoryPerformance: Array<{
    id: string
    name: string
    courses: number
    enrollments: number
    revenue: number
    averageRating: number
  }>
}

// Analytics and Reporting Types
export interface AdminAnalyticsData {
  overview: {
    totalUsers: number
    activeUsers: number
    totalCourses: number
    completedCourses: number
    totalRevenue: number
    monthlyRevenue: number
    averageEngagement: number
    retentionRate: number
    // Additional KPIs
    customerLifetimeValue: number
    churnRate: number
    coursesPerUser: number
    revenuePerUser: number
  }
  userGrowth: Array<{
    month: string
    newUsers: number
    activeUsers: number
    churnedUsers: number
  }>
  coursePerformance: Array<{
    courseId: string
    courseTitle: string
    enrollments: number
    completionRate: number
    rating: number
    revenue: number
  }>
  revenueData: Array<{
    month: string
    revenue: number
    subscriptions: number
    oneTimePayments: number
    averageOrderValue: number
  }>
  topCategories: Array<{
    id: string
    name: string
    courses: number
    enrollments: number
    revenue: number
    growthRate: number
  }>
  // Advanced analytics
  cohortAnalysis: Array<{
    cohort: string
    month1: number
    month2: number
    month3: number
    month6: number
    month12: number
  }>
  geographicDistribution: Array<{
    country: string
    users: number
    revenue: number
    topCourses: string[]
  }>
}

// System Settings Types
export interface AdminSystemSettings {
  general: {
    siteName: string
    siteDescription: string
    siteUrl: string
    adminEmail: string
    supportEmail: string
    timezone: string
    language: string
    maintenanceMode: boolean
    allowRegistration: boolean
    defaultUserRole: UserRole
  }
  email: {
    provider: 'smtp' | 'sendgrid' | 'mailgun'
    smtpHost?: string
    smtpPort?: string
    smtpUsername?: string
    smtpPassword?: string
    sendgridApiKey?: string
    mailgunApiKey?: string
    fromEmail: string
    fromName: string
    emailVerificationRequired: boolean
    emailTemplates: {
      welcome: string
      verification: string
      passwordReset: string
      courseCompleted: string
    }
  }
  notifications: {
    enableEmailNotifications: boolean
    enablePushNotifications: boolean
    enableSMSNotifications: boolean
    newUserNotifications: boolean
    courseCompletionNotifications: boolean
    paymentNotifications: boolean
    systemAlerts: boolean
    // Notification channels
    slackWebhookUrl?: string
    discordWebhookUrl?: string
  }
  security: {
    requireTwoFactor: boolean
    passwordMinLength: number
    passwordRequireUppercase: boolean
    passwordRequireNumbers: boolean
    passwordRequireSymbols: boolean
    sessionTimeout: number // in minutes
    maxLoginAttempts: number
    lockoutDuration: number // in minutes
    enableCaptcha: boolean
    allowedFileTypes: string[]
    maxFileSize: number // in MB
    corsAllowedOrigins: string[]
  }
  payments: {
    primaryProvider: 'stripe' | 'paypal'
    stripePublishableKey: string
    stripeSecretKey: string
    stripeWebhookSecret: string
    defaultCurrency: string
    enablePaypal: boolean
    paypalClientId: string
    paypalClientSecret: string
    taxSettings: {
      enableTax: boolean
      taxRate: number
      taxIncluded: boolean
    }
  }
  storage: {
    provider: 's3' | 'gcs' | 'azure' | 'local'
    // AWS S3
    awsAccessKey?: string
    awsSecretKey?: string
    s3BucketName?: string
    s3Region?: string
    // Google Cloud Storage
    gcsKeyFile?: string
    gcsBucketName?: string
    // Azure
    azureConnectionString?: string
    azureContainerName?: string
    // Common settings
    maxFileSize: number // in MB
    allowedMimeTypes: string[]
    cdnUrl?: string
  }
  integrations: {
    googleAnalyticsId?: string
    facebookPixelId?: string
    hotjarId?: string
    intercomAppId?: string
    zendeskSubdomain?: string
    // Learning Management
    zoomApiKey?: string
    zoomApiSecret?: string
    // Marketing
    mailchimpApiKey?: string
    klaviyoApiKey?: string
  }
}

// API Response Types
export interface APIResponse<T> {
  data: T
  success: boolean
  message?: string
  errors?: string[]
  meta?: {
    page?: number
    limit?: number
    total?: number
    totalPages?: number
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

// Filter and Search Types
export interface AdminUserFilters {
  role?: UserRole
  status?: 'active' | 'inactive' | 'suspended'
  search?: string
  dateRange?: {
    start: string
    end: string
  }
  country?: string
}

export interface AdminCourseFilters {
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'PENDING_REVIEW'
  categoryId?: string
  instructorId?: string
  search?: string
  priceRange?: {
    min: number
    max: number
  }
}

export interface AdminPaymentFilters {
  status?: 'completed' | 'pending' | 'failed' | 'refunded' | 'disputed'
  paymentMethod?: string
  search?: string
  dateRange?: {
    start: string
    end: string
  }
  amountRange?: {
    min: number
    max: number
  }
}

// Bulk Operations Types
export interface BulkUserOperation {
  userIds: string[]
  operation: 'activate' | 'deactivate' | 'delete' | 'changeRole' | 'sendEmail'
  parameters?: {
    newRole?: UserRole
    emailTemplate?: string
    customMessage?: string
  }
}

export interface BulkCourseOperation {
  courseIds: string[]
  operation: 'publish' | 'archive' | 'delete' | 'changeCategory' | 'updatePricing'
  parameters?: {
    newCategoryId?: string
    pricing?: {
      price: number
      currency: string
    }
  }
}

// Audit Log Types
export interface AdminAuditLog {
  id: string
  userId: string
  userEmail: string
  action: string
  resource: 'user' | 'course' | 'payment' | 'category' | 'settings'
  resourceId: string
  changes: {
    before?: any
    after?: any
  }
  ipAddress: string
  userAgent: string
  timestamp: string
  status: 'success' | 'failure'
  errorMessage?: string
}

// Export utility types
export type AdminResourceType = 'users' | 'courses' | 'payments' | 'enrollments' | 'categories' | 'settings'
export type AdminActionType = 'create' | 'read' | 'update' | 'delete' | 'bulk' | 'export'
export type AdminPermission = `${AdminResourceType}:${AdminActionType}`

// Error handling types
export interface AdminAPIError {
  message: string
  status?: number
  code?: string
  field?: string
  details?: any
}

export interface ValidationError {
  field: string
  message: string
  value: any
}