
import { SEO_CONFIG, generateWebPageStructuredData, generateBreadcrumbStructuredData } from "@/utils/seoConfig";

export const getPricesSeoData = () => ({
  title: "Цены на копирайтинг услуги | CopyPro Cloud - Прозрачное ценообразование",
  description: "Честные цены на профессиональные копирайтинг услуги. SEO-статьи от 500₽, лендинги от 2000₽, описания товаров от 200₽. Калькулятор стоимости и гибкие тарифы.",
  keywords: "цены копирайтинг, стоимость текстов, тарифы копирайтинг, цены seo статьи, стоимость лендинга",
  canonicalUrl: `${SEO_CONFIG.baseUrl}/prices`,
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      generateWebPageStructuredData({
        title: "Цены на копирайтинг услуги",
        description: "Прозрачное ценообразование на все виды копирайтинг услуг",
        url: "/prices",
        about: "Pricing Information",
        keywords: "цены, тарифы, стоимость, копирайтинг"
      }),
      generateBreadcrumbStructuredData([
        { name: "Главная", url: "/" },
        { name: "Цены", url: "/prices" }
      ])
    ]
  }
});
