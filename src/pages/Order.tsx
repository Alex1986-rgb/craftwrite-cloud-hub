
import { useState, useMemo } from "react";
import { SERVICES } from "@/data/services";
import { Button } from "@/components/ui/button";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import OrderForm from "@/components/order/OrderForm";
import OrderPageHero from "@/components/order/OrderPageHero";
import OrderAdvancedFilters from "@/components/order/OrderAdvancedFilters";
import OrderServiceCardEnhanced from "@/components/order/OrderServiceCardEnhanced";
import OrderEmptyState from "@/components/order/OrderEmptyState";
import OrderBackground from "@/components/order/OrderBackground";
import { ArrowLeft, Sparkles, Zap, Star, Shield, Clock, Target } from "lucide-react";

const seoText = `
Заказ текстов на CopyPro Cloud — быстро, удобно и профессионально.

Наша платформа позволяет выбрать оптимальный формат контента (SEO-статья, лендинг, описание товара, пост для соцсетей и др.), 
указать тематику, язык и дополнительные параметры для максимально точного выполнения задачи.

**Почему более 10 000 клиентов доверяют нам:**

🎯 **Интуитивно понятный интерфейс заказа** - создайте техническое задание в несколько кликов
📊 **Прозрачное ценообразование** - знайте точную стоимость еще до оформления заказа
⚡ **Гибкие сроки выполнения** - от экспресс-заказов (24 часа) до стандартных (3-5 дней)
👥 **Специализированные авторы** с опытом в различных отраслях (IT, маркетинг, e-commerce, B2B, медицина, финансы)
🔒 **Гарантированное качество** - многоуровневый контроль на каждом этапе создания контента
✅ **Безлимитные правки** - абсолютно бесплатно в течение 14 дней после сдачи проекта

**Преимущества нашего сервиса:**

• **Персонализированный подход** - учитываем специфику вашего бизнеса и целевую аудиторию
• **SEO-оптимизация** - все тексты создаются с учетом поисковых алгоритмов
• **Копирайтинг-аналитика** - предоставляем отчеты о эффективности контента
• **Техническая поддержка 24/7** - помогаем на каждом этапе сотрудничества
• **Конфиденциальность** - подписываем NDA и гарантируем защиту ваших данных

**Форматы контента, которые мы создаем:**

📝 **SEO-статьи** - оптимизированные под поисковые запросы, с правильной структурой и метатегами
🎯 **Лендинги** - продающие страницы с высокой конверсией и убедительными CTA
🛍️ **Описания товаров** - детальные и привлекательные карточки для интернет-магазинов
📱 **Контент для соцсетей** - посты, сторис, рекламные креативы для всех популярных платформ
📧 **Email-рассылки** - от welcome-серий до продающих последовательностей
📊 **Презентации** - структурированные и визуально привлекательные материалы
🌐 **Веб-контент** - тексты для корпоративных сайтов, блогов, новостных разделов

**Превратите ваш контент в мощный инструмент продаж вместе с CopyPro Cloud!**

Начните прямо сейчас — создание заказа займет менее 5 минут, а результат превзойдет ваши ожидания.
`;

export default function Order() {
  const [showServiceCatalog, setShowServiceCatalog] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [popularity, setPopularity] = useState("all");

  const filteredServices = useMemo(() => {
    return SERVICES.filter(service => {
      const matchesSearch = !searchQuery || 
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = category === "all" || service.category === category;
      const matchesDifficulty = difficulty === "all" || service.difficulty === difficulty;
      
      const matchesPrice = priceRange === "all" || (() => {
        switch (priceRange) {
          case "budget": return service.price.max <= 3000;
          case "standard": return service.price.min >= 3000 && service.price.max <= 10000;
          case "premium": return service.price.min >= 10000 && service.price.max <= 20000;
          case "enterprise": return service.price.min >= 20000;
          default: return true;
        }
      })();

      const matchesPopularity = popularity === "all" || (() => {
        switch (popularity) {
          case "high": return service.popularity >= 4;
          case "medium": return service.popularity === 3;
          case "low": return service.popularity <= 2;
          default: return true;
        }
      })();

      return matchesSearch && matchesCategory && matchesDifficulty && matchesPrice && matchesPopularity;
    });
  }, [searchQuery, category, difficulty, priceRange, popularity]);

  const handleQuickOrder = () => {
    setShowServiceCatalog(false);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setCategory("all");
    setDifficulty("all");
    setPriceRange("all");
    setPopularity("all");
  };

  const handleServiceSelect = (serviceName: string) => {
    // Логика для выбора услуги и перехода к форме заказа
    setShowServiceCatalog(false);
  };

  const handleLearnMore = (serviceSlug: string) => {
    // Логика для перехода к детальной странице услуги
    window.open(`/service/${serviceSlug}`, '_blank');
  };

  if (!showServiceCatalog) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30 relative overflow-hidden">
          {/* Enhanced background decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-r from-blue-400/15 via-purple-400/12 to-pink-400/8 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-80 md:h-80 bg-gradient-to-r from-emerald-400/15 via-blue-400/12 to-purple-400/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-r from-yellow-400/10 via-orange-400/8 to-red-400/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
          </div>

          <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
            <div className="mb-8 md:mb-12 flex flex-col gap-6 animate-fade-in">
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
              
              {/* Enhanced information cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-green-800">Быстрое оформление</div>
                    <div className="text-sm text-green-600">Заказ за 5 минут</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-blue-800">Высокое качество</div>
                    <div className="text-sm text-blue-600">10 000+ довольных клиентов</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-purple-800">Гарантия качества</div>
                    <div className="text-sm text-purple-600">14 дней на правки</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200/50 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-orange-800">Точность попадания</div>
                    <div className="text-sm text-orange-600">98% успешных проектов</div>
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

          <div className="animate-fade-in mb-8" style={{ animationDelay: '0.2s' }}>
            <OrderAdvancedFilters
              services={SERVICES}
              filteredServices={filteredServices}
              searchQuery={searchQuery}
              category={category}
              difficulty={difficulty}
              priceRange={priceRange}
              popularity={popularity}
              onSearchChange={setSearchQuery}
              onCategoryChange={setCategory}
              onDifficultyChange={setDifficulty}
              onPriceRangeChange={setPriceRange}
              onPopularityChange={setPopularity}
              onClearFilters={handleClearFilters}
            />
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20">
                {filteredServices.map((service, index) => (
                  <div
                    key={service.slug}
                    className="animate-fade-in"
                    style={{ animationDelay: `${0.1 * index}s` }}
                  >
                    <OrderServiceCardEnhanced
                      service={service}
                      onSelect={() => handleServiceSelect(service.name)}
                      onLearnMore={() => handleLearnMore(service.slug)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <OrderEmptyState onResetFilters={handleClearFilters} />
            )}
          </div>
          
          <div className="animate-fade-in px-4 mt-20" style={{ animationDelay: '0.6s' }}>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
                  Профессиональный копирайтинг для вашего бизнеса
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
