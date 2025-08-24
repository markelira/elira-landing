'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../../components/modals/AuthModal';
import PurchaseButton from '../../components/course/PurchaseButton';
import { formatPrice } from '../../../lib/payment';
import { COURSE_CONFIG } from '../../types/payment';

interface TestResult {
  name: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  message?: string;
  error?: string;
}

export default function TestSuitePage() {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [modalTab, setModalTab] = useState<'login' | 'register'>('register');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  // Initialize test suite
  useEffect(() => {
    setTestResults([
      { name: 'Firebase Config', status: 'pending' },
      { name: 'Auth Context Loading', status: 'pending' },
      { name: 'User Registration', status: 'pending' },
      { name: 'User Login', status: 'pending' },
      { name: 'Profile Fetch', status: 'pending' },
      { name: 'Payment Session Creation', status: 'pending' },
      { name: 'Course Access Check', status: 'pending' }
    ]);
  }, []);

  // Test Firebase configuration
  const testFirebaseConfig = async (): Promise<TestResult> => {
    try {
      // Check if Firebase is properly initialized
      const { auth, db } = await import('../../../lib/firebase');
      
      if (!auth || !db) {
        throw new Error('Firebase services not initialized');
      }

      return {
        name: 'Firebase Config',
        status: 'passed',
        message: 'Firebase services initialized successfully'
      };
    } catch (error: any) {
      return {
        name: 'Firebase Config',
        status: 'failed',
        error: error.message
      };
    }
  };

  // Test Auth Context
  const testAuthContext = async (): Promise<TestResult> => {
    try {
      if (loading) {
        return {
          name: 'Auth Context Loading',
          status: 'running',
          message: 'Auth state loading...'
        };
      }

      return {
        name: 'Auth Context Loading',
        status: 'passed',
        message: user ? `Authenticated as: ${user.email}` : 'Not authenticated (OK)'
      };
    } catch (error: any) {
      return {
        name: 'Auth Context Loading',
        status: 'failed',
        error: error.message
      };
    }
  };

  // Test API endpoints
  const testApiEndpoints = async (): Promise<TestResult[]> => {
    const results: TestResult[] = [];

    // Test health endpoint
    try {
      const response = await fetch('/api/health');
      if (response.ok) {
        const data = await response.json();
        results.push({
          name: 'Health Endpoint',
          status: 'passed',
          message: `API healthy: ${data.service}`
        });
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error: any) {
      results.push({
        name: 'Health Endpoint',
        status: 'failed',
        error: error.message
      });
    }

    return results;
  };

  // Test user profile fetch (if authenticated)
  const testProfileFetch = async (): Promise<TestResult> => {
    if (!user) {
      return {
        name: 'Profile Fetch',
        status: 'pending',
        message: 'Requires authentication'
      };
    }

    try {
      const response = await fetch(`/api/user/profile?uid=${user.uid}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const profile = await response.json();
      return {
        name: 'Profile Fetch',
        status: 'passed',
        message: `Profile loaded: ${profile.firstName} ${profile.lastName}`
      };
    } catch (error: any) {
      return {
        name: 'Profile Fetch',
        status: 'failed',
        error: error.message
      };
    }
  };

  // Test payment session creation (if authenticated)
  const testPaymentSession = async (): Promise<TestResult> => {
    if (!user) {
      return {
        name: 'Payment Session Creation',
        status: 'pending',
        message: 'Requires authentication'
      };
    }

    if (user.courseAccess) {
      return {
        name: 'Payment Session Creation',
        status: 'passed',
        message: 'User already has course access'
      };
    }

    try {
      const response = await fetch('/api/payment/create-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/payment/cancel`
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      return {
        name: 'Payment Session Creation',
        status: 'passed',
        message: `Session created: ${data.sessionId.substring(0, 20)}...`
      };
    } catch (error: any) {
      return {
        name: 'Payment Session Creation',
        status: 'failed',
        error: error.message
      };
    }
  };

  // Run all tests
  const runTests = async () => {
    setIsRunningTests(true);
    const newResults: TestResult[] = [];

    // Test Firebase Config
    newResults.push(await testFirebaseConfig());

    // Test Auth Context
    newResults.push(await testAuthContext());

    // Test API endpoints
    const apiResults = await testApiEndpoints();
    newResults.push(...apiResults);

    // Test Profile Fetch
    newResults.push(await testProfileFetch());

    // Test Payment Session
    newResults.push(await testPaymentSession());

    // Course Access Check
    newResults.push({
      name: 'Course Access Check',
      status: user?.courseAccess ? 'passed' : 'pending',
      message: user?.courseAccess ? 'User has course access' : 'User needs to purchase course'
    });

    setTestResults(newResults);
    setIsRunningTests(false);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'passed':
        return '✅';
      case 'failed':
        return '❌';
      case 'running':
        return '⏳';
      default:
        return '⭕';
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'passed':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'running':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🧪 Phase 1 Test Suite
          </h1>
          <p className="text-gray-600">
            Authentication & Payment Integration Testing
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Results */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Test Results</h2>
              <button
                onClick={runTests}
                disabled={isRunningTests}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isRunningTests ? 'Running Tests...' : 'Run Tests'}
              </button>
            </div>

            <div className="space-y-3">
              {testResults.map((result, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-xl mr-3">{getStatusIcon(result.status)}</span>
                      <span className="font-medium text-gray-800">{result.name}</span>
                    </div>
                    <span className={`text-sm font-medium ${getStatusColor(result.status)}`}>
                      {result.status.toUpperCase()}
                    </span>
                  </div>
                  {result.message && (
                    <p className="text-sm text-gray-600 mt-2 ml-8">{result.message}</p>
                  )}
                  {result.error && (
                    <p className="text-sm text-red-600 mt-2 ml-8">Error: {result.error}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* User Status & Actions */}
          <div className="space-y-6">
            {/* Auth Status */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Authentication Status</h2>
              
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-green-600 text-xl mr-2">✅</span>
                    <span className="font-medium">Authenticated</span>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>UID:</strong> {user.uid.substring(0, 20)}...</p>
                    <p><strong>Course Access:</strong> {user.courseAccess ? '✅ Yes' : '❌ No'}</p>
                    <p><strong>Linked Downloads:</strong> {user.linkedDownloads.length} items</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-red-600 text-xl mr-2">❌</span>
                    <span className="font-medium">Not Authenticated</span>
                  </div>
                  
                  <div className="space-x-3">
                    <button
                      onClick={() => {
                        setModalTab('register');
                        setShowAuthModal(true);
                      }}
                      className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                    >
                      Test Registration
                    </button>
                    <button
                      onClick={() => {
                        setModalTab('login');
                        setShowAuthModal(true);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Test Login
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Testing */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment Testing</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Course Details</h3>
                  <p className="text-sm text-blue-700">
                    <strong>{COURSE_CONFIG.title}</strong><br/>
                    Price: {formatPrice(COURSE_CONFIG.price)}<br/>
                    Currency: {COURSE_CONFIG.currency.toUpperCase()}
                  </p>
                </div>

                <PurchaseButton
                  onPurchaseStart={() => console.log('Purchase started')}
                  onPurchaseSuccess={() => console.log('Purchase successful')}
                  onPurchaseError={(error) => console.error('Purchase error:', error)}
                />
              </div>
            </div>

            {/* API Endpoints */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">API Endpoints</h2>
              
              <div className="text-sm space-y-2">
                <div><strong>Health:</strong> <code>/api/health</code></div>
                <div><strong>Register:</strong> <code>/api/auth/register</code></div>
                <div><strong>Google Auth:</strong> <code>/api/auth/google-callback</code></div>
                <div><strong>User Profile:</strong> <code>/api/user/profile</code></div>
                <div><strong>Payment Session:</strong> <code>/api/payment/create-session</code></div>
                <div><strong>Payment Webhook:</strong> <code>/api/payment/webhook</code></div>
              </div>
            </div>
          </div>
        </div>

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultTab={modalTab}
          onAuthSuccess={() => {
            setShowAuthModal(false);
            // Re-run tests after successful auth
            setTimeout(runTests, 1000);
          }}
        />
      </div>
    </div>
  );
}