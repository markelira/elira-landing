export function ProblemSolutionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Problem */}
          <div className="space-y-6">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                A jelenlegi helyzet
              </span>
              <h2 className="text-3xl lg:text-4xl text-gray-900">
                A magyar vállalkozások 80%-a próbálgatással dolgozik
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-gray-900">Költséges kísérletek</h4>
                  <p className="text-gray-600">Milliókat költenek olyan stratégiákra, amiket nem teszteltek</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-gray-900">Elvesztegetett idő</h4>
                  <p className="text-gray-600">Hónapokat várnak eredményekre, ami sosem jön el</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
                <div>
                  <h4 className="text-gray-900">Bizonytalan eredmények</h4>
                  <p className="text-gray-600">Nem tudják, hogy a stratégia működni fog-e</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Solution */}
          <div className="space-y-6">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Az Elira megoldása
              </span>
              <h2 className="text-3xl lg:text-4xl text-gray-900">
                Működő módszerek, bizonyított eredményekkel
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-gray-900">Adatvezérelt stratégiák</h4>
                  <p className="text-gray-600">Minden módszer mérést, elemzést és valós eredményeket alapoz</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-gray-900">Tudományos megalapozottság</h4>
                  <p className="text-gray-600">Pszichológia, neurológia és üzleti kutatások alapján</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-gray-900">Valós tapasztalat</h4>
                  <p className="text-gray-600">Szakértőink már bizonyították, hogy ezek a módszerek működnek</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}