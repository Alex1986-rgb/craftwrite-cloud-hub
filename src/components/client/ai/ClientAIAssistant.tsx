
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Bot, 
  Send, 
  Sparkles, 
  FileText, 
  BarChart3, 
  Calendar,
  MessageCircle,
  Lightbulb,
  TrendingUp,
  Target
} from 'lucide-react';

interface AIMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  action: string;
}

export function ClientAIAssistant() {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      content: 'Здравствуйте! Я ваш AI-помощник. Могу помочь с анализом проектов, планированием заказов и оптимизацией бюджета. Чем могу быть полезен?',
      sender: 'ai',
      timestamp: new Date(),
      suggestions: [
        'Проанализировать эффективность проектов',
        'Спланировать следующий заказ',
        'Оптимизировать бюджет'
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickActions: QuickAction[] = [
    {
      id: 'analyze',
      label: 'Анализ проектов',
      icon: BarChart3,
      description: 'Получить анализ эффективности ваших проектов',
      action: 'Проанализируй эффективность моих проектов за последний месяц'
    },
    {
      id: 'plan',
      label: 'Планирование',
      icon: Calendar,
      description: 'Помощь в планировании новых заказов',
      action: 'Помоги спланировать следующий заказ исходя из моих целей'
    },
    {
      id: 'budget',
      label: 'Бюджет',
      icon: Target,
      description: 'Оптимизация расходов на маркетинг',
      action: 'Как оптимизировать мой бюджет на контент-маркетинг?'
    },
    {
      id: 'recommendations',
      label: 'Рекомендации',
      icon: Lightbulb,
      description: 'Персональные рекомендации по развитию',
      action: 'Дай рекомендации по улучшению ROI моих проектов'
    }
  ];

  const aiResponses = [
    {
      trigger: 'анализ',
      response: 'На основе данных ваших проектов, я вижу отличную динамику! ROI вырос на 23%, особенно эффективны SEO-статьи (340% ROI). Рекомендую увеличить инвестиции в этот канал.',
      suggestions: ['Показать детальную аналитику', 'Сравнить с конкурентами', 'Составить план развития']
    },
    {
      trigger: 'планирование',
      response: 'Исходя из ваших прошлых проектов, рекомендую заказать 2 SEO-статьи и 1 лендинг в следующем месяце. Это оптимальный баланс для роста органического трафика.',
      suggestions: ['Рассчитать бюджет', 'Выбрать темы статей', 'Найти подрядчиков']
    },
    {
      trigger: 'бюджет',
      response: 'Ваш текущий бюджет распределен эффективно. Рекомендую перераспределить 15% с SMM на SEO-статьи для увеличения долгосрочного ROI.',
      suggestions: ['Показать план оптимизации', 'Сравнить варианты', 'Рассчитать экономию']
    }
  ];

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Симуляция ответа AI
    setTimeout(() => {
      const response = aiResponses.find(r => 
        input.toLowerCase().includes(r.trigger)
      ) || {
        response: 'Интересный вопрос! На основе ваших данных могу предложить несколько вариантов решения. Нужно больше информации для точного анализа.',
        suggestions: ['Уточнить запрос', 'Показать примеры', 'Связаться с менеджером']
      };

      const aiMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        content: response.response,
        sender: 'ai',
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: QuickAction) => {
    setInput(action.action);
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center animate-slide-in-up">
        <div>
          <h1 className="text-3xl font-bold text-gradient">AI-Помощник</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Интеллектуальная поддержка для ваших проектов
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <Sparkles className="w-4 h-4 mr-1" />
          AI Powered
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Quick Actions */}
        <div className="space-y-4">
          <Card className="glass-card border-0 animate-slide-in-up">
            <CardHeader>
              <CardTitle className="text-lg">Быстрые действия</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={action.id}
                    variant="ghost"
                    className="w-full justify-start h-auto p-3 glass-card border-0 hover:shadow-glow stagger-item"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => handleQuickAction(action)}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                      <div className="text-left">
                        <div className="font-medium text-sm">{action.label}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          {action.description}
                        </div>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="glass-card border-0 h-[600px] flex flex-col animate-slide-in-up" style={{ animationDelay: '200ms' }}>
            {/* Chat Header */}
            <CardHeader className="border-b border-white/20 flex-shrink-0">
              <div className="flex items-center gap-3">
                <Avatar className="bg-gradient-to-r from-purple-600 to-pink-600">
                  <AvatarFallback className="text-white">
                    <Bot className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    AI-Помощник
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </CardTitle>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Всегда готов помочь с анализом и планированием
                  </p>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <Avatar className={`w-8 h-8 ${
                    message.sender === 'ai' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600'
                  }`}>
                    <AvatarFallback className="text-white">
                      {message.sender === 'ai' ? <Bot className="w-4 h-4" /> : 'Вы'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`max-w-md ${message.sender === 'user' ? 'text-right' : ''}`}>
                    <div className={`p-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                        : 'glass-card'
                    }`}>
                      {message.content}
                    </div>
                    
                    {message.suggestions && (
                      <div className="mt-2 space-y-1">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className="text-xs glass-card border-0 hover:shadow-glow"
                            onClick={() => handleSuggestion(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    <div className="text-xs text-slate-500 mt-1">
                      {message.timestamp.toLocaleTimeString('ru-RU', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600">
                    <AvatarFallback className="text-white">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="glass-card p-3 rounded-lg">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>

            {/* Input */}
            <div className="border-t border-white/20 p-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Задайте вопрос AI-помощнику..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 glass-card border-0"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className="gradient-primary text-white hover:shadow-glow"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
