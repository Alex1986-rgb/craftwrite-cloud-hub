// Sample data for CopyPro Cloud dashboards
export interface SampleOrder {
  id: string;
  service_name: string;
  service_slug: string;
  contact_name: string;
  contact_email: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  estimated_price: number;
  final_price?: number;
  quality_rating?: number;
  details: string;
  deadline?: string;
  priority: 'low' | 'medium' | 'high';
  assigned_manager?: string;
}

export interface SampleClient {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  total_orders: number;
  total_spent: number;
  registration_date: string;
  last_order_date?: string;
  status: 'active' | 'inactive' | 'vip';
}

export interface SamplePortfolio {
  id: string;
  title: string;
  service_type: string;
  description: string;
  client_name: string;
  results: {
    before: string;
    after: string;
    improvement: string;
  };
  metrics: {
    conversion_increase?: string;
    traffic_increase?: string;
    roi?: string;
    delivery_time?: string;
  };
  tags: string[];
  image_url?: string;
}

export interface SamplePayment {
  id: string;
  order_id: string;
  amount: number;
  payment_status: 'pending' | 'completed' | 'failed';
  payment_method: string;
  created_at: string;
  completed_at?: string;
}

export interface SampleChat {
  id: string;
  order_id: string;
  client_name: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  status: 'active' | 'resolved';
}

export interface SampleAnalytics {
  daily_revenue: number;
  monthly_revenue: number;
  total_orders: number;
  completed_orders: number;
  conversion_rate: number;
  avg_order_value: number;
  client_satisfaction: number;
  popular_services: { name: string; count: number }[];
}

// Sample Orders Data
export const sampleOrders: SampleOrder[] = [
  {
    id: 'ORD-2024-001',
    service_name: 'SEO-статья "Как выбрать CRM-систему"',
    service_slug: 'seo-article',
    contact_name: 'Алексей Петров',
    contact_email: 'a.petrov@techcorp.ru',
    status: 'completed',
    created_at: '2024-07-01T10:00:00Z',
    estimated_price: 8000,
    final_price: 8000,
    quality_rating: 5,
    details: 'SEO-статья 4000 символов про выбор CRM для малого бизнеса. Ключевые слова: "выбрать CRM", "CRM система", "программа для бизнеса"',
    deadline: '2024-07-03',
    priority: 'medium',
    assigned_manager: 'Марина Соколова'
  },
  {
    id: 'ORD-2024-002',
    service_name: 'Продающий лендинг для IT-курсов',
    service_slug: 'landing-page',
    contact_name: 'Ирина Волкова',
    contact_email: 'i.volkova@edutech.ru',
    status: 'in_progress',
    created_at: '2024-07-02T14:30:00Z',
    estimated_price: 25000,
    details: 'Лендинг для онлайн-курсов по программированию. Целевая аудитория: начинающие разработчики 20-35 лет. Акцент на практике и трудоустройстве.',
    deadline: '2024-07-10',
    priority: 'high',
    assigned_manager: 'Дмитрий Козлов'
  },
  {
    id: 'ORD-2024-003',
    service_name: 'Контент для Telegram-канала фитнес-клуба',
    service_slug: 'telegram-content',
    contact_name: 'Сергей Фитнесов',
    contact_email: 's.fitness@sportclub.ru',
    status: 'in_progress',
    created_at: '2024-07-03T09:15:00Z',
    estimated_price: 12000,
    details: '30 постов для Telegram-канала фитнес-клуба. Темы: мотивация, упражнения, питание, акции клуба.',
    deadline: '2024-07-08',
    priority: 'medium',
    assigned_manager: 'Анна Спортивная'
  },
  {
    id: 'ORD-2024-004',
    service_name: 'Описания товаров для интернет-магазина',
    service_slug: 'product-descriptions',
    contact_name: 'Елена Торговец',
    contact_email: 'e.torgovets@shopru.com',
    status: 'pending',
    created_at: '2024-07-04T16:20:00Z',
    estimated_price: 15000,
    details: '50 описаний товаров для интернет-магазина электроники. Каждое описание 300-500 символов с SEO-оптимизацией.',
    deadline: '2024-07-12',
    priority: 'low'
  },
  {
    id: 'ORD-2024-005',
    service_name: 'Email-рассылка для B2B сферы',
    service_slug: 'email-marketing',
    contact_name: 'Михаил Бизнесов',
    contact_email: 'm.biznesov@b2bcompany.ru',
    status: 'completed',
    created_at: '2024-06-28T11:45:00Z',
    estimated_price: 18000,
    final_price: 18000,
    quality_rating: 4,
    details: 'Серия из 5 писем для холодной рассылки B2B клиентам. Цель: презентация новой CRM-системы.',
    deadline: '2024-07-02',
    priority: 'high',
    assigned_manager: 'Ольга Менеджерская'
  }
];

