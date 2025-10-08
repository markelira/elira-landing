/**
 * General FAQ Data
 * Common questions before tier selection
 */

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'basics' | 'differentiation' | 'guarantee' | 'flexibility' | 'support' | 'customization' | 'updates';
}

export const generalFAQ: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Mi az Elira és miben más mint egy kurzus platform?',
    answer: 'Az Elira nem egy hagyományos online kurzus platform. Három fő különbség: (1) Vállalati méret-specifikus tartalom - nem "one size fits all". (2) Eszközök és sablonok, nem csak videók - azonnal használható anyagok. (3) Folyamatos evolúció - negyedéves frissítések és új tartalmak a piaci változásokra reagálva.',
    category: 'basics'
  },
  {
    id: 'faq-2',
    question: 'Miért van 3 különböző méret kategória?',
    answer: 'Mert ami működik egy 5 fős startupnál, nem működik egy 50 fős cégnél. A startup gyors, konkrét megoldásokat keres (30-90 perc mikrokurzus). A KKV rendszereket épít (4-8 óra masterclass). A középvállalat szervezeti támogatást igényel (integrált program + konzultáció). Nem a létszám, hanem a szervezeti érettség és igények határozzák meg a kategóriát.',
    category: 'basics'
  },
  {
    id: 'faq-3',
    question: 'Magyar piaci fókusz - mit jelent ez pontosan?',
    answer: 'Minden tartalom: (1) Magyar vállalati példákkal készül - nem fordított US case study-k. (2) Magyar árazási modelleket használ - forint alapon, magyar vásárlóerőhöz igazítva. (3) Magyar jogi környezetet vesz figyelembe - GDPR, magyar szerződésjog, adózás. (4) Magyar piaci trendekre reagál - ami ITT működik 2025-ben.',
    category: 'differentiation'
  },
  {
    id: 'faq-4',
    question: 'Van pénzvisszafizetési garancia?',
    answer: 'Igen. Minden szinten: (1) Startup & Kisvállalat: 30 napos teljes pénzvisszafizetési garancia, kérdés nélkül. (2) Középvállalat: Első konzultáció után ha nem vagy elégedett, teljes visszafizetés. PLUSZ ha 3 hónap múlva nincs mérhető eredmény, 2 extra konzultáció ingyen.',
    category: 'guarantee'
  },
  {
    id: 'faq-5',
    question: 'Mi van ha rossz méretet választok?',
    answer: 'Két opció: (1) Induláskor (7 napon belül): Ingyenes váltás magasabb vagy alacsonyabb szintre, árkülönbözet rendezésével. (2) Későbbi upgrade: Ha nősz és nagyobb támogatás kell, a már megfizetett összeg beszámít a magasabb csomagba. Nem veszítesz semmit.',
    category: 'flexibility'
  },
  {
    id: 'faq-6',
    question: 'Lehet később support-ot hozzáadni?',
    answer: 'Igen. (1) Startup: Bármikor vásárolhatsz egyszeri konzultációt vagy upgrade-elhetsz Kisvállalat szintre. (2) Kisvállalat: A konzultációs csomagot (3x1 óra) a masterclass vásárlása után 30 napon belül kedvezményesen hozzáadhatod. (3) Mindhárom szint: Később is elérhető DWY/DFY (Done With You / Done For You) csomagok specifikus projektekhez.',
    category: 'support'
  },
  {
    id: 'faq-7',
    question: 'Mennyire specifikus a tartalom? (iparág, termék típus)',
    answer: 'A tartalom iparág-agnosztikus keretrendszereket tanít, de konkrét példákkal több iparágból: SaaS, szolgáltatás, gyártás, e-commerce. A sablonok adaptálhatók bármilyen üzleti modellre. Kisvállalat és Középvállalat szinteken a konzultáció során személyre szabjuk a TE iparágadra és termék/szolgáltatás típusodra.',
    category: 'customization'
  },
  {
    id: 'faq-8',
    question: 'Hogyan működik a frissítés és evolúció?',
    answer: 'Minden vásárolt tartalom életre szóló hozzáférést tartalmaz + minden jövőbeli frissítést ingyen kapsz. Frissítési ütemterv: (1) Negyedéves nagy frissítések (új modulok, frissített sablonok). (2) Piaci változásokra reaktív tartalmak (pl. új AI eszközök, marketing trendek). (3) Évente 2x felülvizsgálat és bővítés a felhasználói visszajelzések alapján. Nem "egyszer megveszed és kész" - hanem folyamatosan fejlődő tudásbázis.',
    category: 'updates'
  }
];
