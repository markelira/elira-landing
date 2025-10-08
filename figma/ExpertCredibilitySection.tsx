import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ExpertCredibilitySection() {
  const experts = [
    {
      name: "Nagy Péter",
      title: "Vezérigazgató, TechStart Kft.",
      achievement: "2 év alatt 10x bevétel növekedés",
      description: "Adatvezérelt növekedési stratégiák specialistája",
      image: "https://images.unsplash.com/photo-1589568482418-998c3cb2430a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN0cmF0ZWd5JTIwZGF0YSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTk2MTAwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Kovács Anna",
      title: "Ügyvezető, InnovaCorp",
      achievement: "500+ sikeres projektkikövetes",
      description: "Operációs hatékonyság és csapatvezetés",
      image: "https://images.unsplash.com/photo-1758873268631-fa944fc5cad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjB0ZWFtd29ya3xlbnwxfHx8fDE3NTk2MTAwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Szabó János",
      title: "Pénzügyi igazgató, SuccessLtd",
      achievement: "15M Ft költségmegtakarítás évente",
      description: "Pénzügyi optimalizáció és befektetési stratégiák",
      image: "https://images.unsplash.com/photo-1730382624709-81e52dd294d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN1Y2Nlc3MlMjBncm93dGglMjBjaGFydHxlbnwxfHx8fDE3NTk2MTAwMzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue rounded-full text-sm">
            Szakértőink
          </span>
          <h2 className="text-3xl lg:text-4xl text-gray-900">
            Bizonyított eredményekkel rendelkező vezetők
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Minden szakértőnk saját bőrén tapasztalta meg, hogy működnek azok a stratégiák, amiket megosztanak. 
            Nem elméleti tudást, hanem valós, tesztelt módszereket tanulsz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experts.map((expert, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="space-y-6">
                <ImageWithFallback
                  src={expert.image}
                  alt={expert.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto"
                />
                
                <div className="text-center space-y-2">
                  <h3 className="text-xl text-gray-900">{expert.name}</h3>
                  <p className="text-gray-600">{expert.title}</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-green-800 text-lg">{expert.achievement}</div>
                </div>
                
                <p className="text-gray-600 text-center">{expert.description}</p>
                
                <div className="flex justify-center">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
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