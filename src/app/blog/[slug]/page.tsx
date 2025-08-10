import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/client';
import { POST_QUERY, POST_PATHS_QUERY, RELATED_POSTS_QUERY } from '@/sanity/queries';
import { type Post, getImageUrl, getCategoryColor, createSEOMeta } from '@/sanity/lib';
import { PortableText } from '@/components/ui/PortableText';
import { BlogCard } from '@/components/ui/BlogCard';
import { ShareButtons } from '@/components/ui/ShareButtons';

// Generate static params for all posts
export async function generateStaticParams() {
  const posts = await client.fetch<{ slug: string }[]>(POST_PATHS_QUERY);
  return posts.map((post) => ({ slug: post.slug }));
}

// Generate metadata for each post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<Post>(POST_QUERY, { slug });
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return createSEOMeta(post);
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const options = { next: { revalidate: 30 } };

  const post = await client.fetch<Post>(POST_QUERY, { slug }, options);
  if (!post) {
    notFound();
  }

  // Related posts
  const categoryIds = post.categories?.map((cat) => cat._id) || [];
  const tags = post.tags || [];
  const relatedPosts = await client.fetch<Post[]>(
    RELATED_POSTS_QUERY,
    { currentPostId: post._id, categoryIds, tags },
    options
  );

  const imageUrl = getImageUrl(post.mainImage, 1200, 630);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const shareUrl = `${baseUrl}/blog/${post.slug.current}`;

  return (
    <article className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <span>/</span>
            <span className="text-gray-900">{post.title}</span>
          </nav>

          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/categories/${category.slug.current}`}
                  className={`px-3 py-1 rounded-full text-sm font-medium hover:opacity-80 transition-opacity ${getCategoryColor(category.color)}`}
                >
                  {category.title}
                </Link>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>
          )}
        </div>
      </section>

      {/* Featured Image */}
      {imageUrl && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image src={imageUrl} alt={post.mainImage?.alt || post.title} fill className="object-cover" priority />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <PortableText value={post.body} />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/search?q=${encodeURIComponent(tag)}`}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Share Buttons */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Share</h3>
                  <ShareButtons title={post.title} url={shareUrl} />
                </div>

                {/* Table of Contents reserved spot */}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost._id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}