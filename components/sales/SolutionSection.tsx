'use client';

import React, { useState } from 'react';
import { Zap, Target, Shield, Sparkles, Video, Users, FileText, Headphones, Gift, ChevronDown, ChevronUp } from 'lucide-react';
import PurchaseButton from '@/components/course/PurchaseButton';
import CalendarSection from '@/components/sections/CalendarSection';
import SurveyCard from '@/components/sales/SurveyCard';

// Progressive disclosure component for guarantee text
const GuaranteeText: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="text-center mb-8">
      {/* Mobile: Show condensed version with expand button */}
      <div className="md:hidden">
        <p className="text-gray-700 leading-relaxed text-sm mb-4">
          Teljes körű elégedettségi garancia - 30 napon belül bármilyen okból visszaadjuk a pénzed.
        </p>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-green-600 hover:text-green-700 font-semibold text-sm mb-4 min-h-[44px] px-4 py-2 rounded-lg hover:bg-green-50 transition-all duration-200 focus-ring"
          aria-expanded={isExpanded}
          aria-controls="guarantee-details"
          aria-label={isExpanded ? 'Garancia részletek elrejtése' : 'Garancia részletek megjelenítése'}
        >
          {isExpanded ? 'Kevesebb' : 'Részletek'} {isExpanded ? '↑' : '↓'}
        </button>
        
        {isExpanded && (
          <div id="guarantee-details" className="bg-green-50 rounded-lg p-4 border border-green-200 text-left" role="region" aria-labelledby="guarantee-details-heading">
            <p className="text-gray-700 text-sm leading-relaxed">
              Nem azt kérem, hogy ma igent vagy nemet mondj... Csak azt kérem, hogy hozz egy teljes körűen tájékozott döntést, semmi mást. Teljes körűen tájékozott döntést csak belülről tudsz hozni, nem kívülről. Szóval lépj be, és nézd meg, hogy minden, amit ezen az első webináron mondunk, igaz-e és értékes-e számodra. Ha igen, akkor dönthetsz úgy, hogy maradsz. Ha nem neked való, miután regisztráltál, képes leszel teljes körűen tájékozott döntést hozni arról is, ha ez mégsem neked való. Ezt a döntést viszont most nem hozhatod meg, ugyanabból az okból, amiért házat sem veszel anélkül, hogy belülről megnéznéd.
            </p>
            <br />
            <p className="text-gray-700 text-sm leading-relaxed">
              És tudd: akár 30 perc, akár 30 nap múlva... ha te nem vagy elégedett, én sem vagyok az. Bármilyen okból is, ha vissza szeretnéd kapni a pénzed, visszaadjuk, mert a pénzedet csak akkor akarjuk megtartani, ha elégedett vagy. Csak annyit kell tenned, hogy írsz a <a href="mailto:info@elira.hu" className="text-green-600 hover:text-green-700 underline">info@elira.hu</a> címre, és megírod: "add vissza a pénzem", és meg is kapod a pénzed, mégpedig gyorsan – ügyfélszolgálati megkeresésekre átlagosan 40 percen belül válaszolunk, a hét minden napján, napi 24 órában.
            </p>
            <br />
            <p className="text-gray-700 text-sm leading-relaxed font-medium">
              Ilyen garanciát csak akkor lehet adni, ha az ember biztos abban, hogy amit kínál, az valódi érték, és elég biztos vagyok benne, hogy amikor regisztrálsz, pontosan azt kapod, amire szükséged van, hogy HASZNOD legyen belőle.
            </p>
          </div>
        )}
      </div>
      
      {/* Desktop: Show full text */}
      <div className="hidden md:block">
        <p className="text-gray-700 leading-relaxed text-base italic max-w-4xl mx-auto mb-6">
          Nem azt kérem, hogy ma igent vagy nemet mondj... Csak azt kérem, hogy hozz egy teljes körűen tájékozott döntést, semmi mást. Teljes körűen tájékozott döntést csak belülről tudsz hozni, nem kívülről. Szóval lépj be, és nézd meg, hogy minden, amit ezen az első webináron mondunk, igaz-e és értékes-e számodra. Ha igen, akkor dönthetsz úgy, hogy maradsz. Ha nem neked való, miután regisztráltál, képes leszel teljes körűen tájékozott döntést hozni arról is, ha ez mégsem neked való. Ezt a döntést viszont most nem hozhatod meg, ugyanabból az okból, amiért házat sem veszel anélkül, hogy belülről megnéznéd. És tudd: akár 30 perc, akár 30 nap múlva... ha te nem vagy elégedett, én sem vagyok az. Bármilyen okból is, ha vissza szeretnéd kapni a pénzed, visszaadjuk, mert a pénzedet csak akkor akarjuk megtartani, ha elégedett vagy. Csak annyit kell tenned, hogy írsz a <a href="mailto:info@elira.hu" className="text-green-600 hover:text-green-700 underline">info@elira.hu</a> címre, és megírod: "add vissza a pénzem", és meg is kapod a pénzed, mégpedig gyorsan – ügyfélszolgálati megkeresésekre átlagosan 40 percen belül válaszolunk, a hét minden napján, napi 24 órában. Ilyen garanciát csak akkor lehet adni, ha az ember biztos abban, hogy amit kínál, az valódi érték, és elég biztos vagyok benne, hogy amikor regisztrálsz, pontosan azt kapod, amire szükséged van, hogy HASZNOD legyen belőle.
        </p>
      </div>
    </div>
  );
};

