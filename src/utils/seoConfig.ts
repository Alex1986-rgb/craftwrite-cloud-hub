
export const SEO_CONFIG = {
  siteName: "CopyPro Cloud",
  defaultTitle: "CopyPro Cloud - Профессиональные тексты для вашего бизнеса",
  defaultDescription: "Заказать качественные тексты для сайта, рекламы и социальных сетей. SEO-статьи, лендинги, описания товаров от экспертов копирайтинга.",
  baseUrl: "https://copypro.cloud",
  defaultKeywords: "копирайтинг, seo тексты, контент маркетинг, продающие тексты, рерайтинг, статьи для сайта",
  defaultImage: "https://lovable.dev/opengraph-image-p98pqg.png"
};

export const generateStructuredData = (type: string, data: any) => {
  const baseStructure = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };
  
  return baseStructure;
};

export const generateServiceStructuredData = (service: any) => {
  return generateStructuredData("Service", {
    name: service.name,
    description: service.desc,
    provider: {
      "@type": "Organization",
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.baseUrl
    },
    offers: {
      "@type": "Offer",
      price: service.price.min,
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock"
    }
  });
};

export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{name: string, url: string}>) => {
  return generateStructuredData("BreadcrumbList", {
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SEO_CONFIG.baseUrl}${crumb.url}`
    }))
  });
};
