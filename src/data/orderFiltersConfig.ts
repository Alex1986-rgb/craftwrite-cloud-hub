import { SmartFilter, DynamicQuestion } from '@/types/advancedOrder';

export const SERVICE_SPECIFIC_QUESTIONS: Record<string, DynamicQuestion[]> = {
  'website-texts': [
    {
      id: 'site_type',
      label: 'Тип сайта',
      type: 'select',
      required: true,
      options: ['Корпоративный сайт', 'Интернет-магазин', 'Лендинг', 'Блог', 'Портфолио', 'Новостной сайт'],
      description: 'Выберите тип вашего сайта'
    },
    {
      id: 'pages_count',
      label: 'Количество страниц',
      type: 'number',
      required: true,
      validation: { min: 1, max: 100 },
      description: 'Сколько страниц нужно написать?'
    },
    {
      id: 'content_sections',
      label: 'Разделы для написания',
      type: 'multiselect',
      required: true,
      options: ['Главная страница', 'О компании', 'Услуги/Товары', 'Контакты', 'Блог', 'FAQ', 'Политика конфиденциальности'],
      description: 'Выберите разделы, которые нужно написать'
    },
    {
      id: 'brand_tone',
      label: 'Тон бренда',
      type: 'select',
      required: true,
      options: ['Дружелюбный', 'Профессиональный', 'Экспертный', 'Современный', 'Классический', 'Креативный'],
      description: 'Каким тоном должны быть написаны тексты?'
    },
    {
      id: 'call_to_action',
      label: 'Основной призыв к действию',
      type: 'text',
      required: true,
      placeholder: 'Например: Заказать консультацию, Купить сейчас',
      description: 'Какое действие должны совершить посетители?'
    }
  ],
  'instagram-posts': [
    {
      id: 'content_theme',
      label: 'Тематика контента',
      type: 'select',
      required: true,
      options: ['Бизнес/Продвижение', 'Личный блог', 'Мода/Красота', 'Еда/Рестораны', 'Путешествия', 'Фитнес/Здоровье', 'Обучение'],
      description: 'Основная тематика вашего аккаунта'
    },
    {
      id: 'posts_count',
      label: 'Количество постов',
      type: 'number',
      required: true,
      validation: { min: 5, max: 100 },
      description: 'Сколько постов нужно создать?'
    },
    {
      id: 'post_formats',
      label: 'Форматы постов',
      type: 'multiselect',
      required: true,
      options: ['Карусель', 'Одиночное фото', 'Видео', 'Reels', 'Stories', 'IGTV'],
      description: 'Выберите форматы для создания контента'
    },
    {
      id: 'hashtag_strategy',
      label: 'Стратегия хештегов',
      type: 'select',
      required: false,
      options: ['Популярные хештеги', 'Нишевые хештеги', 'Брендовые хештеги', 'Смешанная стратегия'],
      description: 'Какие хештеги использовать?'
    }
  ],
  'wildberries-cards': [
    {
      id: 'product_category',
      label: 'Категория товара',
      type: 'select',
      required: true,
      options: ['Одежда', 'Обувь', 'Электроника', 'Дом и сад', 'Красота и здоровье', 'Спорт', 'Детские товары', 'Автотовары'],
      description: 'К какой категории относится ваш товар?'
    },
    {
      id: 'cards_count',
      label: 'Количество карточек',
      type: 'number',
      required: true,
      validation: { min: 1, max: 50 },
      description: 'Сколько карточек товаров нужно создать?'
    },
    {
      id: 'key_features',
      label: 'Ключевые особенности товара',
      type: 'textarea',
      required: true,
      placeholder: 'Опишите основные характеристики и преимущества',
      description: 'Что делает ваш товар особенным?'
    },
    {
      id: 'target_keywords',
      label: 'Ключевые слова для поиска',
      type: 'textarea',
      required: true,
      placeholder: 'Перечислите через запятую',
      description: 'По каким запросам должны находить ваш товар?'
    }
  ],
  'ozon-cards': [
    {
      id: 'product_type',
      label: 'Тип товара',
      type: 'select',
      required: true,
      options: ['Товары для дома', 'Электроника', 'Одежда и обувь', 'Красота и здоровье', 'Спорт и отдых', 'Автотовары', 'Книги'],
      description: 'Выберите категорию вашего товара'
    },
    {
      id: 'competitive_advantage',
      label: 'Конкурентное преимущество',
      type: 'textarea',
      required: true,
      placeholder: 'Чем ваш товар лучше конкурентов?',
      description: 'Опишите уникальные преимущества'
    },
    {
      id: 'price_segment',
      label: 'Ценовой сегмент',
      type: 'select',
      required: true,
      options: ['Эконом', 'Средний', 'Премиум', 'Люкс'],
      description: 'В каком ценовом сегменте позиционируется товар?'
    }
  ],
  'youtube-scripts': [
    {
      id: 'video_format',
      label: 'Формат видео',
      type: 'select',
      required: true,
      options: ['Обучающее видео', 'Развлекательный контент', 'Обзор товара', 'Влог', 'Интервью', 'Презентация'],
      description: 'Какой формат видео планируете?'
    },
    {
      id: 'video_duration',
      label: 'Длительность видео',
      type: 'select',
      required: true,
      options: ['До 5 минут', '5-10 минут', '10-20 минут', '20+ минут'],
      description: 'Планируемая длительность ролика'
    },
    {
      id: 'target_action',
      label: 'Целевое действие',
      type: 'select',
      required: true,
      options: ['Подписка на канал', 'Лайк и комментарий', 'Переход на сайт', 'Покупка товара', 'Регистрация'],
      description: 'Что должны сделать зрители после просмотра?'
    }
  ],
  'linkedin-posts': [
    {
      id: 'professional_goal',
      label: 'Профессиональная цель',
      type: 'select',
      required: true,
      options: ['Личный брендинг', 'Поиск клиентов', 'Нетворкинг', 'Поиск работы', 'Экспертность', 'Продвижение компании'],
      description: 'Какую цель преследуете в LinkedIn?'
    },
    {
      id: 'industry_focus',
      label: 'Отрасль',
      type: 'select',
      required: true,
      options: ['IT и технологии', 'Маркетинг', 'Финансы', 'Консалтинг', 'Производство', 'Образование', 'Медицина'],
      description: 'В какой отрасли работаете?'
    },
    {
      id: 'content_style',
      label: 'Стиль контента',
      type: 'select',
      required: true,
      options: ['Экспертные статьи', 'Личный опыт', 'Инсайты индустрии', 'Кейсы и результаты', 'Мотивационные посты'],
      description: 'Какой стиль контента предпочитаете?'
    }
  ]
};

