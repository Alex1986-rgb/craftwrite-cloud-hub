
import { generateSitemap, generateRobotsTxt } from './enhancedSitemap';
import { generateCanonicalUrl } from './seoUtils';

export interface SeoAnalytics {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversionRate: number;
}

export interface SeoPerformance {
  coreWebVitals: {
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
  };
  lighthouse: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
}

// Генерация RSS фида для блога
export const generateRssFeed = (posts: any[]): string => {
  const baseUrl = import.meta.env.VITE_BASE_URL || 'https://copypro-cloud.lovable.app';
  const currentDate = new Date().toUTCString();

  let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>CopyPro Cloud Blog - Профессиональный копирайтинг</title>
    <description>Экспертные статьи о копирайтинге, контент-маркетинге и SEO-продвижении</description>
    <link>${baseUrl}/blog</link>
    <language>ru-RU</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>hello@copypro-cloud.com (CopyPro Cloud Team)</managingEditor>
    <webMaster>tech@copypro-cloud.com (CopyPro Cloud Tech)</webMaster>
    <category>Copywriting</category>
    <category>SEO</category>
    <category>Content Marketing</category>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>CopyPro Cloud</title>
      <link>${baseUrl}</link>
      <width>144</width>
      <height>144</height>
    </image>`;

  posts.forEach(post => {
    const postUrl = `${baseUrl}/blog/${post.slug}`;
    const pubDate = new Date(post.publishedAt || post.date).toUTCString();
    
    rss += `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt || post.description}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>hello@copypro-cloud.com (${post.author || 'CopyPro Cloud Team'})</author>`;
    
    if (post.category) {
      rss += `
      <category><![CDATA[${post.category}]]></category>`;
    }
    
    if (post.tags) {
      post.tags.forEach((tag: string) => {
        rss += `
      <category><![CDATA[${tag}]]></category>`;
      });
    }
    
    if (post.coverImage || post.image) {
      rss += `
      <enclosure url="${post.coverImage || post.image}" type="image/jpeg"/>`;
    }
    
    rss += `
    </item>`;
  });

  rss += `
  </channel>
</rss>`;

  return rss;
};

// Оптимизация изображений для SEO
export const optimizeImageForSeo = (src: string, alt: string, title?: string): Record<string, string> => {
  return {
    src,
    alt,
    title: title || alt,
    loading: 'lazy',
    decoding: 'async',
    // Добавляем structured data для изображений
    itemProp: 'image',
    'data-seo-optimized': 'true'
  };
};

// Генерация JSON-LD для статьи
export const createArticleStructuredData = (article: any) => {
  const baseUrl = import.meta.env.VITE_BASE_URL || 'https://copypro-cloud.lovable.app';
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description || article.excerpt,
    "image": article.coverImage || article.image || `${baseUrl}/og-image.jpg`,
    "datePublished": article.publishedAt || article.date,
    "dateModified": article.modifiedAt || article.publishedAt || article.date,
    "author": {
      "@type": "Person",
      "name": article.author || "CopyPro Cloud Team",
      "url": `${baseUrl}/about`
    },
    "publisher": {
      "@type": "Organization",
      "name": "CopyPro Cloud",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${article.slug || article.id}`
    },
    "articleSection": article.category || "Копирайтинг",
    "keywords": article.tags ? article.tags.join(", ") : "копирайтинг, SEO, контент-маркетинг",
    "wordCount": article.wordCount || 1500,
    "inLanguage": "ru-RU"
  };
};

// Создание breadcrumb navigation для SEO
export const createBreadcrumbNavigation = (breadcrumbs: Array<{name: string, url: string}>) => {
  return breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": generateCanonicalUrl(crumb.url)
  }));
};

// Анализ SEO-показателей страницы
export const analyzeSeoMetrics = (element: HTMLElement): {
  hasH1: boolean;
  h1Count: number;
  hasMetaDescription: boolean;
  metaDescriptionLength: number;
  imageWithoutAlt: number;
  internalLinks: number;
  externalLinks: number;
  wordCount: number;
} => {
  const h1Elements = element.querySelectorAll('h1');
  const metaDescription = document.querySelector('meta[name="description"]');
  const imagesWithoutAlt = element.querySelectorAll('img:not([alt])');
  const internalLinks = element.querySelectorAll('a[href^="/"], a[href*="copypro-cloud"]');
  const externalLinks = element.querySelectorAll('a[href^="http"]:not([href*="copypro-cloud"])');
  
  const textContent = element.textContent || '';
  const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
  
  return {
    hasH1: h1Elements.length > 0,
    h1Count: h1Elements.length,
    hasMetaDescription: !!metaDescription,
    metaDescriptionLength: metaDescription?.getAttribute('content')?.length || 0,
    imageWithoutAlt: imagesWithoutAlt.length,
    internalLinks: internalLinks.length,
    externalLinks: externalLinks.length,
    wordCount
  };
};

// Автоматическая генерация alt-тегов на основе имени файла
export const generateAltFromFilename = (src: string): string => {
  const filename = src.split('/').pop()?.split('.')[0] || '';
  return filename
    .replace(/[-_]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, l => l.toUpperCase())
    .trim();
};

// Проверка Core Web Vitals
export const measureWebVitals = (): Promise<SeoPerformance['coreWebVitals']> => {
  return new Promise((resolve) => {
    if ('web-vitals' in window) {
      // @ts-ignore - web-vitals library
      import('web-vitals').then(({ getCLS, getFID, getLCP }) => {
        const metrics = { lcp: 0, fid: 0, cls: 0 };
        
        getLCP((metric: any) => {
          metrics.lcp = metric.value;
        });
        
        getFID((metric: any) => {
          metrics.fid = metric.value;
        });
        
        getCLS((metric: any) => {
          metrics.cls = metric.value;
          resolve(metrics);
        });
      });
    } else {
      resolve({ lcp: 0, fid: 0, cls: 0 });
    }
  });
};

// Инициализация SEO для всего приложения
export const initializeSeo = () => {
  // Регистрация Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  }

  // Автоматическое добавление alt-тегов
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          const images = element.querySelectorAll('img:not([alt])');
          images.forEach((img: Element) => {
            const htmlImg = img as HTMLImageElement;
            const alt = generateAltFromFilename(htmlImg.src);
            htmlImg.alt = alt;
          });
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Инициализация аналитики
  if (import.meta.env.VITE_ANALYTICS_ID) {
    // Google Analytics 4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_ANALYTICS_ID}`;
    document.head.appendChild(script);

    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore
    function gtag(...args: any[]) { window.dataLayer.push(args); }
    // @ts-ignore
    window.gtag = gtag;
    // @ts-ignore
    gtag('js', new Date());
    // @ts-ignore
    gtag('config', import.meta.env.VITE_ANALYTICS_ID);
  }

  // Яндекс.Метрика
  if (import.meta.env.VITE_YANDEX_METRIKA) {
    // @ts-ignore
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*Number(new Date());k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    
    // @ts-ignore
    ym(import.meta.env.VITE_YANDEX_METRIKA, "init", {
      clickmap:true,
      trackLinks:true,
      accurateTrackBounce:true,
      webvisor:true
    });
  }
};
