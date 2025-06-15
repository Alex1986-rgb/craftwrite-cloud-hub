
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  ShoppingCart, 
  Calendar, 
  HeadphonesIcon,
  TrendingUp,
  Users,
  Play,
  ExternalLink
} from 'lucide-react';

const EXAMPLES = {
  ecommerce: {
    title: 'Интернет-магазин',
    icon: ShoppingCart,
    description: 'Бот для онлайн-магазина электроники',
    features: ['Поиск товаров', 'Сравнение характеристик', 'Оформление заказа', 'Отслеживание доставки'],
    metrics: { conversion: '+35%', support: '-60%', satisfaction: '4.8/5' },
    dialog: [
      { role: 'bot', text: 'Привет! Я помогу найти идеальный товар. Что ищете?' },
      { role: 'user', text: 'Нужен смартфон до 50 000 рублей' },
      { role: 'bot', text: 'Отлично! У нас есть несколько вариантов в этом ценовом сегменте. Что важнее: камера, производительность или время работы?' },
      { role: 'user', text: 'Камера' },
      { role: 'bot', text: 'Рекомендую iPhone 13 (48 990₽) или Samsung Galaxy S23 (47 990₽). Показать сравнение характеристик?' }
    ]
  },
  booking: {
    title: 'Салон красоты',
    icon: Calendar,
    description: 'Бот для записи и управления appointments',
    features: ['Выбор услуги', 'Запись к мастеру', 'Напоминания', 'Перенос записи'],
    metrics: { bookings: '+80%', noshow: '-45%', efficiency: '+150%' },
    dialog: [
      { role: 'bot', text: 'Добро пожаловать в салон "Красота"! На какую услугу хотите записаться?' },
      { role: 'user', text: 'Стрижка и окрашивание' },
      { role: 'bot', text: 'К какому мастеру предпочитаете? Анна (топ-стилист) или Елена (старший мастер)?' },
      { role: 'user', text: 'К Анне' },
      { role: 'bot', text: 'У Анны свободно: завтра 14:00, 16:30 или послезавтра 11:00. Какое время подходит?' }
    ]
  },
  support: {
    title: 'Техподдержка',
    icon: HeadphonesIcon,
    description: 'Бот для IT-компании',
    features: ['Диагностика проблем', 'Пошаговые инструкции', 'Эскалация к специалисту', 'База знаний'],
    metrics: { resolution: '+70%', response: '<30 сек', satisfaction: '4.6/5' },
    dialog: [
      { role: 'bot', text: 'Здравствуйте! Я помогу решить техническую проблему. Опишите, что произошло?' },
      { role: 'user', text: 'Не работает интернет' },
      { role: 'bot', text: 'Проверим подключение пошагово. Горят ли индикаторы на роутере?' },
      { role: 'user', text: 'Один красный, остальные зеленые' },
      { role: 'bot', text: 'Красный индикатор указывает на проблему с интернетом. Попробуйте перезагрузить роутер на 30 секунд.' }
    ]
  },
  sales: {
    title: 'Продажи B2B',
    icon: TrendingUp,
    description: 'Бот для квалификации корпоративных клиентов',
    features: ['Квалификация лидов', 'Презентация решений', 'Расчет стоимости', 'Назначение встреч'],
    metrics: { leads: '+120%', qualification: '+90%', meetings: '+65%' },
    dialog: [
      { role: 'bot', text: 'Добро пожаловать! Расскажите о вашей компании и задачах, которые нужно решить' },
      { role: 'user', text: 'У нас 50 сотрудников, нужна CRM система' },
      { role: 'bot', text: 'Понятно. Какие процессы сейчас не автоматизированы? Работа с клиентами, продажи или аналитика?' },
      { role: 'user', text: 'В основном продажи' },
      { role: 'bot', text: 'Для отдела продаж у нас есть специализированное решение. Покажу презентацию или сразу рассчитаем стоимость?' }
    ]
  }
};

export default function ChatbotExamples() {
  const [selectedExample, setSelectedExample] = useState('ecommerce');
  const [dialogStep, setDialogStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentExample = EXAMPLES[selectedExample as keyof typeof EXAMPLES];

  const playDialog = () => {
    setIsPlaying(true);
    setDialogStep(0);
    
    const interval = setInterval(() => {
      setDialogStep(prev => {
        if (prev >= currentExample.dialog.length - 1) {
          clearInterval(interval);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const resetDialog = () => {
    setDialogStep(0);
    setIsPlaying(false);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Примеры успешных чат-ботов
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Посмотрите, как боты работают в разных сферах бизнеса и какие результаты они показывают
          </p>
        </div>

        <Tabs value={selectedExample} onValueChange={setSelectedExample} className="max-w-6xl mx-auto">
          <TabsList className="grid grid-cols-4 mb-8">
            {Object.entries(EXAMPLES).map(([key, example]) => {
              const Icon = example.icon;
              return (
                <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{example.title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(EXAMPLES).map(([key, example]) => (
            <TabsContent key={key} value={key}>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Информация о боте */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <example.icon className="w-6 h-6 text-blue-600" />
                      {example.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-600">{example.description}</p>
                    
                    <div>
                      <h4 className="font-medium mb-3">Возможности бота:</h4>
                      <div className="space-y-2">
                        {example.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Результаты:</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(example.metrics).map(([key, value]) => (
                          <div key={key} className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="font-bold text-blue-600">{value}</div>
                            <div className="text-xs text-gray-600 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button onClick={() => setSelectedExample(key)} className="w-full">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Заказать похожего бота
                    </Button>
                  </CardContent>
                </Card>

                {/* Демонстрация диалога */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Пример диалога
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={playDialog}
                        disabled={isPlaying}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        {isPlaying ? 'Воспроизведение...' : 'Показать диалог'}
                      </Button>
                      <Button variant="outline" size="sm" onClick={resetDialog}>
                        Сначала
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-80 overflow-y-auto">
                      {currentExample.dialog.slice(0, dialogStep + 1).map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs px-4 py-2 rounded-lg ${
                              message.role === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <div className="text-sm">{message.text}</div>
                            {message.role === 'bot' && (
                              <Badge variant="secondary" className="mt-1 text-xs">
                                Бот
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {dialogStep < currentExample.dialog.length - 1 && (
                      <div className="mt-4 text-center text-sm text-gray-500">
                        {isPlaying ? 'Бот печатает...' : 'Нажмите "Показать диалог" для демонстрации'}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
