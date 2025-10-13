import { NextRequest, NextResponse } from 'next/server';
import { getPostContent } from '@/lib/mdx';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Get MDX content (now returns HTML string)
    const postData = await getPostContent(slug);

    if (!postData) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      content: postData.content,
      frontmatter: postData.frontmatter,
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
