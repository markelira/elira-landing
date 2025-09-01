'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { Loader2 } from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

/**
 * Elira Course Platform Dashboard Layout - Foundation Layer
 * 
 * Enhanced layout with:
 * - Full-height left sidebar navigation
 * - Main content area for dashboard pages
 * - Responsive design and loading states
 * - Authentication integration
 */

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  // Authentication redirect logic
  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth')
    }
  }, [user, loading, router])

  // Loading state for authentication
  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-teal-600" />
          <p className="text-sm text-muted-foreground">Betöltés...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Left Sidebar Navigation */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0">
        <DashboardSidebar />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Content Container */}
        <div className="flex-1 overflow-auto">
          <div className="h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}