
import { SmartFilter, DynamicQuestion } from '@/types/advancedOrder';

export const COMMON_FILTERS: SmartFilter[] = [
  {
    id: 'topic',
    name: 'Тематика',
    type: 'select',
    description: 'Выберите основную тематику вашего проекта',
    options: [
      { value: 'business', label: 'Бизнес и финансы', description: 'Корпоративные тексты, финансовые услуги' },
      { value: 'tech', label: 'IT и технологии', description: 'Стартапы, SaaS, технические продукты' },
      { value: 'health', label: 'Здоровье и медицина', description: 'Медицинские услуги, фармацевтика' },
      { value: 'ecommerce', label: 'E-commerce', description: 'Интернет-магазины, маркетплейсы' },
      { value: 'education', label: 'Образование', description: 'Онлайн-курсы, образовательные платформы' },
      { value: 'realestate', label: 'Недвижимость', description: 'Агентства, застройщики, аренда' },
      { value: 'beauty', label: 'Красота и здоровье', description: 'Салоны красоты, косметика, фитнес' },
      { value: 'travel', label: 'Туризм', description: 'Турагентства, отели, экскурсии' },
      { value: 'auto', label: 'Автомобили', description: 'Автосалоны, автосервисы, запчасти' },
      { value: 'other', label: 'Другое', description: 'Укажите в комментариях' }
    ],
    recommendations: [
      'Четко определенная тематика поможет создать более релевантный контент',
      'Мы учитываем специфику отрасли при написании текстов',
      'Для каждой ниши есть свои особенности подачи информации'
    ]
  },
  {
    id: 'textLength',
    name: 'Объем текста',
    type: 'range',
    min: 500,
    max: 15000,
    defaultValue: 3000,
    description: 'Укажите желаемый объем в символах',
    recommendations: [
      'Для SEO-статей оптимальный объем: 3000-5000 символов',
      'Для описаний товаров: 500-1500 символов',
      'Для лендингов: 5000-10000 символов'
    ]
  },
  {
    id: 'writingStyle',
    name: 'Стиль написания',
    type: 'select',
    description: 'Выберите тон и стиль текста',
    options: [
      { value: 'professional', label: 'Профессиональный', description: 'Деловой, формальный стиль' },
      { value: 'friendly', label: 'Дружелюбный', description: 'Теплый, располагающий тон' },
      { value: 'expert', label: 'Экспертный', description: 'Авторитетный, компетентный стиль' },
      { value: 'casual', label: 'Неформальный', description: 'Простой, разговорный язык' },
      { value: 'luxury', label: 'Премиальный', description: 'Изысканный, статусный стиль' },
      { value: 'urgent', label: 'Побуждающий', description: 'Мотивирующий к действию' }
    ],
    recommendations: [
      'Стиль должен соответствовать вашей целевой аудитории',
      'B2B тексты лучше писать профессиональным стилем',
      'Для молодой аудитории подходит дружелюбный стиль'
    ]
  },
  {
    id: 'targetAudience',
    name: 'Целевая аудитория',
    type: 'multiselect',
    description: 'Выберите характеристики вашей аудитории',
    options: [
      { value: 'b2b', label: 'B2B клиенты', description: 'Бизнес-клиенты, компании' },
      { value: 'b2c', label: 'B2C клиенты', description: 'Конечные потребители' },
      { value: 'young', label: 'Молодая аудитория (18-30)', description: 'Студенты, молодые специалисты' },
      { value: 'middle', label: 'Средний возраст (30-50)', description: 'Состоявшиеся профессионалы' },
      { value: 'senior', label: 'Старшая группа (50+)', description: 'Опытные специалисты, руководители' },
      { value: 'mass', label: 'Массовая аудитория', description: 'Широкий круг потребителей' }
    ]
  },
  {
    id: 'priority',
    name: 'Приоритет выполнения',
    type: 'select',
    description: 'Выберите срочность выполнения заказа',
    options: [
      { value: 'standard', label: 'Стандартный (5-7 дней)', priceMultiplier: 1.0, description: 'Обычные сроки' },
      { value: 'urgent', label: 'Срочный (2-3 дня)', priceMultiplier: 1.5, description: '+50% к стоимости' },
      { value: 'express', label: 'Экспресс (24 часа)', priceMultiplier: 2.0, description: '+100% к стоимости' }
    ],
    recommendations: [
      'Стандартные сроки обеспечивают лучшее качество',
      'Срочные заказы требуют больше ресурсов',
      'Экспресс-заказы доступны не для всех типов текстов'
    ]
  }
];

