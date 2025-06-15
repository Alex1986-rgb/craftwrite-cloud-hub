
import { SmartFilter } from '@/types/advancedOrder';

export const SEO_FILTERS: SmartFilter[] = [
  {
    id: 'seo_optimization',
    name: 'SEO-оптимизация',
    type: 'select',
    description: 'Уровень поисковой оптимизации статьи',
    options: [
      { value: 'basic', label: 'Базовая', description: 'Ключевые слова в тексте', priceMultiplier: 1.0 },
      { value: 'advanced', label: 'Расширенная', description: 'Глубокий анализ конкурентов', priceMultiplier: 1.3 },
      { value: 'technical', label: 'Техническая', description: 'Мета-теги, разметка, структура', priceMultiplier: 1.6 }
    ],
    recommendations: [
      'Техническая SEO-оптимизация повышает эффективность в 2-3 раза',
      'Базовая оптимизация подходит для начинающих проектов',
      'Расширенная оптимизация необходима в конкурентных нишах'
    ]
  },
  {
    id: 'keyword_density',
    name: 'Плотность ключевых слов',
    type: 'range',
    min: 1,
    max: 5,
    defaultValue: 2,
    description: 'Процент ключевых слов в тексте',
    recommendations: [
      'Оптимальная плотность: 2-3% для основных запросов',
      'Переспам ключевых слов может навредить ранжированию',
      'Используйте синонимы и LSI-ключевые слова'
    ]
  },
  {
    id: 'semantic_core',
    name: 'Семантическое ядро',
    type: 'select',
    description: 'Работа с ключевыми словами',
    options: [
      { value: 'provided', label: 'Предоставлю сам', description: 'У вас есть готовое СЯ' },
      { value: 'research', label: 'Нужен сбор', description: 'Мы соберем семантику', priceMultiplier: 1.2 },
      { value: 'expand', label: 'Расширить существующее', description: 'Дополним ваше СЯ', priceMultiplier: 1.1 }
    ],
    recommendations: [
      'Качественное семантическое ядро - основа успешного SEO',
      'Сбор СЯ включает анализ конкурентов и подбор LSI',
      'Расширение СЯ поможет охватить больше запросов'
    ]
  },
  {
    id: 'content_structure',
    name: 'Структура контента',
    type: 'multiselect',
    description: 'Элементы структуры статьи',
    options: [
      { value: 'h1_optimization', label: 'Оптимизация H1', description: 'Уникальный заголовок с ключом' },
      { value: 'h2_h3_structure', label: 'Структура H2-H3', description: 'Логичная иерархия заголовков' },
      { value: 'meta_description', label: 'Meta Description', description: 'Привлекательное описание для поиска' },
      { value: 'internal_linking', label: 'Внутренняя перелинковка', description: 'Ссылки на другие страницы сайта' },
      { value: 'faq_section', label: 'FAQ секция', description: 'Ответы на популярные вопросы' },
      { value: 'conclusion_cta', label: 'Заключение с CTA', description: 'Призыв к действию в конце' }
    ],
    recommendations: [
      'Правильная структура улучшает понимание контента поисковыми системами',
      'FAQ секция помогает попасть в расширенные сниппеты',
      'Внутренняя перелинковка распределяет вес по сайту'
    ]
  },
  {
    id: 'competitor_analysis',
    name: 'Анализ конкурентов',
    type: 'select',
    description: 'Глубина изучения конкурентов',
    options: [
      { value: 'none', label: 'Не требуется', description: 'Без анализа конкурентов' },
      { value: 'basic', label: 'Базовый', description: 'Анализ топ-3 конкурентов', priceMultiplier: 1.1 },
      { value: 'detailed', label: 'Детальный', description: 'Анализ топ-10 + gap-анализ', priceMultiplier: 1.4 }
    ],
    recommendations: [
      'Анализ конкурентов помогает создать уникальный контент',
      'Gap-анализ выявляет неохваченные темы',
      'Детальный анализ необходим в высококонкурентных нишах'
    ]
  }
];
