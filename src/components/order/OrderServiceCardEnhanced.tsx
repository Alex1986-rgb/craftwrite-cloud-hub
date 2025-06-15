
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Star, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle, 
  Eye,
  Zap,
  Target,
  DollarSign
} from "lucide-react";
import type { Service } from "@/data/types/service";

interface OrderServiceCardEnhancedProps {
  service: Service;
  onSelect: () => void;
  onLearnMore: () => void;
}

export default function OrderServiceCardEnhanced({ 
  service, 
  onSelect, 
  onLearnMore 
}: OrderServiceCardEnhancedProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Простая": return "bg-green-100 text-green-800 border-green-200";
      case "Средняя": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Сложная": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Экспертная": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleAdvancedOrder = () => {
    navigate(`/order/${service.slug}`);
  };

  return (
    <Card 
      className={`group relative overflow-hidden border-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
        isHovered ? 'border-blue-300 shadow-lg' : 'border-slate-200'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popularity indicator */}
      {service.popularity >= 4 && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
            <TrendingUp className="w-3 h-3 mr-1" />
            Популярно
          </Badge>
        </div>
      )}

      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-50/40 to-purple-50/20 transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />

      <CardHeader className="relative pb-3">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
              {service.name}
            </h3>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
            {service.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {service.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                {tag}
              </Badge>
            ))}
            {service.tags.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                +{service.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        {/* Key features */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-slate-700 flex items-center gap-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            Включено:
          </h4>
          <ul className="space-y-1">
            {service.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="text-sm text-slate-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 py-3 border-t border-slate-100">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-lg font-bold text-green-600">
              <DollarSign className="w-4 h-4" />
              {service.price.min.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500">от {service.price.currency}</div>
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

        {/* Difficulty badge */}
        <div className="flex justify-center">
          <Badge 
            variant="outline" 
            className={`${getDifficultyColor(service.difficulty)} border`}
          >
            <Target className="w-3 h-3 mr-1" />
            {service.difficulty}
          </Badge>
        </div>

        {/* Action buttons */}
        <div className="space-y-2 pt-2">
          <Button 
            onClick={handleAdvancedOrder}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 group"
          >
            <Zap className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Заказать с настройками
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onSelect}
              className="hover:bg-blue-50 hover:border-blue-300"
            >
              Быстрый заказ
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onLearnMore}
              className="hover:bg-slate-100"
            >
              <Eye className="w-4 h-4 mr-1" />
              Подробнее
            </Button>
          </div>
        </div>

        {/* Price range hint */}
        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            Стоимость: {service.price.min.toLocaleString()} - {service.price.max.toLocaleString()} {service.price.currency}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
