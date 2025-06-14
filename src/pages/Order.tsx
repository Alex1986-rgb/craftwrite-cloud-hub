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
На платформе можно выбрать формат (SEO-статья, лендинг, описание, пост для соцсетей и др.), тематику, язык и дополнительные параметры для точного выполнения задачи.

Почему нам доверяют:
- Простой и понятный интерфейс заказа: в пару кликов выберите нужный вариант.
- Можно подобрать авторов с опытом в отрасли (например: IT, маркетинг, e-commerce, B2B).
- Оперативное выполнение даже крупных объемов.
- Контроль качества на каждом этапе.
- Любые доработки — бесплатно по вашему запросу!

Сделайте контент ещё сильнее вместе с CopyPro Cloud!
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
          {/* Modern background decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-blue-400/8 via-purple-400/6 to-pink-400/4 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-emerald-400/8 via-blue-400/6 to-purple-400/4 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Floating elements - hidden on mobile */}
            <div className="hidden md:block absolute top-20 right-20 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce opacity-20" style={{ animationDelay: '0.5s' }}></div>
            <div className="hidden md:block absolute bottom-40 left-20 w-6 h-6 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-bounce opacity-15" style={{ animationDelay: '1.5s' }}></div>
          </div>

          <div className="container mx-auto px-4 py-6 md:py-12 relative z-10">
            <div className="mb-6 md:mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 animate-fade-in">
              <Button 
                variant="outline" 
                onClick={() => setShowServiceCatalog(true)}
                className="flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-lg border-2 border-blue-200/50 hover:border-blue-400/60 bg-white/70 backdrop-blur-sm hover:bg-white/90 text-sm md:text-base px-3 py-2 md:px-4 md:py-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Каталог услуг
              </Button>
              <div className="text-xs md:text-sm text-slate-600 bg-white/60 backdrop-blur-sm px-4 py-2 md:px-6 md:py-3 rounded-full border border-slate-200/50 shadow-sm">
                Или выберите услугу из каталога
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
          
          <div className="animate-fade-in px-4" style={{ animationDelay: '1s' }}>
            <SeoTextExpandable text={seoText} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
