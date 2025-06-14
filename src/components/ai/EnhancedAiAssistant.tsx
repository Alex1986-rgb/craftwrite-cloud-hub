
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User, MessageCircle, X, Minimize2, Maximize2, Calculator, FileText, Sparkles } from "lucide-react";
import { enhancedKnowledgeBase, getServiceRecommendations, calculateEstimate } from "./enhancedKnowledgeBase";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  recommendations?: string[];
  hasCalculator?: boolean;
}

interface QuickAction {
  label: string;
  message: string;
  icon: any;
}

const quickActions: QuickAction[] = [
  { label: "Услуги и цены", message: "Расскажите о ваших услугах и ценах", icon: FileText },
  { label: "Портфолио", message: "Покажите примеры ваших работ и результаты", icon: Sparkles },
  { label: "Процесс работы", message: "Как происходит процесс заказа и выполнения работ?", icon: MessageCircle },
  { label: "Калькулятор", message: "Рассчитайте стоимость моего проекта", icon: Calculator }
];

const EnhancedAiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Привет! Я Александр, ваш AI-помощник CopyPro Cloud. Я знаю все о наших услугах, ценах, кейсах и процессах. Могу рассчитать стоимость проекта и дать персональные рекомендации. Чем помочь?",
      isUser: false,
      timestamp: new Date(),
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

  const generateEnhancedResponse = (userMessage: string): { text: string; recommendations?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Поиск точного совпадения в базе знаний
    for (const [keywords, response] of Object.entries(enhancedKnowledgeBase)) {
      if (keywords.split(',').some(keyword => lowerMessage.includes(keyword.trim()))) {
        const recommendations = getServiceRecommendations(userMessage);
        return { 
          text: response, 
          recommendations: recommendations.length > 0 ? recommendations : undefined 
        };
      }
    }

    // Специальная обработка для расчета стоимости
    if (lowerMessage.includes('рассчита') || lowerMessage.includes('стоимость') || lowerMessage.includes('калькулятор')) {
      return {
        text: "Для расчета стоимости мне нужна информация о вашем проекте:\n\n1. Тип услуги (SEO-статья, лендинг, контент для соцсетей и т.д.)\n2. Объем работы\n3. Сроки выполнения\n4. Особые требования\n\nОпишите ваш проект, и я рассчитаю примерную стоимость!",
        recommendations: ["SEO-статьи", "Продающие тексты", "Контент для соцсетей"]
      };
    }

    // Обработка конкретных запросов на услуги
    const serviceTypes = ["seo", "статья", "лендинг", "email", "соцсети", "описание", "товар"];
    const foundService = serviceTypes.find(type => lowerMessage.includes(type));
    
    if (foundService) {
      const estimate = calculateEstimate(foundService, userMessage);
      return {
        text: estimate + "\n\nХотите оформить заказ или нужна дополнительная консультация?",
        recommendations: getServiceRecommendations(userMessage)
      };
    }

    // Универсальный ответ с контактами
    return {
      text: "Спасибо за ваш вопрос! Для получения детальной консультации свяжитесь с нами:\n\n📞 +7 (925) 733-86-48\n📧 optteem@mail.ru\n💬 Telegram @Koopeerayter\n\nМы ответим в течение 15 минут и предоставим персональную консультацию по вашему проекту!",
      recommendations: ["Консультация", "Заказ услуги", "Портфолио"]
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

    setTimeout(() => {
      const { text, recommendations } = generateEnhancedResponse(textToSend);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text,
        isUser: false,
        timestamp: new Date(),
        recommendations,
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
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
        isMinimized ? 'w-80 h-16' : 'w-96 h-[650px]'
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
                Эксперт CopyPro
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
            <div className="flex-1 p-4 overflow-y-auto h-[440px] space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start gap-3 max-w-[85%] ${message.isUser ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.isUser 
                          ? 'bg-blue-500' 
                          : 'bg-gradient-to-r from-purple-500 to-blue-600'
                      }`}>
                        {message.isUser ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`rounded-2xl p-3 ${
                        message.isUser
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.isUser ? 'text-blue-100' : 'text-slate-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
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
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-slate-100 rounded-2xl p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-3xl">
              <div className="flex items-center gap-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Спросите о наших услугах, ценах, кейсах..."
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

export default EnhancedAiAssistant;
