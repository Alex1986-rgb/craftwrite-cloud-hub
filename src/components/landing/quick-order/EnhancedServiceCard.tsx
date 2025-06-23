
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Star, Zap, TrendingUp } from 'lucide-react';
import { QuickOrderService } from '@/data/quickOrderServices';

interface EnhancedServiceCardProps {
  service: QuickOrderService;
  isSelected: boolean;
  onClick: () => void;
}

export default function EnhancedServiceCard({ 
  service, 
  isSelected, 
  onClick 
}: EnhancedServiceCardProps) {
  const getCategoryIcon = (category: string) => {
    const icons = {
      content: '📝',
      sales: '💰',
      email: '📧',
      social: '📱',
      web: '🌐',
      ecommerce: '🛒',
      automation: '🤖'
    };
    return icons[category as keyof typeof icons] || '📋';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      content: 'text-blue-600 bg-blue-50 border-blue-200',
      sales: 'text-green-600 bg-green-50 border-green-200',
      email: 'text-purple-600 bg-purple-50 border-purple-200',
      social: 'text-pink-600 bg-pink-50 border-pink-200',
      web: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      ecommerce: 'text-orange-600 bg-orange-50 border-orange-200',
      automation: 'text-gray-600 bg-gray-50 border-gray-200'
    };
    return colors[category as keyof typeof colors] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  return (
    <Card
      onClick={onClick}
      className={`relative p-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
        isSelected
          ? 'border-2 border-blue-500 bg-blue-50 shadow-md'
          : 'border hover:border-blue-300'
      }`}
    >
      {/* Badges */}
      <div className="absolute -top-2 -right-2 flex gap-1">
        {service.popular && (
          <Badge className="bg-green-500 text-white text-xs px-2 py-1">
            <Star className="w-3 h-3 mr-1" />
            Популярно
          </Badge>
        )}
        {service.urgent && (
          <Badge className="bg-red-500 text-white text-xs px-2 py-1">
            <Zap className="w-3 h-3 mr-1" />
            Срочно
          </Badge>
        )}
      </div>

      {/* Category badge */}
      <div className="mb-3">
        <Badge 
          variant="outline" 
          className={`text-xs ${getCategoryColor(service.category)}`}
        >
          <span className="mr-1">{getCategoryIcon(service.category)}</span>
          {service.category}
        </Badge>
      </div>

      {/* Service info */}
      <div className="space-y-2">
        <h4 className="font-semibold text-slate-800 text-base">
          {service.name}
        </h4>
        
        {service.description && (
          <p className="text-sm text-slate-600 leading-relaxed">
            {service.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="text-blue-600 font-bold text-lg">
            {service.priceRange}
          </div>
          
          {service.estimatedTime && (
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Clock className="w-3 h-3" />
              {service.estimatedTime}
            </div>
          )}
        </div>

        {/* Selection indicator */}
        {isSelected && (
          <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Выбрано
          </div>
        )}
      </div>

      {/* Hover effect overlay */}
      <div className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
        isSelected 
          ? 'bg-blue-500/5 opacity-100' 
          : 'bg-blue-500/0 opacity-0 hover:opacity-100 hover:bg-blue-500/5'
      }`} />
    </Card>
  );
}
