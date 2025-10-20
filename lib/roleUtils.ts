import { UserRole, RolePermissions, RoleConfig } from '@/types/index'

// Role configuration with permissions and default routes
export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  STUDENT: {
    role: 'STUDENT',
    displayName: 'Diák',
    defaultRoute: '/dashboard',
    navigationItems: ['dashboard', 'learning', 'courses', 'payments', 'profile'],
    permissions: {
      // Course management
      canCreateCourses: false,
      canEditOwnCourses: false,
      canEditAllCourses: false,
      canDeleteCourses: false,
      canPublishCourses: false,
      
      // User management
      canViewAllUsers: false,
      canEditUserRoles: false,
      canDeactivateUsers: false,
      canDeleteUsers: false,
      
      // Analytics and reporting
      canViewOwnAnalytics: true,
      canViewPlatformAnalytics: false,
      canExportData: false,
      
      // Platform administration
      canModifyPlatformSettings: false,
      canManagePayments: false,
      canAccessAdminPanel: false,
      canManageCategories: false,
      canModerateContent: false,
    }
  },
  
  INSTRUCTOR: {
    role: 'INSTRUCTOR',
    displayName: 'Oktató',
    defaultRoute: '/instructor/dashboard',
    navigationItems: ['dashboard', 'courses', 'students', 'content', 'analytics', 'profile'],
    permissions: {
      // Course management
      canCreateCourses: true,
      canEditOwnCourses: true,
      canEditAllCourses: false,
      canDeleteCourses: false,
      canPublishCourses: true,
      
      // User management
      canViewAllUsers: false,
      canEditUserRoles: false,
      canDeactivateUsers: false,
      canDeleteUsers: false,
      
      // Analytics and reporting
      canViewOwnAnalytics: true,
      canViewPlatformAnalytics: false,
      canExportData: true,
      
      // Platform administration
      canModifyPlatformSettings: false,
      canManagePayments: false,
      canAccessAdminPanel: false,
      canManageCategories: false,
      canModerateContent: false,
    }
  },
  
  ADMIN: {
    role: 'ADMIN',
    displayName: 'Adminisztrátor',
    defaultRoute: '/admin/dashboard',
    navigationItems: ['dashboard', 'users', 'courses', 'analytics', 'payments', 'settings'],
    permissions: {
      // Course management
      canCreateCourses: true,
      canEditOwnCourses: true,
      canEditAllCourses: true,
      canDeleteCourses: true,
      canPublishCourses: true,
      
      // User management
      canViewAllUsers: true,
      canEditUserRoles: true,
      canDeactivateUsers: true,
      canDeleteUsers: true,
      
      // Analytics and reporting
      canViewOwnAnalytics: true,
      canViewPlatformAnalytics: true,
      canExportData: true,
      
      // Platform administration
      canModifyPlatformSettings: true,
      canManagePayments: true,
      canAccessAdminPanel: true,
      canManageCategories: true,
      canModerateContent: true,
    }
  },

  COMPANY_ADMIN: {
    role: 'COMPANY_ADMIN',
    displayName: 'Cégadmin',
    defaultRoute: '/company/dashboard',
    navigationItems: ['company-dashboard', 'employees', 'masterclasses', 'reports', 'profile'],
    permissions: {
      // Course management
      canCreateCourses: false,
      canEditOwnCourses: false,
      canEditAllCourses: false,
      canDeleteCourses: false,
      canPublishCourses: false,

      // User management
      canViewAllUsers: false,
      canEditUserRoles: false,
      canDeactivateUsers: false,
      canDeleteUsers: false,

      // Analytics and reporting
      canViewOwnAnalytics: true,
      canViewPlatformAnalytics: false,
      canExportData: true,

      // Platform administration
      canModifyPlatformSettings: false,
      canManagePayments: false,
      canAccessAdminPanel: false,
      canManageCategories: false,
      canModerateContent: false,
    }
  },

  COMPANY_EMPLOYEE: {
    role: 'COMPANY_EMPLOYEE',
    displayName: 'Alkalmazott',
    defaultRoute: '/employee/dashboard',
    navigationItems: ['employee-dashboard', 'my-courses', 'progress', 'profile'],
    permissions: {
      // Course management
      canCreateCourses: false,
      canEditOwnCourses: false,
      canEditAllCourses: false,
      canDeleteCourses: false,
      canPublishCourses: false,

      // User management
      canViewAllUsers: false,
      canEditUserRoles: false,
      canDeactivateUsers: false,
      canDeleteUsers: false,

      // Analytics and reporting
      canViewOwnAnalytics: true,
      canViewPlatformAnalytics: false,
      canExportData: false,

      // Platform administration
      canModifyPlatformSettings: false,
      canManagePayments: false,
      canAccessAdminPanel: false,
      canManageCategories: false,
      canModerateContent: false,
    }
  }
}

