import type { Metadata } from 'next';
import { getAllCategories } from '@/lib/blog-data/sample-posts';

type Props = {
  params: Promise<{ category: string }>;
};

const categoryDescriptions: Record<string, string> = {
  'Marketing': 'Fedezd fel a legújabb marketing stratégiákat, trendeket és bevált módszereket a digitális térben.',
  'Strategy': 'Tanuld meg, hogyan építs hatékony stratégiákat, amelyek valós üzleti eredményeket hoznak.',
  'Analytics': 'Merülj el az adatok világában és tanulj meg adatvezérelt döntéseket hozni.',
  'Growth': 'Ismerd meg a growth hacking technikákat és gyors növekedési módszereket.',
  'Leadership': 'Fejleszd vezetői készségeidet és tanulj meg hatékonyan irányítani csapatokat.',
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: rawCategory } = await params;
  const category = decodeURIComponent(rawCategory);
  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);

  const allCategories = getAllCategories();
  const categoryExists = allCategories.some(
    c => c.toLowerCase() === category.toLowerCase()
  );

  if (!categoryExists) {
    return {
      title: 'Kategória nem található - Elira Blog',
    };
  }

  const description = categoryDescriptions[capitalizedCategory] || 'Cikkek ebben a kategóriában.';

  return {
    title: `${capitalizedCategory} - Elira Blog`,
    description: description,
    keywords: [capitalizedCategory, 'marketing', 'blog', 'Magyarország', 'Elira'],
    openGraph: {
      title: `${capitalizedCategory} - Elira Blog`,
      description: description,
      type: 'website',
      locale: 'hu_HU',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${capitalizedCategory} - Elira Blog`,
      description: description,
    },
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
