'use client';

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import PurchaseButton from "@/components/course/PurchaseButton";
import PremiumZoliIntroduction from "@/components/sales/PremiumZoliIntroduction";
import { buttonStyles } from "@/lib/design-tokens";

// The one featured masterclass
export const featuredMasterclass = {
  id: 'ai-copywriting-course',
  title: 'Olvass a vevőid gondolataiban',
  subtitle: 'Kutatás-alapú kampányok, konkrét eredmények',
  description: '30 nap múlva minden marketing szöveged konkrét piackutatáson fog alapulni, nem találgatáson. Pontosan tudni fogod, milyen fájdalompontokat kell megszólítanod, milyen nyelvet használj, és hogyan írj ajánlatokat, amik után a vevők jelentkeznek. Működő kampánysablonokkal, amik a te termékedre vannak szabva - nem általános elméletekkel.',
  duration: 30, // 30 days
  modulesCount: 5,
  lessonsCount: 17,
  templatesCount: 20,
  price: 89990,
  thumbnailUrl: '/u9627734718_Medium_shot_of_a_confident_business_professional__53d1a818-cc67-4292-a15b-e0247195f505_0 (1).png',
  instructor: {
    name: 'Somosi Zoltán',
    title: 'Marketing Specialista & Doktorandusz',
    photoUrl: '/IMG_5730.JPG',
    credentials: [
      'Miskolci Egyetem',
      'Heureka Group',
      'Több ezer kampány, 8 országban'
    ],
    linkedIn: 'https://linkedin.com/in/zoltán-somosi-299605226'
  },
  highlights: [
    'Saját piac kutatás kész: tudod pontosan ki a vevőd és mit akar hallani',
    'Működő kampánysablonok a te termékeidre kitöltve - nem üres formák',
    'Buyer personák, amik valódi vásárlási motivációkat mutatnak',
    'Minden szövegírási helyzethez kész keretrendszer: mit írj, hogyan',
    'Dokumentált folyamat: új kollégák 1 nap alatt tudni fogják mit csináljanak',
    '20+ sablon használatra készen: landing oldalak, email sorozatok, ajánlatok'
  ],
  outcomes: [
    'Marketing anyagaid konkrét piackutatáson alapulnak - nem találgatáson vagy érzéseken',
    'Landing oldalaid, email kampányaid és ajánlataid ugyanazt a vevői nyelvet beszélik',
    'Minden kampányodnál pontosan tudod: mit mondj, kinek, milyen sorrendben',
    'Mérhető javulás: több kattintás, több jelentkező, több vásárló - dokumentáltan'
  ],
  enterpriseBenefits: [
    '30 nap után: a csapat önállóan ír konvertáló szövegeket - nem kell tanácsadó',
    'Minden termékhez kész kampánysablonok - nem általános elméletek',
    'Új csapattagok 1 nap alatt produktívak a dokumentált folyamatokkal',
    'Működő marketing rendszer 30 nap múlva - vagy teljes pénzvisszafizetés'
  ]
};

