import { PortableText as PT } from '@portabletext/react';
import Image from 'next/image';
import { getImageUrl } from '@/sanity/lib';

// Custom components for rendering portable text
const components = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = getImageUrl(value, 800, 600);
      if (!imageUrl) return null;
      
      return (
        <div className="my-8">
          <Image
            src={imageUrl}
            alt={value.alt || ''}
            width={800}
            height={600}
            className="rounded-lg w-full h-auto"
          />
          {value.caption && (
            <p className="text-center text-sm text-gray-600 mt-2">{value.caption}</p>
          )}
        </div>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-8">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-6">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold text-gray-900 mb-3 mt-6">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 italic text-gray-700 bg-gray-50 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="ml-4">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="ml-4">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        target={value.blank ? '_blank' : undefined}
        rel={value.blank ? 'noopener noreferrer' : undefined}
        className="text-blue-600 hover:text-blue-800 underline"
      >
        {children}
      </a>
    ),
  },
};

interface PortableTextProps {
  value: any;
  className?: string;
}

export function PortableText({ value, className = '' }: PortableTextProps) {
  if (!value) return null;
  
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <PT value={value} components={components} />
    </div>
  );
}