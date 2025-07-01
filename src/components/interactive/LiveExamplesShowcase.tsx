
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, 
  Edit3, 
  TrendingUp, 
  Users, 
  Clock, 
  Target,
  ChevronRight,
  PlayCircle,
  Zap
} from 'lucide-react';

interface ExampleData {
  id: string;
  title: string;
  type: string;
  industry: string;
  before: {
    text: string;
    metrics: {
      conversion: number;
      engagement: number;
      bounceRate: number;
    };
  };
  after: {
    text: string;
    metrics: {
      conversion: number;
      engagement: number;
      bounceRate: number;
    };
  };
  improvements: string[];
  timeframe: string;
}

const examples: ExampleData[] = [
  {
    id: 'ecommerce-landing',
    title: 'Landing для интернет-магазина',
    type: 'Landing Page',
    industry: 'E-commerce',
    before: {
      text: `Купите качественную одежду в нашем магазине. У нас большой выбор товаров по доступным ценам. Быстрая доставка по всей России.

Каталог включает:
- Мужская одежда
- Женская одежда  
- Детская одежда
- Аксессуары

Оформите заказ прямо сейчас!`,
      metrics: {
        conversion: 1.2,
        engagement: 24,
        bounceRate: 78
      }
    },
    after: {
      text: `🔥 Последний день скидок до 70%! 

Устали от одежды, которая теряет вид после первой стирки? 

Представьте: вы покупаете стильную куртку, а через месяц она выглядит как тряпка. Знакомо?

В MODERNO мы решили эту проблему раз и навсегда:
✅ Премиум-ткани европейского качества
✅ Гарантия цвета и формы на 2 года
✅ Примерка дома - не подошло? Вернем деньги!

СЕГОДНЯ СКИДКА 50% на первый заказ!
Осталось: 3 часа 47 минут

👆 ПОЛУЧИТЬ СКИДКУ СЕЙЧАС`,
      metrics: {
        conversion: 8.7,
        engagement: 156,
        bounceRate: 32
      }
    },
    improvements: [
      'Добавили эмоциональный хук',
      'Использовали проблемно-ориентированный подход',
      'Создали срочность и дефицит',
      'Добавили конкретные выгоды',
      'Включили социальные доказательства'
    ],
    timeframe: '14 дней'
  },
  {
    id: 'saas-email',
    title: 'Email-последовательность для SaaS',
    type: 'Email Campaign',
    industry: 'SaaS',
    before: {
      text: `Тема: Попробуйте нашу CRM-систему

Здравствуйте!

Приглашаем вас протестировать нашу CRM-систему. Она поможет вам управлять клиентами и увеличить продажи.

Функции:
- Управление контактами
- Отчеты
- Интеграции
- Автоматизация

Бесплатный пробный период 14 дней.

С уважением,
Команда CRM Pro`,
      metrics: {
        conversion: 2.3,
        engagement: 18,
        bounceRate: 85
      }
    },
    after: {
      text: `Тема: Иван, как удвоить продажи за 30 дней? 🚀

Иван, привет!

Помните, как вы потеряли сделку на 500К только потому, что забыли перезвонить клиенту?

А сколько "горячих" лидов утекло, пока вы искали их контакты в Excel?

Боль знакома 73% руководителей отделов продаж.

Но есть решение 👇

CRM Pro превращает хаос в систему:
📞 Автодозвоны - ни одного пропущенного клиента
💰 Воронка продаж - видите каждую сделку
⚡ AI-подсказки - знаете, что сказать клиенту

Результат: +127% к продажам за первый месяц

Хотите так же? Попробуйте 14 дней БЕСПЛАТНО:
[НАЧАТЬ СЕЙЧАС - 1 клик]

P.S. Настройка займет 15 минут. Первые результаты - завтра.

Дмитрий Продажин
Эксперт по автоматизации продаж`,
      metrics: {
        conversion: 12.4,
        engagement: 67,
        bounceRate: 23
      }
    },
    improvements: [
      'Персонализировали обращение',
      'Начали с боли клиента',
      'Показали конкретный результат',
      'Добавили срочность действия',
      'Упростили призыв к действию'
    ],
    timeframe: '7 дней'
  },
  {
    id: 'fintech-article',
    title: 'SEO-статья для Fintech',
    type: 'SEO Article',
    industry: 'Fintech',
    before: {
      text: `Как выбрать банк для бизнеса

При выборе банка для ведения бизнеса нужно учитывать много факторов. Важно сравнить тарифы, услуги и условия обслуживания.

Основные критерии выбора:
1. Стоимость обслуживания
2. Набор услуг
3. Качество сервиса
4. Репутация банка

Также стоит обратить внимание на дополнительные услуги и возможности интеграции с учетными системами.`,
      metrics: {
        conversion: 0.8,
        engagement: 45,
        bounceRate: 89
      }
    },
    after: {
      text: `РКО для ИП и ООО: как выбрать банк и сэкономить 50 000 ₽ в год

💸 Средний ИП переплачивает банку 4 200 ₽ ежемесячно. За год - 50 400 ₽!

Откуда такие цифры? Скрытые комиссии, которые "всплывают" после подключения:

❌ SMS-уведомления: +590 ₽/мес
❌ Выписки в бумажном виде: +350 ₽/мес  
❌ Эквайринг без предупреждения: +1.8% с оборота
❌ Овердрафт "по умолчанию": 45% годовых

Как не попасться? Чек-лист из 12 пунктов ⬇️

📋 ЧТО ПРОВЕРИТЬ ПЕРЕД ПОДПИСАНИЕМ:

✅ Реальная стоимость (тариф + все доп.услуги)
✅ Лимиты без комиссий (обороты, переводы, снятие)
✅ Условия расторжения (штрафы, сроки)
✅ Бесплатные опции (интернет-банк, карта, уведомления)

🏆 ТОП-3 БАНКА ДЛЯ БИЗНЕСА 2024:

1. **Точка** - 0₽ при обороте до 1млн
2. **СберБизнес** - кешбэк до 5% с корпкарты  
3. **Альфа-Банк** - бесплатный эквайринг

📊 КАЛЬКУЛЯТОР ЭКОНОМИИ:
Сравните реальные расходы за год в разных банках:
[РАССЧИТАТЬ БЕСПЛАТНО]

💡 ЛАЙФХАК: Открывайте РКО в 2-3 банках одновременно. Первый месяц тестируете, далее выбираете лучший.

❓ Остались вопросы? Бесплатная консультация по выбору банка:
[ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ]`,
      metrics: {
        conversion: 6.7,
        engagement: 234,
        bounceRate: 35
      }
    },
    improvements: [
      'Добавили цифры и конкретику',
      'Использовали структурированный формат',
      'Включили практические советы',
      'Добавили интерактивные элементы',
      'Оптимизировали под поисковые запросы'
    ],
    timeframe: '21 день'
  }
];

