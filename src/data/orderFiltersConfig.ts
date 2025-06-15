
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
    ],
    recommendations: [
      'Понимание аудитории - основа эффективного текста',
      'Возраст влияет на стиль и способ подачи информации',
      'B2B и B2C требуют разного подхода в копирайтинге'
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
  },
  {
    id: 'brandVoice',
    name: 'Голос бренда',
    type: 'select',
    description: 'Определите характер коммуникации бренда',
    options: [
      { value: 'authoritative', label: 'Авторитетный', description: 'Экспертный, компетентный' },
      { value: 'innovative', label: 'Инновационный', description: 'Современный, технологичный' },
      { value: 'caring', label: 'Заботливый', description: 'Понимающий, поддерживающий' },
      { value: 'playful', label: 'Игривый', description: 'Веселый, креативный' },
      { value: 'sophisticated', label: 'Утонченный', description: 'Элегантный, премиальный' }
    ],
    recommendations: [
      'Голос бренда должен отражать ценности компании',
      'Последовательность в коммуникации укрепляет узнаваемость',
      'Выбор зависит от специфики бизнеса и аудитории'
    ]
  }
];

// SEO-специфичные фильтры
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

// Лендинг-специфичные фильтры
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

// Email-специфичные фильтры
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

// Telegram-специфичные фильтры
export const TELEGRAM_FILTERS: SmartFilter[] = [
  {
    id: 'content_format',
    name: 'Формат контента',
    type: 'multiselect',
    description: 'Типы контента для канала',
    options: [
      { value: 'text', label: 'Текстовые посты', description: 'Обычные сообщения' },
      { value: 'media', label: 'Медиа-контент', description: 'Фото/видео с текстом' },
      { value: 'polls', label: 'Опросы', description: 'Интерактивные элементы' },
      { value: 'stories', label: 'Сторис', description: 'Короткий контент' },
      { value: 'carousel', label: 'Карусели', description: 'Несколько изображений' },
      { value: 'voice', label: 'Голосовые сообщения', description: 'Аудио-контент' },
      { value: 'documents', label: 'Документы', description: 'PDF, файлы для скачивания' }
    ],
    recommendations: [
      'Медиа-контент получает в 3 раза больше вовлечения',
      'Опросы увеличивают активность аудитории на 40%',
      'Разнообразие форматов удерживает внимание'
    ]
  },
  {
    id: 'posting_schedule',
    name: 'График публикаций',
    type: 'select',
    description: 'Частота размещения контента',
    options: [
      { value: 'daily', label: '1-2 поста в день', description: 'Регулярные публикации' },
      { value: 'frequent', label: '3-5 постов в день', description: 'Активное ведение' },
      { value: 'intensive', label: '5-10 постов в день', description: 'Интенсивный контент' },
      { value: 'news_based', label: 'По новостям', description: 'Реактивный контент' }
    ],
    recommendations: [
      'Оптимальная частота: 2-3 поста в день для большинства каналов',
      'Новостные каналы могут публиковать чаще',
      'Качество важнее количества'
    ]
  },
  {
    id: 'engagement_strategy',
    name: 'Стратегия вовлечения',
    type: 'multiselect',
    description: 'Методы увеличения активности подписчиков',
    options: [
      { value: 'questions', label: 'Вопросы к аудитории', description: 'Стимулирование комментариев' },
      { value: 'contests', label: 'Конкурсы и розыгрыши', description: 'Призы за активность' },
      { value: 'reactions', label: 'Призывы к реакциям', description: 'Простые способы взаимодействия' },
      { value: 'user_content', label: 'Пользовательский контент', description: 'Публикация контента подписчиков' },
      { value: 'live_streams', label: 'Прямые эфиры', description: 'Общение в реальном времени' },
      { value: 'exclusive_content', label: 'Эксклюзивный контент', description: 'Уникальная информация' }
    ],
    recommendations: [
      'Вопросы к аудитории увеличивают комментарии в 5 раз',
      'Эксклюзивный контент повышает лояльность',
      'Конкурсы привлекают новых подписчиков'
    ]
  },
  {
    id: 'monetization_approach',
    name: 'Подход к монетизации',
    type: 'select',
    description: 'Способ получения дохода с канала',
    options: [
      { value: 'advertising', label: 'Реклама', description: 'Рекламные посты и интеграции' },
      { value: 'affiliate', label: 'Партнерские программы', description: 'Комиссия с продаж' },
      { value: 'subscription', label: 'Платная подписка', description: 'Премиум контент' },
      { value: 'products', label: 'Собственные продукты', description: 'Продажа своих товаров/услуг' },
      { value: 'donations', label: 'Донаты', description: 'Добровольные пожертвования' },
      { value: 'none', label: 'Без монетизации', description: 'Информационный канал' }
    ],
    recommendations: [
      'Качественная реклама может быть полезной для аудитории',
      'Собственные продукты дают максимальную прибыль',
      'Сначала создайте ценность, потом монетизируйте'
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
    },
    {
      id: 'expert_quotes',
      label: 'Экспертные мнения',
      type: 'checkbox',
      required: false,
      description: 'Включить цитаты экспертов отрасли'
    },
    {
      id: 'statistics_data',
      label: 'Статистические данные',
      type: 'checkbox',
      required: false,
      description: 'Добавить актуальную статистику по теме'
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
    },
    {
      id: 'price_strategy',
      label: 'Ценовая стратегия',
      type: 'select',
      required: false,
      options: ['Указать цену', 'Скрыть цену до консультации', 'Ценовая линейка', 'От ... рублей'],
      description: 'Как представить цену на лендинге'
    },
    {
      id: 'social_proof',
      label: 'Социальные доказательства',
      type: 'multiselect',
      required: false,
      options: ['Отзывы клиентов', 'Логотипы компаний', 'Сертификаты', 'Награды', 'Количество клиентов', 'Годы на рынке'],
      description: 'Элементы доверия для включения'
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
    },
    {
      id: 'segmentation',
      label: 'Сегментация аудитории',
      type: 'multiselect',
      required: false,
      options: ['По полу', 'По возрасту', 'По интересам', 'По поведению', 'По географии', 'По покупкам'],
      description: 'Критерии разделения аудитории'
    },
    {
      id: 'content_mix',
      label: 'Соотношение контента',
      type: 'select',
      required: false,
      options: ['80% полезное / 20% продающее', '70% / 30%', '60% / 40%', '50% / 50%'],
      description: 'Баланс между ценностью и продажами'
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
    },
    {
      id: 'content_sources',
      label: 'Источники контента',
      type: 'multiselect',
      required: false,
      options: ['Собственная экспертиза', 'Новости отрасли', 'Пользовательский контент', 'Партнерские материалы', 'Переводы зарубежных источников'],
      description: 'Откуда будете брать материалы для публикаций'
    },
    {
      id: 'analytics_tracking',
      label: 'Отслеживание аналитики',
      type: 'multiselect',
      required: false,
      options: ['Просмотры постов', 'Охват аудитории', 'Вовлеченность', 'Переходы по ссылкам', 'Рост подписчиков'],
      description: 'Какие метрики важны для анализа эффективности'
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
