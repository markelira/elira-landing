'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import AuthWrapper from '../../../components/auth/AuthWrapper';

export default function PaymentCancelPage() {
  const router = useRouter();
  const { user } = useAuth();

  const handleRetryPayment = () => {
    // Redirect back to course purchase page
    router.push('/#course-purchase');
  };

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <AuthWrapper requireAuth={true} redirectTo="/">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="h-16 w-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="h-8 w-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Fizetés megszakítva
            </h1>
            
            <p className="text-gray-600 mb-8">
              A fizetési folyamatot megszakítottad. Ne izgulj, semmi nem történt - 
              bármikor visszatérhetsz és befejezheted a vásárlást.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleRetryPayment}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Újra próbálkozom a vásárlással
              </button>

              <button
                onClick={handleGoToDashboard}
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
              >
                Dashboard megtekintése
              </button>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">Miért érdemes megvenni a kurzust?</h3>
              <ul className="text-sm text-blue-700 space-y-1 text-left">
                <li>🤖 AI-alapú copywriting technikák</li>
                <li>📊 Piackutatási módszerek</li>
                <li>💼 Gyakorlati projektek</li>
                <li>🎯 Egyéni visszajelzések</li>
                <li>💬 Discord közösség hozzáférés</li>
                <li>📜 Tanúsítvány a befejezés után</li>
              </ul>
            </div>

            <div className="mt-6 text-xs text-gray-500">
              <p>Kérdésed van? Írj nekünk: hello@elira.hu</p>
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}