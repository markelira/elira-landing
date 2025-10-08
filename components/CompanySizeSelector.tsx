'use client';

import { motion } from "motion/react";
import { useState, createContext, useContext } from "react";

// Create context for company size selection
const CompanySizeContext = createContext<{
  selectedSize: string | null;
  setSelectedSize: (size: string | null) => void;
}>({
  selectedSize: null,
  setSelectedSize: () => {}
});

export const useCompanySize = () => useContext(CompanySizeContext);

export function CompanySizeProvider({ children }: { children: React.ReactNode }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <CompanySizeContext.Provider value={{ selectedSize, setSelectedSize }}>
      {children}
    </CompanySizeContext.Provider>
  );
}

export function CompanySizeSelector() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  // Selection disabled for single masterclass deployment
  // const { selectedSize, setSelectedSize } = useCompanySize();

  const companySizes = [
    {
      id: 'startup',
      title: 'Startup',
      subtitle: 'Mikrokurzusok',
      employees: '1-10 fő',
      productType: 'MIKROKURZUS',
      whatYouGet: 'Senior szakértő tudása 30-90 percben, konkrét lépésekkel.',
      howItWorks: 'Amikor gyors eredmények kellenek kis befektetéssel',
      pricing: '9.990-29.990 Ft',
      timeCommitment: 'Azonnali hozzáférés, mikrokurzusok.',
      features: [
        {
          label: '',
          value: 'Ma tanulod, holnap használod - azonnali gyakorlati eszközök.'
        },
        {
          label: '',
          value: 'Saját tempóban haladsz, senki nem várja hogy "készen legyél" - te irányítasz'
        },
        {
          label: '',
          value: 'Elakadtál? Kérhetsz segítséget - de az esetek 90%-ában nem lesz rá szükséged'
        }
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      borderColor: 'border-blue-600'
    },
    {
      id: 'scaleup',
      title: 'Kisvállalat',
      subtitle: 'Masterclassok',
      employees: '11-50 fő',
      productType: 'MASTERCLASS',
      whatYouGet: 'Komplett működő rendszerek, stratégiák, Masterclass-ok.',
      howItWorks: 'Amikor nem gyors tippeket keresel, hanem működő rendszerek mentén fejlődnél.',
      pricing: '149.000-249.000 Ft',
      timeCommitment: 'Komplett rendszer + eszközök',
      mostPopular: true,
      features: [
        {
          label: '',
          value: 'Komplett működő rendszer sablonokkal - nem csak megtanulod, hanem MEGKAPOD'
        },
        {
          label: '',
          value: 'Dokumentált folyamatok maradnak cégnél - a tudás nem megy el senkivel'
        },
        {
          label: '',
          value: 'Átfogó tudás, strukturált sablonok, opcionális személyre szabott támogatás - minden egy helyen.'
        }
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      borderColor: 'border-purple-600'
    },
    {
      id: 'enterprise',
      title: 'Középes vállalat',
      subtitle: 'Integrált Programok',
      employees: '51+ fő',
      productType: 'INTEGRÁLT PROGRAM',
      whatYouGet: '30 nap alatt közösen felépítjük, dokumentáljuk, bevezetjük.',
      howItWorks: 'Szervezeti szintű fejlesztés, amikor az önálló tanulás már nem elég',
      pricing: 'Egyedi ajánlat',
      timeCommitment: 'Személyre szabott közös bevezetés',
      features: [
        {
          label: '',
          value: '30 nap alatt VELED építjük fel - nem tanácsadunk, hanem MEGCSINÁLJUK'
        },
        {
          label: '',
          value: 'Teljes szervezeti bevezetés dokumentálva - működő rendszer vagy 100%-ban visszafizetjük a díjat.'
        },
        {
          label: '',
          value: 'Működő rendszer 30 nap alatt, amit a csapat önállóan fenntarthat'
        }
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      borderColor: 'border-indigo-600'
    }
  ];

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-xl rounded-full border border-gray-200/60 shadow-sm mb-6"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
            <span className="text-gray-700 text-sm font-medium">Válaszd ki céged mérete alapján</span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-semibold leading-tight text-gray-900 mb-6">
            Három szolgáltatási szint érkezik hamarosan
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kifejlesztés alatt állnak a különböző vállalati méretekhez igazított szolgáltatásaink. Pillanatnyilag Masterclass szinten érhető el tartalom.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="relative">
          <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
            {companySizes.map((size, index) => {
              const isSelected = false; // Selection disabled

              return (
                <motion.div
                  key={size.id}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`bg-white border-l-4 ${size.borderColor} border-t border-r border-b border-gray-200 p-8 h-full flex flex-col`}
                  >
                    {/* Available Badge - Only show for Kisvállalat */}
                    {size.id === 'scaleup' && (
                      <div className="absolute -top-3 left-8 px-3 py-1 bg-green-600 text-white text-[10px] font-semibold uppercase tracking-wider rounded">
                        Elérhető most
                      </div>
                    )}

                    {/* Coming Soon Badge - For other tiers */}
                    {size.id !== 'scaleup' && (
                      <div className="absolute -top-3 left-8 px-3 py-1 bg-gray-400 text-white text-[10px] font-semibold uppercase tracking-wider rounded">
                        Hamarosan
                      </div>
                    )}

                    {/* Header */}
                    <div className="mb-6 pb-6 border-b border-gray-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-gray-50">
                          {size.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                            {size.productType}
                          </div>
                          <h3 className="text-2xl font-semibold text-gray-900">{size.title}</h3>
                          <p className="text-sm text-gray-600 font-medium">{size.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{size.employees}</p>
                    </div>

                    {/* What You Get - Clear Summary */}
                    <div className="mb-6 pb-6 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Mit kapsz
                      </p>
                      <p className="text-base font-semibold text-gray-900 leading-relaxed">
                        {size.whatYouGet}
                      </p>
                    </div>

                    {/* How It Works - Clear Process */}
                    <div className="mb-6 pb-6 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Hogyan működik
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {size.howItWorks}
                      </p>
                    </div>

                    {/* Detailed Features */}
                    <div className="space-y-4 mb-6 flex-1">
                      {size.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {feature.value}
                          </p>
                        </div>
                      ))}
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
