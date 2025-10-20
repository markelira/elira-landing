'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { httpsCallable } from 'firebase/functions';
import { functions } from '@/lib/firebase';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  Mail,
  CreditCard,
  FileText,
  Sparkles,
  ArrowRight,
  Play,
  Clock,
  Award,
  ChevronRight
} from 'lucide-react';

interface CourseDetails {
  id: string;
  title: string;
  instructorName?: string;
  thumbnailUrl?: string;
  welcomeVideoUrl?: string;
  firstLessonPreviewUrl?: string;
}

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();

  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);
  const [enrollmentComplete, setEnrollmentComplete] = useState(false);

  // Get data from URL params (passed from Stripe redirect)
  const sessionId = searchParams.get('session_id');
  const courseId = searchParams.get('courseId');
  const amount = searchParams.get('amount');
  const userEmail = user?.email || searchParams.get('email');

  useEffect(() => {
    if (!authLoading && sessionId && courseId) {
      processPaymentSuccess();
    }
  }, [authLoading, sessionId, courseId]);

  async function processPaymentSuccess() {
    try {
      setProcessing(true);

      // Call backend to complete enrollment and send welcome email
      const completeEnrollment = httpsCallable(functions, 'completeStripeEnrollment');

      const result = await completeEnrollment({
        sessionId,
        courseId,
        userId: user?.uid,
      });

      const data = result.data as any;

      if (data.success) {
        setCourseDetails({
          id: data.courseId,
          title: data.courseTitle,
          instructorName: data.instructorName,
          thumbnailUrl: data.thumbnailUrl,
          welcomeVideoUrl: data.welcomeVideoUrl,
          firstLessonPreviewUrl: data.firstLessonPreviewUrl,
        });
        setEnrollmentComplete(true);

        // Track conversion event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'purchase', {
            transaction_id: sessionId,
            value: amount ? parseFloat(amount) / 100 : 0,
            currency: 'HUF',
            items: [{
              item_id: courseId,
              item_name: data.courseTitle,
            }]
          });
        }
      } else {
        setError('Hiba történt a beiratkozás során. Kérjük, lépj kapcsolatba az ügyfélszolgálattal.');
      }
    } catch (err: any) {
      console.error('Error processing enrollment:', err);
      setError('Hiba történt a beiratkozás során. Ellenőrizd az emailedet a visszaigazolásért.');
    } finally {
      setProcessing(false);
    }
  }

  // Loading state
  if (authLoading || processing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-3 border-purple-600 border-t-transparent"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Fizetés feldolgozása...
          </h2>
          <p className="text-gray-600 text-sm">
            Beiratkozásod aktiválása folyamatban
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <FileText className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Fizetés sikeres, de...
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-900">
              <strong>Ne aggódj!</strong> A fizetésed sikeres volt. Küldtünk egy emailt a hozzáférési részletekkel.
              Ha nem érkezett meg, írj nekünk: <a href="mailto:info@elira.hu" className="underline">info@elira.hu</a>
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-black transition-colors"
          >
            Irány a Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Celebration Header */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mb-6 shadow-lg">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            🎉 Gratulálunk!
          </h1>
          <p className="text-xl text-gray-700 font-medium">
            Sikeres beiratkozás
          </p>
        </motion.div>

        {/* Main Success Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-6"
        >
          {/* Course Info */}
          {courseDetails && (
            <div className="p-6 md:p-8 border-b border-gray-200">
              <div className="flex items-start space-x-4">
                {courseDetails.thumbnailUrl && (
                  <img
                    src={courseDetails.thumbnailUrl}
                    alt={courseDetails.title}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {courseDetails.title}
                  </h2>
                  {courseDetails.instructorName && (
                    <p className="text-gray-600 text-sm">
                      Oktató: <span className="font-medium">{courseDetails.instructorName}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Confirmation Checklist */}
          <div className="p-6 md:p-8 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Fizetés befejezve</p>
                <p className="text-sm text-gray-600">
                  {amount ? `${parseInt(amount).toLocaleString('hu-HU')} Ft` : 'Összeg megerősítve'}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Kurzus hozzáférés aktiválva</p>
                <p className="text-sm text-gray-600">Azonnal elkezdheted a tanulást</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                <Mail className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Email visszaigazolás elküldve</p>
                <p className="text-sm text-gray-600">
                  Küldtünk egy üdvözlő emailt ide: <span className="font-medium">{userEmail}</span>
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Számla hamarosan érkezik</p>
                <p className="text-sm text-gray-600">PDF formátumban emailben (1-2 órán belül)</p>
              </div>
            </div>
          </div>

          {/* Email Confirmation Banner */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 md:p-8 border-t border-gray-200">
            <div className="flex items-start space-x-3">
              <Mail className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-gray-900 mb-1">
                  📧 Ellenőrizd az emailedet!
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Küldtünk egy üdvözlő üzenetet az első lépésekhez szükséges információkkal.
                  Ha nem találod, nézd meg a spam mappát is.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main CTA Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/dashboard"
            className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-center py-5 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] group"
          >
            <span className="flex items-center justify-center space-x-3">
              <Sparkles className="w-6 h-6" />
              <span>KEZDD EL A KURZUST MOST!</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>

        {/* Welcome Video & First Lesson Preview */}
        {courseDetails && (courseDetails.welcomeVideoUrl || courseDetails.firstLessonPreviewUrl) && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8 mb-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Play className="w-5 h-5 mr-2 text-purple-600" />
              Vagy nézd meg most:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courseDetails.welcomeVideoUrl && (
                <a
                  href={courseDetails.welcomeVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-4 border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:shadow-md transition-all"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                      <Play className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                        Üdvözlő videó az oktatótól
                      </p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        ~2 perc
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </a>
              )}

              {courseDetails.firstLessonPreviewUrl && (
                <a
                  href={courseDetails.firstLessonPreviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <Award className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        Első lecke előnézet
                      </p>
                      <p className="text-xs text-gray-500">
                        Kezdd el most
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </a>
              )}
            </div>
          </motion.div>
        )}

        {/* Reassurance / Anti-Remorse Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6 md:p-8"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-green-600" />
            Tökéletes döntést hoztál! 💚
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p className="flex items-start">
              <CheckCircle2 className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>Azonnal hozzáférhetsz az összes tartalomhoz - nincs várakozás</span>
            </p>
            <p className="flex items-start">
              <CheckCircle2 className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>Életfogytiglani hozzáférés - tanulj a saját tempódban</span>
            </p>
            <p className="flex items-start">
              <CheckCircle2 className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>30 napos pénz-visszafizetési garancia - kockázatmentes</span>
            </p>
            <p className="flex items-start">
              <CheckCircle2 className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
              <span>Közösségi támogatás és live Q&A sessionök</span>
            </p>
          </div>
        </motion.div>

        {/* Support Section */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="mb-2">
            Kérdésed van? Írj nekünk bármikor:{' '}
            <a href="mailto:info@elira.hu" className="text-purple-600 hover:text-purple-700 font-medium">
              info@elira.hu
            </a>
          </p>
          <Link href="/" className="text-gray-500 hover:text-gray-700">
            ← Vissza a főoldalra
          </Link>
        </div>
      </div>
    </div>
  );
}
