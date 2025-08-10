// GROQ queries for fetching blog data
import { groq } from "next-sanity";

// Common fragments
const postFields = groq`
  _id,
  title,
  slug,
  excerpt,
  mainImage {
    asset-> {
      _id,
      url
    },
    alt
  },
  categories[]-> {
    _id,
    title,
    slug,
    color
  },
  tags,
  publishedAt,
  estimatedReadingTime,
  featured,
  _createdAt,
  _updatedAt
`;

const postDetailFields = groq`
  ${postFields},
  body,
  seo {
    metaTitle,
    metaDescription
  }
`;

// Query for getting all published posts with pagination
export const POSTS_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && publishedAt < now()] | order(publishedAt desc) [$start...$end] {
    ${postFields}
  }
`;

// Query for getting featured posts
export const FEATURED_POSTS_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && publishedAt < now() && featured == true] | order(publishedAt desc) [0...3] {
    ${postFields}
  }
`;

// Query for getting recent posts
export const RECENT_POSTS_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && publishedAt < now()] | order(publishedAt desc) [0...$limit] {
    ${postFields}
  }
`;

// Query for getting a single post by slug
export const POST_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && slug.current == $slug && publishedAt < now()][0] {
    ${postDetailFields}
  }
`;

// Query for getting all post slugs (for static generation)
export const POST_PATHS_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && publishedAt < now()] {
    "slug": slug.current
  }
`;

// Query for getting posts by category
export const POSTS_BY_CATEGORY_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && publishedAt < now() && $categoryId in categories[]._ref] | order(publishedAt desc) [$start...$end] {
    ${postFields}
  }
`;

// Query for getting posts by tag
export const POSTS_BY_TAG_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && publishedAt < now() && $tag in tags] | order(publishedAt desc) [$start...$end] {
    ${postFields}
  }
`;

// Query for getting all categories
export const CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color,
    "postCount": count(*[_type == "post" && references(^._id) && publishedAt < now()])
  }
`;

// Query for getting a single category by slug
export const CATEGORY_QUERY = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    color
  }
`;

// Query for getting posts by author
export const POSTS_BY_AUTHOR_QUERY = groq`
  *[_type == "post" && defined(slug.current) && publishedAt < now() && author._ref == $authorId] | order(publishedAt desc) [$start...$end] {
    ${postFields}
  }
`;

// Search query
export const SEARCH_POSTS_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && publishedAt < now() && (
    title match $searchTerm + "*" ||
    excerpt match $searchTerm + "*" ||
    tags[] match $searchTerm + "*"
  )] | order(publishedAt desc) [0...20] {
    ${postFields}
  }
`;

// Query for getting related posts
export const RELATED_POSTS_QUERY = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && publishedAt < now() && _id != $currentPostId && (
    count(categories[@._ref in $categoryIds]) > 0 ||
    count(tags[@ in $tags]) > 0
  )] | order(publishedAt desc) [0...3] {
    ${postFields}
  }
`;

// Query for sitemap generation
export const SITEMAP_QUERY = groq`
  {
    "posts": *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && publishedAt < now()] {
      "slug": slug.current,
      "publishedAt": publishedAt,
      "_updatedAt": _updatedAt
    },
    "categories": *[_type == "category" && defined(slug.current)] {
      "slug": slug.current,
      "_updatedAt": _updatedAt
    }
  }
`;

// Query for getting total counts
export const COUNTS_QUERY = groq`
  {
    "posts": count(*[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current) && publishedAt < now()]),
    "categories": count(*[_type == "category"])
  }
`;