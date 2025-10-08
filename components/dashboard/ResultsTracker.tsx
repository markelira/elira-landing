'use client';

import { useState, useEffect } from 'react';
import { Target, TrendingUp, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { auth } from '@/lib/firebase';

export function ResultsTracker() {
  const { user } = useAuth();
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, [user]);

  const fetchResults = async () => {
    if (!user) return;

    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      const response = await fetch(`/api/implementations/${user.id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();

      if (data.success) {
        setResults(data.implementation);
      }
    } catch (error) {
      console.error('[ResultsTracker] Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse bg-gray-200 rounded-xl h-64"></div>;
  }

  if (!results) {
    return null;
  }

  const { deliverables, implementationProgress } = results;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Eredmények követése
        </h3>
        <Target className="w-5 h-5 text-gray-600" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Piackutatás</span>
          {deliverables?.marketResearchCompleted ? (
            <span className="flex items-center gap-1 text-sm font-medium text-green-600">
              <CheckCircle className="w-4 h-4" />
              Kész
            </span>
          ) : (
            <span className="text-sm text-gray-400">Folyamatban</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Buyer personák létrehozva</span>
          <span className="text-sm font-medium text-gray-900">
            {deliverables?.buyerPersonasCreated || 0}/3
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Kampányok indítva</span>
          <span className="text-sm font-medium text-gray-900">
            {deliverables?.campaignsLaunched || 0}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">A/B tesztek futnak</span>
          <span className="text-sm font-medium text-blue-600">
            {deliverables?.abTestsRunning || 0} aktív
          </span>
        </div>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">Implementálás</span>
            <span className="text-sm font-semibold text-gray-900">
              {Math.round(implementationProgress || 0)}%
            </span>
          </div>
          <ProgressBar value={implementationProgress || 0} color="purple" height="sm" />
        </div>
      </div>

      {implementationProgress < 100 && (
        <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-purple-900 mb-1">
                Következő lépés
              </p>
              <p className="text-xs text-purple-700">
                {implementationProgress < 25
                  ? 'Fejezd be a piackutatást és hozd létre az első buyer personát.'
                  : implementationProgress < 50
                  ? 'Készítsd el az első kampányt a kutatási adatok alapján.'
                  : implementationProgress < 75
                  ? 'Indíts el egy A/B tesztet a kampány optimalizálásához.'
                  : 'Finomítsd a kampányokat és elemezd az eredményeket.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
