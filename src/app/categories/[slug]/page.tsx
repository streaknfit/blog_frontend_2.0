import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { client } from '@/sanity/client';
import { CATEGORY_QUERY, POSTS_BY_CATEGORY_QUERY, CATEGORIES_QUERY } from '@/sanity/queries';
import { type Category, type Post, getCategoryColor } from '@/sanity/lib';
import { BlogCard } from '@/components/ui/BlogCard';
import Link from 'next/link';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "category" && defined(slug.current)] { "slug": slug }`
  );
  
  return categories.map((category) => ({
    slug: category.slug.current,
  }));
}

// Generate metadata for each category
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await client.fetch<Category>(CATEGORY_QUERY, { slug });
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }
  
  return {
    title: category.title,
    description: category.description || `Browse all articles in the ${category.title} category.`,
    openGraph: {
      title: `${category.title} - Fitness Articles`,
      description: category.description || `Browse all articles in the ${category.title} category.`,
      type: 'website',
    },
  };
}

const POSTS_PER_PAGE = 12;

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const page = Number(resolvedSearch.page) || 1;
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE - 1;

  const options = { next: { revalidate: 30 } };
  
  const category = await client.fetch<Category>(CATEGORY_QUERY, { slug: resolvedParams.slug }, options);
  
  if (!category) {
    notFound();
  }
  
  const posts = await client.fetch<Post[]>(
    POSTS_BY_CATEGORY_QUERY,
    { categoryId: category._id, start, end },
    options
  );
  
  // Check if there are more posts for pagination
  const hasNextPage = posts.length === POSTS_PER_PAGE;

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-blue-600">Categories</Link>
          <span>/</span>
          <span className="text-gray-900">{category.title}</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <span className={`px-4 py-2 rounded-full text-lg font-medium ${getCategoryColor(category.color)}`}>
              {category.title}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {category.title} Articles
          </h1>
          
          {category.description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
        </div>

        {/* Posts */}
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-4">
              {page > 1 && (
                <Link
                  href={`/categories/${resolvedParams.slug}?page=${page - 1}`}
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
                  href={`/categories/${resolvedParams.slug}?page=${page + 1}`}
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
              No articles in this category yet
            </h2>
            <p className="text-gray-600 mb-8">
              Check back later for new content in the {category.title} category.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Browse All Posts
              </Link>
              <Link
                href="/categories"
                className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary/10 transition-colors"
              >
                All Categories
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}