'use client';

import { useAuth } from '@/contexts/AuthContext';
import PurchaseButton from '@/components/course/PurchaseButton';
import AuthWrapper from '@/components/auth/AuthWrapper';
import { COURSE_CONFIG, formatPrice } from '@/lib/payment';

export default function TestPaymentPage() {
  const { user } = useAuth();

  const handlePurchaseStart = () => {
    console.log('Purchase started');
  };

  const handlePurchaseSuccess = () => {
    console.log('Purchase success');
  };

  const handlePurchaseError = (error: string) => {
    console.error('Purchase error:', error);
    alert('Purchase error: ' + error);
  };

  return (
    <AuthWrapper requireAuth={true} redirectTo="/test-payment">
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Payment Integration Test
              </h1>
              <p className="text-gray-600 mb-6">
                This is a test page for the course payment integration.
              </p>
            </div>

            {/* User Info Section */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">User Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Name:</span> {user?.firstName} {user?.lastName}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {user?.email}
                </div>
                <div>
                  <span className="font-medium">User ID:</span> {user?.uid}
                </div>
                <div>
                  <span className="font-medium">Course Access:</span>{' '}
                  <span className={user?.courseAccess ? 'text-green-600' : 'text-red-600'}>
                    {user?.courseAccess ? 'Yes' : 'No'}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Stripe Customer ID:</span>{' '}
                  {user?.stripeCustomerId || 'Not set'}
                </div>
                <div>
                  <span className="font-medium">Role:</span> {user?.role}
                </div>
              </div>
            </div>

            {/* Course Information */}
            <div className="mb-8 p-6 bg-blue-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Course Information</h2>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Title:</span> {COURSE_CONFIG.title}</div>
                <div><span className="font-medium">Price:</span> {formatPrice(COURSE_CONFIG.price)}</div>
                <div><span className="font-medium">Currency:</span> {COURSE_CONFIG.currency.toUpperCase()}</div>
                <div><span className="font-medium">Description:</span> {COURSE_CONFIG.description}</div>
              </div>
            </div>

            {/* Payment Button */}
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-6">Purchase Course</h2>
              <PurchaseButton
                onPurchaseStart={handlePurchaseStart}
                onPurchaseSuccess={handlePurchaseSuccess}
                onPurchaseError={handlePurchaseError}
              />
            </div>

            {/* Environment Check */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="font-medium text-yellow-800 mb-2">Environment Status</h3>
              <div className="text-xs text-yellow-700 space-y-1">
                <div>Firebase Functions URL: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Configured' : 'Not configured'}</div>
                <div>
                  Note: Stripe keys need to be configured in Firebase Functions environment for actual payment processing.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
}