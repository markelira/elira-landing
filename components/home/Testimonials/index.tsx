'use client';

import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { newHomeContent } from '@/lib/content/new-home';

export function Testimonials() {
  const { testimonials } = newHomeContent;

  return (
    <section className="section bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight">
            {testimonials.sectionTitle}
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            {testimonials.sectionSubtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid-premium grid-equal-height">
          {testimonials.items.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              quote={testimonial.quote}
              author={testimonial.author}
              title={testimonial.title}
              company={testimonial.company}
              avatar={testimonial.avatar}
              result={testimonial.result}
            />
          ))}
        </div>

        {/* Trust indicator */}
        <div className="mt-16 text-center">
          <p className="text-neutral-500 text-sm mb-4">
            500+ vállalkozás választotta már az Elirát
          </p>
          <div className="flex justify-center items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-sm font-semibold text-neutral-600">
              4.9/5 átlagos értékelés
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}