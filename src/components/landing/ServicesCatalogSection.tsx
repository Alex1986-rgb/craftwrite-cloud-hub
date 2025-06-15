
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Globe, ShoppingCart, Mail, MessageCircle, Star, Zap, Target, CheckCircle, BookOpen, Newspaper, Award, TrendingUp, Users, Briefcase, Camera, Megaphone, Heart, Monitor } from "lucide-react";

// Filter options for the Order page
export const FILTERS = [
  { value: "all", label: "Все категории" },
  { value: "marketplace", label: "Маркетплейсы" },
  { value: "content", label: "Контент-маркетинг" },
  { value: "commercial", label: "Коммерческие тексты" },
  { value: "social", label: "Соцсети" },
  { value: "reviews", label: "Обзоры и рецензии" }
];

export const FORMATS = [
  { value: "all", label: "Все форматы" },
  { value: "article", label: "Статьи" },
  { value: "landing", label: "Лендинги" },
  { value: "product", label: "Карточки товаров" },
  { value: "email", label: "Email-рассылки" },
  { value: "social", label: "Посты для соцсетей" },
  { value: "reviews", label: "Обзоры и рецензии" },
  { value: "longread", label: "Лонгриды" },
  { value: "news", label: "Новости" }
];

export const LANGS = [
  { value: "all", label: "Все языки" },
  { value: "ru", label: "Русский" },
  { value: "en", label: "Английский" },
  { value: "ua", label: "Украинский" }
];

export const TOPICS = [
  { value: "all", label: "Все тематики" },
  { value: "tech", label: "Технологии" },
  { value: "business", label: "Бизнес" },
  { value: "health", label: "Здоровье" },
  { value: "finance", label: "Финансы" },
  { value: "education", label: "Образование" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "marketing", label: "Маркетинг" }
];

const services = [
  {
    title: "Карточки Wildberries",
    desc: "Продающие описания товаров для WB с высокой конверсией и SEO-оптимизацией",
    features: ["Ключевые слова WB", "Структура по алгоритму", "Эмоциональные триггеры", "Конкурентный анализ"],
    price: "от 350₽",
    icon: ShoppingCart,
    gradient: "from-purple-500 to-pink-600",
    slug: "wildberries-cards"
  },
  {
    title: "Карточки OZON",
    desc: "Оптимизированные описания для OZON с фокусом на ранжирование и продажи",
    features: ["Rich-контент", "A+ описания", "SEO для OZON", "Инфографика текст"],
    price: "от 400₽",
    icon: Target,
    gradient: "from-blue-500 to-cyan-600",
    slug: "ozon-cards"
  },
  {
    title: "Лонгриды",
    desc: "Глубокие экспертные статьи 5000+ символов для укрепления экспертности",
    features: ["Исследовательский подход", "Инфографика", "Интерактивные элементы", "Экспертные интервью"],
    price: "от 3500₽",
    icon: BookOpen,
    gradient: "from-emerald-500 to-green-600",
    slug: "longreads"
  },
  {
    title: "Продуктовые обзоры",
    desc: "Честные детальные обзоры товаров и услуг с практическими рекомендациями",
    features: ["Тестирование продукта", "Pros & Cons", "Сравнение аналогов", "Рейтинговая система"],
    price: "от 1500₽",
    icon: Award,
    gradient: "from-orange-500 to-red-600",
    slug: "product-reviews"
  },
  {
    title: "Новостные статьи",
    desc: "Актуальные новости отрасли с экспертной аналитикой и прогнозами",
    features: ["Оперативность", "Экспертная оценка", "Фактчекинг", "Тренд-анализ"],
    price: "от 800₽",
    icon: Newspaper,
    gradient: "from-indigo-500 to-purple-600",
    slug: "news-articles"
  },
  {
    title: "Кейс-стади",
    desc: "Детальные разборы успешных проектов с цифрами и результатами",
    features: ["Реальные метрики", "Пошаговый анализ", "Выводы и инсайты", "Визуализация данных"],
    price: "от 2500₽",
    icon: TrendingUp,
    gradient: "from-cyan-500 to-blue-600",
    slug: "case-studies"
  },
  {
    title: "Instagram посты",
    desc: "Вирусный контент для Instagram с высоким engagement и охватами",
    features: ["Тренды Instagram", "Хештег-стратегия", "Stories-формат", "Reels-сценарии"],
    price: "от 250₽",
    icon: Camera,
    gradient: "from-pink-500 to-rose-600",
    slug: "instagram-posts"
  },
  {
    title: "Telegram-контент",
    desc: "Контент для Telegram-каналов: посты, опросы, интерактивные форматы",
    features: ["Telegram-форматы", "Интерактивность", "Вирусность", "Подписочная база"],
    price: "от 200₽",
    icon: MessageCircle,
    gradient: "from-blue-400 to-cyan-500",
    slug: "telegram-content"
  },
  {
    title: "Продающие письма",
    desc: "Email-рассылки с высокой открываемостью и конверсией в продажи",
    features: ["Цепляющие темы", "Персонализация", "A/B тестирование", "Автоворонки"],
    price: "от 600₽",
    icon: Mail,
    gradient: "from-green-500 to-emerald-600",
    slug: "sales-emails"
  },
  {
    title: "Лендинг-страницы",
    desc: "Высококонверсионные лендинги с психологическими триггерами продаж",
    features: ["AIDA структура", "Триггеры доверия", "A/B тесты", "Мобильная оптимизация"],
    price: "от 4000₽",
    icon: Globe,
    gradient: "from-violet-500 to-purple-600",
    slug: "landing-pages"
  },
  {
    title: "Отзывы и рецензии",
    desc: "Профессиональные рецензии товаров, услуг, контента с экспертной оценкой",
    features: ["Объективная оценка", "Детальный анализ", "Сравнения", "Рекомендации"],
    price: "от 1200₽",
    icon: Star,
    gradient: "from-yellow-500 to-orange-500",
    slug: "reviews-analysis"
  },
  {
    title: "Пресс-релизы",
    desc: "Профессиональные пресс-релизы для СМИ и деловых партнеров",
    features: ["Медиа-формат", "Ньюсмейкинг", "Инфоповоды", "Дистрибуция"],
    price: "от 1800₽",
    icon: Megaphone,
    gradient: "from-red-500 to-pink-600",
    slug: "press-releases"
  },
  {
    title: "Экспертные статьи",
    desc: "Авторитетные материалы от имени экспертов для укрепления репутации",
    features: ["Thought Leadership", "Экспертность", "Авторитет", "Цитируемость"],
    price: "от 2800₽",
    icon: Users,
    gradient: "from-teal-500 to-cyan-600",
    slug: "expert-articles"
  },
  {
    title: "Коммерческие предложения",
    desc: "Убедительные КП для B2B сегмента с высокой конверсией в сделки",
    features: ["B2B подход", "УТП", "Расчеты ROI", "Презентация"],
    price: "от 2200₽",
    icon: Briefcase,
    gradient: "from-slate-500 to-gray-600",
    slug: "commercial-proposals"
  },
  {
    title: "Сценарии видео",
    desc: "Сценарии для YouTube, Reels, TikTok с высокой вовлеченностью",
    features: ["Сторителлинг", "Хуки", "Монтажные листы", "Тайминг"],
    price: "от 1500₽",
    icon: Monitor,
    gradient: "from-rose-500 to-pink-600",
    slug: "video-scripts"
  },
  {
    title: "Интервью и подкасты",
    desc: "Сценарии интервью и подкастов с интересными инсайтами",
    features: ["Вопросы", "Структура", "Инсайты", "Вовлечение"],
    price: "от 1200₽",
    icon: MessageCircle,
    gradient: "from-amber-500 to-orange-600",
    slug: "interviews-podcasts"
  },
  {
    title: "Технические статьи",
    desc: "Сложные технические материалы, адаптированные для целевой аудитории",
    features: ["Техническая экспертиза", "Простой язык", "Схемы", "Практичность"],
    price: "от 3200₽",
    icon: FileText,
    gradient: "from-blue-600 to-indigo-600",
    slug: "technical-articles"
  },
  {
    title: "Lifestyle контент",
    desc: "Lifestyle статьи для блогов с высокой вовлеченностью аудитории",
    features: ["Личные истории", "Полезность", "Тренды", "Эмоциональность"],
    price: "от 1000₽",
    icon: Heart,
    gradient: "from-pink-400 to-rose-500",
    slug: "lifestyle-content"
  },
  {
    title: "Медицинский контент",
    desc: "Медицинские статьи с проверкой практикующих врачей",
    features: ["Медицинская точность", "Проверка врачей", "Доказательность", "Этичность"],
    price: "от 2500₽",
    icon: Users,
    gradient: "from-green-400 to-emerald-500",
    slug: "medical-content"
  },
  {
    title: "Финансовый контент",
    desc: "Финансовые материалы с соблюдением требований регуляторов",
    features: ["Комплаенс", "ЦБ РФ требования", "Дисклеймеры", "Риск-менеджмент"],
    price: "от 2800₽",
    icon: TrendingUp,
    gradient: "from-emerald-600 to-green-700",
    slug: "finance-content"
  }
];

