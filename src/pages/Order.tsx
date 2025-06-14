import { useState } from "react";
import { SERVICES } from "@/data/services";
import { FILTERS, FORMATS, LANGS, TOPICS } from "@/components/landing/ServicesCatalogSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

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

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto py-6">
        <h1 className="text-2xl font-bold mb-4">Оформление заказа</h1>
        <div className="flex flex-wrap gap-3 mb-6">
          <select value={category} onChange={e => setCategory(e.target.value)} className="rounded-lg border px-3 py-2 shadow text-sm min-w-[120px]">
            {FILTERS.map(f => <option value={f.value} key={f.value}>{f.label}</option>)}
          </select>
          <select value={format} onChange={e => setFormat(e.target.value)} className="rounded-lg border px-3 py-2 shadow text-sm min-w-[120px]">
            {FORMATS.map(f => <option value={f.value} key={f.value}>{f.label}</option>)}
          </select>
          <select value={lang} onChange={e => setLang(e.target.value)} className="rounded-lg border px-3 py-2 shadow text-sm min-w-[100px]">
            {LANGS.map(l => <option value={l.value} key={l.value}>{l.label}</option>)}
          </select>
          <select value={topic} onChange={e => setTopic(e.target.value)} className="rounded-lg border px-3 py-2 shadow text-sm min-w-[120px]">
            {TOPICS.map(t => <option value={t.value} key={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {filtered.map(service => (
            <Card key={service.slug} className="p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="font-bold">{service.name}</span>
                <Button asChild variant="ghost" size="sm">
                  <Link to={`/service/${service.slug}`}>Подробнее</Link>
                </Button>
              </div>
              <p className="text-muted-foreground text-xs">{service.desc}</p>
              <Button asChild variant="default" size="sm">
                <Link to={`/order?type=${service.slug}`}>Выбрать</Link>
              </Button>
            </Card>
          ))}
        </div>
        <SeoTextExpandable text={seoText} />
      </main>
      <Footer />
    </>
  );
}
