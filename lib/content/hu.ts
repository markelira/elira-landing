export const content = {
  hero: {
    title: "Tanulj ingyen.",
    titleHighlight: "alkalmazd holnap.",
    subtitle: "Gyakorlati tudás egyetemi oktatóktól. 5 prémium anyag vár rád teljesen ingyen.",
    cta: "Kezdjük El →"
  },
  
  navbar: {
    items: [
      { label: "Ingyenes kurzus anyag", href: "#tripwire" },
      { label: "Vélemények", href: "#testimonials" }
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
        longDescription: 'Fedezd fel, hogyan alakítja át a ChatGPT a marketingedet: gyorsabb tartalomgyártás, ütősebb kampányok, pontosabb célzás. Ez a sablongyűjtemény azonnal bevethető, gyakorlati példákkal. Az MI végre kézzel fogható előnyként dolgozik neked.',
        benefits: [
          'Azonnal használható prompt sablonok',
          'Tartalom, hirdetés, e-mail és SEO kategóriákban',
          'Példákkal és magyarázatokkal illusztrálva',
        ],
        preview: {
          thumbnail: '/Chagpt-prompt-pdf-preview.png',
          pages: 21,
          fileSize: '302 KB',
          screenshots: ['/Chagpt-prompt-pdf-preview.png'],
          sampleContent: '„Sok marketinges tisztában van a ChatGPT létezésével, de nehezen tudja elérni a valóban értékes kimeneteket. Az útmutató áthidalja ezt a szakadékot. A strukturált promptok biztosításával lehetővé teszi még a kevésbé tapasztalt marketingesek számára is, hogy magas színvonalú eredményeket érjenek el.”'
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
        longDescription: 'Egy hónap alatt teljesen új szintre emelheted LinkedIn jelenlétedet. Kész tartalomötletek, napi feladatok és bevált stratégiák, amikkel nemcsak követőket, hanem üzleti lehetőségeket is szerzel. Nincs több kifogás, csak növekedés.',
        benefits: [
          '30 napos, lépésről lépésre felépített növekedési terv',
          'Kipróbált poszt- és aktivitási ötletek LinkedIn-re',
          'Több elérés, több kapcsolat, több üzlet',
        ],
        preview: {
          thumbnail: '/linkedin.png',
          pages: 21,
          fileSize: '310 KB',
          screenshots: ['/linkedin.png'],
          sampleContent: '"A LinkedIn algoritmusa és a felhasználói viselkedés folyamatosan fejlődik, de bizonyos tartalomformátumok kiemelkedően jól teljesítenek:.."'
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
        subtitle: 'Stratégiai tippek a konverzió növelésére',
        description: 'Bevált email sablonok minden helyzethez',
        longDescription: 'Az e-mail marketing akkor működik, ha nem kell mindig nulláról indulnod. Ebben a sablonkönyvtárban minden helyzetre találsz bevált szövegeket: hírlevelektől az értékesítő e-mailekig. Gyors indítás, profi megjelenés, mérhető eredmények.',
        benefits: [
          'A/B tesztelt verziókat is tartalmaz',
          'Magyar piacra optimalizált hangnem',
          '50+ azonnal használható e-mail sablon'
        ],
        preview: {
          thumbnail: '/email-marketing.png',
          pages: 31,
          fileSize: '439 KB',
          screenshots: ['/email-marketing.png'],
          sampleContent: '"A 20 legmagasabb konverziót eredményező e-mail kampánytípus összefoglalója: az alábbi kampánytípusok mindegyike specifikus célt szolgál az ügyfélút különböző szakaszaiban.."'
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
        longDescription: 'A TikTok algoritmus nem titok többé: megtanulhatod, hogyan turbózd fel az eléréseid. Az útmutató gyakorlati taktikákat ad, hogy tartalmaid gyorsabban szárnyaljanak. Így nem csak nézőid, hanem követőid és ügyfeleid is lesznek.',
        benefits: [
          'Magyar piacra szabott TikTok stratégiák',
          'Algoritmus-barát tippek a maximális eléréshez',
          'Virális tartalomformátumok példákkal',
        ],
        preview: {
          thumbnail: '/tiktok.png',
          pages: 11,
          fileSize: '183 KB',
          screenshots: ['/tiktok.png'],
          sampleContent: '"Az algoritmus három fő tényezőt vesz figyelembe a videók rangsorolásakor: 1. Felhasználói interakciók: Ide tartoznak a..."'
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
        longDescription: 'Az automatizáció nem luxus, hanem alapfeltétel. Ezekkel a vizuális tervezőkkel átláthatóvá és egyszerűvé válik a marketing folyamataid építése. Több ügyfél, kevesebb manuális munka – automatizáltan.',
        benefits: [
          'Könnyen testreszabható workflow sablonok',
          'Automatizált ügyfélkezelés, lead nurturing és utánkövetés',
          'Idő- és költségmegtakarítás, skálázható növekedés',
        ],
        preview: {
          thumbnail: '/marketing-auto.png',
          pages: 19,
          fileSize: '259 KB',
          screenshots: ['/marketing-auto.png'],
          sampleContent: 'Alkalmazások és Eszközök: ● Marketing automatizálási platformok: az ...'
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
        title: "A Te Véleményed Alakítja",
        description: "Minden letöltés után kérjük a visszajelzésed. Így tudjuk, mi működik igazán - és mit kell még jobbá tennünk."
      },
      {
        icon: "award",
        title: "Őszinteség a Hypeolás Helyett",
        description: "Nem tökéletes anyagokat ígérünk - hanem olyanokat, amik a közösség segítségével folyamatosan javulnak."
      },
      {
        icon: "rocket",
        title: "Élő Tartalmak, Élő Eredmények",
        description: "A visszajelzések alapján hetente frissítjük az anyagokat. Így mindig a legaktuálisabb tudást kapod."
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
    button: "Vásárlás és azonnali kezdés",
    privacy: "🔒 100% biztonságos • Nem küldünk spam-et • Bármikor leiratkozhatsz"
  },
  
  footer: {
    copyright: "© 2024 Elira. Minden jog fenntartva.",
    links: [
      { label: "Adatvédelmi Tájékoztató", href: "/privacy" },
      { label: "Általános Szerződési Feltételek", href: "/terms" },
      { label: "Kapcsolat", href: "mailto:info@elira.hu" }
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