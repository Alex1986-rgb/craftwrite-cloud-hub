
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Clock, Star, Shield, TrendingUp, CheckCircle } from "lucide-react";
import { Service } from "@/data/services";

interface OrderFormPricingProps {
  service: string;
  deadline: string;
  estimatedPrice: number;
  deliveryTime?: string;
  serviceDetails?: Service;
}

export default function OrderFormPricing({ 
  service, 
  deadline, 
  estimatedPrice,
  deliveryTime,
  serviceDetails
}: OrderFormPricingProps) {
  const getBasePrice = () => {
    if (!serviceDetails) return 5000;
    return serviceDetails.price.min;
  };

  const basePrice = getBasePrice();
  const deadlineMultiplier = deadline === "urgent" ? 1.5 : deadline === "express" ? 2 : 1;
  const deadlineSurcharge = Math.round(basePrice * (deadlineMultiplier - 1));

  return (
    <section aria-labelledby="pricing-heading">
      <Card className="p-6 bg-gradient-to-br from-white to-slate-50 border-2 border-primary/20 shadow-xl">
        <header className="flex items-center gap-3 mb-6">
          <div 
            className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center"
            role="img"
            aria-label="Иконка калькулятора"
          >
            <Calculator className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <h3 
            id="pricing-heading"
            className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
          >
            Расчет стоимости
          </h3>
        </header>

        {service ? (
          <div className="space-y-4" role="group" aria-label="Детали расчета стоимости">
            {/* Service info */}
            {serviceDetails && (
              <article className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <header className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-blue-800">{serviceDetails.name}</h4>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {serviceDetails.category}
                  </Badge>
                </header>
                <p className="text-sm text-blue-700">{serviceDetails.desc}</p>
              </article>
            )}

            {/* Price breakdown */}
            <div className="space-y-3" role="group" aria-label="Разбивка стоимости">
              <div 
                className="flex justify-between items-center p-3 bg-slate-50 rounded-lg"
                role="group"
                aria-label="Базовая стоимость услуги"
              >
                <span className="text-sm text-slate-600">Базовая стоимость:</span>
                <span className="font-semibold" aria-label={`${basePrice.toLocaleString()} рублей`}>
                  {basePrice.toLocaleString()} ₽
                </span>
              </div>

              {deadlineMultiplier > 1 && (
                <div 
                  className="flex justify-between items-center p-3 bg-orange-50 rounded-lg"
                  role="group"
                  aria-label="Дополнительная плата за срочность"
                >
                  <span className="text-sm text-orange-600 flex items-center gap-2">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    Доплата за срочность:
                  </span>
                  <span 
                    className="font-semibold text-orange-600"
                    aria-label={`Дополнительно ${deadlineSurcharge.toLocaleString()} рублей`}
                  >
                    +{deadlineSurcharge.toLocaleString()} ₽
                  </span>
                </div>
              )}

              {/* Delivery time */}
              {deliveryTime && (
                <div 
                  className="flex justify-between items-center p-3 bg-green-50 rounded-lg"
                  role="group"
                  aria-label="Информация о сроке выполнения"
                >
                  <span className="text-sm text-green-600 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" aria-hidden="true" />
                    Срок выполнения:
                  </span>
                  <span className="font-semibold text-green-600">{deliveryTime}</span>
                </div>
              )}
            </div>

            <footer className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Итого:</span>
                <div className="text-right">
                  <div 
                    className="text-2xl font-bold text-primary"
                    aria-label={`Итоговая стоимость ${estimatedPrice.toLocaleString()} рублей`}
                  >
                    {estimatedPrice.toLocaleString()} ₽
                  </div>
                  {serviceDetails && (
                    <div 
                      className="text-xs text-slate-500"
                      aria-label={`Диапазон цен от ${serviceDetails.price.min.toLocaleString()} до ${serviceDetails.price.max.toLocaleString()} рублей`}
                    >
                      от {serviceDetails.price.min.toLocaleString()} до {serviceDetails.price.max.toLocaleString()} ₽
                    </div>
                  )}
                </div>
              </div>
            </footer>

            {/* Features included */}
            {serviceDetails && serviceDetails.features.length > 0 && (
              <aside className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-sm text-green-700">
                  <div className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" aria-hidden="true" />
                    В стоимость включено:
                  </div>
                  <ul className="space-y-1 text-xs" role="list" aria-label="Список включенных услуг">
                    {serviceDetails.features.slice(0, 4).map((feature, index) => (
                      <li key={index} role="listitem">• {feature}</li>
                    ))}
                    {serviceDetails.features.length > 4 && (
                      <li className="text-green-600 font-medium" role="listitem">
                        • и еще {serviceDetails.features.length - 4} услуг
                      </li>
                    )}
                  </ul>
                </div>
              </aside>
            )}

            <div className="grid grid-cols-2 gap-2 mt-4" role="group" aria-label="Гарантии качества">
              <Badge variant="secondary" className="justify-center py-2">
                <Star className="w-3 h-3 mr-1" aria-hidden="true" />
                Качество
              </Badge>
              <Badge variant="secondary" className="justify-center py-2">
                <Shield className="w-3 h-3 mr-1" aria-hidden="true" />
                Гарантия
              </Badge>
            </div>
          </div>
        ) : (
          <div className="text-center py-8" role="status" aria-label="Калькулятор ожидает выбора услуги">
            <div 
              className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4"
              role="img"
              aria-label="Иконка калькулятора в ожидании"
            >
              <Calculator className="w-8 h-8 text-slate-400" aria-hidden="true" />
            </div>
            <p className="text-slate-500">Выберите услугу для расчета стоимости</p>
          </div>
        )}
      </Card>
    </section>
  );
}
