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
import useExitIntent from '@/hooks/useExitIntent';

// Dynamic imports for performance
import { 
  ExitIntentPopup,
  CookieBanner,
  ValueProposition,
  FinalCTA,
  OptimizedSection,
  preloadCriticalResources
} from '@/components/PerformanceOptimizations';

export default function Home() {
  const [showExitIntent, setShowExitIntent] = useState(false);

  useExitIntent({
    onExitIntent: () => setShowExitIntent(true),
    threshold: 50,
    sensitivity: 100
  });

  useEffect(() => {
    // Preload critical resources for better performance
    preloadCriticalResources();
  }, []);

  return (
    <>
      <ScrollProgressIndicator />
      <FloatingNavbar />
      <main>
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
      <ExitIntentPopup 
        isOpen={showExitIntent}
        onClose={() => setShowExitIntent(false)}
      />
      
      <CookieBanner />
    </>
  );
}