export function ConsistentFeaturedMasterclassSpotlight() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <>
      <section ref={sectionRef} className="py-16 sm:py-24 bg-white relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-white to-blue-50/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header with Badge */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full mb-6 shadow-lg shadow-purple-600/20">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-bold uppercase tracking-wider">Kiemelt Masterclass</span>
          </div>
        </motion.div>

        {/* Main Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Title and Subtitle - Above Image */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              {featuredMasterclass.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl">
              {featuredMasterclass.subtitle}
            </p>
          </div>
        </motion.div>

        {/* Large Feature Image - Full Width with Solid Background */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative -mx-6 lg:-mx-8 mb-12"
        >
          <div className="relative overflow-hidden bg-gray-900">
            <div className="relative h-[300px] sm:h-[350px] lg:h-[450px]">
              <Image
                src={featuredMasterclass.thumbnailUrl}
                alt={featuredMasterclass.title}
                fill
                className="object-cover scale-105"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
              {/* iOS 26 Liquid Glass Effect - Multi-Layer Glassmorphism */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-purple-900/[0.15]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.08),transparent_50%)]" />
              {/* Glass edge highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Content over image - Only Stats Badges */}
              <div className="absolute inset-0 flex flex-col justify-end px-6 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {/* Stats Row - Top 3 Value Props */}
                  <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-white/20">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-white text-sm sm:text-base font-semibold">Működő rendszer 30 nap alatt</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-white/20">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span className="text-white text-sm sm:text-base font-semibold">Kutatás-alapú, nem találgatás</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-white/20">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="text-white text-sm sm:text-base font-semibold">Pénzvisszafizetési garancia</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Grid Below Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Description & What You'll Learn */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="text-lg text-gray-700 leading-relaxed">
                  {featuredMasterclass.description}
                </p>
              </motion.div>

              {/* ELEVATED GUARANTEE - Prominent placement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-300 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">30 Napos Garancia</h3>
                    <p className="text-base text-gray-700 leading-relaxed mb-3">
                      Ha 30 nap múlva nem működik a rendszer, vagy nem vagy elégedett – <span className="font-bold text-gray-900">teljes visszatérítés, kérdés nélkül.</span>
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Egyszerűen írj nekünk az első 30 napban, és minden pénzedet visszakapod. Semmilyen indoklás nem kell – ezt ígérjük, mert tudjuk, hogy működik.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* What You'll Learn - Card Style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-purple-50 border-l-4 border-purple-600 rounded-r-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Hogyan fog kinézni a marketinged 30 nap múlva
                </h3>
                <div className="grid gap-3">
                  {featuredMasterclass.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-2" />
                      <span className="text-gray-700 leading-relaxed">{outcome}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Highlights Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Mit kapsz kézhez 30 nap múlva</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {featuredMasterclass.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-3 hover:border-purple-300 transition-colors">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Enterprise Benefits - Középvállalati csomag */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 border-l-4 border-indigo-600 rounded-r-lg p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900">BÓNUSZ: Csapat Implementációs Támogatás</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">A masterclass része: ha csapattal dolgozol, 30 nap alatt működő rendszert építünk közösen:</p>
                <div className="grid gap-3">
                  {featuredMasterclass.enterpriseBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="text-sm text-gray-700 font-medium leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-indigo-200">
                  <p className="text-xs text-gray-500 italic">
                    Ez a támogatás automatikusan jár minden masterclass vásárláshoz, ha csapattal jelentkeztek
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Instructor & CTA */}
            <div className="space-y-6">
              {/* Instructor Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Az oktató</h3>

                {/* Profile Image */}
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 ring-4 ring-purple-100">
                  <Image
                    src={featuredMasterclass.instructor.photoUrl}
                    alt={featuredMasterclass.instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Name & Title */}
                <div className="text-center mb-4">
                  <p className="font-bold text-gray-900 text-lg mb-1">{featuredMasterclass.instructor.name}</p>
                  <p className="text-sm text-purple-600 font-medium">{featuredMasterclass.instructor.title}</p>
                </div>

                {/* Credentials */}
                <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                  {featuredMasterclass.instructor.credentials.map((credential, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{credential}</span>
                    </div>
                  ))}
                </div>

                {/* LinkedIn Button */}
                <a
                  href={featuredMasterclass.instructor.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#0077B5] hover:bg-[#005885] text-white px-4 py-2.5 rounded-lg font-semibold transition-all hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>LinkedIn profil</span>
                </a>
              </motion.div>

              {/* Price & CTA Card - STANDARDIZED BUTTONS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 shadow-xl shadow-purple-600/20 sticky top-24"
              >
                <div className="text-center mb-6">
                  <p className="text-purple-200 text-sm font-medium uppercase tracking-wider mb-2">Befektetés</p>
                  <p className="text-5xl font-bold text-white mb-1">{featuredMasterclass.price.toLocaleString('hu-HU')} Ft</p>
                  <p className="text-purple-200 text-sm">Egyszeri fizetés, korlátlan hozzáférés</p>
                </div>

                <div className="space-y-3 mb-6">
                  <PurchaseButton
                    courseId={featuredMasterclass.id}
                    course={{
                      id: featuredMasterclass.id,
                      title: featuredMasterclass.title,
                      price: featuredMasterclass.price,
                      currency: 'HUF'
                    }}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-center gap-2 text-purple-100 text-xs">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>30 napos garancia: nem működik? Teljes visszatérítés</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Zoli Introduction Section */}
    <PremiumZoliIntroduction />
    </>
  );
}
