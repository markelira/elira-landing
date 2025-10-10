'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, Star, Award, Target, TrendingUp, Lock } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  earned: boolean;
  earnedAt?: Date;
  progress: number;
  targetValue: number;
  currentValue: number;
}

const achievementIcons: Record<string, React.ReactNode> = {
  Trophy: <Trophy className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  Target: <Target className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
};

const tierColors: Record<string, { bg: string; text: string; border: string }> = {
  bronze: { bg: 'bg-orange-100 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-400', border: 'border-orange-300 dark:border-orange-800' },
  silver: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-700 dark:text-gray-300', border: 'border-gray-300 dark:border-gray-700' },
  gold: { bg: 'bg-yellow-100 dark:bg-yellow-900/20', text: 'text-yellow-700 dark:text-yellow-400', border: 'border-yellow-300 dark:border-yellow-800' },
  platinum: { bg: 'bg-purple-100 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-300 dark:border-purple-800' },
};

export function AchievementsCard() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    async function fetchAchievements() {
      try {
        const token = await auth.currentUser?.getIdToken();
        if (!token) {
          setError('Not authenticated');
          setLoading(false);
          return;
        }

        // For now, use mock data until we implement the achievements API
        // TODO: Replace with actual API call
        const mockAchievements: Achievement[] = [
          {
            id: 'first-module',
            name: 'Első lépések',
            description: 'Fejezd be az első modult',
            icon: 'Star',
            tier: 'bronze',
            earned: true,
            earnedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            progress: 100,
            targetValue: 1,
            currentValue: 1,
          },
          {
            id: 'week-streak',
            name: '7 napos sztrík',
            description: '7 egymást követő napon tanulj',
            icon: 'TrendingUp',
            tier: 'silver',
            earned: true,
            earnedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            progress: 100,
            targetValue: 7,
            currentValue: 7,
          },
          {
            id: 'template-master',
            name: 'Sablon mester',
            description: 'Tölts le 5 marketing sablont',
            icon: 'Target',
            tier: 'bronze',
            earned: false,
            progress: 40,
            targetValue: 5,
            currentValue: 2,
          },
          {
            id: 'consultation-pro',
            name: 'Konzultációs profi',
            description: 'Vegyen részt 3 konzultáción',
            icon: 'Award',
            tier: 'gold',
            earned: false,
            progress: 33,
            targetValue: 3,
            currentValue: 1,
          },
          {
            id: 'course-complete',
            name: 'Program bajnok',
            description: 'Fejezz be egy teljes masterclass programot',
            icon: 'Trophy',
            tier: 'platinum',
            earned: false,
            progress: 25,
            targetValue: 1,
            currentValue: 0,
          },
        ];

        setAchievements(mockAchievements);
        setError(null);
      } catch (err: any) {
        console.error('[AchievementsCard] Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAchievements();
  }, [user]);

  const earnedCount = achievements.filter((a) => a.earned).length;
  const totalCount = achievements.length;

  if (loading) {
    return (
      <Card className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
        <div className="text-center py-6">
          <p className="text-red-600 dark:text-red-400">Hiba: {error}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
            <Trophy className="w-5 h-5 text-yellow-700 dark:text-yellow-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Teljesítmények
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {earnedCount} / {totalCount} feloldva
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Előrehaladás</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {Math.round((earnedCount / totalCount) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
          <div
            className="bg-yellow-600 dark:bg-yellow-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(earnedCount / totalCount) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Achievements List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {achievements.map((achievement) => {
          const colors = tierColors[achievement.tier];
          const IconComponent = achievementIcons[achievement.icon] || achievementIcons.Star;

          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border ${colors.border} ${colors.bg} transition-all hover:shadow-sm`}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text}`}>
                  {achievement.earned ? IconComponent : <Lock className="w-5 h-5" />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`text-sm font-semibold ${
                      achievement.earned ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {achievement.name}
                    </h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border} capitalize`}>
                      {achievement.tier}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {achievement.description}
                  </p>

                  {/* Progress */}
                  {!achievement.earned && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {achievement.currentValue} / {achievement.targetValue}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {achievement.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                          className={`${colors.text.replace('text-', 'bg-')} h-1.5 rounded-full transition-all duration-300`}
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {achievement.earned && achievement.earnedAt && (
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Feloldva: {new Date(achievement.earnedAt).toLocaleDateString('hu-HU')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-center text-gray-500 dark:text-gray-500">
          Folytasd a tanulást további teljesítmények feloldásához
        </p>
      </div>
    </Card>
  );
}
