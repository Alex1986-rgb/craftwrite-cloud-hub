
import { SEO_CONFIG, generateWebPageStructuredData, generateBreadcrumbStructuredData } from "@/utils/seoConfig";

export const getSitemapSeoData = () => ({
  title: "Карта сайта CopyPro Cloud - Навигация по всем страницам",
  description: "Полная карта сайта CopyPro Cloud со ссылками на все страницы: услуги копирайтинга, портфолио, блог, цены и контакты.",
  keywords: "карта сайта, навигация, структура сайта, копирайтинг услуги, портфолио, блог",
  canonicalUrl: `${SEO_CONFIG.baseUrl}/sitemap`,
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      generateWebPageStructuredData({
        title: "Карта сайта CopyPro Cloud",
        description: "Полная структура сайта для навигации",
        url: "/sitemap",
        about: "Website Navigation",
        keywords: "карта сайта, навигация, структура"
      }),
      generateBreadcrumbStructuredData([
        { name: "Главная", url: "/" },
        { name: "Карта сайта", url: "/sitemap" }
      ]),
      {
        "@type": "SiteNavigationElement",
        "name": "Карта сайта",
        "url": `${SEO_CONFIG.baseUrl}/sitemap`,
        "description": "Полная навигация по сайту CopyPro Cloud"
      }
    ]
  }
});