// Sample Clients Data
export const sampleClients: SampleClient[] = [
  {
    id: 'CLIENT-001',
    name: 'Алексей Петров',
    email: 'a.petrov@techcorp.ru',
    company: 'ООО "ТехКорп"',
    phone: '+7 (495) 123-45-67',
    total_orders: 8,
    total_spent: 64000,
    registration_date: '2024-03-15',
    last_order_date: '2024-07-01',
    status: 'vip'
  },
  {
    id: 'CLIENT-002',
    name: 'Ирина Волкова',
    email: 'i.volkova@edutech.ru',
    company: 'ЭдуТех Академия',
    phone: '+7 (812) 987-65-43',
    total_orders: 3,
    total_spent: 45000,
    registration_date: '2024-05-20',
    last_order_date: '2024-07-02',
    status: 'active'
  },
  {
    id: 'CLIENT-003',
    name: 'Сергей Фитнесов',
    email: 's.fitness@sportclub.ru',
    company: 'Спорт Клуб "Энергия"',
    phone: '+7 (903) 456-78-90',
    total_orders: 2,
    total_spent: 24000,
    registration_date: '2024-06-10',
    last_order_date: '2024-07-03',
    status: 'active'
  },
  {
    id: 'CLIENT-004',
    name: 'Елена Торговец',
    email: 'e.torgovets@shopru.com',
    company: 'ИП Торговец Е.А.',
    total_orders: 1,
    total_spent: 15000,
    registration_date: '2024-07-04',
    status: 'active'
  },
  {
    id: 'CLIENT-005',
    name: 'Михаил Бизнесов',
    email: 'm.biznesov@b2bcompany.ru',
    company: 'B2B Solutions Ltd',
    phone: '+7 (495) 321-54-76',
    total_orders: 5,
    total_spent: 90000,
    registration_date: '2024-02-12',
    last_order_date: '2024-06-28',
    status: 'vip'
  }
];

// Sample Portfolio Data
export const samplePortfolio: SamplePortfolio[] = [
  {
    id: 'PORT-001',
    title: 'Лендинг для IT-курсов: рост конверсии на 180%',
    service_type: 'Продающий лендинг',
    description: 'Создали продающий лендинг для онлайн-школы программирования',
    client_name: 'CodeAcademy Pro',
    results: {
      before: 'Конверсия 1.2%, мало заявок',
      after: 'Конверсия 3.4%, рост заявок в 3 раза',
      improvement: 'Увеличение конверсии на 180%'
    },
    metrics: {
      conversion_increase: '180%',
      roi: '320%',
      delivery_time: '7 дней'
    },
    tags: ['Лендинг', 'IT-образование', 'Конверсия'],
    image_url: '/portfolio/landing-it-courses.jpg'
  },
  {
    id: 'PORT-002',
    title: 'SEO-статьи для строительной компании',
    service_type: 'SEO-копирайтинг',
    description: 'Серия из 20 SEO-статей про ремонт и строительство',
    client_name: 'СтройГрад',
    results: {
      before: 'Сайт на 3-4 странице Google',
      after: 'ТОП-3 по 15 ключевым запросам',
      improvement: 'Рост органического трафика на 240%'
    },
    metrics: {
      traffic_increase: '240%',
      delivery_time: '14 дней'
    },
    tags: ['SEO', 'Строительство', 'Трафик'],
    image_url: '/portfolio/seo-construction.jpg'
  },
  {
    id: 'PORT-003',
    title: 'Email-кампания для B2B продаж',
    service_type: 'Email-маркетинг',
    description: 'Холодная рассылка для CRM-системы',
    client_name: 'BizCRM Solutions',
    results: {
      before: 'Open rate 12%, нет продаж',
      after: 'Open rate 34%, 8 новых клиентов',
      improvement: 'ROI кампании 450%'
    },
    metrics: {
      conversion_increase: '280%',
      roi: '450%',
      delivery_time: '5 дней'
    },
    tags: ['Email', 'B2B', 'CRM'],
    image_url: '/portfolio/email-b2b.jpg'
  }
];

