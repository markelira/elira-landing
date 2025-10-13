import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { samplePosts } from '@/lib/blog-data/sample-posts';
import { BlogPostClient } from './BlogPostClient';

// Generate static params for all blog posts (for static generation)
export async function generateStaticParams() {
  return samplePosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = samplePosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Post Not Found - Elira Blog',
    };
  }

  const baseUrl = 'https://www.elira.hu';
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  // Extract keywords from title and excerpt
  const keywords = [
    post.category.toLowerCase(),
    'marketing',
    'stratégia',
    'növekedés',
    'KKV',
    'magyarország',
    'digitális marketing',
    'üzleti fejlesztés',
  ];

  return {
    title: `${post.title} | Elira Blog`,
    description: post.excerpt,
    keywords,
    authors: [{ name: post.author.name, url: post.author.linkedin || baseUrl }],
    creator: post.author.name,
    publisher: 'Elira',
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: 'Elira - Üzleti Stratégia Platform',
      images: [
        {
          url: post.featuredImage.startsWith('http')
            ? post.featuredImage
            : `${baseUrl}${post.featuredImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'hu_HU',
      type: 'article',
      publishedTime: new Date(post.publishedAt).toISOString(),
      authors: [post.author.name],
      tags: keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [
        post.featuredImage.startsWith('http')
          ? post.featuredImage
          : `${baseUrl}${post.featuredImage}`
      ],
      creator: '@elira_hu',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      // Article structured data hints
      'article:published_time': new Date(post.publishedAt).toISOString(),
      'article:author': post.author.name,
      'article:section': post.category,
      'article:tag': keywords.join(', '),
    },
  };
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  return <BlogPostClient params={params} />;
}
