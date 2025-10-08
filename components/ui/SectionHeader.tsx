'use client';

import { motion } from "motion/react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  alignment?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  alignment = 'center',
  className = ''
}: SectionHeaderProps) {
  const alignClass = alignment === 'center' ? 'text-center' : 'text-left';
  const maxWidthClass = alignment === 'center' ? 'max-w-4xl mx-auto' : 'max-w-4xl';

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
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-xl rounded-full border border-gray-200/60 shadow-sm mb-6"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}
        >
          <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
          <span className="text-gray-700 text-sm font-medium">{eyebrow}</span>
        </motion.div>
      )}

      <h2 className={`text-4xl lg:text-5xl font-semibold leading-tight text-gray-900 mb-6 ${maxWidthClass}`}>
        {title}
      </h2>

      {description && (
        <p className={`text-lg text-gray-600 leading-relaxed ${maxWidthClass}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
