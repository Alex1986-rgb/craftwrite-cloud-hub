
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
import { ArrowLeft, Search, Filter, Star, Zap, Shield, Award } from "lucide-react";

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

  // Поиск услуг по фильтрам
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
        <main className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-primary/8 to-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/8 to-pink-500/5 rounded-full blur-2xl"></div>
          </div>

          <div className="container mx-auto px-4 py-8 relative z-10">
            <div className="mb-8 flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setShowServiceCatalog(true)}
                className="flex items-center gap-2 hover:scale-105 transition-all duration-300 shadow-lg border-primary/20 hover:border-primary/40"
              >
                <ArrowLeft className="w-4 h-4" />
                Каталог услуг
              </Button>
              <div className="text-sm text-muted-foreground bg-card/60 px-4 py-2 rounded-full border border-border/50">
                Или выберите услугу из каталога
              </div>
            </div>
            <OrderForm />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
        {/* Enhanced background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-primary/10 to-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-2/3 right-1/3 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/5 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-to-r from-blue-500/8 to-cyan-500/5 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 py-12 relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-bold mb-8 border border-primary/20 shadow-lg">
              <Star className="w-5 h-5" />
              Элитная команда SEO-экспертов
            </div>
            <h1 className="text-5xl md:text-6xl font-playfair font-black mb-6 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              Каталог услуг <br />профессионального копирайтинга
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium mb-8">
              Выберите подходящую услугу из нашего каталога или перейдите к быстрому оформлению заказа
            </p>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
              <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold border border-green-200 shadow-lg">
                <Shield className="w-4 h-4" />
                100% уникальность Text.ru
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold border border-blue-200 shadow-lg">
                <Zap className="w-4 h-4" />
                От 24 часов
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold border border-purple-200 shadow-lg">
                <Award className="w-4 h-4" />
                30+ экспертов
              </div>
            </div>

            <Button 
              onClick={() => setShowServiceCatalog(false)}
              size="lg"
              className="shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-r from-primary via-purple-600 to-blue-600 hover:from-primary/90 hover:via-purple-600/90 hover:to-blue-600/90 px-12 py-6 text-lg font-bold rounded-full hover:scale-105 hover:-translate-y-1"
            >
              <Zap className="w-5 h-5 mr-2" />
              Быстрый заказ
            </Button>
          </div>

          {/* Enhanced Filters */}
          <Card className="p-8 mb-12 shadow-2xl border-0 bg-gradient-to-br from-card/95 via-card/90 to-card/85 backdrop-blur-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-xl shadow-lg">
                  <Filter className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Фильтры поиска
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-3 text-foreground">Категория</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full rounded-xl border-2 border-primary/20 px-4 py-3 text-sm bg-background/90 backdrop-blur-sm hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-lg"
                  >
                    {FILTERS.map(f => <option value={f.value} key={f.value}>{f.label}</option>)}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-3 text-foreground">Формат</label>
                  <select
                    value={format}
                    onChange={e => setFormat(e.target.value)}
                    className="w-full rounded-xl border-2 border-primary/20 px-4 py-3 text-sm bg-background/90 backdrop-blur-sm hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-lg"
                  >
                    {FORMATS.map(f => <option value={f.value} key={f.value}>{f.label}</option>)}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-3 text-foreground">Язык</label>
                  <select
                    value={lang}
                    onChange={e => setLang(e.target.value)}
                    className="w-full rounded-xl border-2 border-primary/20 px-4 py-3 text-sm bg-background/90 backdrop-blur-sm hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-lg"
                  >
                    {LANGS.map(l => <option value={l.value} key={l.value}>{l.label}</option>)}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold mb-3 text-foreground">Тематика</label>
                  <select
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    className="w-full rounded-xl border-2 border-primary/20 px-4 py-3 text-sm bg-background/90 backdrop-blur-sm hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-lg"
                  >
                    {TOPICS.map(t => <option value={t.value} key={t.value}>{t.label}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex items-center gap-3">
                <Search className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Найдено услуг: <span className="font-bold text-primary text-lg">{filtered.length}</span>
                </span>
              </div>
            </div>
          </Card>

          {/* Enhanced Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filtered.map((service, index) => (
              <Card 
                key={service.slug} 
                className="group p-8 hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex flex-col h-full relative z-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-primary to-purple-600 rounded-2xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                    <Star className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">{service.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">{service.desc}</p>
                  
                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline" size="sm" className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300">
                      <Link to={`/service/${service.slug}`}>Подробнее</Link>
                    </Button>
                    <Button 
                      onClick={() => setShowServiceCatalog(false)}
                      size="sm" 
                      className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Заказать сейчас
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-muted to-muted/50 rounded-full mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold text-muted-foreground mb-4">
                По выбранным фильтрам услуги не найдены
              </div>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
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
                className="px-8 py-3 text-lg font-semibold border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Сбросить фильтры
              </Button>
            </div>
          )}
          
          <SeoTextExpandable text={seoText} />
        </div>
      </main>
      <Footer />
    </>
  );
}
