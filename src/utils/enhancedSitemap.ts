
import { expandedBlogPosts } from '@/data/blog';
import { SERVICES } from '@/data/services';
import { portfolioDetails } from '@/data/portfolioDetails';

export interface SitemapUrl {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  images?: Array<{
    url: string;
    caption?: string;
    title?: string;
  }>;
}

export const generateSitemap = (): string => {
  const baseUrl = import.meta.env.VITE_BASE_URL || 'https://copypro-cloud.lovable.app';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls: SitemapUrl[] = [
    // Main pages
    {
      url: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 1.0,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          caption: 'CopyPro Cloud - Профессиональный копирайтинг',
          title: 'Главная страница CopyPro Cloud'
        }
      ]
    },
    {
      url: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/order`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.9
    },
    {
      url: `${baseUrl}/portfolio`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/blog`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.8
    },
    {
      url: `${baseUrl}/prices`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/privacy`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
    }
  ];

  // Add blog posts
  expandedBlogPosts.forEach(post => {
    urls.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastmod: post.publishedAt,
      changefreq: 'monthly',
      priority: 0.7,
      images: post.coverImage ? [
        {
          url: post.coverImage,
          caption: post.title,
          title: post.title
        }
      ] : undefined
    });
  });

  // Add services
  SERVICES.forEach(service => {
    urls.push({
      url: `${baseUrl}/service/${service.slug}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    });
  });

  // Add portfolio projects
  Object.keys(portfolioDetails).forEach(slug => {
    urls.push({
      url: `${baseUrl}/portfolio/${slug}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6
    });
  });

  // Generate XML
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

  urls.forEach(urlData => {
    sitemap += `
  <url>
    <loc>${urlData.url}</loc>`;
    
    if (urlData.lastmod) {
      sitemap += `
    <lastmod>${urlData.lastmod}</lastmod>`;
    }
    
    if (urlData.changefreq) {
      sitemap += `
    <changefreq>${urlData.changefreq}</changefreq>`;
    }
    
    if (urlData.priority) {
      sitemap += `
    <priority>${urlData.priority}</priority>`;
    }

    if (urlData.images) {
      urlData.images.forEach(image => {
        sitemap += `
    <image:image>
      <image:loc>${image.url}</image:loc>`;
        if (image.caption) {
          sitemap += `
      <image:caption>${image.caption}</image:caption>`;
        }
        if (image.title) {
          sitemap += `
      <image:title>${image.title}</image:title>`;
        }
        sitemap += `
    </image:image>`;
      });
    }

    sitemap += `
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

export const generateRobotsTxt = (): string => {
  const baseUrl = import.meta.env.VITE_BASE_URL || 'https://copypro-cloud.lovable.app';
  
  return `User-agent: *
Allow: /

# Google Bot
User-agent: Googlebot
Allow: /
Crawl-delay: 1

# Bing Bot
User-agent: Bingbot
Allow: /
Crawl-delay: 1

# Yandex Bot
User-agent: YandexBot
Allow: /
Crawl-delay: 1

# Social Media Bots
User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

User-agent: TelegramBot
Allow: /

# Disallow admin areas
Disallow: /admin/
Disallow: /client/
Disallow: /api/

# Disallow temporary URLs
Disallow: /temp/
Disallow: /draft/

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Host
Host: ${baseUrl}`;
};
