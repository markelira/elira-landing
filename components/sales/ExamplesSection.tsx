'use client';

import React, { useState } from 'react';
import { FileText, Users, Mail, MessageSquare, BarChart3, Target, X, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import PurchaseButton from '@/components/course/PurchaseButton';

const ExamplesSection: React.FC = () => {
  const [activeExample, setActiveExample] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before');

  const examples = [
    {
      id: 'blog-generator',
      title: 'Blogposzt generátor',
      description: 'SEO-optimalizált blog tartalom percek alatt',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      category: 'Tartalom készítés'
    },
    {
      id: 'buyer-persona',
      title: 'Buyer persona generátor',
      description: 'Részletes vevői profilok 10 perc alatt',
      icon: Users,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700',
      category: 'Vevőanalízis'
    },
    {
      id: 'email-marketing',
      title: 'Email marketing generátor',
      description: 'Konverziós email kampányok automatikusan',
      icon: Mail,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      category: 'Email marketing'
    },
    {
      id: 'facebook-ads',
      title: 'Facebook ads generátor',
      description: 'Figyelemfelkeltő hirdetési szövegek',
      icon: MessageSquare,
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      textColor: 'text-rose-700',
      category: 'Közösségi média'
    },
    {
      id: 'bulletpoint-generator',
      title: 'Bulletpoint generátor',
      description: 'Értékesítő felsorolások készítése',
      icon: BarChart3,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-700',
      category: 'Értékesítés'
    },
    {
      id: 'social-media',
      title: 'Közösségi média generátor',
      description: 'Engaging posztok minden platformra',
      icon: Target,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      textColor: 'text-teal-700',
      category: 'Közösségi média'
    }
  ];

  const getExampleContent = (id: string) => {
    const content = {
      'blog-generator': {
        example: `🔥 **ÉLŐBEN GENERÁLT BLOGPOSZT - 10 PERC ALATT!**

---

# 🚀 7 kritikus ok, amiért az egyedi webáruház fejlesztés megtartja a vevőidet (míg a sablonok elveszítik őket)

> 💡 **Infografika javaslat a fejléc mellé:** „Sablon vs. Egyedi webáruház – 7 kritikus különbség"

⚡ A legtöbb KKV e-kereskedő ugyanazzal a problémával szembesül: elkezdik webshopjukat egy népszerű sablonplatformon (Shopify, WooCommerce, Shoprenter), majd néhány hónap vagy év után **csalódnak**. Az elején gyorsan, olcsón és egyszerűen indulnak el – de amikor növekedni szeretnének, hirtelen **falakba ütköznek**. Az ügyfelek eltűnnek, a márkájuk beleolvad a tömegbe, és a platform szabályaihoz vannak kötve.

💎 **15+ év tapasztalatunk alapján** a legfontosabb különbség a **vevőmegtartásban** rejlik. Egy **egyedi webáruház fejlesztés** nemcsak jobb vásárlói élményt ad, hanem bizonyítottan **30-40%-kal jobban megtartja a vevőidet**. Nézzük meg a 7 kritikus okot, amiért ez így van.

---

## 🛡️ 1. Bizalom és biztonság: a vásárlói hűség alapja

A vásárlók **82%-a** szerint a **biztonság** a legfontosabb tényező egy webáruház megbízhatóságának megítélésében (forrás: Statista). A sablonplatformokon sajnos gyakoriak a biztonsági rések, és a csaló boltok miatt a vásárlói bizalom is sérül.

**❌ Probléma sablonnal:**
- Tömeges támadások ugyanazokra a sablonokra
- Adatszivárgások, hitelkártya-problémák  
- Lassú reagálás platformszinten

**✅ Megoldás egyedivel:**
- Testreszabott biztonsági protokollok
- Egyedi titkosítás és GDPR-megfelelés
- Rugalmas fraud-detekciós megoldások

👉 **Checklist a végén:** „5 kérdés, amit fel kell tenned a webáruházad biztonságáról"

---

## 🎯 2. Teljes kontroll az ügyfélélmény felett

A sablonok kötöttsége miatt minden vásárlói út ugyanúgy néz ki. Ez oda vezet, hogy a konverziók elmaradnak. Egyedi fejlesztésnél minden lépést te szabályozol.

**❌ Probléma sablonnal:**
- Egységes, unalmas checkout folyamat
- Nem személyre szabható ajánlórendszer
- Limitált A/B teszt lehetőségek

**✅ Megoldás egyedivel:**
- Egyedi checkout optimalizálás (**akár 20-30% konverziónövekedés**)
- Dinamikus, személyre szabott ajánlók
- Saját analitikai rendszer beépítése

---

## ⭐ 3. Márkadifferenciálás: kitűnsz a tömegből

Ha minden webshop ugyanúgy néz ki, a vásárlók nem jegyzik meg a márkádat. A hosszú távú ügyfélhűséghez azonban **különleges élményt** kell nyújtani.

**❌ Probléma sablonnal:**
- Egyforma sablon design
- Nehéz érzelmi kapcsolatot építeni
- Árukereső árversenyben ragadsz

**✅ Megoldás egyedivel:**
- Saját arculat, egyedi UX/UI tervezés
- Márkád személyiségét tükröző funkciók
- Erősebb brand awareness és hűség

---

## 📈 4. Rugalmasság és skálázhatóság

Ahogy nő az üzleted, úgy nőnek az igények is. Egy sablonplatformnál hamar eljutsz oda, hogy fizetős pluginek és kerülőutak nélkül nem tudsz továbblépni.

**❌ Probléma sablonnal:**
- Pluginek tömege → lassú oldal, hibák
- Skálázásnál rejtett költségek
- Funkciók ütközése

**✅ Megoldás egyedivel:**
- Moduláris fejlesztés: csak azt építjük, amire szükséged van
- Teljesítmény-optimalizált backend
- **100% kontroll** a bővíthetőség felett

---

## 💰 5. Pénzügyi átláthatóság és megtérülés

Sok vállalkozó panaszkodik visszatartott kifizetésekre vagy rejtett díjakra. Az egyedi fejlesztésnél pontosan tudod, mire költesz, és hol térül meg.

**❌ Probléma sablonnal:**
- Magas tranzakciós díjak
- Visszatartott összegek (chargeback gyanú)
- Havi előfizetések folyamatos költsége

**✅ Megoldás egyedivel:**
- Egyértelmű fejlesztési és üzemeltetési költség
- Teljes kontroll a pénzáramlás felett
- **Magasabb ROI: 18-24 hónap alatt megtérülés**

> 📊 **Összehasonlító táblázat:** Platform költségek vs. Egyedi fejlesztés ROI

---

## ⚡ 6. Gyors, személyre szabott támogatás

Egy sablonplatform ügyfélszolgálata sokszor sablonos, lassú és általános. Amikor kritikus probléma van, ez pénzbe kerül.

**❌ Probléma sablonnal:**
- Lassú válaszidő
- Sablonos tanácsok, nem konkrét megoldás
- Időveszteség → bevételkiesés

**✅ Megoldás egyedivel:**
- Dedikált fejlesztői csapat
- Azonnali reakció és megoldás
- Folyamatos karbantartás és fejlesztés

> 📈 **Esettanulmány:** Egy KKV webshop forgalma **28%-kal nőtt**, miután egyedi fejlesztésre váltott, mert az ügyfélszolgálat helyett valós problémamegoldásra kapott támogatást.

---

## 🔓 7. Függetlenség a platformoktól (nincs vendor lock-in)

A legnagyobb félelem: „Mi történik, ha a platform felemeli az árakat, változtat a szabályokon, vagy egyszerűen megszűnik?" Egy egyedi webáruház fejlesztésnél a rendszer **a tiéd**.

**❌ Probléma sablonnal:**
- Függőség egyetlen szolgáltatótól
- Adatvesztés veszélye migrációkor
- Nincs teljes kontroll

**✅ Megoldás egyedivel:**
- A webáruház teljes egészében a tiéd
- Teljes kontroll az adatok és folyamatok felett
- **Hosszú távú stabilitás**

---

# 🎯 Összegzés: Miért jobb az egyedi webáruház fejlesztés?

Egy sablonplatform jó belépőszint, de nem nyújt stabil alapot a hosszú távú vevőmegtartásra. Az egyedi webáruház fejlesztés **biztonságosabb, rugalmasabb és sokkal jövedelmezőbb**. Nemcsak több vevőt szerzel, hanem **megtartod őket**.

> 🔒 **Biztonsági checklist:** 5 kérdés, amit fel kell tenned a webáruházad biztonságáról
> 
> 1. Milyen titkosítást használ a webshopom?
> 2. Ki fér hozzá az ügyféladataimhoz?
> 3. Van dedikált fraud-megelőző rendszerem?
> 4. Hogyan reagálok egy támadásra?
> 5. Milyen gyakran történik biztonsági audit?

---

# 🚀 Tedd meg a következő lépést

Szeretnéd megtudni, hogyan építhetnénk fel számodra egy **egyedi webáruházat**, ami 30-40%-kal jobban megtartja a vevőidet?

👉 [**Foglalj egy ingyenes konzultációt**](https://nomaddigital.hu/), ahol megmutatjuk, pontosan mit tehetnénk a te vállalkozásodért.

---

## 🏆 Hitelességünk számokban

- ✅ **15+ év** webfejlesztési tapasztalat
- ✅ Több mint **120 sikeres KKV projekt**
- ✅ **30-40%** átlagos vevőmegtartás-javulás egyedi fejlesztéssel
- ✅ **24/7** monitoring és támogatás

---

🎉 **EREDMÉNY: Ez a teljes blogposzt 10 perc alatt készült el az AI generátorral!**

✨ **Mit kaptál:**
- SEO-optimalizált cím és alcímek
- Statisztikákkal alátámasztott állítások
- Érzelmi trigger szavak és emojik
- Világos probléma-megoldás struktúra
- Többféle call-to-action
- Credibility építő elemek
- Publikálásra kész tartalom`
      },
      'buyer-persona': {
        example: `🤖 **VALÓS ADATOKBÓL GENERÁLT BUYER PERSONA - AI ELEMZÉS**

---

# 🎯 Buyer Persona Generátor Eredménye

> 💡 **Ez a buyer persona VALÓS ADATOKBÓL készült** - 3,735 valódi ügyfélvélemény elemzéséből, nem kitalált információkból! Az AI "elolvasta az ügyfelek gondolatait" és 1:1 tökéletes profilokat készített.

⚡ **Adatforrás:** 3,735 valódi ügyfélvélemény  
📊 **Elemzett országok:** US, UK, India, DK, CA, NL és további 10+ ország  
🧠 **AI módszer:** Természetes nyelvfeldolgozás + sentiment analízis  
⏱️ **Készítési idő:** 15 perc (hagyományos módszerrel 2-3 hét lenne)  

---

## 📈 **KULCS FELISMERÉSEK** 

**Nem nyilvánvaló insights a VALÓS adatokból:**

🔍 **Belső törés a közönségben:** Két fő csoport van
- Végfelhasználók (vásárlók) → csalás gyanúja miatt dühösek
- Kereskedők (bolt tulajdonosok) → kifizetési problémák miatt frusztráltak

💔 **Érzelmi töltet:** Az értékelések nem egyszerű csalódást, hanem **dühöt és árulás-érzetet** tükröznek
- Ez mélyebb krízis, mint gondolnád
- A bizalom visszaépítése 3x nehezebb lesz

🌍 **Globális probléma:** A panaszok több országból érkeznek
- Nem régió-specifikus → rendszerszintű probléma
- Márka krízis széleskörű`
      },
      'email-marketing': {
        example: `🤖 **AI EMAIL MARKETING GENERÁTOR EREDMÉNYE**

---

# 📧 Email Marketing Kampány

> 💡 **3 komplett email generálva 5 perc alatt!** Az AI készített egy teljes email sorozatot személyre szabott tartalommal, pszichológiai triggerekkel és optimalizált tárgyakkal a maximális konverzióért.

⚡ **Generálási idő:** 5 perc (hagyományosan 3-4 óra lenne)  
📊 **Email típusok:** Emlékeztető, Edukációs, Sürgősségi  
🎯 **Személyre szabás:** {{first_name}}, {{company_name}} változók  
💰 **Várható eredmény:** 40%+ nyitási arány, 3x jobb konverzió

---`
      },
      'facebook-ads': {
        example: `🤖 **AI FACEBOOK ADS GENERÁTOR EREDMÉNYE**

---

# 📱 Facebook Hirdetés Példák

> 💡 **Ez 4 különböző Facebook hirdetés 2 perc alatt generálva!** Az AI optimalizálta a karakterszámot, pszichológiai triggereket használt, és minden hirdetés más-más célcsoportot céloz meg.

⚡ **Generálási idő:** 2 perc (hagyományosan 2-3 óra lenne)  
🎯 **Optimalizálás:** Karakterszám, CTR, konverzió  
📊 **A/B teszt változatok:** 4 különböző megközelítés  
💰 **Várható eredmény:** 60% alacsonyabb CPC, 2x jobb CTR

---`
      },
      'bulletpoint-generator': {
        example: `🤖 **AI BULLETPOINT GENERÁTOR EREDMÉNYE**

---

# 🎯 Értékesítési Bulletpointok

> 💡 **7 erős pszichológiai bulletpoint 3 perc alatt generálva!** Az AI minden pontba beépítette az érzelmi triggereket, előnyöket és konkrét értékajánlatokat a maximális hatás érdekében.

⚡ **Generálási idő:** 3 perc (hagyományosan 1-2 óra lenne)  
🎯 **Pszichológiai technikák:** Érzelmi triggerek, társadalmi bizonyítás, konkrét előnyök  
📊 **Optimalizálás:** Konverzió, olvashatóság, hatás  
💰 **Várható eredmény:** Erős pszichológiai hatás, magasabb eladási arány

---`
      },
      'social-media': {
        before: 'Régi posztok:\n• Kevés engagement\n• Kreatív blokk\n• Platformonként külön munka',
        after: 'AI posztokkal:\n• 5x több engagement\n• Végtelen kreativitás\n• Minden platformra egyszerre'
      }
    };

    return content[id as keyof typeof content] || { before: 'Példa töltődik...', after: 'Példa töltődik...' };
  };

  return (
    <section className="py-16" style={{ backgroundColor: '#F8F7F5' }}>
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              Gyakorlati példák és sablonok
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Minden példa a kurzusban tanított sablonokkal és technikákkal készült. Kattints bármelyik kártyára, és nézd meg, milyen professzionális eredményeket érhetsz el!
            </p>
          </motion.div>

          {/* Examples Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examples.map((example, index) => (
              <motion.div
                key={example.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => {
                  setActiveExample(example.id);
                  setActiveTab('before'); // Reset to before tab when opening
                }}
                className={`${example.bgColor} rounded-xl border ${example.borderColor} p-6 cursor-pointer hover:shadow-lg transition-all duration-300 group hover:scale-[1.02]`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${example.color} rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <example.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <span className={`text-xs font-medium ${example.textColor} bg-white px-2 py-1 rounded-full`}>
                      {example.category}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-gray-800 transition-colors">
                  {example.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {example.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                  <span>Példa megtekintése</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {activeExample && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveExample(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  {(() => {
                    const example = examples.find(ex => ex.id === activeExample);
                    if (!example) return null;
                    return (
                      <>
                        <div className={`w-10 h-10 bg-gradient-to-br ${example.color} rounded-lg flex items-center justify-center`}>
                          <example.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{example.title}</h3>
                          <p className="text-sm text-gray-600">{example.description}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>
                <button
                  onClick={() => {
                    setActiveExample(null);
                    document.body.style.overflow = 'auto'; // Restore scroll
                  }}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Show example content for blog-generator, buyer-persona, facebook-ads, email-marketing, and bulletpoint-generator, tabs for others */}
                {activeExample === 'blog-generator' ? (
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-inner max-h-96 overflow-y-auto">
                    {/* Blog Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-xl">🤖</span>
                        </div>
                        <div>
                          <div className="text-white/80 text-sm font-medium">AI GENERÁLTA</div>
                          <div className="text-white font-bold text-lg">Blogposzt példa</div>
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                        <div className="text-white/90 text-sm">⚡ Készítési idő: <span className="font-bold text-yellow-300">10 perc</span></div>
                        <div className="text-white/90 text-sm">📊 SEO optimalizált: <span className="font-bold text-green-300">✓ Igen</span></div>
                      </div>
                    </div>
                    
                    {/* Blog Content */}
                    <div className="p-6">
                      <div className="prose prose-sm max-w-none">
                        {/* Article Title */}
                        <div className="mb-6 pb-4 border-b border-gray-200">
                          <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                            🚀 7 kritikus ok, amiért az egyedi webáruház fejlesztés megtartja a vevőidet
                          </h1>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              Élő példa
                            </span>
                            <span>📅 2024</span>
                            <span>⏱️ 8 perc olvasás</span>
                          </div>
                        </div>

                        {/* Introduction Box */}
                        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-400 p-4 mb-6 rounded-r-lg">
                          <div className="flex items-start gap-3">
                            <div className="text-2xl">💡</div>
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-2">Kulcs üzenet</h3>
                              <p className="text-gray-700 text-sm leading-relaxed">
                                A legtöbb KKV e-kereskedő ugyanazzal a problémával szembesül: elkezdik webshopjukat egy népszerű sablonplatformon, majd amikor növekedni szeretnének, hirtelen falakba ütköznek.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Statistics Highlight */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="bg-blue-50 rounded-lg p-3 text-center border border-blue-200">
                            <div className="text-2xl font-bold text-blue-600">30-40%</div>
                            <div className="text-xs text-blue-700">jobb vevőmegtartás</div>
                          </div>
                          <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
                            <div className="text-2xl font-bold text-green-600">15+</div>
                            <div className="text-xs text-green-700">év tapasztalat</div>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-3 text-center border border-purple-200">
                            <div className="text-2xl font-bold text-purple-600">120+</div>
                            <div className="text-xs text-purple-700">sikeres projekt</div>
                          </div>
                        </div>

                        {/* Content Introduction */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                          <p className="text-gray-700 text-sm leading-relaxed">
                            A legtöbb KKV e-kereskedő ugyanazzal a problémával szembesül: elkezdik webshopjukat egy népszerű sablonplatformon (Shopify, WooCommerce, Shoprenter), majd néhány hónap vagy év után csalódnak. Az elején gyorsan, olcsón és egyszerűen indulnak el – de amikor növekedni szeretnének, hirtelen <span className="font-bold text-red-600">falakba ütköznek</span>. Az ügyfelek eltűnnek, a márkájuk beleolvad a tömegbe, és a platform szabályaihoz vannak kötve.
                          </p>
                          <div className="mt-3 p-3 bg-blue-100 rounded-lg border border-blue-200">
                            <p className="text-blue-800 text-sm font-semibold">
                              💎 15+ év tapasztalatunk alapján a legfontosabb különbség a <span className="bg-yellow-200 px-1 rounded">vevőmegtartásban</span> rejlik. Egy egyedi webáruház fejlesztés nemcsak jobb vásárlói élményt ad, hanem bizonyítottan 30-40%-kal jobban megtartja a vevőidet.
                            </p>
                          </div>
                        </div>

                        {/* All 7 Main Sections */}
                        <div className="space-y-6">
                          {/* Section 1 */}
                          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                              <h3 className="font-bold text-gray-900">🛡️ Bizalom és biztonság: a vásárlói hűség alapja</h3>
                            </div>
                            <div className="ml-11 space-y-3">
                              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 mb-3">
                                <p className="text-blue-800 text-sm font-medium">
                                  A vásárlók <span className="font-bold bg-yellow-200 px-1 rounded">82%-a</span> szerint a biztonság a legfontosabb tényező egy webáruház megbízhatóságának megítélésében (forrás: Statista).
                                </p>
                              </div>
                              <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                <div className="font-semibold text-red-800 text-sm mb-2">❌ Probléma sablonnal:</div>
                                <ul className="text-red-700 text-sm space-y-1">
                                  <li>• Tömeges támadások ugyanazokra a sablonokra</li>
                                  <li>• Adatszivárgások, hitelkártya-problémák</li>
                                  <li>• Lassú reagálás platformszinten</li>
                                </ul>
                              </div>
                              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                <div className="font-semibold text-green-800 text-sm mb-2">✅ Megoldás egyedivel:</div>
                                <ul className="text-green-700 text-sm space-y-1">
                                  <li>• Testreszabott biztonsági protokollok</li>
                                  <li>• Egyedi titkosítás és GDPR-megfelelés</li>
                                  <li>• Rugalmas fraud-detekciós megoldások</li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* Section 2 */}
                          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                              <h3 className="font-bold text-gray-900">🎯 Teljes kontroll az ügyfélélmény felett</h3>
                            </div>
                            <div className="ml-11 space-y-3">
                              <p className="text-gray-700 text-sm mb-3">A sablonok kötöttsége miatt minden vásárlói út ugyanúgy néz ki. Ez oda vezet, hogy a konverziók elmaradnak.</p>
                              <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                <div className="font-semibold text-red-800 text-sm mb-2">❌ Probléma sablonnal:</div>
                                <ul className="text-red-700 text-sm space-y-1">
                                  <li>• Egységes, unalmas checkout folyamat</li>
                                  <li>• Nem személyre szabható ajánlórendszer</li>
                                  <li>• Limitált A/B teszt lehetőségek</li>
                                </ul>
                              </div>
                              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                <div className="font-semibold text-green-800 text-sm mb-2">✅ Megoldás egyedivel:</div>
                                <ul className="text-green-700 text-sm space-y-1">
                                  <li>• Egyedi checkout optimalizálás <span className="font-bold bg-yellow-200 px-1 rounded">(akár 20-30% konverziónövekedés)</span></li>
                                  <li>• Dinamikus, személyre szabott ajánlók</li>
                                  <li>• Saját analitikai rendszer beépítése</li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* Section 3 */}
                          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                              <h3 className="font-bold text-gray-900">⭐ Márkadifferenciálás: kitűnsz a tömegből</h3>
                            </div>
                            <div className="ml-11 space-y-3">
                              <p className="text-gray-700 text-sm mb-3">Ha minden webshop ugyanúgy néz ki, a vásárlók nem jegyzik meg a márkádat. A hosszú távú ügyfélhűséghez azonban <span className="font-bold">különleges élményt</span> kell nyújtani.</p>
                              <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                <div className="font-semibold text-red-800 text-sm mb-2">❌ Probléma sablonnal:</div>
                                <ul className="text-red-700 text-sm space-y-1">
                                  <li>• Egyforma sablon design</li>
                                  <li>• Nehéz érzelmi kapcsolatot építeni</li>
                                  <li>• Árukereső árversenyben ragadsz</li>
                                </ul>
                              </div>
                              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                <div className="font-semibold text-green-800 text-sm mb-2">✅ Megoldás egyedivel:</div>
                                <ul className="text-green-700 text-sm space-y-1">
                                  <li>• Saját arculat, egyedi UX/UI tervezés</li>
                                  <li>• Márkád személyiségét tükröző funkciók</li>
                                  <li>• Erősebb brand awareness és hűség</li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* Section 4 */}
                          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                              <h3 className="font-bold text-gray-900">📈 Rugalmasság és skálázhatóság</h3>
                            </div>
                            <div className="ml-11 space-y-3">
                              <p className="text-gray-700 text-sm mb-3">Ahogy nő az üzleted, úgy nőnek az igények is. Egy sablonplatformnál hamar eljutsz oda, hogy fizetős pluginek és kerülőutak nélkül nem tudsz továbblépni.</p>
                              <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                <div className="font-semibold text-red-800 text-sm mb-2">❌ Probléma sablonnal:</div>
                                <ul className="text-red-700 text-sm space-y-1">
                                  <li>• Pluginek tömege → lassú oldal, hibák</li>
                                  <li>• Skálázásnál rejtett költségek</li>
                                  <li>• Funkciók ütközése</li>
                                </ul>
                              </div>
                              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                <div className="font-semibold text-green-800 text-sm mb-2">✅ Megoldás egyedivel:</div>
                                <ul className="text-green-700 text-sm space-y-1">
                                  <li>• Moduláris fejlesztés: csak azt építjük, amire szükséged van</li>
                                  <li>• Teljesítmény-optimalizált backend</li>
                                  <li>• <span className="font-bold bg-yellow-200 px-1 rounded">100% kontroll</span> a bővíthetőség felett</li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* Section 5 */}
                          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm">5</div>
                              <h3 className="font-bold text-gray-900">💰 Pénzügyi átláthatóság és megtérülés</h3>
                            </div>
                            <div className="ml-11 space-y-3">
                              <p className="text-gray-700 text-sm mb-3">Sok vállalkozó panaszkodik visszatartott kifizetésekre vagy rejtett díjakra. Az egyedi fejlesztésnél pontosan tudod, mire költesz, és hol térül meg.</p>
                              <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                <div className="font-semibold text-red-800 text-sm mb-2">❌ Probléma sablonnal:</div>
                                <ul className="text-red-700 text-sm space-y-1">
                                  <li>• Magas tranzakciós díjak</li>
                                  <li>• Visszatartott összegek (chargeback gyanú)</li>
                                  <li>• Havi előfizetések folyamatos költsége</li>
                                </ul>
                              </div>
                              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                <div className="font-semibold text-green-800 text-sm mb-2">✅ Megoldás egyedivel:</div>
                                <ul className="text-green-700 text-sm space-y-1">
                                  <li>• Egyértelmű fejlesztési és üzemeltetési költség</li>
                                  <li>• Teljes kontroll a pénzáramlás felett</li>
                                  <li>• Magasabb ROI: <span className="font-bold bg-yellow-200 px-1 rounded">18-24 hónap alatt megtérülés</span></li>
                                </ul>
                              </div>
                              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 mt-3">
                                <div className="text-blue-800 text-sm">📊 <span className="font-semibold">Összehasonlító táblázat:</span> Platform költségek vs. Egyedi fejlesztés ROI</div>
                              </div>
                            </div>
                          </div>

                          {/* Section 6 */}
                          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">6</div>
                              <h3 className="font-bold text-gray-900">⚡ Gyors, személyre szabott támogatás</h3>
                            </div>
                            <div className="ml-11 space-y-3">
                              <p className="text-gray-700 text-sm mb-3">Egy sablonplatform ügyfélszolgálata sokszor sablonos, lassú és általános. Amikor kritikus probléma van, ez pénzbe kerül.</p>
                              <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                <div className="font-semibold text-red-800 text-sm mb-2">❌ Probléma sablonnal:</div>
                                <ul className="text-red-700 text-sm space-y-1">
                                  <li>• Lassú válaszidő</li>
                                  <li>• Sablonos tanácsok, nem konkrét megoldás</li>
                                  <li>• Időveszteség → bevételkiesés</li>
                                </ul>
                              </div>
                              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                <div className="font-semibold text-green-800 text-sm mb-2">✅ Megoldás egyedivel:</div>
                                <ul className="text-green-700 text-sm space-y-1">
                                  <li>• Dedikált fejlesztői csapat</li>
                                  <li>• Azonnali reakció és megoldás</li>
                                  <li>• Folyamatos karbantartás és fejlesztés</li>
                                </ul>
                              </div>
                              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-3 border border-cyan-200 mt-3">
                                <div className="text-cyan-800 text-sm">
                                  📈 <span className="font-semibold">Esettanulmány:</span> Egy KKV webshop forgalma <span className="font-bold bg-yellow-200 px-1 rounded">28%-kal nőtt</span>, miután egyedi fejlesztésre váltott, mert az ügyfélszolgálat helyett valós problémamegoldásra kapott támogatást.
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Section 7 */}
                          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">7</div>
                              <h3 className="font-bold text-gray-900">🔓 Függetlenség a platformoktól (nincs vendor lock-in)</h3>
                            </div>
                            <div className="ml-11 space-y-3">
                              <p className="text-gray-700 text-sm mb-3">A legnagyobb félelem: „Mi történik, ha a platform felemeli az árakat, változtat a szabályokon, vagy egyszerűen megszűnik?" Egy egyedi webáruház fejlesztésnél a rendszer <span className="font-bold">a tiéd</span>.</p>
                              <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                <div className="font-semibold text-red-800 text-sm mb-2">❌ Probléma sablonnal:</div>
                                <ul className="text-red-700 text-sm space-y-1">
                                  <li>• Függőség egyetlen szolgáltatótól</li>
                                  <li>• Adatvesztés veszélye migrációkor</li>
                                  <li>• Nincs teljes kontroll</li>
                                </ul>
                              </div>
                              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                <div className="font-semibold text-green-800 text-sm mb-2">✅ Megoldás egyedivel:</div>
                                <ul className="text-green-700 text-sm space-y-1">
                                  <li>• A webáruház teljes egészében a tiéd</li>
                                  <li>• Teljes kontroll az adatok és folyamatok felett</li>
                                  <li>• <span className="font-bold bg-yellow-200 px-1 rounded">Hosszú távú stabilitás</span></li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* Summary Section */}
                          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 text-white">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                              🎯 Összegzés: Miért jobb az egyedi webáruház fejlesztés?
                            </h3>
                            <p className="text-gray-200 mb-4">
                              Egy sablonplatform jó belépőszint, de nem nyújt stabil alapot a hosszú távú vevőmegtartásra. Az egyedi webáruház fejlesztés <span className="font-bold text-yellow-300">biztonságosabb, rugalmasabb és sokkal jövedelmezőbb</span>. Nemcsak több vevőt szerzel, hanem megtartod őket.
                            </p>
                            
                            {/* Security Checklist */}
                            <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                              <h4 className="font-bold text-white mb-3">🔒 Biztonsági checklist: 5 kérdés, amit fel kell tenned a webáruházad biztonságáról</h4>
                              <ol className="text-gray-200 text-sm space-y-1">
                                <li>1. Milyen titkosítást használ a webshopom?</li>
                                <li>2. Ki fér hozzá az ügyféladataimhoz?</li>
                                <li>3. Van dedikált fraud-megelőző rendszerem?</li>
                                <li>4. Hogyan reagálok egy támadásra?</li>
                                <li>5. Milyen gyakran történik biztonsági audit?</li>
                              </ol>
                            </div>
                          </div>

                          {/* Call to Action Box */}
                          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-6 text-white">
                            <div className="text-center">
                              <h3 className="text-xl font-bold mb-2">🚀 Tedd meg a következő lépést</h3>
                              <p className="text-teal-100 mb-4">Szeretnéd megtudni, hogyan építhetnénk fel számodra egy egyedi webáruházat?</p>
                              <div className="inline-block bg-white text-teal-600 px-6 py-3 rounded-lg font-bold hover:bg-teal-50 transition-colors cursor-pointer">
                                👉 Ingyenes konzultáció
                              </div>
                            </div>
                          </div>

                          {/* Credibility Footer */}
                          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <h4 className="font-bold text-gray-900 mb-3">🏆 Hitelességünk számokban</h4>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center gap-2">
                                <span className="text-green-600">✅</span>
                                <span><strong>15+ év</strong> tapasztalat</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-green-600">✅</span>
                                <span><strong>120+</strong> sikeres projekt</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-green-600">✅</span>
                                <span><strong>30-40%</strong> jobb vevőmegtartás</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-green-600">✅</span>
                                <span><strong>24/7</strong> támogatás</span>
                              </div>
                            </div>
                          </div>

                          {/* Generation Result */}
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
                            <div className="text-center">
                              <div className="text-2xl mb-2">🎉</div>
                              <h3 className="text-xl font-bold mb-2">EREDMÉNY: Ez a teljes blogposzt 10 perc alatt készült el!</h3>
                              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                                <div className="bg-white/10 rounded-lg p-3">
                                  <div className="font-semibold">✨ Mit kaptál:</div>
                                  <ul className="mt-2 space-y-1 text-purple-100">
                                    <li>• SEO-optimalizált tartalom</li>
                                    <li>• Statisztikákkal alátámasztott</li>
                                  </ul>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3">
                                  <div className="font-semibold">🚀 Plusz előnyök:</div>
                                  <ul className="mt-2 space-y-1 text-purple-100">
                                    <li>• Call-to-action elemek</li>
                                    <li>• Publikálásra kész</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : activeExample === 'buyer-persona' ? (
                  <div className="max-h-96 overflow-y-auto">
                    {/* Buyer Persona Header */}
                    <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-6 rounded-xl mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-xl">🧠</span>
                        </div>
                        <div>
                          <div className="text-white/80 text-sm font-medium">AI GENERÁLT VALÓS ADATOKBÓL</div>
                          <div className="text-white font-bold text-lg">Buyer Persona Elemzés</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                          <div className="text-white/90 text-sm">📊 Elemzett vélemények: <span className="font-bold text-yellow-300">3,735 db</span></div>
                          <div className="text-white/90 text-sm">🌍 Országok: <span className="font-bold text-green-300">15+</span></div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                          <div className="text-white/90 text-sm">⏱️ Készítési idő: <span className="font-bold text-yellow-300">15 perc</span></div>
                          <div className="text-white/90 text-sm">🎯 Pontosság: <span className="font-bold text-green-300">98%</span></div>
                        </div>
                      </div>
                    </div>

                    {/* Tab Navigation for Buyer Persona */}
                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
                      <button
                        onClick={() => setActiveTab('before')}
                        className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                          activeTab === 'before'
                            ? 'bg-white text-emerald-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        🎯 Célközönség profil
                      </button>
                      <button
                        onClick={() => setActiveTab('after')}
                        className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                          activeTab === 'after'
                            ? 'bg-white text-emerald-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        👤 Vevői profilok
                      </button>
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                      {activeTab === 'before' ? (
                        <motion.div
                          key="target-audience"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                          className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200 p-6"
                        >
                          <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                            🎯 Célközönség profil (következtetések a véleményekből)
                          </h3>
                          
                          <div className="space-y-4 text-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-white/70 rounded-lg p-4 border border-emerald-200">
                                <div className="font-semibold text-emerald-800 mb-2">👥 Demográfiai adatok</div>
                                <ul className="space-y-1 text-emerald-700">
                                  <li><strong>Életkor:</strong> 25–55 év</li>
                                  <li><strong>Nem:</strong> 55% férfi, 45% nő</li>
                                  <li><strong>Jövedelem:</strong> $30k–100k</li>
                                  <li><strong>Környezet:</strong> Városi/digitális</li>
                                </ul>
                              </div>
                              
                              <div className="bg-white/70 rounded-lg p-4 border border-emerald-200">
                                <div className="font-semibold text-emerald-800 mb-2">💼 Foglalkozási profil</div>
                                <ul className="space-y-1 text-emerald-700">
                                  <li><strong>Vásárlók:</strong> Középosztály</li>
                                  <li><strong>Kereskedők:</strong> KKV, dropship</li>
                                  <li><strong>Hobbi:</strong> Online vásárlás</li>
                                  <li><strong>Érdeklődés:</strong> Tech, e-commerce</li>
                                </ul>
                              </div>
                            </div>

                            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                              <div className="font-semibold text-red-800 mb-2">😰 Belső és külső félelmek</div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <div className="font-medium text-red-700 mb-1">Belső félelmek:</div>
                                  <ul className="text-red-600 text-xs space-y-1">
                                    <li>• Pénz elvesztése</li>
                                    <li>• Átverés áldozatává válás</li>
                                    <li>• Idő és energia kárba vesztése</li>
                                  </ul>
                                </div>
                                <div>
                                  <div className="font-medium text-red-700 mb-1">Külső félelmek:</div>
                                  <ul className="text-red-600 text-xs space-y-1">
                                    <li>• Reputáció elvesztése</li>
                                    <li>• Ügyfelek bizalmának elvesztése</li>
                                    <li>• Jogi problémák</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                              <div className="font-semibold text-orange-800 mb-2">⚡ TOP 5 Fájdalompont</div>
                              <ol className="text-orange-700 space-y-1">
                                <li>1. Csalások elleni védelem hiánya</li>
                                <li>2. Lassú és inkompetens ügyfélszolgálat</li>
                                <li>3. Visszatartott pénzek, kifizetési problémák</li>
                                <li>4. Kommunikációs nehézségek</li>
                                <li>5. Átláthatatlanság a panaszkezelésben</li>
                              </ol>
                            </div>

                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                              <div className="font-semibold text-blue-800 mb-2">🎯 Vásárlói fázis elemzés</div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <div className="font-medium text-blue-700 mb-1">Végfelhasználók:</div>
                                  <div className="text-blue-600 text-xs">Főként <strong>hideg közönség</strong> → első vásárlás után csalódás → elveszett bizalom</div>
                                </div>
                                <div>
                                  <div className="font-medium text-blue-700 mb-1">Kereskedők:</div>
                                  <div className="text-blue-600 text-xs"><strong>Meleg–forró közönség</strong> → aktív használat után tömegesen lemorzsolódnak</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="personas"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          {/* Persona 1 - Online Vásárló */}
                          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-200 p-6">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                A
                              </div>
                              <div>
                                <h4 className="text-xl font-bold text-gray-900">Anna Kovács</h4>
                                <div className="text-pink-600 font-semibold">Online Vásárló • 32 év • Marketing asszisztens</div>
                                <div className="text-sm text-gray-600">💰 ~$40,000 • 🏙️ Városi környezet • 👩 Nő</div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div className="space-y-3">
                                <div className="bg-white/70 rounded-lg p-3 border border-pink-200">
                                  <div className="font-semibold text-pink-800 mb-1">🎯 Vágyak</div>
                                  <ul className="text-pink-700 space-y-1">
                                    <li>• Gyors és biztonságos online vásárlás</li>
                                    <li>• Jó ár/érték arány</li>
                                    <li>• Inspiráló termékek felfedezése</li>
                                  </ul>
                                </div>
                                
                                <div className="bg-white/70 rounded-lg p-3 border border-pink-200">
                                  <div className="font-semibold text-pink-800 mb-1">🎨 Hobbik & Érdeklődés</div>
                                  <div className="text-pink-700 text-xs">Online vásárlás, divat, otthoni dekoráció, közösségi média, trendek követése, Instagram/TikTok inspiráció</div>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                  <div className="font-semibold text-red-800 mb-1">😰 Félelmek</div>
                                  <div className="text-red-700 text-xs space-y-1">
                                    <div><strong>Belső:</strong> Átverés áldozata, rossz minőség, pénz visszafizetése</div>
                                    <div><strong>Külső:</strong> Időpazarlás ügyfélszolgálattal, "naiv vásárló" image</div>
                                  </div>
                                </div>
                                
                                <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                                  <div className="font-semibold text-orange-800 mb-1">⚡ Fájdalompontok</div>
                                  <ul className="text-orange-700 text-xs space-y-1">
                                    <li>1. Csaló boltok jelenléte</li>
                                    <li>2. Visszatérítési nehézségek</li>
                                    <li>3. Rossz minőségű termékek</li>
                                    <li>4. Lassú, sablonos ügyfélszolgálat</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 bg-gray-100 rounded-lg p-3 border border-gray-200">
                              <div className="text-xs text-gray-600">
                                <strong>Vásárlói fázis:</strong> <span className="text-blue-600 font-semibold">Hideg közönség</span> → első vásárlás után gyakran csalódott → bizalmatlan
                              </div>
                            </div>
                          </div>

                          {/* Persona 2 - E-kereskedő */}
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                D
                              </div>
                              <div>
                                <h4 className="text-xl font-bold text-gray-900">David Johnson</h4>
                                <div className="text-blue-600 font-semibold">E-kereskedő • 38 év • Kisvállalkozó</div>
                                <div className="text-sm text-gray-600">💰 ~$75,000 • 🏙️ USA, nagyváros • 👨 Férfi • 👨‍👩‍👧‍👦 Családos</div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div className="space-y-3">
                                <div className="bg-white/70 rounded-lg p-3 border border-blue-200">
                                  <div className="font-semibold text-blue-800 mb-1">🎯 Vágyak</div>
                                  <ul className="text-blue-700 space-y-1">
                                    <li>• Stabil és megbízható platform</li>
                                    <li>• Időben érkező kifizetések</li>
                                    <li>• Valódi ügyfélszolgálati támogatás</li>
                                  </ul>
                                </div>
                                
                                <div className="bg-white/70 rounded-lg p-3 border border-blue-200">
                                  <div className="font-semibold text-blue-800 mb-1">🎨 Hobbik & Érdeklődés</div>
                                  <div className="text-blue-700 text-xs">Tech, vállalkozói podcastok, üzleti könyvek, e-commerce, automatizáció, online marketing, startup világ</div>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                                  <div className="font-semibold text-red-800 mb-1">😰 Félelmek</div>
                                  <div className="text-red-700 text-xs space-y-1">
                                    <div><strong>Belső:</strong> Bevétel elvesztése, cash flow problémák, vállalkozás fenntarthatatlanság</div>
                                    <div><strong>Külső:</strong> Platform hibák → ügyfélvesztés, kifizetési problémák, migráció kényszere</div>
                                  </div>
                                </div>
                                
                                <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                                  <div className="font-semibold text-orange-800 mb-1">⚡ Fájdalompontok</div>
                                  <ul className="text-orange-700 text-xs space-y-1">
                                    <li>1. Visszatartott/késleltetett kifizetések</li>
                                    <li>2. Lassú ügyfélszolgálat → hónapok</li>
                                    <li>3. Technikai hibák → nincs megoldás</li>
                                    <li>4. Bizalomvesztés a platform iránt</li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 bg-gray-100 rounded-lg p-3 border border-gray-200">
                              <div className="text-xs text-gray-600">
                                <strong>Vásárlói fázis:</strong> <span className="text-orange-600 font-semibold">Meleg–forró közönség</span> → hosszú ideje használja, de tömegesen elpártol, mert csalódott
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : activeExample === 'facebook-ads' ? (
                  <div className="max-h-96 overflow-y-auto">
                    {/* Facebook Ads Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-xl mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-xl">📱</span>
                        </div>
                        <div>
                          <div className="text-white/80 text-sm font-medium">AI FACEBOOK ADS GENERÁTOR</div>
                          <div className="text-white font-bold text-lg">4 Optimalizált Hirdetés</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                          <div className="text-white/90 text-sm">⏱️ Generálási idő: <span className="font-bold text-yellow-300">2 perc</span></div>
                          <div className="text-white/90 text-sm">🎯 A/B teszt változatok: <span className="font-bold text-green-300">4 db</span></div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                          <div className="text-white/90 text-sm">💰 CPC csökkentés: <span className="font-bold text-yellow-300">60%</span></div>
                          <div className="text-white/90 text-sm">📊 CTR növekedés: <span className="font-bold text-green-300">2x</span></div>
                        </div>
                      </div>
                    </div>

                    {/* Facebook Ads Content */}
                    <div className="space-y-6">
                      {/* Ad 1 */}
                      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            f
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">Elira.hu</div>
                            <div className="text-xs text-gray-500">Szponzorált hirdetés • 2 perc</div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">Spórolj időt & pénzt! 🚀</h4>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            Tudod, mennyi pénzt veszítesz manuális folyamatokkal? Tudd meg ingyen az Auditban! ⏳
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                          <div className="text-xs text-gray-500 mb-1">Weboldal előnézet</div>
                          <div className="font-semibold text-blue-600 text-sm">elira.hu</div>
                          <div className="text-gray-600 text-xs">Ingyenes Digital Audit - Fedezd fel a rejtett profitot</div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <button className="flex items-center gap-1 hover:text-blue-600">👍 Tetszik</button>
                          <button className="flex items-center gap-1 hover:text-blue-600">💬 Hozzászólás</button>
                          <button className="flex items-center gap-1 hover:text-blue-600">↗️ Megosztás</button>
                        </div>
                      </div>

                      {/* Ad 2 */}
                      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            f
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">Elira.hu</div>
                            <div className="text-xs text-gray-500">Szponzorált hirdetés • 5 perc</div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">Audit: 20 cégnek ingyen ⚡</h4>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            Csak 20 hely maradt! Kérd az ingyenes Digital Auditot és fedezd fel a rejtett profitot.
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200 mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">LIMITÁLT</span>
                            <span className="text-red-600 font-semibold text-sm">Csak 20 hely maradt!</span>
                          </div>
                          <div className="font-semibold text-blue-600 text-sm">elira.hu</div>
                          <div className="text-gray-600 text-xs">Ingyenes Audit - November végéig</div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <button className="flex items-center gap-1 hover:text-blue-600">👍 Tetszik</button>
                          <button className="flex items-center gap-1 hover:text-blue-600">💬 Hozzászólás</button>
                          <button className="flex items-center gap-1 hover:text-blue-600">↗️ Megosztás</button>
                        </div>
                      </div>

                      {/* Ad 3 */}
                      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            f
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">Elira.hu</div>
                            <div className="text-xs text-gray-500">Szponzorált hirdetés • 12 perc</div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">Növeld a profitod most 📈</h4>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            Automatizálj → Csökkentsd a költségeid → Növeld a profitod. Audit november végéig ingyen!
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200 mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">INGYENES</span>
                            <span className="text-green-600 font-semibold text-sm">Audit november végéig!</span>
                          </div>
                          <div className="font-semibold text-blue-600 text-sm">elira.hu</div>
                          <div className="text-gray-600 text-xs">Automatizáció → Költségcsökkentés → Profitmaximalizálás</div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <button className="flex items-center gap-1 hover:text-blue-600">👍 Tetszik</button>
                          <button className="flex items-center gap-1 hover:text-blue-600">💬 Hozzászólás</button>
                          <button className="flex items-center gap-1 hover:text-blue-600">↗️ Megosztás</button>
                        </div>
                      </div>

                      {/* Ad 4 */}
                      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                            f
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">Elira.hu</div>
                            <div className="text-xs text-gray-500">Szponzorált hirdetés • 8 perc</div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">Automatizálj okosan 🚀</h4>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            15+ év tapasztalat. Mutatjuk, hogyan spórolsz időt és pénzt egyedi megoldásokkal. Jelentkezz most!
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200 mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">EXPERT</span>
                            <span className="text-purple-600 font-semibold text-sm">15+ év tapasztalat</span>
                          </div>
                          <div className="font-semibold text-blue-600 text-sm">elira.hu</div>
                          <div className="text-gray-600 text-xs">Egyedi megoldások → Időmegtakarítás → Költségcsökkentés</div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <button className="flex items-center gap-1 hover:text-blue-600">👍 Tetszik</button>
                          <button className="flex items-center gap-1 hover:text-blue-600">💬 Hozzászólás</button>
                          <button className="flex items-center gap-1 hover:text-blue-600">↗️ Megosztás</button>
                        </div>
                      </div>

                      {/* Generation Result */}
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                        <div className="text-center">
                          <div className="text-2xl mb-2">🎉</div>
                          <h3 className="text-xl font-bold mb-2">EREDMÉNY: 4 különböző Facebook hirdetés 2 perc alatt!</h3>
                          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                            <div className="bg-white/10 rounded-lg p-3">
                              <div className="font-semibold">✨ Mit kaptál:</div>
                              <ul className="mt-2 space-y-1 text-blue-100">
                                <li>• Karakterszám optimalizálás</li>
                                <li>• 4 különböző megközelítés</li>
                                <li>• Pszichológiai triggerek</li>
                              </ul>
                            </div>
                            <div className="bg-white/10 rounded-lg p-3">
                              <div className="font-semibold">🚀 Várható eredmény:</div>
                              <ul className="mt-2 space-y-1 text-blue-100">
                                <li>• 60% alacsonyabb CPC</li>
                                <li>• 2x jobb kattintási arány</li>
                                <li>• Azonnali A/B teszt kész</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : activeExample === 'email-marketing' ? (
                  <div className="max-h-96 overflow-y-auto">
                    {/* Email Marketing Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-xl">📧</span>
                        </div>
                        <div>
                          <div className="text-white/80 text-sm font-medium">AI EMAIL MARKETING GENERÁTOR</div>
                          <div className="text-white font-bold text-lg">3 Email Variáns + 5 Optimalizált Tárgy</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                          <div className="text-white/90 text-sm">⏱️ Generálási idő: <span className="font-bold text-yellow-300">3 perc</span></div>
                          <div className="text-white/90 text-sm">📧 Email típusok: <span className="font-bold text-green-300">3 variáns</span></div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                          <div className="text-white/90 text-sm">📊 Tárgysorok: <span className="font-bold text-yellow-300">5+5 A/B</span></div>
                          <div className="text-white/90 text-sm">💰 Konverzió: <span className="font-bold text-green-300">Optimalizált</span></div>
                        </div>
                      </div>
                    </div>

                    {/* Subject Lines Section */}
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <span className="text-2xl">📝</span>
                        5 Optimalizált Tárgysor (A/B tesztekkel)
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="font-semibold text-gray-900">{'{{first_name}}'}, nézted már meg a webshopod egészségét? 🛍️</div>
                          <div className="text-sm text-gray-500 mt-1">A/B: {'{{first_name}}'}, mikor volt utoljára auditolva a weboldalad?</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="font-semibold text-gray-900">{'{{first_name}}'}, itt az ideje egy gyors webauditnak 📊</div>
                          <div className="text-sm text-gray-500 mt-1">A/B: Gyorsan kiderül, miért veszíted a vevőid, {'{{first_name}}'}</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="font-semibold text-gray-900">Ingyenes weboldal audit – csak vasárnapig elérhető ⏳</div>
                          <div className="text-sm text-gray-500 mt-1">A/B: Foglalj most: ingyenes webshop audit vasárnapig</div>
                        </div>
                      </div>
                    </div>

                    {/* Email Content */}
                    <div className="space-y-6">
                      {/* Email 1 - Emlékeztető + gondoskodás */}
                      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        {/* Email Header */}
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">E</div>
                              <div>
                                <div className="font-semibold text-gray-900">Elira.hu</div>
                                <div className="text-xs text-gray-500">noreply@elira.hu</div>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">Variáns #1 - Emlékeztető</div>
                          </div>
                          <div className="text-sm">
                            <div className="font-semibold text-gray-900">{'{{first_name}}'}, nézted már meg a webshopod egészségét? 🛒</div>
                            <div className="text-gray-600 text-xs mt-1">Mikor néztél legutóbb a webshopodra úgy, mint egy vevő?</div>
                          </div>
                        </div>
                        
                        {/* Email Body */}
                        <div className="p-6 bg-white">
                          <div className="text-gray-800 space-y-4 text-sm">
                            <p>Szia <span className="bg-blue-100 px-1 rounded">{'{{first_name}}'}</span>,</p>
                            
                            <p>Gondolkodtál már azon, mit lát egy új vásárló, amikor először landol az oldaladon?<br/>
                            Sokszor apróságokon múlik, hogy ott marad-e vagy továbbkattint.</p>
                            
                            <p>Ezért ajánlunk most egy <strong>ingyenes weboldal auditot</strong>. Megmutatjuk, hol csúszik ki a kezed közül a bevétel, és hogyan lehet <strong>több visszatérő vevőt</strong> szerezni.</p>
                            
                            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                              <ul className="space-y-1 text-green-700">
                                <li>• Gyors, fájdalommentes folyamat</li>
                                <li>• Azonnal használható tippek a saját webshopodra</li>
                              </ul>
                            </div>
                            
                            <div className="text-center py-4">
                              <a href="#" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                                👉 Időpontfoglalás most
                              </a>
                            </div>
                            
                            <div className="border-t border-gray-200 pt-4 text-gray-600">
                              <p>P.S.: Ha vasárnap éjfélig lefoglalod, elsőként kapsz időpontot a jövő heti auditokra.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Email 2 - Education + Value */}
                      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        {/* Email Header */}
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">E</div>
                              <div>
                                <div className="font-semibold text-gray-900">Elira.hu</div>
                                <div className="text-xs text-gray-500">noreply@elira.hu</div>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">Variáns #2 - Edukáció</div>
                          </div>
                          <div className="text-sm">
                            <div className="font-semibold text-gray-900">{'{{first_name}}'}, itt az ideje egy gyors webauditnak 📊</div>
                            <div className="text-gray-600 text-xs mt-1">3 dolog, amit egy audit után azonnal javíthatsz.</div>
                          </div>
                        </div>
                        
                        {/* Email Body */}
                        <div className="p-6 bg-white">
                          <div className="text-gray-800 space-y-4 text-sm">
                            <p>Szia <span className="bg-blue-100 px-1 rounded">{'{{first_name}}'}</span>,</p>
                            
                            <p>Képzeld el, ha a webshopod úgy működne, mint egy jól olajozott gép. Tudtad, hogy a legtöbb oldal 3 tipikus hibán csúszik el?</p>
                            
                            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                              <ul className="space-y-1 text-red-700">
                                <li>• Nem egyértelmű vásárlói útvonal → a vevő elakad.</li>
                                <li>• Lassú oldalbetoltés → a vevő türelmetlennül kilép.</li>
                                <li>• Hiányzó bizalomépítés → a vevő nem meri megadni a kártyáját.</li>
                              </ul>
                            </div>
                            
                            <p>Az <strong>ingyenes Elira weboldal audit</strong> pontosan ezeket a pontokat veszi végig. Nem csak technikai szemmel nézzük, hanem a vásárló szemével is.</p>
                            
                            <div className="text-center py-4">
                              <a href="#" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                                👉 Időpontfoglalás most
                              </a>
                            </div>
                            
                            <div className="border-t border-gray-200 pt-4 text-gray-600">
                              <p>P.S.: Egy sablonplatform jó belépő, de a hosszú távú stabilitás a személyre szabott megoldásokban van. Mi ebben segítünk.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Email 3 - Offer + Urgency */}
                      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                        {/* Email Header */}
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">E</div>
                              <div>
                                <div className="font-semibold text-gray-900">Elira.hu</div>
                                <div className="text-xs text-gray-500">noreply@elira.hu</div>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">Variáns #3 - Sürgősség</div>
                          </div>
                          <div className="text-sm">
                            <div className="font-semibold text-gray-900">Ingyenes weboldal audit – csak vasárnapig elérhető ⏳</div>
                            <div className="text-gray-600 text-xs mt-1">Ingyenes audit vasárnap éjfélig – foglald le most!</div>
                          </div>
                        </div>
                        
                        {/* Email Body */}
                        <div className="p-6 bg-white">
                          <div className="text-gray-800 space-y-4 text-sm">
                            <p>Szia <span className="bg-blue-100 px-1 rounded">{'{{first_name}}'}</span>,</p>
                            
                            <p>Régóta tervezed, hogy átnézeted a webshopod, de mindig közbejön valami? Most itt a tökéletes alkalom.</p>
                            
                            <p>Az Elira csapata most <strong>ingyenes weboldal auditot</strong> kínál. Egy rövid konzultáció után pontosan látni fogod, hogyan tudsz:</p>
                            
                            <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400 rounded-r-lg p-4">
                              <ul className="space-y-1 text-orange-700">
                                <li>• több vevőt szerezni,</li>
                                <li>• és megtartani azokat, akik már nálad vásároltak.</li>
                              </ul>
                            </div>
                            
                            <p>De siess: a lehetőség csak <strong>vasárnap éjfélig él</strong>, és a helyek gyorsan betelnek.</p>
                            
                            <div className="text-center py-4">
                              <a href="#" className="inline-block bg-red-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-red-700 transition-colors text-base">
                                👉 Időpontfoglalás most
                              </a>
                            </div>
                            
                            <div className="border-t border-gray-200 pt-4 text-gray-600">
                              <p>P.S.: Ha most foglalsz, elsőként kerülhetsz sorra a következő heti időpontok közül.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Generation Result */}
                      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
                        <div className="text-center">
                          <div className="text-2xl mb-2">🎉</div>
                          <h3 className="text-xl font-bold mb-2">EREDMÉNY: 3 email variáns + 5 tárgysor 3 perc alatt!</h3>
                          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                            <div className="bg-white/10 rounded-lg p-3">
                              <div className="font-semibold">✨ Mit kaptál:</div>
                              <ul className="mt-2 space-y-1 text-purple-100">
                                <li>• 5+5 A/B tesztes tárgysor</li>
                                <li>• 3 különböző email megközelítés</li>
                                <li>• Preheader optimalizálás</li>
                                <li>• Személyre szabott változók</li>
                              </ul>
                            </div>
                            <div className="bg-white/10 rounded-lg p-3">
                              <div className="font-semibold">🚀 Várható eredmény:</div>
                              <ul className="mt-2 space-y-1 text-purple-100">
                                <li>• Magasabb nyitási arány</li>
                                <li>• Jobb kattintási arány</li>
                                <li>• Teljes kampány strukturálás</li>
                                <li>• Spam-mentes szövegek</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : activeExample === 'bulletpoint-generator' ? (
                  <div className="max-h-96 overflow-y-auto">
                    {/* Bulletpoint Generator Header */}
                    <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-xl mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-xl">🎯</span>
                        </div>
                        <div>
                          <div className="text-white/80 text-sm font-medium">AI BULLETPOINT GENERÁTOR</div>
                          <div className="text-white font-bold text-lg">Értékesítési Bulletpointok</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                          <div className="text-white/90 text-sm">⏱️ Generálási idő: <span className="font-bold text-yellow-300">3 perc</span></div>
                          <div className="text-white/90 text-sm">🎯 Bulletpointok: <span className="font-bold text-green-300">7 db</span></div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                          <div className="text-white/90 text-sm">🧠 Pszichológiai hatás: <span className="font-bold text-yellow-300">Magas</span></div>
                          <div className="text-white/90 text-sm">💰 Eladási arány: <span className="font-bold text-green-300">Fokozott</span></div>
                        </div>
                      </div>
                    </div>

                    {/* Product Layout */}
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-6">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">iPhone 17</h3>
                        <p className="text-gray-600">Prémium technológia minden napra</p>
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-black rounded-2xl mx-auto mt-4 flex items-center justify-center shadow-lg">
                          <span className="text-white text-2xl">📱</span>
                        </div>
                      </div>

                      {/* Bulletpoints */}
                      <div className="space-y-4 mb-8">
                        {/* Bulletpoint 1 */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-lg">🌞</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-2">LÁTHATÓBB A VILÁG</h4>
                              <p className="text-gray-700 text-sm leading-relaxed">A <span className="font-semibold bg-yellow-100 px-1 rounded">3000 nites fényerő</span> nem azt jelenti, hogy számháború a pixelekkel, hanem azt, hogy nyáron a teraszon ülve is simán elolvasod az üzenetet, anélkül hogy árnyékolnod kéne a kijelzőt a tenyereddel.</p>
                            </div>
                          </div>
                        </div>

                        {/* Bulletpoint 2 */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-lg">🕹️</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-2">SZUPER SIMA ÉLMÉNY</h4>
                              <p className="text-gray-700 text-sm leading-relaxed">A <span className="font-semibold bg-blue-100 px-1 rounded">120 Hz ProMotion</span> nem "tech varázsszó". Egyszerűen azt jelenti: amikor görgetsz, lapozol vagy játszol, nincs akadás. Minden mozdulat olyan, mintha a telefon előre tudná, mit akarsz.</p>
                            </div>
                          </div>
                        </div>

                        {/* Bulletpoint 3 */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-lg">📸</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-2">FOTÓK, AMIK NEM MOSÓDNAK SZÉT</h4>
                              <p className="text-gray-700 text-sm leading-relaxed">A <span className="font-semibold bg-green-100 px-1 rounded">48 MP ultraszéles lencse</span> nem csak szép szám, hanem azt jelenti: amikor barátokkal kattintasz egy buliban, mindenki látszik – és nem úgy, mintha egy krumplival fotóztál volna.</p>
                            </div>
                          </div>
                        </div>

                        {/* Bulletpoint 4 */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-lg">🤳</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-2">ÖNARCKÉP, AMIT MINDENKI MEGIRIGYEL</h4>
                              <p className="text-gray-700 text-sm leading-relaxed">Az új <span className="font-semibold bg-pink-100 px-1 rounded">18 MP-es szelfikamera</span> nem azért jó, mert több megapixel van benne, hanem mert a képeken végre úgy nézel ki, mint élőben – nem egy elmosódott emlékként.</p>
                            </div>
                          </div>
                        </div>

                        {/* Bulletpoint 5 */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-lg">💾</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-2">NEM KELL FÁJLDEDIKÁTOR</h4>
                              <p className="text-gray-700 text-sm leading-relaxed">A <span className="font-semibold bg-indigo-100 px-1 rounded">256 GB tárhely alapból</span> annyit tesz: nem kell többé azon agyalnod, melyik régi videót töröld le. Nyugodtan tárolhatod a munkát, a Netflix offline sorozataidat és a fél életed.</p>
                            </div>
                          </div>
                        </div>

                        {/* Bulletpoint 6 */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-lg">🔋</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-2">ENERGIÁDHOZ IGAZODIK</h4>
                              <p className="text-gray-700 text-sm leading-relaxed">Az <span className="font-semibold bg-green-100 px-1 rounded">egész napos aksi</span> nem pusztán hosszabb üzemidő. Inkább olyan, mintha lenne egy titkos energiatartalék, ami mindig ott van, amikor azt hiszed, már rég lemerültél volna.</p>
                            </div>
                          </div>
                        </div>

                        {/* Bulletpoint 7 - Final CTA */}
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-300 rounded-lg p-4 hover:shadow-lg transition-all">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-lg">🛡️</span>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 mb-2">TELEFON, AMI NEM DRÁMÁZIK</h4>
                              <p className="text-gray-800 text-sm leading-relaxed mb-3">A <span className="font-semibold bg-gray-200 px-1 rounded">Ceramic Shield 2</span> nem csak "strapabíró üveg". Ez az a pajzs, ami miatt ha véletlen lecsúszik a kanapéról, nem te leszel a tragédia főszereplője.</p>
                              <div className="text-center">
                                <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 hover:scale-105">
                                  TEDD A KOSÁRBA MOST
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Generation Result */}
                      <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl p-6 text-white">
                        <div className="text-center">
                          <div className="text-2xl mb-2">🎉</div>
                          <h3 className="text-xl font-bold mb-2">EREDMÉNY: 7 erős bulletpoint 3 perc alatt!</h3>
                          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                            <div className="bg-white/10 rounded-lg p-3">
                              <div className="font-semibold">✨ Mit kaptál:</div>
                              <ul className="mt-2 space-y-1 text-amber-100">
                                <li>• Érzelmi triggerek minden pontban</li>
                                <li>• Konkrét értékajánlatok</li>
                                <li>• Pszichológiai hatás optimalizálva</li>
                                <li>• Konverziós CTA integrálva</li>
                              </ul>
                            </div>
                            <div className="bg-white/10 rounded-lg p-3">
                              <div className="font-semibold">🚀 Eredmény:</div>
                              <ul className="mt-2 space-y-1 text-amber-100">
                                <li>• Magasabb eladási arány</li>
                                <li>• Erős vásárlói motiváció</li>
                                <li>• Professzionális megjelenés</li>
                                <li>• Azonnali használatra kész</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : activeExample === 'social-media' ? (
                  <div className="max-h-96 overflow-y-auto">
                    {/* Social Media Header */}
                    <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6 rounded-xl mb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-xl">📱</span>
                        </div>
                        <div>
                          <div className="text-white/80 text-sm font-medium">AI KÖZÖSSÉGI MÉDIA GENERÁTOR</div>
                          <div className="text-white font-bold text-lg">Engaging Social Media Post</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                          <div className="text-white/90 text-sm">⏱️ Generálási idő: <span className="font-bold text-yellow-300">2 perc</span></div>
                          <div className="text-white/90 text-sm">📝 Elemek: <span className="font-bold text-green-300">Hook + Törzs + CTA</span></div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                          <div className="text-white/90 text-sm">🎯 Engagement: <span className="font-bold text-yellow-300">Magas</span></div>
                          <div className="text-white/90 text-sm">🏷️ Hashtagek: <span className="font-bold text-green-300">20 db</span></div>
                        </div>
                      </div>
                    </div>

                    {/* Social Media Post */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden max-w-md mx-auto">
                      {/* Post Header */}
                      <div className="flex items-center p-4 border-b border-gray-100">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white font-bold text-sm">E</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">Elira.hu</div>
                          <div className="text-xs text-gray-500">Webfejlesztés • 2 órája</div>
                        </div>
                        <div className="text-gray-400">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                          </svg>
                        </div>
                      </div>

                      {/* Stock Photo - E-commerce/Online Shopping Context */}
                      <div className="relative">
                        <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                              <span className="text-white text-3xl">🛒</span>
                            </div>
                            <div className="text-gray-600 text-sm">E-commerce webáruház fejlesztés</div>
                            <div className="flex items-center justify-center mt-2 space-x-4">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 text-lg">📈</span>
                              </div>
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 text-lg">💻</span>
                              </div>
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                <span className="text-purple-600 text-lg">🔐</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Post Content */}
                      <div className="p-4">
                        <div className="text-gray-900 space-y-3 text-sm leading-relaxed">
                          {/* Hook */}
                          <p className="font-semibold text-red-600">❌ Elveszíted a vevőid, mielőtt még fizetnének?</p>
                          
                          {/* Body */}
                          <p>Egy sablonplatform lehet jó kezdet, de hosszú távon nem tartja meg a vásárlóid. A vevőid stabilitást és biztonságot keresnek – ha ezt nem találják, elmennek a konkurenciához.</p>
                          
                          <p>Az Elira ingyenes weboldal auditja segít feltárni azokat a rejtett hibákat, amelyek miatt a kosár üres marad. Egyedi fejlesztéssel viszont nemcsak több vásárlót vonzol, hanem meg is tartod őket.</p>
                          
                          {/* CTA */}
                          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-lg p-3 mt-4">
                            <p className="font-semibold text-teal-700">👉 Foglalj auditot még ma, és építs jövőbiztos webáruházat!</p>
                          </div>
                          
                          {/* Hashtags */}
                          <div className="text-xs text-blue-600 leading-relaxed pt-2 border-t border-gray-100">
                            <span className="hover:underline cursor-pointer">#Elira</span> <span className="hover:underline cursor-pointer">#webaudit</span> <span className="hover:underline cursor-pointer">#webshopfejlesztés</span> <span className="hover:underline cursor-pointer">#digitálisvállalkozás</span> <span className="hover:underline cursor-pointer">#ecommercehungary</span> <span className="hover:underline cursor-pointer">#webfejlesztés</span> <span className="hover:underline cursor-pointer">#onlineüzlet</span> <span className="hover:underline cursor-pointer">#webshop</span> <span className="hover:underline cursor-pointer">#vállalkozásfejlesztés</span> <span className="hover:underline cursor-pointer">#digitalgrowth</span> <span className="hover:underline cursor-pointer">#weblapfejlesztés</span> <span className="hover:underline cursor-pointer">#vállalkozásépítés</span> <span className="hover:underline cursor-pointer">#webáruház</span> <span className="hover:underline cursor-pointer">#biztonságoswebshop</span> <span className="hover:underline cursor-pointer">#üzletinövekedés</span> <span className="hover:underline cursor-pointer">#onlinekereskedelem</span> <span className="hover:underline cursor-pointer">#brandépítés</span> <span className="hover:underline cursor-pointer">#webauditgratis</span> <span className="hover:underline cursor-pointer">#vevőtartás</span>
                          </div>
                        </div>
                      </div>

                      {/* Post Engagement */}
                      <div className="border-t border-gray-100 px-4 py-3">
                        <div className="flex items-center justify-between text-gray-500 text-sm">
                          <div className="flex items-center space-x-6">
                            <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
                              </svg>
                              <span>47</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                              </svg>
                              <span>12</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
                              </svg>
                              <span>8</span>
                            </button>
                          </div>
                          <div className="text-xs text-gray-400">2 órája</div>
                        </div>
                      </div>
                    </div>

                    {/* Generation Result */}
                    <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl p-6 text-white mt-6">
                      <div className="text-center">
                        <div className="text-2xl mb-2">🎉</div>
                        <h3 className="text-xl font-bold mb-2">EREDMÉNY: Engaging social media post 2 perc alatt!</h3>
                        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                          <div className="bg-white/10 rounded-lg p-3">
                            <div className="font-semibold">✨ Mit kaptál:</div>
                            <ul className="mt-2 space-y-1 text-teal-100">
                              <li>• Figyelemfelkeltő hook</li>
                              <li>• Érzelmileg ható törzs</li>
                              <li>• Erős call-to-action</li>
                              <li>• 20 optimalizált hashtag</li>
                            </ul>
                          </div>
                          <div className="bg-white/10 rounded-lg p-3">
                            <div className="font-semibold">🚀 Várható eredmény:</div>
                            <ul className="mt-2 space-y-1 text-teal-100">
                              <li>• Magasabb engagement</li>
                              <li>• Több potenciális ügyfél</li>
                              <li>• Jobb brand awareness</li>
                              <li>• Azonnali használatra kész</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Tab Navigation for other examples */}
                    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
                      <button
                        onClick={() => setActiveTab('before')}
                        className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                          activeTab === 'before'
                            ? 'bg-white text-red-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        🔴 Előtte
                      </button>
                      <button
                        onClick={() => setActiveTab('after')}
                        className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                          activeTab === 'after'
                            ? 'bg-white text-green-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        ✅ Utána
                      </button>
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                      {activeTab === 'before' ? (
                        <motion.div
                          key="before"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                          className="bg-red-50 rounded-xl border border-red-200 p-6"
                        >
                          <div className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                            {(getExampleContent(activeExample) as any).before}
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="after"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="bg-emerald-50 rounded-xl border border-emerald-200 p-6"
                        >
                          <div className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                            {(getExampleContent(activeExample) as any).after}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}

                {/* Call to Action */}
                <div className="mt-8 text-center">
                  <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-200 p-6">
                    <p className="text-gray-700 font-medium mb-4">
                      Ez csak egy kis ízelítő abból, amit a kurzusban tanulsz meg!
                    </p>
                    <button
                      onClick={() => {
                        setActiveExample(null);
                        document.body.style.overflow = 'auto'; // Restore scroll
                      }}
                      className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      Bezárás és tovább a kurzusra
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default ExamplesSection;