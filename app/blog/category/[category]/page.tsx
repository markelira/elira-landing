'use client';

import { PremiumHeader } from '@/components/PremiumHeader';
import { PremiumFooter } from '@/components/PremiumFooter';
import { ScrollProgress } from '@/components/ScrollProgress';
import { BlogHero } from '@/components/blog/BlogHero';
import { PostGrid } from '@/components/blog/PostGrid';
import { CategoryBadge } from '@/components/blog/CategoryBadge';
import { EmptyState } from '@/components/blog/EmptyState';
import { getPostsByCategory, getAllCategories, getCategoryTranslation } from '@/lib/blog-data/sample-posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { use } from 'react';

// Category descriptions
const categoryDescriptions: Record<string, string> = {
  'Marketing': 'Fedezd fel a legújabb marketing stratégiákat, trendeket és bevált módszereket a digitális térben.',
  'Strategy': 'Tanuld meg, hogyan építs hatékony stratégiákat, amelyek valós üzleti eredményeket hoznak.',
};

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: rawCategory } = use(params);

  // Decode and capitalize category
  const category = decodeURIComponent(rawCategory);
  const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1);

  const allCategories = getAllCategories();
  const categoryExists = allCategories.some(
    c => c.toLowerCase() === category.toLowerCase()
  );

  if (!categoryExists) {
    notFound();
  }

  const posts = getPostsByCategory(capitalizedCategory);
  const description = categoryDescriptions[capitalizedCategory] || 'Cikkek ebben a kategóriában.';
  const translatedCategory = getCategoryTranslation(capitalizedCategory);

  return (
    <div className="min-h-screen bg-white">
      <PremiumHeader />
      <ScrollProgress />

      {/* Back to Blog Link */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Vissza a bloghoz
          </Link>
        </div>
      </div>

      {/* Category Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-br from-[#16222F] via-[#1e2a37] to-[#252f3d] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex justify-center mb-6">
              <CategoryBadge category={capitalizedCategory} size="lg" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              {translatedCategory}
            </h1>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed">
              {description}
            </p>

            <div className="pt-4 text-white/60">
              <span className="font-semibold">{posts.length}</span> cikk található ebben a kategóriában
            </div>
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {posts.length > 0 ? (
            <PostGrid posts={posts} showFeatured={false} />
          ) : (
            <EmptyState
              title="Még nincsenek cikkek"
              description="Ebben a kategóriában jelenleg nincsenek cikkek. Nézz vissza később!"
            />
          )}
        </div>
      </section>

      {/* Other Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">További témakörök</h2>
          <div className="flex flex-wrap gap-3">
            {allCategories
              .filter(cat => cat.toLowerCase() !== category.toLowerCase())
              .map((cat) => (
                <Link key={cat} href={`/blog/category/${cat.toLowerCase()}`}>
                  <CategoryBadge category={cat} size="lg" />
                </Link>
              ))}
          </div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}
