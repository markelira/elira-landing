import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

const contentDirectory = path.join(process.cwd(), 'content/blog');

// Configure marked with syntax highlighting
marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

export interface PostFrontmatter {
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  category: string;
  readTime: string;
  featuredImage: string;
}

export interface PostContent {
  frontmatter: PostFrontmatter;
  content: string;
}

/**
 * Get MDX content for a specific blog post
 */
export async function getPostContent(slug: string): Promise<PostContent | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`MDX file not found: ${filePath}`);
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Convert markdown to HTML
    const htmlContent = await marked(content);

    return {
      frontmatter: data as PostFrontmatter,
      content: htmlContent,
    };
  } catch (error) {
    console.error(`Error reading MDX file for slug: ${slug}`, error);
    return null;
  }
}

/**
 * Check if a post has MDX content
 */
export function hasPostContent(slug: string): boolean {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);
  return fs.existsSync(filePath);
}

/**
 * Get all MDX file slugs
 */
export function getAllPostSlugs(): string[] {
  try {
    if (!fs.existsSync(contentDirectory)) {
      return [];
    }

    const files = fs.readdirSync(contentDirectory);
    return files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, ''));
  } catch (error) {
    console.error('Error reading content directory:', error);
    return [];
  }
}
