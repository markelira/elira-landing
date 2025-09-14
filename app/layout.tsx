import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google';
import StructuredData from '@/components/StructuredData';
import CookieBanner from '@/components/CookieBanner';
import ClientProviders from '@/components/ClientProviders';
import { initializeConfig } from '@/lib/config';
import "./globals.css";

// Initialize configuration validation
initializeConfig();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://elira.hu'),
  title: "ELIRA - Olvass a vevőid gondolataiban | AI Copywriting Kurzus",
  description: "Tanuld meg az AI-alapú copywriting titkait! Buyer persona 5 perc alatt, profitnövelő szövegek, MI-sablonok. Doktorandusz oktatótól, 30 napos garanciával.",
  keywords: "AI copywriting, buyer persona, marketing automatizáció, MI sablonok, copywriting kurzus, Miskolci Egyetem, doktorandusz, Somosi Zoltán, magyar",
  authors: [{ name: "Elira Team" }],
  robots: "index, follow",
  
  // Open Graph / Facebook
  openGraph: {
    title: "Elira - 5 Ingyenes Karrierfejlesztési Anyag",
    description: "Töltsd le ingyen az 5 prémium karrierfejlesztési anyagot! Egyetemi oktatóktól készítve, azonnali hozzáférés.",
    type: "website",
    url: "https://elira.hu",
    siteName: "Elira",
    locale: "hu_HU",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Elira - 5 Ingyenes Karrierfejlesztési Anyag"
      }
    ]
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Elira - 5 Ingyenes Karrierfejlesztési Anyag",
    description: "Töltsd le ingyen az 5 prémium karrierfejlesztési anyagot! Egyetemi oktatóktól készítve.",
    images: ["/twitter-card.jpg"],
    site: "@elira_hu",
    creator: "@elira_hu"
  },
  
  // Additional meta tags
  other: {
    "theme-color": "#14b8a6",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Elira",
    "application-name": "Elira",
    "msapplication-TileColor": "#14b8a6",
    "msapplication-config": "/browserconfig.xml"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Hotjar Tracking Code for https://elira.hu */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:6519485,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `
          }}
        />
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} academic-mode antialiased`}
      >
        <ClientProviders>
          {children}
        </ClientProviders>
        <CookieBanner />
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
      </body>
    </html>
  );
}
