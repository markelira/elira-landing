'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { getRoleDefaultRoute } from '@/lib/roleUtils'

interface RoleBasedRedirectProps {
  fallbackRoute?: string
  redirectCondition?: (userRole: string, currentPath: string) => boolean
}

export function RoleBasedRedirect({ 
  fallbackRoute = '/dashboard', 
  redirectCondition 
}: RoleBasedRedirectProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading || !user) return

    const userRole = user.role
    const currentPath = window.location.pathname

    // Custom redirect condition
    if (redirectCondition && redirectCondition(userRole, currentPath)) {
      const defaultRoute = getRoleDefaultRoute(userRole)
      if (currentPath !== defaultRoute) {
        console.log(`🔄 [RoleBasedRedirect] Redirecting ${userRole} from ${currentPath} to ${defaultRoute}`)
        router.replace(defaultRoute)
      }
      return
    }

    // Default role-based redirects
    const shouldRedirect = (
      // Redirect admins from general dashboard to admin dashboard
      (userRole === 'ADMIN' && currentPath === '/dashboard') ||
      // Redirect instructors from general dashboard to instructor dashboard  
      (userRole === 'INSTRUCTOR' && currentPath === '/dashboard')
    )

    if (shouldRedirect) {
      const defaultRoute = getRoleDefaultRoute(userRole)
      console.log(`🔄 [RoleBasedRedirect] Redirecting ${userRole} from ${currentPath} to ${defaultRoute}`)
      router.replace(defaultRoute)
    }
  }, [user, loading, router, redirectCondition])

  return null
}

// Component for automatic role-based dashboard redirection
export function DashboardRoleRedirect() {
  return (
    <RoleBasedRedirect
      redirectCondition={(userRole, currentPath) => {
        // Only redirect if on base dashboard
        return currentPath === '/dashboard' && userRole !== 'STUDENT'
      }}
    />
  )
}