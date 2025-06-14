
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Eye, MousePointer, Clock, Copy, Check } from "lucide-react";
import { useState } from "react";

const textExamples = {
  before: {
    title: "Смартфон Apple iPhone 14 128GB",
    description: "Новый iPhone 14 с камерой 48 МП и чипом A15 Bionic. Доступен в разных цветах. Быстрая доставка по Москве.",
    category: "Телефон Apple iPhone 14 Pro 128 ГБ",
    features: ["Камера 48 МП", "Чип A15", "128GB память"]
  },
  after: {
    title: "iPhone 14 128GB — Профессиональная съемка в кармане | Скидка до 15%",
    description: "🔥 Революционная камера 48 МП для фото студийного качества. Мощный A15 Bionic справится с любыми задачами. ✅ Официальная гарантия Apple ✅ Быстрая доставка за 2 часа по Москве ✅ Обмен старого устройства",
    category: "Смартфоны Apple → iPhone 14 Pro → 128 ГБ → Все цвета в наличии",
    features: ["Камера 48 МП с ночным режимом", "A15 Bionic — на 40% быстрее конкурентов", "128GB + возможность расширения через iCloud"]
  }
};

const seoExamples = {
  oldTitle: "Как выбрать телефон",
  newTitle: "Как выбрать смартфон в 2024: полный гид + чек-лист из 15 пунктов",
  oldMeta: "Статья о выборе телефона. Советы по покупке.",
  newMeta: "🔥 Подробный гид по выбору смартфона в 2024. Сравнение iPhone vs Android, обзор лучших моделей до 50000₽. Чек-лист для правильной покупки."
};

export default function ProjectTextExamples() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <section id="examples" className="py-16 bg-gradient-to-br from-slate-50 to-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-6 py-2 text-lg mb-6">
            Примеры оптимизации
          </Badge>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-slate-900">
            До и после: как мы трансформировали контент
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Реальные примеры того, как оптимизированный контент увеличил конверсию на 245%
          </p>
        </div>

        {/* Product Descriptions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Before */}
          <Card className="p-8 border-2 border-red-200 bg-red-50/50 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge className="bg-red-500 text-white">ДО</Badge>
            </div>
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
            
            <h3 className="text-2xl font-bold mb-6 text-red-800">Старая версия</h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm text-red-600 mb-2">Заголовок товара:</div>
                <div className="bg-white p-4 rounded-lg border border-red-200 font-medium text-slate-800">
                  {textExamples.before.title}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-red-600 mb-2">Описание:</div>
                <div className="bg-white p-4 rounded-lg border border-red-200 text-slate-700">
                  {textExamples.before.description}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-red-600 mb-2">Характеристики:</div>
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    {textExamples.before.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-4 text-sm">
              <div className="flex items-center gap-2 text-red-600">
                <Eye className="w-4 h-4" />
                <span>CTR: 1.2%</span>
              </div>
              <div className="flex items-center gap-2 text-red-600">
                <MousePointer className="w-4 h-4" />
                <span>Конверсия: 1.2%</span>
              </div>
              <div className="flex items-center gap-2 text-red-600">
                <Clock className="w-4 h-4" />
                <span>Время: 0:45</span>
              </div>
            </div>
          </Card>

          {/* After */}
          <Card className="p-8 border-2 border-green-200 bg-green-50/50 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge className="bg-green-500 text-white">ПОСЛЕ</Badge>
            </div>
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
            
            <h3 className="text-2xl font-bold mb-6 text-green-800">Оптимизированная версия</h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm text-green-600 mb-2 flex items-center justify-between">
                  <span>Заголовок товара:</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(textExamples.after.title, 'title')}
                    className="text-xs p-1 h-6"
                  >
                    {copiedText === 'title' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-200 font-medium text-slate-800">
                  {textExamples.after.title}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-green-600 mb-2 flex items-center justify-between">
                  <span>Описание:</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(textExamples.after.description, 'desc')}
                    className="text-xs p-1 h-6"
                  >
                    {copiedText === 'desc' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </div>
                <div className="bg-white p-4 rounded-lg border border-green-200 text-slate-700">
                  {textExamples.after.description}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-green-600 mb-2">Характеристики:</div>
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    {textExamples.after.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-4 text-sm">
              <div className="flex items-center gap-2 text-green-600">
                <Eye className="w-4 h-4" />
                <span>CTR: 4.8% (+300%)</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <MousePointer className="w-4 h-4" />
                <span>Конверсия: 4.14% (+245%)</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <Clock className="w-4 h-4" />
                <span>Время: 2:18 (+65%)</span>
              </div>
            </div>
          </Card>
        </div>

        {/* SEO Examples */}
        <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <h3 className="text-2xl font-bold mb-6 text-blue-900">SEO-оптимизация заголовков и мета-описаний</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <div className="text-sm text-red-600 mb-2">Старый Title:</div>
                <div className="font-medium text-slate-800">{seoExamples.oldTitle}</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-red-200">
                <div className="text-sm text-red-600 mb-2">Старое Meta Description:</div>
                <div className="text-slate-700">{seoExamples.oldMeta}</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="text-sm text-green-600 mb-2 flex items-center justify-between">
                  <span>Новый Title:</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(seoExamples.newTitle, 'seo-title')}
                    className="text-xs p-1 h-6"
                  >
                    {copiedText === 'seo-title' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </div>
                <div className="font-medium text-slate-800">{seoExamples.newTitle}</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="text-sm text-green-600 mb-2 flex items-center justify-between">
                  <span>Новое Meta Description:</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(seoExamples.newMeta, 'seo-meta')}
                    className="text-xs p-1 h-6"
                  >
                    {copiedText === 'seo-meta' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </div>
                <div className="text-slate-700">{seoExamples.newMeta}</div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <div>
                <div className="font-bold text-lg text-slate-900">Результат SEO-оптимизации</div>
                <div className="text-slate-700">За 3 месяца работы с контентом</div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">+180%</div>
                <div className="text-sm text-slate-600">Органический трафик</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">156</div>
                <div className="text-sm text-slate-600">Запросов в ТОП-10</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">-42%</div>
                <div className="text-sm text-slate-600">Показатель отказов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">+320%</div>
                <div className="text-sm text-slate-600">Рост продаж</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Key Insights */}
        <div className="mt-12 text-center">
          <Card className="inline-block p-6 bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
            <div className="flex items-center gap-4">
              <div className="text-4xl">💡</div>
              <div className="text-left">
                <div className="font-bold text-lg text-slate-900 mb-1">Ключевой инсайт</div>
                <div className="text-slate-700">Эмоциональные триггеры + конкретные выгоды + социальные доказательства = рост конверсии в 3+ раза</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
