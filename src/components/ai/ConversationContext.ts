
export interface ConversationStep {
  id: string;
  type: 'question' | 'info_gathering' | 'calculation' | 'recommendation';
  question: string;
  options?: string[];
  validators?: ((answer: string) => boolean)[];
  nextStep?: string | ((answer: string) => string);
}

export interface ClientProfile {
  type: 'новичок' | 'бизнес' | 'постоянный' | 'неопределен';
  industry?: string;
  budget?: { min: number; max: number };
  urgency?: 'обычная' | 'срочная' | 'экспресс';
  previousServices?: string[];
  communicationStyle: 'дружелюбный' | 'деловой' | 'консультативный';
}

export interface ProjectDetails {
  serviceType?: string;
  volume?: number;
  deadline?: string;
  complexity?: 'простая' | 'средняя' | 'сложная';
  additionalRequirements?: string[];
  targetAudience?: string;
  goals?: string[];
}

export interface ConversationState {
  currentStep?: string;
  clientProfile: ClientProfile;
  projectDetails: ProjectDetails;
  gatheredInfo: Record<string, any>;
  calculatedPrice?: {
    base: number;
    discounts: Array<{ reason: string; amount: number }>;
    final: number;
    breakdown: Array<{ item: string; cost: number }>;
  };
  context: string[];
  mood: 'neutral' | 'interested' | 'concerned' | 'excited' | 'impatient';
}

export const conversationSteps: Record<string, ConversationStep> = {
  welcome: {
    id: 'welcome',
    type: 'question',
    question: 'Расскажите немного о себе и вашем проекте. Это поможет мне подобрать оптимальное решение!',
    nextStep: 'service_type'
  },
  
  service_type: {
    id: 'service_type',
    type: 'question',
    question: 'Какой тип контента вам нужен?',
    options: [
      'SEO-статьи для сайта',
      'Продающий лендинг',
      'Контент для соцсетей',
      'Описания товаров',
      'Email-рассылки',
      'Другое'
    ],
    nextStep: (answer) => {
      if (answer.includes('статьи')) return 'seo_details';
      if (answer.includes('лендинг')) return 'landing_details';
      if (answer.includes('соцсети')) return 'social_details';
      if (answer.includes('товаров')) return 'product_details';
      if (answer.includes('email')) return 'email_details';
      return 'custom_details';
    }
  },

  seo_details: {
    id: 'seo_details',
    type: 'info_gathering',
    question: 'Отлично! SEO-статьи - это моя специализация 📝 Давайте уточним детали:\n\n• Сколько статей нужно?\n• Какой объем (количество знаков)?\n• Есть ли готовое семантическое ядро?\n• Какие сроки?',
    nextStep: 'calculate_seo_price'
  },

  landing_details: {
    id: 'landing_details',
    type: 'info_gathering',
    question: 'Продающий лендинг - отличный выбор для конверсии! 🚀 Расскажите:\n\n• Что продаете?\n• Кто целевая аудитория?\n• Есть ли референсы или примеры?\n• Нужна ли интеграция с формами?',
    nextStep: 'calculate_landing_price'
  },

  social_details: {
    id: 'social_details',
    type: 'info_gathering',
    question: 'Контент для соцсетей - моя любимая тема! 📱 Уточните:\n\n• Для каких платформ (ВК, Instagram, Telegram)?\n• Сколько постов в месяц?\n• Нужен ли контент-план?\n• Какая тематика?',
    nextStep: 'calculate_social_price'
  }
};

export const clientTypeDetection = (message: string): ClientProfile['type'] => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('впервые') || lowerMessage.includes('начинаю') || lowerMessage.includes('новичок')) {
    return 'новичок';
  }
  
  if (lowerMessage.includes('компания') || lowerMessage.includes('бизнес') || lowerMessage.includes('организация')) {
    return 'бизнес';
  }
  
  if (lowerMessage.includes('уже работали') || lowerMessage.includes('постоянный') || lowerMessage.includes('снова')) {
    return 'постоянный';
  }
  
  return 'неопределен';
};

export const moodDetection = (message: string): ConversationState['mood'] => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('срочно') || lowerMessage.includes('быстро') || lowerMessage.includes('вчера')) {
    return 'impatient';
  }
  
  if (lowerMessage.includes('отлично') || lowerMessage.includes('супер') || lowerMessage.includes('круто')) {
    return 'excited';
  }
  
  if (lowerMessage.includes('дорого') || lowerMessage.includes('дешевле') || lowerMessage.includes('бюджет ограничен')) {
    return 'concerned';
  }
  
  if (lowerMessage.includes('интересно') || lowerMessage.includes('подробнее') || lowerMessage.includes('расскажите')) {
    return 'interested';
  }
  
  return 'neutral';
};
