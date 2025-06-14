
import { SEO_CONFIG, generateWebPageStructuredData, generateBreadcrumbStructuredData } from "@/utils/seoConfig";

export const getPricesSeoData = () => ({
  title: "Цены на копирайтинг услуги | CopyPro Cloud - Прозрачные тарифы",
  description: "Актуальные цены на профессиональные копирайтинг услуги. SEO-статьи от 500₽, лендинги от 3000₽, описания товаров от 100₽. Калькулятор стоимости онлайн.",
  keywords: "цены копирайтинг, стоимость seo статей, цена лендинга, тарифы копирайтера, калькулятор стоимости текстов",
  canonicalUrl: `${SEO_CONFIG.baseUrl}/prices`,
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      generateWebPageStructuredData({
        title: "Цены на копирайтинг услуги",
        description: "Прозрачные тарифы на профессиональные копирайтинг услуги",
        url: "/prices",
        about: "Pricing Information",
        keywords: "цены, тарифы, стоимость, копирайтинг",
        mainEntity: {
          "@type": "PriceSpecification",
          name: "Копирайтинг услуги",
          description: "Профессиональные тарифы на создание контента"
        }
      }),
      generateBreadcrumbStructuredData([
        { name: "Главная", url: "/" },
        { name: "Цены", url: "/prices" }
      ]),
      {
        "@type": "Service",
        "name": "Копирайтинг услуги",
        "description": "Профессиональное создание текстового контента",
        "provider": {
          "@type": "Organization",
          "name": SEO_CONFIG.siteName,
          "url": SEO_CONFIG.baseUrl
        },
        "areaServed": "RU",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Каталог копирайтинг услуг",
          "itemListElement": [
            {
              "@type": "Offer",
              "name": "SEO-статьи",
              "description": "Оптимизированные статьи для поисковых систем",
              "price": "500",
              "priceCurrency": "RUB",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": "500",
                "priceCurrency": "RUB",
                "referenceQuantity": {
                  "@type": "QuantitativeValue",
                  "value": "1000",
                  "unitText": "знаков"
                }
              },
              "availability": "https://schema.org/InStock",
              "validFrom": "2024-01-01",
              "validThrough": "2024-12-31"
            },
            {
              "@type": "Offer",
              "name": "Лендинги",
              "description": "Продающие посадочные страницы",
              "price": "3000",
              "priceCurrency": "RUB",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": "3000",
                "priceCurrency": "RUB",
                "referenceQuantity": {
                  "@type": "QuantitativeValue",
                  "value": "1",
                  "unitText": "страница"
                }
              },
              "availability": "https://schema.org/InStock"
            },
            {
              "@type": "Offer",
              "name": "Описания товаров",
              "description": "Привлекательные описания для интернет-магазинов",
              "price": "100",
              "priceCurrency": "RUB",
              "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "price": "100",
                "priceCurrency": "RUB",
                "referenceQuantity": {
                  "@type": "QuantitativeValue",
                  "value": "1",
                  "unitText": "товар"
                }
              },
              "availability": "https://schema.org/InStock"
            }
          ]
        },
        "offers": {
          "@type": "AggregateOffer",
          "lowPrice": "100",
          "highPrice": "50000",
          "priceCurrency": "RUB",
          "offerCount": "15"
        }
      }
    ]
  }
});
