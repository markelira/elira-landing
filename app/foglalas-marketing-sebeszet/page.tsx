import React from 'react';
import { Metadata } from 'next';
import { MarketingSebesztProvider } from '@/contexts/MarketingSebesztContext';
import BookingPage from '@/components/lead-magnet/BookingPage';

export const metadata: Metadata = {
  title: 'Időpontfoglalás - Marketing Sebészet | Elira',
  description: 'Válassz egy időpontot az ingyenes 30 perces Marketing Sebészet konzultációdhoz. Online, Zoom-on keresztül.',
  keywords: [
    'időpontfoglalás',
    'marketing konzultáció',
    'online időpontfoglalás',
    'marketing sebészet időpont',
    'zoom konzultáció'
  ],
  openGraph: {
    title: 'Időpontfoglalás - Marketing Sebészet',
    description: 'Válassz egy időpontot az ingyenes konzultációdhoz. 30 perc alatt konkrét megoldásokat kapsz!',
    type: 'website',
    locale: 'hu_HU',
    siteName: 'Elira',
  },
  robots: {
    index: false, // Don't index booking pages
    follow: true,
  },
};

interface BookingPageProps {
  searchParams: Promise<{
    lead?: string;
    name?: string;
  }>;
}

export default async function FoglalasMarketingSebesztPage({ searchParams }: BookingPageProps) {
  const params = await searchParams;
  const leadId = params.lead;
  const leadName = params.name;

  return (
    <MarketingSebesztProvider>
      <div className="min-h-screen">
        {/* Structured Data for Booking */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ReserveAction",
              "object": {
                "@type": "Event",
                "name": "Marketing Sebészet Konzultáció",
                "description": "30 perces ingyenes marketing konzultáció",
                "duration": "PT30M",
                "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
                "location": {
                  "@type": "VirtualLocation",
                  "url": "https://zoom.us"
                }
              },
              "agent": {
                "@type": "Organization",
                "name": "Elira"
              }
            })
          }}
        />

        <main>
          <BookingPage 
            leadId={leadId}
            leadName={leadName}
          />
        </main>
      </div>
    </MarketingSebesztProvider>
  );
}