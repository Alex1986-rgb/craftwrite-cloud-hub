import type { Service } from "./types/service";

const CORE_SERVICES: Service[] = [
  {
    slug: "seo-article",
    name: "SEO-статьи",
    desc: "Экспертные SEO-оптимизированные статьи для роста трафика и позиций в поисковых системах",
    category: "SEO-контент",
    price: { min: 1200, max: 5000, currency: "₽" },
    deliveryTime: { min: 3, max: 7, unit: "дней" },
    difficulty: "Средняя",
    popularity: 5,
    features: [
      "Глубокий анализ конкурентов",
      "LSI-оптимизация",
      "Технические SEO-отчеты",
      "Готовые мета-теги"
    ]
  },
  {
    slug: "landing-page",
    name: "Лендинги",
    desc: "Продающие лендинги под ключ: прототипы, структура, контент, дизайн и A/B-тестирование",
    category: "Продающий контент",
    price: { min: 8000, max: 30000, currency: "₽" },
    deliveryTime: { min: 5, max: 14, unit: "дней" },
    difficulty: "Сложная",
    popularity: 5,
    features: [
      "Прототипирование и UX-анализ",
      "Уникальный дизайн",
      "A/B-тестирование",
      "Интеграция с CRM"
    ]
  },
  {
    slug: "email-campaigns",
    name: "Email-рассылки",
    desc: "Профессиональные email-кампании для прогрева, лидогенерации и удержания клиентов",
    category: "Email-маркетинг",
    price: { min: 1500, max: 7000, currency: "₽" },
    deliveryTime: { min: 3, max: 10, unit: "дней" },
    difficulty: "Средняя",
    popularity: 4,
    features: [
      "Сегментация аудитории",
      "Персонализация контента",
      "Автоматизация воронок",
      "Аналитика и отчетность"
    ]
  },
  {
    slug: "telegram-content",
    name: "Telegram-контент",
    desc: "Контент-маркетинг в Telegram: посты, статьи, боты, воронки и продвижение",
    category: "Социальные сети",
    price: { min: 1000, max: 5000, currency: "₽" },
    deliveryTime: { min: 2, max: 7, unit: "дней" },
    difficulty: "Средняя",
    popularity: 4,
    features: [
      "Разработка стратегии",
      "Создание контента",
      "Автоматизация постинга",
      "Привлечение подписчиков"
    ]
  },
  {
    slug: "instagram-posts",
    name: "Instagram-посты",
    desc: "Вовлекающий контент для Instagram: посты, сторис, reels, конкурсы и продвижение",
    category: "Социальные сети",
    price: { min: 800, max: 3000, currency: "₽" },
    deliveryTime: { min: 1, max: 5, unit: "дней" },
    difficulty: "Простая",
    popularity: 3,
    features: [
      "Визуальный контент",
      "Тексты для вовлечения",
      "Хэштеги и рубрики",
      "Анализ эффективности"
    ]
  },
  {
    slug: "wildberries-cards",
    name: "Карточки Wildberries",
    desc: "SEO-оптимизированные карточки товаров для Wildberries с высокой конверсией",
    category: "Маркетплейс",
    price: { min: 500, max: 2000, currency: "₽" },
    deliveryTime: { min: 1, max: 3, unit: "дней" },
    difficulty: "Простая",
    popularity: 4,
    features: [
      "Анализ ключевых слов",
      "SEO-оптимизация текста",
      "Фотографии товаров",
      "Описание характеристик"
    ]
  },
  {
    slug: "ozon-cards",
    name: "Карточки Ozon",
    desc: "Продающие карточки товаров для Ozon с учетом требований площадки",
    category: "Маркетплейс",
    price: { min: 500, max: 2000, currency: "₽" },
    deliveryTime: { min: 1, max: 3, unit: "дней" },
    difficulty: "Простая",
    popularity: 3,
    features: [
      "Анализ конкурентов",
      "SEO-оптимизация",
      "Характеристики и отзывы",
      "Фотографии товаров"
    ]
  }
];

// Import and merge new services
import { NEW_SERVICES } from "./services/newServices";

export const SERVICES: Service[] = [...CORE_SERVICES, ...NEW_SERVICES];

export const DIFFICULTIES = ["Простая", "Средняя", "Сложная", "Экспертная"] as const;
