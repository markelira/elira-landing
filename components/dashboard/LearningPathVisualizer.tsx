'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, CheckCircle } from 'lucide-react'

interface PathStep {
  number: string
  phase: string
  title: string
  description: string
  features: string[]
  outcome: string
  tierNote: string
  borderColor: string
}

export function LearningPathVisualizer() {
  const [activeStep, setActiveStep] = useState(0)

  // Real data from homepage with matching structure
  const steps: PathStep[] = [
    {
      number: "01",
      phase: "0-2 NAP",
      title: "Azonnali hozzáférés",
      description: "Vásárlás után 2 percen belül elkezdheted. Megkapod a sablonokat, videókat, első lépések listáját - minden a te cégedhez igazítva.",
      features: [
        "Azonnal belépsz a platformra",
        "Letöltöd a kezdőcsomagot (sablonok, checklistek)",
        "Megnézed a bevezető videót",
        "Megkapod mit csinálj először"
      ],
      outcome: "Azonnal kezdhetsz, nincs várakozás",
      tierNote: "Mindenkinek",
      borderColor: "border-blue-600"
    },
    {
      number: "02",
      phase: "3-7 NAP",
      title: "Első eredmények",
      description: "Az első héten már látsz eredményt. Kitöltöd az első sablont, használod. Ha kisvállalat vagy középvállalat vagy, valós ember ellenőrzi hogy jól csináltad-e.",
      features: [
        "Kitöltöd és használod az első sablont",
        "Ellenőrizzük hogy jól csináltad (kis/középvállalat)",
        "Ha elakadsz, segítünk",
        "Dokumentáljuk az első eredményt"
      ],
      outcome: "7 napon belül működő eredmény",
      tierNote: "Kis & közepes vállalatoknak",
      borderColor: "border-emerald-600"
    },
    {
      number: "03",
      phase: "8-30 NAP",
      title: "Teljes bevezetés",
      description: "Most építed be a teljes rendszert. A csapatod is megtanulja. Dokumentáljuk hogy ki mit csinál. 30 nap alatt minden működik.",
      features: [
        "Bevezeted a teljes rendszert",
        "A csapatod is megtanulja",
        "Leírjuk ki mit csinál mikor",
        "Ellenőrizzük hogy működik (kis/középvállalat)"
      ],
      outcome: "30 nap alatt működő rendszer",
      tierNote: "Kis & közepes vállalatoknak",
      borderColor: "border-purple-600"
    },
    {
      number: "04",
      phase: "31+ NAP",
      title: "Folyamatos fejlődés",
      description: "A rendszer él tovább. Évente 4-6 nagy frissítés jön. Új piaci helyzet? Új tartalom. Közösség vagy dedikált támogatás - a céged méretétől függ.",
      features: [
        "Évente 4-6 nagy tartalomfrissítés",
        "Új piaci helyzetek = új modulok",
        "Közösség (startup) vagy személyes támogatás (kis/közepes)",
        "Évente 2x átnézzük a rendszeredet"
      ],
      outcome: "Nem projekt - hosszú távú támogatás",
      tierNote: "Mindenkinek",
      borderColor: "border-indigo-600"
    }
  ]

  return (
    <div className="relative bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Header - matching homepage style */}
      <div className="px-8 py-10 border-b border-gray-100">
        <h2 className="text-3xl lg:text-4xl font-semibold leading-tight text-gray-900 mb-4">
          Hogyan működik: a vásárlástól az első eredményig
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
          Nincs várakozás, nincs kitalálás. Az első perctől az első évedig - minden lépés világos, minden szakaszban támogatunk.
        </p>
      </div>

      {/* Timeline Navigation */}
      <div className="px-8 py-6 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center justify-between gap-4 max-w-4xl">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`relative flex flex-col items-center gap-2 transition-all ${
                activeStep === index ? 'opacity-100' : 'opacity-40 hover:opacity-70'
              }`}
            >
              {/* Step number badge */}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                activeStep === index
                  ? 'bg-gray-900 text-white'
                  : 'bg-white border-2 border-gray-200 text-gray-400'
              }`}>
                <span className="text-base font-bold">{step.number}</span>
              </div>

              {/* Phase label */}
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                {step.phase}
              </span>

              {/* Active indicator */}
              {activeStep === index && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute -bottom-6 left-0 right-0 h-0.5 bg-gray-900`}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Display */}
      <div className="px-8 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`border-l-4 ${steps[activeStep].borderColor} pl-8`}
          >
            {/* Title and description */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 leading-tight">
                {steps[activeStep].title}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed max-w-3xl">
                {steps[activeStep].description}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {steps[activeStep].features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="flex items-start gap-3"
                >
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-600 leading-relaxed">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Outcome & Tier Note */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-6 border-t border-gray-100">
              <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
                {steps[activeStep].outcome}
              </div>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                {steps[activeStep].tierNote}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-100">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className={`group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
              activeStep === 0
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <ArrowRight className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1" />
            <span>Előző szakasz</span>
          </button>

          {/* Step dots */}
          <div className="flex items-center gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className="p-1"
              >
                <div
                  className={`h-2 rounded-full transition-all ${
                    index === activeStep
                      ? 'w-8 bg-gray-900'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
            disabled={activeStep === steps.length - 1}
            className={`group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
              activeStep === steps.length - 1
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-gray-700 hover:text-gray-900'
            }`}
          >
            <span>Következő szakasz</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="px-8 py-8 bg-gray-50 border-t border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Készen áll az indulásra?
            </h3>
            <p className="text-base text-gray-600 leading-relaxed">
              Kezdje el még ma és érjen el eredményeket 7 napon belül
            </p>
          </div>
          <motion.a
            href="/courses"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium text-base hover:bg-gray-800 transition-colors shadow-sm"
          >
            Programok megtekintése
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </div>
    </div>
  )
}
