'use client';

import { motion } from 'motion/react';
import { PostCard, Post } from './PostCard';
import { relatedPostsStyles } from '@/lib/blog-design-tokens';

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className={relatedPostsStyles.section}>
      <div className={relatedPostsStyles.container}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={relatedPostsStyles.title}
        >
          További érdekes cikkek
        </motion.h2>

        <div className={relatedPostsStyles.grid}>
          {posts.slice(0, 3).map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
