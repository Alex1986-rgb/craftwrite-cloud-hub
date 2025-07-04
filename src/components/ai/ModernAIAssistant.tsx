
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Send, 
  Sparkles, 
  Target, 
  TrendingUp, 
  MessageSquare, 
  Mic,
  MicOff,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useEnhancedAnalytics } from '@/hooks/useEnhancedAnalytics';
import { useSystemSettings } from '@/hooks/useSystemSettings';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { formatAIMessage } from '@/utils/aiMessageFormatter';
import { ErrorHandler } from '@/utils/errorHandler';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  category?: 'general' | 'copywriting' | 'seo' | 'marketing';
  helpful?: boolean;
}

interface ModernAIAssistantProps {
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

export default function ModernAIAssistant({ 
  isMinimized = false, 
  onToggleMinimize 
}: ModernAIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: `🙋‍♀️ Привет! Меня зовут **Анна Петрова**, я ваш персональный менеджер по копирайтингу в CopyPro Cloud.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

У меня 8 лет опыта работы с текстами. Готова помочь вам с:

🔹 **Копирайтингом** - создание продающих текстов
🔹 **SEO-оптимизацией** - вывод в ТОП поисковых систем  
🔹 **Контент-стратегией** - планирование и продвижение
🔹 **Аналитикой** - анализ эффективности контента

**Чем могу помочь прямо сейчас?** 🚀`,
      timestamp: new Date(),
      category: 'general'
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState<string>('general');
  const [conversationContext, setConversationContext] = useState<any>({});
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { trackEvent } = useEnhancedAnalytics();
  const { getSetting } = useSystemSettings();

  // AI Response Generator
  const generateLocalResponse = (content: string, capability: string): string => {
    const lowerContent = content.toLowerCase();
    
    // Ответы по категориям
    const responses: { [key: string]: { [key: string]: string } } = {
      general: {
        'привет': '👋 Привет! Как дела? Чем могу помочь с текстами?',
        'цена': '💰 Наши цены начинаются от 800₽ за SEO-статью. Хотите точный расчет?',
        'сроки': '⏰ Обычно выполняем за 3-5 дней. Есть экспресс-доставка за 24 часа!',
        'помощь': '🤝 Конечно помогу! Расскажите подробнее, что нужно?',
        'спасибо': '😊 Пожалуйста! Всегда рада помочь. Есть еще вопросы?'
      },
      copywriting: {
        'заголовок': '🎯 Продающий заголовок должен:\n• Обещать выгоду\n• Создавать любопытство\n• Быть конкретным\nПример: "Увеличьте продажи на 50% за 30 дней"',
        'aida': '📝 Формула AIDA:\n**A**ttention - привлечь внимание\n**I**nterest - заинтересовать\n**D**esire - создать желание\n**A**ction - призвать к действию',
        'призыв': '🚀 Сильные призывы к действию:\n• "Получите скидку 50% сегодня!"\n• "Закажите за 2 минуты"\n• "Узнайте секрет успеха"'
      },
      seo: {
        'ключевые': '🔍 Подбор ключевых слов:\n1. Анализ конкурентов\n2. Wordstat от Яндекса\n3. Google Keyword Planner\n4. Проверка частотности',
        'длина': '📏 Оптимальная длина SEO-статьи:\n• Информационные: 1500-3000 слов\n• Коммерческие: 800-1500 слов\n• Главное - полезность!',
        'топ': '🎯 Попадание в ТОП:\n• Качественный контент\n• Правильные ключи\n• Хорошая перелинковка\n• Регулярные обновления'
      },
      marketing: {
        'аудитория': '🎯 Определение ЦА:\n• Демография (возраст, пол)\n• Интересы и потребности\n• Боли и проблемы\n• Каналы общения',
        'воронка': '⚡ Воронка продаж:\n1. Привлечение внимания\n2. Интерес к продукту\n3. Желание купить\n4. Покупка\n5. Повторные продажи',
        'конкуренты': '🔍 Анализ конкурентов:\n• Изучите их сайты\n• Проанализируйте цены\n• Посмотрите отзывы\n• Найдите слабые места'
      }
    };

    // Поиск подходящего ответа
    const categoryResponses = responses[capability] || responses.general;
    
    for (const keyword in categoryResponses) {
      if (lowerContent.includes(keyword)) {
        return categoryResponses[keyword];
      }
    }

    // Дефолтные ответы по категориям
    const defaultResponses: { [key: string]: string } = {
      general: '🤔 Интересный вопрос! Могу помочь с копирайтингом, SEO или маркетингом. Что конкретно вас интересует?',
      copywriting: '✍️ Отличный вопрос про тексты! Расскажите подробнее - какой тип контента вас интересует?',
      seo: '🔍 По SEO могу дать много полезного! Уточните, пожалуйста, что именно хотите узнать?',
      marketing: '📊 В маркетинге много нюансов! Расскажите про ваш бизнес - помогу составить стратегию.'
    };

    return defaultResponses[capability] || defaultResponses.general;
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
      category: selectedCapability as any
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Track user interaction
    trackEvent({
      action: 'personal_manager_message',
      category: 'Personal Manager',
      label: selectedCapability,
      custom_parameters: {
        message_length: content.length,
        capability: selectedCapability
      }
    });

    try {
      // Simulate AI response for now (fallback to local responses)
      const response = generateLocalResponse(content, selectedCapability);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date(),
        category: selectedCapability as any
      };

      setMessages(prev => [...prev, assistantMessage]);
      setConversationContext({ lastTopic: selectedCapability });

      // Text-to-speech if enabled
      if (getSetting('ai_tts_enabled', false)) {
        speakText(response);
      }

    } catch (error) {
      ErrorHandler.handle(error, { context: 'AI_Assistant', selectedCapability });
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Извините, произошла ошибка связи. Попробуйте еще раз.',
        timestamp: new Date(),
        category: 'general'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ru-RU';
      utterance.rate = 0.8;
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'ru-RU';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
      };

      recognition.onerror = (event: any) => {
        ErrorHandler.handle(new Error('Speech recognition error'), { event });
        setIsListening(false);
      };

      recognition.start();
    } else {
      toast.error('Распознавание речи не поддерживается');
    }
  };

  const markAsHelpful = (messageId: string, helpful: boolean) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, helpful } 
          : msg
      )
    );

    trackEvent({
      action: 'manager_feedback',
      category: 'Personal Manager',
      label: helpful ? 'helpful' : 'not_helpful',
      custom_parameters: { message_id: messageId }
    });
  };

  const getQuickSuggestions = () => {
    const suggestions: { [key: string]: string[] } = {
      general: [
        'Как создать продающий заголовок?',
        'Покажи структуру хорошей статьи',
        'Расскажи о трендах в копирайтинге'
      ],
      copywriting: [
        'Покажи формулу AIDA на примере',
        'Как усилить призыв к действию?',
        'Психологические триггеры для текстов'
      ],
      seo: [
        'Как подобрать ключевые слова?',
        'Оптимальная длина SEO-статьи',
        'Как повысить позиции в поиске?'
      ],
      marketing: [
        'Как определить целевую аудиторию?',
        'Построение воронки продаж',
        'Анализ конкурентов в нише'
      ]
    };

    return suggestions[selectedCapability] || suggestions.general;
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={onToggleMinimize}
          className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg relative"
        >
          <User className="w-6 h-6 text-white" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] z-50">
      <Card className="shadow-2xl border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <CardTitle className="text-lg">Анна Петрова</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs bg-white/20 text-white">
                    Персональный менеджер
                  </Badge>
                  <Badge variant="secondary" className="text-xs bg-green-400/20 text-white">
                    Онлайн
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsSpeaking(!isSpeaking)}
                className="text-white hover:bg-white/20"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onToggleMinimize}
                className="text-white hover:bg-white/20"
              >
                _
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs value={selectedCapability} onValueChange={setSelectedCapability} className="w-full">
            <TabsList className="grid w-full grid-cols-4 rounded-none border-b">
              <TabsTrigger value="general" className="text-xs">
                <MessageSquare className="w-3 h-3 mr-1" />
                Общие
              </TabsTrigger>
              <TabsTrigger value="copywriting" className="text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                Тексты
              </TabsTrigger>
              <TabsTrigger value="seo" className="text-xs">
                <Target className="w-3 h-3 mr-1" />
                SEO
              </TabsTrigger>
              <TabsTrigger value="marketing" className="text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                Маркетинг
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCapability} className="mt-0">
              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100'} rounded-lg p-3`}>
                      {message.type === 'user' ? (
                        <div className="whitespace-pre-wrap text-sm">
                          {message.content}
                        </div>
                      ) : (
                        <div 
                          className="text-sm ai-message-content"
                          dangerouslySetInnerHTML={{ 
                            __html: formatAIMessage(message.content) 
                          }}
                        />
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className={`text-xs ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString('ru-RU', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                        {message.type === 'assistant' && (
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => markAsHelpful(message.id, true)}
                              className={`h-6 w-6 p-0 ${message.helpful === true ? 'text-green-600' : 'text-gray-400'}`}
                            >
                              👍
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => markAsHelpful(message.id, false)}
                              className={`h-6 w-6 p-0 ${message.helpful === false ? 'text-red-600' : 'text-gray-400'}`}
                            >
                              👎
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[85%]">
                      <div className="flex items-center gap-1">
                        <div className="text-sm text-gray-600">Анна печатает</div>
                        <div className="flex ml-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce ml-1" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce ml-1" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick suggestions */}
              <div className="px-4 py-2 border-t bg-gray-50">
                <div className="text-xs text-gray-600 mb-2">Быстрые вопросы:</div>
                <div className="flex flex-wrap gap-1">
                  {getQuickSuggestions().map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendMessage(suggestion)}
                      className="text-xs h-6 px-2"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Напишите сообщение Анне..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                    className="flex-1"
                  />
                  <Button
                    onClick={startListening}
                    disabled={isListening}
                    variant="outline"
                    size="sm"
                    className={isListening ? 'bg-red-100 text-red-600' : ''}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  <Button 
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim() || isTyping}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
