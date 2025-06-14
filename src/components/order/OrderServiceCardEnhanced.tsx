
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, DollarSign, CheckCircle, ArrowRight, Target, Zap } from "lucide-react";
import { Service } from "@/data/services";

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
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Простая": return "bg-green-100 text-green-700 border-green-200";
      case "Средняя": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Сложная": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Экспертная": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Продающие тексты": return <Target className="w-4 h-4" />;
      case "Контент-маркетинг": return <Zap className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  return (
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-700 bg-gradient-to-br from-white via-white to-slate-50/30 hover:scale-105 hover:-translate-y-2">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Popularity indicator */}
      {service.popularity >= 4 && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 shadow-lg">
            <Star className="w-3 h-3 mr-1 fill-current" />
            ТОП
          </Badge>
        </div>
      )}

      <div className="p-6 relative z-10">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
            {getCategoryIcon(service.category)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 leading-tight">
              {service.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                {service.category}
              </Badge>
              <Badge variant="outline" className={`text-xs ${getDifficultyColor(service.difficulty)}`}>
                {service.difficulty}
              </Badge>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">
          {service.desc}
        </p>

        {/* Key features */}
        <div className="mb-4">
          <div className="text-xs font-medium text-slate-700 mb-2">Включено:</div>
          <div className="grid grid-cols-1 gap-1">
            {service.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-slate-600">
                <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
            {service.features.length > 3 && (
              <div className="text-xs text-blue-600 font-medium">
                + еще {service.features.length - 3} услуг
              </div>
            )}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
            <DollarSign className="w-4 h-4 text-green-600" />
            <div>
              <div className="text-xs text-green-600">от</div>
              <div className="text-sm font-bold text-green-800">
                {service.price.min.toLocaleString()} ₽
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
            <Clock className="w-4 h-4 text-blue-600" />
            <div>
              <div className="text-xs text-blue-600">срок</div>
              <div className="text-sm font-bold text-blue-800">
                {service.deliveryTime.min === service.deliveryTime.max 
                  ? `${service.deliveryTime.min} ${service.deliveryTime.unit}`
                  : `${service.deliveryTime.min}-${service.deliveryTime.max} ${service.deliveryTime.unit}`
                }
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {service.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-slate-100 text-slate-600">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onLearnMore}
            className="flex-1 border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300"
          >
            Подробнее
          </Button>
          <Button 
            onClick={onSelect}
            size="sm" 
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            Выбрать
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        {/* Popularity stars */}
        <div className="flex items-center justify-center gap-1 mt-3 pt-3 border-t border-slate-100">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-3 h-3 ${
                i < service.popularity 
                  ? "text-yellow-400 fill-current" 
                  : "text-slate-300"
              }`} 
            />
          ))}
          <span className="text-xs text-slate-500 ml-1">
            {service.popularity}/5
          </span>
        </div>
      </div>
    </Card>
  );
}
