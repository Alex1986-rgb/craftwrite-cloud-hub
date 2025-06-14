
import { useState } from "react";
import { SERVICES } from "@/data/services";
import { Button } from "@/components/ui/button";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import OrderForm from "@/components/order/OrderForm";
import OrderPageHero from "@/components/order/OrderPageHero";
import OrderFilters from "@/components/order/OrderFilters";
import OrderServiceGrid from "@/components/order/OrderServiceGrid";
import OrderEmptyState from "@/components/order/OrderEmptyState";
import OrderBackground from "@/components/order/OrderBackground";
import { ArrowLeft } from "lucide-react";

const seoText = `
Заказ текстов на CopyPro Cloud — быстро, удобно и профессионально.
Наша платформа позволяет выбрать оптимальный формат контента (SEO-статья, лендинг, описание товара, пост для соцсетей и др.), 
указать тематику, язык и дополнительные параметры для максимально точного выполнения задачи.

Почему более 10 000 клиентов доверяют нам:
- Интуитивно понятный интерфейс заказа: создайте техническое задание в несколько кликов
- Возможность выбора специализированных авторов с опытом в вашей отрасли (IT, маркетинг, e-commerce, B2B, медицина, финансы)
- Гарантированное оперативное выполнение даже самых крупных и сложных объемов
- Многоуровневый контроль качества на каждом этапе создания контента
- Безлимитные доработки и правки — абсолютно бесплатно по вашему запросу в течение 14 дней

Превратите ваш контент в мощный инструмент продаж вместе с CopyPro Cloud!
Начните прямо сейчас — создание заказа займет менее 3 минут.
`;

export default function Order() {
  const [showServiceCatalog, setShowServiceCatalog] = useState(true);
  const [category, setCategory] = useState("all");
  const [format, setFormat] = useState("all");
  const [lang, setLang] = useState("all");
  const [topic, setTopic] = useState("all");

  const filtered = SERVICES.filter(service => {
    return (
      (category === "all" || service.category === category) &&
      (format === "all" || service.format === format) &&
      (lang === "all" || service.lang === lang) &&
      (topic === "all" || service.topic === topic)
    );
  });

  const handleQuickOrder = () => {
    setShowServiceCatalog(false);
  };

  const handleResetFilters = () => {
    setCategory("all");
    setFormat("all");
    setLang("all");
    setTopic("all");
  };

  if (!showServiceCatalog) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 relative overflow-hidden">
          {/* Улучшенные фоновые декорации */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-blue-400/10 via-purple-400/8 to-pink-400/6 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-emerald-400/10 via-blue-400/8 to-purple-400/6 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Плавающие элементы для десктопа */}
            <div className="hidden md:block absolute top-20 right-20 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: '0.5s' }}></div>
            <div className="hidden md:block absolute bottom-40 left-20 w-6 h-6 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-bounce opacity-25" style={{ animationDelay: '1.5s' }}></div>
            <div className="hidden lg:block absolute top-1/2 right-1/3 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce opacity-20" style={{ animationDelay: '2s' }}></div>
          </div>

          <div className="container mx-auto px-4 py-6 md:py-12 relative z-10">
            <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 animate-fade-in">
              <Button 
                variant="outline" 
                onClick={() => setShowServiceCatalog(true)}
                className="flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-lg border-2 border-blue-200/50 hover:border-blue-400/60 bg-white/80 backdrop-blur-sm hover:bg-white/95 text-sm md:text-base px-4 py-2 md:px-6 md:py-3"
              >
                <ArrowLeft className="w-4 h-4" />
                Вернуться к каталогу
              </Button>
              <div className="text-xs md:text-sm text-slate-600 bg-white/70 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full border border-slate-200/50 shadow-sm">
                Или выберите готовое решение из каталога услуг
              </div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <OrderForm />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 relative overflow-hidden">
        <OrderBackground />

        <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-16 relative z-10">
          <OrderPageHero onQuickOrder={handleQuickOrder} />

          <OrderFilters
            category={category}
            format={format}
            lang={lang}
            topic={topic}
            filteredCount={filtered.length}
            onCategoryChange={setCategory}
            onFormatChange={setFormat}
            onLangChange={setLang}
            onTopicChange={setTopic}
          />

          {filtered.length > 0 ? (
            <OrderServiceGrid
              services={filtered}
              onOrderNow={handleQuickOrder}
            />
          ) : (
            <OrderEmptyState onResetFilters={handleResetFilters} />
          )}
          
          <div className="animate-fade-in px-4 mt-16" style={{ animationDelay: '1s' }}>
            <SeoTextExpandable text={seoText} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
