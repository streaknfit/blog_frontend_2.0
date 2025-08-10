import { Metadata } from 'next';
import { Suspense } from 'react';
import { client } from '@/sanity/client';
import { SEARCH_POSTS_QUERY } from '@/sanity/queries';
import { type Post } from '@/sanity/lib';
import { BlogCard } from '@/components/ui/BlogCard';
import { SearchBox } from '@/components/ui/SearchBox';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Search Results',
  description: 'Search through our fitness articles, workout routines, and nutrition tips.',
};

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function SearchResults({ query }: { query: string }) {
  if (!query || query.length < 2) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Enter a search term
        </h2>
        <p className="text-gray-600">
          Search for fitness articles, workout routines, nutrition tips, and more.
        </p>
      </div>
    );
  }

  const options = { next: { revalidate: 30 } };
  const posts = await client.fetch<Post[]>(
    SEARCH_POSTS_QUERY,
    { searchTerm: query },
    options
  );

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          No results found for "{query}"
        </h2>
        <p className="text-gray-600 mb-8">
          Try different keywords or browse our categories to find what you're looking for.
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
            Browse Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Search Results for "{query}"
        </h2>
        <p className="text-gray-600">
          Found {posts.length} {posts.length === 1 ? 'article' : 'articles'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </>
  );
}

function LoadingResults() {
  return (
    <div className="space-y-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearch = await searchParams;
  const query = typeof resolvedSearch.q === 'string' ? resolvedSearch.q : '';

  return (
    <main className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Search Articles
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Find exactly what you're looking for in our fitness content library.
          </p>
          <div className="max-w-md mx-auto">
            <SearchBox />
          </div>
        </div>

        {/* Search Results */}
        <Suspense fallback={<LoadingResults />}>
          <SearchResults query={query} />
        </Suspense>
      </div>
    </main>
  );
}