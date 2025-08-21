export const content = {
  hero: {
    title: "Tanulj Ingyen.",
    titleHighlight: "Alkalmazd Holnap.",
    subtitle: "Gyakorlati tudás egyetemi oktatóktól. 5 prémium anyag vár rád teljesen ingyen.",
    cta: "Kezdjük El →"
  },
  
  navbar: {
    items: [
      { label: "Kezdőlap", href: "#hero" },
      { label: "Ingyenes Anyagok", href: "#lead-magnets" },
      { label: "Miért Mi?", href: "#value" },
      { label: "Csatlakozz", href: "#cta" }
    ]
  },
  
  magnets: {
    title: "5 Prémium Anyag Teljesen Ingyen",
    subtitle: "Részletes betekintés minden PDF-be - válaszd ki, melyik érdekel",
    items: [
      {
        id: 'chatgpt-prompts',
        title: 'ChatGPT Prompt Sablon Gyűjtemény',
        subtitle: 'Marketingeseknek',
        description: '100+ bevált prompt template kategóriákban rendszerezve',
        longDescription: 'Szakértők által összeállított prompt gyűjtemény, amely tartalmazza a leghatékonyabb ChatGPT utasításokat marketing célokra. Minden template kipróbált és bevált a gyakorlatban.',
        benefits: [
          'Azonnali használatra kész promptok',
          'Kategóriákban rendszerezve (tartalomkészítés, hirdetések, elemzés)',
          'Példákkal és magyarázatokkal illusztrálva',
          'Időt spórolsz a prompt-írásban'
        ],
        preview: {
          thumbnail: '/Chagpt-prompt-pdf-preview.png',
          pages: 21,
          fileSize: '302 KB',
          screenshots: ['/Chagpt-prompt-pdf-preview.png'],
          sampleContent: 'Minta prompt: "Írj egy meggyőző Facebook hirdetést [termék] számára, amely kiemeli [előny] és célozza [célcsoport]."'
        },
        metadata: {
          lastUpdated: '2024.08'
        },
        icon: '🤖',
        gradient: 'from-purple-500 to-pink-500',
        tags: ['AI', 'Marketing', '2024'],
        downloadUrl: '/downloads/chatgpt-prompts.pdf'
      },
      {
        id: 'linkedin-calendar',
        title: '30 Napos LinkedIn Növekedési Naptár',
        subtitle: 'Napi feladatokkal',
        description: '0-ról 1000 követőig egy hónap alatt strukturált tervvel',
        longDescription: 'Naponta 15 perces feladatokkal segít felfejleszteni LinkedIn profilod és növelni a követők számát. Minden napra konkrét teendők, template-ek és mérési módszerek.',
        benefits: [
          'Napi 15 perces feladatok',
          'Poszt template-ek és hashtag stratégia',
          'Networking technikák és üzenetminták',
          'Mérési módszerek a növekedés követésére'
        ],
        preview: {
          thumbnail: '/linkedin.png',
          pages: 21,
          fileSize: '310 KB',
          screenshots: ['/linkedin.png'],
          sampleContent: '1. Nap: Profil optimalizálás - "Írj be 3 kulcsszót a headline-ba ami szerint találni akarnak"'
        },
        metadata: {
          lastUpdated: '2024.08'
        },
        icon: '📈',
        gradient: 'from-blue-500 to-cyan-500',
        tags: ['LinkedIn', 'Growth', 'Social'],
        downloadUrl: '/downloads/linkedin-calendar.pdf'
      },
      {
        id: 'email-templates',
        title: 'Email Marketing Sablon Könyvtár',
        subtitle: '20 high-converting template',
        description: 'Bevált email sablonok minden helyzethez',
        longDescription: '20 tesztelten magas konverziós arányú email template különböző célokhoz: üdvözlő sorozat, értékesítés, visszaszerző kampányok. Mind magyar nyelvre optimalizálva.',
        benefits: [
          'Tárgy sor variációkkal minden template-hez',
          'A/B tesztelt verziókat is tartalmaz',
          'Magyar piacra optimalizált hangnem',
          'Conversion rate benchmarkok mellékletben'
        ],
        preview: {
          thumbnail: '/email-marketing.png',
          pages: 31,
          fileSize: '439 KB',
          screenshots: ['/email-marketing.png'],
          sampleContent: 'Welcome Email: "Üdvözöljük a [Vállalat] családjában! Itt a következő lépés..." (CVR: 24%)'
        },
        metadata: {
          lastUpdated: '2024.07'
        },
        icon: '📧',
        gradient: 'from-green-500 to-emerald-500',
        tags: ['Email', 'Templates', 'Conversion'],
        downloadUrl: '/downloads/email-templates.pdf'
      },
      {
        id: 'tiktok-guide',
        title: 'TikTok Algoritmus Hack Guide',
        subtitle: 'Magyaroknak',
        description: 'Hogyan menjél virálisra a magyar TikTok-on',
        longDescription: 'A magyar TikTok algoritmus működésére épülő stratégia, amely megmutatja, hogyan érj el 100K+ megtekintést. Tartalmaz trending hashtag listát és időzítési tippeket.',
        benefits: [
          'Magyar trendi hashtag-ek heti frissítéssel',
          'Optimális postálási időpontok Magyarországon',
          'Virális tartalomformátumok példákkal',
          'Engagement hack-ek a koment szekcióhoz'
        ],
        preview: {
          thumbnail: '/tiktok.png',
          pages: 11,
          fileSize: '183 KB',
          screenshots: ['/tiktok.png'],
          sampleContent: 'Magyar Trending: #fyp #magyar #viralvideo - Közzététel: Hétfő 19:00-21:00 (legjobb reach)'
        },
        metadata: {
          lastUpdated: '2024.08'
        },
        icon: '🎬',
        gradient: 'from-pink-500 to-rose-500',
        tags: ['TikTok', 'Viral', 'Magyar'],
        downloadUrl: '/downloads/tiktok-guide.pdf'
      },
      {
        id: 'automation-workflows',
        title: 'Marketing Automatizáció Tervezők',
        subtitle: 'Munkafolyamat sablonok',
        description: 'Kész workflow-k ami 10+ órát spórolnak hetente',
        longDescription: 'Automatizációs workflow sablonok a legnépszerűbb eszközökhöz (Zapier, Make, HubSpot). Email, social media és lead generation folyamatok automatizálásához.',
        benefits: [
          'Kész Zapier és Make.com workflow-k',
          'Email drip campaign automatizálás',
          'Social media scheduling rendszerek',
          'Lead scoring és nurturing folyamatok'
        ],
        preview: {
          thumbnail: '/marketing-auto.png',
          pages: 19,
          fileSize: '259 KB',
          screenshots: ['/marketing-auto.png'],
          sampleContent: 'Workflow példa: Új lead → CRM-be mentés → Welcome email → Slack értesítés → Follow-up feladat'
        },
        metadata: {
          lastUpdated: '2024.08'
        },
        icon: '⚡',
        gradient: 'from-orange-500 to-red-500',
        tags: ['Automation', 'Workflow', 'Tools'],
        downloadUrl: '/downloads/automation-workflows.pdf'
      }
    ]
  },
  
  value: {
    title: "Miért adjuk ingyen?",
    subtitle: "Mert hiszünk benne, hogy a tudás mindenkié",
    points: [
      {
        icon: "sparkles",
        title: "Hiszünk a tudás demokratizálásában",
        description: "Mindenki megérdemli a minőségi oktatást, függetlenül a pénztárcájától."
      },
      {
        icon: "award",
        title: "Egyetemi minőség garantálva",
        description: "A Miskolci Egyetem oktatói által készített, valódi értéket képviselő anyagok."
      },
      {
        icon: "rocket",
        title: "Azonnal alkalmazható tudás",
        description: "Nem elméleti szárazanyag - gyakorlati tippek, amiket holnap használhatsz."
      }
    ]
  },
  
  social: {
    title: "Csatlakozz a közösséghez",
    counter: "ember már velünk tart",
    recentActivity: "Legutóbbi aktivitások",
    trustBadge: "Egyetemi szintű oktatás", // Generic claim until partnership verified
    activity: [], // Will be populated from Firebase with real activities
    // Example activities for display purposes only
    exampleActivities: [
      { 
        label: "Példa:",
        name: "Anna K.", 
        action: "csatlakozott",
        avatar: "👤" 
      }
    ]
  },
  
  finalCta: {
    title: "Ne maradj le a lehetőségről!",
    subtitle: "Csatlakozz {count} magyarhoz, akik már elkezdték fejleszteni magukat",
    subtitleNoMembers: "Légy az első 100 tag között!",
    placeholder: "email@példa.hu",
    button: "Csatlakozom",
    privacy: "🔒 100% biztonságos • Nem küldünk spam-et • Bármikor leiratkozhatsz"
  },
  
  footer: {
    copyright: "© 2024 Elira. Minden jog fenntartva.",
    links: [
      { label: "Adatkezelési Tájékoztató", href: "/privacy" },
      { label: "Felhasználási Feltételek", href: "/terms" },
      { label: "Kapcsolat", href: "/contact" }
    ]
  },
  
  emailCapture: {
    modal: {
      title: "Még egy lépés a(z) {magnetTitle} megszerzéséhez",
      subtitle: "Add meg az adataidat, és azonnal küldjük emailben!",
      fields: {
        email: {
          label: "Email cím",
          placeholder: "neve@email.com",
          required: true
        },
        name: {
          label: "Teljes név",
          placeholder: "Kovács János",
          required: true
        },
        job: {
          label: "Munkakör",
          options: [
            "Marketing",
            "IT/Fejlesztő",
            "HR",
            "Pénzügy",
            "Értékesítés",
            "Vezetői pozíció",
            "Diák",
            "Egyéb"
          ]
        },
        education: {
          label: "Legmagasabb végzettség",
          options: [
            "Középiskola",
            "Főiskola",
            "Egyetem (BSc)",
            "Mesterszint (MSc)",
            "PhD"
          ]
        }
      },
      cta: "Küldés és Letöltés",
      loading: "Feldolgozás...",
      success: {
        title: "Sikeres!",
        message: "Elküldtük az emailt! Nézd meg a spam mappát is.",
        close: "Bezárás"
      },
      error: {
        title: "Hiba történt",
        message: "Próbáld meg újra néhány perc múlva.",
        retry: "Újra"
      }
    }
  }
};