import { ConversationState, ConversationStep, conversationSteps, clientTypeDetection, moodDetection, ClientProfile, ProjectDetails } from "./ConversationContext";
import { AdvancedPriceCalculator, PriceCalculation } from "./PriceCalculator";
import { MasterKnowledgeBase } from "./MasterKnowledgeBase";
import { IntelligentNavigator } from "./IntelligentNavigator";
import { ExpertTextKnowledge } from "./ExpertTextKnowledge";

export interface ConversationResponse {
  text: string;
  recommendations?: string[];
  priceCalculation?: PriceCalculation;
  quickLinks?: Array<{ title: string; url: string; description: string }>;
  newState: ConversationState;
}

export class ConversationEngine {
  static addThinkingDelay(complexity: 'simple' | 'medium' | 'complex' = 'medium'): number {
    const delays = {
      simple: 800 + Math.random() * 500,
      medium: 1500 + Math.random() * 1000,
      complex: 2500 + Math.random() * 1500
    };
    return delays[complexity];
  }

  static getResponseStyle(clientType: ClientProfile['type'], mood: ConversationState['mood']) {
    if (clientType === 'бизнес') {
      return 'professional';
    }
    if (mood === 'excited' || mood === 'interested') {
      return 'enthusiastic';
    }
    if (mood === 'concerned') {
      return 'empathetic';
    }
    return 'friendly';
  }

  static generatePersonalizedResponse(userMessage: string, state: ConversationState): ConversationResponse {
    const lowerMessage = userMessage.toLowerCase();
    const newState = { ...state };
    
    // Обновляем контекст беседы
    newState.context.push(userMessage);
    if (newState.context.length > 10) {
      newState.context = newState.context.slice(-10);
    }

    // Определяем тип клиента и настроение
    if (newState.clientProfile.type === 'неопределен') {
      newState.clientProfile.type = clientTypeDetection(userMessage);
    }
    newState.mood = moodDetection(userMessage);

    // Генерируем быстрые ссылки на основе контекста
    const quickLinks = IntelligentNavigator.generateQuickLinks(userMessage, newState.context);

    // Проверяем на вопросы о компании
    const companyInfo = MasterKnowledgeBase.getCompanyInfo(userMessage);
    if (companyInfo) {
      return {
        text: companyInfo,
        quickLinks: IntelligentNavigator.generateClosingLinks("company"),
        newState
      };
    }

    // Обработка вопросов о ценах и расчетах
    if (lowerMessage.includes('рассчита') || lowerMessage.includes('стоимость') || lowerMessage.includes('цена') || lowerMessage.includes('сколько')) {
      return this.handlePriceCalculation(userMessage, newState);
    }

    // Обработка экспертных вопросов о копирайтинге
    if (this.isExpertQuestion(userMessage)) {
      return this.handleExpertQuestion(userMessage, newState);
    }

    // Поиск в мастер-базе знаний
    const expertResponse = MasterKnowledgeBase.generateExpertResponse(userMessage);
    if (expertResponse.answer) {
      return {
        text: expertResponse.answer,
        recommendations: expertResponse.recommendations,
        quickLinks: expertResponse.quickLinks,
        newState
      };
    }

    // Обработка многоэтапного диалога
    if (newState.currentStep) {
      return this.handleConversationStep(userMessage, newState);
    }

    // Если это первое сообщение, начинаем квалификацию
    if (state.context.length === 0) {
      newState.currentStep = 'welcome';
      return {
        text: this.generateWelcomeResponse(userMessage, newState),
        quickLinks,
        newState
      };
    }

    // Универсальный ответ с учетом контекста
    return {
      text: this.generateContextualResponse(userMessage, newState),
      recommendations: ["Консультация", "Расчет стоимости", "Портфолио"],
      quickLinks,
      newState
    };
  }

  private static isExpertQuestion(message: string): boolean {
    const expertKeywords = [
      'как писать', 'как создать', 'что такое', 'секреты', 'советы',
      'seo', 'лендинг', 'заголовок', 'структура', 'техника',
      'формула', 'метод', 'способ', 'прием', 'фишка'
    ];
    
    const lowerMessage = message.toLowerCase();
    return expertKeywords.some(keyword => lowerMessage.includes(keyword));
  }

  private static handleExpertQuestion(userMessage: string, state: ConversationState): ConversationResponse {
    const newState = { ...state };
    const lowerMessage = userMessage.toLowerCase();

    // Определяем тип вопроса и даем экспертный ответ
    let textType = 'общий';
    if (lowerMessage.includes('seo') || lowerMessage.includes('сео')) textType = 'seo';
    else if (lowerMessage.includes('лендинг') || lowerMessage.includes('продающ')) textType = 'лендинг';
    else if (lowerMessage.includes('email') || lowerMessage.includes('рассылк')) textType = 'email';
    else if (lowerMessage.includes('соцсет') || lowerMessage.includes('контент')) textType = 'соцсети';

    const expertAdvice = ExpertTextKnowledge.getWritingAdvice(textType);
    const quickLinks = IntelligentNavigator.generateQuickLinks(userMessage, newState.context);

    // Добавляем персональное предложение
    const personalOffer = this.generatePersonalOffer(newState.clientProfile.type, textType);

    return {
      text: expertAdvice + "\n\n" + personalOffer,
      quickLinks,
      recommendations: this.getExpertRecommendations(textType),
      newState
    };
  }

