'use client';

import type { Metadata } from 'next';
import { PremiumHeader } from '@/components/PremiumHeader';
import { PremiumFooter } from '@/components/PremiumFooter';
import { ScrollProgress } from '@/components/ScrollProgress';
import { BlogHero } from '@/components/blog/BlogHero';
import { PostGrid } from '@/components/blog/PostGrid';
import { CategoryBadge } from '@/components/blog/CategoryBadge';
import { samplePosts, getAllCategories, getCategoryTranslation } from '@/lib/blog-data/sample-posts';
import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = getAllCategories();

  // Filter posts by category if one is selected
  const filteredPosts = selectedCategory
    ? samplePosts.filter(post => post.category === selectedCategory)
    : samplePosts;

  return (
    <div className="min-h-screen bg-white">
      <PremiumHeader />
      <ScrollProgress />

      {/* Hero Section */}
      <BlogHero
        title="Tudás, ami növeli a vállalkozásod"
        subtitle="Gyakorlati cikkek, bevált stratégiák és adatvezérelt megoldások magyar vállalkozásoknak. Minden hét új tartalom, amit tényleg használni tudsz."
        showSearch={false}
      />

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Témakörök</h2>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Összes megtekintése
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                  className={`
                    transition-all duration-200
                    ${selectedCategory === category ? 'scale-110' : 'hover:scale-105'}
                  `}
                >
                  <CategoryBadge category={category} size="lg" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8"
            >
              <p className="text-gray-600">
                <span className="font-semibold">{filteredPosts.length}</span> cikk található a(z){' '}
                <span className="font-semibold">{getCategoryTranslation(selectedCategory)}</span> kategóriában
              </p>
            </motion.div>
          )}

          {/* Posts Grid */}
          <PostGrid posts={filteredPosts} showFeatured={!selectedCategory} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Készen állsz a növekedésre?
            </h2>
            <p className="text-lg text-gray-600">
              Foglalj egy díjmentes konzultációt, és fedezd fel, hogyan segíthetünk elérni a céljaidat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dijmentes-audit">
                <button className="px-8 py-4 bg-gray-900 hover:bg-black text-white font-semibold rounded-full transition-all duration-200 hover:scale-105">
                  Díjmentes audit kérése
                </button>
              </Link>
              <Link href="/masterclass">
                <button className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-full border-2 border-gray-900 transition-all duration-200 hover:scale-105">
                  Masterclassok megtekintése
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}
