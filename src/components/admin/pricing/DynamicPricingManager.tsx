
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  Plus, 
  Edit, 
  Trash2, 
  Percent, 
  DollarSign,
  Settings,
  TrendingUp,
  MapPin,
  Tag
} from "lucide-react";
import { UnifiedButton } from "@/components/unified";

interface PriceRule {
  id: string;
  name: string;
  service: string;
  basePrice: number;
  multipliers: { [key: string]: number };
  discounts: { code: string; percent: number; }[];
  regional: boolean;
  status: 'active' | 'inactive';
}

export default function DynamicPricingManager() {
  const [selectedRule, setSelectedRule] = useState<string>("seo-copywriting");
  
  const priceRules: PriceRule[] = [
    {
      id: "seo-copywriting",
      name: "SEO-копирайтинг",
      service: "seo-article",
      basePrice: 15000,
      multipliers: {
        "urgency": 1.5,
        "complexity": 1.3,
        "volume": 1.2,
        "research": 1.4
      },
      discounts: [
        { code: "ПЕРВЫЙ_ЗАКАЗ", percent: 15 },
        { code: "ПОСТОЯННЫЙ_КЛИЕНТ", percent: 10 }
      ],
      regional: true,
      status: "active"
    },
    {
      id: "landing-page",
      name: "Лендинг-пейдж",
      service: "landing",
      basePrice: 25000,
      multipliers: {
        "pages": 1.8,
        "integrations": 1.6,
        "design": 1.4,
        "mobile": 1.2
      },
      discounts: [
        { code: "ПАКЕТ_УСЛУГ", percent: 20 },
        { code: "СЕЗОННАЯ_СКИДКА", percent: 12 }
      ],
      regional: false,
      status: "active"
    },
    {
      id: "email-marketing",
      name: "Email-маркетинг",
      service: "email",
      basePrice: 8000,
      multipliers: {
        "automation": 2.0,
        "segments": 1.3,
        "design": 1.5,
        "analytics": 1.2
      },
      discounts: [
        { code: "ДЛИТЕЛЬНЫЙ_КОНТРАКТ", percent: 25 }
      ],
      regional: true,
      status: "active"
    }
  ];

  const currentRule = priceRules.find(rule => rule.id === selectedRule);

  const calculatePrice = (basePrice: number, selectedMultipliers: string[] = []) => {
    if (!currentRule) return basePrice;
    
    let finalPrice = basePrice;
    selectedMultipliers.forEach(key => {
      if (currentRule.multipliers[key]) {
        finalPrice *= currentRule.multipliers[key];
      }
    });
    
    return Math.round(finalPrice);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Управление ценообразованием</h1>
          <p className="text-slate-600">Настройка динамических цен и тарифов</p>
        </div>
        <div className="flex items-center gap-2">
          <UnifiedButton variant="outline">
            <TrendingUp className="w-4 h-4 mr-2" />
            Аналитика цен
          </UnifiedButton>
          <UnifiedButton className="bg-gradient-to-r from-green-600 to-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Новое правило
          </UnifiedButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Список правил ценообразования */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Правила цен
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {priceRules.map((rule) => (
                <div
                  key={rule.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                    selectedRule === rule.id 
                      ? 'bg-green-50 border-green-200' 
                      : 'hover:bg-slate-50 border-slate-200'
                  }`}
                  onClick={() => setSelectedRule(rule.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{rule.name}</span>
                    <Badge 
                      className={`text-xs ${
                        rule.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {rule.status === 'active' ? 'Активно' : 'Неактивно'}
                    </Badge>
                  </div>
                  
                  <div className="text-lg font-bold text-green-600 mb-1">
                    ₽{rule.basePrice.toLocaleString()}
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{Object.keys(rule.multipliers).length} множителей</span>
                    {rule.regional && <MapPin className="w-3 h-3" />}
                    {rule.discounts.length > 0 && <Tag className="w-3 h-3" />}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Редактор правил */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                Правило: {currentRule?.name || 'Выберите правило'}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Calculator className="w-4 h-4" />
                  Калькулятор
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="basic">Базовые цены</TabsTrigger>
                <TabsTrigger value="multipliers">Множители</TabsTrigger>
                <TabsTrigger value="discounts">Скидки</TabsTrigger>
                <TabsTrigger value="regional">Регионы</TabsTrigger>
                <TabsTrigger value="calculator">Калькулятор</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Название услуги</label>
                    <Input defaultValue={currentRule?.name} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Базовая цена (₽)</label>
                    <Input 
                      type="number" 
                      defaultValue={currentRule?.basePrice}
                      className="text-lg font-bold"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Тип услуги</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="seo-article">SEO статья</option>
                    <option value="landing">Лендинг</option>
                    <option value="email">Email-маркетинг</option>
                    <option value="social">SMM</option>
                  </select>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Предпросмотр цены</h4>
                  <div className="text-3xl font-bold text-blue-600">
                    ₽{currentRule?.basePrice.toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-700">Базовая цена без модификаторов</div>
                </div>
              </TabsContent>
              
              <TabsContent value="multipliers" className="space-y-4">
                <div>
                  <h3 className="font-medium mb-3">Ценовые множители</h3>
                  <div className="space-y-3">
                    {currentRule && Object.entries(currentRule.multipliers).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <Input 
                            placeholder="Название параметра" 
                            defaultValue={key}
                            className="mb-2"
                          />
                        </div>
                        <div className="w-32">
                          <Input 
                            type="number" 
                            step="0.1"
                            defaultValue={value}
                            className="text-center font-mono"
                          />
                        </div>
                        <div className="text-sm text-slate-600">
                          x{value}
                        </div>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <UnifiedButton variant="outline" className="mt-3">
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить множитель
                  </UnifiedButton>
                </div>
              </TabsContent>
              
              <TabsContent value="discounts" className="space-y-4">
                <div>
                  <h3 className="font-medium mb-3">Промокоды и скидки</h3>
                  <div className="space-y-3">
                    {currentRule?.discounts.map((discount, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <Input 
                            placeholder="Код промокода" 
                            defaultValue={discount.code}
                          />
                        </div>
                        <div className="w-24">
                          <Input 
                            type="number" 
                            defaultValue={discount.percent}
                            className="text-center"
                          />
                        </div>
                        <Percent className="w-4 h-4 text-slate-500" />
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <UnifiedButton variant="outline" className="mt-3">
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить промокод
                  </UnifiedButton>
                </div>
              </TabsContent>
              
              <TabsContent value="regional" className="space-y-4">
                <div className="text-center py-8 text-slate-500">
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <p>Региональное ценообразование</p>
                  <p className="text-sm">Настройка цен для разных регионов</p>
                </div>
              </TabsContent>
              
              <TabsContent value="calculator" className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-3">Параметры заказа</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm mb-2">Срочность</label>
                        <select className="w-full p-2 border rounded-md">
                          <option value="">Стандартные сроки</option>
                          <option value="urgency">Срочно (+50%)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Сложность</label>
                        <select className="w-full p-2 border rounded-md">
                          <option value="">Стандартная</option>
                          <option value="complexity">Высокая (+30%)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm mb-2">Объем</label>
                        <select className="w-full p-2 border rounded-md">
                          <option value="">Стандартный</option>
                          <option value="volume">Увеличенный (+20%)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Расчет стоимости</h3>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-sm text-green-700 mb-2">Базовая цена</div>
                      <div className="text-lg font-mono">₽{currentRule?.basePrice.toLocaleString()}</div>
                      
                      <div className="text-sm text-green-700 mb-2 mt-4">С модификаторами</div>
                      <div className="text-2xl font-bold text-green-600">
                        ₽{calculatePrice(currentRule?.basePrice || 0, ['urgency', 'complexity']).toLocaleString()}
                      </div>
                      
                      <div className="text-xs text-green-600 mt-2">
                        Срочность +50%, Сложность +30%
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
