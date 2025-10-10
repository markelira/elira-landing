'use client';

import { motion } from "motion/react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  alignment?: 'left' | 'center';
  className?: string;
  variant?: 'light' | 'dark';
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  alignment = 'center',
  className = '',
  variant = 'light'
}: SectionHeaderProps) {
  const alignClass = alignment === 'center' ? 'text-center' : 'text-left';
  const maxWidthClass = alignment === 'center' ? 'max-w-4xl mx-auto' : 'max-w-4xl';

  const isDark = variant === 'dark';

  return (
    <motion.div
      className={`${alignClass} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
    >
      {eyebrow && (
        <motion.div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm mb-6 ${
            isDark
              ? 'bg-white/10 backdrop-blur-xl border-white/20'
              : 'bg-white/90 backdrop-blur-xl border-gray-200/60'
          }`}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ boxShadow: isDark ? '0 2px 8px rgba(0, 0, 0, 0.2)' : '0 2px 8px rgba(0, 0, 0, 0.04)' }}
        >
          <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-white/60' : 'bg-gray-500'}`} />
          <span className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'}`}>{eyebrow}</span>
        </motion.div>
      )}

      <h2 className={`text-4xl lg:text-5xl font-semibold leading-tight mb-6 ${maxWidthClass} ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {title}
      </h2>

      {description && (
        <p className={`text-lg leading-relaxed ${maxWidthClass} ${
          isDark ? 'text-white/80' : 'text-gray-600'
        }`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
