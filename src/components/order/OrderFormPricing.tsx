
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Clock, Star, Shield } from "lucide-react";

interface OrderFormPricingProps {
  service: string;
  deadline: string;
  estimatedPrice: number;
}

export default function OrderFormPricing({ 
  service, 
  deadline, 
  estimatedPrice 
}: OrderFormPricingProps) {
  const getServicePrice = (serviceName: string) => {
    const prices: Record<string, number> = {
      "SEO-статья": 3000,
      "Лендинг": 8000,
      "Описание товара": 1500,
      "Пост в соцсети": 800,
      "Email-рассылка": 2500,
      "Презентация": 5000,
      "Веб-контент": 4000,
      "Техническая документация": 6000,
    };
    return prices[serviceName] || 5000;
  };

  const basePrice = service ? getServicePrice(service) : 0;
  const deadlineMultiplier = deadline === "urgent" ? 1.5 : deadline === "express" ? 2 : 1;
  const finalPrice = Math.round(basePrice * deadlineMultiplier);

  return (
    <Card className="p-6 bg-gradient-to-br from-white to-slate-50 border-2 border-primary/20 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Расчет стоимости
        </h3>
      </div>

      {service ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <span className="text-sm text-slate-600">Базовая стоимость:</span>
            <span className="font-semibold">{basePrice.toLocaleString()} ₽</span>
          </div>

          {deadlineMultiplier > 1 && (
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="text-sm text-orange-600 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Срочность ({deadline}):
              </span>
              <span className="font-semibold text-orange-600">×{deadlineMultiplier}</span>
            </div>
          )}

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Итого:</span>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{finalPrice.toLocaleString()} ₽</div>
                <div className="text-xs text-slate-500">от {Math.round(finalPrice * 0.8).toLocaleString()} ₽</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <Badge variant="secondary" className="justify-center py-2">
              <Star className="w-3 h-3 mr-1" />
              Качество
            </Badge>
            <Badge variant="secondary" className="justify-center py-2">
              <Shield className="w-3 h-3 mr-1" />
              Гарантия
            </Badge>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-8 h-8 text-slate-400" />
          </div>
          <p className="text-slate-500">Выберите услугу для расчета стоимости</p>
        </div>
      )}

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="text-sm text-green-700">
          <div className="font-semibold mb-2">✅ В стоимость включено:</div>
          <ul className="space-y-1 text-xs">
            <li>• Уникальный контент</li>
            <li>• 2 правки бесплатно</li>
            <li>• Проверка на плагиат</li>
            <li>• Техническая поддержка</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
