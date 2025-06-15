import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Clock, Star, Shield, TrendingUp, CheckCircle } from "lucide-react";
import { Service } from "@/data/types/service";

interface OrderFormPricingProps {
  service: string;
  deadline: string;
  estimatedPrice: number;
  deliveryTime?: string;
  serviceDetails?: Service;
  variant?: 'public' | 'client';
}

export default function OrderFormPricing({ 
  service, 
  deadline, 
  estimatedPrice,
  deliveryTime,
  serviceDetails,
  variant = 'public'
}: OrderFormPricingProps) {
  const getBasePrice = () => {
    if (!serviceDetails) return 5000;
    return serviceDetails.price.min;
  };

  const basePrice = getBasePrice();
  const deadlineMultiplier = deadline === "urgent" ? 1.5 : deadline === "express" ? 2 : 1;
  const deadlineSurcharge = Math.round(basePrice * (deadlineMultiplier - 1));

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
          {/* Service info */}
          {serviceDetails && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-blue-800">{serviceDetails.name}</h4>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  {serviceDetails.category}
                </Badge>
              </div>
              <p className="text-sm text-blue-700">{serviceDetails.desc}</p>
            </div>
          )}

          {/* Price breakdown */}
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">Базовая стоимость:</span>
              <span className="font-semibold">{basePrice.toLocaleString()} ₽</span>
            </div>

            {deadlineMultiplier > 1 && (
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-sm text-orange-600 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Доплата за срочность:
                </span>
                <span className="font-semibold text-orange-600">+{deadlineSurcharge.toLocaleString()} ₽</span>
              </div>
            )}

            {/* Delivery time */}
            {deliveryTime && (
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-green-600 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Срок выполнения:
                </span>
                <span className="font-semibold text-green-600">{deliveryTime}</span>
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Итого:</span>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{estimatedPrice.toLocaleString()} ₽</div>
                {serviceDetails && (
                  <div className="text-xs text-slate-500">
                    от {serviceDetails.price.min.toLocaleString()} до {serviceDetails.price.max.toLocaleString()} ₽
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Features included */}
          {serviceDetails && serviceDetails.features.length > 0 && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-sm text-green-700">
                <div className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  В стоимость включено:
                </div>
                <ul className="space-y-1 text-xs">
                  {serviceDetails.features.slice(0, 4).map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                  {serviceDetails.features.length > 4 && (
                    <li className="text-green-600 font-medium">• и еще {serviceDetails.features.length - 4} услуг</li>
                  )}
                </ul>
              </div>
            </div>
          )}

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
    </Card>
  );
}
