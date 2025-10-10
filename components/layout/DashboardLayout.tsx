'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { NotificationBell } from '@/components/NotificationBell'
import { Loader2, Menu, X } from 'lucide-react'
import Image from 'next/image'

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
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
            <Image
              src="/navbar-icon.png"
              alt="Elira"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <h1 className="font-semibold text-gray-900 dark:text-white">Elira</h1>
          </div>
          <NotificationBell />
        </div>
      </div>

      {/* Desktop Header Bar */}
      <div className="hidden md:block fixed top-0 right-0 left-64 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-end">
          <NotificationBell />
        </div>
      </div>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden md:flex w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0">
        <DashboardSidebar />
      </aside>

      {/* Mobile Sidebar - Drawer */}
      <aside className={`md:hidden fixed left-0 top-0 bottom-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <DashboardSidebar onNavigate={() => setSidebarOpen(false)} />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 md:ml-0">
        {/* Header spacers */}
        <div className="md:hidden h-16"></div>
        <div className="hidden md:block h-16"></div>

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