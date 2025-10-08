/**
 * Value Pillars Data
 * What we offer to each company size tier
 */

export interface ValuePillar {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  icon: 'adjustments' | 'template' | 'globe';
  gradient: string;
  accentColor: 'blue' | 'emerald' | 'purple';
}

export const valuePillars: ValuePillar[] = [
  {
    id: 'context-specific',
    title: 'Startup mikrokurzusok',
    shortDesc: 'Gyors probléma → Kész megoldás',
    description: 'Adunk egy konkrét problémát (pl. vevői profil készítés). Megmutatjuk lépésről-lépésre mit csinálj. Kapsz kitölthető sablont. Kitöltöd, használod - kész. Nincs nagy elmélet, nincs próbálgatás. Senior szakember megmutatja, te megcsinálod. Működik.',
    icon: 'adjustments',
    gradient: 'from-blue-50 to-indigo-50',
    accentColor: 'blue'
  },
  {
    id: 'tools-not-theory',
    title: 'Kisvállalati masterclassok',
    shortDesc: 'Teljes rendszer építése',
    description: 'Felépítünk egy komplett rendszert (pl. marketing kampány). Videókon bemutatjuk minden lépést. Adunk sablonokat minden részhez. A csapatod együtt tanulja, együtt építi fel. Ha elakadtok, kérhettek konzultációt vagy mi segítünk megcsinálni. A rendszer kész, dokumentálva, használatra.',
    icon: 'template',
    gradient: 'from-emerald-50 to-teal-50',
    accentColor: 'emerald'
  },
  {
    id: 'hungarian-focus',
    title: 'Középvállalati programok',
    shortDesc: 'Mi építjük meg veled',
    description: 'Tanítunk, aztán együtt megcsináljuk. Heti meetingeken átvezetjük a csapatod. Leülünk, kitöltjük a sablonokat a TI cégetekre. Összehangoljuk az osztályokat. Dokumentáljuk a folyamatot. Mérjük az eredményt. Nem tanácsadás - hanem közös munka. Elmentünk amikor minden megy.',
    icon: 'globe',
    gradient: 'from-purple-50 to-pink-50',
    accentColor: 'purple'
  }
];
