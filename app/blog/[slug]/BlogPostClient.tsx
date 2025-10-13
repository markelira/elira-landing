'use client';

import { PremiumHeader } from '@/components/PremiumHeader';
import { PremiumFooter } from '@/components/PremiumFooter';
import { CategoryBadge } from '@/components/blog/CategoryBadge';
import { AuthorBio } from '@/components/blog/AuthorBio';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { ScrollProgress } from '@/components/ScrollProgress';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { samplePosts, getRelatedPosts } from '@/lib/blog-data/sample-posts';
import { blogLayouts, blogTypography } from '@/lib/blog-design-tokens';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { use, useEffect, useState } from 'react';
import Script from 'next/script';

// Helper function to add IDs to headings in HTML
function addHeadingIds(html: string): string {
  if (!html) return '';

  return html.replace(/<(h[23])>(.*?)<\/\1>/g, (match, tag, content) => {
    const id = content
      .replace(/<[^>]*>/g, '') // Remove any HTML tags
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes

    return `<${tag} id="${id}">${content}</${tag}>`;
  });
}

// Helper function to extract headings from HTML
function extractHeadings(html: string) {
  if (!html) return [];

  const headings: { id: string; title: string; level: number }[] = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  doc.querySelectorAll('h2, h3').forEach((heading) => {
    const level = parseInt(heading.tagName[1]);
    const title = heading.textContent || '';
    const id = heading.id || title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes

    headings.push({ id, title, level });
  });

  return headings;
}

export function BlogPostClient({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const post = samplePosts.find(p => p.slug === slug);
  const [mdxContent, setMdxContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tocItems, setTocItems] = useState<{ id: string; title: string; level: number }[]>([]);

  useEffect(() => {
    // Fetch MDX content from API route
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/blog/${slug}`);
        if (response.ok) {
          const data = await response.json();

          // Add IDs to headings
          const processedContent = addHeadingIds(data.content);
          setMdxContent(processedContent);

          // Extract headings for TOC
          const headings = extractHeadings(processedContent);
          setTocItems(headings);
        }
      } catch (error) {
        console.error('Error fetching blog content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [slug]);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link másolva a vágólapra!');
    }
  };

  // Generate JSON-LD structured data for Google rich results
  const baseUrl = 'https://www.elira.hu';
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  const imageUrl = post.featuredImage.startsWith('http')
    ? post.featuredImage
    : `${baseUrl}${post.featuredImage}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [imageUrl],
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.publishedAt).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.title,
      url: post.author.linkedin || baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Elira',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/elira-logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    articleSection: post.category,
    keywords: `${post.category}, marketing, stratégia, növekedés, KKV, magyarország`,
    inLanguage: 'hu-HU',
    url: postUrl,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD Structured Data for SEO */}
      <Script
        id="blog-post-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        strategy="beforeInteractive"
      />

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

      {/* Article Hero */}
      <article>
        <header className="relative pt-12 pb-8 bg-gradient-to-b from-gray-50 to-white">
          <div className={blogLayouts.contentColumn}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Category */}
              <CategoryBadge category={post.category} href={`/blog/category/${post.category.toLowerCase()}`} size="lg" />

              {/* Title */}
              <h1 className={`${blogTypography.postTitle} text-gray-900`}>
                {post.title}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(post.publishedAt).toLocaleDateString('hu-HU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{post.readTime}</span>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 text-sm hover:text-blue-600 transition-colors ml-auto"
                >
                  <Share2 className="w-4 h-4" />
                  Megosztás
                </button>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Featured Image */}
        <div className={blogLayouts.wideContent}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden my-12"
          >
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </div>

        {/* Article Content with Sidebar */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="blog-content max-w-none">
                  {isLoading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                      <p className="mt-4 text-gray-600">Tartalom betöltése...</p>
                    </div>
                  ) : mdxContent ? (
                    <div className="blog-content" dangerouslySetInnerHTML={{ __html: mdxContent }} />
                  ) : (
                    /* Fallback to sample content if no MDX found */
                    <>
                      <section id="introduction">
                        <h2 className={blogTypography.h2}>Bevezetés</h2>
                        <p>
                          A digitális marketing világában az adatok jelentik a kulcsot a sikerhez.
                          De mit kezdjünk ezekkel az adatokkal? Hogyan alakítsuk át őket konkrét,
                          mérhető eredményekké? Ebben a cikkben bemutatjuk azokat a bevált módszereket,
                          amelyekkel jelentősen növelheted a konverziós rátádat.
                        </p>
                        <p>
                          Az elmúlt években több mint 100 céggel dolgoztunk együtt, és láttuk,
                          hogy mi működik valóban. Az alábbiakban megosztjuk veled ezeket a tapasztalatokat.
                        </p>
                      </section>

                      <section id="problem">
                        <h2 className={blogTypography.h2}>A probléma azonosítása</h2>
                        <p>
                          A legtöbb cég küzd azzal, hogy megértse, miért nem konvertálnak a látogatók.
                          A leggyakoribb problémák:
                        </p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          <li>Nem egyértelmű az értékajánlat</li>
                          <li>Túl sok lépés van a konverzióig</li>
                          <li>A landing page nem mobil-optimalizált</li>
                          <li>Hiányzó vagy nem megfelelő call-to-action</li>
                          <li>Nincs social proof (bizonyíték)</li>
                        </ul>
                      </section>

                      <section id="conclusion">
                        <h2 className={blogTypography.h2}>Összegzés</h2>
                        <p>
                          Ez egy példa cikk tartalom. Teljes tartalmért hozz létre egy .mdx fájlt a content/blog mappában.
                        </p>
                      </section>
                    </>
                  )}
                </div>

                {/* CTA Box */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 my-12">
                  <h3 className="text-2xl font-bold text-white mb-4">Készen állsz a következő lépésre?</h3>
                  <p className="text-white/90 mb-6 text-lg">
                    Foglalj egy díjmentes konzultációt, és fedezd fel, hogyan növelheted
                    az értékesítésedet egyedi stratégiával.
                  </p>
                  <Link href="/dijmentes-audit">
                    <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-105">
                      Díjmentes audit kérése
                    </button>
                  </Link>
                </div>

                {/* Author Bio */}
                <AuthorBio author={post.author} />
              </motion.div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {tocItems.length > 0 && <TableOfContents items={tocItems} />}

                {/* Share Card */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                    Oszd meg
                  </h4>
                  <button
                    onClick={handleShare}
                    className="w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-colors"
                  >
                    <Share2 className="w-4 h-4 inline mr-2" />
                    Megosztás
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} />

      <PremiumFooter />
    </div>
  );
}
