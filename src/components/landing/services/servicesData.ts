
import { ShoppingCart, Globe, Mail, MessageCircle, Star, Zap, Target, CheckCircle, BookOpen, Newspaper, Award, TrendingUp, Users, Briefcase, Camera, Megaphone, Heart, Monitor, FileText } from "lucide-react";

export interface Service {
  title: string;
  desc: string;
  features: string[];
  price: string;
  icon: any;
  gradient: string;
  slug: string;
}

export const services: Service[] = [
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
