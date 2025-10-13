/**
 * Blog-Specific Design Tokens
 * Extended from main design system for optimal reading experience
 */

import { buttonStyles, cardStyles, glassMorphism, typography } from './design-tokens';

// Reading Experience Optimizations
export const blogTypography = {
  // Blog Post Title (Hero)
  postTitle: 'text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight',

  // Section Headings in Post
  h2: 'text-3xl md:text-4xl font-semibold leading-tight mt-12 mb-6',
  h3: 'text-2xl md:text-3xl font-semibold leading-tight mt-10 mb-5',
  h4: 'text-xl md:text-2xl font-semibold leading-tight mt-8 mb-4',

  // Body Text - Optimized for Reading
  body: 'text-lg md:text-xl leading-relaxed text-gray-700',
  bodyLineHeight: '1.8',

  // Card Text
  cardTitle: 'text-xl md:text-2xl font-semibold leading-tight',
  cardExcerpt: 'text-base md:text-lg leading-relaxed text-gray-600',

  // Metadata
  metadata: 'text-sm text-gray-500',
  categoryBadge: 'text-xs font-semibold uppercase tracking-wider',
};

// Blog-Specific Layouts
export const blogLayouts = {
  // Content Column (optimal line length)
  contentColumn: 'max-w-3xl mx-auto px-6',

  // Wide Content (for images, code blocks)
  wideContent: 'max-w-5xl mx-auto px-6',

  // Post Grid
  postGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',

  // Featured Post
  featuredPost: 'col-span-full lg:col-span-2',
};

// Blog Card Variants
export const blogCardStyles = {
  // Standard Post Card
  postCard: `
    ${cardStyles.flat}
    group cursor-pointer
    overflow-hidden
    hover:shadow-xl hover:scale-[1.02]
    transition-all duration-300
  `,

  // Featured Post Card (larger, more prominent)
  featuredCard: `
    bg-gradient-to-br from-white to-gray-50
    border border-gray-200
    rounded-2xl
    shadow-lg
    hover:shadow-2xl
    transition-all duration-300
    overflow-hidden
  `,

  // Category Card
  categoryCard: `
    ${cardStyles.flat}
    text-center
    hover:shadow-lg
    hover:scale-105
    transition-all duration-200
  `,
};

// Category Colors (matching homepage)
export const categoryColors = {
  'Marketing': {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-300',
    gradient: 'linear-gradient(135deg, #16222F 0%, #1e2a37 100%)',
  },
  'Strategy': {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-300',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #C4B5FD 100%)',
  },
  'Analytics': {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300',
    gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
  },
  'Growth': {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    border: 'border-orange-300',
    gradient: 'linear-gradient(135deg, #F97316 0%, #FDBA74 100%)',
  },
  'Leadership': {
    bg: 'bg-indigo-100',
    text: 'text-indigo-800',
    border: 'border-indigo-300',
    gradient: 'linear-gradient(135deg, #6366F1 0%, #A5B4FC 100%)',
  },
};

// Blog Hero Styles
export const blogHeroStyles = {
  container: `
    relative min-h-[50vh] flex items-center justify-center
    bg-gradient-to-br from-[#16222F] via-[#1e2a37] to-[#252f3d]
    overflow-hidden
  `,
  content: `
    relative z-10 text-center max-w-4xl mx-auto px-6 py-20
  `,
  title: 'text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6',
  subtitle: 'text-lg md:text-xl text-white/80 leading-relaxed',
};

// Reading Progress Bar
export const readingProgressStyles = {
  bar: `
    fixed top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500
    transition-all duration-150 z-50
  `,
};

// Table of Contents Styles
export const tocStyles = {
  container: `
    sticky top-24 hidden lg:block
    bg-white border border-gray-200 rounded-xl p-6
    shadow-sm
  `,
  title: 'text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4',
  link: 'text-sm text-gray-600 hover:text-gray-900 py-2 block transition-colors',
  activeLink: 'text-blue-600 font-semibold',
};

// Related Posts Section
export const relatedPostsStyles = {
  section: 'bg-gray-50 py-16',
  container: 'max-w-7xl mx-auto px-6',
  title: 'text-3xl font-bold text-gray-900 mb-8 text-center',
  grid: 'grid grid-cols-1 md:grid-cols-3 gap-8',
};

// Author Bio Styles
export const authorBioStyles = {
  container: `
    bg-gradient-to-br from-gray-50 to-white
    border border-gray-200
    rounded-2xl p-8
    flex flex-col md:flex-row gap-6
    items-start
  `,
  avatar: 'w-20 h-20 rounded-full border-4 border-white shadow-lg',
  name: 'text-xl font-bold text-gray-900',
  title: 'text-sm text-gray-600',
  bio: 'text-base text-gray-700 leading-relaxed mt-2',
};

// Search Bar Styles
export const searchStyles = {
  container: 'relative max-w-2xl mx-auto',
  input: `
    w-full px-6 py-4 pr-12
    bg-white border-2 border-gray-200
    rounded-full
    text-base
    focus:outline-none focus:border-blue-500
    transition-colors
  `,
  icon: 'absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400',
};

// Pagination Styles
export const paginationStyles = {
  container: 'flex items-center justify-center gap-2 mt-12',
  button: `
    px-4 py-2 rounded-lg
    border border-gray-200
    text-gray-700 font-medium
    hover:bg-gray-50 hover:border-gray-300
    transition-all
  `,
  activeButton: `
    px-4 py-2 rounded-lg
    bg-gray-900 border border-gray-900
    text-white font-medium
  `,
};

// Empty State Styles
export const emptyStateStyles = {
  container: 'text-center py-16 px-6',
  icon: 'w-16 h-16 mx-auto text-gray-300 mb-4',
  title: 'text-2xl font-semibold text-gray-900 mb-2',
  description: 'text-base text-gray-600',
};

// Blog-Specific Animations
export const blogAnimations = {
  cardHover: {
    whileHover: { y: -8, scale: 1.02 },
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  fadeInStagger: {
    container: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { staggerChildren: 0.1 }
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 }
    }
  },
};
