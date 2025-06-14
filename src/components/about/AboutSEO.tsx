
import { SEO_CONFIG, generateWebPageStructuredData, generateBreadcrumbStructuredData } from "@/utils/seoConfig";

export const getAboutSeoData = () => ({
  title: "О компании CopyPro Cloud | Профессиональная команда копирайтеров",
  description: "Узнайте больше о CopyPro Cloud - ведущем агентстве копирайтинга с более чем 5-летним опытом. Наша миссия, ценности, команда экспертов и достижения.",
  keywords: "о компании, копирайтинг агентство, команда копирайтеров, история компании, миссия, ценности, достижения",
  canonicalUrl: `${SEO_CONFIG.baseUrl}/about`,
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      generateWebPageStructuredData({
        title: "О компании CopyPro Cloud",
        description: "Информация о команде, миссии и достижениях компании",
        url: "/about",
        about: "Company Information",
        keywords: "о компании, команда, миссия, достижения",
        mainEntity: {
          "@type": "Organization",
          name: SEO_CONFIG.siteName,
          description: "Ведущее агентство копирайтинга в России",
          foundingDate: SEO_CONFIG.organization.foundingDate,
          address: SEO_CONFIG.organization.address,
          contactPoint: SEO_CONFIG.organization.contactPoint,
          sameAs: SEO_CONFIG.organization.sameAs,
          employees: {
            "@type": "QuantitativeValue", 
            "value": "30+"
          },
          awards: [
            "Лучшее копирайтинг агентство 2023",
            "ТОП-10 контент-агентств России"
          ]
        }
      }),
      generateBreadcrumbStructuredData([
        { name: "Главная", url: "/" },
        { name: "О компании", url: "/about" }
      ]),
      {
        "@type": "AboutPage",
        "name": "О компании CopyPro Cloud",
        "description": "Подробная информация о нашей компании, команде и достижениях",
        "url": `${SEO_CONFIG.baseUrl}/about`,
        "inLanguage": "ru",
        "mainEntity": {
          "@type": "Organization",
          "name": SEO_CONFIG.siteName,
          "alternateName": "КопиПро Клауд",
          "description": "Профессиональное агентство копирайтинга с командой из 30+ экспертов",
          "foundingDate": "2019-01-15",
          "numberOfEmployees": {
            "@type": "QuantitativeValue",
            "value": "30"
          },
          "knowsAbout": [
            "SEO-копирайтинг",
            "Контент-маркетинг", 
            "Создание лендингов",
            "Email-маркетинг",
            "Социальные медиа"
          ],
          "hasCredential": [
            {
              "@type": "EducationalOccupationalCredential",
              "credentialCategory": "certification",
              "name": "Google Ads сертификация"
            },
            {
              "@type": "EducationalOccupationalCredential", 
              "credentialCategory": "certification",
              "name": "Яндекс.Директ сертификация"
            }
          ]
        }
      }
    ]
  }
});