// SEO-специфичные фильтры
export const SEO_FILTERS: SmartFilter[] = [
  {
    id: 'seo_optimization',
    name: 'SEO-оптимизация',
    type: 'select',
    options: [
      { value: 'basic', label: 'Базовая', description: 'Ключевые слова в тексте' },
      { value: 'advanced', label: 'Расширенная', description: 'Глубокий анализ конкурентов' },
      { value: 'technical', label: 'Техническая', description: 'Мета-теги, разметка, структура' }
    ],
    recommendations: ['Техническая SEO-оптимизация повышает эффективность в 2-3 раза']
  },
  {
    id: 'keyword_density',
    name: 'Плотность ключевых слов',
    type: 'range',
    min: 1,
    max: 5,
    defaultValue: 2,
    description: 'Процент ключевых слов в тексте'
  },
  {
    id: 'semantic_core',
    name: 'Семантическое ядро',
    type: 'select',
    options: [
      { value: 'provided', label: 'Предоставлю сам', description: 'У вас есть готовое СЯ' },
      { value: 'research', label: 'Нужен сбор', description: 'Мы соберем семантику' },
      { value: 'expand', label: 'Расширить существующее', description: 'Дополним ваше СЯ' }
    ]
  }
];

// Лендинг-специфичные фильтры
export const LANDING_FILTERS: SmartFilter[] = [
  {
    id: 'landing_type',
    name: 'Тип лендинга',
    type: 'select',
    options: [
      { value: 'product', label: 'Продукт', description: 'Презентация одного продукта' },
      { value: 'service', label: 'Услуга', description: 'Описание услуги или сервиса' },
      { value: 'event', label: 'Мероприятие', description: 'Регистрация на событие' },
      { value: 'lead', label: 'Лидогенерация', description: 'Сбор контактов' }
    ]
  },
  {
    id: 'conversion_elements',
    name: 'Конверсионные элементы',
    type: 'multiselect',
    options: [
      { value: 'testimonials', label: 'Отзывы клиентов', description: 'Социальные доказательства' },
      { value: 'guarantees', label: 'Гарантии', description: 'Снижение рисков' },
      { value: 'urgency', label: 'Срочность', description: 'Ограниченное время' },
      { value: 'scarcity', label: 'Дефицит', description: 'Ограниченное количество' },
      { value: 'benefits', label: 'Выгоды', description: 'Список преимуществ' }
    ]
  }
];

// Email-специфичные фильтры
export const EMAIL_FILTERS: SmartFilter[] = [
  {
    id: 'email_type',
    name: 'Тип email-кампании',
    type: 'select',
    options: [
      { value: 'welcome', label: 'Welcome-серия', description: 'Приветственные письма' },
      { value: 'nurturing', label: 'Прогрев', description: 'Образовательный контент' },
      { value: 'sales', label: 'Продажи', description: 'Коммерческие письма' },
      { value: 'retention', label: 'Удержание', description: 'Реактивация клиентов' }
    ]
  },
  {
    id: 'personalization',
    name: 'Персонализация',
    type: 'select',
    options: [
      { value: 'basic', label: 'Базовая', description: 'Имя получателя' },
      { value: 'behavioral', label: 'Поведенческая', description: 'По действиям пользователя' },
      { value: 'demographic', label: 'Демографическая', description: 'По характеристикам аудитории' }
    ]
  }
];

// Telegram-специфичные фильтры
export const TELEGRAM_FILTERS: SmartFilter[] = [
  {
    id: 'content_format',
    name: 'Формат контента',
    type: 'multiselect',
    options: [
      { value: 'text', label: 'Текстовые посты', description: 'Обычные сообщения' },
      { value: 'media', label: 'Медиа-контент', description: 'Фото/видео с текстом' },
      { value: 'polls', label: 'Опросы', description: 'Интерактивные элементы' },
      { value: 'stories', label: 'Сторис', description: 'Короткий контент' }
    ]
  },
  {
    id: 'posting_schedule',
    name: 'График публикаций',
    type: 'select',
    options: [
      { value: 'daily', label: '1-2 поста в день', description: 'Регулярные публикации' },
      { value: 'frequent', label: '3-5 постов в день', description: 'Активное ведение' },
      { value: 'intensive', label: '5+ постов в день', description: 'Интенсивный контент' }
    ]
  }
];

