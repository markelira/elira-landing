'use client';

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { supportLevels, comparisonRows } from "@/lib/content/support-comparison";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function SupportLevelsComparison() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const tiers = Object.values(supportLevels);

  // Color mapping for tier headers
  const getTierBorderColor = (color: 'blue' | 'purple' | 'indigo') => {
    return {
      blue: 'border-blue-600',
      purple: 'border-purple-600',
      indigo: 'border-indigo-600'
    }[color];
  };

  const getTierBadgeColor = (color: 'blue' | 'purple' | 'indigo') => {
    return {
      blue: 'bg-blue-50 text-blue-700',
      purple: 'bg-purple-50 text-purple-700',
      indigo: 'bg-indigo-50 text-indigo-700'
    }[color];
  };

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          eyebrow="Árazás és csomagok"
          title="Válaszd ki a céged méretéhez illő csomagot"
          description="Minden csomag ugyanazt a minőségi tartalmat és módszertant tartalmazza - a különbség a támogatás mélységében és a közös implementáció mértékében van."
        />

        {/* Comparison Table */}
        <motion.div
          className="mt-16 overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              {/* Table Header - Tier Information */}
              <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200">
                {/* Empty corner cell */}
                <div className="p-6 border-r border-gray-200">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Összehasonlítás
                  </p>
                </div>

                {/* Tier Headers */}
                {tiers.map((tier, index) => (
                  <motion.div
                    key={tier.tier}
                    className={`p-6 bg-white ${index < tiers.length - 1 ? 'border-r border-gray-200' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.1 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    {/* Product Type - Clear Service Label */}
                    <div className="mb-3">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {tier.productType}
                      </span>
                    </div>

                    {/* Tier Badge */}
                    <div className="mb-2">
                      <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-bold ${getTierBadgeColor(tier.color)}`}>
                        {tier.tier}
                      </span>
                    </div>

                    {/* Tier Label */}
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {tier.tierLabel}
                    </h3>

                    {/* Pricing */}
                    <p className="text-base font-bold text-gray-700">
                      {tier.pricing}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Table Body - Comparison Rows */}
              <div className="bg-white">
                {comparisonRows.map((row, rowIndex) => (
                  <motion.div
                    key={row.key}
                    className={`grid grid-cols-4 ${rowIndex < comparisonRows.length - 1 ? 'border-b border-gray-200' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + rowIndex * 0.05,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    {/* Row Label */}
                    <div className="p-6 border-r border-gray-200 bg-gray-50">
                      <p className="text-sm font-medium text-gray-700">
                        {row.label}
                      </p>
                    </div>

                    {/* Values for each tier */}
                    {tiers.map((tier, tierIndex) => (
                      <div
                        key={`${row.key}-${tier.tier}`}
                        className={`p-6 ${tierIndex < tiers.length - 1 ? 'border-r border-gray-200' : ''}`}
                      >
                        <p className="text-sm font-semibold text-gray-900">
                          {tier.features[row.key]}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Value Proposition */}
        <motion.div
          className="mt-16 bg-gray-50 rounded-lg p-8 border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-center text-base text-gray-900 font-medium mb-4">
            Mindhárom csomag tartalmazza
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Életre szóló hozzáférés</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Folyamatos frissítések</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Magyar piaci példák</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">30 napos garancia</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