  private static generatePersonalOffer(clientType: string, textType: string): string {
    if (clientType === 'новичок') {
      return "🎁 **Специально для новичков:**\nБесплатная консультация + скидка 15% на первый заказ!\nПомогу составить техническое задание и выберем оптимальную стратегию для вашего проекта.";
    } else if (clientType === 'бизнес') {
      return "💼 **Для бизнес-клиентов:**\nПерсональный менеджер + корпоративные скидки до 25%\nКомплексная стратегия контент-маркетинга в подарок при заказе пакета услуг.";
    } else if (clientType === 'постоянный') {
      return "🤝 **Для постоянных клиентов:**\nПриоритетное выполнение заказов + скидка 20%\nИндивидуальные условия сотрудничества и персональные рекомендации.";
    } else {
      return "🚀 **Готовы применить эти знания на практике?**\nЗакажите профессиональный текст у экспертов CopyPro Cloud!\nГарантируем результат и делимся секретами мастерства.";
    }
  }

  private static getExpertRecommendations(textType: string): string[] {
    const recommendations: { [key: string]: string[] } = {
      'seo': ["SEO-статья", "Анализ конкурентов", "Семантическое ядро"],
      'лендинг': ["Продающий лендинг", "A/B тестирование", "Аналитика конверсий"],
      'email': ["Email-рассылка", "Автоворонки", "Сегментация базы"],
      'соцсети': ["Контент-план", "SMM-стратегия", "Вирусный контент"],
      'общий': ["Консультация эксперта", "Аудит текстов", "Контент-стратегия"]
    };

    return recommendations[textType] || recommendations['общий'];
  }

  private static handlePriceCalculation(userMessage: string, state: ConversationState): ConversationResponse {
    const newState = { ...state };
    
    // Извлекаем информацию о проекте из сообщения
    const projectDetails = this.extractProjectDetails(userMessage, state);
    newState.projectDetails = { ...newState.projectDetails, ...projectDetails };

    // Если недостаточно информации, задаем уточняющие вопросы
    if (!projectDetails.serviceType) {
      newState.currentStep = 'service_type';
      const quickLinks = [
        { title: "📝 SEO-статьи", url: "/service/seo-article", description: "Тексты для поисковых систем" },
        { title: "🚀 Лендинги", url: "/service/landing-page", description: "Продающие страницы" },
        { title: "📱 Контент для соцсетей", url: "/service/social-media-post", description: "Посты и сторис" },
        { title: "📧 Email-рассылки", url: "/service/email-campaign", description: "Письма для подписчиков" }
      ];

      return {
        text: "Отлично! Помогу рассчитать точную стоимость 💰\n\nДля персонального расчета нужно понять тип контента. Выберите из популярных услуг ниже или опишите своими словами:\n\n🔸 SEO-статьи для сайта\n🔸 Продающие лендинги\n🔸 Контент для соцсетей\n🔸 Email-рассылки\n🔸 Описания товаров\n🔸 Другое (опишите подробнее)\n\nИли нажмите на быструю ссылку ниже! 👇",
        quickLinks,
        newState
      };
    }

    // Рассчитываем стоимость
    const calculation = AdvancedPriceCalculator.calculateServicePrice(
      projectDetails.serviceType,
      newState.projectDetails,
      newState.clientProfile.type
    );

    newState.calculatedPrice = {
      base: calculation.basePrice,
      discounts: calculation.discounts.filter(d => d.applicable).map(d => ({ reason: d.name, amount: calculation.basePrice * d.percentage / 100 })),
      final: calculation.finalPrice,
      breakdown: calculation.components.map(c => ({ item: c.name, cost: c.basePrice }))
    };

    const responseText = this.generatePriceResponse(calculation, newState);
    const quickLinks = [
      { title: "🛒 Оформить заказ", url: "/order", description: "Быстрое оформление" },
      { title: "💬 Консультация", url: "tel:+79257338648", description: "Обсудить детали" },
      { title: "📋 Все услуги", url: "/", description: "Каталог услуг" }
    ];

    return {
      text: responseText,
      priceCalculation: calculation,
      quickLinks,
      newState
    };
  }

