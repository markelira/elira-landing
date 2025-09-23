'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Shield, Sparkles, Video, Users, FileText, Headphones, Gift } from 'lucide-react';
import PurchaseButton from '@/components/course/PurchaseButton';
import CalendarSection from '@/components/sections/CalendarSection';

const SolutionSection: React.FC = () => {
  const bundles = [
    {
      title: "Eredmény 48 órán belül - 48 órás launch",
      description: "Amely az első 48 órában látható eredményeket hoz, és garantálja hogy az első hónapban megtérül a befektetésed.",
      icon: Zap,
      contents: [
        {
          name: "Kész ügyfélmágnes rendszer (mi készítjük neked) – 1:1 Online meeting",
          description: "Megmutatjuk, hogyan építsd fel a saját ügyfélmágnesed, ami folyamatosan hozza az érdeklődőket.",
          type: "meeting",
          duration: "1 óra",
          icon: Users,
          color: "text-orange-600 bg-orange-100"
        },
        {
          name: "AI szöveg humanizáló webinár",
          description: "Lépésről lépésre megmutatjuk, hogyan tedd hitelesé és eladhatóvá az AI által generált szövegeket",
          type: "webinar",
          duration: "1 óra",
          icon: Video,
          color: "text-red-600 bg-red-100"
        },
        {
          name: "Élő copy boncolás webinár",
          description: "A Ti marketing anyagaitokat elemezzük élőben és megmutatjuk, mit kell megváltoztatni több vevőért",
          type: "webinar",
          duration: "1 óra",
          icon: Video,
          color: "text-red-600 bg-red-100"
        },
        {
          name: "Minőség garancia checklist & keretrendszer",
          description: "Átfogó önellenőrzési lista és bevált minőségbiztosítási rendszer, hogy semmi ne maradjon ki.",
          type: "guide",
          icon: FileText,
          color: "text-blue-600 bg-blue-100"
        },
        {
          name: "48 órás bevétel boost protokoll – 48 órás eredmény",
          description: "Konkrét lépések azonnali bevételnöveléshez, hogy már két nap alatt látható legyen a változás.",
          type: "guide",
          icon: FileText,
          color: "text-blue-600 bg-blue-100"
        },
        {
          name: "Életre szóló frissítési garancia",
          description: "Folyamatos email hírek és frissítések, hogy mindig naprakész legyél.",
          type: "support",
          icon: Headphones,
          color: "text-purple-600 bg-purple-100"
        }
      ]
    },
    {
      title: "Átütő sikertámogatás tervrajz – VIP támogatási ökoszisztéma 4 hétig",
      description: "Biztosítjuk, hogy minden egyes lépést megértesz és alkalmazni tudsz, még ha eddig mindig elakadtál hasonló képzéseknél",
      icon: Shield,
      contents: [
        {
          name: "Személyes Mentorálás – 1:1 Online meeting",
          description: "Egyéni konzultáció szakértő mentorral, aki végigkísér minden lépésen és testre szabott visszajelzést ad.",
          type: "meeting",
          duration: "1 óra",
          icon: Users,
          color: "text-orange-600 bg-orange-100"
        },
       {
          name: "Masterclass lezáró - 1:1 Online Meeting",
          description: "Végigmegyünk minden modulon, kitöltjük hiányosságokat, és felépítjük a személyes cselekvési tervedet konkrét következő lépésekkel és azonnali győzelmekkel holnapra.",
          type: "meeting",
          duration: "1 óra",
          icon: Users,
          color: "text-orange-600 bg-orange-100"
        },
        {
          name: "Hol veszíted el a vásárlókat - 1:1 Online Meeting",
          description: "Kielemezzük a jelenlegi szövegeid - weboldal, hirdetések, emailek. Pontosan megmutatjuk, hol veszíted el a vásárlókat és hogyan írd át őket, hogy azonnal többet adjanak el.",
          type: "meeting",
          duration: "1 óra",
          icon: Users,
          color: "text-orange-600 bg-orange-100"
        },
        {
          name: "Érzelmi értékesítés mesterfolyamat - webinár",
          description: "A 7 pszichológiai trigger, ami minden vásárlási döntést irányít - és hogyan használd őket.",
          type: "webinar",
          duration: "1 óra",
          icon: Video,
          color: "text-red-600 bg-red-100"
        },
        {
          name: "7 napos győzelem protokoll",
          description: "A masterclass tartalmát 7 nap alatt működő rendszerré alakítjuk",
          type: "webinar",
          duration: "1 óra",
          icon: Video,
          color: "text-red-600 bg-red-100"
        },
        {
          name: "Te tempód, mi siker térképünk",
          description: "Személyre szabott fejlődési terv, amely illeszkedik a saját tempódhoz és napirendedhez.",
          type: "guide",
          icon: FileText,
          color: "text-blue-600 bg-blue-100"
        },
        {
          name: "Győzelmi pontok és mérföldkő térkép",
          description: "Átlátható rendszer a haladásod követésére, hogy minden kis siker ösztönző erővel hajtson előre.",
          type: "guide",
          icon: FileText,
          color: "text-blue-600 bg-blue-100"
        }
      ]
    }
  ];

  const bonuses = [
    {
      title: "6db COPY-PASTE PROFIT GENERÁTOR",
      description: "Kész, teszelt AI promptok gyűjteménye, amivel 24 órán belül új kampányokat indíthatsz, blog posztokat generálhatsz, termékleírásokat írhatsz, email marketing kampányokat indíthatsz, közösségi média posztokat generálhatsz és egy vevői profilt is felállíthatsz - szó szerint kimásolod, beilleszted, és futtatod. Minden szöveget már teszteltünk.",
      icon: Sparkles,
      content: [
        {
          name: "Blogposzt generátor",
          type: "template",
          icon: FileText,
          color: "text-blue-600 bg-blue-100"
        },
        {
          name: "Buyer persona generátor",
          type: "template", 
          icon: Target,
          color: "text-green-600 bg-green-100"
        },
        {
          name: "Email marketing generátor",
          type: "template",
          icon: FileText,
          color: "text-blue-600 bg-blue-100"
        },
        {
          name: "Facebook hirdetés generátor",
          type: "template",
          icon: Target,
          color: "text-green-600 bg-green-100"
        },
        {
          name: "Bulletpoint generátor",
          type: "template",
          icon: FileText,
          color: "text-blue-600 bg-blue-100"
        },
        {
          name: "Közösségi média poszt generátor",
          type: "template",
          icon: Target,
          color: "text-green-600 bg-green-100"
        }
      ]
    },
    {
      title: "VERSENYTÁRS VADÁSZ RENDSZER",
      description: "48 órán belül feltérképezzük minden versenytársad összes hirdetését, árait, üzeneteit - és pontosan tudni fogod, mit csinálnak rosszul, amit te jobban tehetsz.",
      icon: Target,
      content: [
        {
          name: "Teljes kémkedés",
          type: "service",
          icon: Headphones,
          color: "text-purple-600 bg-purple-100"
        },
        {
          name: "Lépésről lépésre analízis protokoll - bemutatjuk az eredményeket online meetingen",
          type: "webinar",
          icon: Video,
          color: "text-red-600 bg-red-100"
        },
        {
          name: "Versenyelőny tervrajz",
          type: "guide",
          icon: FileText,
          color: "text-blue-600 bg-blue-100"
        },
        {
          name: "1:1 meeting a saját versenytársaid elemzéséhez",
          type: "meeting",
          icon: Users,
          color: "text-orange-600 bg-orange-100"
        }
      ]
    },
    {
      title: "PROFIT MENTÉS GARANCIA",
      description: "Ha bármelyik kampányod veszteséges lesz a rendszer alkalmazása után, ingyen átírjuk és optimalizáljuk addig, amíg profitábilis nem lesz. Akár egy éven keresztül.",
      icon: Shield,
      content: [
        {
          name: "Személyes kampány audit szolgáltatás",
          type: "service",
          icon: Headphones,
          color: "text-purple-600 bg-purple-100"
        },
        {
          name: "Szövegátírási garancia",
          type: "service",
          icon: Headphones,
          color: "text-purple-600 bg-purple-100"
        },
        {
          name: "Stratégiai újrapozicionálás",
          type: "guide",
          icon: FileText,
          color: "text-blue-600 bg-blue-100"
        },
        {
          name: "Korlátlan support egy évig",
          type: "support",
          icon: Headphones,
          color: "text-purple-600 bg-purple-100"
        }
      ]
    }
  ];

  return (
    <>
    <section id="bundles" className="py-16 relative overflow-hidden" style={{ backgroundColor: '#F8F7F5' }}>
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-green-200 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-emerald-200 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 px-4 py-2 rounded-full shadow-sm mb-6 hover:shadow-md transition-all duration-300">
              <Sparkles className="w-5 h-5 text-green-600 animate-pulse" />
              <span className="font-medium text-gray-900">A megoldás</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              Itt a teljes átfogó megoldás
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nem csak egy kurzust kapsz - egy teljes rendszert, ami garantáltan 
              3x több érdeklődőt hoz 30 nap alatt
            </p>
          </motion.div>

          {/* Bundles Section */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                2 exklúzív csomag, ami garantálja a sikered:
              </h3>
            </motion.div>
            
            <div className="space-y-8 mb-12">
              {bundles.map((bundle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg border border-gray-200 hover:border-teal-200 transition-all duration-300 overflow-hidden"
                >
                  {/* Bundle Header */}
                  <div className="bg-gradient-to-r from-teal-50 to-green-50 p-6 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                        <bundle.icon className="w-6 h-6 text-teal-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          {bundle.title}
                        </h4>
                        <p className="text-gray-700">
                          {bundle.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bundle Contents */}
                  <div className="p-6">
                    <h5 className="text-lg font-semibold text-gray-900 mb-4">Mit tartalmaz:</h5>
                    <div className="space-y-4">
                      {bundle.contents.map((content, contentIndex) => (
                        <div key={contentIndex} className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${content.color}`}>
                            <content.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h6 className="font-semibold text-gray-900">
                                {content.name}
                              </h6>
                              {content.duration && (
                                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                                  {content.duration}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {content.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
    
    {/* Bonus Section */}
    <section id="bonuses" className="py-16 relative overflow-hidden bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Bonus Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 px-4 py-2 rounded-full shadow-sm mb-6 hover:shadow-md transition-all duration-300">
              <Gift className="w-5 h-5 text-orange-600 animate-pulse" />
              <span className="font-medium text-gray-900">De várj... még többet kapsz!</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              + 3 Értékes Bónusz
            </h2>
          </motion.div>
          
          {/* Bonuses List */}
          <div className="space-y-8">
            {bonuses.map((bonus, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl border border-orange-200 hover:border-orange-300 transition-all duration-300 overflow-hidden"
              >
                {/* Bonus Header */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 border-b border-orange-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center">
                      <bonus.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          BÓNUSZ #{index + 1}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {bonus.title}
                      </h4>
                      <p className="text-gray-700">
                        {bonus.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Bonus Content */}
                <div className="p-6">
                  <h5 className="text-lg font-semibold text-gray-900 mb-4">Tartalom:</h5>
                  <div className="grid md:grid-cols-2 gap-4">
                    {bonus.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex gap-4 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <span className="text-gray-900 font-medium leading-relaxed">{item.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <PurchaseButton 
              courseId="ai-copywriting-course"
              className="bg-transparent border-2 border-teal-700 hover:border-teal-800 text-teal-700 hover:text-teal-800 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            />
          </motion.div>
          
        </div>
      </div>
    </section>
    
    {/* Calendar Section */}
    <CalendarSection />
    
    {/* Guarantee Section */}
    <section className="py-16 relative overflow-hidden" style={{ backgroundColor: '#F8F7F5' }}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Triple Guarantee Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 px-4 py-2 rounded-full shadow-sm mb-6 hover:shadow-md transition-all duration-300">
              <Shield className="w-5 h-5 text-green-600 animate-pulse" />
              <span className="font-medium text-gray-900">Garancia</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              Teljes körű elégedettségi garancia
            </h2>
            
            <p className="text-lg text-gray-900 font-semibold mb-8">
              (100%-át visszaadjuk)
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-white to-green-50/30 rounded-xl border border-green-200 p-8 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              
              {/* Detailed Guarantee Text */}
              <div className="text-center mb-8">
                <p className="text-gray-700 leading-relaxed text-base italic max-w-4xl mx-auto mb-6">
                  Nem azt kérem, hogy ma igent vagy nemet mondj... Csak azt kérem, hogy hozz egy teljes körűen tájékozott döntést, semmi mást. Teljes körűen tájékozott döntést csak belülről tudsz hozni, nem kívülről. Szóval lépj be, és nézd meg, hogy minden, amit ezen az első webináron mondunk, igaz-e és értékes-e számodra. Ha igen, akkor dönthetsz úgy, hogy maradsz. Ha nem neked való, semmi harag, miután regisztráltál, képes leszel teljes körűen tájékozott döntést hozni arról is, ha ez mégsem neked való. Ezt a döntést viszont most nem hozhatod meg, ugyanabból az okból, amiért házat sem veszel anélkül, hogy belülről megnéznéd. És tudd: akár 30 perc, akár 30 nap múlva... ha te nem vagy elégedett, én sem vagyok az. Bármilyen okból is, ha vissza szeretnéd kapni a pénzed, visszaadjuk, mert a pénzedet csak akkor akarjuk megtartani, ha elégedett vagy. Csak annyit kell tenned, hogy írsz a <a href="mailto:info@elira.hu" className="text-green-600 hover:text-green-700 underline">info@elira.hu</a> címre, és megírod: "add vissza a pénzem", és meg is kapod a pénzed, mégpedig gyorsan – ügyfélszolgálati megkeresésekre átlagosan 40 percen belül válaszolunk, a hét minden napján, napi 24 órában. Ilyen garanciát csak akkor lehet adni, ha az ember biztos abban, hogy amit kínál, az valódi érték, és elég biztos vagyok benne, hogy amikor regisztrálsz, pontosan azt kapod, amire szükséged van, hogy HASZNOD legyen belőle.
                </p>
              </div>
              
              {/* Triple Guarantee */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 text-center mb-6">Tripla Garancia:</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-white rounded-lg border border-green-100">
                    <div className="text-xl font-bold text-green-600 mb-2">Alkalmazási garancia</div>
                    <p className="text-sm text-gray-700">Ha 30 nap alatt nem tudod alkalmazni → pénz vissza</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-green-100">
                    <div className="text-xl font-bold text-green-600 mb-2">Bevételnövelési garancia</div>
                    <p className="text-sm text-gray-700">Ha ugyanannyi marketing költéssel nem nő a leadszám → pénz vissza</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-green-100">
                    <div className="text-xl font-bold text-green-600 mb-2">Elégedettségi garancia</div>
                    <p className="text-sm text-gray-700">Bármilyen okból elégedetlen vagy → pénz vissza</p>
                  </div>
                </div>
              </div>
              
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <PurchaseButton 
              courseId="ai-copywriting-course"
            />
            
            <div className="mt-6 space-y-3">
              <p className="text-red-600 font-semibold">
                ⚠️ November más kurzus lesz (nem ez)
              </p>
              <p className="text-gray-600 text-sm">
                Személyes figyelmet csak 10 főnek tudunk adni
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
    </>
  );
};

export default SolutionSection;