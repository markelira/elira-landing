/**
 * Support Levels Comparison Data
 * Real data from dynamic_content docs - pricing section focused
 */

export interface SupportLevel {
  tier: string;
  tierLabel: string;
  productType: string;
  features: {
    contentDuration: string;
    templates: string;
    support: string;
    consultation: string;
    implementation: string;
  };
  color: 'blue' | 'purple' | 'indigo';
  pricing: string;
  mostPopular?: boolean;
}

export const supportLevels: Record<string, SupportLevel> = {
  startup: {
    tier: 'Startup',
    tierLabel: 'Induló cég',
    productType: 'Mikrokurzus',
    features: {
      contentDuration: '30-90 perc célzott kurzus egy konkrét problémára',
      templates: '5-10 db azonnal használható',
      support: 'Email support',
      consultation: 'Nincs - teljesen önálló',
      implementation: 'Te magad csinálod (DIY)'
    },
    color: 'blue',
    pricing: '9.990-29.990 Ft'
  },
  kisvallalat: {
    tier: 'Kisvállalat',
    tierLabel: 'KKV',
    productType: 'Masterclass',
    features: {
      contentDuration: '4-8 óra komplett rendszer felépítés',
      templates: '10-20 db professzionális sablon',
      support: 'Email + telefonos support',
      consultation: '1 hónap OPCIONÁLIS közös munka',
      implementation: 'Együtt csináljuk, ha kell (DWY)'
    },
    color: 'purple',
    pricing: '149.000-249.000 Ft'
  },
  kozepesvallalat: {
    tier: 'Középvállalat',
    tierLabel: '50+ fő',
    productType: 'Integrált Program',
    features: {
      contentDuration: '4-8 óra teljes körű oktatás',
      templates: '10-30 db vállalati szintű sablon',
      support: 'Dedikált support + 4x60 perc havonta',
      consultation: '1 hónap INTEGRÁLT közös munka + dokumentálás',
      implementation: 'Közösen építjük fel (DWY/DFY)'
    },
    color: 'indigo',
    pricing: 'Egyedi ajánlat'
  }
};

export interface ComparisonRow {
  key: keyof SupportLevel['features'];
  label: string;
  icon: string;
}

export const comparisonRows: ComparisonRow[] = [
  { key: 'contentDuration', label: 'Videó kurzus', icon: 'clock' },
  { key: 'templates', label: 'Sablonok száma', icon: 'document' },
  { key: 'consultation', label: 'Közös munka időszak', icon: 'calendar' },
  { key: 'support', label: 'Támogatás típusa', icon: 'support' },
  { key: 'implementation', label: 'Megvalósítás', icon: 'cog' }
];
