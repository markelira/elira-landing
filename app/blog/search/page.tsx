'use client';

import { PremiumHeader } from '@/components/PremiumHeader';
import { PremiumFooter } from '@/components/PremiumFooter';
import { ScrollProgress } from '@/components/ScrollProgress';
import { SearchBar } from '@/components/blog/SearchBar';
import { PostGrid } from '@/components/blog/PostGrid';
import { EmptyState } from '@/components/blog/EmptyState';
import { searchPosts } from '@/lib/blog-data/sample-posts';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Search } from 'lucide-react';
import { Suspense } from 'react';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = query ? searchPosts(query) : [];

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

      {/* Search Header */}
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4">
              <Search className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Keresés
            </h1>

            {query && (
              <p className="text-lg md:text-xl text-white/80">
                Találatok erre: <span className="font-semibold">"{query}"</span>
              </p>
            )}

            <div className="pt-4">
              <SearchBar />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {!query ? (
            <EmptyState
              title="Kezdj el keresni"
              description="Írj be egy kulcsszót a keresőbe, hogy megtaláld a releváns cikkeket."
            />
          ) : results.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <p className="text-gray-600">
                  <span className="font-semibold">{results.length}</span> találat
                </p>
              </motion.div>
              <PostGrid posts={results} showFeatured={false} />
            </>
          ) : (
            <EmptyState
              title="Nincs találat"
              description={`Nem találtunk cikket erre a kifejezésre: "${query}". Próbálj meg más kulcsszavakat használni!`}
            />
          )}
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Betöltés...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