const ServicesCatalogSection = () => {
  return (
    <section id="services" className="py-16 md:py-24 relative overflow-hidden">
      {/* Modern background with glass morphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent"></div>
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-purple-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-gradient-to-r from-emerald-400/10 to-blue-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100/80 to-purple-100/80 text-blue-700 px-6 py-3 rounded-full text-sm font-bold mb-6 border border-blue-200/50 shadow-lg backdrop-blur-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <Star className="w-5 h-5" />
            <span>20 видов текстов</span>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight tracking-tight">
            Каталог услуг
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">копирайтинга</span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            От маркетплейсов до лонгридов — полный спектр текстовых решений для любых задач
          </p>
        </div>

        {/* Enhanced Services Grid - показываем все 20 видов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => (
            <div
              key={service.slug}
              className="group relative bg-gradient-to-br from-white/90 via-white/70 to-white/50 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Card background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Enhanced Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${service.gradient} rounded-xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                
                {/* Title and Price */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                    {service.title}
                  </h3>
                  <div className={`bg-gradient-to-r ${service.gradient} text-white px-2 py-1 rounded-lg text-xs font-semibold shadow-md ml-2`}>
                    {service.price}
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-slate-600 leading-relaxed mb-4 text-sm">
                  {service.desc}
                </p>
                
                {/* Features */}
                <div className="space-y-1 mb-4">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* CTA Button */}
                <Button 
                  asChild 
                  className={`w-full group/btn bg-gradient-to-r ${service.gradient} hover:opacity-90 border-0 rounded-xl py-2 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm`}
                >
                  <Link to="/order" className="flex items-center justify-center gap-2">
                    <Zap className="w-3 h-3" />
                    Заказать
                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-white/80 via-blue-50/50 to-purple-50/30 backdrop-blur-lg rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-2xl border border-blue-200/30 relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Нужен другой тип текста?
              </h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Создаем тексты любой сложности и тематики. Обсудим ваш уникальный проект!
              </p>
              <Button 
                asChild 
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 border-0 rounded-full px-8 py-4 text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Link to="/order" className="flex items-center gap-3">
                  <Target className="w-5 h-5" />
                  Обсудить проект
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesCatalogSection;
