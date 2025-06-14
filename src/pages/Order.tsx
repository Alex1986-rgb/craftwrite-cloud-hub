
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
import { ArrowLeft, Sparkles, Zap, Star } from "lucide-react";

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
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30 relative overflow-hidden">
          {/* Улучшенные фоновые декорации */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-blue-400/15 via-purple-400/12 to-pink-400/8 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-80 md:h-80 bg-gradient-to-r from-emerald-400/15 via-blue-400/12 to-purple-400/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-r from-yellow-400/10 via-orange-400/8 to-red-400/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
            
            {/* Плавающие элементы для десктопа */}
            <div className="hidden md:block absolute top-20 right-20 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce opacity-40" style={{ animationDelay: '0.5s' }}></div>
            <div className="hidden md:block absolute bottom-40 left-20 w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-bounce opacity-35" style={{ animationDelay: '1.5s' }}></div>
            <div className="hidden lg:block absolute top-1/2 right-1/3 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce opacity-30" style={{ animationDelay: '2s' }}></div>
            <div className="hidden lg:block absolute top-1/4 left-1/2 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce opacity-25" style={{ animationDelay: '2.5s' }}></div>
          </div>

          <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
            <div className="mb-8 md:mb-12 flex flex-col gap-4 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowServiceCatalog(true)}
                  className="group flex items-center gap-3 hover:scale-105 transition-all duration-300 shadow-lg border-2 border-blue-200/60 hover:border-blue-400/70 bg-white/90 backdrop-blur-sm hover:bg-white/95 text-sm md:text-base px-6 py-3 md:px-8 md:py-4 rounded-xl"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                  <span className="font-semibold">Вернуться к каталогу</span>
                </Button>
                
                <div className="flex items-center gap-3 text-sm md:text-base text-slate-700 bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm px-6 py-3 md:px-8 md:py-4 rounded-xl border border-slate-200/60 shadow-sm">
                  <Sparkles className="w-5 h-5 text-blue-500" />
                  <span>Или выберите готовое решение из каталога услуг</span>
                </div>
              </div>
              
              {/* Дополнительная информация */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Zap className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-green-800">Быстрое оформление</div>
                    <div className="text-sm text-green-600">Заказ за 3 минуты</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-blue-800">Высокое качество</div>
                    <div className="text-sm text-blue-600">10 000+ довольных клиентов</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-purple-800">Гарантия качества</div>
                    <div className="text-sm text-purple-600">14 дней на правки</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
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
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30 relative overflow-hidden">
        <OrderBackground />

        <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-16 relative z-10">
          <div className="animate-fade-in mb-12">
            <OrderPageHero onQuickOrder={handleQuickOrder} />
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
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
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {filtered.length > 0 ? (
              <OrderServiceGrid
                services={filtered}
                onOrderNow={handleQuickOrder}
              />
            ) : (
              <OrderEmptyState onResetFilters={handleResetFilters} />
            )}
          </div>
          
          <div className="animate-fade-in px-4 mt-20" style={{ animationDelay: '0.6s' }}>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
                  О нашем сервисе
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
              </div>
              <SeoTextExpandable text={seoText} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
