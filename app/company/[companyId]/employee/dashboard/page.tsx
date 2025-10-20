'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { BookOpen, Clock, CheckCircle2, Award, TrendingUp, AlertCircle } from 'lucide-react';

interface Masterclass {
  id: string;
  title: string;
  description: string;
  duration: number;
  moduleTitles: string[];
}

interface EmployeeProgress {
  masterclassId: string;
  currentModule: number;
  completedModules: number[];
  lastActivityAt: Date;
  enrolledAt: Date;
  status: 'active' | 'completed' | 'at-risk';
}

interface Company {
  id: string;
  name: string;
  logo?: string;
}

export default function EmployeeDashboard({ params }: { params: { companyId: string } }) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [enrolledMasterclasses, setEnrolledMasterclasses] = useState<{ masterclass: Masterclass; progress: EmployeeProgress }[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/login?redirect=/company/${params.companyId}/employee/dashboard`);
      return;
    }

    if (user) {
      loadDashboard();
    }
  }, [user, authLoading, params.companyId]);

  async function loadDashboard() {
    try {
      const db = getFirestore();

      // Load company info
      const companyRef = doc(db, 'companies', params.companyId);
      const companySnap = await getDoc(companyRef);

      if (!companySnap.exists()) {
        setError('Vállalat nem található');
        return;
      }

      setCompany({
        id: companySnap.id,
        name: companySnap.data().name,
        logo: companySnap.data().logo,
      });

      // Load employee record
      const employeesRef = collection(db, 'companies', params.companyId, 'employees');
      const employeeQuery = query(employeesRef, where('userId', '==', user!.uid));
      const employeeSnap = await getDocs(employeeQuery);

      if (employeeSnap.empty) {
        setError('Nem vagy tagja ennek a vállalatnak');
        return;
      }

      const employeeData = employeeSnap.docs[0].data();
      const enrolledIds = employeeData.enrolledMasterclasses || [];

      if (enrolledIds.length === 0) {
        setLoading(false);
        return;
      }

      // Load enrolled masterclasses
      const masterclassesData = await Promise.all(
        enrolledIds.map(async (masterclassId: string) => {
          const masterclassRef = doc(db, 'companies', params.companyId, 'masterclasses', masterclassId);
          const masterclassSnap = await getDoc(masterclassRef);

          if (!masterclassSnap.exists()) return null;

          // Load progress
          const progressRef = doc(db, 'userProgress', `${user!.uid}_${masterclassId}`);
          const progressSnap = await getDoc(progressRef);

          const progressData = progressSnap.exists() ? progressSnap.data() : null;

          return {
            masterclass: {
              id: masterclassSnap.id,
              ...masterclassSnap.data(),
            } as Masterclass,
            progress: progressData ? {
              masterclassId,
              currentModule: progressData.currentModule || 1,
              completedModules: progressData.completedModules || [],
              lastActivityAt: progressData.lastActivityAt?.toDate(),
              enrolledAt: progressData.enrolledAt?.toDate(),
              status: progressData.status || 'active',
            } : {
              masterclassId,
              currentModule: 1,
              completedModules: [],
              lastActivityAt: new Date(),
              enrolledAt: new Date(),
              status: 'active',
            } as EmployeeProgress,
          };
        })
      );

      setEnrolledMasterclasses(masterclassesData.filter(Boolean) as any[]);
    } catch (err: any) {
      console.error('Error loading dashboard:', err);
      setError('Hiba történt az adatok betöltése során');
    } finally {
      setLoading(false);
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Betöltés...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-900 mb-2">Hiba</h2>
          <p className="text-red-700 mb-6">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Vissza a főoldalra
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {company?.logo && (
                <img src={company.logo} alt={company.name} className="h-10 w-10 rounded-full" />
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{company?.name}</h1>
                <p className="text-sm text-gray-600">Vállalati képzési portál</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                <p className="text-xs text-gray-600">Alkalmazott</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Üdvözlünk, {user?.displayName || 'Kolléga'}! 👋</h2>
          <p className="text-blue-100">
            Folytathatod a képzéseidet és fejlesztheted készségeidet
          </p>
        </div>

        {/* Stats Cards */}
        {enrolledMasterclasses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-600 text-sm font-medium">Aktív képzések</div>
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {enrolledMasterclasses.filter(m => m.progress.status === 'active').length}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-600 text-sm font-medium">Befejezett modulok</div>
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {enrolledMasterclasses.reduce((sum, m) => sum + m.progress.completedModules.length, 0)}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-600 text-sm font-medium">Összesített haladás</div>
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {Math.round(
                  (enrolledMasterclasses.reduce(
                    (sum, m) => sum + (m.progress.completedModules.length / m.masterclass.duration) * 100,
                    0
                  ) / enrolledMasterclasses.length) || 0
                )}%
              </div>
            </div>
          </div>
        )}

        {/* Masterclasses List */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">A képzéseid</h3>

          {enrolledMasterclasses.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Még nincs aktív képzésed
              </h4>
              <p className="text-gray-600 mb-6">
                A vállalati adminisztrátor hamarosan hozzárendel képzéseket
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolledMasterclasses.map(({ masterclass, progress }) => {
                const completionPercent = Math.round(
                  (progress.completedModules.length / masterclass.duration) * 100
                );

                return (
                  <div
                    key={masterclass.id}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">
                            {masterclass.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-4">
                            {masterclass.description}
                          </p>
                        </div>
                        {progress.status === 'completed' && (
                          <Award className="w-6 h-6 text-yellow-500 flex-shrink-0 ml-2" />
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">Haladás</span>
                          <span className="font-semibold text-gray-900">{completionPercent}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all"
                            style={{ width: `${completionPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Module Info */}
                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center text-gray-600">
                          <BookOpen className="w-4 h-4 mr-1" />
                          <span>
                            {progress.completedModules.length} / {masterclass.duration} modul
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>Modul {progress.currentModule}</span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="mb-4">
                        {progress.status === 'completed' ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Befejezve
                          </span>
                        ) : progress.status === 'at-risk' ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Lemaradásban
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Aktív
                          </span>
                        )}
                      </div>

                      {/* Action Button */}
                      <Link
                        href={`/courses/${masterclass.id}`}
                        className="block w-full text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
                      >
                        {progress.status === 'completed' ? 'Megtekintés' : 'Folytatás →'}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
