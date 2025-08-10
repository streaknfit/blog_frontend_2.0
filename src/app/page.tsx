import { Metadata } from 'next';
import { client } from '@/sanity/client';
import { FEATURED_POSTS_QUERY, RECENT_POSTS_QUERY } from '@/sanity/queries';
import { type Post } from '@/sanity/lib';
import { BlogCard } from '@/components/ui/BlogCard';
import { SearchBox } from '@/components/ui/SearchBox';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'StreakNFit Blog - Your Ultimate Fitness Companion',
  description: 'Discover the latest fitness tips, workout routines, nutrition advice, and wellness insights to help you achieve your health goals.',
  openGraph: {
    title: 'StreakNFit Blog - Your Ultimate Fitness Companion',
    description: 'Discover the latest fitness tips, workout routines, nutrition advice, and wellness insights to help you achieve your health goals.',
    type: 'website',
  },
};

const options = { next: { revalidate: 30 } };

export default async function HomePage() {
  // Fetch featured and recent posts in parallel
  const [featuredPosts, recentPosts] = await Promise.all([
    client.fetch<Post[]>(FEATURED_POSTS_QUERY, {}, options),
    client.fetch<Post[]>(RECENT_POSTS_QUERY, { limit: 6 }, options),
  ]);

  // Deduplicate posts by slug
  const seenSlugs = new Set<string>();
  const allPosts = [...featuredPosts, ...recentPosts].filter(post => {
    if (seenSlugs.has(post.slug.current)) return false;
    seenSlugs.add(post.slug.current);
    return true;
  });

  // Split deduped posts into featured and recent for display
  const dedupedFeatured = allPosts.filter(post => post.featured).slice(0, featuredPosts.length);
  const dedupedRecent = allPosts.filter(post => !post.featured).slice(0, recentPosts.length);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-secondary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your Fitness Journey
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-3xl mx-auto">
              Discover expert fitness tips, workout routines, and nutrition advice to help you achieve your health goals.
            </p>
            <div className="max-w-md mx-auto">
              <SearchBox />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {dedupedFeatured.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Articles
              </h2>
              <p className="text-lg text-gray-600">
                Our top picks for this week
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dedupedFeatured.map((post, index) => (
                <BlogCard
                  key={post._id}
                  post={post}
                  featured={index === 0}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Latest Articles
              </h2>
              <p className="text-lg text-gray-600">
                Stay updated with our newest content
              </p>
            </div>
            <Link
              href="/blog"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors font-medium"
            >
              View All Posts
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dedupedRecent.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Fitness Journey?
          </h2>
            <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
            Join thousands of readers who get our weekly fitness tips and workout routines delivered to their inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/blog"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Explore Articles
            </Link>
            <Link
              href="/categories"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-primary transition-colors font-medium"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}