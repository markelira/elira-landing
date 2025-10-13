import type { Metadata } from 'next';
import { samplePosts } from '@/lib/blog-data/sample-posts';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = samplePosts.find(p => p.slug === slug);

  if (!post) {
    return {
      title: 'Cikk nem található - Elira Blog',
    };
  }

  return {
    title: `${post.title} - Elira Blog`,
    description: post.excerpt,
    keywords: [post.category, 'marketing', 'stratégia', 'growth', 'Elira'],
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 800,
          alt: post.title,
        },
      ],
      locale: 'hu_HU',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
