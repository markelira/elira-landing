# General Content Development Plan
## Elira Landing Page - UX Enhancement

**Created**: 2025-10-08
**Objective**: Implement 6 missing general content sections to improve conversion by 35-50%
**Design Philosophy**: Cluely-inspired corporate modernism with subtle micro-interactions

---

## 📋 Development Phases Overview

| Phase | Sections | Priority | Est. Impact | Timeline |
|-------|----------|----------|-------------|----------|
| **Phase 1** | Trust Bar, Value Clarity, Results & Social Proof | ⭐ Critical | +35-45% | Steps 1-3 |
| **Phase 2** | Support Levels Comparison | ⭐ High | +10-15% | Step 4 |
| **Phase 3** | Platform Preview, General FAQ | 🟡 Medium | +10-15% | Steps 5-6 |

---

# PHASE 1: CRITICAL FOUNDATION SECTIONS

## Step 1: Trust Bar Component

### 1.1 Component Specification

**File**: `/components/TrustBar.tsx`

**Purpose**: Establish immediate credibility after hero section

**Design Reference**: Cluely-style horizontal trust indicators with animated counters

**Props Interface**:
```typescript
interface TrustBarProps {
  showAnimation?: boolean; // Default: true
  variant?: 'light' | 'subtle'; // Default: 'subtle'
}
```

### 1.2 Data Requirements

**File**: `/lib/content/trust-data.ts`

```typescript
export const trustMetrics = {
  totalClients: 300,
  implementationRate: 91, // Average of 89-92%
  hungarianExamples: 120,
  activeUsers: 450
};

export const trustBadges = [
  { icon: 'users', label: '300+ magyar vállalat', value: 300 },
  { icon: 'check', label: '91% implementációs ráta', value: 91 },
  { icon: 'globe', label: '120+ magyar piaci példa', value: 120 }
];
```

### 1.3 Component Structure

