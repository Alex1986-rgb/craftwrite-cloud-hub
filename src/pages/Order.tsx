
import { useState } from "react";
import { SERVICES } from "@/data/services";
import { FILTERS, FORMATS, LANGS, TOPICS } from "@/components/landing/ServicesCatalogSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import OrderForm from "@/components/order/OrderForm";
import { ArrowLeft, Search, Filter, Star, Zap, Shield, Award, Sparkles } from "lucide-react";

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

  if (!showServiceCatalog) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 relative overflow-hidden">
          {/* Modern background decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/8 via-purple-400/6 to-pink-400/4 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/8 via-blue-400/6 to-purple-400/4 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Floating elements */}
            <div className="absolute top-20 right-20 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce opacity-20" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-40 left-20 w-6 h-6 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-bounce opacity-15" style={{ animationDelay: '1.5s' }}></div>
          </div>

          <div className="container mx-auto px-4 py-12 relative z-10">
            <div className="mb-8 flex items-center gap-4 animate-fade-in">
              <Button 
                variant="outline" 
                onClick={() => setShowServiceCatalog(true)}
                className="flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-lg border-2 border-blue-200/50 hover:border-blue-400/60 bg-white/70 backdrop-blur-sm hover:bg-white/90"
              >
                <ArrowLeft className="w-4 h-4" />
                Каталог услуг
              </Button>
              <div className="text-sm text-slate-600 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-200/50 shadow-sm">
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
        {/* Ultra-modern background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/10 via-purple-400/8 to-pink-400/6 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-2/3 right-1/3 w-80 h-80 bg-gradient-to-r from-emerald-400/10 via-blue-400/8 to-purple-400/6 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-to-r from-pink-400/8 via-orange-400/6 to-yellow-400/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Advanced grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
          
          {/* Floating particles */}
          <div className="absolute top-1/3 left-1/5 w-3 h-3 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 left-4/5 w-4 h-4 bg-emerald-400/25 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 py-16 relative z-10">
          {/* Hero Section - Completely Redesigned */}
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100/80 to-purple-100/80 text-blue-700 px-8 py-4 rounded-full text-sm font-bold mb-8 border border-blue-200/50 shadow-lg backdrop-blur-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <Star className="w-5 h-5" />
              Элитная команда SEO-экспертов
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight tracking-tight">
              Каталог услуг <br />
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">профессионального</span> копирайтинга
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-medium mb-10">
              Выберите подходящую услугу из нашего каталога или перейдите к быстрому оформлению заказа
            </p>
            
            {/* Enhanced trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-10">
              <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 px-6 py-3 rounded-full text-sm font-semibold border border-emerald-200/50 shadow-lg backdrop-blur-sm">
                <Shield className="w-4 h-4" />
                100% уникальность Text.ru
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold border border-blue-200/50 shadow-lg backdrop-blur-sm">
                <Zap className="w-4 h-4" />
                От 24 часов
              </div>
              <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 px-6 py-3 rounded-full text-sm font-semibold border border-purple-200/50 shadow-lg backdrop-blur-sm">
                <Award className="w-4 h-4" />
                30+ экспертов
              </div>
            </div>

            <Button 
              onClick={() => setShowServiceCatalog(false)}
              size="lg"
              className="relative shadow-2xl transition-all duration-700 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-400 hover:via-blue-400 hover:to-purple-400 px-12 py-7 text-lg font-bold rounded-full hover:scale-110 hover:-translate-y-2 hover:shadow-emerald-500/25 border-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full blur-sm"></div>
              <Sparkles className="w-5 h-5 mr-2 relative z-10" />
              <span className="relative z-10">Быстрый заказ</span>
            </Button>
          </div>

          {/* Ultra-Enhanced Filters */}
          <Card className="p-10 mb-16 shadow-2xl border-0 bg-gradient-to-br from-white/95 via-blue-50/30 to-purple-50/20 backdrop-blur-lg relative overflow-hidden animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                  <Filter className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Умные фильтры поиска
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: "Категория", value: category, setter: setCategory, options: FILTERS },
                  { label: "Формат", value: format, setter: setFormat, options: FORMATS },
                  { label: "Язык", value: lang, setter: setLang, options: LANGS },
                  { label: "Тематика", value: topic, setter: setTopic, options: TOPICS }
                ].map((filter, index) => (
                  <div key={filter.label} className="animate-fade-in" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                    <label className="block text-sm font-bold mb-4 text-slate-700">{filter.label}</label>
                    <select
                      value={filter.value}
                      onChange={e => filter.setter(e.target.value)}
                      className="w-full rounded-2xl border-2 border-slate-200/50 px-6 py-4 text-sm bg-white/90 backdrop-blur-sm hover:border-blue-300/60 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 shadow-lg font-medium"
                    >
                      {filter.options.map(option => 
                        <option value={option.value} key={option.value}>{option.label}</option>
                      )}
                    </select>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Search className="w-6 h-6 text-blue-500" />
                  <span className="text-slate-600 font-medium">
                    Найдено услуг: <span className="font-bold text-blue-600 text-xl">{filtered.length}</span>
                  </span>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Ultra-Enhanced Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            {filtered.map((service, index) => (
              <Card 
                key={service.slug} 
                className="group p-8 hover:shadow-2xl transition-all duration-700 border-0 bg-gradient-to-br from-white/95 to-slate-50/30 backdrop-blur-sm hover:scale-105 hover:-translate-y-3 relative overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="flex flex-col h-full relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 shadow-lg">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-slate-800 group-hover:text-blue-600 transition-colors duration-300">{service.name}</h3>
                  <p className="text-slate-600 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">{service.desc}</p>
                  
                  <div className="flex flex-col gap-4">
                    <Button asChild variant="outline" size="sm" className="border-2 border-slate-200/60 hover:border-blue-400/60 hover:bg-blue-50/80 transition-all duration-300 font-medium">
                      <Link to={`/service/${service.slug}`}>Подробнее</Link>
                    </Button>
                    <Button 
                      onClick={() => setShowServiceCatalog(false)}
                      size="sm" 
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0 font-semibold"
                    >
                      Заказать сейчас
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24 animate-fade-in">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full mb-8 shadow-lg">
                <Search className="w-12 h-12 text-slate-400" />
              </div>
              <div className="text-3xl font-bold text-slate-600 mb-6">
                По выбранным фильтрам услуги не найдены
              </div>
              <p className="text-slate-500 mb-8 max-w-md mx-auto text-lg">
                Попробуйте изменить критерии поиска или сбросить все фильтры
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setCategory("all");
                  setFormat("all");
                  setLang("all");
                  setTopic("all");
                }}
                className="px-10 py-4 text-lg font-semibold border-2 border-blue-300/60 hover:border-blue-500 hover:bg-blue-50/80 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Сбросить фильтры
              </Button>
            </div>
          )}
          
          <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
            <SeoTextExpandable text={seoText} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
