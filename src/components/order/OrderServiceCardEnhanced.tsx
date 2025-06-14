
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Clock, Star, TrendingUp, Users, ChevronRight, Info } from "lucide-react";
import { Service } from "@/data/types/service";

interface OrderServiceCardEnhancedProps {
  service: Service;
  onSelect: () => void;
  onLearnMore: () => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'text-green-600 bg-green-50 border-green-200';
    case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'hard': return 'text-red-600 bg-red-50 border-red-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

const getDifficultyText = (difficulty: string) => {
  switch (difficulty) {
    case 'easy': return 'Простая';
    case 'medium': return 'Средняя';
    case 'hard': return 'Сложная';
    default: return 'Не указана';
  }
};

const getCategoryIcon = (category: string) => {
  // Здесь можно добавить специфические иконки для категорий
  return '📝'; // Пока используем эмодзи как placeholder
};

export default function OrderServiceCardEnhanced({ service, onSelect, onLearnMore }: OrderServiceCardEnhancedProps) {
  const popularityPercentage = (service.popularity / 5) * 100;
  
  return (
    <Card className="group relative overflow-hidden border-2 hover:border-blue-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/95 backdrop-blur-sm h-full flex flex-col">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
      
      <CardHeader className="relative z-10 pb-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl" role="img" aria-label={`Иконка категории ${service.category}`}>
              {getCategoryIcon(service.category)}
            </span>
            <Badge 
              variant="secondary" 
              className={`text-xs px-2 py-1 font-medium ${getDifficultyColor(service.difficulty)}`}
              aria-label={`Сложность: ${getDifficultyText(service.difficulty)}`}
            >
              {getDifficultyText(service.difficulty)}
            </Badge>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded-full">
            <Users className="w-3 h-3" aria-hidden="true" />
            <span className="font-medium" aria-label={`Рейтинг популярности: ${service.popularity} из 5`}>
              {service.popularity}/5
            </span>
          </div>
        </div>
        
        <CardTitle className="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-blue-700 transition-colors">
          {service.name}
        </CardTitle>
        
        <CardDescription className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {service.desc}
        </CardDescription>
      </CardHeader>

      <CardContent className="relative z-10 flex-1 space-y-4">
        {/* Popularity indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" aria-hidden="true" />
              Популярность
            </span>
            <span className="font-medium text-gray-800">{popularityPercentage.toFixed(0)}%</span>
          </div>
          <Progress 
            value={popularityPercentage} 
            className="h-2 bg-gray-100"
            aria-label={`Популярность услуги: ${popularityPercentage.toFixed(0)}%`}
          />
        </div>

        <Separator className="my-4" />

        {/* Tags */}
        {service.tags && service.tags.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Ключевые особенности:</h4>
            <div className="flex flex-wrap gap-1">
              {service.tags.slice(0, 3).map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs px-2 py-1 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
              {service.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-1 bg-gray-50 text-gray-600 border-gray-200">
                  +{service.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Pricing */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Стоимость:</span>
            <div className="flex items-center gap-1 text-xs text-blue-600">
              <Clock className="w-3 h-3" aria-hidden="true" />
              <span>от {service.deliveryTime.min} дн.</span>
            </div>
          </div>
          
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              {service.price.min.toLocaleString('ru-RU')} ₽
            </span>
            {service.price.max > service.price.min && (
              <span className="text-sm text-gray-600">
                — {service.price.max.toLocaleString('ru-RU')} ₽
              </span>
            )}
          </div>
          
          <p className="text-xs text-gray-600 mt-1">
            Итоговая стоимость зависит от объема и сложности задачи
          </p>
        </div>
      </CardContent>

      <CardFooter className="relative z-10 pt-4 flex flex-col gap-2">
        <Button 
          onClick={onSelect}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 group-hover:shadow-lg"
          aria-label={`Заказать ${service.name}`}
        >
          <span>Заказать сейчас</span>
          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onLearnMore}
          className="w-full border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-all duration-300"
          aria-label={`Подробнее о ${service.name}`}
        >
          <Info className="w-4 h-4 mr-2" aria-hidden="true" />
          Подробнее
        </Button>
      </CardFooter>
    </Card>
  );
}
