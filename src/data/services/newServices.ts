
import type { Service } from "@/data/types/service";

export const NEW_SERVICES: Service[] = [
  {
    slug: "youtube-scripts",
    name: "YouTube-скрипты",
    desc: "Профессиональные сценарии для YouTube-роликов с крючками, структурой и призывами к действию",
    category: "Видеоконтент",
    price: { min: 1500, max: 5000, currency: "₽" },
    deliveryTime: { min: 2, max: 5, unit: "дня" },
    difficulty: "Средняя",
    popularity: 4,
    features: [
      "Крючки для удержания внимания первые 15 сек",
      "Структура по проверенным форматам",
      "CTA для подписок и лайков",
      "Адаптация под разные ниши",
      "Тайминг и разметка для монтажа"
    ]
  },
  {
    slug: "linkedin-posts",
    name: "LinkedIn-посты",
    desc: "Экспертный контент для LinkedIn: посты, статьи и контент для личного бренда B2B-специалистов",
    category: "B2B контент",
    price: { min: 800, max: 2500, currency: "₽" },
    deliveryTime: { min: 1, max: 3, unit: "дня" },
    difficulty: "Средняя",
    popularity: 5,
    features: [
      "Экспертные инсайты и мнения",
      "Сторителлинг для B2B аудитории",
      "Вовлекающие вопросы и дискуссии",
      "Хештеги и кросс-постинг стратегия",
      "Аналитика и метрики охватов"
    ]
  },
  {
    slug: "website-texts",
    name: "Тексты для сайтов",
    desc: "Комплексные тексты для корпоративных сайтов: О компании, Услуги, разделы и лендинги",
    category: "Веб-контент",
    price: { min: 2000, max: 8000, currency: "₽" },
    deliveryTime: { min: 3, max: 7, unit: "дней" },
    difficulty: "Сложная",
    popularity: 5,
    features: [
      "Полное наполнение сайта текстами",
      "SEO-оптимизация всех разделов",
      "Единый тон и стиль бренда",
      "Конверсионные CTA блоки",
      "Адаптация под целевую аудиторию"
    ]
  }
];
