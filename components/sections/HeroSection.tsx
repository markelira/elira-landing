'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown, Download } from 'lucide-react';
import { content } from '@/lib/content/hu';
import QuickAccessCard from '@/components/ui/QuickAccessCard';
import EmailCaptureModal from '@/components/modals/EmailCaptureModal';
import useAnalytics from '@/hooks/useAnalytics';
import { useSocialProof } from '@/hooks/useFirestore';

const HeroSection: React.FC = () => {
  const { trackButton, track } = useAnalytics();
  const { totalDownloads } = useSocialProof();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMagnet, setSelectedMagnet] = useState<any>(null);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const scrollToMagnets = () => {
    trackButton('View All Materials', 'hero-view-all');
    const element = document.getElementById('transition');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCommunity = () => {
    trackButton('Join Community', 'hero-community');
    const element = document.getElementById('discord');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openModal = (magnetType: string) => {
    // Track click
    track('hero_quick_access_click', { magnet: magnetType });
    
    // Add to selected cards
    setSelectedCards([...selectedCards, magnetType]);
    
    // Find the magnet from content
    const magnet = content.magnets.items.find((m: any) => m.id === magnetType);
    
    // Open existing EmailCaptureModal
    setSelectedMagnet(magnet);
    setModalOpen(true);
  };

  const scrollToNext = () => {
    trackButton('Scroll Down', 'hero-scroll');
    const element = document.getElementById('lead-magnets');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section min-h-screen relative overflow-hidden">
      {/* Background Layer - Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-mesh" />
      
      {/* Subtle fade-out at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
      
      {/* Additional decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating dots pattern */}
        <div className="absolute top-20 right-20 w-32 h-32 
                        bg-gradient-to-br from-teal-200/20 to-cyan-200/20 
                        rounded-full blur-2xl animate-pulse-slow" />
        
        {/* Grid pattern behind cards */}
        <svg className="absolute right-0 top-0 w-full h-full opacity-5">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" />
      
      {/* Content Grid */}
      <div className="container mx-auto px-6 py-20 lg:py-0 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          
          {/* LEFT COLUMN - Copy & Primary CTA */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hero-copy-column space-y-6 lg:pr-8"
          >
            {/* Eyebrow Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 text-sm font-medium text-teal-700 bg-teal-50 px-4 py-2 rounded-full"
            >
              <span className="animate-pulse w-2 h-2 bg-teal-700 rounded-full"></span>
              <span>Elira.hu</span>
            </motion.div>
            
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight"
            >
              Tanulj{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-cyan-600">
                ingyen,
              </span>
              <br />
              alkalmazd{" "}
              <span className="relative">
                holnap
                <svg 
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    d="M2 8C50 3 100 3 150 8C200 13 250 3 298 8"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0d9488" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-gray-600 leading-relaxed"
            >
              <span className="font-semibold text-gray-900"> 5 prémium anyag</span> vár rád
              <span className="text-teal-700 font-semibold"> teljesen ingyen.</span>
            </motion.p>
            
            {/* Value Props List */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-3"
            >
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-teal-700" />
                </div>
                <span className="text-gray-700">Azonnal alkalmazható tudás</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-teal-700" />
                </div>
                <span className="text-gray-700">Email-ben küldve 1 percen belül</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-teal-700" />
                </div>
                <span className="text-gray-700">Nincs rejtett költség vagy upsell</span>
              </li>
            </motion.ul>
            
            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button 
                onClick={scrollToMagnets}
                className="relative overflow-hidden group px-8 py-4 bg-teal-700 text-white font-semibold rounded-full 
                           hover:bg-teal-800 transform hover:scale-105 transition-all 
                           shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10">Összes megtekintése </span>
                {/* Ripple on hover */}
                <div className="absolute inset-0 bg-white/20 scale-0 
                                group-hover:scale-100 transition-transform 
                                duration-500 rounded-full" />
                {/* Arrow animation */}
                <span className="inline-block transition-transform 
                                 group-hover:translate-x-1"> →</span>
              </button>
              <button 
                onClick={scrollToCommunity}
                className="relative border-2 border-teal-700 px-8 py-4 font-semibold rounded-full 
                           before:absolute before:inset-0 
                           before:bg-teal-700 before:scale-x-0 
                           hover:before:scale-x-100 
                           before:transition-transform before:origin-left
                           before:rounded-full overflow-hidden"
              >
                <span className="relative z-10 mix-blend-difference text-teal-700">
                  Csatlakozz a Közösséghez
                </span>
              </button>
            </motion.div>
            
            {/* Trust Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-6 pt-4 text-sm text-gray-600"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">📚</span>
                <span>5 letölthető anyag</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <span>Azonnali hozzáférés</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4 text-teal-700" />
                <span className="font-semibold text-teal-800">
                  {totalDownloads || 0} letöltés összesen
                </span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* RIGHT COLUMN - Quick Access PDF Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hero-cards-column relative"
          >
            {/* Container for cards */}
            <div className="relative">
              {/* Decorative blob behind cards */}
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-100 to-cyan-100 
                              rounded-3xl blur-2xl opacity-40 animate-pulse"></div>
              
              {/* Cards Grid */}
              <div className="relative grid gap-4">
                
                {/* Quick Access Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="text-center mb-4"
                >
                  <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold text-left">
                    🎁 Válassz és töltsd le ingyen!
                  </span>
                </motion.div>
                
                {/* PDF Cards - 2x2 Grid with 5th centered */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Card 1: ChatGPT */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="relative"
                  >
                    <QuickAccessCard
                      icon="🤖"
                      title="ChatGPT prompt sablonok"
                      subtitle="100+ sablon"
                      gradient="from-purple-500 to-pink-500"
                      onClick={() => openModal('chatgpt-prompts')}
                      isSelected={selectedCards.includes('chatgpt-prompts')}
                    />
                  </motion.div>
                  
                  {/* Card 2: LinkedIn */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <QuickAccessCard
                      icon="📈"
                      title="LinkedIn növekedési naptár"
                      subtitle="30 napos terv"
                      gradient="from-blue-500 to-cyan-500"
                      onClick={() => openModal('linkedin-calendar')}
                    />
                  </motion.div>
                  
                  {/* Card 3: Email */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    <QuickAccessCard
                      icon="📧"
                      title="Email marketing sablonok"
                      subtitle="Gyakorlati stratégiák"
                      gradient="from-green-500 to-emerald-500"
                      onClick={() => openModal('email-templates')}
                    />
                  </motion.div>
                  
                  {/* Card 4: TikTok */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    <QuickAccessCard
                      icon="🎬"
                      title="TikTok algoritmus útmutató"
                      subtitle="Magyar piacra"
                      gradient="from-pink-500 to-rose-500"
                      onClick={() => openModal('tiktok-guide')}
                    />
                  </motion.div>
                </div>
                
                {/* Card 5: Automation - Full Width */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                >
                  <QuickAccessCard
                    icon="⚡"
                    title="Marketing automatizáció"
                    subtitle="Munkafolyamat sablonok"
                    gradient="from-orange-500 to-red-500"
                    onClick={() => openModal('automation-workflows')}
                    fullWidth
                  />
                </motion.div>
                
                {/* Bottom CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                  className="text-center mt-4"
                >
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1, 
          delay: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 2
        }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 hover:text-teal-700 transition-colors cursor-pointer"
      >
        <ChevronDown size={32} />
      </motion.button>

      {/* Email Capture Modal */}
      <EmailCaptureModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        magnet={selectedMagnet}
      />
    </section>
  );
};

export default HeroSection;