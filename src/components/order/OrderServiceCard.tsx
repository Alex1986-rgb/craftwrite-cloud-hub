
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Star, 
  ArrowRight, 
  Eye,
  ShoppingCart,
  DollarSign
} from "lucide-react";
import type { Service } from "@/data/types/service";

interface OrderServiceCardProps {
  service: Service;
}

export default function OrderServiceCard({ service }: OrderServiceCardProps) {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate(`/order/${service.slug}`);
  };

  const handleDetailsClick = () => {
    navigate(`/service/${service.slug}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Простая": return "bg-green-100 text-green-800 border-green-200";
      case "Средняя": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Сложная": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Экспертная": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 hover:border-blue-200">
      <CardHeader className="pb-3">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {service.name}
            </h3>
            <Badge 
              variant="outline" 
              className={`${getDifficultyColor(service.difficulty)} border text-xs`}
            >
              {service.difficulty}
            </Badge>
          </div>
          
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
            {service.desc}
          </p>

          <div className="flex flex-wrap gap-1">
            {service.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 py-3 border-t border-slate-100">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-lg font-bold text-green-600">
              <DollarSign className="w-4 h-4" />
              {service.price.min.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500">от ₽</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-lg font-bold text-blue-600">
              <Clock className="w-4 h-4" />
              {service.deliveryTime.min}
            </div>
            <div className="text-xs text-slate-500">{service.deliveryTime.unit}</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < service.popularity ? 'text-yellow-400 fill-current' : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-xs text-slate-500">рейтинг</div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-sm text-slate-700 mb-2">Включено:</h4>
            <ul className="space-y-1">
              {service.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="text-sm text-slate-600 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 pt-3">
            <Button 
              onClick={handleOrderClick}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-3 group"
            >
              <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Заказать услугу
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button 
              variant="outline" 
              onClick={handleDetailsClick}
              className="w-full hover:bg-blue-50 hover:border-blue-300 group"
            >
              <Eye className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Подробнее об услуге
            </Button>
          </div>

          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500">
              Стоимость: {service.price.min.toLocaleString()} - {service.price.max.toLocaleString()} ₽
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
