'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { PremiumHeader } from '@/components/PremiumHeader';
import { PremiumFooter } from '@/components/PremiumFooter';
import { Users, Target, Zap, Calendar, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PurchaseButton from '@/components/course/PurchaseButton';
import { ServiceModelSelector } from '@/components/consistent/ServiceModelSelector';

// Available masterclasses
const masterclasses = [
  {
    id: 'ai-copywriting-course',
    title: 'Olvass a vevőid gondolataiban',
    subtitle: 'AI Copywriting Masterclass',
    description: '30 nap múlva minden marketing szöveged konkrét piackutatáson fog alapulni, nem találgatáson.',
    duration: 30,
    modulesCount: 5,
    lessonsCount: 17,
    price: 89990,
    currency: 'HUF',
    thumbnailUrl: '/u9627734718_Medium_shot_of_a_confident_business_professional__53d1a818-cc67-4292-a15b-e0247195f505_0 (1).png',
    category: 'AI Marketing',
    features: [
      'Tudod pontosan ki a vevőd és mit akar hallani',
      'Működő kampánysablonok a te termékeidre kitöltve',
      'Landing oldalaid ugyanazt a vevői nyelvet beszélik',
      'Új kollégák 1 nap alatt tudni fogják mit csináljanak'
    ]
  }
];

export default function MasterclassPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PremiumHeader />

      {/* Hero Section - Matching Homepage Design */}
      <section
        className="relative min-h-screen overflow-hidden -mt-20 pt-20"
        style={{
          background: 'linear-gradient(to bottom, #16222F 0%, #466C95 100%)'
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20 lg:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start min-h-[80vh]">

            {/* Left Column - Content */}
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm"
                     style={{
                       background: 'rgba(255, 255, 255, 0.1)',
                       backdropFilter: 'blur(20px) saturate(150%)',
                       WebkitBackdropFilter: 'blur(20px) saturate(150%)',
                       border: '1px solid rgba(255, 255, 255, 0.2)',
                       boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                     }}>
                  <div className="flex items-center gap-2">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="font-semibold text-white">Kis- és Középvállalatoknak</span>
                  </div>
                  <div className="h-4 w-px bg-white/20 hidden sm:block"></div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                      <div className="w-2 sm:w-3 h-0.5 bg-white/20"></div>
                      <div className="w-2 sm:w-3 h-2 sm:h-3 bg-purple-400 rounded-sm"></div>
                    </div>
                    <span className="text-white/90">Személyre szabva</span>
                  </div>
                </div>
              </motion.div>

              {/* Main Headline */}
              <motion.div
                className="space-y-4 sm:space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] text-white">
                  Masterclass + Személyre<br />
                  Szabott Implementáció
                </h1>

                <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed">
                  Nem csak megtanulod – közösen meg is csináljuk. Masterclass képzés, amit a cégedre szabunk,
                  a csapatoddal együtt építjük, és konkrét célokra optimalizálunk.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-6 sm:py-7"
                  onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Ingyenes konzultáció</span>
                </Button>

                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-6 sm:py-7"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Csomagok áttekintése</span>
                </Button>
              </motion.div>

              {/* Trust Section */}
              <motion.div
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 border-2 border-white/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-white/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Személyre szabott minden lépés</p>
                    <p className="text-white/70 text-xs">Nem sablon, hanem a TE termékedre, szolgáltatásodra.</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Hero Image Card */}
            <motion.div
              className="relative mt-8 lg:mt-0 lg:pt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Main Glassmorphic Card */}
              <div className="relative rounded-2xl sm:rounded-[32px] p-3 sm:p-4"
                   style={{
                     background: 'rgba(255, 255, 255, 0.05)',
                     backdropFilter: 'blur(40px) saturate(180%)',
                     WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                     border: '1px solid rgba(255, 255, 255, 0.18)',
                     boxShadow: `
                       0 8px 32px 0 rgba(0, 0, 0, 0.2),
                       inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
                       inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)
                     `
                   }}>
                {/* Inner Image Container */}
                <div className="rounded-[24px] overflow-hidden relative"
                     style={{
                       boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.4), 0 0 1px rgba(0, 0, 0, 0.2)'
                     }}>
                  <Image
                    src="/masterclass-hero.png"
                    alt="Elira Masterclass Platform"
                    width={1600}
                    height={900}
                    className="w-full h-auto"
                  />
                </div>

                {/* Floating Badge 1 - Top Right */}
                <motion.div
                  className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl flex"
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(20px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                    border: '1.5px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: `
                      0 8px 24px rgba(0, 0, 0, 0.15),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `
                  }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-semibold text-xs sm:text-sm">DWY & DFY</span>
                  </div>
                </motion.div>

                {/* Floating Badge 2 - Bottom Left */}
                <motion.div
                  className="absolute -bottom-2 sm:-bottom-3 -left-2 sm:-left-3 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(20px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                    border: '1.5px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: `
                      0 8px 24px rgba(0, 0, 0, 0.15),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `
                  }}
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-300" />
                    <span className="text-white font-semibold text-xs sm:text-sm">Munkatársképzés</span>
                  </div>
                </motion.div>

                {/* Floating Badge 3 - Top Left */}
                <motion.div
                  className="absolute top-8 -left-6 px-4 py-2.5 rounded-xl hidden lg:flex"
                  style={{
                    background: 'rgba(139, 92, 246, 0.25)',
                    backdropFilter: 'blur(20px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                    border: '1.5px solid rgba(167, 139, 250, 0.3)',
                    boxShadow: `
                      0 8px 24px rgba(139, 92, 246, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2)
                    `
                  }}
                  animate={{ x: [-3, 3, -3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-200" />
                    <span className="text-white font-semibold text-xs">Stratégia</span>
                  </div>
                </motion.div>

                {/* Ambient glow effect */}
                <div className="absolute inset-0 rounded-[32px] pointer-events-none"
                     style={{
                       background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08), transparent 70%)'
                     }} />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Available Masterclasses Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-xl rounded-full border border-gray-200/60 shadow-sm mb-6"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
              <span className="text-gray-700 text-sm font-medium">Elérhető Masterclassok</span>
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-semibold leading-tight text-gray-900 mb-6">
              Építs működő rendszert 30 nap alatt
            </h2>

            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nem kurzus – működő marketing rendszer. Stratégiák és sablonok, amik a cégedben dolgoznak, nem az eszközfiókodban porladnak.
            </p>
          </motion.div>

          {/* Masterclass Cards */}
          <div className="grid gap-8 max-w-5xl mx-auto">
            {masterclasses.map((course, index) => (
              <motion.div
                key={course.id}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="grid md:grid-cols-[40%_60%] gap-0">
                    {/* Image Section */}
                    <div className="relative h-64 md:h-auto">
                      <Image
                        src={course.thumbnailUrl}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-purple-600 text-white text-xs font-bold uppercase tracking-wider rounded">
                        {course.category}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-10 flex flex-col">
                      <div className="mb-6">
                        <p className="text-sm text-purple-600 font-semibold mb-2">{course.subtitle}</p>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h3>
                        <p className="text-base text-gray-600 leading-relaxed">{course.description}</p>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-gray-600">{course.duration} nap</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          <span className="text-sm text-gray-600">{course.modulesCount} modul</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-sm text-gray-600">{course.lessonsCount} lecke</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-6 flex-1">
                        <div className="grid sm:grid-cols-2 gap-3">
                          {course.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <svg className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="pt-6 border-t border-gray-200 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-3xl font-bold text-gray-900">
                              {course.price.toLocaleString('hu-HU')} Ft
                            </p>
                            <p className="text-sm text-gray-500">Egyszeri fizetés</p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <PurchaseButton
                            courseId={course.id}
                            course={{
                              id: course.id,
                              title: course.title,
                              price: course.price,
                              currency: course.currency
                            }}
                            className="flex-1"
                          />
                          <Link href={`/courses/${course.id}`} className="flex-1">
                            <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3">
                              Kurzus részletei
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Packages Section - Using Homepage Component */}
      <div id="services">
        <ServiceModelSelector />
      </div>

      {/* How It Works - Matching Homepage Pattern */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full mb-6 shadow-lg shadow-purple-600/20">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-wider">Folyamat</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-semibold leading-tight text-gray-900 mb-6">
              Hogyan működik a személyre szabott modell?
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              4 lépésben a masterclass tudástól a cégedben működő rendszerig
            </p>
          </motion.div>

          {/* Timeline Steps */}
          <div className="space-y-8">
            {[
              {
                number: "01",
                title: "Ingyenes konzultáció",
                description: "30 perces beszélgetés, ahol megismerjük a cégedet, célokat, kihívásokat. Közösen meghatározzuk a fókuszt: milyen masterclass és milyen konkrét eredmény kell.",
                borderColor: "border-teal-600",
                timing: "30 perc",
                outcome: "Világos terv és ajánlat"
              },
              {
                number: "02",
                title: "Masterclass tanulás",
                description: "A csapatod (max 5 fő) megtanulja a masterclass tartalmát saját tempóban. Közben gyűjtitek a kérdéseket, ötleteket, és megismeritek a keretrendszert.",
                borderColor: "border-purple-600",
                timing: "1-2 hét",
                outcome: "Csapat felkészül"
              },
              {
                number: "03",
                title: "Közös stratégiaépítés",
                description: "4 konzultációs alkalommal együtt adaptáljuk a cégedre. Felépítjük a stratégiát, a rendszert, az implementációs roadmap-et. Nem általános tanácsok – hanem konkrét, a TE piacodra szabott terv.",
                borderColor: "border-orange-600",
                timing: "2-3 hét",
                outcome: "Kész stratégia és roadmap"
              },
              {
                number: "04",
                title: "Implementálás és eredmény",
                description: "Önállóan vagy velünk közösen megvalósítod. Munkatársképzés esetén a csapat átképzése, DFY esetén mi csináljuk meg helyetted. Az eredmény: működő rendszer, dokumentálva, fenntarthatóan.",
                borderColor: "border-green-600",
                timing: "1-4 hét",
                outcome: "Működő rendszer"
              }
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`bg-white border-l-4 ${step.borderColor} border-t border-r border-b border-gray-200 p-10`}>
                  {/* Header */}
                  <div className="flex items-start gap-8 mb-8 pb-8 border-b border-gray-100">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gray-900 text-white rounded-lg flex items-center justify-center">
                        <span className="text-xl font-bold">{step.number}</span>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3 leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-base text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer - Outcome & Timing */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-6 border-t border-gray-100">
                    <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {step.outcome}
                    </div>
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                      Időtartam: {step.timing}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Matching Homepage Dark Gradient */}
      <section
        id="consultation"
        className="py-20"
        style={{
          background: 'linear-gradient(to bottom, #16222F 0%, #466C95 100%)'
        }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Készen állsz a következő lépésre?
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Foglalj egy ingyenes 30 perces konzultációt. Megbeszéljük a céljaidat,
              és közösen megtaláljuk a legjobb megoldást.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-6 sm:py-7"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Ingyenes konzultáció foglalása</span>
              </Button>

              <Link href="/courses">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-6 sm:py-7"
                >
                  Vagy böngéssz a masterclassok között
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Nincs kötelezettség</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>30 nap garancia</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}
