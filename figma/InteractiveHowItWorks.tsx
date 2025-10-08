import { motion } from "motion/react";
import { useState } from "react";

export function InteractiveHowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Szakértő kiválasztása",
      description: "Válaszd ki azt a területet és szakértőt, akinek a tapasztalatára szükséged van. Minden szakértő profiljában láthatod a konkrét eredményeit és a módszereinek hatékonyságát.",
      features: [
        "Részletes szakértői profilok",
        "Valós eredmények és metrikák",
        "Szakértői értékelések",
        "Területspecifikus szűrés"
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Gyakorlati stratégiák",
      description: "Konkrét, lépésről-lépésre bemutatott módszereket tanulsz, amiket már bizonyították a valóságban. Minden modul interaktív elemekkel és valós esetpéldákkal.",
      features: [
        "Lépésről-lépésre útmutatók",
        "Interaktív modulok",
        "Valós esetpéldák",
        "Gyakorlati templates"
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Adatvezérelt implementáció",
      description: "Minden stratégiához megkapod a mérési módszereket és KPI-ket, amikkel nyomon követheted a haladásodat. Valós idejű analytics és személyre szabott ajánlások.",
      features: [
        "KPI dashboard",
        "Valós idejű analytics",
        "Benchmark adatok",
        "Személyre szabott ajánlások"
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      number: "04",
      title: "Mért eredmények",
      description: "A módszerek alkalmazásával konkrét, mérhető eredményeket érsz el. Folyamatos monitoring és optimalizáció a maximális hatékonyság érdekében.",
      features: [
        "ROI kalkulátor",
        "Eredmény tracking",
        "Benchmarking",
        "Optimalizációs javaslatok"
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
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
            Hogyan működik
          </span>
          <h2 className="text-4xl lg:text-5xl text-gray-900">
            Négy lépésben a 
            <span className="block">
              biztos eredményekhez
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Az Elira platformon nem órákig kell tanulnod elméletet. Konkrét, alkalmazható 
            stratégiákat tanulsz, amiket azonnal el tudsz kezdeni használni.
          </p>
        </motion.div>

        {/* Step Navigation */}
        <motion.div 
          className="flex justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-xl p-1 border border-gray-200">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                  activeStep === index
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {step.number}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Active Step Content */}
        <motion.div
          key={activeStep}
          className="grid lg:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Content */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white">
                {steps[activeStep].icon}
              </div>
              <div className="text-4xl text-gray-300">
                {steps[activeStep].number}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl text-gray-900">{steps[activeStep].title}</h3>
              <p className="text-lg text-gray-600">{steps[activeStep].description}</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg text-gray-900">Főbb jellemzők:</h4>
              <div className="space-y-2">
                {steps[activeStep].features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Interactive Visualization */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <div className="space-y-6">
                {/* Header */}
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                    {steps[activeStep].icon}
                  </div>
                  <h4 className="text-lg text-gray-900">{steps[activeStep].title}</h4>
                </div>

                {/* Interactive Elements */}
                <div className="space-y-3">
                  {steps[activeStep].features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-50 rounded-lg p-3 border border-gray-100"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                        <span className="text-gray-800 text-sm">{feature}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="bg-gray-200 rounded-full h-1.5">
                  <motion.div
                    className="h-full bg-gray-900 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Progress Indicators */}
        <motion.div 
          className="flex justify-center mt-16 space-x-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index <= activeStep 
                  ? 'bg-gray-900 w-8' 
                  : 'bg-gray-300 w-6'
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}