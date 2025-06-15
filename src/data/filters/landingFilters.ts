
import { SmartFilter } from '@/types/advancedOrder';

export const LANDING_FILTERS: SmartFilter[] = [
  {
    id: 'landing_type',
    name: 'Тип лендинга',
    type: 'select',
    description: 'Основная цель посадочной страницы',
    options: [
      { value: 'product', label: 'Продукт', description: 'Презентация одного продукта' },
      { value: 'service', label: 'Услуга', description: 'Описание услуги или сервиса' },
      { value: 'event', label: 'Мероприятие', description: 'Регистрация на событие' },
      { value: 'lead', label: 'Лидогенерация', description: 'Сбор контактов' },
      { value: 'subscription', label: 'Подписка', description: 'Оформление подписки на сервис' }
    ],
    recommendations: [
      'Тип лендинга определяет структуру и акценты',
      'Продуктовые лендинги фокусируются на характеристиках',
      'Лидогенерирующие лендинги делают акцент на выгодах'
    ]
  },
  {
    id: 'conversion_elements',
    name: 'Конверсионные элементы',
    type: 'multiselect',
    description: 'Элементы для повышения конверсии',
    options: [
      { value: 'testimonials', label: 'Отзывы клиентов', description: 'Социальные доказательства' },
      { value: 'guarantees', label: 'Гарантии', description: 'Снижение рисков' },
      { value: 'urgency', label: 'Срочность', description: 'Ограниченное время' },
      { value: 'scarcity', label: 'Дефицит', description: 'Ограниченное количество' },
      { value: 'benefits', label: 'Выгоды', description: 'Список преимуществ' },
      { value: 'case_studies', label: 'Кейсы', description: 'Истории успеха клиентов' },
      { value: 'expert_badges', label: 'Экспертные знаки', description: 'Сертификаты, награды' },
      { value: 'money_back', label: 'Возврат денег', description: 'Гарантия возврата средств' }
    ],
    recommendations: [
      'Социальные доказательства увеличивают доверие на 70%',
      'Срочность и дефицит создают мотивацию к действию',
      'Гарантии снижают страх покупки'
    ]
  },
  {
    id: 'target_action',
    name: 'Целевое действие',
    type: 'select',
    description: 'Основное действие, которое должен совершить посетитель',
    options: [
      { value: 'purchase', label: 'Покупка', description: 'Прямая продажа товара/услуги' },
      { value: 'consultation', label: 'Консультация', description: 'Запрос консультации' },
      { value: 'registration', label: 'Регистрация', description: 'Создание аккаунта' },
      { value: 'download', label: 'Скачивание', description: 'Загрузка материалов' },
      { value: 'subscription', label: 'Подписка', description: 'Подписка на рассылку/сервис' },
      { value: 'trial', label: 'Пробный период', description: 'Активация trial-версии' }
    ],
    recommendations: [
      'Одно главное действие на лендинге увеличивает конверсию',
      'CTA должен быть ярким и заметным',
      'Используйте активные глаголы в призывах'
    ]
  },
  {
    id: 'design_approach',
    name: 'Подход к дизайну',
    type: 'select',
    description: 'Стилистическое направление лендинга',
    options: [
      { value: 'minimalist', label: 'Минималистичный', description: 'Чистый, простой дизайн' },
      { value: 'emotional', label: 'Эмоциональный', description: 'Яркие образы, эмоции' },
      { value: 'technical', label: 'Технический', description: 'Схемы, графики, данные' },
      { value: 'storytelling', label: 'Сторителлинг', description: 'История бренда/продукта' },
      { value: 'comparison', label: 'Сравнительный', description: 'Сравнение с конкурентами' }
    ],
    recommendations: [
      'Минимализм работает для B2B аудитории',
      'Эмоциональный подход эффективен в B2C',
      'Сторителлинг создает связь с брендом'
    ]
  }
];
