'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  Calendar,
  Target,
  User,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  ShoppingCart
} from 'lucide-react'

interface MeetingSession {
  id: string
  title: string
  description: string
  focus: string
  theme: {
    icon: React.ComponentType<any>
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

  // Meeting sessions data
  const meetingSessions: MeetingSession[] = [
    {
      id: '1',
      title: 'Kész ügyfélmágnes rendszer (mi készítjük neked) – 1:1 Online meeting',
      description: 'Megmutatjuk, hogyan építsd fel a saját ügyfélmágnesed, ami folyamatosan hozza az érdeklődőket.',
      focus: 'Ügyfélmágnes építés, leadgenerálás, automatizálás',
      duration: '60 perc',
      type: '1:1',
      theme: {
        icon: Target
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
        icon: MessageSquare
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
        icon: TrendingUp
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
        icon: CheckCircle
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
        icon: Users
      }
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Header */}
          <div className="border-b border-gray-200 pb-6">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              1:1 Meetingek
            </h1>
            <p className="text-base text-gray-600">
              Személyes mentorálás az AI copywriting mesterfolyamathoz
            </p>
          </div>

          {/* Overview Card */}
          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-gray-700" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  5×1 Óra Személyes Mentorálás
                </h2>
                <p className="text-sm text-gray-600">
                  Egyedi, személyre szabott copy stratégia és mentorálás Zolival (+1 bonus meeting)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
                <div className="text-2xl font-semibold text-gray-900 mb-1">5</div>
                <div className="text-sm text-gray-600">Session összesen</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
                <div className="text-2xl font-semibold text-gray-900 mb-1">60</div>
                <div className="text-sm text-gray-600">Perc / session</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100">
                <div className="text-2xl font-semibold text-gray-900 mb-1">1:1</div>
                <div className="text-sm text-gray-600">Személyes mentorálás</div>
              </div>
            </div>
          </Card>

          {/* Meeting Sessions */}
          <div className="space-y-4">
            {meetingSessions.map((session) => (
              <Card key={session.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <session.theme.icon className="w-6 h-6 text-gray-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                          {session.title}
                        </h3>
                        <Badge className="bg-gray-100 text-gray-700 border-gray-200 flex-shrink-0">
                          {session.duration}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {session.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Target className="w-4 h-4 text-gray-500" />
                      <span>{session.focus}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{session.type} mentorálás</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <p className="text-sm text-gray-700 text-center">
                      <span className="font-medium">Időpont egyeztetés:</span> A vásárlás után egyéni időpont egyeztetés következik
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* How It Works */}
          <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Hogyan működik?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  <ShoppingCart className="w-6 h-6 text-gray-700" />
                </div>
                <p className="font-medium text-gray-900 mb-1">1. Megvásárlás</p>
                <p className="text-sm text-gray-600">Masterclass program megvásárlása</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  <Calendar className="w-6 h-6 text-gray-700" />
                </div>
                <p className="font-medium text-gray-900 mb-1">2. Időpont egyeztetés</p>
                <p className="text-sm text-gray-600">Személyes időpontok megbeszélése</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-gray-700" />
                </div>
                <p className="font-medium text-gray-900 mb-1">3. Mentorálás</p>
                <p className="text-sm text-gray-600">5×1 óra személyes session</p>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  )
}
