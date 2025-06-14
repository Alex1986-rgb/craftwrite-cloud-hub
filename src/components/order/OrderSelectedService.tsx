
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, DollarSign, Target, Lightbulb } from "lucide-react";
import { Service } from "@/data/services";

interface OrderSelectedServiceProps {
  serviceName: string;
  serviceDetails?: Service;
}

export default function OrderSelectedService({ serviceName, serviceDetails }: OrderSelectedServiceProps) {
  if (!serviceDetails) {
    return (
      <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h3 className="font-bold text-green-800">Выбрана услуга</h3>
            <p className="text-sm text-green-600">{serviceName}</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 shadow-lg">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main service info */}
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-green-800">{serviceDetails.name}</h3>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {serviceDetails.category}
                </Badge>
              </div>
              <p className="text-green-700 mb-3">{serviceDetails.desc}</p>
              <p className="text-sm text-green-600">{serviceDetails.detail}</p>
            </div>
          </div>
        </div>

        {/* Service metrics */}
        <div className="lg:w-80">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
            {/* Price range */}
            <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-700">Стоимость</div>
                <div className="text-xs text-slate-600">
                  {serviceDetails.price.min.toLocaleString()}-{serviceDetails.price.max.toLocaleString()} {serviceDetails.price.currency}
                </div>
              </div>
            </div>

            {/* Delivery time */}
            <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-700">Срок</div>
                <div className="text-xs text-slate-600">
                  {serviceDetails.deliveryTime.min === serviceDetails.deliveryTime.max 
                    ? `${serviceDetails.deliveryTime.min} ${serviceDetails.deliveryTime.unit}`
                    : `${serviceDetails.deliveryTime.min}-${serviceDetails.deliveryTime.max} ${serviceDetails.deliveryTime.unit}`
                  }
                </div>
              </div>
            </div>

            {/* Features count */}
            <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-700">Включено</div>
                <div className="text-xs text-slate-600">{serviceDetails.features.length} услуг</div>
              </div>
            </div>
          </div>

          {/* Key recommendations */}
          {serviceDetails.recs.length > 0 && (
            <div className="mt-4 p-3 bg-white/60 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-semibold text-slate-700">Ключевые рекомендации</span>
              </div>
              <ul className="text-xs text-slate-600 space-y-1">
                {serviceDetails.recs.slice(0, 3).map((rec, index) => (
                  <li key={index}>• {rec}</li>
                ))}
                {serviceDetails.recs.length > 3 && (
                  <li className="text-slate-500 font-medium">• еще {serviceDetails.recs.length - 3} рекомендаций</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
