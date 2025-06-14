import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Grid2x2, Filter } from "lucide-react";

// Категории и типы текстов для фильтрации
const FILTERS = [
  { label: "Все", value: "all" },
  { label: "SEO", value: "seo" },
  { label: "Продажи", value: "sales" },
  { label: "Контент", value: "content" },
  { label: "Маркетинг", value: "marketing" },
  { label: "Образование", value: "education" },
  { label: "Юридические", value: "legal" },
  { label: "Уникальное", value: "unique" }
];

const FORMATS = [
  { label: "Любой формат", value: "all" },
  { label: "Статья", value: "article" },
  { label: "Пост", value: "post" },
  { label: "Объявление", value: "ad" },
  { label: "Описание", value: "description" },
  { label: "Интервью", value: "interview" },
  { label: "Сценарий", value: "script" },
  { label: "Пресс-релиз", value: "press" },
  { label: "Письмо", value: "email" },
  { label: "Уникальный", value: "custom" }
];

const LANGS = [
  { label: "Любой язык", value: "all" },
  { label: "Русский", value: "ru" },
  { label: "Английский", value: "en" },
  { label: "Другой", value: "other" },
];

const TOPICS = [
  { label: "Любая тематика", value: "all" },
  { label: "Бизнес", value: "biz" },
  { label: "IT", value: "it" },
  { label: "Маркетинг", value: "marketing" },
  { label: "Обучение", value: "edu" },
  { label: "Здоровье", value: "health" },
  { label: "Право", value: "jur" },
  { label: "Технологии", value: "tech" },
  { label: "Другое", value: "other" }
];

// Дополним ассортимент услуг, чтобы клиент мог найти подходящий вариант под любые потребности.
const SERVICES = [
  {
    name: "SEO-статья",
    desc: "Оптимизированные под SEO экспертные статьи.",
    category: "seo",
    format: "article",
    lang: "ru",
    topic: "it"
  },
  {
    name: "SEO-статья (EN)",
    desc: "SEO-optimized articles in English.",
    category: "seo",
    format: "article",
    lang: "en",
    topic: "biz"
  },
  {
    name: "Описание товара",
    desc: "Информативные и продающие описания для магазинов.",
    category: "sales",
    format: "description",
    lang: "ru",
    topic: "biz"
  },
  {
    name: "Микрообъявления",
    desc: "Объявления для досок, промо и email-рассылок.",
    category: "marketing",
    format: "ad",
    lang: "ru",
    topic: "biz"
  },
  {
    name: "Текст для соцсетей",
    desc: "Концепции и посты для соцсетей — вовлекаем.",
    category: "content",
    format: "post",
    lang: "ru",
    topic: "marketing"
  },
  {
    name: "Текст для соцсетей (EN)",
    desc: "Posts and concepts for English-language social media.",
    category: "content",
    format: "post",
    lang: "en",
    topic: "marketing"
  },
  {
    name: "Промо-текст",
    desc: "Короткий продающий текст под рекламу.",
    category: "marketing",
    format: "ad",
    lang: "ru",
    topic: "marketing"
  },
  {
    name: "E-mail рассылка",
    desc: "Письма/серии для клиентской базы и лидов.",
    category: "marketing",
    format: "email",
    lang: "ru",
    topic: "biz"
  },
  {
    name: "Лендинг",
    desc: "Продуманные тексты для посадочных страниц.",
    category: "sales",
    format: "script",
    lang: "ru",
    topic: "biz"
  },
  {
    name: "Мини-лендинг",
    desc: "Текст для одностраничных промо и квизов.",
    category: "sales",
    format: "script",
    lang: "ru",
    topic: "marketing"
  },
  {
    name: "Прогрев-пост для рассылки",
    desc: "Тёплый пост для email или соцсетей.",
    category: "marketing",
    format: "email",
    lang: "ru",
    topic: "marketing"
  },
  {
    name: "Академическая статья",
    desc: "Статьи, рефераты, курсовые, эссе под ГОСТ.",
    category: "education",
    format: "article",
    lang: "ru",
    topic: "edu"
  },
  {
    name: "Юридическая статья",
    desc: "Раскрытие юридических тем для блога или портала.",
    category: "legal",
    format: "article",
    lang: "ru",
    topic: "jur"
  },
  {
    name: "Статья для СМИ",
    desc: "Публикации для PR, имиджа бренда или продвижения.",
    category: "seo",
    format: "article",
    lang: "ru",
    topic: "biz"
  },
  {
    name: "Пресс-релиз",
    desc: "Cтруктурированная новость для распространения СМИ.",
    category: "seo",
    format: "press",
    lang: "ru",
    topic: "biz"
  },
  {
    name: "Интервью",
    desc: "Подготовка текста интервью, редактура вопросов.",
    category: "content",
    format: "interview",
    lang: "ru",
    topic: "biz"
  },
  {
    name: "Уникальный заказ",
    desc: "Реализация любых задач, которых нет в списке.",
    category: "unique",
    format: "custom",
    lang: "all",
    topic: "other"
  }
];

