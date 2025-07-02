
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Brain, 
  Zap, 
  MessageSquare, 
  Settings,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Lightbulb,
  Target,
  Clock,
  Star
} from 'lucide-react';
import { useEnhancedAnalytics } from '@/hooks/useEnhancedAnalytics';
import { useSystemSettings } from '@/hooks/useSystemSettings';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  category?: 'general' | 'copywriting' | 'seo' | 'marketing';
  helpful?: boolean;
}

interface AssistantCapability {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  active: boolean;
}

const assistantCapabilities: AssistantCapability[] = [
  {
    id: 'copywriting',
    name: 'Копирайтинг',
    description: 'Помощь в создании продающих текстов',
    icon: <Sparkles className="w-4 h-4" />,
    category: 'content',
    active: true
  },
  {
    id: 'seo',
    name: 'SEO-оптимизация',
    description: 'Анализ и улучшение SEO',
    icon: <Target className="w-4 h-4" />,
    category: 'seo',
    active: true
  },
  {
    id: 'strategy',
    name: 'Стратегия',
    description: 'Маркетинговые стратегии',
    icon: <Brain className="w-4 h-4" />,
    category: 'marketing',
    active: true
  },
  {
    id: 'analysis',
    name: 'Аналитика',
    description: 'Анализ контента и метрик',
    icon: <Zap className="w-4 h-4" />,
    category: 'analytics',
    active: true
  }
];

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
      content: 'Привет! Я ваш AI-помощник по копирайтингу 🚀\n\nМогу помочь с:\n• Созданием продающих текстов\n• SEO-оптимизацией\n• Анализом контента\n• Маркетинговыми стратегиями\n\nЧем могу быть полезен?',
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
      action: 'ai_assistant_message',
      category: 'AI Assistant',
      label: selectedCapability,
      custom_parameters: {
        message_length: content.length,
        capability: selectedCapability
      }
    });

    try {
      // Call AI service
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: {
          message: content,
          context: conversationContext,
          capability: selectedCapability,
          conversation_history: messages.slice(-5) // Last 5 messages for context
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: data.response,
        timestamp: new Date(),
        category: selectedCapability as any
      };

      setMessages(prev => [...prev, assistantMessage]);
      setConversationContext(data.context || {});

      // Text-to-speech if enabled
      if (getSetting('ai_tts_enabled', false)) {
        speakText(data.response);
      }

    } catch (error) {
      console.error('AI Assistant error:', error);
      toast.error('Ошибка AI-ассистента');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Извините, произошла ошибка. Попробуйте еще раз.',
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

      recognition.onerror = () => {
        toast.error('Ошибка распознавания речи');
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
      action: 'ai_assistant_feedback',
      category: 'AI Assistant',
      label: helpful ? 'helpful' : 'not_helpful',
      custom_parameters: { message_id: messageId }
    });
  };

  const getQuickSuggestions = () => {
    const suggestions: { [key: string]: string[] } = {
      general: [
        'Как создать продающий заголовок?',
        'Покажи структуру хорошей статьи',
        'Какие ошибки допускают новички?'
      ],
      copywriting: [
        'Формула AIDA на примере',
        'Как усилить призыв к действию?',
        'Триггеры для продающих текстов'
      ],
      seo: [
        'Как правильно использовать ключевые слова?',
        'Оптимальная длина мета-описания',
        'Структура SEO-статьи'
      ],
      marketing: [
        'Анализ целевой аудитории',
        'Воронка продаж для контента',
        'Метрики эффективности'
      ]
    };

    return suggestions[selectedCapability] || suggestions.general;
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={onToggleMinimize}
          className="rounded-full w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
        >
          <Bot className="w-6 h-6 text-white" />
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
                <Bot className="w-8 h-8" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <CardTitle className="text-lg">AI Копирайтер</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs bg-white/20 text-white">
                    GPT-4.1
                  </Badge>
                  <Badge variant="secondary" className="text-xs bg-white/20 text-white">
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
                <Brain className="w-3 h-3 mr-1" />
                Маркетинг
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCapability} className="mt-0">
              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100'} rounded-lg p-3`}>
                      <div className="whitespace-pre-wrap text-sm">
                        {message.content}
                      </div>
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
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
                    placeholder="Задайте вопрос..."
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
