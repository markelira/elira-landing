'use client';

import React from 'react';
import { CheckCircle, Star, Shield, Gift, Zap, Users, Clock, Trophy, Video, Headphones, FileText } from 'lucide-react';
import PurchaseButton from '@/components/course/PurchaseButton';
import ConsultationButton from '@/components/buttons/ConsultationButton';

const OfferSummary: React.FC = () => {
  return (
    <section id="masterclass" className="py-16 bg-gradient-to-br from-slate-900 via-teal-800 to-teal-700 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-32 right-16 w-48 h-48 bg-white/5 rounded-full blur-2xl" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/30 px-4 py-2 rounded-full mb-6 shadow-sm hover:shadow-md transition-all duration-300">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span className="font-medium text-yellow-200">Teljes csomag áttekintése</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 leading-tight">
              Mit kapsz pontosan a 
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                49.990 Ft-ért?
              </span>
            </h2>
            
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Teljes értékű masterclass + 2 exkluzív csomag + 3 értékes bónusz + tripla garancia
            </p>
          </div>

          {/* Main Course */}
          <div className="mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Masterclass</h3>
                  <p className="text-yellow-300 font-medium">Vállalkozói vevőpszichológia masterclass</p>
                </div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white/5 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-3">3x több érdeklődő 30 nap alatt</h4>
                  <p className="text-white/90 leading-relaxed mb-4">
                    Megérted, mit akar valójában a vevőd, és ezzel többet adsz el 
                    <span className="text-yellow-300 font-medium"> (akár drágábban is) </span>
                    anélkül, hogy bármit újat kellene fejlesztened.
                  </p>
                  <div className="flex items-center gap-3 text-green-300">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Október masterclass • Csak 10 főre korlátozott</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-4">Miért működik ez a rendszer?</h4>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-teal-300" />
                    </div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Tudományos alapú</h5>
                      <p className="text-white/80 text-sm">Egyetemi kutatásra épülő, adatokkal támasztott módszerek</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-orange-300" />
                    </div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Gyakorlati tapasztalat</h5>
                      <p className="text-white/80 text-sm">Több ezer sikeres kampány, 8 országban tesztelt</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-green-300" />
                    </div>
                    <div>
                      <h5 className="font-medium text-white mb-1">Azonnali alkalmazható</h5>
                      <p className="text-white/80 text-sm">Másnap már kamatoztathatod</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bundle Overview */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">+ 2 exkluzív megoldás csomag</h3>
              <p className="text-white/80">Garantált sikerhez teljes támogatási ökoszisztéma</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-orange-300" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Eredmény 48 órán belül - 48 órás launch</h4>
                  <p className="text-white/70 text-sm">Amely az első 48 órában látható eredményeket hoz, és garantálja hogy az első hónapban megtérül a befektetésed.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-orange-300 bg-orange-500/20">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h6 className="font-semibold text-white">
                          Kész ügyfélmágnes rendszer (mi készítjük neked) – 1:1 Online meeting
                        </h6>
                        <span className="text-xs bg-white/20 text-white/80 px-2 py-1 rounded-full">
                          1 óra
                        </span>
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Megmutatjuk, hogyan építsd fel a saját ügyfélmágnesed, ami folyamatosan hozza az érdeklődőket.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-red-300 bg-red-500/20">
                      <Video className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h6 className="font-semibold text-white">
                          AI szöveg humanizáló webinár
                        </h6>
                        <span className="text-xs bg-white/20 text-white/80 px-2 py-1 rounded-full">
                          1 óra
                        </span>
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Lépésről lépésre megmutatjuk, hogyan tedd hitelesé és eladhatóvá az AI által generált szövegeket
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-red-300 bg-red-500/20">
                      <Video className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h6 className="font-semibold text-white">
                          Élő copy boncolás webinár
                        </h6>
                        <span className="text-xs bg-white/20 text-white/80 px-2 py-1 rounded-full">
                          1 óra
                        </span>
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed">
                        A Ti marketing anyagaitokat elemezzük élőben és megmutatjuk, mit kell megváltoztatni több vevőért
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-300 bg-blue-500/20">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h6 className="font-semibold text-white mb-2">
                        Minőség garancia checklist & keretrendszer
                      </h6>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Átfogó önellenőrzési lista és bevált minőségbiztosítási rendszer, hogy semmi ne maradjon ki.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-300 bg-blue-500/20">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h6 className="font-semibold text-white mb-2">
                        48 órás bevétel boost protokoll – 48 órás eredmény
                      </h6>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Konkrét lépések azonnali bevételnöveléshez, hogy már két nap alatt látható legyen a változás.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-purple-300 bg-purple-500/20">
                      <Headphones className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h6 className="font-semibold text-white mb-2">
                        Életre szóló frissítési garancia
                      </h6>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Folyamatos email hírek és frissítések, hogy mindig naprakész legyél.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-purple-300" />
                  </div>
                  <h4 className="font-semibold text-white mb-2">Átütő sikertámogatás tervrajz – VIP támogatási ökoszisztéma 4 hétig</h4>
                  <p className="text-white/70 text-sm">Biztosítjuk, hogy minden egyes lépést megértesz és alkalmazni tudsz, még ha eddig mindig elakadtál hasonló képzéseknél</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-orange-300 bg-orange-500/20">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h6 className="font-semibold text-white">
                          Személyes Mentorálás – 1:1 Online meeting
                        </h6>
                        <span className="text-xs bg-white/20 text-white/80 px-2 py-1 rounded-full">
                          1 óra
                        </span>
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Egyéni konzultáció szakértő mentorral, aki végigkísér minden lépésen és testre szabott visszajelzést ad.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-orange-300 bg-orange-500/20">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h6 className="font-semibold text-white">
                          Masterclass lezáró - 1:1 Online Meeting
                        </h6>
                        <span className="text-xs bg-white/20 text-white/80 px-2 py-1 rounded-full">
                          1 óra
                        </span>
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Végigmegyünk minden modulon, kitöltjük hiányosságokat, és felépítjük a személyes cselekvési tervedet konkrét következő lépésekkel és azonnali győzelmekkel holnapra.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-orange-300 bg-orange-500/20">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h6 className="font-semibold text-white">
                          Hol veszíted el a vásárlókat - 1:1 Online Meeting
                        </h6>
                        <span className="text-xs bg-white/20 text-white/80 px-2 py-1 rounded-full">
                          1 óra
                        </span>
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Kielemezzük a jelenlegi szövegeid - weboldal, hirdetések, emailek. Pontosan megmutatjuk, hol veszíted el a vásárlókat és hogyan írd át őket, hogy azonnal többet adjanak el.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-red-300 bg-red-500/20">
                      <Video className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h6 className="font-semibold text-white">
                          Érzelmi értékesítés mesterfolyamat - webinár
                        </h6>
                        <span className="text-xs bg-white/20 text-white/80 px-2 py-1 rounded-full">
                          1 óra
                        </span>
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed">
                        A 7 pszichológiai trigger, ami minden vásárlási döntést irányít - és hogyan használd őket.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-red-300 bg-red-500/20">
                      <Video className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h6 className="font-semibold text-white">
                          7 napos győzelem protokoll
                        </h6>
                        <span className="text-xs bg-white/20 text-white/80 px-2 py-1 rounded-full">
                          1 óra
                        </span>
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed">
                        A masterclass tartalmát 7 nap alatt működő rendszerré alakítjuk
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-300 bg-blue-500/20">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h6 className="font-semibold text-white mb-2">
                        Te tempód, mi siker térképünk
                      </h6>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Személyre szabott fejlődési terv, amely illeszkedik a saját tempódhoz és napirendedhez.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-200">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-blue-300 bg-blue-500/20">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h6 className="font-semibold text-white mb-2">
                        Győzelmi pontok és mérföldkő térkép
                      </h6>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Átlátható rendszer a haladásod követésére, hogy minden kis siker ösztönző erővel hajtson előre.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bonuses Overview */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30 px-4 py-2 rounded-full mb-6">
                <Gift className="w-5 h-5 text-orange-300" />
                <span className="font-medium text-orange-200">De várj... még többet kapsz!</span>
              </div>
              
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">3 értékes bónusz csomag</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-6 border border-green-400/30 hover:shadow-lg transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="text-3xl mb-3">🎁</div>
                  <h4 className="font-semibold text-white mb-2">BÓNUSZ #1</h4>
                  <p className="text-green-200 font-medium mb-2">6db Copy-Paste profit generátor</p>
                </div>
                <p className="text-white/80 text-sm text-center">
                  Kész, teszelt AI promptok gyűjteménye, amivel 24 órán belül új kampányokat indíthatsz, blog posztokat generálhatsz, termékleírásokat írhatsz, email marketing kampányokat indíthatsz, közösségi média posztokat generálhatsz és egy vevői profilt is felállíthatsz - szó szerint kimásolod, beilleszted, és futtatod. Minden szöveget már teszteltünk.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl p-6 border border-purple-400/30 hover:shadow-lg transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="text-3xl mb-3">🎯</div>
                  <h4 className="font-semibold text-white mb-2">BÓNUSZ #2</h4>
                  <p className="text-purple-200 font-medium mb-2">Versenytárs vadász rendszer</p>
                </div>
                <p className="text-white/80 text-sm text-center">
                  48 órán belül feltérképezzük neked minden versenytársad összes hirdetését, árait, üzeneteit - és pontosan tudni fogod, mit csinálnak rosszul, amit te jobban tehetsz.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-xl p-6 border border-orange-400/30 hover:shadow-lg transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="text-3xl mb-3">🛡️</div>
                  <h4 className="font-semibold text-white mb-2">BÓNUSZ #3</h4>
                  <p className="text-orange-200 font-medium mb-2">Profit mentés garancia</p>
                </div>
                <p className="text-white/80 text-sm text-center">
                  Ha bármelyik kampányod veszteséges lesz a rendszer alkalmazása után, ingyen átírjuk és optimalizáljuk addig, amíg profitábilis nem lesz. Akár egy éven keresztül.
                </p>
              </div>
            </div>
          </div>

          {/* Guarantee Section */}
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Shield className="w-10 h-10 text-green-400" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Tripla Garancia</h3>
                  <p className="text-green-300 font-medium">100% pénz visszafizetési garancia</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-300 font-semibold">1</span>
                  </div>
                  <h4 className="font-medium text-white mb-2">Alkalmazási Garancia</h4>
                  <p className="text-white/80 text-sm">Ha 30 nap alatt nem tudod alkalmazni → pénz vissza</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-300 font-semibold">2</span>
                  </div>
                  <h4 className="font-medium text-white mb-2">Bevételnövelési Garancia</h4>
                  <p className="text-white/80 text-sm">Ha nem nő a leadszám → pénz vissza</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-300 font-semibold">3</span>
                  </div>
                  <h4 className="font-medium text-white mb-2">Elégedettségi Garancia</h4>
                  <p className="text-white/80 text-sm">Bármilyen okból elégedetlen vagy → pénz vissza</p>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <p className="text-white/90 leading-relaxed">
                  <span className="font-semibold text-yellow-300">"Teljes körű elégedettségi garancia"</span> - 
                  Ha bármilyen okból nem vagy elégedett, egyszerűen írj az info@elira.hu címre 
                  <span className="text-green-300 font-medium">"add vissza a pénzem"</span> üzenettel, 
                  és 40 percen belül visszakapod a teljes összeget.
                </p>
              </div>
            </div>
          </div>

          {/* Purchase Buttons */}
          <div className="text-center">
            <div className="bg-white backdrop-blur-md rounded-2xl p-8 border border-white shadow-2xl max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <PurchaseButton 
                  courseId="ai-copywriting-course"
                  className="transform hover:scale-105 transition-transform duration-300 flex-1 w-full md:w-auto"
                />
                <div className="text-gray-400 text-lg font-bold hidden md:block">VAGY</div>
                <ConsultationButton 
                  className="flex-1 w-full md:w-auto"
                  variant="default"
                  size="lg"
                />
              </div>
              <div className="mt-4 text-center text-gray-600 text-sm">
                💬 Kérdés van? Beszéljük meg előtte!
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OfferSummary;