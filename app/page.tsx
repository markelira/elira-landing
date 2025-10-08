'use client';

import { PremiumHeader } from "@/components/PremiumHeader";
import { PremiumHeroSection } from "@/components/PremiumHeroSection";
import { ValueClaritySection } from "@/components/ValueClaritySection";
import { CompanySizeSelector, CompanySizeProvider } from "@/components/CompanySizeSelector";
import { DynamicContent } from "@/components/DynamicContent";
import { CluelyHeroReplica } from "@/components/CluelyHeroReplica";
import { InteractiveProblemSolution } from "@/components/InteractiveProblemSolution";
import { ResultsSocialProof } from "@/components/ResultsSocialProof";
import { VideoTextMask } from "@/components/VideoTextMask";
import { CluelyTextMask } from "@/components/CluelyTextMask";
import { PremiumExpertSection } from "@/components/PremiumExpertSection";
import { InteractiveHowItWorks } from "@/components/InteractiveHowItWorks";
import { FeaturedMasterclassSpotlight } from "@/components/FeaturedMasterclassSpotlight";
import { PlatformPreview } from "@/components/PlatformPreview";
import { GeneralFAQ } from "@/components/GeneralFAQ";
import { PremiumTargetAudience } from "@/components/PremiumTargetAudience";
import { PremiumCTA } from "@/components/PremiumCTA";
import { PremiumFooter } from "@/components/PremiumFooter";

export default function Home() {
  return (
    <CompanySizeProvider>
      <div className="min-h-screen">
        <PremiumHeader />
        <main>
          <PremiumHeroSection />
          <ValueClaritySection />
          <CompanySizeSelector />

          {/* General content - always visible */}
          <InteractiveProblemSolution />
          <ResultsSocialProof />
          <InteractiveHowItWorks />
          <FeaturedMasterclassSpotlight />
          <PlatformPreview />
          <GeneralFAQ />

          {/* Personalized content - only after selection */}
          <DynamicContent>
            <PremiumTargetAudience />
            <PremiumCTA />
            <CluelyHeroReplica />
          </DynamicContent>

          {/* Cluely Hero Replica - before footer */}
          <CluelyHeroReplica />
        </main>
        <PremiumFooter />
      </div>
    </CompanySizeProvider>
  );
}