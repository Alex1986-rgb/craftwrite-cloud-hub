
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, DollarSign, Star } from "lucide-react";
import { Service } from "@/data/services";

interface OrderSelectedServiceProps {
  serviceName: string;
  serviceDetails?: Service;
  variant?: 'public' | 'client';
}

export default function OrderSelectedService({ 
  serviceName, 
  serviceDetails,
  variant = 'public'
}: OrderSelectedServiceProps) {
  if (!serviceDetails) return null;

  return (
    <Card className={`p-6 border-2 border-primary/20 shadow-lg ${
      variant === 'client' ? 'glass-card' : 'bg-gradient-to-br from-blue-50 to-indigo-50'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-xl font-bold text-primary">{serviceName}</h3>
          </div>
          <p className="text-neutral-600 dark:text-neutral-400">{serviceDetails.desc}</p>
        </div>
        <Badge className="bg-green-100 text-green-800 border-green-200">
          Выбрано
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 text-sm">
          <DollarSign className="w-4 h-4 text-green-500" />
          <span className="text-neutral-600 dark:text-neutral-400">от</span>
          <span className="font-semibold text-green-600">
            {serviceDetails.price.min.toLocaleString()} ₽
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Clock className="w-4 h-4 text-blue-500" />
          <span className="text-neutral-600 dark:text-neutral-400">
            {serviceDetails.deliveryTime.min}-{serviceDetails.deliveryTime.max} {serviceDetails.deliveryTime.unit}
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Star className="w-4 h-4 text-amber-500" />
          <span className="text-neutral-600 dark:text-neutral-400">
            Рейтинг {serviceDetails.popularity}/5
          </span>
        </div>
      </div>

      {serviceDetails.features.length > 0 && (
        <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
          <h4 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
            Что входит в услугу:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {serviceDetails.features.slice(0, 6).map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                {feature}
              </div>
            ))}
            {serviceDetails.features.length > 6 && (
              <div className="text-sm text-primary font-medium">
                + еще {serviceDetails.features.length - 6} возможностей
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}
