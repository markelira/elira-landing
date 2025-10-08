import { motion } from "motion/react";
import { useState } from "react";

export function InteractiveProblemSolution() {
  const [activeTab, setActiveTab] = useState('problem');

  const problemPoints = [
    {
      title: "Költséges kísérletek",
      description: "Milliókat költenek olyan stratégiákra, amiket nem teszteltek",
      stat: "€2.3M átlagos veszteség évente"
    },
    {
      title: "Elvesztegetett idő",
      description: "Hónapokat várnak eredményekre, ami sosem jön el",
      stat: "6-12 hónap átlagos várakozási idő"
    },
    {
      title: "Bizonytalan eredmények",
      description: "Nem tudják, hogy a stratégia működni fog-e",
      stat: "23% sikeres implementáció"
    }
  ];

  const solutionPoints = [
    {
      title: "Adatvezérelt stratégiák",
      description: "Minden módszer mérést, elemzést és valós eredményeket alapoz",
      stat: "98% prediktív pontosság"
    },
    {
      title: "Tudományos megalapozottság",
      description: "Pszichológia, neurológia és üzleti kutatások alapján",
      stat: "500+ peer-reviewed tanulmány"
    },
    {
      title: "Valós tapasztalat",
      description: "Szakértőink már bizonyították, hogy ezek a módszerek működnek",
      stat: "87% sikeres implementáció"
    }
  ];

  return (
    <section className="py-32 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          className="text-center space-y-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm">
            A valóság vs. Az Elira megoldás
          </span>
          <h2 className="text-4xl lg:text-5xl text-gray-900">
            Miért próbálgatni, ha lehet 
            <span className="block">
              biztos lenni?
            </span>
          </h2>
        </motion.div>

        {/* Interactive Toggle */}
        <motion.div 
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-xl p-1 border border-gray-200">
            <button
              onClick={() => setActiveTab('problem')}
              className={`px-6 py-3 rounded-lg text-sm transition-all duration-200 ${
                activeTab === 'problem'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Jelenlegi helyzet
            </button>
            <button
              onClick={() => setActiveTab('solution')}
              className={`px-6 py-3 rounded-lg text-sm transition-all duration-200 ${
                activeTab === 'solution'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Elira megoldás
            </button>
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative min-h-[500px]">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'problem' ? (
              <div className="space-y-12">
                <div className="text-center mb-12">
                  <h3 className="text-2xl text-gray-900 mb-4">
                    A magyar vállalkozások 80%-a próbálgatással dolgozik
                  </h3>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Ez nem csak költséges, de időpocsékoló és kockázatos is.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {problemPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      className="bg-white rounded-xl p-6 border border-gray-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <h4 className="text-lg text-gray-900 mb-3">{point.title}</h4>
                      <p className="text-gray-600 mb-4 text-sm">{point.description}</p>
                      <div className="text-gray-900 text-sm pt-4 border-t border-gray-100">
                        {point.stat}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                <div className="text-center mb-12">
                  <h3 className="text-2xl text-gray-900 mb-4">
                    Működő módszerek, bizonyított eredményekkel
                  </h3>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Az Elira platformon minden stratégia adatokra és valós tapasztalatra épül.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {solutionPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      className="bg-white rounded-xl p-6 border border-gray-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <h4 className="text-lg text-gray-900 mb-3">{point.title}</h4>
                      <p className="text-gray-600 mb-4 text-sm">{point.description}</p>
                      <div className="text-gray-900 text-sm pt-4 border-t border-gray-100">
                        {point.stat}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom visualization */}
        <motion.div 
          className="mt-20 bg-gray-900 rounded-2xl p-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center">
            <h3 className="text-2xl mb-8">Az eredmény különbsége</h3>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-3">
                <div className="text-gray-400 text-sm">Próbálgatás módszer</div>
                <div className="text-4xl text-white">23%</div>
                <div className="text-gray-400 text-sm">sikeres implementáció</div>
              </div>
              <div className="space-y-3">
                <div className="text-gray-400 text-sm">Elira módszer</div>
                <div className="text-4xl text-white">87%</div>
                <div className="text-gray-400 text-sm">sikeres implementáció</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}