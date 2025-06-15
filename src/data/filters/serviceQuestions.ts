
import { DynamicQuestion } from '@/types/advancedOrder';

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
