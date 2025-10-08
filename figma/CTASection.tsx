import { Button } from "./ui/button";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue to-blue-light">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-5xl text-white">
              Kezdd el ma a biztos növekedést
            </h2>
            <p className="text-xl text-gray-200 leading-relaxed">
              Csatlakozz azokhoz a magyar vállalkozásokhoz, akik már nem próbálgatással, 
              hanem bizonyított módszerekkel építik fel a sikeres üzletüket.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl text-white">50+</div>
              <div className="text-gray-200">Bizonyított szakértő</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl text-white">100+</div>
              <div className="text-gray-200">Gyakorlati stratégia</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl text-white">1000+</div>
              <div className="text-gray-200">Sikeres implementáció</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Platform felfedezése
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-blue">
              Kapcsolatfelvétel
            </Button>
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-gray-200">
              Kérdésed van? Írj nekünk:
            </p>
            <a href="mailto:hello@elira.hu" className="text-white hover:text-gray-300 transition-colors">
              hello@elira.hu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}