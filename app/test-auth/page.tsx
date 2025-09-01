'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Check, X, Loader2, ArrowRight } from 'lucide-react';

export default function TestAuthPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [testResults, setTestResults] = useState<{[key: string]: 'pass' | 'fail' | 'testing' | null}>({});

  const runTest = async (testName: string, testFn: () => Promise<boolean>) => {
    setTestResults(prev => ({ ...prev, [testName]: 'testing' }));
    try {
      const result = await testFn();
      setTestResults(prev => ({ ...prev, [testName]: result ? 'pass' : 'fail' }));
      return result;
    } catch (error) {
      console.error(`Test ${testName} failed:`, error);
      setTestResults(prev => ({ ...prev, [testName]: 'fail' }));
      return false;
    }
  };

  const runAllTests = async () => {
    // Test 1: Check authentication state
    await runTest('auth-state', async () => {
      return typeof user !== 'undefined' && typeof loading === 'boolean';
    });

    // Test 2: Check user data structure
    await runTest('user-data', async () => {
      if (!user) return false;
      return !!(user.uid && user.email && user.firstName);
    });

    // Test 3: Check API connectivity
    await runTest('api-health', async () => {
      const functionsUrl = process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL || 
                          'https://api-7wtrvbj3mq-ew.a.run.app';
      const response = await fetch(`${functionsUrl}/api/health`);
      return response.ok;
    });

    // Test 4: Check course access status
    await runTest('course-access', async () => {
      if (!user) return true; // Skip if not logged in
      return typeof user.courseAccess === 'boolean';
    });

    // Test 5: Check navigation
    await runTest('navigation', async () => {
      return !!(router && typeof router.push === 'function');
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Auth System Integration Test</h1>

        {/* Current Auth Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Status</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Authentication Status:</span>
              <span className={`font-medium ${user ? 'text-green-600' : 'text-red-600'}`}>
                {loading ? 'Loading...' : user ? 'Authenticated' : 'Not Authenticated'}
              </span>
            </div>
            {user && (
              <>
                <div className="flex items-center justify-between">
                  <span>User:</span>
                  <span className="font-medium">{user.firstName} {user.lastName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Email:</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Course Access:</span>
                  <span className={`font-medium ${user.courseAccess ? 'text-green-600' : 'text-yellow-600'}`}>
                    {user.courseAccess ? 'Active' : 'No Access'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* System Tests */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">System Tests</h2>
            <button
              onClick={runAllTests}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Run All Tests
            </button>
          </div>
          
          <div className="space-y-3">
            {[
              { id: 'auth-state', name: 'Authentication State' },
              { id: 'user-data', name: 'User Data Structure' },
              { id: 'api-health', name: 'API Connectivity' },
              { id: 'course-access', name: 'Course Access Check' },
              { id: 'navigation', name: 'Navigation System' }
            ].map(test => (
              <div key={test.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <span>{test.name}</span>
                <span>
                  {testResults[test.id] === 'pass' && <Check className="w-5 h-5 text-green-600" />}
                  {testResults[test.id] === 'fail' && <X className="w-5 h-5 text-red-600" />}
                  {testResults[test.id] === 'testing' && <Loader2 className="w-5 h-5 animate-spin text-blue-600" />}
                  {testResults[test.id] === null && <span className="text-gray-400">Not tested</span>}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tests */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Navigation Tests</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => router.push('/auth')}
              className="flex items-center justify-center space-x-2 p-3 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100"
            >
              <span>Go to Auth Page</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center justify-center space-x-2 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
              disabled={!user}
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => router.push('/courses')}
              className="flex items-center justify-center space-x-2 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100"
            >
              <span>Go to Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => router.push('/dashboard/profile')}
              className="flex items-center justify-center space-x-2 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100"
              disabled={!user}
            >
              <span>Go to Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Test Summary */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>This page tests the authentication system integration.</p>
          <p>All tests should pass for the auth system to work properly.</p>
        </div>
      </div>
    </div>
  );
}