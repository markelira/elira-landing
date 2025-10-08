'use client';

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { platformScreenshots, featureBadges } from "@/lib/content/platform-screenshots";
import { SectionHeader } from "@/components/ui/SectionHeader";

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
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium"
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

  return (
    <div ref={ref} className="relative">
      {/* Main Display Area */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden border border-gray-200 shadow-2xl">
        {/* Placeholder with modern design */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center px-8">
            <div className="w-24 h-24 bg-gray-300 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-xl font-semibold text-gray-700 mb-2">
              {screenshots[activeIndex].title}
            </h4>
            <p className="text-sm text-gray-500">
              {screenshots[activeIndex].description}
            </p>
            <p className="text-xs text-gray-400 mt-4">
              Platform screenshots hamarosan
            </p>
          </div>
        </motion.div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Navigation Dots */}
      <div className="flex items-center justify-center gap-3 mt-8">
        {screenshots.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === index
                ? 'w-8 h-2 bg-gray-900'
                : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
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
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <SectionHeader
          eyebrow="Platform"
          title="Egyszerű. Tiszta. Működik."
          description="Nem komplikált LMS. Nem 2010-es design. Modern platform, gyors hozzáférés, minden eszköz egy helyen."
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