  private static extractProjectDetails(message: string, state: ConversationState): Partial<ProjectDetails> {
    const lower = message.toLowerCase();
    const details: Partial<ProjectDetails> = {};

    // Определение типа услуги
    if (lower.includes('статья') || lower.includes('сео') || lower.includes('seo')) {
      details.serviceType = 'SEO-статья';
    } else if (lower.includes('лендинг') || lower.includes('посадочная')) {
      details.serviceType = 'Лендинг';
    } else if (lower.includes('соцсети') || lower.includes('instagram') || lower.includes('вконтакте')) {
      details.serviceType = 'Контент для соцсетей';
    } else if (lower.includes('товар') || lower.includes('описание') || lower.includes('wildberries') || lower.includes('ozon')) {
      details.serviceType = 'Описание товаров';
    }

    // Определение объема
    const volumeMatch = lower.match(/(\d+)\s*(статей|статьи|статью|штук|шт|описаний)/);
    if (volumeMatch) {
      details.volume = parseInt(volumeMatch[1]);
    }

    // Определение сложности
    if (lower.includes('сложн') || lower.includes('техническ') || lower.includes('специализированн')) {
      details.complexity = 'сложная';
    } else if (lower.includes('обычн') || lower.includes('стандарт')) {
      details.complexity = 'средняя';
    } else if (lower.includes('прост') || lower.includes('базов')) {
      details.complexity = 'простая';
    }

    // Определение срочности
    if (lower.includes('срочно') || lower.includes('быстро') || lower.includes('завтра') || lower.includes('сегодня')) {
      details.deadline = lower.includes('сегодня') ? 'сегодня' : lower.includes('завтра') ? 'завтра' : 'срочно';
    }

    return details;
  }

  private static generatePriceResponse(calculation: PriceCalculation, state: ConversationState): string {
    let response = "";

    // Персонализированное вступление
    if (state.clientProfile.type === 'новичок') {
      response += "Отлично! Для начинающих клиентов подготовил оптимальный расчет 😊\n\n";
    } else if (state.clientProfile.type === 'бизнес') {
      response += "Прекрасно! Для корпоративного клиента составил детальный расчет с максимальными возможностями оптимизации 💼\n\n";
    } else if (state.clientProfile.type === 'постоянный') {
      response += "Как приятно снова работать с вами! Конечно, для постоянного клиента у меня есть особые условия 🤝\n\n";
    } else {
      response += "Рассчитал стоимость специально для вашего проекта! 💰\n\n";
    }

    response += calculation.breakdown + "\n\n";
    response += calculation.timeline + "\n\n";

    if (calculation.recommendations.length > 0) {
      response += "🎯 Мои персональные рекомендации:\n";
      calculation.recommendations.forEach(rec => {
        response += `${rec}\n`;
      });
      response += "\n";
    }

    // Призыв к действию в зависимости от типа клиента
    if (state.mood === 'concerned') {
      response += "Понимаю ваши опасения по цене. Давайте обсудим, как можно оптимизировать проект под ваш бюджет? 🤔";
    } else if (state.mood === 'impatient') {
      response += "Готов приступить к работе немедленно! Хотите оформить заказ? ⚡";
    } else {
      response += "Что скажете? Готовы начать работу над проектом? Или есть вопросы по расчету? 😊";
    }

    return response;
  }

  private static generateWelcomeResponse(userMessage: string, state: ConversationState): string {
    const clientType = state.clientProfile.type;
    
    if (clientType === 'новичок') {
      return "Понял, вы только начинаете знакомиться с копирайтингом! 🌱\n\nЭто замечательно - я очень люблю работать с новыми клиентами и помогать им достичь первых успехов. Расскажите, какая цель у вашего проекта? Хотите увеличить продажи, привлечь трафик или что-то еще?";
    } else if (clientType === 'бизнес') {
      return "Отлично! Вижу, что мы имеем дело с серьезным бизнес-проектом 💼\n\nДля корпоративных клиентов у меня особый подход - полный анализ, детальная стратегия и максимальный результат. Расскажите подробнее о вашей компании и целях проекта.";
    } else if (clientType === 'постоянный') {
      return "Как приятно снова с вами работать! 🤝\n\nВы уже знаете качество наших услуг, поэтому давайте сразу перейдем к вашему новому проекту. Что на этот раз нужно реализовать?";
    } else {
      return "Спасибо, что поделились! 😊\n\nЧтобы подобрать идеальное решение, расскажите немного больше:\n• Какая у вас сфера деятельности?\n• Какие цели хотите достичь?\n• Есть ли опыт работы с копирайтерами?";
    }
  }

  private static generateContextualResponse(userMessage: string, state: ConversationState): string {
    const hasContext = state.context.length > 1;
    
    if (hasContext) {
      return `Основываясь на нашем разговоре, вижу что вас интересует качественный контент. \n\nДля получения персональной консультации и точного расчета рекомендую связаться напрямую:\n\n📞 +7 (925) 733-86-48\n📧 optteem@mail.ru\n💬 Telegram @Koopeerayter\n\nОтвечу в течение 15 минут и помогу подобрать оптимальное решение! 😊`;
    }

    return "Спасибо за ваш вопрос! Для получения детальной консультации свяжитесь с нами:\n\n📞 +7 (925) 733-86-48\n📧 optteem@mail.ru\n💬 Telegram @Koopeerayter\n\nМы ответим в течение 15 минут и предоставим персональную консультацию! 🚀";
  }

  private static handleConversationStep(userMessage: string, state: ConversationState): ConversationResponse {
    // Реализация многоэтапного диалога
    const newState = { ...state };
    // Логика обработки шагов диалога будет здесь
    return {
      text: "Продолжаем диалог...",
      newState
    };
  }
}
