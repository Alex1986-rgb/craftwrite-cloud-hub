
export interface SeoMeta {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonical?: string;
  robots?: string;
  structuredData?: any;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export const generateCanonicalUrl = (path: string): string => {
  const baseUrl = import.meta.env.VITE_BASE_URL || 'https://copypro-cloud.lovable.app';
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

export const generateMetaDescription = (content: string, maxLength: number = 160): string => {
  if (content.length <= maxLength) return content;
  const truncated = content.substring(0, maxLength - 3);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  return lastSpaceIndex > 0 ? truncated.substring(0, lastSpaceIndex) + '...' : truncated + '...';
};

export const generateKeywords = (tags: string[]): string => {
  return tags.slice(0, 10).join(', ');
};

export const createBreadcrumbStructuredData = (breadcrumbs: BreadcrumbItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": generateCanonicalUrl(item.url)
    }))
  };
};

export const createOrganizationStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CopyPro Cloud",
    "description": "Профессиональная платформа копирайтинга с командой сертифицированных экспертов",
    "url": generateCanonicalUrl('/'),
    "logo": generateCanonicalUrl('/logo.png'),
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+7-800-555-0199",
      "contactType": "customer service",
      "availableLanguage": "Russian"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RU",
      "addressLocality": "Москва"
    },
    "sameAs": [
      "https://t.me/copyprocloud",
      "https://vk.com/copyprocloud"
    ]
  };
};

export const createServiceStructuredData = (service: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.desc || service.description,
    "provider": {
      "@type": "Organization",
      "name": "CopyPro Cloud"
    },
    "serviceType": service.format || "Копирайтинг",
    "offers": {
      "@type": "Offer",
      "price": service.price?.min?.toString() || "1000",
      "priceCurrency": "RUB",
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    "areaServed": {
      "@type": "Country",
      "name": "Russia"
    }
  };
};

export const createFAQStructuredData = (faqs: Array<{question: string, answer: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};
