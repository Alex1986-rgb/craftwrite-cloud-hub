
import { portfolioProjects } from "@/data/portfolioProjects";
import { SEO_CONFIG, generateWebPageStructuredData, generateBreadcrumbStructuredData } from "@/utils/seoConfig";

export const getPortfolioSeoData = () => ({
  title: "Портфолио CopyPro Cloud | Примеры работ и кейсы копирайтинга",
  description: "Посмотрите на результаты работы CopyPro Cloud: успешные кейсы, примеры SEO-статей, лендингов и коммерческих текстов. Более 500 реализованных проjectов.",
  keywords: "портфолио копирайтер, примеры работ, кейсы копирайтинга, seo статьи примеры, лендинги портфолио, коммерческие тексты",
  canonicalUrl: `${SEO_CONFIG.baseUrl}/portfolio`,
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      generateWebPageStructuredData({
        title: "Портфолио CopyPro Cloud",
        description: "Примеры работ и успешные кейсы копирайтинга",
        url: "/portfolio",
        about: "Portfolio",
        keywords: "портфолио, примеры работ, кейсы",
        mainEntity: {
          "@type": "CollectionPage",
          name: "Портфолио проектов",
          description: "Коллекция успешных копирайтинг проектов"
        }
      }),
      generateBreadcrumbStructuredData([
        { name: "Главная", url: "/" },
        { name: "Портфолио", url: "/portfolio" }
      ]),
      {
        "@type": "CollectionPage",
        "name": "Портфолио CopyPro Cloud",
        "description": "Примеры успешных копирайтинг проектов и кейсы",
        "url": `${SEO_CONFIG.baseUrl}/portfolio`,
        "inLanguage": "ru",
        "mainEntity": {
          "@type": "ItemList",
          "name": "Проекты портфолио",
          "numberOfItems": portfolioProjects.length,
          "itemListElement": portfolioProjects.slice(0, 12).map((project, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "CreativeWork",
              "name": project.title,
              "description": project.description,
              "url": `${SEO_CONFIG.baseUrl}/portfolio/${project.id}`,
              "creator": {
                "@type": "Organization",
                "name": SEO_CONFIG.siteName
              },
              "genre": project.category,
              "keywords": project.tags.join(", "),
              "hasPart": Object.entries(project.metrics).map(([key, value]) => ({
                "@type": "QuantitativeValue",
                "name": key,
                "value": value
              }))
            }
          }))
        },
        "author": {
          "@type": "Organization",
          "name": SEO_CONFIG.siteName,
          "url": SEO_CONFIG.baseUrl
        }
      },
      {
        "@type": "WebSite",
        "name": SEO_CONFIG.siteName,
        "url": SEO_CONFIG.baseUrl,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${SEO_CONFIG.baseUrl}/portfolio?search={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  }
});