export const SERVICE_SPECIFIC_QUESTIONS: Record<string, DynamicQuestion[]> = {
  'seo-article': [
    {
      id: 'keywords',
      label: 'Ключевые слова',
      type: 'textarea',
      required: true,
      placeholder: 'Укажите основные ключевые слова через запятую',
      description: 'Список ключевых слов для SEO-оптимизации',
      validation: { min: 10, max: 500 }
    },
    {
      id: 'competitors',
      label: 'Конкуренты',
      type: 'textarea',
      required: false,
      placeholder: 'Ссылки на статьи конкурентов для анализа',
      description: 'Поможет создать более качественный контент'
    },
    {
      id: 'structure',
      label: 'Требуемая структура',
      type: 'multiselect',
      required: false,
      options: ['Введение', 'Основная часть', 'Заключение', 'FAQ', 'Список литературы', 'Призыв к действию'],
      description: 'Выберите необходимые разделы статьи'
    },
    {
      id: 'target_region',
      label: 'Целевой регион',
      type: 'select',
      required: false,
      options: ['Россия', 'Москва', 'СПб', 'Регионы', 'СНГ', 'Международный'],
      description: 'Географическая привязка для SEO'
    }
  ],
  'landing-page': [
    {
      id: 'product',
      label: 'Описание продукта/услуги',
      type: 'textarea',
      required: true,
      placeholder: 'Подробно опишите ваш продукт или услугу',
      description: 'Чем подробнее описание, тем лучше результат',
      validation: { min: 100, max: 1000 }
    },
    {
      id: 'usp',
      label: 'Уникальное торговое предложение',
      type: 'text',
      required: true,
      placeholder: 'Главное преимущество вашего предложения',
      description: 'Что отличает вас от конкурентов?'
    },
    {
      id: 'cta',
      label: 'Желаемое действие',
      type: 'select',
      required: true,
      options: ['Купить', 'Заказать', 'Получить консультацию', 'Скачать', 'Зарегистрироваться', 'Подписаться'],
      description: 'Что должен сделать посетитель?'
    },
    {
      id: 'benefits',
      label: 'Ключевые выгоды',
      type: 'textarea',
      required: true,
      placeholder: 'Перечислите основные выгоды для клиента',
      description: 'Фокус на пользе для клиента'
    },
    {
      id: 'pain_points',
      label: 'Боли клиентов',
      type: 'textarea',
      required: false,
      placeholder: 'Какие проблемы решает ваш продукт?',
      description: 'Проблемы, которые испытывает ваша аудитория'
    }
  ],
  'email-campaigns': [
    {
      id: 'campaign_type',
      label: 'Тип кампании',
      type: 'select',
      required: true,
      options: ['Welcome-серия', 'Продающая кампания', 'Реактивация', 'Анонсы', 'Обучающая серия'],
      description: 'Определяет структуру и подход к написанию'
    },
    {
      id: 'emails_count',
      label: 'Количество писем',
      type: 'number',
      required: true,
      validation: { min: 1, max: 20 },
      description: 'Сколько писем должно быть в серии?'
    },
    {
      id: 'sending_interval',
      label: 'Интервал отправки',
      type: 'select',
      required: true,
      options: ['Ежедневно', 'Через день', 'Еженедельно', 'По триггерам'],
      description: 'Как часто отправлять письма?'
    },
    {
      id: 'automation_triggers',
      label: 'Триггеры автоматизации',
      type: 'multiselect',
      required: false,
      options: ['Регистрация', 'Покупка', 'Отказ от корзины', 'День рождения', 'Неактивность'],
      description: 'События, запускающие письма'
    }
  ],
  'telegram-content': [
    {
      id: 'channel_type',
      label: 'Тип канала',
      type: 'select',
      required: true,
      options: ['Новостной', 'Экспертный', 'Развлекательный', 'Коммерческий', 'Образовательный'],
      description: 'Определяет тон и формат контента'
    },
    {
      id: 'posting_frequency',
      label: 'Частота публикаций',
      type: 'select',
      required: true,
      options: ['1-2 поста в день', '3-5 постов в день', '5-10 постов в день', 'По мере поступления новостей'],
      description: 'Как часто планируете публиковать контент?'
    },
    {
      id: 'content_types',
      label: 'Типы контента',
      type: 'multiselect',
      required: true,
      options: ['Текстовые посты', 'Фото с описанием', 'Видео-контент', 'Опросы', 'Конкурсы', 'Ссылки с анонсом'],
      description: 'Какие форматы контента планируете использовать?'
    },
    {
      id: 'audience_engagement',
      label: 'Взаимодействие с аудиторией',
      type: 'multiselect',
      required: false,
      options: ['Ответы на комментарии', 'Опросы и голосования', 'Конкурсы и розыгрыши', 'Обратная связь'],
      description: 'Как планируете вовлекать подписчиков?'
    }
  ]
};

// Функция для получения специфичных фильтров по услуге
export const getServiceSpecificFilters = (serviceSlug: string): SmartFilter[] => {
  switch (serviceSlug) {
    case 'seo-article':
      return SEO_FILTERS;
    case 'landing-page':
      return LANDING_FILTERS;
    case 'email-campaigns':
      return EMAIL_FILTERS;
    case 'telegram-content':
      return TELEGRAM_FILTERS;
    default:
      return [];
  }
};
