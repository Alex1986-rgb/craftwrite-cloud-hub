
import { CheckCircle, Edit3, Star, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface OrderSelectedServiceProps {
  serviceName: string;
}

const serviceDetails: Record<string, {
  description: string;
  features: string[];
  duration: string;
  rating: number;
}> = {
  "SEO-статья": {
    description: "Профессиональная SEO-оптимизированная статья для вашего сайта",
    features: ["Ключевые слова", "Мета-теги", "Внутренняя перелинковка"],
    duration: "3-5 дней",
    rating: 4.9
  },
  "Лендинг": {
    description: "Продающая страница с высокой конверсией",
    features: ["УТП", "CTA", "Социальные доказательства"],
    duration: "5-7 дней",
    rating: 4.8
  },
  "Описание товара": {
    description: "Убедительное описание для интернет-магазина",
    features: ["Характеристики", "Преимущества", "SEO-текст"],
    duration: "1-2 дня",
    rating: 4.9
  }
};

export default function OrderSelectedService({ serviceName }: OrderSelectedServiceProps) {
  const details = serviceDetails[serviceName] || {
    description: "Профессиональный контент высокого качества",
    features: ["Уникальность", "Качество", "Сроки"],
    duration: "3-5 дней",
    rating: 4.8
  };

  return (
    <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200/60 rounded-xl p-6 md:p-8 animate-fade-in shadow-lg">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
            <CheckCircle className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-sm font-medium text-green-700">Выбранная услуга:</div>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Star className="w-3 h-3 mr-1" />
                {details.rating}
              </Badge>
            </div>
            <div className="text-xl md:text-2xl font-bold text-green-800 mb-2">{serviceName}</div>
            <p className="text-green-700 mb-3">{details.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {details.features.map((feature, index) => (
                <Badge key={index} variant="outline" className="border-green-300 text-green-700">
                  {feature}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-green-600">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{details.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-4 h-4" />
                <span>Гарантия качества</span>
              </div>
            </div>
          </div>
        </div>
        
        <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-100 px-6 py-3">
          <Edit3 className="w-4 h-4 mr-2" />
          Изменить
        </Button>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="text-sm text-green-600 bg-green-100/50 rounded-lg p-4">
          <div className="font-semibold mb-2">💡 Совет по заполнению:</div>
          <p>Чем подробнее вы опишете задачу, тем точнее будет результат. Укажите целевую аудиторию, стиль и ключевые моменты.</p>
        </div>
        
        <div className="text-sm text-blue-600 bg-blue-100/50 rounded-lg p-4">
          <div className="font-semibold mb-2">🎯 Что мы учтем:</div>
          <p>Ваши бизнес-цели, особенности аудитории, фирменный стиль и требования к SEO-оптимизации.</p>
        </div>
      </div>
    </div>
  );
}
