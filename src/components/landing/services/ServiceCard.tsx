
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, CheckCircle, Star } from "lucide-react";
import type { Service } from "@/data/types/service";

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Простая": return "from-green-500 to-emerald-600";
      case "Средняя": return "from-blue-500 to-cyan-600";
      case "Сложная": return "from-orange-500 to-red-600";
      case "Экспертная": return "from-purple-500 to-pink-600";
      default: return "from-gray-500 to-slate-600";
    }
  };

  const formatPrice = () => {
    if (service.price.min === service.price.max) {
      return `${service.price.min}${service.price.currency}`;
    }
    return `от ${service.price.min}${service.price.currency}`;
  };

  return (
    <div
      className="group relative bg-gradient-to-br from-white/90 via-white/70 to-white/50 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Card background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-purple-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        {/* Category and Difficulty */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {service.category}
          </span>
          <div className={`bg-gradient-to-r ${getDifficultyColor(service.difficulty)} text-white px-2 py-1 rounded-full text-xs font-semibold`}>
            {service.difficulty}
          </div>
        </div>
        
        {/* Title and Price */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 leading-tight flex-1 mr-2">
            {service.name}
          </h3>
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-2 py-1 rounded-lg text-xs font-semibold shadow-md">
            {formatPrice()}
          </div>
        </div>
        
        {/* Description */}
        <p className="text-slate-600 leading-relaxed mb-4 text-sm">
          {service.desc}
        </p>
        
        {/* Features */}
        <div className="space-y-1 mb-4">
          {service.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
              <CheckCircle className="w-3 h-3 text-emerald-500 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Popularity Stars */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-3 h-3 ${i < service.popularity ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
            />
          ))}
          <span className="text-xs text-slate-500 ml-1">({service.popularity}/5)</span>
        </div>

        {/* Delivery Time */}
        <div className="text-xs text-slate-500 mb-4">
          Срок: {service.deliveryTime.min === service.deliveryTime.max 
            ? `${service.deliveryTime.min} ${service.deliveryTime.unit}`
            : `${service.deliveryTime.min}-${service.deliveryTime.max} ${service.deliveryTime.unit}`
          }
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            asChild 
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 border-0 rounded-xl py-2 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
          >
            <Link to="/order" className="flex items-center justify-center gap-2">
              <Zap className="w-3 h-3" />
              Заказать
            </Link>
          </Button>
          
          <Button 
            asChild 
            variant="outline"
            size="sm"
            className="rounded-xl border-2 hover:bg-slate-50"
          >
            <Link to={`/service/${service.slug}`} className="flex items-center gap-1">
              Подробнее
              <ArrowRight className="w-3 h-3" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
