'use client';

import { motion } from 'motion/react';
import { PostCard, Post } from './PostCard';
import { blogLayouts, blogAnimations } from '@/lib/blog-design-tokens';

interface PostGridProps {
  posts: Post[];
  showFeatured?: boolean;
}

export function PostGrid({ posts, showFeatured = true }: PostGridProps) {
  const featuredPost = showFeatured ? posts.find(p => p.featured) : null;
  const regularPosts = featuredPost
    ? posts.filter(p => !p.featured)
    : posts;

  return (
    <div className="space-y-12">
      {/* Featured Post */}
      {featuredPost && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={blogLayouts.featuredPost}
        >
          <PostCard post={featuredPost} featured />
        </motion.div>
      )}

      {/* Regular Posts Grid */}
      <motion.div
        variants={blogAnimations.fadeInStagger.container}
        initial="initial"
        animate="animate"
        className={blogLayouts.postGrid}
      >
        {regularPosts.map((post, index) => (
          <motion.div
            key={post.slug}
            variants={blogAnimations.fadeInStagger.item}
            transition={{ delay: index * 0.1 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
