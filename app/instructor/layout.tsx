'use client'

import React from 'react'
import { RouteGuard } from '@/lib/roleGuards'

interface InstructorLayoutProps {
  children: React.ReactNode
}

export default function InstructorLayout({ children }: InstructorLayoutProps) {
  return (
    <RouteGuard allowedRoles={['INSTRUCTOR', 'ADMIN']}>
      <div className="flex min-h-screen bg-gray-50">
        {/* Instructor Sidebar - Desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64 bg-white border-r border-gray-200">
            <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h2 className="text-lg font-semibold text-gray-900">Oktató Panel</h2>
              </div>
              
              <nav className="mt-5 flex-1 px-2 space-y-1">
                <a 
                  href="/instructor/dashboard"
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <div className="mr-3 h-6 w-6 flex items-center justify-center">📊</div>
                  Dashboard
                </a>
                
                <a 
                  href="/instructor/courses"
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <div className="mr-3 h-6 w-6 flex items-center justify-center">📚</div>
                  Kurzusaim
                </a>
                
                <a 
                  href="/instructor/students"
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <div className="mr-3 h-6 w-6 flex items-center justify-center">👥</div>
                  Tanulók
                </a>
                
                <a 
                  href="/instructor/content"
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <div className="mr-3 h-6 w-6 flex items-center justify-center">✏️</div>
                  Tartalom
                </a>
                
                <a 
                  href="/instructor/analytics"
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <div className="mr-3 h-6 w-6 flex items-center justify-center">📈</div>
                  Elemzések
                </a>
                
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <a 
                    href="/dashboard"
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <div className="mr-3 h-6 w-6 flex items-center justify-center">🎓</div>
                    Diák Nézet
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
        
        {/* Mobile Header */}
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">Oktató Panel</h1>
            <div className="text-sm text-gray-500">
              Instructor Dashboard
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
              href="/instructor/dashboard" 
              className="flex flex-col items-center py-2 px-1 text-xs text-gray-600 hover:text-teal-600"
            >
              <div className="w-6 h-6 mb-1 flex items-center justify-center">📊</div>
              Dashboard
            </a>
            <a 
              href="/instructor/courses" 
              className="flex flex-col items-center py-2 px-1 text-xs text-gray-600 hover:text-teal-600"
            >
              <div className="w-6 h-6 mb-1 flex items-center justify-center">📚</div>
              Kurzusok
            </a>
            <a 
              href="/instructor/students" 
              className="flex flex-col items-center py-2 px-1 text-xs text-gray-600 hover:text-teal-600"
            >
              <div className="w-6 h-6 mb-1 flex items-center justify-center">👥</div>
              Tanulók
            </a>
            <a 
              href="/instructor/content" 
              className="flex flex-col items-center py-2 px-1 text-xs text-gray-600 hover:text-teal-600"
            >
              <div className="w-6 h-6 mb-1 flex items-center justify-center">✏️</div>
              Tartalom
            </a>
            <a 
              href="/instructor/analytics" 
              className="flex flex-col items-center py-2 px-1 text-xs text-gray-600 hover:text-teal-600"
            >
              <div className="w-6 h-6 mb-1 flex items-center justify-center">📈</div>
              Elemzés
            </a>
          </div>
        </div>
      </div>
    </RouteGuard>
  )
}