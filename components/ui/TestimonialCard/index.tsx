'use client';

import Image from 'next/image';

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar: string;
  result?: string;
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  title,
  company,
  avatar,
  result,
  className = '',
}: TestimonialCardProps) {
  return (
    <div className={`group bg-white border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:border-slate-300 transition-shadow duration-500 h-full flex flex-col ${className}`}>
      
      {/* Quote icon */}
      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-6 group-hover:opacity-80 transition-opacity duration-500">
        <svg className="w-6 h-6 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
        </svg>
      </div>

      {/* Quote text */}
      <blockquote className="text-neutral-700 leading-relaxed mb-8 flex-grow text-lg">
        "{quote}"
      </blockquote>

      {/* Result badge (if provided) */}
      {result && (
        <div className="mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800">
            📈 {result}
          </span>
        </div>
      )}

      {/* Author info */}
      <div className="flex items-center pt-6 border-t border-neutral-100">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 bg-slate-200 flex items-center justify-center">
          {/* Avatar placeholder with initials */}
          <span className="text-lg font-bold text-slate-500">
            {author.split(' ').map(name => name[0]).join('')}
          </span>
        </div>
        
        <div className="flex-grow">
          <div className="font-bold text-slate-900 text-lg">
            {author}
          </div>
          <div className="text-sm text-neutral-600">
            {title}
          </div>
          <div className="text-sm font-semibold text-slate-600">
            {company}
          </div>
        </div>
      </div>

    </div>
  );
}