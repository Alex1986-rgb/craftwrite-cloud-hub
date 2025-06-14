
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, Clock, Shield } from "lucide-react";

const serviceTypes = [
  { value: "seo-article", label: "SEO-статья", basePrice: 800, unit: "за 1000 знаков" },
  { value: "product-description", label: "Описание товара", basePrice: 150, unit: "за товар" },
  { value: "landing", label: "Продающий лендинг", basePrice: 5000, unit: "за страницу" },
  { value: "social-post", label: "Пост для соцсетей", basePrice: 300, unit: "за пост" },
  { value: "email", label: "Email-рассылка", basePrice: 800, unit: "за письмо" },
  { value: "blog-post", label: "Блог-пост", basePrice: 1200, unit: "за статью" }
];

const urgencyMultipliers = [
  { value: "standard", label: "Стандартный (3-5 дней)", multiplier: 1 },
  { value: "fast", label: "Быстрый (1-2 дня)", multiplier: 1.5 },
  { value: "urgent", label: "Срочный (24 часа)", multiplier: 2 },
  { value: "express", label: "Экспресс (12 часов)", multiplier: 2.5 }
];

const complexityMultipliers = [
  { value: "simple", label: "Простой", multiplier: 0.8 },
  { value: "medium", label: "Средний", multiplier: 1 },
  { value: "complex", label: "Сложный", multiplier: 1.3 },
  { value: "expert", label: "Экспертный", multiplier: 1.6 }
];

export default function PriceCalculator() {
  const [serviceType, setServiceType] = useState("");
  const [quantity, setQuantity] = useState([1]);
  const [urgency, setUrgency] = useState("");
  const [complexity, setComplexity] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (serviceType && urgency && complexity) {
      const service = serviceTypes.find(s => s.value === serviceType);
      const urgencyMult = urgencyMultipliers.find(u => u.value === urgency);
      const complexityMult = complexityMultipliers.find(c => c.value === complexity);

      if (service && urgencyMult && complexityMult) {
        const baseTotal = service.basePrice * quantity[0];
        const withUrgency = baseTotal * urgencyMult.multiplier;
        const final = withUrgency * complexityMult.multiplier;
        setTotalPrice(Math.round(final));
      }
    }
  }, [serviceType, quantity, urgency, complexity]);

  const selectedService = serviceTypes.find(s => s.value === serviceType);
  const selectedUrgency = urgencyMultipliers.find(u => u.value === urgency);
  const selectedComplexity = complexityMultipliers.find(c => c.value === complexity);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
          <Calculator className="w-5 h-5 mr-2" />
          Калькулятор стоимости
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Рассчитайте стоимость вашего проекта
        </h2>
        <p className="text-lg text-muted-foreground">
          Получите точную оценку стоимости за несколько кликов
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Форма расчета */}
        <Card className="p-8 bg-gradient-to-br from-white to-slate-50/50 border-0 shadow-lg">
          <div className="space-y-6">
            <div>
              <Label htmlFor="service-type" className="text-base font-semibold mb-3 block">
                Тип услуги
              </Label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Выберите тип услуги" />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      <div>
                        <div className="font-medium">{service.label}</div>
                        <div className="text-sm text-muted-foreground">
                          от {service.basePrice}₽ {service.unit}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-base font-semibold mb-3 block">
                Количество: {quantity[0]}
              </Label>
              <Slider
                value={quantity}
                onValueChange={setQuantity}
                max={20}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>1</span>
                <span>20</span>
              </div>
            </div>

            <div>
              <Label htmlFor="urgency" className="text-base font-semibold mb-3 block">
                Срочность
              </Label>
              <Select value={urgency} onValueChange={setUrgency}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Выберите срочность" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyMultipliers.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center justify-between w-full">
                        <span>{option.label}</span>
                        {option.multiplier > 1 && (
                          <Badge variant="secondary" className="ml-2">
                            +{Math.round((option.multiplier - 1) * 100)}%
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="complexity" className="text-base font-semibold mb-3 block">
                Сложность
              </Label>
              <Select value={complexity} onValueChange={setComplexity}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Выберите сложность" />
                </SelectTrigger>
                <SelectContent>
                  {complexityMultipliers.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center justify-between w-full">
                        <span>{option.label}</span>
                        {option.multiplier !== 1 && (
                          <Badge variant="secondary" className="ml-2">
                            {option.multiplier > 1 ? '+' : ''}{Math.round((option.multiplier - 1) * 100)}%
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Результат расчета */}
        <Card className="p-8 bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20">
          <h3 className="text-2xl font-bold mb-6 text-foreground">
            Расчет стоимости
          </h3>

          {totalPrice > 0 ? (
            <div className="space-y-6">
              <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="text-4xl font-bold text-primary mb-2">
                  {totalPrice.toLocaleString()}₽
                </div>
                <div className="text-muted-foreground">
                  Итоговая стоимость
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/60 rounded-xl">
                  <span className="font-medium">Услуга:</span>
                  <span>{selectedService?.label}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/60 rounded-xl">
                  <span className="font-medium">Количество:</span>
                  <span>{quantity[0]}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/60 rounded-xl">
                  <span className="font-medium">Срочность:</span>
                  <span>{selectedUrgency?.label}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/60 rounded-xl">
                  <span className="font-medium">Сложность:</span>
                  <span>{selectedComplexity?.label}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-white/60 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <div className="text-sm font-medium">Качество</div>
                </div>
                <div className="p-3 bg-white/60 rounded-xl">
                  <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <div className="text-sm font-medium">В срок</div>
                </div>
                <div className="p-3 bg-white/60 rounded-xl">
                  <Shield className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <div className="text-sm font-medium">Гарантия</div>
                </div>
              </div>

              <Button size="lg" className="w-full">
                Заказать за {totalPrice.toLocaleString()}₽
              </Button>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calculator className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Выберите параметры для расчета стоимости
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
