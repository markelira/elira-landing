import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function InteractiveHowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const steps = [
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
      timing: "0-2 nap",
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
      timing: "3-7 nap",
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
      timing: "8-30 nap",
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
      timing: "31+ nap",
      outcome: "Nem projekt - hosszú távú támogatás",
      tierNote: "Mindenkinek",
      borderColor: "border-indigo-600"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl lg:text-5xl font-semibold leading-tight max-w-4xl mx-auto mb-6 text-gray-900">
            Hogyan működik: a vásárlástól az első eredményig
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Nincs várakozás, nincs kitalálás. Az első perctől az első évedig - minden lépés világos, minden szakaszban támogatunk.
          </p>
        </motion.div>

        {/* Timeline Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 + index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <div className={`bg-white border-l-4 ${step.borderColor} border-t border-r border-b border-gray-200 p-10`}>
                {/* Header */}
                <div className="flex items-start gap-8 mb-8 pb-8 border-b border-gray-100">
                  <div className="flex-shrink-0">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                      {step.phase}
                    </div>
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

                {/* Features Grid */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {step.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-600 leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Footer - Outcome & Tier Note */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-6 border-t border-gray-100">
                  <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {step.outcome}
                  </div>
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                    {step.tierNote}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
