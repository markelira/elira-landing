import { PremiumHeader } from "./components/PremiumHeader";
import { PremiumHeroSection } from "./components/PremiumHeroSection";
import { InteractiveProblemSolution } from "./components/InteractiveProblemSolution";
import { PremiumExpertSection } from "./components/PremiumExpertSection";
import { InteractiveHowItWorks } from "./components/InteractiveHowItWorks";
import { PremiumTargetAudience } from "./components/PremiumTargetAudience";
import { PremiumCTA } from "./components/PremiumCTA";
import { PremiumFooter } from "./components/PremiumFooter";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <PremiumHeader />
      <main>
        <PremiumHeroSection />
        <InteractiveProblemSolution />
        <PremiumExpertSection />
        <InteractiveHowItWorks />
        <PremiumTargetAudience />
        <PremiumCTA />
      </main>
      <PremiumFooter />
    </div>
  );
}