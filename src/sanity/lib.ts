import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

// Types
export interface Post extends SanityDocument {
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
  categories?: Category[];
  tags?: string[];
  publishedAt: string;
  estimatedReadingTime?: number;
  featured?: boolean;
  body?: any;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface Category extends SanityDocument {
  title: string;
  slug: { current: string };
  description?: string;
  color?: string;
  postCount?: number;
}

// Image URL builder
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Helper function to get optimized image URL
export function getImageUrl(image: any, width = 800, height = 600) {
  if (!image?.asset) return null;
  
  return urlFor(image)
    .width(width)
    .height(height)
    .fit('crop')
    .crop('center')
    .format('webp')
    .url();
}

// Helper function to format date
export function formatDate(date: string, options?: Intl.DateTimeFormatOptions) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}

// Helper function to get reading time
export function getReadingTime(content: any): number {
  if (!content) return 0;
  
  // Extract text from portable text
  const text = content
    .filter((block: any) => block._type === 'block')
    .map((block: any) => 
      block.children
        ?.filter((child: any) => child._type === 'span')
        .map((span: any) => span.text)
        .join('')
    )
    .join(' ');
  
  // Average reading speed is 200 words per minute
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// Helper function to generate excerpt from body
export function generateExcerpt(body: any, maxLength = 160): string {
  if (!body) return '';
  
  const text = body
    .filter((block: any) => block._type === 'block')
    .map((block: any) => 
      block.children
        ?.filter((child: any) => child._type === 'span')
        .map((span: any) => span.text)
        .join('')
    )
    .join(' ');
  
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength).trim() + '...';
}

// Helper function to get category colors
export function getCategoryColor(color?: string): string {
  const colors: { [key: string]: string } = {
    red: 'bg-red-100 text-red-800',
    orange: 'bg-orange-100 text-orange-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
    pink: 'bg-pink-100 text-pink-800',
  };
  
  return colors[color || 'blue'] || colors.blue;
}

// Helper function to create SEO meta tags
export function createSEOMeta(post: Post, defaultTitle = 'StreakNFit Blog') {
  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt || generateExcerpt(post.body);
  const image = getImageUrl(post.mainImage, 1200, 630); // Open Graph image size
  
  return {
    title: `${title} | ${defaultTitle}`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.publishedAt,
      tags: post.tags,
      ...(image && { images: [{ url: image, width: 1200, height: 630, alt: post.mainImage?.alt || post.title }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image && { images: [image] }),
    },
  };
}

// Helper function to extract plain text from portable text
export function extractTextFromPortableText(blocks: any[]): string {
  if (!blocks) return '';
  
  return blocks
    .filter(block => block._type === 'block')
    .map(block => 
      block.children
        ?.filter((child: any) => child._type === 'span')
        .map((span: any) => span.text)
        .join('') || ''
    )
    .join('\n\n');
}

// Helper function to validate environment variables
export function validateSanityConfig() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET;
  
  if (!projectId) {
    throw new Error('Missing SANITY_PROJECT_ID environment variable');
  }
  
  if (!dataset) {
    throw new Error('Missing SANITY_DATASET environment variable');
  }
  
  return { projectId, dataset };
}