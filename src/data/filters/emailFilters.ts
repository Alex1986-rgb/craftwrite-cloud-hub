
import { SmartFilter } from '@/types/advancedOrder';

export const EMAIL_FILTERS: SmartFilter[] = [
  {
    id: 'email_type',
    name: 'Тип email-кампании',
    type: 'select',
    description: 'Основная цель email-рассылки',
    options: [
      { value: 'welcome', label: 'Welcome-серия', description: 'Приветственные письма' },
      { value: 'nurturing', label: 'Прогрев', description: 'Образовательный контент' },
      { value: 'sales', label: 'Продажи', description: 'Коммерческие письма' },
      { value: 'retention', label: 'Удержание', description: 'Реактивация клиентов' },
      { value: 'newsletter', label: 'Новостная рассылка', description: 'Регулярные обновления' },
      { value: 'transactional', label: 'Транзакционные', description: 'Подтверждения, уведомления' }
    ],
    recommendations: [
      'Welcome-серия имеет самую высокую открываемость',
      'Прогревающие письма повышают лояльность',
      'Продающие письма должны содержать четкий CTA'
    ]
  },
  {
    id: 'personalization',
    name: 'Персонализация',
    type: 'select',
    description: 'Уровень персонализации контента',
    options: [
      { value: 'basic', label: 'Базовая', description: 'Имя получателя', priceMultiplier: 1.0 },
      { value: 'behavioral', label: 'Поведенческая', description: 'По действиям пользователя', priceMultiplier: 1.3 },
      { value: 'demographic', label: 'Демографическая', description: 'По характеристикам аудитории', priceMultiplier: 1.2 },
      { value: 'dynamic', label: 'Динамическая', description: 'Адаптивный контент в реальном времени', priceMultiplier: 1.5 }
    ],
    recommendations: [
      'Персонализация увеличивает открываемость на 26%',
      'Поведенческая персонализация повышает CTR в 3 раза',
      'Динамический контент максимизирует релевантность'
    ]
  },
  {
    id: 'automation_level',
    name: 'Уровень автоматизации',
    type: 'select',
    description: 'Сложность автоматизации рассылки',
    options: [
      { value: 'simple', label: 'Простая', description: 'Последовательная отправка', priceMultiplier: 1.0 },
      { value: 'conditional', label: 'Условная', description: 'Ветвление по действиям', priceMultiplier: 1.4 },
      { value: 'ai_driven', label: 'AI-управляемая', description: 'Машинное обучение', priceMultiplier: 1.8 }
    ],
    recommendations: [
      'Условная автоматизация повышает конверсию на 50%',
      'AI-управляемые кампании самооптимизируются',
      'Простая автоматизация подходит для стартапов'
    ]
  },
  {
    id: 'subject_optimization',
    name: 'Оптимизация темы письма',
    type: 'multiselect',
    description: 'Техники оптимизации subject line',
    options: [
      { value: 'ab_testing', label: 'A/B тестирование', description: 'Тестирование разных вариантов' },
      { value: 'emoji_usage', label: 'Использование эмодзи', description: 'Эмодзи для привлечения внимания' },
      { value: 'urgency_words', label: 'Слова срочности', description: 'Создание чувства неотложности' },
      { value: 'personalization', label: 'Персонализация темы', description: 'Имя или локация в теме' },
      { value: 'curiosity_gap', label: 'Интрига', description: 'Создание любопытства' },
      { value: 'numbers_stats', label: 'Цифры и статистика', description: 'Конкретные данные в теме' }
    ],
    recommendations: [
      'A/B тестирование тем увеличивает открываемость на 15%',
      'Эмодзи могут повысить открываемость на 56%',
      'Персонализированные темы работают лучше в 2.6 раза'
    ]
  }
];
