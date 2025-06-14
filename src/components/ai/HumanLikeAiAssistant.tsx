
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bot, X, Minimize2, Maximize2 } from "lucide-react";
import { ConversationState } from "./ConversationContext";
import { ConversationEngine } from "./ConversationEngine";
import { MessageDisplay, Message } from "./MessageDisplay";
import { ChatInput } from "./ChatInput";
import { QuickActions } from "./QuickActions";

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
  
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
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
    const isComplexQuery = messageText.toLowerCase().includes('рассчита') || 
                          messageText.toLowerCase().includes('стоимость') ||
                          messageText.toLowerCase().includes('как написать') ||
                          messageText.toLowerCase().includes('секреты') ||
                          messageText.split(' ').length > 10;
    
    const delay = ConversationEngine.addThinkingDelay(isComplexQuery ? 'complex' : 'medium');

    setTimeout(() => {
      const { text, recommendations, priceCalculation, quickLinks, newState } = ConversationEngine.generatePersonalizedResponse(messageText, conversationState);
      
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
        quickLinks,
        mood: ConversationEngine.getResponseStyle(newState.clientProfile.type, newState.mood) as any
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, delay);
  };

  const handleRecommendationClick = (recommendation: string) => {
    handleSendMessage(recommendation);
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
            <QuickActions onActionClick={handleSendMessage} />

            {/* Messages */}
            <MessageDisplay 
              messages={messages} 
              onRecommendationClick={handleRecommendationClick} 
            />
            <div ref={messagesEndRef} />

            {/* Input */}
            <ChatInput onSendMessage={handleSendMessage} isTyping={isTyping} />
          </>
        )}
      </div>
    </div>
  );
};

export default HumanLikeAiAssistant;
