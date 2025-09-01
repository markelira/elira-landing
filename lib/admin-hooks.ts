'use client'

import { useQuery, useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { adminAPI, APIError } from './admin-api'
import { toast } from 'sonner'
import { UserRole } from '@/types/index'
// Simplified imports - use existing types for now
import type {
  User,
  DashboardStats,
  UserStats,
  Course,
  CourseStats,
  Payment,
  PaymentStats,
  Enrollment,
  EnrollmentStats,
  Category,
  CategoryStats,
  AnalyticsData,
  SystemSettings,
  CreateCategoryData,
  PaymentFilters
} from '@/lib/admin-api'

// Query key constants for consistency
export const ADMIN_QUERY_KEYS = {
  DASHBOARD_STATS: ['admin', 'dashboard-stats'],
  ANALYTICS: ['admin', 'analytics'],
  USERS: ['admin', 'users'],
  USER_STATS: ['admin', 'user-stats'],
  COURSES: ['admin', 'courses'],
  COURSE_STATS: ['admin', 'course-stats'],
  PAYMENTS: ['admin', 'payments'],
  PAYMENT_STATS: ['admin', 'payment-stats'],
  ENROLLMENTS: ['admin', 'enrollments'],
  ENROLLMENT_STATS: ['admin', 'enrollment-stats'],
  CATEGORIES: ['admin', 'categories'],
  CATEGORY_STATS: ['admin', 'category-stats'],
  SETTINGS: ['admin', 'settings'],
} as const

// Cache timing constants (in milliseconds)
export const CACHE_TIMES = {
  FAST_CHANGING: 1 * 60 * 1000,      // 1 minute (user activity, payments)
  MODERATE: 5 * 60 * 1000,           // 5 minutes (courses, enrollments)
  SLOW_CHANGING: 15 * 60 * 1000,     // 15 minutes (analytics, categories)
  STATIC: 60 * 60 * 1000,            // 1 hour (settings, system config)
} as const

// Error handling utility
function handleError(error: unknown, defaultMessage: string): never {
  console.error('Admin API Error:', error)
  
  if (error instanceof APIError) {
    toast.error(error.message)
    throw error
  }
  
  if (error instanceof Error) {
    toast.error(error.message)
    throw new APIError(error.message)
  }
  
  toast.error(defaultMessage)
  throw new APIError(defaultMessage)
}

// Success handler utility  
function handleSuccess(message: string, queryClient: any, queryKeys: (readonly string[])[]) {
  toast.success(message)
  queryKeys.forEach(key => {
    queryClient.invalidateQueries({ queryKey: [...key] })
  })
}

// ==============================
// DASHBOARD & ANALYTICS HOOKS
// ==============================

export function useAdminDashboardStats(): UseQueryResult<DashboardStats, APIError> {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.DASHBOARD_STATS,
    queryFn: () => adminAPI.getDashboardStats(),
    staleTime: CACHE_TIMES.FAST_CHANGING,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    meta: {
      errorMessage: 'Failed to load dashboard statistics'
    }
  })
}

export function useAdminAnalytics(): UseQueryResult<AnalyticsData, APIError> {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.ANALYTICS,
    queryFn: () => adminAPI.getPlatformAnalytics(),
    staleTime: CACHE_TIMES.SLOW_CHANGING,
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    meta: {
      errorMessage: 'Failed to load platform analytics'
    }
  })
}

// ==============================
// USER MANAGEMENT HOOKS
// ==============================

export function useAdminUsers(): UseQueryResult<User[], APIError> {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.USERS,
    queryFn: () => adminAPI.getUsers(),
    staleTime: CACHE_TIMES.FAST_CHANGING,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    meta: {
      errorMessage: 'Failed to load users'
    }
  })
}

export function useAdminUserStats(): UseQueryResult<UserStats, APIError> {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.USER_STATS,
    queryFn: () => adminAPI.getUserStats(),
    staleTime: CACHE_TIMES.MODERATE,
    retry: 2,
    meta: {
      errorMessage: 'Failed to load user statistics'
    }
  })
}

export function useUpdateUserRole() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ userId, role }: { userId: string, role: UserRole }) => 
      adminAPI.updateUserRole(userId, role),
    onSuccess: () => {
      handleSuccess(
        'User role updated successfully',
        queryClient,
        [ADMIN_QUERY_KEYS.USERS, ADMIN_QUERY_KEYS.USER_STATS, ADMIN_QUERY_KEYS.DASHBOARD_STATS]
      )
    },
    onError: (error) => {
      handleError(error, 'Failed to update user role')
    },
    meta: {
      successMessage: 'User role updated successfully'
    }
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (userId: string) => adminAPI.deleteUser(userId),
    onSuccess: () => {
      handleSuccess(
        'User deleted successfully',
        queryClient,
        [ADMIN_QUERY_KEYS.USERS, ADMIN_QUERY_KEYS.USER_STATS, ADMIN_QUERY_KEYS.DASHBOARD_STATS]
      )
    },
    onError: (error) => {
      handleError(error, 'Failed to delete user')
    }
  })
}

