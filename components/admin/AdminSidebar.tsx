'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { 
  LayoutDashboard, 
  BookOpen, 
  Users,
  FolderKanban,
  Tags,
  BarChart3,
  UserCheck,
  Bell,
  CreditCard,
  GraduationCap,
  Settings,
  LogOut,
  Home,
  TrendingUp,
  Calendar,
  Phone,
  MessageCircle
} from 'lucide-react'


const adminNavItems = [
  { title: 'Admin Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { title: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { 
    title: 'Marketing Sebészet CRM', 
    href: '/admin/marketing-sebeszet', 
    icon: MessageCircle,
    badge: 'NEW'
  },
  { title: 'User Management', href: '/admin/users', icon: Users },
  { title: 'Course Management', href: '/admin/courses', icon: FolderKanban },
  { title: 'Enrollments', href: '/admin/enrollments', icon: GraduationCap },
  { title: 'Categories', href: '/admin/categories', icon: Tags },
  { title: 'Payment Management', href: '/admin/payments', icon: CreditCard },
  { title: 'Notifications', href: '/admin/notifications', icon: Bell },
  { title: 'System Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  
  const handleLogout = async () => {
    try {
      await logout()
      router.push('/auth')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="flex flex-col w-full h-screen bg-white border-r border-gray-200">
      {/* Header with Elira branding */}
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <Link href="/admin/dashboard" className="flex items-center space-x-3">
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image 
              src="/eliraicon.png" 
              alt="Elira logo" 
              fill
              className="object-contain rounded-full"
              sizes="32px"
              priority
            />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">
            Elira Admin
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {adminNavItems.map((item) => {
          const ItemIcon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors relative',
                isActive 
                  ? 'bg-teal-50 text-teal-700 border-r-2 border-teal-600' 
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <ItemIcon className={cn(
                'w-5 h-5 mr-3',
                isActive ? 'text-teal-600' : 'text-gray-500'
              )} />
              <span className="flex-1">{item.title}</span>
              {(item as any).badge && (
                <span className="ml-2 px-2 py-1 text-xs font-bold text-white bg-green-500 rounded-full">
                  {(item as any).badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User info and logout */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-teal-700">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500 truncate">
              Administrator
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Home className="w-4 h-4 mr-3" />
            Back to Dashboard
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}