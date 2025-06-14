import { useState } from "react";
import { SERVICES } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Фильтры, форматы и опции — экспортируем явно
export const FILTERS = [
  { value: "all", label: "Все категории" },
  { value: "seo", label: "SEO" },
  { value: "sales", label: "Продающие" },
  { value: "smm", label: "Соцсети" },
  { value: "email", label: "E-mail" },
  { value: "long", label: "Лонгриды" },
  // ... добавьте нужные категории ...
];

export const FORMATS = [
  { value: "all", label: "Все форматы" },
  { value: "article", label: "Статья" },
  { value: "description", label: "Описание" },
  { value: "landing", label: "Лендинг" },
  { value: "post", label: "Пост" },
  { value: "email", label: "E-mail" },
  // ...
];

export const LANGS = [
  { value: "all", label: "Любой язык" },
  { value: "ru", label: "Русский" },
  { value: "en", label: "Английский" },
  // ...
];

export const TOPICS = [
  { value: "all", label: "Любая тема" },
  { value: "it", label: "IT/Технологии" },
  { value: "biz", label: "Бизнес" },
  { value: "marketing", label: "Маркетинг" },
  // ...
];

export const ServicesCatalogSection = () => {
  const [category, setCategory] = useState("all");
  const [format, setFormat] = useState("all");
  const [lang, setLang] = useState("all");
  const [topic, setTopic] = useState("all");

  // Фильтрация услуг
  const filtered = SERVICES.filter(service => {
    return (
      (category === "all" || service.category === category) &&
      (format === "all" || service.format === format) &&
      (lang === "all" || service.lang === lang) &&
      (topic === "all" || service.topic === topic)
    );
  });

  return (
    <section id="services" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Наши услуги</h2>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setCategory(f.value)}
              className={`px-3 py-1 rounded-full text-sm
                ${category === f.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-background hover:bg-muted"
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(service => (
            <div key={service.slug} className="bg-card rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <p className="text-muted-foreground mb-4">{service.desc}</p>
              <Button asChild variant="outline" size="sm">
                <Link to={`/service/${service.slug}`}>Подробнее</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCatalogSection;