// Sample Payments Data
export const samplePayments: SamplePayment[] = [
  {
    id: 'PAY-001',
    order_id: 'ORD-2024-001',
    amount: 8000,
    payment_status: 'completed',
    payment_method: 'Банковская карта',
    created_at: '2024-07-01T10:30:00Z',
    completed_at: '2024-07-01T10:32:00Z'
  },
  {
    id: 'PAY-002',
    order_id: 'ORD-2024-002',
    amount: 12500,
    payment_status: 'completed',
    payment_method: 'Банковский перевод',
    created_at: '2024-07-02T15:00:00Z',
    completed_at: '2024-07-02T15:05:00Z'
  },
  {
    id: 'PAY-003',
    order_id: 'ORD-2024-003',
    amount: 12000,
    payment_status: 'pending',
    payment_method: 'Банковская карта',
    created_at: '2024-07-03T09:45:00Z'
  },
  {
    id: 'PAY-004',
    order_id: 'ORD-2024-005',
    amount: 18000,
    payment_status: 'completed',
    payment_method: 'СБП',
    created_at: '2024-06-28T12:00:00Z',
    completed_at: '2024-06-28T12:02:00Z'
  }
];

// Sample Chat Data
export const sampleChats: SampleChat[] = [
  {
    id: 'CHAT-001',
    order_id: 'ORD-2024-002',
    client_name: 'Ирина Волкова',
    last_message: 'Спасибо за промежуточную версию! Есть пару правок по блоку "Преподаватели"',
    last_message_time: '2024-07-04T14:30:00Z',
    unread_count: 2,
    status: 'active'
  },
  {
    id: 'CHAT-002',
    order_id: 'ORD-2024-003',
    client_name: 'Сергей Фитнесов',
    last_message: 'Добавьте, пожалуйста, больше мотивирующих постов для утренних тренировок',
    last_message_time: '2024-07-04T11:20:00Z',
    unread_count: 1,
    status: 'active'
  },
  {
    id: 'CHAT-003',
    order_id: 'ORD-2024-001',
    client_name: 'Алексей Петров',
    last_message: 'Отлично! Статья полностью соответствует ТЗ. Спасибо за работу!',
    last_message_time: '2024-07-03T16:45:00Z',
    unread_count: 0,
    status: 'resolved'
  }
];

// Sample Analytics Data
export const sampleAnalytics: SampleAnalytics = {
  daily_revenue: 15400,
  monthly_revenue: 340000,
  total_orders: 127,
  completed_orders: 98,
  conversion_rate: 24.5,
  avg_order_value: 16800,
  client_satisfaction: 4.7,
  popular_services: [
    { name: 'SEO-статьи', count: 45 },
    { name: 'Лендинги', count: 23 },
    { name: 'Контент для соцсетей', count: 32 },
    { name: 'Email-рассылки', count: 18 },
    { name: 'Описания товаров', count: 9 }
  ]
};

// Activity Feed Data
export const sampleActivity = [
  {
    id: 'ACT-001',
    type: 'order_completed',
    title: 'Заказ #ORD-2024-001 завершен',
    description: 'SEO-статья для ТехКорп',
    timestamp: '2024-07-04T15:30:00Z',
    icon: 'check-circle',
    color: 'green'
  },
  {
    id: 'ACT-002',
    type: 'new_order',
    title: 'Новый заказ от ИП Торговец',
    description: 'Описания товаров для интернет-магазина',
    timestamp: '2024-07-04T16:20:00Z',
    icon: 'plus',
    color: 'blue'
  },
  {
    id: 'ACT-003',
    type: 'payment_received',
    title: 'Получен платеж 12,500₽',
    description: 'Оплата за лендинг IT-курсов',
    timestamp: '2024-07-02T15:05:00Z',
    icon: 'dollar-sign',
    color: 'green'
  },
  {
    id: 'ACT-004',
    type: 'client_message',
    title: 'Новое сообщение от клиента',
    description: 'Ирина Волкова: правки по лендингу',
    timestamp: '2024-07-04T14:30:00Z',
    icon: 'message-circle',
    color: 'orange'
  },
  {
    id: 'ACT-005',
    type: 'deadline_approaching',
    title: 'Приближается дедлайн',
    description: 'Telegram-контент до 8 июля',
    timestamp: '2024-07-04T08:00:00Z',
    icon: 'clock',
    color: 'yellow'
  }
];

// Notification Data
export const sampleNotifications = [
  {
    id: 'NOT-001',
    title: 'Новый заказ требует внимания',
    message: 'Заказ #ORD-2024-004 ожидает назначения менеджера',
    type: 'warning',
    timestamp: '2024-07-04T16:25:00Z',
    read: false
  },
  {
    id: 'NOT-002',
    title: 'Платеж получен',
    message: 'Клиент ТехКорп оплатил заказ на 8,000₽',
    type: 'success',
    timestamp: '2024-07-01T10:32:00Z',
    read: true
  },
  {
    id: 'NOT-003',
    title: 'Отзыв от клиента',
    message: 'Алексей Петров оставил 5-звездочный отзыв',
    type: 'info',
    timestamp: '2024-07-03T17:00:00Z',
    read: true
  }
];