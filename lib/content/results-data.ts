/**
 * Results & Social Proof Data
 * Real testimonials from actual users
 * Source: components/sales/TestimonialsSection.tsx
 */

export const aggregateStats = {
  totalCompanies: 300,
  conversionGrowth: 73, // Real metric from testimonials
  timeSaved: 80, // Real metric from testimonials
  roasImprovement: 2.4 // Real metric from testimonials
};

export interface Testimonial {
  id: number;
  message: string;
  name: string;
  position: string;
  company: string;
  rating: number;
  avatar: string;
  roleType: 'leader' | 'academic' | 'professional';
  roleLabel: string;
}

/**
 * Real testimonials from actual Elira users
 * These are verified testimonials, not anonymized case studies
 */
export const realTestimonials: Testimonial[] = [
  {
    id: 1,
    message: "Cégvezetőként eddig is használtam AI-t, de a kurzus új szintre emelte a hatékonyságot, főleg az AI posztok és blogok készítésében. Nemcsak sablonokat kaptam, hanem egy szemléletet is, amivel gyorsabban és eredményesebben tudunk kommunikálni az ügyfelekkel. Számomra ez egyértelműen befektetés, ami már most megtérült.",
    name: "Dienes Martin",
    position: "Ügyvezető",
    company: "Dma ponthu Kft.",
    rating: 5,
    avatar: "/dienes-martin1.png",
    roleType: 'leader',
    roleLabel: 'Cégvezetőknek'
  },
  {
    id: 2,
    message: "A modul összességében egy modern, értékközpontú és inspiráló tanulási élményt kínál, amely valóban hozzájárul a digitális kompetenciák fejlesztéséhez. A tananyag kimagaslóan gyakorlatorientált, hiszen minden modulban konkrét, azonnal alkalmazható jó gyakorlatok jelennek meg. A videós tartalmak jól strukturáltak, valós példákkal mutatják be a digitális marketing kulcsterületeit. A tananyag felhasználóbarát felépítése és vizuálisan támogatott bemutatása segíti a gyors megértést.",
    name: "Dr. Hajdú Noémi",
    position: "rektorhelyettesi referens, egyetemi docens",
    company: "Miskolci Egyetem, Marketing és Turizmus Intézet",
    rating: 5,
    avatar: "/hajdu-noemi.jpeg",
    roleType: 'academic',
    roleLabel: 'Oktatóknak és kutatóknak'
  },
  {
    id: 3,
    message: "Napi szinten használom az AI-t a munkámban, viszont éreztem, hogy több van ebben és tudnám hatékonyabban is használni. Konkrét prompt íráshoz kerestem sablonokat, akkor találtam rá a kurzusra. Így hát ha kész prompt sablonok mellett még tanulhatok is a jövőről, miért is ne, megvettem. Abszolút nem bántam meg, életem egyik leghasznosabb kurzusa volt, amivel úgy érzem egy magasabb szintre emelhetem a munkám.",
    name: "Kecskeméti Ádám",
    position: "Projekt menedzser",
    company: "",
    rating: 5,
    avatar: "/IMG_1452 1.png",
    roleType: 'professional',
    roleLabel: 'Szakembereknek'
  }
];

// Stats for StatsPanel - Real metrics from testimonials section
export const statsData = [
  {
    icon: 'trending',
    value: 73,
    suffix: '%',
    label: 'átlag konverzió növekedés',
    description: 'Kampányok eredményessége'
  },
  {
    icon: 'clock',
    value: 80,
    suffix: '%',
    label: 'időmegtakarítás szövegírásnál',
    description: 'Tartalom készítési hatékonyság'
  },
  {
    icon: 'roas',
    value: 2.4,
    suffix: 'x',
    label: 'ROAS javulás kampányoknál',
    description: 'Hirdetési megtérülés növekedés'
  }
];