export function useToggleUserStatus() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ userId, isActive }: { userId: string, isActive: boolean }) => 
      adminAPI.toggleUserStatus(userId, isActive),
    onSuccess: (_, variables) => {
      const message = variables.isActive ? 'User activated successfully' : 'User deactivated successfully'
      handleSuccess(
        message,
        queryClient,
        [ADMIN_QUERY_KEYS.USERS, ADMIN_QUERY_KEYS.USER_STATS]
      )
    },
    onError: (error) => {
      handleError(error, 'Failed to update user status')
    }
  })
}

// ==============================
// COURSE MANAGEMENT HOOKS
// ==============================

export function useAdminCourses(): UseQueryResult<{ courses: Course[]; total: number }, APIError> {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.COURSES,
    queryFn: () => adminAPI.getCourses(),
    staleTime: CACHE_TIMES.MODERATE,
    retry: 2,
    meta: {
      errorMessage: 'Failed to load courses'
    }
  })
}

export function useAdminCourseStats(): UseQueryResult<CourseStats, APIError> {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.COURSE_STATS,
    queryFn: () => adminAPI.getCourseStats(),
    staleTime: CACHE_TIMES.MODERATE,
    retry: 2,
    meta: {
      errorMessage: 'Failed to load course statistics'
    }
  })
}

export function useDeleteCourse() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (courseId: string) => adminAPI.deleteCourse(courseId),
    onSuccess: () => {
      handleSuccess(
        'Course deleted successfully',
        queryClient,
        [ADMIN_QUERY_KEYS.COURSES, ADMIN_QUERY_KEYS.COURSE_STATS, ADMIN_QUERY_KEYS.DASHBOARD_STATS]
      )
    },
    onError: (error) => {
      handleError(error, 'Failed to delete course')
    }
  })
}

export function usePublishCourse() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (courseId: string) => adminAPI.publishCourse(courseId),
    onSuccess: () => {
      handleSuccess(
        'Course published successfully',
        queryClient,
        [ADMIN_QUERY_KEYS.COURSES, ADMIN_QUERY_KEYS.COURSE_STATS, ADMIN_QUERY_KEYS.DASHBOARD_STATS]
      )
    },
    onError: (error) => {
      handleError(error, 'Failed to publish course')
    }
  })
}

// ==============================
// PAYMENT MANAGEMENT HOOKS
// ==============================

export function useAdminPayments(filters?: PaymentFilters): UseQueryResult<Payment[], APIError> {
  return useQuery({
    queryKey: [...ADMIN_QUERY_KEYS.PAYMENTS, filters || {}],
    queryFn: () => adminAPI.getPayments(filters),
    staleTime: CACHE_TIMES.FAST_CHANGING,
    retry: 3,
    enabled: true,
    meta: {
      errorMessage: 'Failed to load payments'
    }
  })
}

export function useAdminPaymentStats(): UseQueryResult<PaymentStats, APIError> {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.PAYMENT_STATS,
    queryFn: () => adminAPI.getPaymentStats(),
    staleTime: CACHE_TIMES.FAST_CHANGING,
    retry: 2,
    meta: {
      errorMessage: 'Failed to load payment statistics'
    }
  })
}

// ==============================
// ENROLLMENT MANAGEMENT HOOKS
// ==============================

export function useAdminEnrollments(): UseQueryResult<Enrollment[], APIError> {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.ENROLLMENTS,
    queryFn: () => adminAPI.getEnrollments(),
    staleTime: CACHE_TIMES.MODERATE,
    retry: 2,
    meta: {
      errorMessage: 'Failed to load enrollments'
    }
  })
}

export function useAdminEnrollmentStats(): UseQueryResult<EnrollmentStats, APIError> {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.ENROLLMENT_STATS,
    queryFn: () => adminAPI.getEnrollmentStats(),
    staleTime: CACHE_TIMES.MODERATE,
    retry: 2,
    meta: {
      errorMessage: 'Failed to load enrollment statistics'
    }
  })
}

// ==============================
// CATEGORY MANAGEMENT HOOKS
// ==============================

export function useAdminCategories(): UseQueryResult<Category[], APIError> {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.CATEGORIES,
    queryFn: () => adminAPI.getCategories(),
    staleTime: CACHE_TIMES.SLOW_CHANGING,
    retry: 2,
    meta: {
      errorMessage: 'Failed to load categories'
    }
  })
}

