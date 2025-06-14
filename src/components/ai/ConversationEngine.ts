
import { ConversationState, ConversationStep, conversationSteps, clientTypeDetection, moodDetection, ClientProfile, ProjectDetails } from "./ConversationContext";
import { AdvancedPriceCalculator, PriceCalculation } from "./PriceCalculator";
import { enhancedKnowledgeBase, getServiceRecommendations } from "./enhancedKnowledgeBase";

export interface ConversationResponse {
  text: string;
  recommendations?: string[];
  priceCalculation?: PriceCalculation;
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

    // Проверяем, нужно ли перейти к расчету стоимости
    if (lowerMessage.includes('рассчита') || lowerMessage.includes('стоимость') || lowerMessage.includes('цена') || lowerMessage.includes('сколько')) {
      return this.handlePriceCalculation(userMessage, newState);
    }

    // Обработка многоэтапного диалога
    if (newState.currentStep) {
      return this.handleConversationStep(userMessage, newState);
    }

    // Поиск в базе знаний с персонализацией
    for (const [keywords, response] of Object.entries(enhancedKnowledgeBase)) {
      if (keywords.split(',').some(keyword => lowerMessage.includes(keyword.trim()))) {
        const personalizedResponse = this.personalizeResponse(response, newState);
        const recommendations = getServiceRecommendations(userMessage);
        
        return {
          text: personalizedResponse,
          recommendations: recommendations.length > 0 ? recommendations : undefined,
          newState
        };
      }
    }

    // Если это первое сообщение, начинаем квалификацию
    if (state.context.length === 0) {
      newState.currentStep = 'welcome';
      return {
        text: this.generateWelcomeResponse(userMessage, newState),
        newState
      };
    }

    // Универсальный ответ с учетом контекста
    return {
      text: this.generateContextualResponse(userMessage, newState),
      recommendations: ["Консультация", "Расчет стоимости", "Портфолио"],
      newState
    };
  }

  private static handlePriceCalculation(userMessage: string, state: ConversationState): ConversationResponse {
    const newState = { ...state };
    
    // Извлекаем информацию о проекте из сообщения
    const projectDetails = this.extractProjectDetails(userMessage, state);
    newState.projectDetails = { ...newState.projectDetails, ...projectDetails };

    // Если недостаточно информации, задаем уточняющие вопросы
    if (!projectDetails.serviceType) {
      newState.currentStep = 'service_type';
      return {
        text: "Отлично, давайте рассчитаем стоимость! 💰\n\nЧтобы дать точную цену, мне нужно понять, какой тип контента вам нужен. Выберите из списка ниже или опишите своими словами:",
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

    return {
      text: responseText,
      priceCalculation: calculation,
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
      response += "Отлично! Вижу, что вы делаете первые шаги в копирайтинге. Я специально рассчитал для вас оптимальный вариант 😊\n\n";
    } else if (state.clientProfile.type === 'бизнес') {
      response += "Прекрасно! Для корпоративного клиента я подготовил детальный расчет с максимальными возможностями оптимизации 💼\n\n";
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

  private static personalizeResponse(baseResponse: string, state: ConversationState): string {
    let response = baseResponse;

    // Добавляем персонализацию в зависимости от типа клиента
    if (state.clientProfile.type === 'новичок' && !response.includes('новичок')) {
      response += "\n\n💡 Кстати, для новых клиентов у нас скидка 10% на первый заказ!";
    } else if (state.clientProfile.type === 'постоянный') {
      response += "\n\n🎉 Как постоянному клиенту, предоставляю вам приоритетную поддержку и дополнительные скидки!";
    } else if (state.clientProfile.type === 'бизнес') {
      response += "\n\n💼 Для корпоративных клиентов у нас есть специальные пакеты и персональный менеджер.";
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
