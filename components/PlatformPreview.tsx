'use client';

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { platformScreenshots, featureBadges } from "@/lib/content/platform-screenshots";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Image from "next/image";

interface FeatureBadgesProps {
  badges: typeof featureBadges;
}

function FeatureBadges({ badges }: FeatureBadgesProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'mobile':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'download':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        );
      case 'template':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-4 mt-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
    >
      {badges.map((badge, index) => (
        <motion.div
          key={badge.label}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl text-sm font-medium"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
          viewport={{ once: true }}
        >
          {getIcon(badge.icon)}
          <span>{badge.label}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

interface ScreenshotCarouselProps {
  screenshots: typeof platformScreenshots;
  autoplay?: boolean;
  interval?: number;
}

function ScreenshotCarousel({ screenshots }: ScreenshotCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [imageLoaded, setImageLoaded] = useState(false);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
    setImageLoaded(false);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
    setImageLoaded(false);
  };

  return (
    <div ref={ref} className="relative">
      {/* Title Above Carousel */}
      <motion.div
        className="text-center mb-6"
        key={activeIndex}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">
          {screenshots[activeIndex].title}
        </h3>
        <p className="text-white/70 text-sm md:text-base">
          {screenshots[activeIndex].description}
        </p>
      </motion.div>

      {/* Main Display Area */}
      <div className="relative aspect-video bg-gradient-to-br from-white/5 to-white/10 rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
        {/* Image Display */}
        <motion.div
          key={activeIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={screenshots[activeIndex].imagePath}
            alt={screenshots[activeIndex].alt}
            fill
            className="object-cover"
            onLoad={() => setImageLoaded(true)}
            priority={activeIndex === 0}
          />
        </motion.div>

        {/* Fallback/Loading state */}
        {!imageLoaded && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center px-8">
              <div className="w-24 h-24 bg-white/10 border border-white/20 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">
                {screenshots[activeIndex].title}
              </h4>
              <p className="text-sm text-white/70">
                {screenshots[activeIndex].description}
              </p>
            </div>
          </motion.div>
        )}

        {/* Subtle overlay for better readability if needed */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Left Navigation Arrow */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10 group"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px) saturate(150%)',
            WebkitBackdropFilter: 'blur(20px) saturate(150%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6 text-white transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Navigation Arrow */}
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 z-10 group"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px) saturate(150%)',
            WebkitBackdropFilter: 'blur(20px) saturate(150%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6 text-white transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="flex items-center justify-center gap-3 mt-8">
        {screenshots.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              setImageLoaded(false);
            }}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === index
                ? 'w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white/30 hover:bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`View ${screenshots[index].title}`}
          />
        ))}
      </div>
    </div>
  );
}

interface PlatformPreviewProps {
  variant?: 'carousel' | 'grid';
  autoplay?: boolean;
}

export function PlatformPreview({ variant = 'carousel', autoplay = true }: PlatformPreviewProps) {
  return (
    <section
      className="py-32 relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #16222F 0%, #466C95 100%)'
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <SectionHeader
          eyebrow="Platform"
          title="Egyszerű. Tiszta. Működik."
          description="Nem komplikált LMS. Nem 2010-es design. Modern platform, gyors hozzáférés, minden eszköz egy helyen."
          variant="dark"
        />

        {/* Screenshot Carousel */}
        <div className="mt-16">
          <ScreenshotCarousel
            screenshots={platformScreenshots}
            autoplay={autoplay}
            interval={5000}
          />
        </div>

        {/* Feature badges below */}
        <FeatureBadges badges={featureBadges} />
      </div>
    </section>
  );
}
