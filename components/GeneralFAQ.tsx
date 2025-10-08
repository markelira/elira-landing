'use client';

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { generalFAQ, type FAQItem } from "@/lib/content/general-faq";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";

interface FAQItemComponentProps {
  faq: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItemComponent({ faq, isOpen, onToggle }: FAQItemComponentProps) {
  return (
    <motion.div
      className="border-b border-gray-200 last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <button
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        className="w-full py-6 flex items-center justify-between text-left group transition-colors duration-200 hover:text-blue-600"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <span className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 pr-4">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0"
        >
          <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: {
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1]
                },
                opacity: {
                  duration: 0.3,
                  delay: 0.1
                }
              }
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: {
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1]
                },
                opacity: {
                  duration: 0.2
                }
              }
            }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-12">
              <p className="text-base text-gray-700 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface GeneralFAQProps {
  maxVisible?: number;
  variant?: 'accordion' | 'grid';
}

export function GeneralFAQ({ maxVisible = 8, variant = 'accordion' }: GeneralFAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const displayedFAQ = generalFAQ.slice(0, maxVisible);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.5) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <SectionHeader
          eyebrow="Gyakori kérdések"
          title="Minden ami fontos a döntéshez"
          description="Válaszok a leggyakoribb kérdésekre - mielőtt kiválasztod a szinted."
        />

        {/* FAQ Accordion */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 p-8 shadow-sm">
          <div className="space-y-0">
            {displayedFAQ.map((faq) => (
              <FAQItemComponent
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => handleToggle(faq.id)}
              />
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-4 text-lg">
            Nem találod a választ?
          </p>
          <Button variant="outline" size="lg" className="shadow-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Kérdezz tőlünk közvetlenül</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