export default function LiveExamplesShowcase() {
  const [selectedExample, setSelectedExample] = useState(examples[0]);
  const [activeTab, setActiveTab] = useState('before');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleExampleChange = (example: ExampleData) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedExample(example);
      setIsAnimating(false);
    }, 300);
  };

  const getMetricChange = (before: number, after: number) => {
    const change = ((after - before) / before) * 100;
    return {
      value: Math.round(change),
      isPositive: change > 0,
      isNegative: change < 0
    };
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Живые примеры: До и После
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Смотрите, как профессиональная переработка текстов увеличивает конverсию в 3-7 раз
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Список примеров */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Выберите пример:</h3>
          <div className="space-y-3">
            {examples.map((example) => (
              <Card 
                key={example.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedExample.id === example.id 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleExampleChange(example)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {example.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {example.industry}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-sm mb-2">{example.title}</h4>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    <span>+{getMetricChange(example.before.metrics.conversion, example.after.metrics.conversion).value}% конверсия</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Основной контент */}
        <div className="lg:col-span-3">
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{selectedExample.title}</CardTitle>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge variant="secondary">{selectedExample.type}</Badge>
                    <Badge variant="outline">{selectedExample.industry}</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Результат за {selectedExample.timeframe}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <PlayCircle className="w-4 h-4" />
                  Смотреть кейс
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="before" className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Было
                  </TabsTrigger>
                  <TabsTrigger value="after" className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    Стало
                  </TabsTrigger>
                  <TabsTrigger value="analysis" className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Анализ
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="before" className="space-y-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="destructive" className="text-sm">
                        Исходный вариант
                      </Badge>
                    </div>
                    <div className={`prose prose-gray max-w-none transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
                      <div className="whitespace-pre-wrap text-gray-800">
                        {selectedExample.before.text}
                      </div>
                    </div>
                  </div>

                  {/* Метрики "Было" */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-red-50 border-red-200">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {selectedExample.before.metrics.conversion}%
                        </div>
                        <div className="text-sm text-gray-600">Конверсия</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-red-50 border-red-200">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {selectedExample.before.metrics.engagement}%
                        </div>
                        <div className="text-sm text-gray-600">Вовлеченность</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-red-50 border-red-200">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {selectedExample.before.metrics.bounceRate}%
                        </div>
                        <div className="text-sm text-gray-600">Отказы</div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="after" className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="text-sm bg-green-600">
                        Улучшенный вариант
                      </Badge>
                      <Zap className="w-4 h-4 text-green-600" />
                    </div>
                    <div className={`prose prose-gray max-w-none transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
                      <div className="whitespace-pre-wrap text-gray-800">
                        {selectedExample.after.text}
                      </div>
                    </div>
                  </div>

                  {/* Метрики "Стало" */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {selectedExample.after.metrics.conversion}%
                        </div>
                        <div className="text-sm text-gray-600">Конверсия</div>
                        <div className="text-xs text-green-600 font-semibold">
                          +{getMetricChange(selectedExample.before.metrics.conversion, selectedExample.after.metrics.conversion).value}%
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {selectedExample.after.metrics.engagement}%
                        </div>
                        <div className="text-sm text-gray-600">Вовлеченность</div>
                        <div className="text-xs text-green-600 font-semibold">
                          +{getMetricChange(selectedExample.before.metrics.engagement, selectedExample.after.metrics.engagement).value}%
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {selectedExample.after.metrics.bounceRate}%
                        </div>
                        <div className="text-sm text-gray-600">Отказы</div>
                        <div className="text-xs text-green-600 font-semibold">
                          -{Math.abs(getMetricChange(selectedExample.before.metrics.bounceRate, selectedExample.after.metrics.bounceRate).value)}%
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="analysis" className="space-y-6">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="w-5 h-5 text-blue-600" />
                        Что мы изменили?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {selectedExample.improvements.map((improvement, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <span className="text-gray-800">{improvement}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Сравнение метрик */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Результаты в цифрах</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-green-50 rounded-lg">
                          <div className="text-center">
                            <div className="text-lg font-bold text-red-600">
                              {selectedExample.before.metrics.conversion}%
                            </div>
                            <div className="text-sm text-gray-600">Было</div>
                          </div>
                          <ChevronRight className="w-6 h-6 text-gray-400" />
                          <div className="text-center">
                            <div className="text-lg font-bold text-green-600">
                              {selectedExample.after.metrics.conversion}%
                            </div>
                            <div className="text-sm text-gray-600">Стало</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                              +{getMetricChange(selectedExample.before.metrics.conversion, selectedExample.after.metrics.conversion).value}%
                            </div>
                            <div className="text-sm text-gray-600">Рост</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
