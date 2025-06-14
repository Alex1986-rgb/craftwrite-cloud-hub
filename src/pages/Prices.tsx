
import { useState } from "react";
import Seo from "@/components/Seo";
import { SEO_CONFIG, generateWebPageStructuredData, generateBreadcrumbStructuredData } from "@/utils/seoConfig";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PriceTable from "@/components/prices/PriceTable";
import PriceCalculator from "@/components/prices/PriceCalculator";
import PriceComparison from "@/components/prices/PriceComparison";
import PriceFAQ from "@/components/prices/PriceFAQ";

const seoData = {
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
};

export default function Prices() {
  const [selectedService, setSelectedService] = useState("");

  return (
    <>
      <Seo {...seoData} />
      
      <div className="min-h-screen bg-white" itemScope itemType="https://schema.org/WebPage">
        {/* Skip to content link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md z-50"
        >
          Перейти к основному содержанию
        </a>
        
        <Header />
        
        <main 
          id="main-content"
          role="main" 
          aria-label="Цены на копирайтинг услуги"
          itemProp="mainEntity"
          itemScope
          itemType="https://schema.org/Service"
        >
          {/* Header Section */}
          <section 
            aria-labelledby="prices-hero-heading"
            role="banner"
            className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50"
          >
            <div className="container mx-auto px-4 text-center">
              <header>
                <h1 
                  id="prices-hero-heading"
                  className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
                  itemProp="name"
                >
                  Прозрачные цены на копирайтинг
                </h1>
                <p 
                  className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
                  itemProp="description"
                >
                  Никаких скрытых платежей. Честная стоимость за качественный результат. 
                  Используйте калькулятор для точного расчета стоимости вашего проекта.
                </p>
              </header>
            </div>
          </section>

          {/* Price Calculator Section */}
          <section 
            aria-labelledby="calculator-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <div className="container mx-auto px-4">
              <header className="text-center mb-12">
                <h2 
                  id="calculator-heading"
                  className="text-2xl md:text-3xl font-bold mb-4"
                >
                  Калькулятор стоимости
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Рассчитайте точную стоимость вашего проекта с учетом всех параметров
                </p>
              </header>
              <PriceCalculator 
                selectedService={selectedService}
                onServiceChange={setSelectedService}
              />
            </div>
          </section>

          {/* Price Table Section */}
          <section 
            aria-labelledby="price-table-heading"
            role="region"
            className="py-16 md:py-24 bg-slate-50"
            itemScope
            itemType="https://schema.org/PriceSpecification"
          >
            <div className="container mx-auto px-4">
              <header className="text-center mb-12">
                <h2 
                  id="price-table-heading"
                  className="text-2xl md:text-3xl font-bold mb-4"
                >
                  Тарифы на услуги
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Выберите подходящий тариф для вашего бизнеса
                </p>
              </header>
              <PriceTable />
            </div>
          </section>

          {/* Price Comparison Section */}
          <section 
            aria-labelledby="comparison-heading"
            role="region"
            className="py-16 md:py-24"
          >
            <div className="container mx-auto px-4">
              <header className="text-center mb-12">
                <h2 
                  id="comparison-heading"
                  className="text-2xl md:text-3xl font-bold mb-4"
                >
                  Сравнение с конкурентами
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Почему клиенты выбирают CopyPro Cloud
                </p>
              </header>
              <PriceComparison />
            </div>
          </section>

          {/* FAQ Section */}
          <section 
            aria-labelledby="price-faq-heading"
            role="region"
            className="py-16 md:py-24 bg-slate-50"
            itemScope
            itemType="https://schema.org/FAQPage"
          >
            <div className="container mx-auto px-4">
              <header className="text-center mb-12">
                <h2 
                  id="price-faq-heading"
                  className="text-2xl md:text-3xl font-bold mb-4"
                >
                  Часто задаваемые вопросы о ценах
                </h2>
              </header>
              <PriceFAQ />
            </div>
          </section>
        </main>

        <Footer />
        
        {/* Breadcrumb navigation */}
        <nav aria-label="Навигация по сайту" className="sr-only">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a itemProp="item" href="/">
                <span itemProp="name">Главная</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name">Цены</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
}
