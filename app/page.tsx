'use client';

import { useState, useEffect } from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import HeroSection from '@/components/sections/HeroSection';
import TransitionSection from '@/components/sections/TransitionSection';
import LeadMagnetsGrid from '@/components/sections/LeadMagnetsGrid';
import CommunityHub from '@/components/sections/CommunityHub';
import CommunityProof from '@/components/sections/CommunityProof';
import DiscordAcademy from '@/components/sections/DiscordAcademy';
import Footer from '@/components/Footer';
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator';
import { PerformanceProvider } from '@/components/PerformanceProvider';

// Dynamic imports for performance
import { 
  CookieBanner,
  ValueProposition,
  FinalCTA,
  OptimizedSection,
  preloadCriticalResources
} from '@/components/PerformanceOptimizations';

export default function Home() {

  useEffect(() => {
    // Preload critical resources for better performance
    preloadCriticalResources();
  }, []);

  return (
    <PerformanceProvider>
      <ScrollProgressIndicator />
      <FloatingNavbar />
      <main className="pt-16 md:pt-0">
        <HeroSection />
        <TransitionSection />
        <LeadMagnetsGrid />
        
        {/* Community Sections - Hormozi-style value stack */}
        <CommunityHub />
        <DiscordAcademy />
        
        {/* Lazy load below-fold sections */}
        <OptimizedSection>
          <ValueProposition />
        </OptimizedSection>
        
        <OptimizedSection>
          <CommunityProof />
        </OptimizedSection>
        
        <OptimizedSection>
          <FinalCTA />
        </OptimizedSection>
      </main>
      <Footer />
      
      {/* Load modals only when needed */}
      <CookieBanner />
    </PerformanceProvider>
  );
}
