'use client';

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { valuePillars, type ValuePillar } from "@/lib/content/value-pillars";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface PillarCardProps {
  pillar: ValuePillar;
  index: number;
}

function PillarCard({ pillar, index }: PillarCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Icon mapping
  const getIcon = () => {
    switch (pillar.icon) {
      case 'adjustments':
        return (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        );
      case 'template':
        return (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'globe':
        return (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  // Accent color classes - subtle professional
  const accentClasses = {
    blue: {
      icon: 'text-blue-600',
      iconBg: 'bg-blue-50',
      border: 'border-blue-600'
    },
    emerald: {
      icon: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      border: 'border-emerald-600'
    },
    purple: {
      icon: 'text-purple-600',
      iconBg: 'bg-purple-50',
      border: 'border-purple-600'
    }
  }[pillar.accentColor];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 20
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="h-full"
    >
      <div className={`bg-white border-l-4 ${accentClasses.border} border-t border-r border-b border-gray-200 rounded-lg p-6 sm:p-8 lg:p-10 h-full flex flex-col hover:border-gray-300 transition-colors duration-200`}>
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-16 h-16 ${accentClasses.iconBg} rounded-lg mb-4 sm:mb-6`}>
          <div className={accentClasses.icon}>
            {getIcon()}
          </div>
        </div>

        {/* Short description badge */}
        <div className="mb-4">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {pillar.shortDesc}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight">
          {pillar.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed flex-1">
          {pillar.description}
        </p>
      </div>
    </motion.div>
  );
}

interface ValueClaritySectionProps {
  showBackgroundPattern?: boolean;
}

export function ValueClaritySection({ showBackgroundPattern = true }: ValueClaritySectionProps) {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          eyebrow="Értékalapú megközelítés"
          title="Mi az Elira? Nem még egy kurzus platform."
          description="Nem csak tanítunk - hanem megmutatjuk, segítünk, vagy közösen megcsináljuk. A céged méretétől függ mennyire van szükséged ránk. Startupoknak: lépésről-lépésre útmutatók. Kisvállalatoknak: teljes rendszerek + opcionális support. Középvállalatoknak: együtt építjük meg."
        />

        {/* 3 Pillar Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {valuePillars.map((pillar, index) => (
            <PillarCard
              key={pillar.id}
              pillar={pillar}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
