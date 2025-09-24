'use client';

import React, { useState } from 'react';

interface SurveyCardProps {
  surveyUrl: string;
}

const SurveyCard: React.FC<SurveyCardProps> = ({ surveyUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-xl border border-white/50 w-full transition-all duration-500 hover:shadow-2xl lg:hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pulse indicator */}
      <div className="absolute -top-1 -right-1">
        <div className="relative">
          <div className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
          <div className="w-3 h-3 bg-yellow-400 rounded-full" />
        </div>
      </div>

      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="text-center space-y-3">
        <h3 className="text-gray-900 font-bold text-lg leading-tight">
          Segíts nekünk, hogy 100%-ban elégedett legyél!
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed">
          A célunk, hogy tökéletesen személyre szabott élményt nyújtsunk. 
          <span className="block mt-1 font-medium text-gray-700">
            Mondj el 2 percben, mit szeretnél elérni!
          </span>
        </p>

        {/* Benefit pills - Enhanced touch targets for mobile */}
        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <span className="inline-flex items-center px-4 py-2.5 rounded-full text-sm font-medium bg-teal-50 text-teal-700 border border-teal-200 min-h-[44px] cursor-default">
            ⚡ Gyors kitöltés
          </span>
          <span className="inline-flex items-center px-4 py-2.5 rounded-full text-sm font-medium bg-yellow-50 text-yellow-700 border border-yellow-200 min-h-[44px] cursor-default">
            🎯 Személyre szabott
          </span>
        </div>

        {/* CTA Button - Optimized touch target (min 48px height) */}
        <a
          href={surveyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full mt-4 px-6 py-4 min-h-[48px] bg-gradient-to-r from-teal-600 to-teal-700 text-white font-semibold rounded-xl transition-all duration-300 hover:from-teal-700 hover:to-teal-800 hover:shadow-lg transform hover:-translate-y-0.5 active:scale-[0.98] tap-highlight-transparent"
        >
          <span className="mr-2">Kitöltöm a kérdőívet</span>
          <svg 
            className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      {/* Trust indicator - Improved mobile readability */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-sm sm:text-xs text-gray-500 text-center flex items-center justify-center gap-1">
          <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          100% anonim • 2 perc
        </p>
      </div>
    </div>
  );
};

export default SurveyCard;