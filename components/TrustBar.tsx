'use client';

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { trustBadges } from "@/lib/content/trust-data";

interface TrustBarProps {
  showAnimation?: boolean;
  variant?: 'light' | 'subtle';
}

interface StatCardProps {
  icon: string;
  label: string;
  value: number;
  suffix: string;
  description: string;
  delay: number;
}

function StatCard({ icon, label, value, suffix, description, delay }: StatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  // Animated counter effect
  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 fps
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  // Icon mapping
  const getIcon = () => {
    switch (icon) {
      case 'users':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'check':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'globe':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 20
      }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <motion.div
        className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 transition-all duration-300"
        whileHover={{
          scale: 1.02,
          boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.1)'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Icon */}
        <motion.div
          className="flex items-center justify-center w-12 h-12 bg-gray-100 text-gray-600 rounded-xl mb-4"
          whileHover={{ rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          {getIcon()}
        </motion.div>

        {/* Animated Counter */}
        <div className="mb-2">
          <motion.span
            className="text-4xl font-bold text-gray-900"
            key={count}
          >
            {count}{suffix}
          </motion.span>
        </div>

        {/* Label */}
        <div className="text-sm font-semibold text-gray-700 mb-1">
          {label}
        </div>

        {/* Description */}
        <div className="text-xs text-gray-500">
          {description}
        </div>

        {/* Hover effect - subtle gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
}

export function TrustBar({ showAnimation = true, variant = 'subtle' }: TrustBarProps) {
  const bgClass = variant === 'light' ? 'bg-white' : 'bg-gray-50';

  return (
    <section
      className={`py-12 ${bgClass} border-y border-gray-100 relative overflow-hidden`}
      role="region"
      aria-label="Trust indicators"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.5) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
        {/* Animated Counter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {trustBadges.map((badge, index) => (
            <StatCard
              key={badge.icon}
              icon={badge.icon}
              label={badge.label}
              value={badge.value}
              suffix={badge.suffix}
              description={badge.description}
              delay={showAnimation ? index * 0.1 : 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
