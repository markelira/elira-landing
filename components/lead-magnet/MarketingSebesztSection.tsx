"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Star, TrendingUp, Users, Clock, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import MarketingSebeszet from './MarketingSebeszet';

export interface MarketingSebesztSectionProps {
  // Layout
  layout?: 'hero' | 'inline' | 'sidebar' | 'modal-trigger';
  
  // Content customization
  showTestimonial?: boolean;
  showStats?: boolean;
  showGuarantee?: boolean;
  
  // Styling
  backgroundColor?: 'white' | 'teal' | 'gradient' | 'transparent';
  containerMaxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  
  // Behavior
  formInModal?: boolean;
  
  // Content overrides
  headline?: string;
  subheadline?: string;
  benefits?: string[] | Array<{title: string; description: string}>;
  
  // Tracking
  sectionId?: string;
}

const MarketingSebesztSection: React.FC<MarketingSebesztSectionProps> = ({
  layout = 'hero',
  showTestimonial = true,
  showStats = true,
  showGuarantee = true,
  backgroundColor = 'gradient',
  containerMaxWidth = 'xl',
  formInModal = false,
  headline,
  subheadline,
  benefits,
  sectionId = 'marketing-sebeszet-section'
}) => {

  const defaultBenefits = [
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
  ];

  const backgroundClasses = {
    white: 'bg-white',
    teal: 'bg-teal-50',
    gradient: 'bg-gradient-to-b from-teal-50 via-green-50 to-white',
    transparent: 'bg-transparent'
  };

  const containerClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full'
  };

  const layoutClasses = {
    hero: 'py-20 lg:py-32',
    inline: 'py-16 lg:py-24',
    sidebar: 'py-12 lg:py-16',
    'modal-trigger': 'py-8 lg:py-12'
  };

  const currentBenefits = benefits || defaultBenefits;
  const currentHeadline = headline || 'Webshop tulajdonosoknak: Díjmentes tanácsadás';
  const currentSubheadline = subheadline || 'Webshop tulajdonosoknak: 60 perces online audit és stratégiai tanácsadás, ahol feltárjuk a weboldal gyenge pontjait és konkrét lépésről-lépésre tervet kapsz a javításhoz';

  return (
    <section 
      id={sectionId}
      className={`${backgroundClasses[backgroundColor]} ${layoutClasses[layout]} relative overflow-hidden`}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-teal-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className={`${containerClasses[containerMaxWidth]} mx-auto px-4 sm:px-6 lg:px-8 relative z-10`}>
        {layout === 'hero' && (
          <HeroLayout
            headline={currentHeadline}
            subheadline={currentSubheadline}
            benefits={currentBenefits}
            showTestimonial={showTestimonial}
            showStats={showStats}
            showGuarantee={showGuarantee}
            formInModal={formInModal}
          />
        )}

        {layout === 'inline' && (
          <InlineLayout
            headline={currentHeadline}
            subheadline={currentSubheadline}
            benefits={currentBenefits}
            showTestimonial={showTestimonial}
            showStats={showStats}
            formInModal={formInModal}
          />
        )}

        {layout === 'sidebar' && (
          <SidebarLayout
            headline={currentHeadline}
            subheadline={currentSubheadline}
            benefits={currentBenefits}
            showTestimonial={showTestimonial}
            formInModal={formInModal}
          />
        )}

        {layout === 'modal-trigger' && (
          <ModalTriggerLayout
            headline={currentHeadline}
            subheadline={currentSubheadline}
            benefits={currentBenefits}
            showStats={showStats}
          />
        )}
      </div>
    </section>
  );
};

// Hero Layout Component
const HeroLayout: React.FC<{
  headline: string;
  subheadline: string;
  benefits: string[] | Array<{title: string; description: string}>;
  showTestimonial: boolean;
  showStats: boolean;
  showGuarantee: boolean;
  formInModal: boolean;
}> = ({ headline, subheadline, benefits, showTestimonial, showStats, showGuarantee, formInModal }) => (
  <div className="text-center mb-16">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
        {headline}
        <span className="block text-3xl lg:text-5xl text-teal-600 mt-4">
          30 Perc Alatt Több Vevő
        </span>
      </h1>

      <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto">
        {subheadline}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="flex items-start space-x-3 text-left"
          >
            <CheckCircle className="w-6 h-6 text-teal-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{typeof benefit === 'string' ? benefit : benefit.title}</span>
          </motion.div>
        ))}
      </div>

      {showStats && <StatsSection />}
      {showTestimonial && <TestimonialSection />}
      {showGuarantee && <GuaranteeSection />}
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="mt-16"
    >
      {!formInModal && <MarketingSebeszet />}
    </motion.div>
  </div>
);

