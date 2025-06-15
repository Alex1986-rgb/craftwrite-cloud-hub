
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Zap, TrendingUp } from 'lucide-react';
import { SERVICES } from '@/data/services';

interface OrderFormServiceProps {
  filteredServices: string[];
  selectedService: string;
  onServiceSelect: (service: string) => void;
  variant?: 'public' | 'client';
}

export default function OrderFormService({
  selectedService,
  onServiceSelect,
  variant = 'public'
}: OrderFormServiceProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = SERVICES.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Выберите услугу
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Что именно вам нужно? Выберите тип контента из нашего каталога
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          type="text"
          placeholder="Поиск услуг..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((service) => (
          <Card
            key={service.slug}
            className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedService === service.name
                ? variant === 'client'
                  ? 'ring-2 ring-brand-500 bg-brand-50 dark:bg-brand-900/20'
                  : 'ring-2 ring-blue-500 bg-blue-50'
                : 'hover:shadow-md'
            }`}
            onClick={() => onServiceSelect(service.name)}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                {service.name}
              </h3>
              <Badge variant="secondary" className="text-xs">
                ₽{service.price.min.toLocaleString()}+
              </Badge>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
              {service.desc}
            </p>
            
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{service.deliveryTime.min}-{service.deliveryTime.max} {service.deliveryTime.unit}</span>
              {service.popularity >= 4 && (
                <div className="flex items-center gap-1 text-orange-500">
                  <TrendingUp className="w-3 h-3" />
                  <span>Популярно</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-500 dark:text-slate-400">
            Услуги не найдены. Попробуйте изменить поисковый запрос.
          </p>
        </div>
      )}
    </div>
  );
}
