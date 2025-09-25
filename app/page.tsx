'use client';

import { useState, useEffect } from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { PerformanceProvider } from '@/components/PerformanceProvider';
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
import MarketingSebesztSection from '@/components/lead-magnet/MarketingSebesztSection';
import { MarketingSebesztProvider } from '@/contexts/MarketingSebesztContext';

export default function Home() {
  return (
    <PerformanceProvider>
      <FloatingNavbar />
      <main className="overflow-x-hidden">
        <SalesHero />
        <MarketingSebesztProvider>
          <MarketingSebesztSection 
            layout="inline"
            backgroundColor="white"
            containerMaxWidth="xl"
            showTestimonial={false}
            showStats={false}
            headline="Webshop tulajdonosoknak: Díjmentes tanácsadás"
            subheadline="60 perces online audit és stratégiai tanácsadás, ahol feltárjuk a weboldal gyenge pontjait és konkrét lépésről-lépésre tervet kapsz a javításhoz"
            benefits={[
              {
                title: 'MEGLÁTOD, PONTOSAN HOL TARTASZ MOST',
                description: 'Teljes weboldal audit során feltárjuk, hogy a jelenlegi oldalad milyen üzeneteket küld a látogatóknak, és miért döntik úgy, hogy nem vásárolnak tőled'
              },
              {
                title: 'MEGISMERED, MIRE REAGÁL A CÉLVEVŐD',
                description: 'Feltérképezzük, ki pontosan a potenciális vevőd, mik a fő fájdalompontjai, vágyai, és milyen üzenetekre reagál - hogy tudd, mit kell kommunikálnod'
              },
              {
                title: 'KÉSZ STRATÉGIÁT KAPSZ A JAVÍTÁSHOZ',
                description: 'Nem általános tanácsokat - hanem konkrét, lépésről-lépésre tervet arra, hogy mit írj át a weboldalon, milyen sorrendben, és hogyan szólítsd meg a vevőidet úgy, hogy ne tudjanak nemet mondani'
              },
              {
                title: 'MEGTUDOD, MIT CSINÁLNAK ROSSZUL A KONKURENSEID',
                description: 'Tanácsadás előtt elemezzük, és a riportban bemutatjuk a főbb versenytársaid weboldalait és feltárjuk azokat a hibákat, amiket ők követnek el - és megmutatjuk, hogyan használhatod ki ezeket a lehetőségeket a saját előnyödre'
              }
            ]}
          />
        </MarketingSebesztProvider>
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
