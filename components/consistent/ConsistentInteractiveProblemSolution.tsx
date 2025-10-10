import { motion } from "motion/react";
import { Button } from "../ui/button";
import { SectionHeader } from "../ui/SectionHeader";
import Link from "next/link";
import { buttonStyles, cardStyles } from "@/lib/design-tokens";

const problems = [
  {
    id: 1,
    myth: "Minden vállalat ugyanazt a rendszert használhatja",
    reality: "Ami működik 5 főnél, káosz 50 főnél. A kontextus számít.",
    solution: "Vállalati méret-specifikus rendszerek",
    detail: "Induló cég? Gyors megoldások. 50 fős csapat? Strukturált folyamatok. Mind a kettőhöz más eszköz kell."
  },
  {
    id: 2,
    myth: "3 hónapos betanulás után megtérül a befektetés",
    reality: "Ha nem használják az első héten, soha nem fogják. Az azonnaliság számít.",
    solution: "Működő sablonok az első naptól",
    detail: "Letöltöd, kitöltöd, használod. Ma tanulod, holnap alkalmazod - nulla tanulási görbe."
  },
  {
    id: 3,
    myth: "Egyszer beállítod és megy magától",
    reality: "A rendszerek élnek - vagy fejlődnek, vagy meghalnak. A támogatás nem opció.",
    solution: "Evolúciós támogatás",
    detail: "Folyamatos frissítések, új tartalmak, valós kérdésekre valós válaszok - amíg szükséged van rá."
  }
];

export function ConsistentInteractiveProblemSolution() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <SectionHeader
          eyebrow="Három hazugság, három valóság"
          title="Miért nem hoznak eredményt a hagyományos online kurzusok?"
          description="Mert három hazugságra építik őket - univerzális tartalom, hosszú tanulási idő, egyszeri hozzáférés. Mi másképp dolgozunk."
        />

        {/* Problem Cards - CONSISTENT FLAT DESIGN for readability */}
        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cardStyles.flat}
            >
              {/* Number Badge */}
              <div className="px-6 sm:px-8 pt-8 pb-6 border-b border-gray-100">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 text-white text-sm font-semibold mb-4">
                  {problem.id}
                </div>
              </div>

              {/* Myth - Professional Red */}
              <div className="px-6 sm:px-8 py-6 bg-rose-50/30 border-b border-rose-100/50">
                <div className="flex items-start gap-3 mb-2">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-rose-900 uppercase tracking-wider mb-2">A hazugság</p>
                    <p className="text-sm text-gray-700 leading-relaxed">"{problem.myth}"</p>
                  </div>
                </div>
              </div>

              {/* Reality - Professional Green */}
              <div className="px-6 sm:px-8 py-6 bg-emerald-50/30 border-b border-emerald-100/50">
                <div className="flex items-start gap-3 mb-2">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-emerald-900 uppercase tracking-wider mb-2">Az igazság</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{problem.reality}</p>
                  </div>
                </div>
              </div>

              {/* Solution - Refined Blue */}
              <div className="px-6 sm:px-8 py-8 bg-white">
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ahogy mi csináljuk</p>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">
                    {problem.solution}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {problem.detail}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section with CONTEXTUAL COPY */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Context text BEFORE buttons */}
          <div className="text-center mb-6">
            <p className="text-lg text-gray-700 font-medium">
              Most hogy látod a problémát, <span className="text-gray-900 font-semibold">készen állsz a megoldásra?</span>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Nem vagy biztos? Kezdd a díjmentes audittal – kockázat nélkül.
            </p>
          </div>

          {/* GLASSMORPHIC PILL Buttons (LIGHT BACKGROUND VARIANTS) */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dijmentes-audit">
              <button className={`${buttonStyles.primaryLight} w-full sm:w-auto`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Díjmentes audit</span>
              </button>
            </Link>

            <Link href="/masterclass">
              <button className={`${buttonStyles.secondaryLight} w-full sm:w-auto`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Masterclassok felfedezése</span>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
