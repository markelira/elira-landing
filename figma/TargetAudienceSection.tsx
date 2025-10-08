export function TargetAudienceSection() {
  const audiences = [
    {
      title: "Startupok és kisvállalkozások",
      description: "Akik gyorsan szeretnének növekedni, de nem akarnak költséges hibákat elkövetni.",
      features: [
        "Gyors növekedési stratégiák",
        "Költséghatékony módszerek",
        "Kockázatcsökkentés"
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Középvállalatok",
      description: "Akik szeretnék optimalizálni folyamataikat és növelni hatékonyságukat.",
      features: [
        "Operációs hatékonyság",
        "Csapatfejlesztés",
        "Folyamatoptimalizáció"
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: "Nagyvállalatok",
      description: "Akik új üzleti lehetőségeket keresnek és innovációt szeretnének bevezetni.",
      features: [
        "Innovációs stratégiák",
        "Digitális transzformáció",
        "Változásmenedzsment"
      ],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            Kinek készült
          </span>
          <h2 className="text-3xl lg:text-4xl text-gray-900">
            Magyar vállalkozások és vállalatok számára
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Bármilyen méretű vállalkozás vagy vállalat vagy, az Elira platform 
            segít abban, hogy ne próbálgatással, hanem működő módszerekkel érjétek el céljaitokat.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                  {audience.icon}
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl text-gray-900">{audience.title}</h3>
                  <p className="text-gray-600">{audience.description}</p>
                </div>
                
                <div className="space-y-3">
                  {audience.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-2xl text-gray-900">
                Függetlenül attól, hogy milyen iparágban dolgozol
              </h3>
              <p className="text-lg text-gray-600">
                Az Elira platformon tanított stratégiák univerzálisak. Legyen szó építőiparról, 
                technológiáról, szolgáltatásokról vagy termelésről - a hatékony üzleti módszerek 
                mindenhol alkalmazhatók.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {['Technológia', 'Építőipar', 'Szolgáltatások', 'Kereskedelem', 'Gyártás', 'Egészségügy'].map((industry) => (
                  <span key={industry} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}