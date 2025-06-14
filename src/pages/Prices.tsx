
import Seo from "@/components/Seo";
import { SEO_CONFIG, generateBreadcrumbStructuredData } from "@/utils/seoConfig";
import PriceTable from "@/components/prices/PriceTable";
import PriceCalculator from "@/components/prices/PriceCalculator";
import PriceComparison from "@/components/prices/PriceComparison";
import PriceFAQ from "@/components/prices/PriceFAQ";

const seoData = {
  title: "Цены на копирайтинг услуги | CopyPro Cloud - Прозрачные тарифы",
  description: "Узнайте стоимость копирайтинг услуг: SEO-статьи от 1000₽, лендинги от 5000₽, описания товаров от 500₽. Калькулятор стоимости. Никаких скрытых платежей.",
  keywords: "цены копирайтинг, стоимость seo текстов, тарифы на тексты, цена за статью, стоимость лендинга, расценки копирайтера",
  canonicalUrl: `${SEO_CONFIG.baseUrl}/prices`,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "PriceSpecification",
    name: "Цены на копирайтинг услуги",
    description: "Прайс-лист на профессиональные копирайтинг услуги",
    url: `${SEO_CONFIG.baseUrl}/prices`,
    priceCurrency: "RUB",
    offers: [
      {
        "@type": "Offer",
        name: "SEO-статья",
        description: "Оптимизированная статья для сайта",
        price: "1000",
        priceCurrency: "RUB",
        priceValidUntil: "2024-12-31",
        availability: "https://schema.org/InStock"
      },
      {
        "@type": "Offer", 
        name: "Лендинг",
        description: "Продающая посадочная страница",
        price: "5000",
        priceCurrency: "RUB",
        priceValidUntil: "2024-12-31",
        availability: "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        name: "Описание товара",
        description: "Продающее описание для интернет-магазина",
        price: "500", 
        priceCurrency: "RUB",
        priceValidUntil: "2024-12-31",
        availability: "https://schema.org/InStock"
      }
    ],
    breadcrumb: generateBreadcrumbStructuredData([
      { name: "Главная", url: "/" },
      { name: "Цены", url: "/prices" }
    ])
  }
};

export default function Prices() {
  return (
    <>
      <Seo {...seoData} />
      <main role="main" className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <header className="text-center mb-12 md:mb-20">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Прозрачные цены на копирайтинг
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
              Честные тарифы без скрытых платежей. Выберите подходящий пакет или рассчитайте индивидуальную стоимость
            </p>
          </header>

          <section aria-label="Тарифные планы">
            <PriceTable />
          </section>

          <section aria-label="Калькулятор стоимости" className="my-16">
            <PriceCalculator />
          </section>

          <section aria-label="Сравнение тарифов" className="my-16">
            <PriceComparison />
          </section>

          <section aria-label="Часто задаваемые вопросы о ценах">
            <PriceFAQ />
          </section>
        </div>
      </main>
    </>
  );
}
