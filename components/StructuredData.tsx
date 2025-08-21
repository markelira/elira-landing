import React from 'react';

const StructuredData: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Elira",
    "url": "https://elira.hu",
    "logo": "https://elira.hu/logo.png",
    "description": "Ingyenes karrierfejlesztési anyagok és képzések magyaroknak",
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
    "offers": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "DigitalDocument",
        "name": "5 Ingyenes Karrierfejlesztési Anyag",
        "description": "Prémium PDF gyűjtemény ChatGPT promptokkal, LinkedIn stratégiával és marketing tippekkel"
      },
      "price": "0",
      "priceCurrency": "HUF",
      "availability": "https://schema.org/InStock"
    }
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Elira",
    "url": "https://elira.hu",
    "description": "Ingyenes karrierfejlesztési anyagok letöltése",
    "inLanguage": "hu",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://elira.hu/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const educationalData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Ingyenes Karrierfejlesztési Anyagok",
    "description": "5 prémium PDF anyag karrierfejlesztéshez: ChatGPT promptok, LinkedIn stratégia, email marketing, TikTok növekedés és marketing automatizáció",
    "provider": {
      "@type": "Organization",
      "name": "Elira",
      "sameAs": "https://elira.hu"
    },
    "courseMode": "online",
    "inLanguage": "hu",
    "isAccessibleForFree": true,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "HUF",
      "category": "free"
    },
    "hasPart": [
      {
        "@type": "LearningResource",
        "name": "ChatGPT Prompt Sablon Gyűjtemény",
        "description": "100+ bevált prompt template marketingeseknek"
      },
      {
        "@type": "LearningResource", 
        "name": "30 Napos LinkedIn Növekedési Naptár",
        "description": "Napi feladatok 0-ról 1000 követőig"
      },
      {
        "@type": "LearningResource",
        "name": "Email Marketing Sablon Könyvtár", 
        "description": "20 high-converting email template"
      },
      {
        "@type": "LearningResource",
        "name": "TikTok Algoritmus Hack Guide",
        "description": "Hogyan menjél virálisra Magyarországon"
      },
      {
        "@type": "LearningResource",
        "name": "Marketing Automatizáció Tervezők",
        "description": "Munkafolyamat sablonok időspóroláshoz"
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