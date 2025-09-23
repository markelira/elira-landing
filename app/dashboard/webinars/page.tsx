'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useCourseAccess } from '@/hooks/useCourseAccess'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import {
  Video,
  Calendar,
  Clock,
  Users,
  ExternalLink,
  Trophy,
  Heart,
  Scissors,
  Bot,
  Play,
  CheckCircle,
  ArrowRight,
  Lock,
  ShoppingCart
} from 'lucide-react'

interface Webinar {
  id: string
  title: string
  description: string
  startDate: Date
  endDate: Date
  meetLink: string
  theme: {
    color: string
    bgColor: string
    icon: React.ComponentType<any>
    gradientFrom: string
    gradientTo: string
  }
  attendees?: number
  maxAttendees?: number
  status?: 'upcoming' | 'live' | 'completed'
}

export default function WebinarsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { hasAccess, loading: accessLoading, error: accessError } = useCourseAccess('ai-copywriting-course')
  const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming' | 'completed'>('all')

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  // No redirect - we'll show access denied message instead

  // Helper function to determine webinar status based on current date
  const getWebinarStatus = (startDate: Date, endDate: Date): 'upcoming' | 'live' | 'completed' => {
    const now = new Date()
    const currentTime = now.getTime()
    const startTime = startDate.getTime()
    const endTime = endDate.getTime()

    if (currentTime < startTime) {
      return 'upcoming'
    } else if (currentTime >= startTime && currentTime <= endTime) {
      return 'live'
    } else {
      return 'completed'
    }
  }

  const webinars: Webinar[] = [
    {
      id: '1',
      title: '7 napos győzelem protokoll',
      description: 'A masterclass tartalmát 7 nap alatt működő rendszerré alakítjuk',
      startDate: new Date(2025, 9, 6, 16, 30), // October 6, 2025, 16:30
      endDate: new Date(2025, 9, 6, 17, 30), // October 6, 2025, 17:30
      meetLink: 'https://meet.google.com/waf-gokr-vra',
      attendees: 8,
      maxAttendees: 10,
      theme: {
        color: 'text-amber-600',
        bgColor: 'bg-amber-100',
        icon: Trophy,
        gradientFrom: 'from-amber-500',
        gradientTo: 'to-yellow-500'
      }
    },
    {
      id: '2',
      title: 'Érzelmi értékesítés mesterfolyamat - webinár',
      description: 'A 7 pszichológiai trigger, ami minden vásárlási döntést irányít - és hogyan használd őket.',
      startDate: new Date(2025, 9, 14, 17, 0), // October 14, 2025, 17:00
      endDate: new Date(2025, 9, 14, 18, 0), // October 14, 2025, 18:00
      meetLink: 'https://meet.google.com/akt-eduq-iqu',
      attendees: 9,
      maxAttendees: 10,
      theme: {
        color: 'text-rose-600',
        bgColor: 'bg-rose-100',
        icon: Heart,
        gradientFrom: 'from-rose-500',
        gradientTo: 'to-pink-500'
      }
    },
    {
      id: '3',
      title: 'Élő copy boncolás webinár',
      description: 'A Ti marketing anyagaitokat elemezzük élőben és megmutatjuk, mit kell megváltoztatni több vevőért',
      startDate: new Date(2025, 9, 20, 16, 30), // October 20, 2025, 16:30
      endDate: new Date(2025, 9, 20, 17, 30), // October 20, 2025, 17:30
      meetLink: 'https://meet.google.com/isa-gpae-hzc',
      attendees: 10,
      maxAttendees: 10,
      theme: {
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        icon: Scissors,
        gradientFrom: 'from-purple-500',
        gradientTo: 'to-indigo-500'
      }
    },
    {
      id: '4',
      title: 'AI szöveg humanizáló webinár',
      description: 'Lépésről lépésre megmutatjuk, hogyan tedd hitelesé és eladhatóvá az AI által generált szövegeket',
      startDate: new Date(2025, 9, 21, 17, 0), // October 21, 2025, 17:00
      endDate: new Date(2025, 9, 21, 18, 0), // October 21, 2025, 18:00
      meetLink: 'https://meet.google.com/dqb-wduw-prc',
      attendees: 7,
      maxAttendees: 10,
      theme: {
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-100',
        icon: Bot,
        gradientFrom: 'from-emerald-500',
        gradientTo: 'to-teal-500'
      }
    }
  ]

  // Add status to each webinar based on current date
  const webinarsWithStatus = webinars.map(webinar => ({
    ...webinar,
    status: getWebinarStatus(webinar.startDate, webinar.endDate)
  }))

  const filteredWebinars = webinarsWithStatus.filter(webinar => {
    if (activeFilter === 'all') return true
    return webinar.status === activeFilter
  })

  const getStatusBadge = (status: Webinar['status']) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Közelgő</Badge>
      case 'live':
        return <Badge className="bg-red-100 text-red-700 border-red-200 animate-pulse">🔴 Élő</Badge>
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 border-green-200">✓ Befejezett</Badge>
      default:
        return null
    }
  }

  const handleJoinWebinar = (webinar: Webinar) => {
    // Open Google Meet link in new tab
    window.open(webinar.meetLink, '_blank', 'noopener,noreferrer')
  }

  // Show loading state while checking access
  if (accessLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50/90 via-white to-gray-50/70 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-teal-100/20 to-cyan-100/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-orange-100/20 to-amber-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="relative z-10 px-4 md:px-6 py-6 md:py-8">
          <div className="max-w-6xl mx-auto animate-pulse space-y-6">
            <div className="h-8 bg-white/40 rounded-2xl w-1/4"></div>
            <div className="h-32 bg-white/40 rounded-3xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-48 bg-white/40 rounded-3xl"></div>
              <div className="h-48 bg-white/40 rounded-3xl"></div>
              <div className="h-48 bg-white/40 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show access denied message if user doesn't have course access
  if (!accessLoading && hasAccess === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50/90 via-white to-gray-50/70 relative overflow-hidden">
        {/* Liquid Glass Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-teal-100/20 to-cyan-100/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-orange-100/20 to-amber-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Header */}
        <div className="relative z-10 px-4 md:px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-white/40 px-5 py-3 rounded-full shadow-lg shadow-gray-100/50 mb-6 hover:shadow-xl hover:bg-white/70 transition-all duration-300">
              <Video className="w-5 h-5 text-teal-600" />
              <span className="font-medium text-gray-900 tracking-tight">Webinárok</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
              Masterclass Webinárok
            </h1>
            <p className="text-lg text-gray-600">Csatlakozz az élő webinárjainkhoz vagy nézd újra a felvételeket</p>
          </div>
        </div>

        {/* Access Denied Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-8">
          <Card className="p-12 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
              <Lock className="w-12 h-12 text-amber-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
              Masterclass Hozzáférés Szükséges
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              A webinárok megtekintéséhez és részvételhez előbb meg kell vásárolnod a
              <strong className="text-gray-900"> Masterclass</strong> programot.
            </p>
            
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 mb-8 border border-teal-100">
              <h3 className="text-lg font-semibold text-teal-900 mb-3">Mit kapsz a masterclass programmal:</h3>
              <ul className="text-left text-teal-800 space-y-2 max-w-md mx-auto">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <span>Hozzáférés az összes webinárhoz</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <span>4×1 óra személyes mentorálás</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <span>Teljes masterclass tartalom</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <span>Élő közösségi támogatás</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push('/courses')}
                className="gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-2xl px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <ShoppingCart className="w-5 h-5" />
                Masterclass Megvásárlása
              </Button>
              
              <Button
                onClick={() => router.push('/dashboard')}
                variant="outline"
                className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-2xl px-8 py-4 transition-all duration-300"
              >
                <ArrowRight className="w-5 h-5" />
                Vissza a Dashboard-hoz
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/90 via-white to-gray-50/70 relative overflow-hidden">
      {/* Liquid Glass Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-teal-100/20 to-cyan-100/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-orange-100/20 to-amber-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Header */}
      <div className="relative z-10 px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-white/40 px-5 py-3 rounded-full shadow-lg shadow-gray-100/50 mb-6 hover:shadow-xl hover:bg-white/70 transition-all duration-300">
            <Video className="w-5 h-5 text-teal-600" />
            <span className="font-medium text-gray-900 tracking-tight">Webinárok</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
            Masterclass Webinárok
          </h1>
          <p className="text-lg text-gray-600">Csatlakozz az élő webinárjainkhoz vagy nézd újra a felvételeket</p>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-8">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-medium mb-1">Összes webinár</p>
                <p className="text-2xl font-bold text-gray-900">
                  {webinarsWithStatus.length}
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl flex items-center justify-center">
                <Video className="w-5 h-5 text-teal-600" />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-medium mb-1">Befejezett</p>
                <p className="text-2xl font-bold text-gray-900">
                  {webinarsWithStatus.filter(w => w.status === 'completed').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-medium mb-1">Közelgő</p>
                <p className="text-2xl font-bold text-gray-900">
                  {webinarsWithStatus.filter(w => w.status === 'upcoming').length}
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/60 shadow-lg p-1 mb-6">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveFilter('all')}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              Összes ({webinarsWithStatus.length})
            </button>
            <button
              onClick={() => setActiveFilter('upcoming')}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeFilter === 'upcoming'
                  ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              Közelgő ({webinarsWithStatus.filter(w => w.status === 'upcoming').length})
            </button>
            <button
              onClick={() => setActiveFilter('completed')}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeFilter === 'completed'
                  ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
              }`}
            >
              Befejezett ({webinarsWithStatus.filter(w => w.status === 'completed').length})
            </button>
          </div>
        </div>

        {/* Webinars List - Apple-like Design */}
        <div className="space-y-4">
          {filteredWebinars.map((webinar) => (
            <Card key={webinar.id} className="overflow-hidden bg-white/95 backdrop-blur-xl rounded-3xl border-0 shadow-sm hover:shadow-lg transition-all duration-500 group">
              <div className="flex">
                <div className={`w-32 h-32 bg-gradient-to-br ${webinar.theme.gradientFrom} ${webinar.theme.gradientTo} relative flex-shrink-0`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/25 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                      <webinar.theme.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors duration-300">
                      {webinar.title}
                    </h3>
                    <div className="ml-4">
                      {getStatusBadge(webinar.status)}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {webinar.description}
                  </p>

                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-gray-500" />
                      </div>
                      <span className="font-medium">
                        {webinar.startDate.toLocaleDateString('hu-HU', { 
                          month: 'long', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 text-gray-500" />
                      </div>
                      <span className="font-medium">
                        {webinar.startDate.toLocaleTimeString('hu-HU', { 
                          hour: '2-digit', 
                          minute: '2-digit'
                        })} - {webinar.endDate.toLocaleTimeString('hu-HU', { 
                          hour: '2-digit', 
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>

                  {webinar.status === 'live' ? (
                    <Button
                      onClick={() => handleJoinWebinar(webinar)}
                      className="gap-2 rounded-2xl font-medium py-3 px-6 transition-all duration-300 border-0 bg-red-500 hover:bg-red-600 text-white shadow-sm hover:shadow-md"
                    >
                      <Play className="w-4 h-4" />
                      Csatlakozás
                    </Button>
                  ) : webinar.status === 'upcoming' ? (
                    <div className="gap-2 rounded-2xl font-medium py-3 px-6 bg-blue-100 text-blue-700 border-0 shadow-sm cursor-default">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Közelgő
                    </div>
                  ) : (
                    <div className="gap-2 rounded-2xl font-medium py-3 px-6 bg-gray-100 text-gray-600 border-0 shadow-sm cursor-default">
                      <CheckCircle className="w-4 h-4 inline mr-2" />
                      Befejezett
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredWebinars.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Video className="w-10 h-10 text-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              Nincs webinár a szűrőnek megfelelően
            </h3>
            <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
              Próbálj másik szűrőt vagy nézd meg az összes webinárt.
            </p>
            <Button
              onClick={() => setActiveFilter('all')}
              className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-xl px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Összes webinár megtekintése
            </Button>
          </div>
        )}

      </div>
    </div>
  )
}