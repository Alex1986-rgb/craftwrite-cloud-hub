
import { DynamicQuestion } from '@/types/advancedOrder';

export const EXTENDED_SERVICE_QUESTIONS: Record<string, DynamicQuestion[]> = {
  'seo-articles': [
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
      id: 'article_length',
      label: 'Объем статьи',
      type: 'select',
      required: true,
      options: ['2000-3000 символов', '3000-5000 символов', '5000-8000 символов', '8000+ символов'],
      description: 'Желаемый объем статьи'
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
      id: 'competitors',
      label: 'Конкуренты для анализа',
      type: 'textarea',
      required: false,
      placeholder: 'Ссылки на статьи конкурентов для анализа',
      description: 'Поможет создать более качественный контент'
    },
    {
      id: 'expert_quotes',
      label: 'Экспертные мнения',
      type: 'checkbox',
      required: false,
      description: 'Включить цитаты экспертов отрасли (+1500₽)'
    },
    {
      id: 'infographics',
      label: 'Инфографика',
      type: 'checkbox',
      required: false,
      description: 'Создать инфографику к статье (+2500₽)'
    }
  ],
  'landing-pages': [
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
      id: 'target_action',
      label: 'Целевое действие',
      type: 'select',
      required: true,
      options: ['Купить сейчас', 'Заказать консультацию', 'Скачать материал', 'Зарегистрироваться', 'Получить демо'],
      description: 'Что должен сделать посетитель?'
    },
    {
      id: 'price_strategy',
      label: 'Стратегия цены',
      type: 'select',
      required: true,
      options: ['Показать цену открыто', 'Цена по запросу', 'Ценовые пакеты', 'Скидки и акции'],
      description: 'Как представить цену на лендинге'
    },
    {
      id: 'social_proof',
      label: 'Социальные доказательства',
      type: 'multiselect',
      required: false,
      options: ['Отзывы клиентов', 'Логотип

ы компаний', 'Сертификаты', 'Награды', 'Статистика клиентов'],
      description: 'Элементы доверия для включения'
    },
    {
      id: 'ab_testing',
      label: 'A/B тестирование заголовков',
      type: 'checkbox',
      required: false,
      description: '3 варианта заголовков для тестирования (+2000₽)'
    }
  ],
  'email-campaigns': [
    {
      id: 'campaign_type',
      label: 'Тип кампании',
      type: 'select',
      required: true,
      options: ['Welcome-серия', 'Продающая кампания', 'Реактивация', 'Анонсы и новости', 'Обучающая серия'],
      description: 'Определяет структуру и подход к написанию'
    },
    {
      id: 'emails_count',
      label: 'Количество писем',
      type: 'number',
      required: true,
      validation: { min: 1, max: 15 },
      description: 'Сколько писем должно быть в серии?'
    },
    {
      id: 'personalization',
      label: 'Уровень персонализации',
      type: 'select',
      required: true,
      options: ['Базовый (имя)', 'Средний (имя + сегмент)', 'Высокий (поведенческая)', 'Максимальный (AI-персонализация)'],
      description: 'Насколько персонализированными должны быть письма?'
    },
    {
      id: 'automation_triggers',
      label: 'Триггеры автоматизации',
      type: 'multiselect',
      required: false,
      options: ['Регистрация', 'Покупка', 'Отказ от корзины', 'День рождения', 'Неактивность', 'Юбилей подписки'],
      description: 'События, запускающие письма'
    },
    {
      id: 'design_templates',
      label: 'Дизайн-шаблоны',
      type: 'checkbox',
      required: false,
      description: 'Создать адаптивные HTML-шаблоны (+3000₽)'
    }
  ],
  'social-media-content': [
    {
      id: 'platforms',
      label: 'Социальные платформы',
      type: 'multiselect',
      required: true,
      options: ['Instagram', 'VKontakte', 'Telegram', 'TikTok', 'YouTube', 'Facebook'],
      description: 'Для каких платформ создавать контент?'
    },
    {
      id: 'content_types',
      label: 'Типы контента',
      type: 'multiselect',
      required: true,
      options: ['Посты с изображениями', 'Карусели', 'Stories', 'Reels/Shorts', 'IGTV/длинные видео', 'Опросы'],
      description: 'Какие форматы контента планируете использовать?'
    },
    {
      id: 'posting_frequency',
      label: 'Частота публикаций',
      type: 'select',
      required: true,
      options: ['3-5 постов в неделю', '1 пост в день', '2-3 поста в день', '5+ постов в день'],
      description: 'Как часто планируете публиковать контент?'
    },
    {
      id: 'content_style',
      label: 'Стиль контента',
      type: 'select',
      required: true,
      options: ['Корпоративный', 'Дружелюбный', 'Экспертный', 'Развлекательный', 'Мотивационный'],
      description: 'Какой тон общения предпочитаете?'
    },
    {
      id: 'hashtag_research',
      label: 'Исследование хештегов',
      type: 'checkbox',
      required: false,
      description: 'Анализ и подбор эффективных хештегов (+1500₽)'
    },
    {
      id: 'competitor_analysis',
      label: 'Анализ конкурентов',
      type: 'checkbox',
      required: false,
      description: 'Исследование контент-стратегий конкурентов (+2000₽)'
    }
  ],
  'product-descriptions': [
    {
      id: 'marketplace',
      label: 'Маркетплейс',
      type: 'select',
      required: true,
      options: ['Wildberries', 'Ozon', 'Яндекс.Маркет', 'Авито', 'AliExpress', 'Несколько платформ'],
      description: 'На какой платформе будут размещены описания?'
    },
    {
      id: 'products_count',
      label: 'Количество товаров',
      type: 'number',
      required: true,
      validation: { min: 1, max: 100 },
      description: 'Сколько товаров нужно описать?'
    },
    {
      id: 'product_category',
      label: 'Категория товаров',
      type: 'select',
      required: true,
      options: ['Одежда и обувь', 'Красота и здоровье', 'Электроника', 'Дом и сад', 'Спорт и отдых', 'Детские товары', 'Другое'],
      description: 'К какой категории относятся ваши товары?'
    },
    {
      id: 'seo_optimization',
      label: 'SEO-оптимизация',
      type: 'select',
      required: true,
      options: ['Базовая', 'Углубленная', 'Максимальная с анализом ниши'],
      description: 'Уровень SEO-оптимизации описаний'
    },
    {
      id: 'competitor_analysis',
      label: 'Анализ конкурентов',
      type: 'checkbox',
      required: false,
      description: 'Исследование топовых товаров в категории (+1000₽ за товар)'
    }
  ],
  'technical-texts': [
    {
      id: 'industry',
      label: 'Отрасль',
      type: 'select',
      required: true,
      options: ['IT и технологии', 'Финансы и банки', 'Медицина и фармацевтика', 'Производство', 'Строительство', 'Образование', 'Другое'],
      description: 'В какой сфере специализируется ваша компания?'
    },
    {
      id: 'document_type',
      label: 'Тип документа',
      type: 'select',
      required: true,
      options: ['White Paper', 'Техническая документация', 'Инструкция', 'Регламент', 'Спецификация', 'Научная статья'],
      description: 'Какой тип технического текста нужен?'
    },
    {
      id: 'target_audience',
      label: 'Целевая аудитория',
      type: 'select',
      required: true,
      options: ['Технические специалисты', 'Менеджмент компаний', 'Академическое сообщество', 'Широкая публика', 'Регулирующие органы'],
      description: 'Кто будет читать этот документ?'
    },
    {
      id: 'complexity_level',
      label: 'Уровень сложности',
      type: 'select',
      required: true,
      options: ['Начальный', 'Средний', 'Продвинутый', 'Экспертный'],
      description: 'Насколько глубоко нужно раскрыть тему?'
    },
    {
      id: 'expert_consultation',
      label: 'Консультация эксперта',
      type: 'checkbox',
      required: false,
      description: 'Привлечение отраслевого эксперта (+5000₽)'
    }
  ],
  'press-releases': [
    {
      id: 'news_type',
      label: 'Тип новости',
      type: 'select',
      required: true,
      options: ['Запуск продукта', 'Корпоративные изменения', 'Партнерство', 'Награды и достижения', 'Исследования', 'События'],
      description: 'О чем будет пресс-релиз?'
    },
    {
      id: 'target_media',
      label: 'Целевые СМИ',
      type: 'multiselect',
      required: true,
      options: ['Федеральные СМИ', 'Отраслевые издания', 'Деловая пресса', 'Интернет-медиа', 'Региональные СМИ'],
      description: 'В какие типы изданий планируете отправлять?'
    },
    {
      id: 'distribution',
      label: 'Дистрибуция',
      type: 'checkbox',
      required: false,
      description: 'Рассылка по базе журналистов (+3000₽)'
    },
    {
      id: 'media_kit',
      label: 'Медиа-кит',
      type: 'checkbox',
      required: false,
      description: 'Создание медиа-кита с фактами и цифрами (+2000₽)'
    }
  ],
  'scripts-videos': [
    {
      id: 'video_type',
      label: 'Тип видео',
      type: 'select',
      required: true,
      options: ['YouTube-ролик', 'Рекламный ролик', 'Обучающее видео', 'Презентация', 'Shorts/Reels', 'Вебинар'],
      description: 'Для какого формата нужен сценарий?'
    },
    {
      id: 'video_length',
      label: 'Длительность видео',
      type: 'select',
      required: true,
      options: ['До 1 минуты', '1-3 минуты', '3-10 минут', '10-30 минут', '30+ минут'],
      description: 'Планируемая длительность ролика'
    },
    {
      id: 'style',
      label: 'Стиль подачи',
      type: 'select',
      required: true,
      options: ['Информационный', 'Развлекательный', 'Обучающий', 'Эмоциональный', 'Продающий'],
      description: 'В каком стиле должно быть видео?'
    },
    {
      id: 'visual_notes',
      label: 'Визуальные подсказки',
      type: 'checkbox',
      required: false,
      description: 'Описание визуального ряда и монтажа (+1500₽)'
    }
  ],
  'instagram-posts': [
    {
      id: 'post_types',
      label: 'Типы постов',
      type: 'multiselect',
      required: true,
      options: ['Одиночные посты', 'Карусели', 'Stories', 'Reels', 'IGTV'],
      description: 'Какие форматы контента нужны?'
    },
    {
      id: 'posts_count',
      label: 'Количество постов',
      type: 'number',
      required: true,
      validation: { min: 1, max: 50 },
      description: 'Сколько постов нужно создать?'
    },
    {
      id: 'content_themes',
      label: 'Тематики контента',
      type: 'multiselect',
      required: true,
      options: ['Продукты/услуги', 'За кулисами', 'Образовательный', 'Развлекательный', 'Пользовательский контент', 'Мотивационный'],
      description: 'О чем будут посты?'
    },
    {
      id: 'hashtag_strategy',
      label: 'Хештег-стратегия',
      type: 'checkbox',
      required: false,
      description: 'Исследование и подбор хештегов (+1000₽)'
    }
  ],
  'telegram-content': [
    {
      id: 'channel_type',
      label: 'Тип канала',
      type: 'select',
      required: true,
      options: ['Новостной', 'Экспертный', 'Развлекательный', 'Коммерческий', 'Образовательный'],
      description: 'Какой у вас тип Telegram-канала?'
    },
    {
      id: 'posts_count',
      label: 'Количество постов',
      type: 'number',
      required: true,
      validation: { min: 1, max: 50 },
      description: 'Сколько постов нужно создать?'
    },
    {
      id: 'posting_schedule',
      label: 'График публикаций',
      type: 'select',
      required: true,
      options: ['1-2 поста в день', '3-5 постов в день', '5-10 постов в день', 'По мере появления новостей'],
      description: 'Как часто планируете публиковать?'
    },
    {
      id: 'interactive_elements',
      label: 'Интерактивные элементы',
      type: 'multiselect',
      required: false,
      options: ['Опросы', 'Кнопки-ссылки', 'Викторины', 'Голосования'],
      description: 'Какие интерактивные элементы добавить?'
    }
  ],
  'wildberries-cards': [
    {
      id: 'products_count',
      label: 'Количество товаров',
      type: 'number',
      required: true,
      validation: { min: 1, max: 100 },
      description: 'Сколько карточек нужно оптимизировать?'
    },
    {
      id: 'category',
      label: 'Категория товаров',
      type: 'select',
      required: true,
      options: ['Одежда', 'Обувь', 'Красота', 'Дом и сад', 'Спорт', 'Электроника', 'Детские товары', 'Другое'],
      description: 'К какой категории относятся товары?'
    },
    {
      id: 'optimization_level',
      label: 'Уровень оптимизации',
      type: 'select',
      required: true,
      options: ['Базовая оптимизация', 'Углубленная с анализом ниши', 'Максимальная с A/B тестированием'],
      description: 'Насколько глубоко оптимизировать карточки?'
    },
    {
      id: 'competitor_research',
      label: 'Анализ конкурентов',
      type: 'checkbox',
      required: false,
      description: 'Исследование топ-продавцов в категории (+800₽ за товар)'
    }
  ],
  'ozon-cards': [
    {
      id: 'products_count',
      label: 'Количество товаров',
      type: 'number',
      required: true,
      validation: { min: 1, max: 100 },
      description: 'Сколько карточек нужно создать?'
    },
    {
      id: 'rich_content',
      label: 'Rich-контент',
      type: 'checkbox',
      required: false,
      description: 'Создание расширенного описания с медиа (+1500₽ за товар)'
    },
    {
      id: 'category',
      label: 'Категория товаров',
      type: 'select',
      required: true,
      options: ['Одежда и аксессуары', 'Красота и здоровье', 'Электроника', 'Дом и дача', 'Спорт и отдых', 'Другое'],
      description: 'Категория ваших товаров на Ozon'
    }
  ],
  'youtube-scripts': [
    {
      id: 'video_duration',
      label: 'Длительность видео',
      type: 'select',
      required: true,
      options: ['Shorts (до 60 сек)', 'Короткие (1-5 мин)', 'Средние (5-15 мин)', 'Длинные (15+ мин)'],
      description: 'Планируемая длительность ролика'
    },
    {
      id: 'channel_niche',
      label: 'Ниша канала',
      type: 'select',
      required: true,
      options: ['Образование', 'Развлечения', 'Обзоры', 'Бизнес', 'Технологии', 'Лайфстайл', 'Другое'],
      description: 'В какой нише работает канал?'
    },
    {
      id: 'retention_focus',
      label: 'Фокус на удержании',
      type: 'checkbox',
      required: false,
      description: 'Специальные техники для высокого удержания (+2000₽)'
    }
  ],
  'linkedin-posts': [
    {
      id: 'posts_count',
      label: 'Количество постов',
      type: 'number',
      required: true,
      validation: { min: 1, max: 30 },
      description: 'Сколько постов для LinkedIn нужно?'
    },
    {
      id: 'content_focus',
      label: 'Фокус контента',
      type: 'select',
      required: true,
      options: ['Личный бренд', 'Экспертность', 'Лидогенерация', 'HR и рекрутинг', 'Корпоративные новости'],
      description: 'Какую цель преследуете в LinkedIn?'
    },
    {
      id: 'post_formats',
      label: 'Форматы постов',
      type: 'multiselect',
      required: true,
      options: ['Текстовые посты', 'Карусели', 'Видео', 'Статьи', 'Опросы'],
      description: 'Какие форматы контента предпочитаете?'
    }
  ],
  'website-texts': [
    {
      id: 'pages_count',
      label: 'Количество страниц',
      type: 'select',
      required: true,
      options: ['1-3 страницы', '4-7 страниц', '8-15 страниц', '15+ страниц'],
      description: 'Сколько страниц нужно написать?'
    },
    {
      id: 'website_type',
      label: 'Тип сайта',
      type: 'select',
      required: true,
      options: ['Корпоративный сайт', 'Интернет-магазин', 'Лендинг', 'Блог/Медиа', 'Портфолио', 'SaaS-платформа'],
      description: 'Какой тип сайта у вас?'
    },
    {
      id: 'seo_optimization',
      label: 'SEO-оптимизация',
      type: 'select',
      required: true,
      options: ['Базовая', 'Углубленная', 'Максимальная с семантическим ядром'],
      description: 'Уровень SEO-оптимизации текстов'
    },
    {
      id: 'meta_tags',
      label: 'Мета-теги',
      type: 'checkbox',
      required: false,
      description: 'Title и Description для всех страниц (+500₽ за страницу)'
    }
  ]
};
