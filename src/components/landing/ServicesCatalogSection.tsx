
import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Grid2x2, Search } from "lucide-react";

// Категории для фильтрации
const FILTERS = [
  { label: "Все", value: "all" },
  { label: "SEO", value: "seo" },
  { label: "Продажи", value: "sales" },
  { label: "Контент", value: "content" },
  { label: "Уникальное", value: "unique" },
];

const SERVICES = [
  {
    name: "SEO-статьи",
    desc: "Экспертные оптимизированные статьи для продвижения сайта.",
    category: "seo",
  },
  {
    name: "Описания товаров",
    desc: "Продающие и информативные описания для интернет-магазинов.",
    category: "sales",
  },
  {
    name: "Тексты для соцсетей",
    desc: "Посты и контент под любые соцсети — с вовлечением.",
    category: "content",
  },
  {
    name: "Продающие тексты",
    desc: "Тексты, которые мотивируют клиента к действию.",
    category: "sales",
  },
  {
    name: "Тексты для лендингов",
    desc: "Сценарии и блоки для LP, которые работают на конверсию.",
    category: "sales",
  },
  {
    name: "Email-рассылки",
    desc: "Письма и серии для вашей клиентской базы.",
    category: "content",
  },
  {
    name: "Скрипты продаж",
    desc: "Готовые скрипты для отдела продаж, менеджеров, кол-центра.",
    category: "sales",
  },
  {
    name: "Статьи для СМИ",
    desc: "Публикации для PR, имиджа бренда или продвижения.",
    category: "seo",
  },
  {
    name: "Пресс-релизы",
    desc: "Яркие и структурированные новости для распространения в СМИ.",
    category: "seo",
  },
  {
    name: "Тексты для блогов",
    desc: "Регулярный контент для тематических корпоративных блогов.",
    category: "content",
  },
  {
    name: "Академические статьи",
    desc: "Помощь с научными, дипломными и иными серьезными текстами.",
    category: "unique",
  },
  {
    name: "Юридические тексты",
    desc: "Юридические заключения, аналитика и другие сложные документы.",
    category: "unique",
  },
  {
    name: "Уникальные услуги по запросу",
    desc: "Реализация особых задач. Просто опишите вашу потребность!",
    category: "unique",
  },
];

const getFiltered = (filter: string) =>
  filter === "all" ? SERVICES : SERVICES.filter((s) => s.category === filter);

const ServicesCatalogSection = () => {
  const [filter, setFilter] = useState("all");
  const shown = getFiltered(filter);

  return (
    <section id="services" className="pt-10 pb-10 bg-background min-h-[70vh] animate-fade-in">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-1 flex items-center gap-2">
          <Grid2x2 className="w-6 h-6 text-primary" />
          Каталог услуг
        </h2>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <Button
              key={f.value}
              variant={filter === f.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f.value)}
              className={
                filter === f.value
                  ? "font-bold shadow-sm animate-scale-in"
                  : "hover-scale"
              }
            >
              {f.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Search bar for visuals (реальная фильтрация по названию — будущее улучшение) */}
      {/* <div className="flex justify-center mt-4 mb-6">
        <div className="flex gap-2 bg-muted/60 rounded px-3 py-2 items-center max-w-xs w-full">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            disabled
            className="bg-transparent outline-none w-full text-sm"
            placeholder="Поиск по услугам..."
          />
        </div>
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 mt-4">
        {shown.map((service, i) => (
          <Card
            key={service.name}
            className="transition-all hover-scale border-primary/30 bg-card shadow-sm animate-fade-in"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <CardContent className="p-5 flex flex-col h-full justify-between">
              <div>
                <CardTitle className="text-lg mb-3 flex gap-2 items-center">
                  {service.name}
                  {/* Категория как badge */}
                  <Badge
                    variant={service.category === "unique" ? "secondary" : "outline"}
                    className={
                      service.category === "seo"
                        ? "text-blue-700 border-blue-400"
                        : service.category === "sales"
                        ? "text-rose-700 border-rose-400"
                        : service.category === "content"
                        ? "text-indigo-700 border-indigo-300"
                        : "text-gray-600"
                    }
                  >
                    {FILTERS.find(f => f.value === service.category)?.label}
                  </Badge>
                </CardTitle>
                <div className="text-muted-foreground text-sm min-h-[48px]">
                  {service.desc}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 self-start hover-scale"
                asChild
              >
                <Link to="/order">Заказать</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button
          size="lg"
          className="shadow hover-scale rounded-full px-8 py-4 text-base"
          asChild
        >
          <Link to="/order">Создать заказ</Link>
        </Button>
      </div>
    </section>
  );
};

export default ServicesCatalogSection;
