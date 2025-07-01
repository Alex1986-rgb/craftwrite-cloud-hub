
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Bot, User, Zap, Clock, CheckCircle2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  quickReplies?: string[];
  suggestions?: string[];
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickStartQuestions = [
  "Сколько стоит SEO-статья?",
  "Как быстро можете сделать лендинг?",
  "Какие у вас гарантии качества?",
  "Работаете ли с моей нишей?",
  "Можете показать примеры работ?",
  "Как происходит оплата?"
];

const botResponses: { [key: string]: string } = {
  "стоимость": "Цены на наши услуги начинаются от 800₽ за SEO-статью до 1000 слов. Точная стоимость зависит от сложности и объема. Могу рассчитать точную цену для вашего проекта!",
  "сроки": "Обычно выполняем заказы за 3-7 дней. Для срочных проектов предлагаем экспресс-доставку за 24-48 часов с наценкой 50%. Какие у вас сроки?",
  "гарантии": "Мы даем 100% гарантию качества: уникальность текста, соответствие ТЗ, бесплатные правки в течение 30 дней. Если результат не устроит - вернем деньги!",
  "примеры": "Конечно! У нас есть портфолио из 500+ проектов. Могу показать кейсы по вашей тематике. В какой сфере работаете?",
  "оплата": "Принимаем оплату картой, переводом или по счету для юрлиц. Предоплата 50%, остальное после сдачи работы. Безопасно и удобно!",
  "default": "Отличный вопрос! Я передам вас нашему специалисту, который даст детальную консультацию. Оставьте контакт - мы свяжемся в течение 15 минут."
};

export default function SmartChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Привет! Я AI-консультант CopyPro Cloud 👋\n\nПомогу с выбором услуг, расчетом стоимости и ответами на вопросы.',
      timestamp: new Date(),
      quickReplies: quickStartQuestions.slice(0, 3)
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = () => {
    setIsTyping(true);
    return new Promise(resolve => setTimeout(resolve, 1500));
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('стоимость') || message.includes('цена') || message.includes('сколько')) {
      return botResponses.стоимость;
    }
    if (message.includes('сроки') || message.includes('быстро') || message.includes('время')) {
      return botResponses.сроки;
    }
    if (message.includes('гарантии') || message.includes('качество')) {
      return botResponses.гарантии;
    }
    if (message.includes('примеры') || message.includes('работы') || message.includes('портфолио')) {
      return botResponses.примеры;
    }
    if (message.includes('оплата') || message.includes('платить') || message.includes('счет')) {
      return botResponses.оплата;
    }
    
    return botResponses.default;
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Добавляем сообщение пользователя
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Имитация печати
    await simulateTyping();
    setIsTyping(false);

    // Добавляем ответ бота
    const botResponse = getBotResponse(content);
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: botResponse,
      timestamp: new Date(),
      quickReplies: content.toLowerCase().includes('примеры') 
        ? ["Показать кейсы e-commerce", "Кейсы для SaaS", "Медицинские проекты"]
        : content.toLowerCase().includes('стоимость')
        ? ["Рассчитать точную цену", "Показать все тарифы", "Есть ли скидки?"]
        : ["Заказать консультацию", "Рассчитать стоимость", "Смотреть портфолио"]
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-end justify-end p-4">
      <Card className="w-full max-w-md h-[600px] shadow-2xl border-0 bg-white flex flex-col">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="w-8 h-8" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <CardTitle className="text-lg">AI Консультант</CardTitle>
                <p className="text-sm opacity-90">Онлайн • Отвечаю мгновенно</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              ✕
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Сообщения */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' ? 'bg-blue-600' : 'bg-gray-200'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  
                  <div className={`rounded-lg px-4 py-3 ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    <div className={`text-xs mt-1 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString('ru-RU', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Быстрые ответы */}
            {messages[messages.length - 1]?.type === 'bot' && messages[messages.length - 1]?.quickReplies && (
              <div className="space-y-2">
                <div className="text-xs text-gray-500 px-1">Быстрые ответы:</div>
                <div className="flex flex-wrap gap-2">
                  {messages[messages.length - 1].quickReplies!.map((reply, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs hover:bg-blue-50 hover:border-blue-300"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Индикатор печати */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-gray-600" />
                  </div>
                  <div className="bg-gray-100 rounded-lg px-4 py-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Статистика */}
          <div className="px-4 py-2 bg-gray-50 border-t">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  <span>Среднее время ответа: 2 сек</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Решаем 89% вопросов</span>
                </div>
              </div>
            </div>
          </div>

          {/* Поле ввода */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Напишите ваш вопрос..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                className="flex-1"
              />
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
        </CardContent>
      </Card>
    </div>
  );
}
