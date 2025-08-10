import { Metadata } from 'next';
import Link from 'next/link';
import { client } from '@/sanity/client';
import { CATEGORIES_QUERY } from '@/sanity/queries';
import { type Category, getCategoryColor } from '@/sanity/lib';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse all fitness categories including workouts, nutrition, cardio, strength training, and more.',
};

export default async function CategoriesPage() {
  const options = { next: { revalidate: 3600 } }; // Revalidate every hour
  
  const categories = await client.fetch<Category[]>(CATEGORIES_QUERY, {}, options);

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Categories
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our fitness content organized by categories. Find exactly what you're looking for.
          </p>
        </div>

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category._id}
                href={`/categories/${category.slug.current}`}
                className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(category.color)}`}>
                      {category.title}
                    </span>
                    {category.postCount && (
                      <span className="text-sm text-gray-500">
                        {category.postCount} {category.postCount === 1 ? 'post' : 'posts'}
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-2">
                    {category.title}
                  </h2>
                  
                  {category.description && (
                    <p className="text-gray-600 line-clamp-3">
                      {category.description}
                    </p>
                  )}
                  
                  <div className="mt-4 flex items-center text-primary group-hover:text-primary-dark transition-colors">
                    <span className="text-sm font-medium">Explore articles</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No categories found
            </h2>
            <p className="text-gray-600 mb-8">
              Categories will appear here once they're added to the CMS.
            </p>
            <Link
              href="/blog"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Browse All Posts
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}