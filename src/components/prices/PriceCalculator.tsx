
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, ArrowRight, Zap } from "lucide-react";

const serviceTypes = {
  "seo-article": { name: "SEO-статья", basePrice: 15, unit: "за 1000 знаков" },
  "product-description": { name: "Описание товара", basePrice: 350, unit: "за описание" },
  "social-media": { name: "Посты для соцсетей", basePrice: 600, unit: "за пост" },
  "landing": { name: "Лендинг", basePrice: 8000, unit: "за страницу" },
  "email-campaign": { name: "Email-кампания", basePrice: 1200, unit: "за письмо" },
  "sales-text": { name: "Продающий текст", basePrice: 5000, unit: "за проект" }
};

const urgencyMultipliers = {
  "standard": { name: "Стандартные сроки (5-7 дней)", multiplier: 1 },
  "fast": { name: "Ускоренно (2-3 дня)", multiplier: 1.5 },
  "urgent": { name: "Срочно (24 часа)", multiplier: 2 }
};

const complexityMultipliers = {
  "simple": { name: "Простой", multiplier: 1 },
  "medium": { name: "Средний", multiplier: 1.3 },
  "complex": { name: "Сложный", multiplier: 1.6 }
};

export default function PriceCalculator() {
  const [serviceType, setServiceType] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [urgency, setUrgency] = useState("standard");
  const [complexity, setComplexity] = useState("medium");
  const [showResult, setShowResult] = useState(false);

  const calculatePrice = () => {
    if (!serviceType) return 0;
    
    const service = serviceTypes[serviceType as keyof typeof serviceTypes];
    const urgencyMult = urgencyMultipliers[urgency as keyof typeof urgencyMultipliers].multiplier;
    const complexityMult = complexityMultipliers[complexity as keyof typeof complexityMultipliers].multiplier;
    
    const baseTotal = service.basePrice * parseInt(quantity);
    const finalPrice = baseTotal * urgencyMult * complexityMult;
    
    return Math.round(finalPrice);
  };

  const handleCalculate = () => {
    setShowResult(true);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Калькулятор стоимости
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Рассчитайте примерную стоимость вашего проекта за несколько кликов
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-2xl border-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <Calculator className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold">Параметры проекта</h3>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service-type">Тип услуги *</Label>
                  <Select value={serviceType} onValueChange={setServiceType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип услуги" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(serviceTypes).map(([key, service]) => (
                        <SelectItem key={key} value={key}>
                          {service.name} ({service.unit})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Количество</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Срочность</Label>
                  <Select value={urgency} onValueChange={setUrgency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(urgencyMultipliers).map(([key, option]) => (
                        <SelectItem key={key} value={key}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complexity">Сложность проекта</Label>
                  <Select value={complexity} onValueChange={setComplexity}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(complexityMultipliers).map(([key, option]) => (
                        <SelectItem key={key} value={key}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleCalculate}
                  disabled={!serviceType}
                  className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                  size="lg"
                >
                  Рассчитать стоимость
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-primary/5 to-blue-50 rounded-xl p-6 border border-primary/10">
                  <h4 className="text-xl font-bold mb-4">Расчет стоимости</h4>
                  
                  {serviceType && (
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span>Базовая стоимость:</span>
                        <span className="font-semibold">
                          {serviceTypes[serviceType as keyof typeof serviceTypes].basePrice} ₽ × {quantity}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Коэффициент срочности:</span>
                        <span className="font-semibold">
                          ×{urgencyMultipliers[urgency as keyof typeof urgencyMultipliers].multiplier}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>Коэффициент сложности:</span>
                        <span className="font-semibold">
                          ×{complexityMultipliers[complexity as keyof typeof complexityMultipliers].multiplier}
                        </span>
                      </div>
                      
                      <hr className="my-4 border-primary/20" />
                      
                      {showResult && (
                        <div className="flex justify-between text-2xl font-bold text-primary animate-fade-in">
                          <span>Итого:</span>
                          <span>{calculatePrice().toLocaleString()} ₽</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {!serviceType && (
                    <p className="text-slate-600 text-center py-8">
                      Выберите тип услуги для расчета стоимости
                    </p>
                  )}
                </div>

                {showResult && serviceType && (
                  <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-200 animate-fade-in">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-5 h-5 text-emerald-600" />
                      <h5 className="font-bold text-emerald-800">Что входит в стоимость:</h5>
                    </div>
                    <ul className="text-sm text-emerald-700 space-y-1">
                      <li>• Профессиональное выполнение работы</li>
                      <li>• Проверка на уникальность</li>
                      <li>• 1 раунд бесплатных правок</li>
                      <li>• Техническое задание и консультации</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
