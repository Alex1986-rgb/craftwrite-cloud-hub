
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Bot, User, ArrowRight } from 'lucide-react';

const SCRIPT_EXAMPLES = {
  sales: {
    title: 'Продажи недвижимости',
    platform: 'Telegram',
    conversion: '35%',
    messages: [
      { type: 'bot', text: '👋 Привет! Я помогу найти идеальную квартиру. Как тебя зовут?' },
      { type: 'user', text: 'Анна' },
      { type: 'bot', text: 'Приятно познакомиться, Анна! В каком районе ищешь жилье?' },
      { type: 'user', text: 'Центр города' },
      { type: 'bot', text: '🏙️ Отличный выбор! У нас есть 12 вариантов в центре. Какой бюджет рассматриваешь?' },
      { type: 'user', text: 'До 8 млн' },
      { type: 'bot', text: '💰 Понятно! Показать 3 лучших варианта в твоем бюджете?' }
    ]
  },
  support: {
    title: 'Техподдержка SaaS',
    platform: 'WhatsApp',
    conversion: '90%',
    messages: [
      { type: 'bot', text: '🔧 Здравствуйте! Опишите проблему, с которой столкнулись' },
      { type: 'user', text: 'Не могу войти в аккаунт' },
      { type: 'bot', text: '🔐 Понимаю. Какая ошибка появляется при входе?\n\n1️⃣ Неверный пароль\n2️⃣ Аккаунт заблокирован\n3️⃣ Другая ошибка' },
      { type: 'user', text: '1' },
      { type: 'bot', text: '📧 Отправлю ссылку для сброса пароля на ваш email. Проверьте почту через 2 минуты' }
    ]
  },
  lead: {
    title: 'Лидогенерация курсов',
    platform: 'VK',
    conversion: '28%',
    messages: [
      { type: 'bot', text: '🎓 Привет! Хочешь узнать, подходит ли тебе наш курс по маркетингу?' },
      { type: 'user', text: 'Да' },
      { type: 'bot', text: '📊 Отлично! Есть ли у тебя опыт в маркетинге?\n\nА) Совсем новичок\nБ) 1-2 года опыта\nВ) Опытный маркетолог' },
      { type: 'user', text: 'А' },
      { type: 'bot', text: '🚀 Супер! Наш курс "Маркетинг с нуля" идеально подойдет. Оставь номер телефона - пришлю программу и скидку 30%' }
    ]
  }
};

export default function ChatbotExamples() {
  const [activeExample, setActiveExample] = useState('sales');

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Примеры наших скриптов
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Посмотрите, как выглядят диалоги в реальных проектах наших клиентов
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs value={activeExample} onValueChange={setActiveExample}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="sales">Продажи</TabsTrigger>
              <TabsTrigger value="support">Поддержка</TabsTrigger>
              <TabsTrigger value="lead">Лидогенерация</TabsTrigger>
            </TabsList>

            {Object.entries(SCRIPT_EXAMPLES).map(([key, example]) => (
              <TabsContent key={key} value={key}>
                <Card className="border-0 shadow-xl bg-white">
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-blue-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl text-slate-900">
                          {example.title}
                        </CardTitle>
                        <p className="text-slate-600">Платформа: {example.platform}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        Конверсия {example.conversion}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {example.messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-3 ${
                            message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              message.type === 'bot'
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {message.type === 'bot' ? (
                              <Bot className="w-4 h-4" />
                            ) : (
                              <User className="w-4 h-4" />
                            )}
                          </div>
                          <div
                            className={`max-w-xs p-3 rounded-lg ${
                              message.type === 'bot'
                                ? 'bg-blue-50 text-slate-900'
                                : 'bg-slate-100 text-slate-900'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-line">{message.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <MessageSquare className="w-4 h-4" />
                          {example.messages.length} сообщений в диалоге
                        </div>
                        <Button variant="outline" size="sm">
                          Посмотреть полный скрипт
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
