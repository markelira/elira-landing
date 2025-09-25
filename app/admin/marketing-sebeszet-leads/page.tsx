import React from 'react';
import { Metadata } from 'next';
import MarketingSebesztLeadsDashboard from '@/components/admin/MarketingSebesztLeadsDashboard';

export const metadata: Metadata = {
  title: 'Marketing Sebészet Konzultációk - Admin | Elira',
  description: 'Marketing Sebészet konzultációk kezelése és nyomon követése',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MarketingSebesztLeadsAdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Marketing Sebészet Konzultációk
              </h1>
              <p className="text-gray-600 mt-1">
                Ingyenes konzultációs igénylések kezelése és nyomon követése
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                Konzultációs típus: Marketing Sebészet
              </span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <MarketingSebesztLeadsDashboard />
      </main>
    </div>
  );
}