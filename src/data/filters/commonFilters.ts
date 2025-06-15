
import { SmartFilter } from '@/types/advancedOrder';

export const COMMON_FILTERS: SmartFilter[] = [
  {
    id: 'word_count',
    name: 'Объём текста',
    description: 'Количество слов в готовом тексте',
    type: 'select',
    required: true,
    options: [
      { label: '500-1000 слов', value: '500-1000', priceMultiplier: 1 },
      { label: '1000-2000 слов', value: '1000-2000', priceMultiplier: 1.5 },
      { label: '2000-3000 слов', value: '2000-3000', priceMultiplier: 2 },
      { label: '3000+ слов', value: '3000+', priceMultiplier: 2.5 }
    ],
    recommendations: [
      'Для SEO-статей рекомендуется объём от 1500 слов',
      'Большие статьи лучше ранжируются в поисковых системах'
    ]
  },
  {
    id: 'target_audience',
    name: 'Целевая аудитория',
    description: 'Для кого предназначен текст',
    type: 'textarea',
    required: true,
    placeholder: 'Опишите вашу целевую аудиторию: возраст, интересы, потребности...',
    recommendations: [
      'Чётко определённая ЦА повышает конверсию на 73%',
      'Укажите демографические данные и болевые точки'
    ]
  },
  {
    id: 'tone_style',
    name: 'Тон и стиль изложения',
    description: 'Как должен звучать ваш текст',
    type: 'select',
    required: true,
    options: [
      { label: 'Деловой и официальный', value: 'business', priceMultiplier: 1 },
      { label: 'Дружелюбный и неформальный', value: 'friendly', priceMultiplier: 1 },
      { label: 'Экспертный и авторитетный', value: 'expert', priceMultiplier: 1.2 },
      { label: 'Продающий и убеждающий', value: 'sales', priceMultiplier: 1.3 },
      { label: 'Эмоциональный и вдохновляющий', value: 'emotional', priceMultiplier: 1.1 }
    ]
  },
  {
    id: 'content_structure',
    name: 'Структура контента',
    description: 'Как организовать информацию в тексте',
    type: 'multiselect',
    options: [
      { label: 'Заголовки H1-H6', value: 'headings', priceMultiplier: 1 },
      { label: 'Маркированные списки', value: 'bullet_lists', priceMultiplier: 1 },
      { label: 'Нумерованные списки', value: 'numbered_lists', priceMultiplier: 1 },
      { label: 'Цитаты и выделения', value: 'quotes', priceMultiplier: 1.1 },
      { label: 'Врезки и факты', value: 'callouts', priceMultiplier: 1.2 }
    ],
    recommendations: [
      'Хорошая структура улучшает читаемость на 58%',
      'Используйте заголовки для лучшего SEO'
    ]
  },
  {
    id: 'add_tables',
    name: 'Добавить таблицы в текст',
    description: 'Включить таблицы для структурирования данных',
    type: 'checkbox_with_options',
    options: [
      { label: 'Простая таблица сравнения', value: 'comparison', priceMultiplier: 1.3 },
      { label: 'Таблица характеристик', value: 'features', priceMultiplier: 1.3 },
      { label: 'Ценовая таблица', value: 'pricing', priceMultiplier: 1.4 },
      { label: 'Статистическая таблица', value: 'stats', priceMultiplier: 1.2 }
    ],
    recommendations: [
      'Таблицы улучшают восприятие сложной информации',
      'Поисковые системы лучше индексируют структурированные данные'
    ]
  },
  {
    id: 'add_icons',
    name: 'Добавить иконки и визуальные элементы',
    description: 'Рекомендации по иконкам для улучшения восприятия',
    type: 'checkbox_with_options',
    options: [
      { label: 'Иконки для заголовков', value: 'header_icons', priceMultiplier: 1.1 },
      { label: 'Иконки для списков', value: 'list_icons', priceMultiplier: 1.1 },
      { label: 'Иконки для призывов к действию', value: 'cta_icons', priceMultiplier: 1.2 },
      { label: 'Схемы и диаграммы', value: 'diagrams', priceMultiplier: 1.5 }
    ],
    recommendations: [
      'Визуальные элементы увеличивают вовлеченность на 80%',
      'Иконки помогают быстрее сканировать текст'
    ]
  },
  {
    id: 'content_questions',
    name: 'Ключевые вопросы для раскрытия темы',
    description: 'Вопросы, на которые должен отвечать текст',
    type: 'textarea',
    placeholder: 'Введите по одному вопросу в строке:\n- Что такое...?\n- Как выбрать...?\n- Почему важно...?',
    recommendations: [
      'Вопросы помогают структурировать материал',
      'FAQ-секции улучшают SEO и пользовательский опыт'
    ]
  },
  {
    id: 'keywords',
    name: 'Ключевые слова',
    description: 'Слова и фразы для SEO-оптимизации',
    type: 'textarea',
    placeholder: 'Введите ключевые слова через запятую...',
    recommendations: [
      'Используйте 5-10 основных ключевых слов',
      'Включайте длинные хвосты для лучшего ранжирования'
    ]
  }
];
