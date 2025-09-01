'use client'

import React, { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { UserRole, RolePermissions } from '@/types/index'
import { 
  hasRole, 
  hasPermission, 
  canAccessRoute, 
  getRoleDefaultRoute,
  logRoleDebug 
} from '@/lib/roleUtils'

interface RoleGuardProps {
  children: ReactNode
  requiredRole?: UserRole
  requiredPermission?: keyof RolePermissions
  fallback?: ReactNode
  redirectTo?: string
  showFallback?: boolean
}

interface RouteGuardProps {
  children: ReactNode
  allowedRoles?: UserRole[]
  redirectTo?: string
}

// Component-level role protection
export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  requiredRole,
  requiredPermission,
  fallback,
  redirectTo,
  showFallback = true
}) => {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!user) {
    if (redirectTo) {
      React.useEffect(() => {
        router.push(redirectTo)
      }, [router, redirectTo])
      return null
    }
    
    return showFallback ? (
      fallback || (
        <div className="text-center p-6">
          <p className="text-gray-600 mb-4">Bejelentkezés szükséges</p>
          <button 
            onClick={() => router.push('/auth')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Bejelentkezés
          </button>
        </div>
      )
    ) : null
  }

  const userRole = user.role

  // Check role requirement
  if (requiredRole && !hasRole(userRole, requiredRole)) {
    logRoleDebug(userRole, 'access denied - insufficient role', requiredRole as any)
    
    if (redirectTo) {
      React.useEffect(() => {
        router.push(redirectTo)
      }, [router, redirectTo])
      return null
    }
    
    return showFallback ? (
      fallback || (
        <div className="text-center p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-red-800 font-medium">Nincs hozzáférés</h3>
            <p className="text-red-600 text-sm mt-1">
              Ez a funkció csak {requiredRole === 'ADMIN' ? 'adminisztrátorok' : 'oktatók'} számára érhető el.
            </p>
          </div>
        </div>
      )
    ) : null
  }

  // Check permission requirement
  if (requiredPermission && !hasPermission(userRole, requiredPermission, user.permissions)) {
    logRoleDebug(userRole, 'access denied - insufficient permission', requiredPermission)
    
    if (redirectTo) {
      React.useEffect(() => {
        router.push(redirectTo)
      }, [router, redirectTo])
      return null
    }
    
    return showFallback ? (
      fallback || (
        <div className="text-center p-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-yellow-800 font-medium">Korlátozott hozzáférés</h3>
            <p className="text-yellow-600 text-sm mt-1">
              Nincs megfelelő jogosultságod ehhez a funkcióhoz.
            </p>
          </div>
        </div>
      )
    ) : null
  }

  return <>{children}</>
}

// Route-level protection
export const RouteGuard: React.FC<RouteGuardProps> = ({
  children,
  allowedRoles,
  redirectTo
}) => {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Redirect if not authenticated
  if (!user) {
    router.push('/auth')
    return null
  }

  // Check if user role is allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const defaultRoute = getRoleDefaultRoute(user.role)
    React.useEffect(() => {
      router.push(redirectTo || defaultRoute)
    }, [router, redirectTo, defaultRoute])
    return null
  }

  return <>{children}</>
}

// Higher-order component for role protection
export function withRoleProtection<T extends object>(
  WrappedComponent: React.ComponentType<T>,
  options: {
    requiredRole?: UserRole
    requiredPermission?: keyof RolePermissions
    redirectTo?: string
  } = {}
) {
  const ProtectedComponent: React.FC<T> = (props) => {
    return (
      <RoleGuard
        requiredRole={options.requiredRole}
        requiredPermission={options.requiredPermission}
        redirectTo={options.redirectTo}
      >
        <WrappedComponent {...props} />
      </RoleGuard>
    )
  }

  ProtectedComponent.displayName = `withRoleProtection(${WrappedComponent.displayName || WrappedComponent.name})`
  
  return ProtectedComponent
}

// Hook for role-based conditional rendering
export const useRoleAccess = () => {
  const { user } = useAuth()
  
  return {
    user,
    userRole: user?.role,
    hasRole: (requiredRole: UserRole) => user ? hasRole(user.role, requiredRole) : false,
    hasPermission: (permission: keyof RolePermissions) => 
      user ? hasPermission(user.role, permission, user.permissions) : false,
    canAccessRoute: (route: string) => user ? canAccessRoute(user.role, route) : false,
    isStudent: user?.role === 'STUDENT',
    isInstructor: user?.role === 'INSTRUCTOR',
    isAdmin: user?.role === 'ADMIN',
    canManageUsers: user ? hasPermission(user.role, 'canViewAllUsers', user.permissions) : false,
    canManageCourses: user ? (
      hasPermission(user.role, 'canCreateCourses', user.permissions) ||
      hasPermission(user.role, 'canEditAllCourses', user.permissions)
    ) : false,
    canViewAnalytics: user ? (
      hasPermission(user.role, 'canViewPlatformAnalytics', user.permissions) ||
      hasPermission(user.role, 'canViewOwnAnalytics', user.permissions)
    ) : false,
  }
}

// Component for conditional role-based rendering
interface RoleBasedRenderProps {
  role?: UserRole
  permission?: keyof RolePermissions
  minRole?: UserRole
  children: ReactNode
  fallback?: ReactNode
}

export const RoleBasedRender: React.FC<RoleBasedRenderProps> = ({
  role,
  permission,
  minRole,
  children,
  fallback = null
}) => {
  const { hasRole: checkRole, hasPermission: checkPermission, userRole } = useRoleAccess()

  // Check specific role
  if (role && userRole !== role) {
    return <>{fallback}</>
  }

  // Check minimum role level
  if (minRole && !checkRole(minRole)) {
    return <>{fallback}</>
  }

  // Check permission
  if (permission && !checkPermission(permission)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// Utility component for admin-only content
export const AdminOnly: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ 
  children, 
  fallback = null 
}) => {
  return (
    <RoleBasedRender role="ADMIN" fallback={fallback}>
      {children}
    </RoleBasedRender>
  )
}

// Utility component for instructor+ content
export const InstructorPlus: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ 
  children, 
  fallback = null 
}) => {
  return (
    <RoleBasedRender minRole="INSTRUCTOR" fallback={fallback}>
      {children}
    </RoleBasedRender>
  )
}

// Debug component for development
export const RoleDebug: React.FC = () => {
  const { user, userRole } = useRoleAccess()

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  if (!user) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-xs">
        🚫 Not authenticated
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-3 py-2 rounded text-xs">
      🔐 Role: {userRole} | User: {user.firstName}
    </div>
  )
}