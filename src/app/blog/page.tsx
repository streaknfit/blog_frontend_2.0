import { Metadata } from 'next';
import { client } from '@/sanity/client';
import { POSTS_QUERY, CATEGORIES_QUERY } from '@/sanity/queries';
import { type Post, type Category } from '@/sanity/lib';
import { BlogCard } from '@/components/ui/BlogCard';
import { SearchBox } from '@/components/ui/SearchBox';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'All Blog Posts',
  description: 'Browse all our fitness articles, workout routines, nutrition tips, and wellness advice.',
};

const POSTS_PER_PAGE = 12;

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE - 1;

  const options = { next: { revalidate: 30 } };

  // Fetch posts and categories in parallel
  const [postsRaw, categories] = await Promise.all([
    client.fetch<Post[]>(POSTS_QUERY, { start, end }, options),
    client.fetch<Category[]>(CATEGORIES_QUERY, {}, options),
  ]);

  // Deduplicate by slug
  const seen = new Set<string>();
  const posts = postsRaw.filter((p) => {
    const sc = p.slug?.current;
    if (!sc) return false;
    if (seen.has(sc)) return false;
    seen.add(sc);
    return true;
  });

  // Check if there are more posts for pagination
  const hasNextPage = posts.length === POSTS_PER_PAGE;

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Fitness Blog
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover expert fitness tips, workout routines, and nutrition advice to transform your health journey.
          </p>
          <div className="max-w-md mx-auto">
            <SearchBox />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Posts Grid */}
            {posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  {posts.map((post) => (
                    <BlogCard key={post._id} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center space-x-4">
                  {page > 1 && (
                    <Link
                      href={`/blog?page=${page - 1}`}
                      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      Previous
                    </Link>
                  )}
                  
                  <span className="text-gray-600">
                    Page {page}
                  </span>
                  
                  {hasNextPage && (
                    <Link
                      href={`/blog?page=${page + 1}`}
                      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      Next
                    </Link>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  No posts found
                </h2>
                <p className="text-gray-600 mb-8">
                  We couldn't find any posts. Check back later for new content!
                </p>
                <Link
                  href="/"
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Go Home
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Categories */}
              {categories.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Categories
                  </h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <li key={category._id}>
                        <Link
                          href={`/categories/${category.slug.current}`}
                          className="flex items-center justify-between text-gray-700 hover:text-primary transition-colors"
                        >
                          <span>{category.title}</span>
                          {category.postCount && (
                            <span className="text-sm text-gray-500">
                              ({category.postCount})
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">
                  Stay Updated
                </h3>
                <p className="text-white/80 mb-4">
                  Get the latest fitness tips and workout routines delivered to your inbox.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Popular Tags */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Workout', 'Nutrition', 'Cardio', 'Strength', 'Yoga', 'HIIT', 'Diet', 'Weight Loss'].map((tag) => (
                    <Link
                      key={tag}
                      href={`/search?q=${encodeURIComponent(tag)}`}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}