// Progressive disclosure bonus card component
const BonusCard: React.FC<{ bonus: any; index: number }> = ({ bonus, index }) => {
  const [isContentExpanded, setIsContentExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl border border-teal-200 hover:border-teal-300 transition-all duration-300 overflow-hidden h-full flex flex-col">
      {/* Bonus Header */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-4 md:p-6 border-b border-teal-100">
        <div className="text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-teal-100 to-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
            <bonus.icon className="w-5 h-5 md:w-6 md:h-6 text-teal-600" />
          </div>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs font-bold px-2 py-1 rounded">
              BÓNUSZ #{index + 1}
            </span>
          </div>
          <h4 className="text-base md:text-lg font-bold text-gray-900 mb-3">
            {bonus.title}
          </h4>
          
          {/* Mobile: Show truncated description with expand option */}
          <div className="md:hidden">
            <p className="text-gray-700 text-sm leading-relaxed">
              {bonus.description.length > 120 && !isContentExpanded
                ? `${bonus.description.substring(0, 120)}...`
                : bonus.description
              }
            </p>
            {bonus.description.length > 120 && (
              <button
                onClick={() => setIsContentExpanded(!isContentExpanded)}
                className="text-teal-600 hover:text-teal-700 font-semibold text-xs mt-2 min-h-[32px] px-3 py-1 rounded hover:bg-teal-50 transition-all duration-200 focus-ring"
                aria-expanded={isContentExpanded}
                aria-label={isContentExpanded ? `${bonus.title} részletek elrejtése` : `${bonus.title} részletek megjelenítése`}
              >
                {isContentExpanded ? 'Kevesebb' : 'Több'}
              </button>
            )}
          </div>
          
          {/* Desktop: Show full description */}
          <div className="hidden md:block">
            <p className="text-gray-700 text-sm">
              {bonus.description}
            </p>
          </div>
        </div>
      </div>
      
      {/* Bonus Content - Always show first 2-3 items on mobile */}
      <div className="p-4 md:p-6 flex-1">
        <h5 className="text-sm md:text-base font-semibold text-gray-900 mb-3 md:mb-4 text-center">Tartalom:</h5>
        <div className="space-y-2 md:space-y-3">
          {/* Mobile: Show limited items */}
          <div className="md:hidden space-y-2">
            {bonus.content.slice(0, isContentExpanded ? bonus.content.length : 3).map((item: any, itemIndex: number) => (
              <div key={itemIndex} className="flex gap-2 p-2 bg-teal-50 rounded-lg">
                <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  <item.icon className="w-3 h-3" />
                </div>
                <div className="flex-1">
                  <span className="text-gray-900 font-medium text-xs leading-relaxed">{item.name}</span>
                </div>
              </div>
            ))}
            {bonus.content.length > 3 && (
              <button
                onClick={() => setIsContentExpanded(!isContentExpanded)}
                className="w-full text-teal-600 hover:text-teal-700 font-semibold text-xs mt-2 min-h-[32px] px-3 py-2 rounded border border-teal-200 hover:bg-teal-50 transition-all duration-200 focus-ring"
                aria-expanded={isContentExpanded}
                aria-label={isContentExpanded ? `${bonus.title} tartalom elrejtése` : `${bonus.title} összes tartalom megjelenítése`}
              >
                {isContentExpanded ? `Kevesebb tartalom ↑` : `+${bonus.content.length - 3} további elem ↓`}
              </button>
            )}
          </div>
          
          {/* Desktop: Show all items */}
          <div className="hidden md:block space-y-3">
            {bonus.content.map((item: any, itemIndex: number) => (
              <div key={itemIndex} className="flex gap-3 p-3 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors duration-200">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="text-gray-900 font-medium text-sm leading-relaxed">{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

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
          <div className="text-center mb-12">
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
          </div>

          {/* Bundles Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                2 exklúzív csomag, ami garantálja a sikered:
              </h3>
            </div>
            
            <div className="space-y-8 mb-12">
              {bundles.map((bundle, index) => (
                <div
                  key={index}
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
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
    
    {/* Bonus Section */}
    <section id="bonuses" className="py-16 relative overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-50">
      {/* Bonus decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-200 rounded-full filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-orange-200 rounded-full filter blur-lg opacity-30 animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-200 rounded-full filter blur-md opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-purple-200 rounded-full filter blur-lg opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Bonus Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-300 px-4 py-2 rounded-full shadow-sm mb-6 hover:shadow-md transition-all duration-300">
              <Gift className="w-5 h-5 text-orange-600 animate-pulse" />
              <span className="font-medium text-gray-900">🎉 De várj... még többet kapsz!</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              <span className="text-4xl">🎁</span> + 3 Értékes Bónusz <span className="text-4xl">🎁</span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Ezek a bónuszok önmagukban többet érnek, mint a teljes masterclass ára!
            </p>
          </div>
          
          {/* Bonuses List - Mobile optimized with progressive disclosure */}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 md:gap-8">
            {bonuses.map((bonus, index) => (
              <BonusCard key={index} bonus={bonus} index={index} />
            ))}
          </div>
          
          {/* CTA */}
          <div className="text-center mt-12">
            <PurchaseButton 
              courseId="ai-copywriting-course"
              className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            />
          </div>
          
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
          <div className="text-center mb-12">
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
          </div>
          
          <div className="mb-12">
            <div className="bg-gradient-to-br from-white to-green-50/30 rounded-xl border border-green-200 p-8 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              
              {/* Detailed Guarantee Text - Progressive Disclosure */}
              <GuaranteeText />
              
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
          </div>

          {/* Survey Card */}
          <div className="w-full">
            <SurveyCard surveyUrl="https://www.survio.com/survey/d/G1A4N2P5Q8B1S8M9F" />
          </div>

        </div>
      </div>
    </section>
    </>
  );
};

export default SolutionSection;