```tsx
export function TrustBar() {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* Animated Counter Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustBadges.map((badge, index) => (
            <StatCard
              key={index}
              icon={badge.icon}
              label={badge.label}
              value={badge.value}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

### 1.4 Styling Guidelines

- **Background**: `bg-gray-50` with `border-y border-gray-100`
- **Typography**: SF Pro Display semibold for numbers, medium for labels
- **Animations**:
  - Counter roll-in using `useInView` + `motion.span`
  - Stagger delay: 0.1s between cards
  - Easing: `[0.16, 1, 0.3, 1]` (Cluely curve)
- **Hover**: Subtle scale (1.02) with shadow increase
- **Icons**: Heroicons outline, 24px, gray-600

### 1.5 Implementation Steps

1. ✅ Create `/lib/content/trust-data.ts` with metrics
2. ✅ Create `/components/TrustBar.tsx` base structure
3. ✅ Implement `StatCard` sub-component with counter animation
4. ✅ Add stagger reveal with `useInView`
5. ✅ Add hover micro-interactions
6. ✅ Test responsive behavior (mobile: stack vertically)
7. ✅ Integrate into `app/page.tsx` after `PremiumHeroSection`

### 1.6 Completion Criteria

- [ ] Counters animate on scroll into view
- [ ] Mobile responsive (stack vertically)
- [ ] Hover states work smoothly
- [ ] Loads within 100ms (no layout shift)
- [ ] Accessibility: proper ARIA labels
- [ ] No console errors or warnings

---

## Step 2: Value Clarity Section

### 2.1 Component Specification

**File**: `/components/ValueClaritySection.tsx`

**Purpose**: Explain "What is Elira?" before tier selection

**Design Reference**: 3-pillar horizontal card layout (Cluely glass cards)

**Props Interface**:
```typescript
interface ValueClaritySectionProps {
  showBackgroundPattern?: boolean; // Default: true
}
```

### 2.2 Data Requirements

**File**: `/lib/content/value-pillars.ts`

```typescript
export const valuePillars = [
  {
    id: 'context-specific',
    title: 'Kontextus-specifikus tartalom',
    shortDesc: 'Méret = Megoldás',
    description: 'Startup? 30 perc mikrokurzus. KKV? 8 óra masterclass. 50+ fő? 1 hónap integrált támogatás. Minden vállalati méret más megoldást kap - nem univerzális sablonokat.',
    icon: 'adjustments', // Heroicon name
    gradient: 'from-blue-50 to-indigo-50',
    accentColor: 'blue'
  },
  {
    id: 'tools-not-theory',
    title: 'Eszközök, nem elméletek',
    shortDesc: 'Ma tanulod, holnap használod',
    description: 'Letölthető sablonok, kitölthető munkafolyamatok, másolható checklistek. Nem "így kellene csinálni" - hanem "így csináld most". Holnap alkalmazod, nem 3 hónap múlva.',
    icon: 'template',
    gradient: 'from-emerald-50 to-teal-50',
    accentColor: 'emerald'
  },
  {
    id: 'hungarian-focus',
    title: 'Magyar piaci valóság',
    shortDesc: 'Ami ITT működik, MOST',
    description: 'Magyar vállalati példák. Magyar árazási modellek. Magyar jogi környezet (GDPR, szerződések). Nem fordított "best practice" - hanem mi működik Magyarországon 2025-ben.',
    icon: 'globe',
    gradient: 'from-purple-50 to-pink-50',
    accentColor: 'purple'
  }
];
```

### 2.3 Component Structure

```tsx
export function ValueClaritySection() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <BackgroundPattern opacity={0.02} />

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          eyebrow="Értékalapú megközelítés"
          title="Mi az Elira? Nem még egy kurzus platform."
          description="Három alapelv, ami miatt mások vagyunk - és miért működünk jobban."
        />

        {/* 3 Pillar Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mt-16">
          {valuePillars.map((pillar, index) => (
            <PillarCard
              key={pillar.id}
              pillar={pillar}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

### 2.4 Styling Guidelines

- **Section Background**: White with subtle dot pattern (0.02 opacity)
- **Cards**: Glass morphism
  - `backdrop-blur-xl`
  - `border border-gray-100`
  - `shadow-sm` default, `shadow-lg` on hover
- **Typography**:
  - Title: `text-2xl font-semibold`
  - Short desc: `text-sm text-gray-600 font-medium`
  - Description: `text-base text-gray-700 leading-relaxed`
- **Animations**:
  - Cards: Stagger reveal (0.15s delay between)
  - Hover: Scale 1.03, border color shift to accent
  - Icon: Rotate 5deg on hover
- **Gradient Backgrounds**: Subtle, pillar-specific (see data)

### 2.5 Implementation Steps

1. ✅ Create `/lib/content/value-pillars.ts` with pillar data
2. ✅ Create `/components/ValueClaritySection.tsx` base structure
3. ✅ Create `PillarCard` sub-component with glass styling
4. ✅ Create reusable `SectionHeader` component (if not exists)
5. ✅ Implement stagger animations with framer-motion
6. ✅ Add hover micro-interactions (scale, border, icon rotation)
7. ✅ Add responsive behavior (mobile: single column)
8. ✅ Integrate into `app/page.tsx` between Hero and CompanySizeSelector

### 2.6 Completion Criteria

- [ ] All 3 pillars render correctly with glass styling
- [ ] Stagger animation works on scroll into view
- [ ] Hover states smooth (scale, border shift, icon rotation)
- [ ] Mobile responsive (stacks vertically)
- [ ] Icons load correctly from Heroicons
- [ ] Background pattern visible but subtle
- [ ] No layout shift or content jump
- [ ] Accessibility: proper heading hierarchy

---

## Step 3: Results & Social Proof Section

### 3.1 Component Specification

**File**: `/components/ResultsSocialProof.tsx`

**Purpose**: Provide concrete proof points and anonymized case studies

**Design Reference**: Split layout - left stats, right case study cards

**Props Interface**:
```typescript
interface ResultsSocialProofProps {
  showCaseStudies?: boolean; // Default: true
  maxCaseStudies?: number; // Default: 3
}
```

### 3.2 Data Requirements

**File**: `/lib/content/results-data.ts`

```typescript
export const aggregateStats = {
  totalCompanies: 300,
  averageROI: 124, // Weighted average: (127 + 89 + 156) / 3
  implementationRate: 91,
  avgTimeToResults: 30, // days
  activeProjects: 180
};

export const caseStudies = [
  {
    id: 'cs-1',
    tier: 'Startup',
    size: '5 fő',
    industry: 'SaaS',
    timeline: '30 nap',
    challenge: 'Nulla email marketing rendszer',
    solution: 'Email sequence mikrokurzus + sablonok',
    result: '45% open rate, 12% click rate, első 50 lead',
    roi: 127,
    quote: 'Egy hónap alatt megépült ami 6 hónapig hiányzott.',
    anonymous: true
  },
  {
    id: 'cs-2',
    tier: 'Kisvállalat',
    size: '25 fő',
    industry: 'Szolgáltatás',
    timeline: '3 hónap',
    challenge: 'Lead generation próbálgatás, nincs rendszer',
    solution: 'Marketing masterclass + konzultációs csomag',
    result: 'Lead mennyiség 3x növekedés, strukturált pipeline',
    roi: 89,
    quote: 'Először van dokumentált folyamat, nem fejben.',
    anonymous: true
  },
  {
    id: 'cs-3',
    tier: 'Középvállalat',
    size: '80 fő',
    industry: 'Gyártás',
    timeline: '6 hét',
    challenge: 'Sales-Marketing széthúzás, nincs közös nyelv',
    solution: 'Integrált program + változásmenedzsment',
    result: 'Dokumentált sales process, osztályok szinkronban',
    roi: 156,
    quote: '6 hét alatt többet értünk el mint 2 év próbálkozással.',
    anonymous: true
  }
];
```

### 3.3 Component Structure

```tsx
export function ResultsSocialProof() {
  return (
    <section className="py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          eyebrow="Bizonyítékok"
          title="Működik? Nézd az adatokat."
          description="Nem ígéretek - hanem valós eredmények magyar vállalatoktól."
        />

        <div className="grid lg:grid-cols-2 gap-16 mt-16">
          {/* LEFT: Aggregate Stats */}
          <StatsPanel stats={aggregateStats} />

          {/* RIGHT: Case Study Cards */}
          <CaseStudyCarousel studies={caseStudies.slice(0, 3)} />
        </div>
      </div>
    </section>
  );
}
```

### 3.4 Sub-components

**3.4.1 StatsPanel**
- Animated counters (larger font)
- Icon for each stat
- Subtle gradient background
- Hover: Slight glow effect

**3.4.2 CaseStudyCarousel**
- Vertical stack on desktop, horizontal swipe on mobile
- Card design: Glass morphism with tier badge
- Show: Industry icon, timeline, result (bold), quote
- Hover: Lift effect (translateY -4px)

### 3.5 Styling Guidelines

- **Section Background**: Gradient `from-white to-gray-50`
- **Stats Panel**:
  - Background: `bg-white` with border
  - Numbers: `text-5xl font-bold text-gray-900`
  - Labels: `text-sm text-gray-600`
  - Icons: 32px, colored (blue, emerald, purple)
- **Case Study Cards**:
  - Glass morphism (same as pillar cards)
  - Tier badge: Small colored pill (top-right)
  - Quote: Italic, gray-700
  - Result: Bold, larger text, gray-900
- **Animations**:
  - Stats: Counter roll-in on view
  - Cards: Fade up stagger (0.1s between)
  - Hover: TranslateY -4px, shadow increase

### 3.6 Implementation Steps

1. ✅ Create `/lib/content/results-data.ts` with stats and case studies
2. ✅ Create `/components/ResultsSocialProof.tsx` main component
3. ✅ Create `StatsPanel` sub-component with animated counters
4. ✅ Create `CaseStudyCard` sub-component
5. ✅ Create `CaseStudyCarousel` wrapper (mobile swipe optional)
6. ✅ Implement counter animations (useInView + motion)
7. ✅ Add stagger reveal for case study cards
8. ✅ Add hover effects (lift, shadow)
9. ✅ Test responsive behavior (stack on mobile)
10. ✅ Integrate into `app/page.tsx` after `InteractiveProblemSolution`

### 3.7 Completion Criteria

- [ ] Stats animate correctly on scroll into view
- [ ] Case study cards render with proper styling
- [ ] Tier badges display correctly with colors
- [ ] Hover effects work smoothly (lift, shadow)
- [ ] Mobile responsive (carousel or stack)
- [ ] Anonymous badges show correctly
- [ ] No performance issues with animations
- [ ] Accessibility: ARIA labels for stats

---

# PHASE 2: HIGH PRIORITY COMPARISON

## Step 4: Support Levels Comparison

### 4.1 Component Specification

**File**: `/components/SupportLevelsComparison.tsx`

**Purpose**: Show support differences between tiers after selection explanation

**Design Reference**: Clean comparison matrix (not overwhelming)

**Props Interface**:
```typescript
interface SupportLevelsComparisonProps {
  variant?: 'full' | 'compact'; // Default: 'compact'
  highlightTier?: 'startup' | 'kisvallalat' | 'kozepesvallalat' | null;
}
```

### 4.2 Data Requirements

**File**: `/lib/content/support-comparison.ts`

```typescript
export const supportLevels = {
  startup: {
    tier: 'Startup',
    tierLabel: 'Induló cég',
    features: {
      contentDuration: '30-90 perc',
      templates: '5-10 db',
      support: 'Opcionális',
      consultation: 'Ha kell (extra)',
      documentation: 'Te csinálod',
      liveSupport: 'Email support',
      implementation: 'DIY (Do It Yourself)'
    },
    color: 'blue',
    pricing: '9.990-29.990 Ft'
  },
  kisvallalat: {
    tier: 'Kisvállalat',
    tierLabel: 'KKV',
    features: {
      contentDuration: '4-8 óra',
      templates: '10-20 db',
      support: 'Opcionális',
      consultation: '3x1 óra (opcionális)',
      documentation: 'Segítünk',
      liveSupport: 'Email + call support',
      implementation: 'DWY (Done With You)'
    },
    color: 'purple',
    pricing: '149.000-249.000 Ft',
    mostPopular: true
  },
  kozepesvallalat: {
    tier: 'Középvállalat',
    tierLabel: '50+ fő',
    features: {
      contentDuration: '4-8 óra',
      templates: '10-30 db',
      support: 'Integrált (1 hónap)',
      consultation: '4x60 perc (integrált)',
      documentation: 'Közösen építjük',
      liveSupport: 'Dedicated support',
      implementation: 'DWY/DFY (Done For You)'
    },
    color: 'indigo',
    pricing: '449.000-649.000 Ft'
  }
};

