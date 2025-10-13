'use client';

import Link from 'next/link';
import { categoryColors } from '@/lib/blog-design-tokens';
import { getCategoryTranslation } from '@/lib/blog-data/sample-posts';

interface CategoryBadgeProps {
  category: string;
  href?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CategoryBadge({ category, href, size = 'md' }: CategoryBadgeProps) {
  const colorConfig = categoryColors[category as keyof typeof categoryColors] || categoryColors['Marketing'];
  const translatedCategory = getCategoryTranslation(category);

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-xs',
    lg: 'px-4 py-2 text-sm',
  };

  const badge = (
    <span
      className={`
        inline-flex items-center gap-1.5
        ${colorConfig.bg} ${colorConfig.text}
        ${sizeClasses[size]}
        font-semibold uppercase tracking-wider
        rounded-full
        border ${colorConfig.border}
        transition-all duration-200
        hover:scale-105
      `}
    >
      {translatedCategory}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {badge}
      </Link>
    );
  }

  return badge;
}
