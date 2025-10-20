'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { httpsCallable } from 'firebase/functions';
import { functions } from '@/lib/firebase';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import Link from 'next/link';
import {
  ArrowLeft,
  ShoppingCart,
  Calendar,
  Users,
  DollarSign,
  Loader2,
  CheckCircle2,
  AlertCircle,
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';

interface Masterclass {
  id: string;
  title: string;
  description?: string;
  duration: number; // weeks
  price: number;
  pricePerSeat?: number;
  thumbnailUrl?: string;
}

interface CreateMasterclassInput {
  companyId: string;
  masterclassId: string;
  seatCount: number;
  startDate: string;
}

export default function CreateMasterclassPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [availableMasterclasses, setAvailableMasterclasses] = useState<Masterclass[]>([]);
  const [selectedMasterclassId, setSelectedMasterclassId] = useState('');
  const [seatCount, setSeatCount] = useState(5);
  const [startDate, setStartDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth?redirect=/company/dashboard/masterclasses/create');
      return;
    }

    if (user) {
      loadMasterclasses();
    }
  }, [user, authLoading]);

  async function loadMasterclasses() {
    try {
      setLoading(true);
      const db = getFirestore();

      // Load all available courses from course-content collection
      const coursesSnapshot = await getDocs(collection(db, 'course-content'));

      const courses: Masterclass[] = coursesSnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title || 'Untitled Course',
        description: doc.data().description,
        duration: doc.data().duration || 8,
        price: doc.data().price || 89990,
        pricePerSeat: doc.data().price || 89990,
        thumbnailUrl: doc.data().thumbnailUrl,
      }));

      setAvailableMasterclasses(courses);

      // Set default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setStartDate(tomorrow.toISOString().split('T')[0]);

    } catch (err) {
      console.error('Error loading masterclasses:', err);
      setError('Hiba történt a képzések betöltése során');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user?.companyId) {
      setError('Nem található vállalati fiók');
      return;
    }

    if (!selectedMasterclassId) {
      setError('Válassz ki egy masterclasst');
      return;
    }

    if (seatCount < 1 || seatCount > 1000) {
      setError('A helyek száma 1 és 1000 között lehet');
      return;
    }

    if (!startDate) {
      setError('Válassz kezdési dátumot');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const createMasterclass = httpsCallable<CreateMasterclassInput, { success: boolean; masterclassId: string; message: string }>(
        functions,
        'createCompanyMasterclass'
      );

      const result = await createMasterclass({
        companyId: user.companyId,
        masterclassId: selectedMasterclassId,
        seatCount,
        startDate,
      });

      if (result.data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/company/dashboard/masterclasses');
        }, 2000);
      }
    } catch (err: any) {
      console.error('Error creating masterclass:', err);
      setError(err.message || 'Hiba történt a masterclass létrehozása során');
      setSubmitting(false);
    }
  }

  const selectedMasterclass = availableMasterclasses.find(m => m.id === selectedMasterclassId);
  const totalPrice = selectedMasterclass ? selectedMasterclass.pricePerSeat! * seatCount : 0;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Betöltés...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md bg-white rounded-2xl shadow-lg p-8"
        >
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sikeres létrehozás!
          </h2>
          <p className="text-gray-600 mb-4">
            A masterclass sikeresen hozzáadva. Átirányítás...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-900 mx-auto"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link
              href="/company/dashboard/masterclasses"
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Masterclass helyek hozzáadása
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Válassz masterclasst és add meg a helyek számát
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900">
              <p className="font-medium mb-1">MVP Mód - Manuális Helyek</p>
              <p className="text-blue-800">
                Jelenleg manuálisan adhatsz hozzá helyeket. A fizetési integráció hamarosan érkezik.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Select Masterclass */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <label className="block text-sm font-semibold text-gray-900 mb-4">
              1. Válassz Masterclasst
            </label>

            <div className="grid grid-cols-1 gap-4">
              {availableMasterclasses.map((masterclass) => (
                <button
                  key={masterclass.id}
                  type="button"
                  onClick={() => setSelectedMasterclassId(masterclass.id)}
                  className={`
                    text-left p-4 rounded-lg border-2 transition-all
                    ${selectedMasterclassId === masterclass.id
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="w-5 h-5 text-gray-600" />
                        <h3 className="font-semibold text-gray-900">{masterclass.title}</h3>
                      </div>
                      {masterclass.description && (
                        <p className="text-sm text-gray-600 mt-2 ml-8">
                          {masterclass.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 mt-3 ml-8 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {masterclass.duration} hét
                        </span>
                        <span className="flex items-center font-semibold text-gray-900">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {masterclass.pricePerSeat?.toLocaleString('hu-HU')} Ft/fő
                        </span>
                      </div>
                    </div>
                    {selectedMasterclassId === masterclass.id && (
                      <CheckCircle2 className="w-6 h-6 text-gray-900" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Seat Count & Date */}
          {selectedMasterclassId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                2. Konfiguráld a részleteket
              </label>

              <div className="space-y-4">
                {/* Seat Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Helyek száma
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => setSeatCount(Math.max(1, seatCount - 1))}
                      className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={seatCount}
                      onChange={(e) => setSeatCount(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      max="1000"
                      className="w-24 text-center px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-lg"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setSeatCount(seatCount + 1)}
                      className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
                    >
                      +
                    </button>
                    <span className="text-gray-600">alkalmazott</span>
                  </div>
                  {seatCount >= 10 && (
                    <p className="text-sm text-green-600 mt-2">
                      💡 10+ hely: Kérhetsz egyedi árajánlatot
                    </p>
                  )}
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kezdési dátum
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    required
                  />
                  {startDate && selectedMasterclass && (
                    <p className="text-sm text-gray-500 mt-2">
                      Befejezés: {new Date(new Date(startDate).getTime() + selectedMasterclass.duration * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('hu-HU')}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Summary & Submit */}
          {selectedMasterclass && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                3. Összegzés
              </label>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Masterclass:</span>
                  <span className="font-medium">{selectedMasterclass.title}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Helyek:</span>
                  <span className="font-medium">{seatCount} fő</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">Egységár:</span>
                  <span className="font-medium">{selectedMasterclass.pricePerSeat?.toLocaleString('hu-HU')} Ft</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="text-lg font-semibold">Összesen:</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {totalPrice.toLocaleString('hu-HU')} Ft
                  </span>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || !selectedMasterclassId}
                className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center space-x-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Létrehozás...</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Helyek hozzáadása</span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                MVP mód: Manuális létrehozás, fizetési integráció hamarosan
              </p>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
}
