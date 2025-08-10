import Link from 'next/link';
import Image from 'next/image';
import { formatDate, getImageUrl, getCategoryColor, type Post } from '@/sanity/lib';

interface BlogCardProps {
  post: Post;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const imageUrl = getImageUrl(post.mainImage, featured ? 600 : 400, featured ? 400 : 300);
  
  return (
    <article className={`group ${featured ? 'col-span-2 row-span-2' : ''}`}>
      <Link 
        href={`/blog/${post.slug.current}`} 
        className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
      >
        <div className={`relative ${featured ? 'h-64' : 'h-48'} overflow-hidden`}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes={featured ? '(max-width: 768px) 100vw, 600px' : '(max-width: 768px) 100vw, 400px'}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white text-lg font-semibold">StreakNFit</span>
            </div>
          )}
          {featured && (
            <div className="absolute top-4 left-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
        </div>
        
        <div className={`p-6 ${featured ? 'p-8' : ''}`}>
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.categories.slice(0, 2).map((category) => (
                <span
                  key={category._id}
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category.color)}`}
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}
          
          {/* Title */}
          <h3 className={`font-bold text-gray-900 group-hover:text-primary-dark transition-colors mb-2 ${
            featured ? 'text-2xl' : 'text-lg'
          }`}>
            {post.title}
          </h3>
          
          {/* Excerpt */}
          {post.excerpt && (
            <p className={`text-gray-600 mb-4 line-clamp-3 ${featured ? 'text-base' : 'text-sm'}`}>
              {post.excerpt}
            </p>
          )}
          
          {/* Meta info */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              {/* Reading time */}
              {post.estimatedReadingTime && (
                <span>{post.estimatedReadingTime} min read</span>
              )}
            </div>
            {/* Date */}
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
}