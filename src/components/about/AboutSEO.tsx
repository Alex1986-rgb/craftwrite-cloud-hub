
import { SEO_CONFIG, generateWebPageStructuredData, generateBreadcrumbStructuredData } from "@/utils/seoConfig";

export const getAboutSeoData = () => ({
  title: "О компании CopyPro Cloud - Команда профессиональных копирайтеров",
  description: "Узнайте больше о CopyPro Cloud - ведущей команде SEO-копирайтеров. Наша миссия, ценности, достижения и подход к созданию качественного контента для вашего бизнеса.",
  keywords: "о компании, команда копирайтеров, профессиональные копирайтеры, SEO-копирайтинг, миссия компании",
  canonicalUrl: `${SEO_CONFIG.baseUrl}/about`,
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      generateWebPageStructuredData({
        title: "О компании CopyPro Cloud",
        description: "Информация о команде профессиональных копирайтеров",
        url: "/about",
        about: "Company Information",
        keywords: "команда, копирайтеры, о компании"
      }),
      generateBreadcrumbStructuredData([
        { name: "Главная", url: "/" },
        { name: "О компании", url: "/about" }
      ]),
      {
        "@type": "Organization",
        "name": SEO_CONFIG.siteName,
        "url": SEO_CONFIG.baseUrl,
        "description": "Профессиональная команда SEO-копирайтеров",
        "foundingDate": "2020",
        "numberOfEmployees": "30+",
        "address": SEO_CONFIG.organization.address,
        "contactPoint": SEO_CONFIG.organization.contactPoint,
        "sameAs": SEO_CONFIG.organization.sameAs
      }
    ]
  }
});
