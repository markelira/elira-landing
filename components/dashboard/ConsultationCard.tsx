'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, Video, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Consultation } from '@/types/database';
import { auth } from '@/lib/firebase';

export function ConsultationCard() {
  const { user } = useAuth();
  const [nextConsultation, setNextConsultation] = useState<Consultation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNextConsultation();
  }, [user]);

  const fetchNextConsultation = async () => {
    if (!user) return;

    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      const response = await fetch('/api/consultations', {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();

      if (data.success) {
        // Find next upcoming consultation
        const upcoming = data.consultations?.find(
          (c: Consultation) => c.status === 'scheduled' && new Date(c.scheduledAt) > new Date()
        );

        setNextConsultation(upcoming || null);
      }
    } catch (error) {
      console.error('[ConsultationCard] Error fetching consultation:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (consultationId: string, taskId: string, completed: boolean) => {
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      const response = await fetch(`/api/consultations/${consultationId}/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ completed }),
      });

      if (response.ok) {
        // Refresh consultation data
        await fetchNextConsultation();
      }
    } catch (error) {
      console.error('[ConsultationCard] Error updating task:', error);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-200 rounded-xl h-64"></div>
    );
  }

  if (!nextConsultation) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Nincs közelgő konzultáció
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Foglalj időpontot a következő konzultációra a személyre szabott támogatásért.
        </p>
        <Button variant="outline" size="sm">
          Konzultáció foglalása
        </Button>
      </div>
    );
  }

  const scheduledDate = new Date(nextConsultation.scheduledAt);
  const timeUntil = getTimeUntil(scheduledDate);
  const completedTasks = nextConsultation.prepTasks?.filter(t => t.completed).length || 0;
  const totalTasks = nextConsultation.prepTasks?.length || 0;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-white border-purple-200 border rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Következő konzultáció
        </h3>
        <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
          {timeUntil}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-600" />
          <span className="text-sm text-gray-700">
            {scheduledDate.toLocaleDateString('hu-HU', {
              month: 'long',
              day: 'numeric',
              weekday: 'long'
            })}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-gray-600" />
          <span className="text-sm text-gray-700">
            {scheduledDate.toLocaleTimeString('hu-HU', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-gray-900">
            Előkészítő feladatok
          </p>
          <span className="text-xs text-gray-500">
            {completedTasks}/{totalTasks}
          </span>
        </div>
        <div className="space-y-2">
          {nextConsultation.prepTasks?.map((task) => (
            <label
              key={task.taskId}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div
                onClick={() => toggleTask(nextConsultation.consultationId, task.taskId, !task.completed)}
                className="flex-shrink-0"
              >
                {task.completed ? (
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-300 group-hover:text-purple-400" />
                )}
              </div>
              <span
                className={`text-sm ${
                  task.completed
                    ? 'text-gray-500 line-through'
                    : 'text-gray-700'
                }`}
              >
                {task.title}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
        <Video className="w-4 h-4 mr-2" />
        Csatlakozás a konzultációhoz
      </Button>
    </div>
  );
}

function getTimeUntil(date: Date): string {
  const now = new Date();
  const diff = date.getTime() - now.getTime();

  if (diff < 0) return 'Folyamatban';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) return `${days} nap múlva`;
  if (hours > 0) return `${hours} óra múlva`;
  if (minutes > 0) return `${minutes} perc múlva`;
  return 'Hamarosan';
}
