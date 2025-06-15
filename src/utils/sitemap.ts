
import { SERVICES } from "@/data/services";

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemapUrls = (): SitemapUrl[] => {
  const baseUrl = import.meta.env.VITE_BASE_URL || 'https://copypro-cloud.lovable.app';
  const lastmod = new Date().toISOString().split('T')[0];

  const urls: SitemapUrl[] = [
    // Основные страницы
    {
      loc: `${baseUrl}/`,
      lastmod,
      changefreq: 'daily',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/order`,
      lastmod,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/about`,
      lastmod,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/prices`,
      lastmod,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/portfolio`,
      lastmod,
      changefreq: 'weekly',
      priority: 0.7
    },
    {
      loc: `${baseUrl}/blog`,
      lastmod,
      changefreq: 'daily',
      priority: 0.7
    },
    {
      loc: `${baseUrl}/privacy`,
      lastmod,
      changefreq: 'yearly',
      priority: 0.3
    }
  ];

  // Добавляем страницы услуг
  SERVICES.forEach(service => {
    urls.push({
      loc: `${baseUrl}/service/${service.slug}`,
      lastmod,
      changefreq: 'monthly',
      priority: 0.6
    });

    urls.push({
      loc: `${baseUrl}/format/${service.slug}`,
      lastmod,
      changefreq: 'monthly',
      priority: 0.5
    });
  });

  return urls;
};

export const generateSitemapXml = (): string => {
  const urls = generateSitemapUrls();
  
  const urlElements = urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
};

export const generateRobotsTxt = (): string => {
  const baseUrl = import.meta.env.VITE_BASE_URL || 'https://copypro-cloud.lovable.app';
  
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay
Crawl-delay: 1

# Disallow admin and client areas
User-agent: *
Disallow: /admin/
Disallow: /client/
Disallow: /api/

# Allow important bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /`;
};

// Хук для динамической генерации sitemap в браузере
export const useSitemapGeneration = () => {
  const generateAndDownloadSitemap = () => {
    const sitemapContent = generateSitemapXml();
    const blob = new Blob([sitemapContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateAndDownloadRobots = () => {
    const robotsContent = generateRobotsTxt();
    const blob = new Blob([robotsContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return {
    generateAndDownloadSitemap,
    generateAndDownloadRobots,
    getSitemapUrls: generateSitemapUrls,
    getSitemapXml: generateSitemapXml,
    getRobotsTxt: generateRobotsTxt
  };
};
