'use client';

import Link from 'next/link';

interface CategoryCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  count: number;
  href?: string;
  className?: string;
}

export function CategoryCard({
  name,
  description,
  icon,
  count,
  href = '#',
  className = '',
}: CategoryCardProps) {
  const CardWrapper = href ? Link : 'div';
  const isComingSoon = count === 0;

  return (
    <CardWrapper 
      href={href}
      className={`group block bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-slate-300 transition-shadow duration-500 ${isComingSoon && 'opacity-60'} ${className}`}
    >
      {/* Icon */}
      <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center mb-4 group-hover:opacity-80 transition-opacity duration-500">
        {icon}
      </div>

      {/* Category name */}
      <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
        {name}
      </h3>

      {/* Description */}
      <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
        {description}
      </p>

      {/* Footer - count or coming soon */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        {isComingSoon ? (
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
            Hamarosan
          </span>
        ) : (
          <span className="text-sm font-semibold text-slate-600">
            {count} masterclass
          </span>
        )}
        
        {!isComingSoon && (
          <svg className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        )}
      </div>
    </CardWrapper>
  );
}