'use client';

import { newHomeContent } from '@/lib/content/new-home';

export function CredibilitySection() {
  const { credibility } = newHomeContent;

  return (
    <section className="section bg-teal-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Stats Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
            {credibility.sectionTitle}
          </h2>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {credibility.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-neutral-300 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partnerships Section */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-12">
            {credibility.partnerships.title}
          </h3>
          
          {/* Logo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {credibility.partnerships.logos.map((partner, index) => (
              <div 
                key={index} 
                className="w-full h-16 bg-white/10 rounded-lg flex items-center justify-center text-white/70 font-semibold text-sm border border-white/20 hover:bg-white/20 transition-colors"
              >
                {partner.name}
              </div>
            ))}
          </div>
          
          {/* Trust Indicator */}
          <div className="mt-16 pt-8 border-t border-white/20">
            <p className="text-neutral-300 text-sm mb-4">
              Világszínvonalú partnerek támogatásával
            </p>
            <div className="flex justify-center items-center space-x-2">
              <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-emerald-400 text-sm font-semibold">
                Hivatalos partneri státusz
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}