export const comparisonRows = [
  { key: 'contentDuration', label: 'Tartalom hossza', icon: 'clock' },
  { key: 'templates', label: 'Sablonok száma', icon: 'document' },
  { key: 'support', label: 'Támogatás típusa', icon: 'support' },
  { key: 'consultation', label: 'Konzultáció', icon: 'calendar' },
  { key: 'documentation', label: 'Dokumentáció', icon: 'folder' },
  { key: 'implementation', label: 'Megvalósítás', icon: 'cog' }
];
```

### 4.3 Component Structure

```tsx
export function SupportLevelsComparison({ variant = 'compact' }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          eyebrow="Támogatási szintek"
          title="Mi változik a vállalati méretek között?"
          description="Minden szint ugyanazt a 4 fázist követi - csak a támogatás mélysége változik."
        />

        {/* Comparison Table */}
        <div className="mt-16">
          <ComparisonMatrix
            levels={supportLevels}
            rows={comparisonRows}
            variant={variant}
          />
        </div>

        {/* Bottom note */}
        <motion.p className="text-center text-sm text-gray-600 mt-8">
          Mindhárom szint tartalmazza: Életre szóló hozzáférés •
          Folyamatos frissítések • Magyar piaci példák
        </motion.p>
      </div>
    </section>
  );
}
```

### 4.4 Styling Guidelines

- **Table Design**: NOT traditional table - card-based comparison
- **Layout**: 3 columns (one per tier) on desktop, tabs on mobile
- **Cell Styling**:
  - Background: `bg-gray-50` alternating rows
  - Border: `border-b border-gray-100`
  - Hover: Highlight entire column with subtle background
- **Popular Badge**: On "Kisvállalat" column header
- **Colors**: Tier-specific accent (blue, purple, indigo)
- **Icons**: Small (16px) next to row labels
- **Typography**:
  - Row labels: `text-sm font-medium text-gray-700`
  - Values: `text-sm text-gray-900`

### 4.5 Implementation Steps

1. ✅ Create `/lib/content/support-comparison.ts` with data
2. ✅ Create `/components/SupportLevelsComparison.tsx` main component
3. ✅ Create `ComparisonMatrix` sub-component
4. ✅ Create `TierColumn` sub-component (for each tier)
5. ✅ Implement hover effect (entire column highlight)
6. ✅ Add "Most Popular" badge on Kisvállalat
7. ✅ Implement mobile tabs (swipe between tiers)
8. ✅ Add fade-in animation on scroll into view
9. ✅ Test responsive behavior
10. ✅ Integrate into `app/page.tsx` after `InteractiveHowItWorks`

### 4.6 Completion Criteria

- [ ] 3 columns render correctly on desktop
- [ ] Mobile tabs work (swipe or button navigation)
- [ ] Hover column highlight works smoothly
- [ ] Popular badge displays correctly
- [ ] Icons align properly with labels
- [ ] Color coding matches tier colors
- [ ] Responsive (no horizontal scroll on mobile)
- [ ] Accessibility: Table semantics or equivalent ARIA

---

# PHASE 3: POLISH & CONVERSION OPTIMIZATION

## Step 5: Platform Preview Section

### 5.1 Component Specification

**File**: `/components/PlatformPreview.tsx`

**Purpose**: Show visual proof of the platform interface

**Design Reference**: Screenshot carousel or interactive preview (Cluely product shots)

**Props Interface**:
```typescript
interface PlatformPreviewProps {
  variant?: 'carousel' | 'grid'; // Default: 'carousel'
  autoplay?: boolean; // Default: true
}
```

### 5.2 Asset Requirements

**Screenshots needed** (to be created/provided):
1. Dashboard overview (`/public/platform/dashboard.png`)
2. Course module interface (`/public/platform/module-view.png`)
3. Template download area (`/public/platform/templates.png`)
4. Progress tracking (optional) (`/public/platform/progress.png`)

**Specifications**:
- Resolution: 1920x1080 (16:9 aspect ratio)
- Format: PNG with transparency or WEBP
- File size: < 200KB each (optimized)
- Include subtle shadow/depth in screenshot

### 5.3 Component Structure

```tsx
export function PlatformPreview() {
  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          eyebrow="Platform"
          title="Egyszerű. Tiszta. Működik."
          description="Nem komplikált LMS. Nem 2010-es design. Modern platform, gyors hozzáférés, minden eszköz egy helyen."
        />

        {/* Screenshot Carousel */}
        <div className="mt-16">
          <ScreenshotCarousel
            screenshots={platformScreenshots}
            autoplay={true}
            interval={5000}
          />
        </div>

        {/* Feature badges below */}
        <FeatureBadges
          badges={[
            'Mobilon is tökéletes',
            'Offline letöltés',
            'Sablonok egy kattintással'
          ]}
        />
      </div>
    </section>
  );
}
```

### 5.4 Styling Guidelines

- **Section Background**: Gradient `from-gray-50 to-white`
- **Carousel**:
  - Images: Rounded corners (24px)
  - Shadow: `shadow-2xl` with subtle glow
  - Navigation: Subtle dots below, arrow buttons on sides
  - Transition: Smooth fade + slight slide (200ms)
- **Image Treatment**:
  - Border: 1px solid rgba(0,0,0,0.05)
  - Blur loading placeholder
  - Aspect ratio: 16:9 maintained
- **Feature Badges**:
  - Small pills with icons
  - Gray background, center aligned

### 5.5 Implementation Steps

1. ✅ Create `/lib/content/platform-screenshots.ts` with screenshot data
2. ✅ Create `/components/PlatformPreview.tsx` main component
3. ✅ Create `ScreenshotCarousel` sub-component (or use library like Swiper)
4. ✅ Create `FeatureBadges` sub-component
5. ✅ Add blur placeholder for images (Next.js Image optimization)
6. ✅ Implement autoplay functionality with pause on hover
7. ✅ Add navigation dots and arrow buttons
8. ✅ Add mobile swipe gesture support
9. ✅ Test image loading performance
10. ✅ Integrate into `app/page.tsx` after `SupportLevelsComparison`

### 5.6 Completion Criteria

- [ ] Screenshots load with blur placeholder
- [ ] Carousel auto-plays correctly
- [ ] Navigation works (dots, arrows, swipe)
- [ ] Pause on hover works
- [ ] Images are optimized (< 200KB each)
- [ ] Mobile responsive (touch swipe)
- [ ] No cumulative layout shift (CLS)
- [ ] Accessibility: Alt text for all images

### 5.7 Optional Enhancement

If screenshots not available:
- Create mockup using Figma/code
- Use video preview instead of static images
- Show animated UI interactions (micro-demos)

---

## Step 6: General FAQ Section

### 6.1 Component Specification

**File**: `/components/GeneralFAQ.tsx`

**Purpose**: Answer common questions before tier selection

**Design Reference**: Cluely-style minimal accordion

**Props Interface**:
```typescript
interface GeneralFAQProps {
  maxVisible?: number; // Default: 8
  variant?: 'accordion' | 'grid'; // Default: 'accordion'
}
```

### 6.2 Data Requirements

**File**: `/lib/content/general-faq.ts`

```typescript
export const generalFAQ = [
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
```

### 6.3 Component Structure

```tsx
export function GeneralFAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <SectionHeader
          eyebrow="Gyakori kérdések"
          title="Minden ami fontos a döntéshez"
          description="Válaszok a leggyakoribb kérdésekre - mielőtt kiválasztod a szinted."
        />

        {/* FAQ Accordion */}
        <div className="mt-16 space-y-4">
          {generalFAQ.map((faq) => (
            <FAQItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-4">
            Nem találod a választ?
          </p>
          <Button variant="outline">
            Kérdezz tőlünk közvetlenül
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
```

### 6.4 Styling Guidelines

- **Section**: White background, clean
- **Accordion Items**:
  - Border bottom: `border-b border-gray-200`
  - Question: `text-lg font-semibold text-gray-900`
  - Answer: `text-base text-gray-700 leading-relaxed`
  - Padding: `py-6`
- **Animation**:
  - Height: Smooth expand/collapse (framer-motion AnimatePresence)
  - Icon: Rotate 180deg when open (chevron down → up)
  - Easing: `[0.16, 1, 0.3, 1]`
- **Hover**: Question text color shift to blue-600
- **Open State**: Light blue background tint

### 6.5 Implementation Steps

1. ✅ Create `/lib/content/general-faq.ts` with 8 FAQ items
2. ✅ Create `/components/GeneralFAQ.tsx` main component
3. ✅ Create `FAQItem` sub-component with accordion logic
4. ✅ Implement smooth height animation (AnimatePresence)
5. ✅ Add icon rotation animation (chevron)
6. ✅ Implement single-open behavior (close others when opening)
7. ✅ Add hover states for questions
8. ✅ Add "Contact us" CTA at bottom
9. ✅ Test keyboard navigation (space/enter to toggle)
10. ✅ Integrate into `app/page.tsx` before `PremiumFooter`

### 6.6 Completion Criteria

- [ ] All 8 FAQ items render correctly
- [ ] Accordion open/close animation smooth
- [ ] Only one item open at a time
- [ ] Chevron icon rotates correctly
- [ ] Hover states work on questions
- [ ] Mobile responsive (no text overflow)
- [ ] Keyboard accessible (tab, enter, space)
- [ ] Accessibility: Proper ARIA for accordion

---

# 🔄 FINAL INTEGRATION PHASE

## Step 7: Update Homepage Flow

### 7.1 New Page Structure

**File**: `/app/page.tsx`

**Updated render order**:
```tsx
export default function Home() {
  return (
    <CompanySizeProvider>
      <div className="min-h-screen">
        <PremiumHeader />
        <main>
          {/* HERO */}
          <PremiumHeroSection />

          {/* PHASE 1: CRITICAL FOUNDATION */}
          <TrustBar />                      {/* NEW - Step 1 */}
          <ValueClaritySection />           {/* NEW - Step 2 */}

          {/* TIER SELECTION */}
          <CompanySizeSelector />

          {/* GENERAL CONTENT */}
          <InteractiveProblemSolution />    {/* EXISTING */}
          <ResultsSocialProof />            {/* NEW - Step 3 */}
          <InteractiveHowItWorks />         {/* EXISTING */}

          {/* PHASE 2: COMPARISON */}
          <SupportLevelsComparison />       {/* NEW - Step 4 */}

          {/* PHASE 3: POLISH */}
          <PlatformPreview />               {/* NEW - Step 5 */}
          <GeneralFAQ />                    {/* NEW - Step 6 */}

          {/* TIER-SPECIFIC CONTENT */}
          <DynamicContent>
            <PremiumTargetAudience />
            <PremiumCTA />
            <CluelyHeroReplica />
          </DynamicContent>
        </main>
        <PremiumFooter />
      </div>
    </CompanySizeProvider>
  );
}
```

### 7.2 Import Updates

Add to imports section:
```tsx
import { TrustBar } from "@/components/TrustBar";
import { ValueClaritySection } from "@/components/ValueClaritySection";
import { ResultsSocialProof } from "@/components/ResultsSocialProof";
import { SupportLevelsComparison } from "@/components/SupportLevelsComparison";
import { PlatformPreview } from "@/components/PlatformPreview";
import { GeneralFAQ } from "@/components/GeneralFAQ";
```

### 7.3 Testing Checklist

After integration:
- [ ] Page loads without errors
- [ ] Scroll performance is smooth (60fps)
- [ ] All animations trigger correctly
- [ ] Mobile responsive on all sections
- [ ] No layout shifts (CLS score < 0.1)
- [ ] Images optimized (Lighthouse score > 90)
- [ ] Accessibility audit passes (WAVE/axe)

---

# 📊 SUCCESS METRICS

## Pre-Launch Checklist

### Performance
- [ ] Lighthouse Performance Score: > 90
- [ ] First Contentful Paint: < 1.5s
- [ ] Cumulative Layout Shift: < 0.1
- [ ] Total Page Size: < 2MB
- [ ] All images optimized (WebP/AVIF)

### Accessibility
- [ ] WCAG AA compliant
- [ ] Keyboard navigation works throughout
- [ ] Screen reader tested (VoiceOver/NVDA)
- [ ] Color contrast ratios meet standards
- [ ] All interactive elements have focus states

### Cross-Browser
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Responsiveness
- [ ] Mobile (320px - 480px)
- [ ] Tablet (481px - 768px)
- [ ] Desktop (769px - 1440px)
- [ ] Large Desktop (1441px+)

---

# 🛠️ DEVELOPMENT WORKFLOW

## Daily Checklist

Before starting each step:
1. ✅ Read step specification completely
2. ✅ Review design reference (Cluely inspiration)
3. ✅ Create data file first (if applicable)
4. ✅ Create component file with TypeScript interfaces
5. ✅ Implement base structure
6. ✅ Add styling (Tailwind + motion)
7. ✅ Add animations and micro-interactions
8. ✅ Test responsive behavior
9. ✅ Run accessibility audit
10. ✅ Mark step as complete in todo list

## Completion Criteria for Each Step

A step is 100% complete when:
- ✅ All sub-components created and working
- ✅ Data files populated with real content
- ✅ Styling matches design philosophy (Cluely-inspired)
- ✅ Animations smooth and performant
- ✅ Mobile responsive (tested)
- ✅ Accessibility compliant (tested)
- ✅ No console errors or warnings
- ✅ Integrated into main page flow
- ✅ Git committed with descriptive message

---

# 📝 NOTES & CONSIDERATIONS

## Design Philosophy Reminders

Every section must have "the Cluely detail":
- **Trust Bar**: Animated counter roll-in
- **Value Pillars**: Subtle parallax on scroll
- **Results Cards**: Micro-hover scale (1.02x)
- **Comparison Matrix**: Column hover highlight
- **Platform Preview**: Blur-to-sharp image load
- **FAQ Accordion**: Smooth height transition with easing

These details communicate professionalism without words.

## Performance Optimization

- Use `next/image` for all images (automatic optimization)
- Lazy load sections below fold (IntersectionObserver)
- Use `motion` variants for grouped animations
- Avoid unnecessary re-renders (React.memo where needed)
- Compress SVG icons (SVGO)

## Accessibility Priorities

- Semantic HTML (h1 → h6 hierarchy)
- ARIA labels for interactive elements
- Focus visible on all focusable elements
- Alt text for all images
- Keyboard navigation (tab order logical)
- Screen reader announcements (live regions)

---

# 🎯 ESTIMATED TIMELINE

| Phase | Steps | Estimated Time |
|-------|-------|----------------|
| **Phase 1** | Steps 1-3 | 6-8 hours |
| **Phase 2** | Step 4 | 2-3 hours |
| **Phase 3** | Steps 5-6 | 4-5 hours |
| **Integration** | Step 7 | 1-2 hours |
| **Testing & Polish** | All | 2-3 hours |
| **TOTAL** | | 15-21 hours |

---

# ✅ READY TO BEGIN

This plan is now complete and ready for sequential implementation.

**IMPORTANT**: Only move to next step when current step is 100% complete per completion criteria.

Start with **Phase 1, Step 1: Trust Bar Component**.
