'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  Calendar,
  Clock,
  Video,
  CheckCircle,
  ArrowRight,
  User,
  MessageSquare,
  Target,
  Zap,
  Play,
  ExternalLink,
  Lock,
  ShoppingCart,
  BookOpen,
  TrendingUp
} from 'lucide-react'

interface MeetingSession {
  id: string
  title: string
  description: string
  focus: string
  theme: {
    color: string
    bgColor: string
    icon: React.ComponentType<any>
    gradientFrom: string
    gradientTo: string
  }
  duration: string
  type: '1:1'
}

export default function MeetingsPage() {
  const router = useRouter()
  const { user } = useAuth()

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  // Meeting sessions data with exact provided content
  const meetingSessions: MeetingSession[] = [
    {
      id: '1',
      title: 'Kész ügyfélmágnes rendszer (mi készítjük neked) – 1:1 Online meeting',
      description: 'Megmutatjuk, hogyan építsd fel a saját ügyfélmágnesed, ami folyamatosan hozza az érdeklődőket.',
      focus: 'Ügyfélmágnes építés, leadgenerálás, automatizálás',
      duration: '60 perc',
      type: '1:1',
      theme: {
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        icon: Target,
        gradientFrom: 'from-blue-500',
        gradientTo: 'to-indigo-500'
      }
    },
    {
      id: '2',
      title: 'Személyes Mentorálás – 1:1 Online meeting',
      description: 'Egyéni konzultáció szakértő mentorral, aki végigkísér minden lépésen és testre szabott visszajelzést ad.',
      focus: 'Személyes konzultáció, mentorálás, testre szabott feedback',
      duration: '60 perc',
      type: '1:1',
      theme: {
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-100',
        icon: MessageSquare,
        gradientFrom: 'from-emerald-500',
        gradientTo: 'to-teal-500'
      }
    },
    {
      id: '3',
      title: 'Hol veszíted el a vásárlókat - 1:1 Online Meeting',
      description: 'Kielemezzük a jelenlegi szövegeid - weboldal, hirdetések, emailek. Pontosan megmutatjuk, hol veszíted el a vásárlókat és hogyan írd át őket, hogy azonnal többet adjanak el.',
      focus: 'Szöveg elemzés, konverzió optimalizálás, vásárlói út',
      duration: '60 perc',
      type: '1:1',
      theme: {
        color: 'text-amber-600',
        bgColor: 'bg-amber-100',
        icon: TrendingUp,
        gradientFrom: 'from-amber-500',
        gradientTo: 'to-orange-500'
      }
    },
    {
      id: '4',
      title: 'Masterclass lezáró - 1:1 Online Meeting',
      description: 'Végigmegyünk minden modulon, kitöltjük hiányosságokat, és felépítjük a személyes cselekvési tervedet konkrét következő lépésekkel és azonnali győzelmekkel holnapra.',
      focus: 'Modul áttekintés, cselekvési terv, következő lépések',
      duration: '60 perc',
      type: '1:1',
      theme: {
        color: 'text-purple-600',
        bgColor: 'bg-purple-100',
        icon: CheckCircle,
        gradientFrom: 'from-purple-500',
        gradientTo: 'to-pink-500'
      }
    },
    {
      id: '5',
      title: '1:1 meeting a saját versenytársaid elemzéséhez',
      description: '48 órán belül feltérképezzük minden versenytársad összes hirdetését, árait, üzeneteit - és pontosan tudni fogod, mit csinálnak rosszul, amit te jobban tehetsz.',
      focus: 'Versenytárs elemzés, piaci pozíció, differenciálás',
      duration: '60 perc',
      type: '1:1',
      theme: {
        color: 'text-rose-600',
        bgColor: 'bg-rose-100',
        icon: Users,
        gradientFrom: 'from-rose-500',
        gradientTo: 'to-pink-500'
      }
    }
  ]


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/90 via-white to-gray-50/70 relative overflow-hidden">
      {/* Liquid Glass Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Header */}
      <div className="relative z-10 px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-white/40 px-5 py-3 rounded-full shadow-lg shadow-gray-100/50 mb-6 hover:shadow-xl hover:bg-white/70 transition-all duration-300">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900 tracking-tight">1:1 Meetingek</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
            Személyes Mentorálás
          </h1>
          <p className="text-lg text-gray-600">4×1 óra személyes mentorálás az AI copywriting mesterfolyamathoz</p>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-8">
        
        {/* Overview Info */}
        <Card className="p-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">5×1 Óra Személyes Mentorálás</h2>
              <p className="text-gray-600">Egyedi, személyre szabott copy stratégia és mentorálás Zolival (+1 bonus meeting)</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-blue-50 rounded-2xl p-4">
              <div className="text-2xl font-bold text-blue-900 mb-1">5</div>
              <div className="text-sm text-blue-700">Session összesen</div>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-4">
              <div className="text-2xl font-bold text-emerald-900 mb-1">60</div>
              <div className="text-sm text-emerald-700">Perc / session</div>
            </div>
            <div className="bg-purple-50 rounded-2xl p-4">
              <div className="text-2xl font-bold text-purple-900 mb-1">1:1</div>
              <div className="text-sm text-purple-700">Személyes mentorálás</div>
            </div>
          </div>
        </Card>

        {/* Meeting Sessions - Apple-like Design */}
        <div className="space-y-6">
          {meetingSessions.map((session) => (
            <Card key={session.id} className="overflow-hidden bg-white/95 backdrop-blur-xl rounded-3xl border-0 shadow-sm hover:shadow-lg transition-all duration-500 group">
              <div className="flex">
                <div className={`w-32 h-32 bg-gradient-to-br ${session.theme.gradientFrom} ${session.theme.gradientTo} relative flex-shrink-0`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/25 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                      <session.theme.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 leading-tight group-hover:text-gray-700 transition-colors duration-300">
                      {session.title}
                    </h3>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200 ml-4">
                      {session.duration}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {session.description}
                  </p>

                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Target className="w-4 h-4 text-gray-500" />
                      </div>
                      <span className="font-medium">{session.focus}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-500" />
                      </div>
                      <span className="font-medium">{session.type} mentorálás</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-4">
                    <p className="text-sm text-gray-700 text-center">
                      <strong>Időpont egyeztetés:</strong> A vásárlás után egyéni időpont egyeztetés következik
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl border border-blue-100 mt-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Hogyan működik?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-blue-800">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mb-3">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium mb-1">1. Megvásárlás</p>
                <p className="text-blue-600">Masterclass program megvásárlása</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mb-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium mb-1">2. Időpont egyeztetés</p>
                <p className="text-blue-600">Személyes időpontok megbeszélése</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <p className="font-medium mb-1">3. Mentorálás</p>
                <p className="text-blue-600">5×1 óra személyes session</p>
              </div>
            </div>
          </div>
        </Card>

      </div>
    </div>
  )
}