// Expandable Benefit Component
const ExpandableBenefit: React.FC<{
  benefit: any;
  index: number;
}> = ({ benefit, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const isObject = typeof benefit === 'object' && benefit !== null;
  const title = isObject ? benefit.title : benefit;
  const description = isObject ? benefit.description : null;
  
  const gradients = [
    'from-teal-500 to-cyan-500',
    'from-green-500 to-teal-500',
    'from-cyan-500 to-blue-500',
    'from-blue-500 to-indigo-500'
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.1 }}
      whileHover={{ y: -2 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border ${isExpanded ? 'border-teal-200' : 'border-gray-100'}`}>
        {/* Gradient accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[index % 4]}`} />
        
        <div 
          className={`p-4 sm:p-6 ${description ? 'cursor-pointer' : ''}`}
          onClick={() => description && setIsExpanded(!isExpanded)}
        >
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="flex-shrink-0">
              <div className={`relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${gradients[index % 4]} rounded-xl flex items-center justify-center transform transition-transform ${isHovered ? 'scale-110' : ''}`}>
                <span className="text-white font-bold text-base sm:text-lg">{index + 1}</span>
                {isHovered && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradients[index % 4]}`}
                  />
                )}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-sm sm:text-base uppercase tracking-wide leading-tight mb-1">
                {title}
              </h3>
              {!isExpanded && description && (
                <p className="text-xs text-gray-500 italic">Kattints a részletekért...</p>
              )}
            </div>
            {description && (
              <div className="flex-shrink-0">
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center"
                >
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                </motion.div>
              </div>
            )}
          </div>
        </div>
        
        <AnimatePresence>
          {isExpanded && description && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                <p className="text-gray-600 text-sm leading-relaxed pl-16">
                  {description}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Inline Layout Component  
const InlineLayout: React.FC<{
  headline: string;
  subheadline: string;
  benefits: string[] | Array<{title: string; description: string}>;
  showTestimonial: boolean;
  showStats: boolean;
  formInModal: boolean;
}> = ({ headline, subheadline, benefits, showTestimonial, showStats, formInModal }) => (
  <div className="max-w-5xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12"
    >
      {/* Clean Badge - Mobile First */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-block mb-4 sm:mb-6"
      >
        <span className="inline-flex items-center gap-1 sm:gap-2 bg-teal-100 text-teal-700 px-3 py-2 sm:px-4 rounded-full font-semibold text-xs sm:text-sm uppercase tracking-wide">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
          Limitált helyek
        </span>
      </motion.div>
      
      {/* Main Headline - Mobile First */}
      <motion.h1 
        className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2 sm:px-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <span className="text-gray-900 font-black block sm:inline">Webshop tulajdonosoknak:</span>
        <br className="hidden sm:block" />
        <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent font-black">
          Díjmentes tanácsadás
        </span>
      </motion.h1>
      
      {/* Subheadline - Mobile First */}
      <motion.p 
        className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <span className="font-semibold text-gray-900">60 perces</span> online audit és stratégiai tanácsadás, 
        ahol feltárjuk a weboldal gyenge pontjait és konkrét lépésről-lépésre tervet kapsz a javításhoz
      </motion.p>
      
      {/* Simple Urgency Banner - Mobile First */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="inline-block px-2 sm:px-0"
      >
        <div className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg">
          <span className="text-sm sm:text-base text-center">
            ⚡ Csak <span className="font-black text-base sm:text-lg mx-1">15</span> tanácsadást vállalunk havonta
          </span>
        </div>
      </motion.div>
    </motion.div>

    {/* Benefits Section - Mobile First */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="mb-8 sm:mb-12 px-4 sm:px-0"
    >
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
        Mit kapsz a 60 perces díjmentes tanácsadáson?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
        {benefits.map((benefit, index) => (
          <ExpandableBenefit key={index} benefit={benefit} index={index} />
        ))}
      </div>
      
      {/* Result Section - Mobile First */}
      <div className="mt-6 sm:mt-8 bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-4 sm:p-6 border border-teal-200 max-w-4xl mx-auto">
        <h3 className="font-bold text-gray-900 mb-2 sm:mb-3 text-base sm:text-lg">A VÉGEREDMÉNY:</h3>
        <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
          60 perc múlva pontosan tudod, ki a vevőd, mire vágyik, mit kell neki mondanod, és hogyan léphetsz előre a konkurenciával szemben.
        </p>
        <div className="pt-3 sm:pt-4 border-t border-teal-200">
          <p className="font-semibold text-teal-700 text-sm sm:text-base">
            🎁 BÓNUSZ: Megkapod írásban az audit eredményét és a lépésről-lépésre implementációs tervet, amit azonnal alkalmazhatsz.
          </p>
        </div>
      </div>
    </motion.div>

    {/* Stats and Testimonial */}
    <div className="mb-12">
      {showStats && <StatsSection />}
      {showTestimonial && <TestimonialSection />}
    </div>

    {/* Calendar Section at Bottom */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="mt-12"
    >
      {!formInModal && <MarketingSebeszet />}
    </motion.div>
  </div>
);

// Sidebar Layout Component
const SidebarLayout: React.FC<{
  headline: string;
  subheadline: string;
  benefits: string[] | Array<{title: string; description: string}>;
  showTestimonial: boolean;
  formInModal: boolean;
}> = ({ headline, subheadline, benefits, showTestimonial, formInModal }) => (
  <div className="grid lg:grid-cols-3 gap-8">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="lg:col-span-2 space-y-6"
    >
      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
        {headline}
      </h3>

      <p className="text-gray-600">
        {subheadline}
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start space-x-2">
            <CheckCircle className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">{typeof benefit === 'string' ? benefit : benefit.title}</span>
          </div>
        ))}
      </div>

      {showTestimonial && <TestimonialSection />}
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="lg:col-span-1"
    >
      {!formInModal && (
        <div className="sticky top-8">
          <MarketingSebeszet />
        </div>
      )}
    </motion.div>
  </div>
);

// Modal Trigger Layout Component
const ModalTriggerLayout: React.FC<{
  headline: string;
  subheadline: string;
  benefits: string[] | Array<{title: string; description: string}>;
  showStats: boolean;
}> = ({ headline, subheadline, benefits, showStats }) => (
  <div className="text-center space-y-8">
    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
      {headline}
    </h3>

    <p className="text-gray-600 max-w-2xl mx-auto">
      {subheadline}
    </p>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {benefits.map((benefit, index) => (
        <div key={index} className="flex items-start space-x-2 text-left">
          <CheckCircle className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-gray-700">{typeof benefit === 'string' ? benefit : benefit.title}</span>
        </div>
      ))}
    </div>

    {showStats && <StatsSection />}
  </div>
);

// Stats Section Component
const StatsSection: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="grid grid-cols-3 gap-8 py-8 border-y border-gray-200"
  >
    <div className="text-center">
      <TrendingUp className="w-8 h-8 text-teal-500 mx-auto mb-2" />
      <p className="text-2xl font-bold text-gray-900">127%</p>
      <p className="text-sm text-gray-600">Átlag növekedés</p>
    </div>
    <div className="text-center">
      <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
      <p className="text-2xl font-bold text-gray-900">300+</p>
      <p className="text-sm text-gray-600">Elégedett ügyfél</p>
    </div>
    <div className="text-center">
      <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
      <p className="text-2xl font-bold text-gray-900">4.9/5</p>
      <p className="text-sm text-gray-600">Értékelés</p>
    </div>
  </motion.div>
);

// Testimonial Section Component
const TestimonialSection: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg"
  >
    <div className="flex items-center space-x-2 mb-3">
      <Star className="w-5 h-5 text-yellow-500" />
      <Star className="w-5 h-5 text-yellow-500" />
      <Star className="w-5 h-5 text-yellow-500" />
      <Star className="w-5 h-5 text-yellow-500" />
      <Star className="w-5 h-5 text-yellow-500" />
    </div>
    <p className="text-gray-800 italic mb-3">
      "30 perc alatt többet tanultam a marketingről, mint az előző 3 évben. 
      A megbeszélés után azonnal láttam az eredményeket!"
    </p>
    <p className="text-sm text-gray-600">
      - Kovács Péter, üzlettulajdonos
    </p>
  </motion.div>
);

// Guarantee Section Component
const GuaranteeSection: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 }}
    className="flex items-center justify-center space-x-3 text-green-600 bg-green-50 px-6 py-4 rounded-xl border border-green-200"
  >
    <Shield className="w-6 h-6" />
    <span className="font-medium">
      100% kockázatmentes - Nincs rejtett költség, nincs kötelező vásárlás
    </span>
  </motion.div>
);

export default MarketingSebesztSection;