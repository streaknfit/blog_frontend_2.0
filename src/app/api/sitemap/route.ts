import { NextResponse } from 'next/server';
import { client } from '@/sanity/client';
import { SITEMAP_QUERY } from '@/sanity/queries';

export async function GET() {
  try {
    const data = await client.fetch(SITEMAP_QUERY);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://streakn.fit';
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/categories</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/authors</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  ${data.posts?.map((post: any) => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post._updatedAt || post.publishedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('') || ''}
  ${data.categories?.map((category: any) => `
  <url>
    <loc>${baseUrl}/categories/${category.slug}</loc>
    <lastmod>${new Date(category._updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('') || ''}
  ${data.authors?.map((author: any) => `
  <url>
    <loc>${baseUrl}/authors/${author.slug}</loc>
    <lastmod>${new Date(author._updatedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`).join('') || ''}
</urlset>`;

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}