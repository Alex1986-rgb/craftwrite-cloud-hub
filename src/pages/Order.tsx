
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
        <main className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setShowServiceCatalog(true)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Каталог услуг
              </Button>
              <div className="text-sm text-muted-foreground">
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
      <main className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Каталог услуг копирайтинга
            </h1>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Выберите подходящую услугу из нашего каталога или перейдите к быстрому оформлению заказа
            </p>
            <Button 
              onClick={() => setShowServiceCatalog(false)}
              size="lg"
              className="shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Быстрый заказ
            </Button>
          </div>

          {/* Фильтры */}
          <Card className="p-6 mb-8 shadow-lg border-0">
            <h3 className="text-lg font-semibold mb-4">Фильтры поиска</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Категория</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-input px-3 py-2 text-sm bg-background"
                >
                  {FILTERS.map(f => <option value={f.value} key={f.value}>{f.label}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Формат</label>
                <select
                  value={format}
                  onChange={e => setFormat(e.target.value)}
                  className="w-full rounded-lg border border-input px-3 py-2 text-sm bg-background"
                >
                  {FORMATS.map(f => <option value={f.value} key={f.value}>{f.label}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Язык</label>
                <select
                  value={lang}
                  onChange={e => setLang(e.target.value)}
                  className="w-full rounded-lg border border-input px-3 py-2 text-sm bg-background"
                >
                  {LANGS.map(l => <option value={l.value} key={l.value}>{l.label}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Тематика</label>
                <select
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  className="w-full rounded-lg border border-input px-3 py-2 text-sm bg-background"
                >
                  {TOPICS.map(t => <option value={t.value} key={t.value}>{t.label}</option>)}
                </select>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-muted-foreground">
              Найдено услуг: <span className="font-medium">{filtered.length}</span>
            </div>
          </Card>

          {/* Карточки услуг */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filtered.map(service => (
              <Card key={service.slug} className="p-6 hover:shadow-xl transition-all duration-200 border-0 bg-gradient-to-br from-card to-card/80">
                <div className="flex flex-col h-full">
                  <h3 className="text-lg font-bold mb-3 text-foreground">{service.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">{service.desc}</p>
                  
                  <div className="flex flex-col gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/service/${service.slug}`}>Подробнее</Link>
                    </Button>
                    <Button 
                      onClick={() => setShowServiceCatalog(false)}
                      size="sm" 
                      className="w-full"
                    >
                      Заказать
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                По выбранным фильтрам услуги не найдены
              </div>
              <Button 
                variant="outline"
                onClick={() => {
                  setCategory("all");
                  setFormat("all");
                  setLang("all");
                  setTopic("all");
                }}
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
