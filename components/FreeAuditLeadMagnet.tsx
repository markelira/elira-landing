'use client';

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

export function FreeAuditLeadMagnet() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl lg:text-5xl font-semibold leading-tight max-w-4xl mx-auto mb-6 text-gray-900">
            Nem vagy biztos benne? Megmutatjuk mit tudunk tenni érted
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            30 perces ingyenes beszélgetésben közösen átnézzük a céljaidat, és konkrét tervet adsz a kezedbe – kötelezettség nélkül.
          </p>
        </motion.div>

        {/* Main Card - matching homepage style with left border */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-white border-l-4 border-blue-600 border-t border-r border-b border-gray-200 p-6 sm:p-8 lg:p-10">
            {/* Header with badge and icon - Stacked layout */}
            <div className="mb-8 pb-8 border-b border-gray-100">
              {/* Badge and Icon - Centered */}
              <div className="flex flex-col items-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  <span className="text-sm font-medium text-blue-800 uppercase tracking-wide">
                    Ingyenes audit
                  </span>
                </div>
                <div className="w-14 h-14 bg-blue-600 text-white rounded-lg flex items-center justify-center">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
              </div>

              {/* Content - Centered */}
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-3 leading-tight">
                  Mit kapsz a 30 perces auditban?
                </h3>
                <p className="text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
                  Összejövünk egy 30 perces beszélgetésre, ahol közösen átnézzük a vállalkozásod, céljaid, és megmutatjuk pontosan milyen eredményeket érhetsz el az Elira platformon – minden ingyenesen, kötelezettség nélkül.
                </p>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Helyzetfelmérés</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Átnézzük a jelenlegi helyzeted és kihívásaid
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Személyre szabott terv</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    A te céljaidhoz igazított konkrét lépések
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-medium text-gray-900 mb-1">Várható eredmények</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Mit tudsz elérni a platformunkkal
                  </p>
                </div>
              </div>
            </div>

            {/* Social Proof Bar */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center"
                      >
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-700 font-medium">
                    100+ vállalkozás választotta
                  </span>
                </div>

                <div className="h-6 w-px bg-gray-300 hidden sm:block" />

                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-700 font-medium">5.0 átlagértékelés</span>
                </div>

                <div className="h-6 w-px bg-gray-300 hidden sm:block" />

                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700 font-medium">100% ingyenes</span>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-100">
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-600 leading-relaxed mb-1">
                  <span className="font-medium text-gray-900">Nincs elkötelezettség.</span> A beszélgetés után te döntöd el, hogy együtt dolgozunk-e.
                </p>
                <p className="text-xs text-gray-500">
                  Nincsenek rejtett költségek • Semmi nyomás • Csak hasznos információk
                </p>
              </div>

              <Link href="/dijmentes-audit" className="flex-shrink-0">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-semibold shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Foglald le most
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
