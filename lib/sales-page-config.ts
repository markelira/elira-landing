// Sales Page Design System Configuration
export const salesPageDesign = {
  // Color scheme
  colors: {
    primary: {
      gradient: 'from-teal-700 to-cyan-600',
      solid: '#0f766e',
      light: '#14b8a6',
      dark: '#0a5349'
    },
    accent: {
      orange: '#f97316',
      green: '#10b981',
      red: '#ef4444'
    },
    background: {
      light: '#f9fafb',
      white: '#ffffff',
      dark: '#1f2937'
    }
  },

  // Typography scale for sales page
  typography: {
    hero: 'text-5xl md:text-7xl lg:text-8xl font-bold',
    headline: 'text-3xl md:text-5xl font-bold',
    subheadline: 'text-xl md:text-2xl font-semibold',
    body: 'text-lg md:text-xl',
    bodySmall: 'text-base md:text-lg',
    caption: 'text-sm md:text-base'
  },

  // Spacing system
  spacing: {
    section: 'py-16 md:py-24 lg:py-32',
    sectionSmall: 'py-12 md:py-16',
    container: 'container mx-auto px-6',
    gap: 'gap-8 md:gap-12 lg:gap-16',
    gapSmall: 'gap-4 md:gap-6'
  },

  // Animation presets
  animations: {
    fadeUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    },
    stagger: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    },
    button: {
      whileHover: { scale: 1.05, y: -2 },
      whileTap: { scale: 0.95 },
      transition: { type: "spring", stiffness: 300, damping: 25 }
    }
  },

  // Button styles for sales page
  buttons: {
    primary: 'bg-gradient-to-r from-teal-700 to-cyan-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-teal-800 hover:to-cyan-700 shadow-xl hover:shadow-2xl transition-all duration-200',
    secondary: 'bg-white text-teal-700 px-8 py-4 rounded-xl font-bold text-lg border-2 border-teal-200 hover:border-teal-300 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-200',
    outline: 'border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-700 transition-all duration-200'
  },

  // Card styles
  cards: {
    default: 'bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100',
    feature: 'bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1',
    testimonial: 'bg-white rounded-xl p-6 shadow-md border border-gray-100'
  }
};

// Content structure for sales page
export const salesPageContent = {
  hero: {
    eyebrow: 'Prémium Kurzusok',
    headline: 'Fejleszd a karriered az egyetem után',
    subheadline: 'Gyakorlati kurzusok egyetemi oktatóktól, amelyek valódi készségeket adnak a modern munkaerőpiachoz.',
    cta: 'Kurzusok böngészése',
    secondaryCta: 'Tudj meg többet'
  },
  
  trust: {
    stats: [
      { value: '30+', label: 'kurzus' },
      { value: '5000+', label: 'diák' },
      { value: '4.9/5', label: 'értékelés' }
    ],
    indicators: [
      { icon: '✅', text: 'Egyetemi oktatók' },
      { icon: '🎯', text: 'Gyakorlati tudás' },
      { icon: '🏆', text: 'Bizonyított eredmények' },
      { icon: '💼', text: 'Karrierfejlesztés' }
    ]
  },

  courses: {
    featured: [
      {
        id: 'chatgpt-master',
        title: 'ChatGPT Mesterfolyamat',
        subtitle: 'Gyakorlati AI használat a munkában',
        description: 'Tanuld meg, hogyan használd hatékonyan a ChatGPT-t a napi munkádban',
        price: '29.990',
        originalPrice: '49.990',
        rating: 4.9,
        students: 1250,
        category: 'AI & Technológia',
        level: 'Kezdő-Haladó',
        duration: '8 óra',
        icon: '🤖',
        gradient: 'from-purple-500 to-pink-500',
        features: [
          'Prompt engineering technikák',
          'Automatizálási stratégiák',
          'Gyakorlati projektek',
          'Lifetime access'
        ]
      },
      {
        id: 'linkedin-strategy',
        title: 'LinkedIn Személyes Brand',
        subtitle: 'Építsd fel az online jelenléted',
        description: '0-ról profi LinkedIn profilig 30 nap alatt',
        price: '19.990',
        originalPrice: '34.990',
        rating: 4.8,
        students: 890,
        category: 'Marketing',
        level: 'Kezdő',
        duration: '6 óra',
        icon: '📈',
        gradient: 'from-blue-500 to-cyan-500',
        features: [
          'Profil optimalizálás',
          'Tartalomstratégia',
          'Networking technikák',
          'Lead generálás'
        ]
      },
      {
        id: 'email-mastery',
        title: 'Email Marketing Mastery',
        subtitle: 'Automatizált értékesítési rendszerek',
        description: 'Építs fel email kampányokat, amik eladnak',
        price: '24.990',
        originalPrice: '39.990',
        rating: 4.9,
        students: 650,
        category: 'Marketing',
        level: 'Középhaladó',
        duration: '10 óra',
        icon: '📧',
        gradient: 'from-green-500 to-emerald-500',
        features: [
          'Automation workflows',
          'Konverzió optimalizálás',
          'Segmentálási stratégiák',
          'A/B testing'
        ]
      }
    ]
  },

  social_proof: {
    totalStudents: '5000+',
    averageRating: '4.9',
    completionRate: '94%',
    coursesAvailable: '30+'
  }
};