// Функция фильтра
const getFiltered = (
  filter: string,
  format: string,
  lang: string,
  topic: string
) => {
  return SERVICES.filter(service => {
    const categoryMatch = filter === "all" ? true : service.category === filter;
    const formatMatch = format === "all" ? true : service.format === format;
    const langMatch = lang === "all" ? true : service.lang === lang;
    const topicMatch = topic === "all" ? true : service.topic === topic;

    return categoryMatch && formatMatch && langMatch && topicMatch;
  });
};

const ServicesCatalogSection = () => {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [formatFilter, setFormatFilter] = useState("all");
  const [langFilter, setLangFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const shown = getFiltered(categoryFilter, formatFilter, langFilter, topicFilter);

  return (
    <section id="services" className="pt-10 pb-10 bg-background min-h-[70vh] animate-fade-in">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-1 flex items-center gap-2">
          <Grid2x2 className="w-6 h-6 text-primary" />
          Каталог услуг
        </h2>
        {/* Основные фильтры-кнопки */}
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <Button
              key={f.value}
              variant={categoryFilter === f.value ? "default" : "outline"}
              size="sm"
              onClick={() => setCategoryFilter(f.value)}
              className={
                categoryFilter === f.value
                  ? "font-bold shadow-sm animate-scale-in"
                  : "hover-scale"
              }
            >
              {f.label}
            </Button>
          ))}
          <Button
            type="button"
            variant={showAdvancedFilters ? "default" : "outline"}
            size="sm"
            className="ml-2 flex items-center gap-1"
            onClick={() => setShowAdvancedFilters(v => !v)}
          >
            <Filter className="w-4 h-4" />
            Фильтры
          </Button>
        </div>
        {/* Дополнительные селекты-фильтры */}
        {showAdvancedFilters && (
          <div className="flex flex-wrap gap-3 mt-4 px-2 w-full justify-center max-w-3xl animate-fade-in">
            <select
              value={formatFilter}
              onChange={e => setFormatFilter(e.target.value)}
              className="rounded-lg border border-muted px-3 py-2 shadow text-sm bg-background min-w-[120px] focus:border-primary"
              aria-label="Формат текста"
            >
              {FORMATS.map(f => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
            <select
              value={langFilter}
              onChange={e => setLangFilter(e.target.value)}
              className="rounded-lg border border-muted px-3 py-2 shadow text-sm bg-background min-w-[100px] focus:border-primary"
              aria-label="Язык"
            >
              {LANGS.map(l => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
            <select
              value={topicFilter}
              onChange={e => setTopicFilter(e.target.value)}
              className="rounded-lg border border-muted px-3 py-2 shadow text-sm bg-background min-w-[120px] focus:border-primary"
              aria-label="Тематика"
            >
              {TOPICS.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      {/* Сетка карточек */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 mt-4">
        {shown.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground py-10 text-lg animate-fade-in">
            Нет услуг, подходящих под выбранные параметры.
          </div>
        ) : (
          shown.map((service, i) => (
            <Card
              key={service.name}
              className="transition-all hover-scale border-primary/30 bg-card shadow-sm animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <div>
                  <CardTitle className="text-lg mb-3 flex gap-2 items-center">
                    {service.name}
                    {/* Категория как badge */}
                    <Badge
                      variant={
                        service.category === "unique"
                          ? "secondary"
                          : "outline"
                      }
                      className={
                        service.category === "seo"
                          ? "text-blue-700 border-blue-400"
                          : service.category === "sales"
                          ? "text-rose-700 border-rose-400"
                          : service.category === "content"
                          ? "text-indigo-700 border-indigo-300"
                          : service.category === "marketing"
                          ? "text-fuchsia-700 border-fuchsia-300"
                          : service.category === "education"
                          ? "text-teal-700 border-teal-300"
                          : service.category === "legal"
                          ? "text-yellow-800 border-yellow-300"
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
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="px-2 py-0.5 text-xs rounded bg-muted/70 text-foreground/70">
                    {FORMATS.find(f => f.value === service.format)?.label}
                  </span>
                  <span className="px-2 py-0.5 text-xs rounded bg-muted/70 text-foreground/70">
                    {LANGS.find(l => l.value === service.lang)?.label || "Любой язык"}
                  </span>
                  <span className="px-2 py-0.5 text-xs rounded bg-muted/70 text-foreground/70">
                    {TOPICS.find(t => t.value === service.topic)?.label}
                  </span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="self-start hover-scale"
                    asChild
                  >
                    <Link to="/order" state={{ preselect: service.slug }}>Заказать</Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="self-start"
                    asChild
                  >
                    <Link to={`/service/${service.slug}`}>Подробнее</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
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
