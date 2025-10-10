'use client';

import { motion } from "motion/react";
import { useState } from "react";
import Link from "next/link";
import { buttonStyles } from "@/lib/design-tokens";

export function ServiceModelSelector() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const serviceModels = [
    {
      id: 'dwy',
      badge: 'NÉPSZERŰ',
      badgeColor: 'bg-teal-600',
      title: 'Veled csináljuk',
      subtitle: 'DWY - DONE WITH YOU',
      tagline: 'Személyre szabott stratégia',
      targetAudience: 'Kisvállalatok és középvállalatok számára',
      whatYouGet: 'Teljes masterclass + 4 konzultáció, ahol közösen felépítjük a cégedre szabott stratégiát.',
      howItWorks: 'Nem csak tanulsz – közösen adaptáljuk a masterclass tartalmát a TE piacodra, termékedre, céljaidra.',
      borderColor: 'border-teal-500',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: 'dfy',
      badge: null,
      title: 'Neked csináljuk',
      subtitle: 'DFY - DONE FOR YOU',
      tagline: 'Teljes implementáció',
      targetAudience: 'Középvállalatok számára ajánlott',
      whatYouGet: 'Teljes masterclass + mi valósítjuk meg helyetted, dokumentáljuk, átadjuk a csapatnak.',
      howItWorks: 'Te nem csinálo​d – mi csináljuk helyetted. Kampányokat, rendszereket, folyamatokat – működő megoldásokat adsz át a csapatnak.',
      borderColor: 'border-purple-500',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 bg-white">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-200 shadow-sm mb-6"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
            <span className="text-gray-700 text-sm font-medium">Szolgáltatási csomagok</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-semibold leading-tight text-gray-900 mb-6">
            Válaszd ki a neked megfelelő támogatást
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Minden masterclass tartalmaz <span className="font-semibold text-gray-900">Done-With-You (DWY) támogatást</span> - közösen építjük fel a stratégiát 4 konzultáció során. Ha teljes implementációt szeretnél, válaszd a Done-For-You (DFY) csomagot.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="relative">
          <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-2">
            {serviceModels.map((model, index) => {
              const isHovered = hoveredCard === model.id;

              return (
                <motion.div
                  key={model.id}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredCard(model.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div
                    className={`bg-white border-l-4 ${model.borderColor} border-t border-r border-b border-gray-200 rounded-r-xl p-6 sm:p-8 h-full flex flex-col transition-all duration-300 ${
                      isHovered ? 'md:shadow-xl md:-translate-y-1' : 'shadow-sm'
                    }`}
                  >
                    {/* Badge */}
                    {model.badge && (
                      <div className={`absolute -top-3 left-8 px-3 py-1 ${model.badgeColor} text-white text-[10px] font-semibold uppercase tracking-wider rounded`}>
                        {model.badge}
                      </div>
                    )}

                    {/* Header */}
                    <div className="mb-6 pb-6 border-b border-gray-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-gray-50">
                          {model.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                            {model.subtitle}
                          </div>
                          <h3 className="text-2xl font-semibold text-gray-900">{model.title}</h3>
                          <p className="text-sm text-gray-600 font-medium">{model.tagline}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{model.targetAudience}</p>
                    </div>

                    {/* What You Get */}
                    <div className="mb-6 pb-6 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Mit kapsz
                      </p>
                      <p className="text-base font-semibold text-gray-900 leading-relaxed">
                        {model.whatYouGet}
                      </p>
                    </div>

                    {/* How It Works */}
                    <div className="mb-6 flex-1">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Hogyan működik
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {model.howItWorks}
                      </p>
                    </div>

                    {/* CTA Button - Glassmorphic Pill */}
                    <div className="mt-auto pt-6 border-t border-gray-100">
                      {model.id === 'dwy' ? (
                        <>
                          <Link href="/masterclass" className="block w-full">
                            <button className={`${buttonStyles.primaryLight} w-full`}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                              </svg>
                              <span>Masterclassok felfedezése</span>
                            </button>
                          </Link>
                          <p className="text-xs text-gray-500 text-center mt-3 italic">
                            A DWY támogatás minden masterclass alapja
                          </p>
                        </>
                      ) : (
                        <Link href="/dijmentes-audit" className="block w-full">
                          <button className={`${buttonStyles.secondaryLight} w-full`}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            <span>Díjmentes tanácsadás</span>
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