export function useAdminCategoryStats(): UseQueryResult<CategoryStats, APIError> {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.CATEGORY_STATS,
    queryFn: () => adminAPI.getCategoryStats(),
    staleTime: CACHE_TIMES.SLOW_CHANGING,
    retry: 2,
    meta: {
      errorMessage: 'Failed to load category statistics'
    }
  })
}

export function useCreateCategory() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (categoryData: CreateCategoryData) => adminAPI.createCategory(categoryData),
    onSuccess: () => {
      handleSuccess(
        'Category created successfully',
        queryClient,
        [ADMIN_QUERY_KEYS.CATEGORIES, ADMIN_QUERY_KEYS.CATEGORY_STATS]
      )
    },
    onError: (error) => {
      handleError(error, 'Failed to create category')
    }
  })
}

export function useUpdateCategory() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ categoryId, categoryData }: { categoryId: string, categoryData: Partial<CreateCategoryData> }) => 
      adminAPI.updateCategory(categoryId, categoryData),
    onSuccess: () => {
      handleSuccess(
        'Category updated successfully',
        queryClient,
        [ADMIN_QUERY_KEYS.CATEGORIES, ADMIN_QUERY_KEYS.CATEGORY_STATS]
      )
    },
    onError: (error) => {
      handleError(error, 'Failed to update category')
    }
  })
}

export function useDeleteCategory() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (categoryId: string) => adminAPI.deleteCategory(categoryId),
    onSuccess: () => {
      handleSuccess(
        'Category deleted successfully',
        queryClient,
        [ADMIN_QUERY_KEYS.CATEGORIES, ADMIN_QUERY_KEYS.CATEGORY_STATS]
      )
    },
    onError: (error) => {
      handleError(error, 'Failed to delete category')
    }
  })
}

// ==============================
// SETTINGS MANAGEMENT HOOKS
// ==============================

export function useAdminSettings(): UseQueryResult<SystemSettings, APIError> {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.SETTINGS,
    queryFn: () => adminAPI.getSystemSettings(),
    staleTime: CACHE_TIMES.STATIC,
    retry: 1,
    meta: {
      errorMessage: 'Failed to load system settings'
    }
  })
}

export function useUpdateSettings() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (settings: SystemSettings) => adminAPI.updateSystemSettings(settings),
    onSuccess: () => {
      handleSuccess(
        'Settings updated successfully',
        queryClient,
        [ADMIN_QUERY_KEYS.SETTINGS]
      )
    },
    onError: (error) => {
      handleError(error, 'Failed to update settings')
    }
  })
}

// ==============================
// UTILITY HOOKS
// ==============================

// Health check hook for monitoring system status
export function useAdminHealthCheck() {
  return useQuery({
    queryKey: ['admin', 'health'],
    queryFn: () => adminAPI.healthCheck(),
    staleTime: 30 * 1000, // 30 seconds
    retry: 1,
    refetchInterval: 5 * 60 * 1000, // Check every 5 minutes
    meta: {
      errorMessage: 'Failed to check system health'
    }
  })
}

// Generic refresh hook for invalidating all admin queries
export function useRefreshAdminData() {
  const queryClient = useQueryClient()
  
  return () => {
    Object.values(ADMIN_QUERY_KEYS).forEach(queryKey => {
      queryClient.invalidateQueries({ queryKey })
    })
    toast.success('Data refreshed successfully')
  }
}

// Hook for getting loading state across multiple queries
export function useAdminLoadingState(queryKeys: readonly string[][]) {
  const queryClient = useQueryClient()
  
  const isLoading = queryKeys.some(queryKey => {
    const queryState = queryClient.getQueryState([...queryKey])
    return queryState?.status === 'pending'
  })
  
  return isLoading
}

// Hook for error state management  
export function useAdminErrorHandler() {
  return {
    handleError: (error: unknown, context: string) => {
      console.error(`Admin Error [${context}]:`, error)
      
      if (error instanceof APIError) {
        toast.error(`${context}: ${error.message}`)
        return error
      }
      
      if (error instanceof Error) {
        toast.error(`${context}: ${error.message}`)
        return new APIError(error.message)
      }
      
      toast.error(`${context}: Unknown error occurred`)
      return new APIError('Unknown error occurred')
    },
    
    clearErrors: () => {
      // Could integrate with error boundary or global error state
      toast.dismiss()
    }
  }
}

// Export types for external use
export type {
  User,
  DashboardStats,
  UserStats,
  Course,
  CourseStats,
  Payment,
  PaymentStats,
  Enrollment,
  EnrollmentStats,
  Category,
  CategoryStats,
  AnalyticsData,
  SystemSettings,
  CreateCategoryData,
  PaymentFilters
} from '@/lib/admin-api'