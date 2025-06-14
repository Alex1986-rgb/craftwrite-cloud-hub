
import { useState } from "react";
import PriceTable from "./PriceTable";
import PriceCalculator from "./PriceCalculator";
import PriceComparison from "./PriceComparison";
import PriceFAQ from "./PriceFAQ";

export default function PricesContent() {
  const [selectedService, setSelectedService] = useState("");

  return (
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
          <PriceCalculator />
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
  );
}
