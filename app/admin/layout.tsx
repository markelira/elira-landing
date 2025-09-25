'use client'

import React from 'react'
import { RouteGuard } from '@/lib/roleGuards'
import { AdminSidebar } from '@/components/admin/AdminSidebar'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <RouteGuard allowedRoles={['ADMIN']}>
      <div className="flex min-h-screen bg-gray-50">
        {/* Admin Sidebar - Desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64">
            <AdminSidebar />
          </div>
        </div>
        
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
            <div className="text-sm text-gray-500">
              Admin Dashboard
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none pt-16 lg:pt-0 pb-20 lg:pb-0">
            <div className="py-6 px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
        
        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
          <div className="grid grid-cols-5 gap-1 px-2 py-2">
            <a 
              href="/admin/dashboard" 
              className="flex flex-col items-center py-2 px-1 text-xs text-gray-600 hover:text-teal-600"
            >
              <div className="w-6 h-6 mb-1 flex items-center justify-center">📊</div>
              Dashboard
            </a>
            <a 
              href="/admin/marketing-sebeszet" 
              className="flex flex-col items-center py-2 px-1 text-xs text-gray-600 hover:text-teal-600 relative"
            >
              <div className="w-6 h-6 mb-1 flex items-center justify-center">💬</div>
              CRM
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
            </a>
            <a 
              href="/admin/users" 
              className="flex flex-col items-center py-2 px-1 text-xs text-gray-600 hover:text-teal-600"
            >
              <div className="w-6 h-6 mb-1 flex items-center justify-center">👥</div>
              Users
            </a>
            <a 
              href="/admin/courses" 
              className="flex flex-col items-center py-2 px-1 text-xs text-gray-600 hover:text-teal-600"
            >
              <div className="w-6 h-6 mb-1 flex items-center justify-center">📚</div>
              Courses
            </a>
            <a 
              href="/admin/settings" 
              className="flex flex-col items-center py-2 px-1 text-xs text-gray-600 hover:text-teal-600"
            >
              <div className="w-6 h-6 mb-1 flex items-center justify-center">⚙️</div>
              Settings
            </a>
          </div>
        </div>
      </div>
    </RouteGuard>
  )
}