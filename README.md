# StreakNFit Blog - Next.js & Sanity CMS

A modern, high-performance fitness blog built with Next.js 15, Sanity CMS, and TailwindCSS. Features Static Site Generation (SSG) for lightning-fast loading and optimal SEO.

## ✨ Features

- **🚀 Static Site Generation (SSG)** - Pre-rendered pages for optimal performance
- **📱 Responsive Design** - Mobile-first approach with TailwindCSS
- **🔍 SEO Optimized** - Meta tags, structured data, sitemap, and robots.txt
- **📝 Rich Content Management** - Powered by Sanity CMS with live preview
- **🔍 Full-text Search** - Search across all articles
- **📊 Category & Tag System** - Organized content discovery
- **👥 Author Profiles** - Meet the fitness experts
- **🖼️ Optimized Images** - Next.js Image optimization with WebP/AVIF
- **⚡ Fast Loading** - ISR (Incremental Static Regeneration) for fresh content
- **🛡️ Security Headers** - Built-in security best practices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: TailwindCSS 4
- **CMS**: Sanity Studio
- **Images**: Next.js Image Optimization + Sanity CDN
- **Deployment**: Vercel
- **Analytics**: Ready for Google Analytics, Plausible

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Sanity account

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd nextjs-snf_blog
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token_with_read_permissions

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Optional: Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=yourdomain.com
```

### 4. Set Up Sanity Studio

Navigate to the studio directory and follow the setup:

```bash
cd ../studio-snf_blog
npm install
# Follow Sanity CLI prompts to connect to your project
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog.

## 📦 Project Structure

```
nextjs-snf_blog/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (routes)/          # Route groups
│   │   ├── api/               # API routes (sitemap, robots)
│   │   ├── blog/              # Blog pages
│   │   ├── categories/        # Category pages
│   │   ├── authors/           # Author pages
│   │   └── search/            # Search page
│   ├── components/            # Reusable UI components
│   │   └── ui/               # UI component library
│   └── sanity/               # Sanity configuration
│       ├── client.ts         # Sanity client setup
│       ├── queries.ts        # GROQ queries
│       └── lib.ts           # Utility functions
├── public/                   # Static assets
├── vercel.json              # Vercel deployment config
└── package.json
```

## 🎨 Customization

### Styling

The project uses TailwindCSS for styling. Key files:
- `src/app/globals.css` - Global styles and Tailwind imports
- Components use Tailwind classes for styling
- Customize colors, fonts, and spacing in `tailwind.config.js`

### Content Management

Content is managed through Sanity Studio. Key schemas:
- **Posts**: Main blog articles with rich text, images, categories
- **Authors**: Author profiles with bios and specialties
- **Categories**: Organized content classification
- **Block Content**: Rich text content with custom components

### SEO Configuration

SEO is handled automatically with:
- Dynamic meta tags per page
- Open Graph and Twitter Card support
- Structured data for articles
- XML sitemap generation
- Robots.txt configuration

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub/GitLab/Bitbucket**

2. **Connect to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your repository

3. **Configure Environment Variables**:
   Add all environment variables from your `.env.local` file

4. **Deploy**:
   Vercel will automatically build and deploy your site

### Manual Deployment

```bash
# Build the project
npm run build

# Export static files (if using static export)
npm run export

# Deploy the .next or out folder to your hosting provider
```

## 📈 Performance

The blog is optimized for performance with:

- **Static Site Generation**: Pages are pre-rendered at build time
- **Incremental Static Regeneration**: Content updates without full rebuilds
- **Image Optimization**: Automatic WebP/AVIF conversion and lazy loading
- **Bundle Optimization**: Tree shaking and code splitting
- **CDN Delivery**: Vercel Edge Network for global distribution

### Core Web Vitals

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1

## 🔄 Content Workflow

### Adding New Blog Posts

1. **Create in Sanity Studio**:
   - Open Sanity Studio
   - Create new Post document
   - Fill in title, content, categories, etc.
   - Publish

2. **Automatic Updates**:
   - New posts appear on frontend within 30 seconds (ISR)
   - No manual deployment needed
   - SEO and sitemap automatically updated

### Content Management Best Practices

- **Images**: Use high-quality images (1200x630 for featured images)
- **SEO**: Fill in excerpt and meta descriptions
- **Categories**: Use existing categories or create meaningful new ones
- **Tags**: Add relevant tags for better discoverability
- **Authors**: Complete author profiles with bios and specialties

## 🛡️ Security

Security features included:

- **Content Security Policy**: Prevents XSS attacks
- **HTTPS Only**: Secure data transmission
- **Environment Variables**: Sensitive data protection
- **Input Validation**: Sanity handles content validation
- **Rate Limiting**: API routes protected against abuse

## 📊 Analytics & Monitoring

### Google Analytics Setup

1. Add your GA Measurement ID to environment variables
2. Analytics automatically tracks page views and user interactions

### Performance Monitoring

- Vercel Analytics (built-in)
- Core Web Vitals monitoring
- Real User Monitoring (RUM)

## 🔧 Advanced Configuration

### Custom Domains

1. Add your domain in Vercel dashboard
2. Update `NEXT_PUBLIC_SITE_URL` environment variable
3. Configure DNS settings

### Caching Strategy

- **Static Assets**: 1 year cache with immutable headers
- **API Routes**: 30-second cache with stale-while-revalidate
- **Pages**: ISR with 30-second revalidation

### Database Optimization

- GROQ queries optimized for performance
- CDN for Sanity images
- Incremental updates only

## 🆘 Troubleshooting

### Common Issues

**Build Errors**:
- Check environment variables are set correctly
- Ensure Sanity project ID and dataset are correct
- Verify API token has proper permissions

**Images Not Loading**:
- Confirm Sanity CDN hostname in `next.config.ts`
- Check image URLs in browser developer tools

**Content Not Updating**:
- ISR cache takes up to 30 seconds to update
- Check if posts are published in Sanity
- Verify `publishedAt` date is not in the future

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review Sanity and Next.js official documentation
