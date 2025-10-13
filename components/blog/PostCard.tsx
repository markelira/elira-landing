'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { CategoryBadge } from './CategoryBadge';
import { Author } from './AuthorBio';
import { blogCardStyles, blogTypography, blogAnimations } from '@/lib/blog-design-tokens';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: Author;
  publishedAt: string;
  readTime: string;
  featuredImage: string;
  featured?: boolean;
}

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const cardClass = featured ? blogCardStyles.featuredCard : blogCardStyles.postCard;

  const cardContent = (
    <>
      {/* Featured Image */}
      <div className="relative w-full h-64 md:h-72 lg:h-80 overflow-hidden bg-gray-100">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Category Badge - Floating on Image */}
          <div className="absolute top-4 left-4">
            <CategoryBadge category={post.category} size="md" />
          </div>

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold uppercase tracking-wider rounded-full border border-gray-200">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          {/* Title */}
          <h3 className={`${featured ? 'text-2xl md:text-3xl' : blogTypography.cardTitle} text-gray-900 mb-3 group-hover:text-blue-600 transition-colors`}>
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className={`${blogTypography.cardExcerpt} mb-4 line-clamp-3`}>
            {post.excerpt}
          </p>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Author & CTA */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              {post.author.avatar ? (
                <div className="relative w-10 h-10 flex-shrink-0 rounded-full ring-2 ring-white shadow-md overflow-hidden">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 flex-shrink-0 bg-gray-200 rounded-full flex items-center justify-center ring-2 ring-white shadow-md">
                  <span className="text-gray-600 font-semibold text-sm">
                    {post.author.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-gray-900">{post.author.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
              <span className="text-sm">Tovább</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
    </>
  );

  return (
    <Link href={`/blog/${post.slug}`} className="block">
      {featured ? (
        <div className={cardClass}>{cardContent}</div>
      ) : (
        <motion.div
          className={cardClass}
          whileHover={{ y: -4, scale: 1.02 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          {cardContent}
        </motion.div>
      )}
    </Link>
  );
}
