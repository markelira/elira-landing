'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { RoleGuard } from '@/lib/roleGuards'

export default function InstructorDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold leading-6 text-gray-900">
          Oktató Dashboard
        </h1>
        <p className="mt-2 max-w-4xl text-sm text-gray-500">
          Üdvözöljük, {user?.firstName}! Itt kezelheti kurzusait és nyomon követheti tanulói teljesítményét.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 flex items-center justify-center text-2xl">📚</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Aktív Kurzusok
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">3</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 flex items-center justify-center text-2xl">👥</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Összes Tanuló
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">127</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 flex items-center justify-center text-2xl">⭐</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Átlagos Értékelés
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">4.8</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 flex items-center justify-center text-2xl">💰</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Havi Bevétel
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">245.000 Ft</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Gyors Műveletek
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <a
              href="/instructor/courses"
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-teal-500 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-teal-50 text-teal-700 ring-4 ring-white">
                  <div className="w-6 h-6 flex items-center justify-center">📚</div>
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true"></span>
                  Kurzusok kezelése
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Kurzusok szerkesztése, új leckék hozzáadása
                </p>
              </div>
            </a>

            <a
              href="/instructor/students"
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-teal-500 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-700 ring-4 ring-white">
                  <div className="w-6 h-6 flex items-center justify-center">👥</div>
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true"></span>
                  Tanulók nyomon követése
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Tanulók haladásának megtekintése
                </p>
              </div>
            </a>

            <a
              href="/instructor/analytics"
              className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-teal-500 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div>
                <span className="rounded-lg inline-flex p-3 bg-purple-50 text-purple-700 ring-4 ring-white">
                  <div className="w-6 h-6 flex items-center justify-center">📈</div>
                </span>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-medium">
                  <span className="absolute inset-0" aria-hidden="true"></span>
                  Elemzések megtekintése
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Teljesítmény és bevétel statisztikák
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Legutóbbi Tevékenységek
          </h3>
          <div className="flow-root">
            <ul className="-mb-8">
              <li>
                <div className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                        <div className="w-4 h-4 text-white text-xs">✓</div>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Új tanuló csatlakozott az <span className="font-medium text-gray-900">AI Copywriting</span> kurzushoz
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        2 órája
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              
              <li>
                <div className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                        <div className="w-4 h-4 text-white text-xs">📝</div>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Új kérdés érkezett a <span className="font-medium text-gray-900">Q&A szekció</span>ban
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        4 órája
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              
              <li>
                <div className="relative">
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-yellow-500 flex items-center justify-center ring-8 ring-white">
                        <div className="w-4 h-4 text-white text-xs">⭐</div>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Új 5 csillagos értékelés érkezett
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        6 órája
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}