export const COMMON_FILTERS: SmartFilter[] = [
  {
    id: 'word_count',
    name: 'Объем текста',
    type: 'select',
    required: true,
    options: [
      { value: 'short', label: 'Короткий (до 500 слов)', priceMultiplier: 1 },
      { value: 'medium', label: 'Средний (500-1500 слов)', priceMultiplier: 1.5 },
      { value: 'long', label: 'Длинный (1500+ слов)', priceMultiplier: 2.5 }
    ],
    description: 'Выберите примерный объем текста'
  },
  {
    id: 'tone_style',
    name: 'Тон и стиль',
    type: 'select',
    required: true,
    options: [
      { value: 'friendly', label: 'Дружелюбный', priceMultiplier: 1 },
      { value: 'professional', label: 'Профессиональный', priceMultiplier: 1 },
      { value: 'expert', label: 'Экспертный', priceMultiplier: 1.2 },
      { value: 'casual', label: 'Неформальный', priceMultiplier: 1 }
    ],
    description: 'Каким тоном писать текст?'
  },
  {
    id: 'target_audience',
    name: 'Целевая аудитория',
    type: 'select',
    options: [
      { value: 'b2b', label: 'Бизнес (B2B)', priceMultiplier: 1.3 },
      { value: 'b2c', label: 'Потребители (B2C)', priceMultiplier: 1 },
      { value: 'mixed', label: 'Смешанная аудитория', priceMultiplier: 1.1 }
    ],
    description: 'Для кого предназначен текст?'
  },
  {
    id: 'keywords',
    name: 'SEO-ключевые слова',
    type: 'textarea',
    placeholder: 'Введите ключевые слова через запятую',
    description: 'Ключевые слова для поискового продвижения'
  }
];

export const getServiceSpecificFilters = (serviceSlug: string): SmartFilter[] => {
  const questions = SERVICE_SPECIFIC_QUESTIONS[serviceSlug] || [];
  
  return questions.map(question => ({
    id: question.id,
    name: question.label,
    type: question.type,
    description: question.description,
    placeholder: question.placeholder,
    options: question.options?.map(opt => ({ value: opt, label: opt, priceMultiplier: 1 })),
    required: question.required
  }));
};
