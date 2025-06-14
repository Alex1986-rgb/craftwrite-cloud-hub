
import { SERVICES } from "@/data/services";
import { SEO_CONFIG, generateWebPageStructuredData, generateLocalBusinessStructuredData } from "@/utils/seoConfig";

export const getHomeSeoData = () => ({
  title: "CopyPro Cloud - Профессиональные тексты для вашего бизнеса | SEO-копирайтинг",
  description: "Закажите качественные тексты для сайта, рекламы и социальных сетей. SEO-статьи, лендинги, описания товаров от экспертов копирайтинга. Более 10 000 довольных клиентов.",
  keywords: "копирайтинг, seo тексты, контент маркетинг, продающие тексты, рерайтинг, статьи для сайта, лендинги, описания товаров",
  canonicalUrl: SEO_CONFIG.baseUrl,
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      generateWebPageStructuredData({
        title: "CopyPro Cloud - Главная страница",
        description: "Профессиональные копирайтинг услуги для бизнеса",
        url: "/",
        about: "Copywriting Services",
        keywords: "копирайтинг, seo тексты, контент маркетинг",
        mainEntity: {
          "@type": "Organization",
          name: SEO_CONFIG.siteName,
          url: SEO_CONFIG.baseUrl
        }
      }),
      generateLocalBusinessStructuredData(),
      {
        "@type": "WebSite",
        "name": SEO_CONFIG.siteName,
        "url": SEO_CONFIG.baseUrl,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${SEO_CONFIG.baseUrl}/order?search={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        },
        "sameAs": SEO_CONFIG.organization.sameAs
      },
      {
        "@type": "ItemList",
        "name": "Наши услуги",
        "numberOfItems": SERVICES.length,
        "itemListElement": SERVICES.slice(0, 8).map((service, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Service",
            "name": service.name,
            "description": service.desc,
            "provider": {
              "@type": "Organization",
              "name": SEO_CONFIG.siteName
            },
            "offers": {
              "@type": "Offer",
              "price": service.price.min,
              "priceCurrency": "RUB"
            }
          }
        }))
      }
    ]
  }
});
