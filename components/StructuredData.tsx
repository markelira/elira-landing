import React from 'react';

const StructuredData: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Elira",
    "url": "https://elira.hu",
    "logo": "https://elira.hu/logo.png",
    "description": "Vevőpszichológia masterclass és AI-alapú marketing képzések magyaroknak",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "HU",
      "addressRegion": "Borsod-Abaúj-Zemplén",
      "addressLocality": "Miskolc"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+36-XX-XXX-XXXX",
      "contactType": "customer service",
      "availableLanguage": "Hungarian"
    },
    "sameAs": [
      "https://facebook.com/elira.hu",
      "https://linkedin.com/company/elira-hu",
      "https://twitter.com/elira_hu"
    ],
    "makesOffer": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Course",
        "name": "3x több érdeklődő 30 nap alatt - Vevőpszichológia Masterclass",
        "description": "Online vállalkozói vevőpszichológia kurzus AI eszközökkel"
      },
      "availability": "https://schema.org/LimitedAvailability",
      "validThrough": "2024-10-05"
    }
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Elira",
    "url": "https://elira.hu",
    "description": "3x több érdeklődő 30 nap alatt - Vevőpszichológia masterclass AI eszközökkel",
    "inLanguage": "hu",
    "mainEntity": {
      "@type": "Course",
      "name": "Online vállalkozói vevőpszichológia kurzus"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://elira.hu/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const educationalData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Online vállalkozói vevőpszichológia kurzus",
    "description": "Megérted, mit akar valójában a vevőd, és ezzel többet adsz el (akár drágábban is) anélkül, hogy bármit újat kellene fejlesztened. 5 modul, 17 videó lecke + PDF sablonok.",
    "provider": {
      "@type": "Organization",
      "name": "Elira",
      "sameAs": "https://elira.hu"
    },
    "courseMode": "online",
    "inLanguage": "hu",
    "isAccessibleForFree": false,
    "numberOfCredits": 17,
    "timeRequired": "PT55M",
    "availableLanguage": "hu",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/LimitedAvailability",
      "validThrough": "2024-10-05",
      "category": "masterclass"
    },
    "hasPart": [
      {
        "@type": "CourseInstance",
        "name": "Alkoss hidat közted, és a vevő között - hogyan érintsd meg a vevődet",
        "description": "A kommunikációdban mindig te vagy a főhős, nem a vevő. Találd meg a közös nevezőt a vevőddel.",
        "timeRequired": "PT4M",
        "numberOfCredits": 1
      },
      {
        "@type": "CourseInstance",
        "name": "Hogyan állítsd be a kommunikációd, hogy csak azok hallják, akik fizetni fognak",
        "description": "Pontos célzás és célcsoport meghatározás AI eszközökkel.",
        "timeRequired": "PT12M",
        "numberOfCredits": 3
      },
      {
        "@type": "CourseInstance",
        "name": "Ha nem ismered a vevődet, elveszíted a piacot térképezd fel azonnal!",
        "description": "Buyer persona készítés és piackutatás AI eszközökkel.",
        "timeRequired": "PT9M",
        "numberOfCredits": 1
      },
      {
        "@type": "CourseInstance",
        "name": "Hogyan írd úgy az üzeneted, hogy először érezze, aztán értse meg – és végül vásároljon",
        "description": "Pszichológiai triggerek és érzelmi copywriting technikák.",
        "timeRequired": "PT12M",
        "numberOfCredits": 5
      },
      {
        "@type": "CourseInstance",
        "name": "Hogyan spórolj órákat az MI-val – és érj be elsőként a piacra",
        "description": "Gyakorlati AI eszközök és generátorok használata.",
        "timeRequired": "PT18M",
        "numberOfCredits": 7
      },
      {
        "@type": "LearningResource",
        "name": "Letölthető PDF-ek / sablonok",
        "description": "7 gyakorlati sablon és útmutató - azonnal letölthető és használható generátorok.",
        "learningResourceType": "template"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(educationalData)
        }}
      />
    </>
  );
};

export default StructuredData;