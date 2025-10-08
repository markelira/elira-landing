'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Circle, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';

interface Week {
  number: number;
  title: string;
  startDay: number;
  endDay: number;
}

const PROGRAM_WEEKS: Week[] = [
  { number: 1, title: 'Kutatási alapok', startDay: 1, endDay: 7 },
  { number: 2, title: 'Buyer Personák', startDay: 8, endDay: 14 },
  { number: 3, title: 'Kampányírás', startDay: 15, endDay: 21 },
  { number: 4, title: 'Tesztelés & Optimalizálás', startDay: 22, endDay: 30 },
];

export function JourneyTimeline({ courseId = 'ai-copywriting-course' }: { courseId?: string }) {
  const { user } = useAuth();
  const [currentDay, setCurrentDay] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImplementationData();
  }, [user, courseId]);

  const fetchImplementationData = async () => {
    if (!user) return;

    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      const response = await fetch(`/api/implementations/${user.id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();

      if (data.success && data.implementation) {
        setCurrentDay(data.implementation.currentDay || 1);
      }
    } catch (error) {
      console.error('[JourneyTimeline] Error fetching implementation:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse bg-gray-200 rounded-xl h-64"></div>;
  }

  const progressPercentage = (currentDay / 30) * 100;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          30 napos út
        </h3>
        <span className="text-sm text-gray-600">
          Nap {currentDay}/30
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-violet-600 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Weekly Milestones */}
      <div className="space-y-4">
        {PROGRAM_WEEKS.map((week) => {
          const isCompleted = currentDay > week.endDay;
          const isCurrent = currentDay >= week.startDay && currentDay <= week.endDay;
          const isLocked = currentDay < week.startDay;

          return (
            <div
              key={week.number}
              className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                isCurrent
                  ? 'border-purple-300 bg-purple-50'
                  : isCompleted
                  ? 'border-green-200 bg-green-50/50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex-shrink-0">
                {isCompleted ? (
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                ) : isCurrent ? (
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-gray-500" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {week.number}. hét: {week.title}
                </p>
                <p className="text-xs text-gray-500">
                  Nap {week.startDay}-{week.endDay}
                </p>
              </div>

              {isCurrent && (
                <span className="text-xs font-medium text-purple-600 px-3 py-1 bg-purple-100 rounded-full">
                  Folyamatban
                </span>
              )}

              {isCompleted && (
                <span className="text-xs font-medium text-green-600">
                  Kész
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Status Message */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-900">
          {currentDay <= 15 ? (
            <>📚 Jól haladsz! Tartsd meg az ütemet a konzisztens eredményekért.</>
          ) : currentDay <= 25 ? (
            <>🎯 Az utolsó egyenesben vagy! A kampányoptimalizálás kulcsfontosságú.</>
          ) : (
            <>🏁 Már majdnem befejezted! Összpontosíts a tesztelésre és finomításra.</>
          )}
        </p>
      </div>
    </div>
  );
}