// Role checking utilities
export const hasRole = (userRole: UserRole, requiredRole: UserRole): boolean => {
  const roleHierarchy: Record<UserRole, number> = {
    STUDENT: 1,
    COMPANY_EMPLOYEE: 1,
    INSTRUCTOR: 2,
    COMPANY_ADMIN: 2,
    ADMIN: 3
  }

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

export const hasPermission = (
  userRole: UserRole, 
  permission: keyof RolePermissions,
  userPermissions?: RolePermissions
): boolean => {
  // Use custom permissions if provided, otherwise use role defaults
  const permissions = userPermissions || ROLE_CONFIGS[userRole].permissions
  return permissions[permission]
}

export const canAccessRoute = (userRole: UserRole, route: string): boolean => {
  // Define route access rules
  const routeAccess: Record<string, UserRole[]> = {
    // Individual user dashboard (STUDENT only)
    '/dashboard': ['STUDENT', 'INSTRUCTOR', 'ADMIN'],
    '/dashboard/learning': ['STUDENT', 'INSTRUCTOR', 'ADMIN'],
    '/dashboard/payments': ['STUDENT', 'INSTRUCTOR', 'ADMIN'],
    '/dashboard/profile': ['STUDENT', 'INSTRUCTOR', 'ADMIN'],
    '/courses': ['STUDENT', 'INSTRUCTOR', 'ADMIN', 'COMPANY_EMPLOYEE'],

    // Instructor routes
    '/instructor': ['INSTRUCTOR', 'ADMIN'],
    '/instructor/dashboard': ['INSTRUCTOR', 'ADMIN'],
    '/instructor/courses': ['INSTRUCTOR', 'ADMIN'],
    '/instructor/students': ['INSTRUCTOR', 'ADMIN'],
    '/instructor/content': ['INSTRUCTOR', 'ADMIN'],

    // Admin routes
    '/admin': ['ADMIN'],
    '/admin/dashboard': ['ADMIN'],
    '/admin/users': ['ADMIN'],
    '/admin/courses': ['ADMIN'],
    '/admin/analytics': ['ADMIN'],
    '/admin/payments': ['ADMIN'],
    '/admin/settings': ['ADMIN'],

    // Company routes
    '/company/dashboard': ['COMPANY_ADMIN'],
    '/company/employees': ['COMPANY_ADMIN'],
    '/company/masterclasses': ['COMPANY_ADMIN'],
    '/company/reports': ['COMPANY_ADMIN'],

    // Employee routes
    '/employee/dashboard': ['COMPANY_EMPLOYEE'],
    '/employee/my-courses': ['COMPANY_EMPLOYEE'],
    '/employee/progress': ['COMPANY_EMPLOYEE'],
  }

  // Check if route has specific access rules
  if (routeAccess[route]) {
    return routeAccess[route].includes(userRole)
  }

  // Check route patterns
  if (route.startsWith('/admin')) {
    return userRole === 'ADMIN'
  }

  if (route.startsWith('/instructor')) {
    return ['INSTRUCTOR', 'ADMIN'].includes(userRole)
  }

  if (route.startsWith('/company')) {
    return userRole === 'COMPANY_ADMIN'
  }

  if (route.startsWith('/employee')) {
    return userRole === 'COMPANY_EMPLOYEE'
  }

  // Dashboard routes - ONLY for STUDENT, INSTRUCTOR, ADMIN (NOT company users)
  if (route.startsWith('/dashboard')) {
    return ['STUDENT', 'INSTRUCTOR', 'ADMIN'].includes(userRole)
  }

  // Default to allowing access for unspecified routes
  return true
}

export const getRoleDisplayName = (role: UserRole): string => {
  return ROLE_CONFIGS[role].displayName
}

export const getRoleDefaultRoute = (role: UserRole): string => {
  return ROLE_CONFIGS[role].defaultRoute
}

export const getRolePermissions = (role: UserRole): RolePermissions => {
  return ROLE_CONFIGS[role].permissions
}

export const getAllRoles = (): UserRole[] => {
  return Object.keys(ROLE_CONFIGS) as UserRole[]
}

export const isValidRole = (role: string): role is UserRole => {
  return Object.keys(ROLE_CONFIGS).includes(role as UserRole)
}

// Navigation utilities
export const getRoleNavigationItems = (role: UserRole): string[] => {
  return ROLE_CONFIGS[role].navigationItems
}

export const shouldShowNavItem = (userRole: UserRole, navItem: string): boolean => {
  return getRoleNavigationItems(userRole).includes(navItem)
}

// Permission helpers for common checks
export const canManageUsers = (userRole: UserRole): boolean => {
  return hasPermission(userRole, 'canViewAllUsers')
}

export const canManageCourses = (userRole: UserRole): boolean => {
  return hasPermission(userRole, 'canCreateCourses') || 
         hasPermission(userRole, 'canEditAllCourses')
}

export const canViewAnalytics = (userRole: UserRole): boolean => {
  return hasPermission(userRole, 'canViewPlatformAnalytics') || 
         hasPermission(userRole, 'canViewOwnAnalytics')
}

export const canAccessAdminPanel = (userRole: UserRole): boolean => {
  return hasPermission(userRole, 'canAccessAdminPanel')
}

// Role transition utilities
export const canChangeRole = (currentRole: UserRole, targetRole: UserRole, actorRole: UserRole): boolean => {
  // Only admins can change roles
  if (actorRole !== 'ADMIN') {
    return false
  }
  
  // Prevent self-demotion from admin (safety measure)
  if (currentRole === 'ADMIN' && targetRole !== 'ADMIN') {
    return false // Would need additional confirmation in UI
  }
  
  return true
}

export const getRoleTransitionMessage = (fromRole: UserRole, toRole: UserRole): string => {
  const from = getRoleDisplayName(fromRole)
  const to = getRoleDisplayName(toRole)
  return `Szerepkör módosítása: ${from} → ${to}`
}

// Development helpers
export const logRoleDebug = (userRole: UserRole, action: string, permission?: keyof RolePermissions) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`🔐 [Role Debug] ${userRole} attempting ${action}`, {
      permission,
      hasPermission: permission ? hasPermission(userRole, permission) : 'N/A',
      config: ROLE_CONFIGS[userRole]
    })
  }
}