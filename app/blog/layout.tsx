import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Elira | Marketing & Growth Insights',
  description: 'Fedezd fel a legújabb trendeket, stratégiákat és bevált módszereket a digitális marketing és growth terén. Valódi tapasztalatok, mérhető eredmények.',
  keywords: ['marketing blog', 'digitális marketing', 'growth hacking', 'analytics', 'stratégia', 'Magyarország'],
  openGraph: {
    title: 'Blog - Elira | Marketing & Growth Insights',
    description: 'Fedezd fel a legújabb trendeket, stratégiákat és bevált módszereket a digitális marketing és growth terén.',
    type: 'website',
    locale: 'hu_HU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Elira | Marketing & Growth Insights',
    description: 'Fedezd fel a legújabb trendeket, stratégiákat és bevált módszereket a digitális marketing és growth terén.',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
