'use client';

import React from 'react';
import { Zap, TrendingDown, Clock } from 'lucide-react';
import PurchaseButton from '@/components/course/PurchaseButton';
import ConsultationButton from '@/components/buttons/ConsultationButton';

const FOMOSection: React.FC = () => {

  return (
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: '#F8F7F5' }}>
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 relative">
              <span className="relative z-10">Miközben te ezt olvasod:</span>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-60"></div>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A piaci adatok egyértelműen mutatják az AI-copywriting fontosságát
            </p>
          </div>

          {/* Real-time Stats */}
          <div className="space-y-4 mb-12">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all duration-300 group relative overflow-hidden">
              {/* Animated accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Zap className="w-6 h-6 text-orange-600 group-hover:text-orange-700" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 text-lg font-semibold mb-1">
                    10-ből 8 versenytársad már AI-al ír szövegeket
                  </p>
                  <p className="text-gray-600 text-sm">
                    Míg te ezt olvasod, ők már dolgoznak
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 group relative overflow-hidden">
              {/* Animated accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Clock className="w-6 h-6 text-blue-600 group-hover:text-blue-700" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 text-lg font-semibold mb-1">
                    Naponta 450+ cég bevezeti az AI-t
                  </p>
                  <p className="text-gray-600 text-sm">
                    Minden percben távolabb kerülsz tőlük
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:border-red-200 transition-all duration-300 group relative overflow-hidden">
              {/* Animated accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-red-500 to-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <TrendingDown className="w-6 h-6 text-red-600 group-hover:text-red-700" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 text-lg font-semibold mb-1">
                    53%-al több időt és pénzt veszítesz, mint ők
                  </p>
                  <p className="text-gray-600 text-sm">
                    Ez a szakadék minden nap nő
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-8 shadow-md hover:shadow-xl transition-all duration-300 relative">
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-100 to-transparent rounded-bl-full opacity-50"></div>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center relative">
              <span className="relative z-10">Eredmény:</span>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 text-lg">⚡</span>
                </div>
                <span className="text-gray-900 text-lg font-medium">Ők kapják a te ügyfeleidet</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 text-lg">💸</span>
                </div>
                <span className="text-gray-900 text-lg font-medium">Ők viszik el a te profitod</span>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 text-lg">⛔</span>
                </div>
                <span className="text-gray-900 text-lg font-medium">Te maradsz le véglegesen</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="w-16 h-0.5 bg-gray-300 mx-auto rounded-full"></div>
              <p className="text-gray-600 text-sm font-medium mt-3">
                Minden pillanat számít
              </p>
            </div>
          </div>

          {/* Purchase CTA */}
          <div className="text-center mt-12">
            <div className="inline-flex flex-col md:flex-row gap-4 items-center">
              <PurchaseButton 
                courseId="ai-copywriting-course"
                className="px-8 py-4 rounded-lg font-semibold text-base transition-all duration-200 min-w-[280px]"
              />
              <div className="text-gray-500 text-lg font-bold hidden md:block">VAGY</div>
              <ConsultationButton 
                variant="outline"
                size="lg"
                className="min-w-[280px]"
              />
            </div>
            <div className="mt-4 text-center text-gray-600 text-sm">
              🤔 Bizonytalan vagy? Beszéljük meg!
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default FOMOSection;