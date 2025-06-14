
export const SEO_CONFIG = {
  siteName: "CopyPro Cloud",
  defaultTitle: "CopyPro Cloud - Профессиональные тексты для вашего бизнеса",
  defaultDescription: "Заказать качественные тексты для сайта, рекламы и социальных сетей. SEO-статьи, лендинги, описания товаров от экспертов копирайтинга.",
  baseUrl: "https://copypro.cloud",
  defaultKeywords: "копирайтинг, seo тексты, контент маркетинг, продающие тексты, рерайтинг, статьи для сайта",
  defaultImage: "https://lovable.dev/opengraph-image-p98pqg.png",
  twitterHandle: "@copyprocloud",
  facebookAppId: "123456789",
  organization: {
    name: "CopyPro Cloud",
    legalName: "ООО КопиПро Клауд",
    url: "https://copypro.cloud",
    logo: "https://copypro.cloud/logo.png",
    foundingDate: "2019",
    founders: ["Алексей Копирайтов", "Мария Контентова"],
    address: {
      streetAddress: "ул. Текстовая, д. 1",
      addressLocality: "Москва", 
      postalCode: "101000",
      addressCountry: "RU"
    },
    contactPoint: {
      telephone: "+7 (495) 123-45-67",
      email: "info@copypro.cloud",
      contactType: "customer service"
    },
    sameAs: [
      "https://t.me/copypro_cloud",
      "https://vk.com/copypro_cloud",
      "https://instagram.com/copyprocloud"
    ]
  }
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
      availability: "https://schema.org/InStock",
      priceValidUntil: "2024-12-31"
    },
    category: service.category,
    serviceType: "Copywriting",
    areaServed: "RU"
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

export const generateArticleStructuredData = (article: any) => {
  return generateStructuredData("Article", {
    headline: article.title,
    description: article.excerpt || article.description,
    author: {
      "@type": "Person",
      name: article.author
    },
    publisher: {
      "@type": "Organization", 
      name: SEO_CONFIG.siteName,
      logo: {
        "@type": "ImageObject",
        url: SEO_CONFIG.organization.logo
      }
    },
    datePublished: article.publishDate || article.date,
    dateModified: article.modifiedDate || article.publishDate || article.date,
    image: article.image || SEO_CONFIG.defaultImage,
    articleSection: article.category,
    keywords: article.tags?.join(", "),
    wordCount: article.wordCount,
    inLanguage: "ru"
  });
};

export const generateWebPageStructuredData = (page: any) => {
  return generateStructuredData("WebPage", {
    name: page.title,
    description: page.description,
    url: `${SEO_CONFIG.baseUrl}${page.url}`,
    inLanguage: "ru",
    isPartOf: {
      "@type": "WebSite",
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.baseUrl
    },
    about: page.about,
    keywords: page.keywords,
    dateModified: new Date().toISOString()
  });
};

export const generateFAQStructuredData = (faqs: Array<{question: string, answer: string}>) => {
  return generateStructuredData("FAQPage", {
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  });
};

export const generateLocalBusinessStructuredData = () => {
  return generateStructuredData("LocalBusiness", {
    ...SEO_CONFIG.organization,
    "@type": "ProfessionalService",
    priceRange: "₽₽",
    currenciesAccepted: "RUB",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Copywriting Services",
      itemListElement: []
    },
    aggregateRating: {
      "@type": "AggregateRating", 
      ratingValue: "4.9",
      reviewCount: "1247",
      bestRating: "5",
      worstRating: "1"
    },
    openingHours: "Mo,Tu,We,Th,Fr 09:00-18:00"
  });
};
