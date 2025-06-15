
import { SmartFilter } from '@/types/advancedOrder';

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
