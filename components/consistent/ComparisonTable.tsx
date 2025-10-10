import { motion } from "motion/react";
import Link from "next/link";
import { SectionHeader } from "../ui/SectionHeader";
import { buttonStyles } from "@/lib/design-tokens";

const comparisonData = [
  {
    feature: "Hozzáférés",
    traditional: "Azonnali, de csak videók",
    elira: "Azonnali + letölthető sablonok, checklistek",
    eliraHighlight: true
  },
  {
    feature: "Tartalom formátuma",
    traditional: "Általános videó lekciók",
    elira: "Masterclass + kitölthető sablonok",
    eliraHighlight: true
  },
  {
    feature: "Implementáció",
    traditional: "Magad csinálod, próba-hiba alapon",
    elira: "Done-With-You: 4 konzultáció közös megvalósításhoz",
    eliraHighlight: true
  },
  {
    feature: "Támogatás",
    traditional: "Közösségi fórum",
    elira: "Személyes ellenőrzés + valós idejű segítség",
    eliraHighlight: true
  },
  {
    feature: "Frissítések",
    traditional: "Nincs, egyszeri tartalom",
    elira: "Évente 4-6 nagy tartalomfrissítés automatikusan",
    eliraHighlight: true
  },
  {
    feature: "Cégedhez igazítás",
    traditional: "Te adaptálod a saját helyzetedre",
    elira: "Közösen építjük fel cégedre szabva (DWY/DFY)",
    eliraHighlight: true
  },
  {
    feature: "Dokumentáció",
    traditional: "Jegyzeteket te készítesz",
    elira: "Folyamatok dokumentálva - tudás megmarad a cégnél",
    eliraHighlight: true
  },
  {
    feature: "Garancia",
    traditional: "7-14 napos pénzvisszafizetés",
    elira: "30 napos teljes visszatérítés, ha nem működik",
    eliraHighlight: true
  }
];

export function ComparisonTable() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <SectionHeader
          eyebrow="Miért más az Elira?"
          title="Videókurzus vs. Masterclass + Implementáció"
          description="Az Elira masterclassok nem csak videók – sablonok, konzultációk és folyamatos támogatás, hogy tényleg működjön."
        />

        {/* Mobile: Card-based layout */}
        <div className="mt-16 md:hidden space-y-6">
          {comparisonData.map((row, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              {/* Feature Name - Header */}
              <div className="bg-gray-900 text-white px-4 py-3">
                <p className="font-semibold text-base">{row.feature}</p>
              </div>

              {/* Comparisons */}
              <div className="p-4 space-y-4">
                {/* Traditional */}
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Hagyományos online kurzusok</p>
                  <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm text-gray-600 leading-relaxed">{row.traditional}</span>
                  </div>
                </div>

                {/* Elira */}
                <div className="bg-purple-50/50 -mx-4 -mb-4 px-4 py-4 border-t-2 border-purple-500">
                  <p className="text-xs uppercase tracking-wider text-purple-600 font-semibold mb-2">Az Elira Rendszer</p>
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-900 font-medium leading-relaxed">{row.elira}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: Table layout */}
        <motion.div
          className="mt-16 overflow-hidden rounded-2xl border border-gray-200 shadow-lg hidden md:block"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-gray-900 text-white">
            <div className="px-6 py-4 text-sm font-medium"></div>
            <div className="px-6 py-4 text-center border-l border-gray-700">
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Hagyományos</p>
              <p className="text-base font-semibold">Online kurzusok</p>
            </div>
            <div className="px-6 py-4 text-center border-l border-purple-500 bg-purple-600">
              <p className="text-xs uppercase tracking-wider text-purple-200 mb-1">Az Elira</p>
              <p className="text-base font-semibold">Rendszer</p>
            </div>
          </div>

          {/* Table Body */}
          {comparisonData.map((row, index) => (
            <motion.div
              key={index}
              className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
            >
              {/* Feature Name */}
              <div className="px-6 py-5 text-sm font-semibold text-gray-900 flex items-center border-b border-gray-200">
                {row.feature}
              </div>

              {/* Traditional Column */}
              <div className="px-6 py-5 text-sm text-gray-600 flex items-center border-l border-b border-gray-200">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="leading-relaxed">{row.traditional}</span>
                </div>
              </div>

              {/* Elira Column */}
              <div className={`px-6 py-5 text-sm flex items-center border-l-2 border-b ${row.eliraHighlight ? 'border-l-purple-500 bg-purple-50/50' : 'border-l-gray-300'}`}>
                <div className="flex items-start gap-2">
                  <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${row.eliraHighlight ? 'text-emerald-600' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={`leading-relaxed ${row.eliraHighlight ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
                    {row.elira}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700 mb-4">
              Látod a különbséget? <span className="font-semibold text-gray-900">Működő rendszer, nem csak videók.</span>
            </p>
            <div className="inline-flex items-center gap-3 bg-purple-50 border border-purple-200 rounded-xl px-6 py-4 mb-6">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div className="text-left">
                <p className="font-bold text-gray-900">30 napos garancia</p>
                <p className="text-sm text-gray-600">Nem működik? Teljes visszatérítés, kérdés nélkül.</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/masterclass">
              <button className={`${buttonStyles.primaryLight} w-full sm:w-auto`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Masterclassok felfedezése</span>
              </button>
            </Link>

            <Link href="/dijmentes-audit">
              <button className={`${buttonStyles.secondaryLight} w-full sm:w-auto`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span>Díjmentes tanácsadás</span>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
