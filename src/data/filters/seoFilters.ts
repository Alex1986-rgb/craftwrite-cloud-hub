
import { SmartFilter } from '@/types/advancedOrder';

export const SEO_FILTERS: SmartFilter[] = [
  {
    id: 'seo_optimization',
    name: 'Уровень SEO-оптимизации',
    description: 'Насколько глубоко оптимизировать текст для поисковых систем',
    type: 'select',
    required: true,
    options: [
      { label: 'Базовая оптимизация', value: 'basic', priceMultiplier: 1 },
      { label: 'Расширенная оптимизация', value: 'advanced', priceMultiplier: 1.3 },
      { label: 'Техническая оптимизация', value: 'technical', priceMultiplier: 1.6 }
    ],
    recommendations: [
      'Базовая оптимизация подходит для большинства задач',
      'Расширенная включает анализ конкурентов и LSI-ключи',
      'Техническая оптимизация включает микроразметку и структурные данные'
    ]
  },
  {
    id: 'competitor_analysis',
    name: 'Анализ конкурентов',
    description: 'Исследование контента конкурентов в ТОП-10',
    type: 'select',
    required: false,
    options: [
      { label: 'Не требуется', value: 'none', priceMultiplier: 1 },
      { label: 'Базовый анализ', value: 'basic', priceMultiplier: 1.1 },
      { label: 'Детальный анализ', value: 'detailed', priceMultiplier: 1.4 }
    ]
  }
];
