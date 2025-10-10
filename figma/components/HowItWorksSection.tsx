export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Szakértő kiválasztása",
      description: "Válaszd ki azt a területet és szakértőt, akinek a tapasztalatára szükséged van. Minden szakértő profiljában láthatod a konkrét eredményeit.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Gyakorlati stratégiák",
      description: "Konkrét, lépésről-lépésre bemutatott módszereket tanulsz, amiket már bizonyították a valóságban. Nem elmélet, hanem valós, alkalmazható tudás.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Adatvezérelt implementáció",
      description: "Minden stratégiához megkapod a mérési módszereket és KPI-ket, amikkel nyomon követheted a haladásodat és az eredményeket.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      number: "04",
      title: "Mért eredmények",
      description: "A módszerek alkalmazásával konkrét, mérhető eredményeket érsz el a vállalkozásodban. Nem reménykedsz, hanem tudod, hogy működik.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
            Hogyan működik
          </span>
          <h2 className="text-3xl lg:text-4xl text-gray-900">
            Négy lépésben a biztos eredményekhez
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Az Elira platformon nem órákig kell tanulnod elméletet. Konkrét, alkalmazható 
            stratégiákat tanulsz, amiket azonnal el tudsz kezdeni használni.
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue">
                    {step.icon}
                  </div>
                  <div className="text-4xl text-blue-200">{step.number}</div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-2xl text-gray-900">{step.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 lg:p-12">
                  <div className="w-full h-48 bg-white rounded-xl shadow-sm flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue mx-auto">
                        {step.icon}
                      </div>
                      <div className="text-gray-500">Interaktív modul</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}