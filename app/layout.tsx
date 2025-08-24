import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { GoogleTagManager } from '@next/third-parties/google';
import StructuredData from '@/components/StructuredData';
import CookieBanner from '@/components/CookieBanner';
import ClientProviders from '@/components/ClientProviders';
import "./globals.css";

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
  title: "Elira - Ingyenes Karrierfejlesztési Anyagok | 5 Prémium PDF",
  description: "Töltsd le ingyen az 5 prémium karrierfejlesztési anyagot! ChatGPT promptok, LinkedIn stratégia, email marketing és még sok más. Egyetemi oktatóktól, azonnal.",
  keywords: "karrierfejlesztés, ingyenes PDF, ChatGPT promptok, LinkedIn stratégia, email marketing, TikTok növekedés, marketing automatizáció, Miskolci Egyetem, magyar",
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
        <StructuredData />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}
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
