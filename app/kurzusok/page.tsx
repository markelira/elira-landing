'use client';

import { useState, useEffect } from 'react';
import { PremiumHeader } from '@/components/PremiumHeader';
import Footer from '@/components/Footer';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';
import { PerformanceProvider } from '@/components/PerformanceProvider';
import SalesHero from '@/components/sales/SalesHero';
import ZoliIntroduction from '@/components/sales/ZoliIntroduction';
import ProblemSection from '@/components/sales/ProblemSection';
import SolutionSection from '@/components/sales/SolutionSection';
import TripwireOffer from '@/components/sales/TripwireOffer';
import PricingSection from '@/components/sales/PricingSection';
import TestimonialsSection from '@/components/sales/TestimonialsSection';
import FinalCTA from '@/components/sales/FinalCTA';
import CourseDetailsSection from '@/components/course-detail/CourseDetailsSection';
import GameChanger from '@/components/sales/GameChanger';
import FOMOSection from '@/components/sales/FOMOSection';

export default function KurzusokPage() {
  return (
    <PerformanceProvider>
      <ScrollProgressIndicator />
      <PremiumHeader />
      <main className="pt-16 md:pt-0">
        <SalesHero />
        <CourseDetailsSection />
        <GameChanger />
        <FOMOSection />
        <ProblemSection />
        {/* TODO: Add 3 one-line testimonials here */}
        <div id="quick-testimonial-bar">
          {/* TODO: Add 3 one-line testimonials here */}
        </div>
        <SolutionSection />
        <TestimonialsSection />
        <ZoliIntroduction />
        {/* TODO: Add value stack with total value calculation */}
        <div id="value-stack-section">
          {/* TODO: Add value stack with total value calculation */}
        </div>
        <PricingSection />
        <TripwireOffer />
        {/* TODO: Add FAQ accordion with 5-8 questions */}
        <div id="faq-section">
          {/* TODO: Add FAQ accordion with 5-8 questions */}
        </div>
        <FinalCTA />
      </main>
      <Footer />
    </PerformanceProvider>
  );
}