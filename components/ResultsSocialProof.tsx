'use client';

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { realTestimonials, type Testimonial } from "@/lib/content/results-data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import Image from "next/image";


// ===== TestimonialCard Component =====
interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Professional role colors - McKinsey-style subtle accents
  const roleColors = {
    leader: 'border-l-blue-600',
    academic: 'border-l-purple-600',
    professional: 'border-l-emerald-600'
  }[testimonial.roleType];

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
      <div className={`bg-white border-l-4 ${roleColors} border-t border-r border-b border-gray-200 p-10 h-full flex flex-col`}>
        {/* Author Info - McKinsey style: credentials first */}
        <div className="flex items-start gap-5 mb-8 pb-8 border-b border-gray-100">
          <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 ring-1 ring-gray-200">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-gray-900 font-semibold text-base mb-1">
              {testimonial.name}
            </div>
            <div className="text-gray-700 text-sm font-medium leading-snug mb-1">
              {testimonial.position}
            </div>
            {testimonial.company && (
              <div className="text-gray-500 text-sm mt-0.5">
                {testimonial.company}
              </div>
            )}
            <div className="mt-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
              {testimonial.roleLabel}
            </div>
          </div>
        </div>

        {/* Rating - subtle */}
        <div className="flex gap-0.5 mb-6">
          {[...Array(testimonial.rating)].map((_, i) => (
            <svg key={i} className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>

        {/* Message - larger, more prominent */}
        <blockquote className="text-gray-700 leading-relaxed text-base flex-1">
          "{testimonial.message}"
        </blockquote>
      </div>
    </motion.div>
  );
}

// ===== Main Component =====
interface ResultsSocialProofProps {
  showTestimonials?: boolean;
  maxTestimonials?: number;
}

export function ResultsSocialProof({ showTestimonials = true, maxTestimonials = 3 }: ResultsSocialProofProps) {
  const displayedTestimonials = realTestimonials.slice(0, maxTestimonials);

  return (
    <section className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          eyebrow="Cégvezetőktől az akadémiai szféráig"
          title="Mindenkinek, aki előre akar lépni"
          description="Vezetők, oktatók, szakemberek - különböző háttérrel, ugyanaz az eredmény: működő tudás, azonnali alkalmazás."
        />

        {/* Audience Type Pills - McKinsey style: subtle, clean */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mt-10 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-md">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
            <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">Cégvezetők</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-md">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-600"></div>
            <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">Oktatók & Kutatók</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 rounded-md">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-600"></div>
            <span className="text-xs font-medium text-gray-700 uppercase tracking-wide">Szakemberek</span>
          </div>
        </motion.div>

        {/* Testimonials Grid - increased spacing */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showTestimonials && displayedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
