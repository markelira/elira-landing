'use client';

import { useState, useEffect } from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';
import { PerformanceProvider } from '@/components/PerformanceProvider';
import InfoBar from '@/components/InfoBar';
import SalesHero from '@/components/sales/SalesHero';
import MainCourseOffer from '@/components/sections/MainCourseOffer';
import InteractiveCourseModules from '@/components/course/InteractiveCourseModules';
import ZoliIntroduction from '@/components/sales/ZoliIntroduction';
import OfferSummary from '@/components/sections/OfferSummary';
import NeedEstablishment from '@/components/sections/NeedEstablishment';
import ProblemSection from '@/components/sales/ProblemSection';
import SolutionSection from '@/components/sales/SolutionSection';
import TestimonialsSection from '@/components/sales/TestimonialsSection';
import FOMOSection from '@/components/sales/FOMOSection';
import ExamplesSection from '@/components/sales/ExamplesSection';

export default function Home() {
  return (
    <PerformanceProvider>
      <InfoBar />
      <ScrollProgressIndicator />
      <FloatingNavbar />
      <main className="pt-[130px] sm:pt-[140px] overflow-x-hidden">
        <SalesHero />
        <NeedEstablishment />
        <MainCourseOffer />
        <ExamplesSection />
        <FOMOSection />
        <ProblemSection />
        {/* TODO: Add 3 one-line testimonials here */}
        <div id="quick-testimonial-bar">
          {/* TODO: Add 3 one-line testimonials here */}
        </div>
        <SolutionSection />
        <TestimonialsSection />
        <ZoliIntroduction />
        <OfferSummary />
        {/* TODO: Add value stack with total value calculation */}
        <div id="value-stack-section">
          {/* TODO: Add value stack with total value calculation */}
        </div>
        {/* TODO: Add FAQ accordion with 5-8 questions */}
        <div id="faq-section">
          {/* TODO: Add FAQ accordion with 5-8 questions */}
        </div>
      </main>
      <Footer />
    </PerformanceProvider>
  );
}
