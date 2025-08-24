'use client';

import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../../components/modals/AuthModal';
import AuthWrapper from '../../components/auth/AuthWrapper';

export default function AuthTestPage() {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [modalTab, setModalTab] = useState<'login' | 'register'>('login');

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Authentication Test Page
        </h1>

        {/* Auth Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Authentication Status</h2>
          
          {user ? (
            <div className="space-y-3">
              <p className="text-green-600 font-medium">✅ Authenticated</p>
              <div className="text-sm text-gray-600">
                <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Course Access:</strong> {user.courseAccess ? '✅ Yes' : '❌ No'}</p>
                <p><strong>Linked Downloads:</strong> {user.linkedDownloads.length} items</p>
                <p><strong>Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
              <button
                onClick={handleLogout}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-red-600 font-medium">❌ Not Authenticated</p>
              <div className="space-x-4">
                <button
                  onClick={() => {
                    setModalTab('login');
                    setShowAuthModal(true);
                  }}
                  className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setModalTab('register');
                    setShowAuthModal(true);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Register
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Protected Content Test */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Protected Content Tests</h2>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-2">Auth Required Content</h3>
              <AuthWrapper requireAuth={true}>
                <div className="text-green-600">
                  🎉 You can see this because you're authenticated!
                </div>
              </AuthWrapper>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-2">Course Access Required Content</h3>
              <AuthWrapper requireCourseAccess={true}>
                <div className="text-green-600">
                  🏆 You can see this because you have course access!
                </div>
              </AuthWrapper>
            </div>
          </div>
        </div>

        {/* API Test Section */}
        {user && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">API Test</h2>
            <div className="space-y-2 text-sm">
              <p><strong>User Profile API:</strong> <code>/api/user/profile?uid={user.uid}</code></p>
              <p><strong>Link Downloads API:</strong> <code>/api/user/link-downloads</code></p>
              <p className="text-gray-500">
                APIs are ready for testing once Firebase Functions are running locally
              </p>
            </div>
          </div>
        )}

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultTab={modalTab}
          onAuthSuccess={() => setShowAuthModal(false)}
        />
      </div>
    </div>
  );
}