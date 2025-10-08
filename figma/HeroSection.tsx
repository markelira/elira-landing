import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block rounded-full bg-gray-100 px-4 py-2">
                <span className="text-sm text-blue">Magyarország egyetlen üzleti képzési platformja</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl text-gray-900 leading-tight">
                Bizonyított stratégiák,
                <br />
                <span className="text-blue">valós eredmények</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Az Elira az egyetlen olyan üzleti képzési platform Magyarországon, ahol bizonyított eredményekkel rendelkező szakértők átadják gyakorlati stratégiáikat, amiket adatokra, tudományra és valós tapasztalatra építenek.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-4">
                Platform felfedezése
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Szakértőink megismerése
              </Button>
            </div>
            
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl text-gray-900">50+</div>
                <div className="text-sm text-gray-600">Bizonyított szakértő</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-gray-900">1000+</div>
                <div className="text-sm text-gray-600">Sikeres vállalkozás</div>
              </div>
              <div className="text-center">
                <div className="text-2xl text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Gyakorlati tudás</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759310610372-c547611af808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1lZXRpbmclMjBjb25mZXJlbmNlJTIwcm9vbXxlbnwxfHx8fDE3NTk2MTAwMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Professional business meeting"
              className="rounded-2xl shadow-2xl w-full aspect-[4/3] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-900">Adatvezérelt módszerek</div>
                  <div className="text-xs text-gray-600">Nem próbálgatás, hanem tudomány</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}