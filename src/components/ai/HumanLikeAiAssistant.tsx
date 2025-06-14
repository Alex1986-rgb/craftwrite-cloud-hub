
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User, MessageCircle, X, Minimize2, Maximize2, Calculator, FileText, Sparkles, Clock } from "lucide-react";
import { ConversationState, ConversationStep, conversationSteps, clientTypeDetection, moodDetection, ClientProfile, ProjectDetails } from "./ConversationContext";
import { AdvancedPriceCalculator, PriceCalculation } from "./PriceCalculator";
import { enhancedKnowledgeBase, getServiceRecommendations } from "./enhancedKnowledgeBase";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  recommendations?: string[];
  priceCalculation?: PriceCalculation;
  isThinking?: boolean;
  mood?: 'friendly' | 'professional' | 'enthusiastic' | 'empathetic';
}

interface QuickAction {
  label: string;
  message: string;
  icon: any;
}

const quickActions: QuickAction[] = [
  { label: "Рассчитать стоимость", message: "Рассчитайте стоимость моего проекта", icon: Calculator },
  { label: "Узнать о услугах", message: "Расскажите подробно о ваших услугах", icon: FileText },
  { label: "Посмотреть портфолио", message: "Покажите примеры ваших работ", icon: Sparkles },
  { label: "Процесс работы", message: "Как вы работаете с клиентами?", icon: MessageCircle }
];

const HumanLikeAiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [conversationState, setConversationState] = useState<ConversationState>({
    clientProfile: {
      type: 'неопределен',
      communicationStyle: 'дружелюбный'
    },
    projectDetails: {},
    gatheredInfo: {},
    context: [],
    mood: 'neutral'
  });
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Привет! Меня зовут Александр, я ведущий эксперт CopyPro Cloud 👋\n\nИ знаете что? Я не просто расскажу вам о наших услугах - я лично подберу идеальное решение для вашего проекта и рассчитаю точную стоимость с учетом всех ваших потребностей.\n\nДавайте знакомиться! Расскажите о себе и вашем проекте 😊",
      isUser: false,
      timestamp: new Date(),
      mood: 'friendly'
    },
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponseStyle = (clientType: ClientProfile['type'], mood: ConversationState['mood']) => {
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
  };

  const addThinkingDelay = (complexity: 'simple' | 'medium' | 'complex' = 'medium'): number => {
    const delays = {
      simple: 800 + Math.random() * 500,
      medium: 1500 + Math.random() * 1000,
      complex: 2500 + Math.random() * 1500
    };
    return delays[complexity];
  };

  const generatePersonalizedResponse = (userMessage: string, state: ConversationState): { text: string; recommendations?: string[]; priceCalculation?: PriceCalculation; newState: ConversationState } => {
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
      return handlePriceCalculation(userMessage, newState);
    }

    // Обработка многоэтапного диалога
    if (newState.currentStep) {
      return handleConversationStep(userMessage, newState);
    }

    // Поиск в базе знаний с персонализацией
    for (const [keywords, response] of Object.entries(enhancedKnowledgeBase)) {
      if (keywords.split(',').some(keyword => lowerMessage.includes(keyword.trim()))) {
        const personalizedResponse = personalizeResponse(response, newState);
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
        text: generateWelcomeResponse(userMessage, newState),
        newState
      };
    }

    // Универсальный ответ с учетом контекста
    return {
      text: generateContextualResponse(userMessage, newState),
      recommendations: ["Консультация", "Расчет стоимости", "Портфолио"],
      newState
    };
  };

  const handlePriceCalculation = (userMessage: string, state: ConversationState): { text: string; priceCalculation?: PriceCalculation; newState: ConversationState } => {
    const newState = { ...state };
    
    // Извлекаем информацию о проекте из сообщения
    const projectDetails = extractProjectDetails(userMessage, state);
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

    const responseText = generatePriceResponse(calculation, newState);

    return {
      text: responseText,
      priceCalculation: calculation,
      newState
    };
  };

  const extractProjectDetails = (message: string, state: ConversationState): Partial<ProjectDetails> => {
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
  };

  const generatePriceResponse = (calculation: PriceCalculation, state: ConversationState): string => {
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
  };

  const personalizeResponse = (baseResponse: string, state: ConversationState): string => {
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
  };

  const generateWelcomeResponse = (userMessage: string, state: ConversationState): string => {
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
  };

  const generateContextualResponse = (userMessage: string, state: ConversationState): string => {
    const hasContext = state.context.length > 1;
    
    if (hasContext) {
      return `Основываясь на нашем разговоре, вижу что вас интересует качественный контент. \n\nДля получения персональной консультации и точного расчета рекомендую связаться напрямую:\n\n📞 +7 (925) 733-86-48\n📧 optteem@mail.ru\n💬 Telegram @Koopeerayter\n\nОтвечу в течение 15 минут и помогу подобрать оптимальное решение! 😊`;
    }

    return "Спасибо за ваш вопрос! Для получения детальной консультации свяжитесь с нами:\n\n📞 +7 (925) 733-86-48\n📧 optteem@mail.ru\n💬 Telegram @Koopeerayter\n\nМы ответим в течение 15 минут и предоставим персональную консультацию! 🚀";
  };

  const handleConversationStep = (userMessage: string, state: ConversationState): { text: string; recommendations?: string[]; newState: ConversationState } => {
    // Реализация многоэтапного диалога
    const newState = { ...state };
    // Логика обработки шагов диалога будет здесь
    return {
      text: "Продолжаем диалог...",
      newState
    };
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Показываем "думает"
    const thinkingMessage: Message = {
      id: (Date.now() + 0.5).toString(),
      text: "думаю...",
      isUser: false,
      timestamp: new Date(),
      isThinking: true
    };

    setMessages(prev => [...prev, thinkingMessage]);

    // Определяем сложность ответа для реалистичной задержки
    const isComplexQuery = textToSend.toLowerCase().includes('рассчита') || 
                          textToSend.toLowerCase().includes('стоимость') ||
                          textToSend.split(' ').length > 10;
    
    const delay = addThinkingDelay(isComplexQuery ? 'complex' : 'medium');

    setTimeout(() => {
      const { text, recommendations, priceCalculation, newState } = generatePersonalizedResponse(textToSend, conversationState);
      
      setConversationState(newState);
      
      // Убираем сообщение "думаю"
      setMessages(prev => prev.filter(msg => !msg.isThinking));

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text,
        isUser: false,
        timestamp: new Date(),
        recommendations,
        priceCalculation,
        mood: getResponseStyle(newState.clientProfile.type, newState.mood) as any
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, delay);
  };

  const handleQuickAction = (action: QuickAction) => {
    handleSendMessage(action.message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-400 hover:to-blue-500 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
        >
          <div className="relative">
            <Bot className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className={`bg-white rounded-3xl shadow-2xl border border-slate-200 transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[700px]'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-gradient-to-r from-purple-500 to-blue-600 rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold">Александр AI</h3>
              <p className="text-white/80 text-sm flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Ведущий эксперт
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white hover:bg-white/20 rounded-xl"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-xl"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Quick Actions */}
            <div className="p-3 border-b border-slate-100 bg-slate-50">
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    onClick={() => handleQuickAction(action)}
                    variant="outline"
                    size="sm"
                    className="text-xs h-8 bg-white hover:bg-blue-50 border-slate-200"
                  >
                    <action.icon className="w-3 h-3 mr-1" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto h-[490px] space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start gap-3 max-w-[85%] ${message.isUser ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.isUser 
                          ? 'bg-blue-500' 
                          : message.isThinking
                          ? 'bg-orange-500'
                          : 'bg-gradient-to-r from-purple-500 to-blue-600'
                      }`}>
                        {message.isUser ? (
                          <User className="w-4 h-4 text-white" />
                        ) : message.isThinking ? (
                          <Clock className="w-4 h-4 text-white animate-spin" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`rounded-2xl p-3 ${
                        message.isUser
                          ? 'bg-blue-500 text-white'
                          : message.isThinking
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                        {!message.isThinking && (
                          <p className={`text-xs mt-1 ${
                            message.isUser ? 'text-blue-100' : 'text-slate-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Price Calculation Display */}
                  {message.priceCalculation && !message.isUser && (
                    <div className="ml-11 p-3 bg-green-50 border border-green-200 rounded-xl">
                      <h4 className="font-semibold text-green-800 mb-2">💰 Расчет стоимости</h4>
                      <div className="text-sm text-green-700 space-y-1">
                        <p><strong>Базовая цена:</strong> {message.priceCalculation.basePrice}₽</p>
                        <p><strong>Итого:</strong> {message.priceCalculation.finalPrice}₽</p>
                        <p className="text-xs">{message.priceCalculation.timeline}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Recommendations */}
                  {message.recommendations && !message.isUser && (
                    <div className="ml-11 space-y-1">
                      <p className="text-xs text-slate-600 font-medium">Рекомендуемые услуги:</p>
                      <div className="flex flex-wrap gap-1">
                        {message.recommendations.map((rec, index) => (
                          <Button
                            key={index}
                            onClick={() => handleSendMessage(`Расскажите подробнее про ${rec}`)}
                            variant="outline"
                            size="sm"
                            className="text-xs h-6 px-2 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700"
                          >
                            {rec}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-3xl">
              <div className="flex items-center gap-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Опишите ваш проект или задайте вопрос..."
                  className="flex-1 rounded-xl border-slate-300 focus:border-blue-500"
                  disabled={isTyping}
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-400 hover:to-blue-500"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HumanLikeAiAssistant;
