
import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Info, 
  Filter, 
  RotateCcw, 
  Target, 
  Search, 
  Mail, 
  MessageSquare, 
  Globe,
  Table,
  Settings,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  BarChart3,
  Users,
  Zap,
  Heart,
  Eye,
  Star
} from 'lucide-react';
import { SmartFilter } from '@/types/advancedOrder';
import { COMMON_FILTERS, getServiceSpecificFilters } from '@/data/orderFiltersConfig';
import FilterInput from './filters/FilterInput';
import FilterRecommendations from './filters/FilterRecommendations';

interface SmartOrderFiltersProps {
  selectedService: any;
  filters: Record<string, any>;
  onFiltersChange: (filters: Record<string, any>) => void;
  className?: string;
}

const getServiceIcon = (serviceSlug: string) => {
  switch (serviceSlug) {
    case 'seo-article':
      return Search;
    case 'landing-page':
      return Target;
    case 'email-campaigns':
      return Mail;
    case 'telegram-content':
      return MessageSquare;
    default:
      return Globe;
  }
};

const getFilterIcon = (filterId: string) => {
  switch (filterId) {
    case 'topic':
    case 'landing_type':
    case 'email_type':
    case 'channel_type':
      return Target;
    case 'textLength':
    case 'keyword_density':
      return BarChart3;
    case 'writingStyle':
    case 'brandVoice':
      return Heart;
    case 'targetAudience':
    case 'segmentation':
      return Users;
    case 'priority':
    case 'urgency':
      return Zap;
    case 'seo_optimization':
    case 'conversion_elements':
      return TrendingUp;
    case 'personalization':
    case 'engagement_strategy':
      return Star;
    default:
      return Settings;
  }
};

const getPriceImpact = (filter: SmartFilter, value: any) => {
  if (!value) return null;
  
  if (filter.options) {
    const selectedOption = filter.options.find(opt => opt.value === value);
    if (selectedOption?.priceMultiplier && selectedOption.priceMultiplier > 1) {
      const increase = Math.round((selectedOption.priceMultiplier - 1) * 100);
      return `+${increase}%`;
    }
  }
  
  return null;
};

export default function SmartOrderFilters({ 
  selectedService, 
  filters, 
  onFiltersChange,
  className 
}: SmartOrderFiltersProps) {
  const [showRecommendations, setShowRecommendations] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState('general');

  const serviceSpecificFilters = useMemo(() => {
    return selectedService ? getServiceSpecificFilters(selectedService.slug) : [];
  }, [selectedService]);

  const updateFilter = (filterId: string, value: any) => {
    onFiltersChange({
      ...filters,
      [filterId]: value
    });
  };

  const resetFilters = () => {
    const defaultFilters: Record<string, any> = {};
    const allFilters = [...COMMON_FILTERS, ...serviceSpecificFilters];
    allFilters.forEach(filter => {
      if (filter.defaultValue !== undefined) {
        defaultFilters[filter.id] = filter.defaultValue;
      }
    });
    onFiltersChange(defaultFilters);
  };

  const toggleRecommendations = (filterId: string) => {
    setShowRecommendations(prev => ({
      ...prev,
      [filterId]: !prev[filterId]
    }));
  };

  const ServiceIcon = selectedService ? getServiceIcon(selectedService.slug) : Globe;

  const getFilterStats = () => {
    const allFilters = [...COMMON_FILTERS, ...serviceSpecificFilters];
    const configuredCount = allFilters.filter(filter => {
      const value = filters[filter.id];
      return value !== undefined && value !== null && value !== '' && 
             (!Array.isArray(value) || value.length > 0);
    }).length;
    
    return {
      total: allFilters.length,
      configured: configuredCount,
      percentage: Math.round((configuredCount / allFilters.length) * 100)
    };
  };

  const stats = getFilterStats();

  const renderAdvancedFilterCard = (filter: SmartFilter) => {
    const FilterIcon = getFilterIcon(filter.id);
    const value = filters[filter.id];
    const hasValue = value !== undefined && value !== null && value !== '' && 
                     (!Array.isArray(value) || value.length > 0);
    const priceImpact = getPriceImpact(filter, value);
    
    return (
      <Card key={filter.id} className={`relative overflow-hidden transition-all duration-200 hover:shadow-md ${
        hasValue ? 'border-l-4 border-l-green-500 bg-green-50/30' : 'border-l-4 border-l-gray-200'
      }`}>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${hasValue ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                  <FilterIcon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Label className="font-semibold text-base text-gray-900">{filter.name}</Label>
                    {filter.description && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-blue-600"
                        onClick={() => toggleRecommendations(filter.id)}
                      >
                        <Info className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  {filter.description && (
                    <p className="text-sm text-gray-600 mb-3">{filter.description}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {hasValue && (
                  <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Настроено
                  </Badge>
                )}
                {priceImpact && (
                  <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50">
                    <DollarSign className="w-3 h-3 mr-1" />
                    {priceImpact}
                  </Badge>
                )}
              </div>
            </div>

            <FilterInput
              filter={filter}
              value={value}
              onChange={(value) => updateFilter(filter.id, value)}
            />

            {filter.recommendations && showRecommendations[filter.id] && (
              <div className="mt-4">
                <FilterRecommendations recommendations={filter.recommendations} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderFilterGroup = (filterGroup: SmartFilter[], title: string, icon: React.ElementType) => {
    const Icon = icon;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600">
                {filterGroup.length} {filterGroup.length === 1 ? 'фильтр' : 'фильтров'} доступно
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {filterGroup.some(f => filters[f.id]) && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Eye className="w-3 h-3 mr-1" />
                Есть настройки
              </Badge>
            )}
          </div>
        </div>
        
        <div className="grid gap-4">
          {filterGroup.map(renderAdvancedFilterCard)}
        </div>
      </div>
    );
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
              <Filter className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Настройки заказа</h2>
              <p className="text-sm text-gray-600 font-normal">
                Настройте параметры для получения идеального результата
              </p>
            </div>
          </CardTitle>
          <Button variant="outline" size="sm" onClick={resetFilters} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Сбросить все
          </Button>
        </div>
        
        {selectedService && (
          <div className="flex items-center justify-between mt-4 p-4 bg-white rounded-lg border">
            <div className="flex items-center gap-3">
              <ServiceIcon className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">{selectedService.name}</p>
                <p className="text-sm text-gray-600">Выбранная услуга</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="flex items-center gap-1 text-lg font-bold text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                  {stats.configured}
                </div>
                <div className="text-xs text-gray-500">настроено</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-lg font-bold text-blue-600">
                  <Settings className="w-4 h-4" />
                  {stats.total}
                </div>
                <div className="text-xs text-gray-500">доступно</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-lg font-bold text-purple-600">
                  <BarChart3 className="w-4 h-4" />
                  {stats.percentage}%
                </div>
                <div className="text-xs text-gray-500">готовность</div>
              </div>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Основные настройки
            </TabsTrigger>
            <TabsTrigger value="specific" className="flex items-center gap-2">
              <ServiceIcon className="w-4 h-4" />
              Специальные
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex items-center gap-2">
              <Table className="w-4 h-4" />
              Сводка и анализ
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-0">
            {renderFilterGroup(COMMON_FILTERS, 'Общие настройки', Settings)}
          </TabsContent>

          <TabsContent value="specific" className="mt-0">
            {serviceSpecificFilters.length > 0 ? (
              renderFilterGroup(serviceSpecificFilters, `Настройки для ${selectedService?.name}`, ServiceIcon)
            ) : (
              <Card className="border-dashed border-2 border-gray-200">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="p-4 bg-gray-100 rounded-full mb-4">
                    <ServiceIcon className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Специальные фильтры недоступны
                  </h3>
                  <p className="text-gray-600 max-w-md">
                    Для этой услуги нет дополнительных специфичных настроек. 
                    Используйте основные фильтры для конфигурации заказа.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="summary" className="mt-0">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg">
                  <Table className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Сводная таблица настроек</h3>
                  <p className="text-sm text-gray-600">
                    Обзор всех настроек и их влияние на стоимость
                  </p>
                </div>
              </div>
              
              {/* Статистика */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-2xl font-bold text-green-700 mb-1">
                      <CheckCircle2 className="w-6 h-6" />
                      {stats.configured}
                    </div>
                    <p className="text-sm text-green-600">Настроено фильтров</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-2xl font-bold text-blue-700 mb-1">
                      <Settings className="w-6 h-6" />
                      {stats.total}
                    </div>
                    <p className="text-sm text-blue-600">Всего доступно</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-2xl font-bold text-purple-700 mb-1">
                      <BarChart3 className="w-6 h-6" />
                      {stats.percentage}%
                    </div>
                    <p className="text-sm text-purple-600">Готовность</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-2xl font-bold text-orange-700 mb-1">
                      <DollarSign className="w-6 h-6" />
                      ~15%
                    </div>
                    <p className="text-sm text-orange-600">Влияние на цену</p>
                  </CardContent>
                </Card>
              </div>

              {/* Таблица настроек */}
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                        <tr>
                          <th className="text-left p-4 font-semibold text-gray-900">Параметр</th>
                          <th className="text-left p-4 font-semibold text-gray-900">Статус</th>
                          <th className="text-left p-4 font-semibold text-gray-900">Значение</th>
                          <th className="text-left p-4 font-semibold text-gray-900">Влияние на цену</th>
                          <th className="text-left p-4 font-semibold text-gray-900">Рекомендации</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {[...COMMON_FILTERS, ...serviceSpecificFilters].map((filter) => {
                          const value = filters[filter.id];
                          const hasValue = value !== undefined && value !== null && value !== '' && 
                                           (!Array.isArray(value) || value.length > 0);
                          const priceImpact = getPriceImpact(filter, value);
                          const FilterIcon = getFilterIcon(filter.id);
                          
                          return (
                            <tr key={filter.id} className={`hover:bg-gray-50 transition-colors ${
                              hasValue ? 'bg-green-50/30' : ''
                            }`}>
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className={`p-1.5 rounded ${hasValue ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                    <FilterIcon className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">{filter.name}</div>
                                    <div className="text-xs text-gray-500">{filter.description}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                {hasValue ? (
                                  <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                                    <CheckCircle2 className="w-3 h-3 mr-1" />
                                    Настроено
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="border-gray-200 text-gray-600">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    Не задано
                                  </Badge>
                                )}
                              </td>
                              <td className="p-4">
                                {hasValue ? (
                                  <div className="max-w-xs">
                                    <Badge variant="secondary" className="text-xs">
                                      {Array.isArray(value) ? `${value.length} выбрано` : String(value).substring(0, 30)}
                                      {String(value).length > 30 ? '...' : ''}
                                    </Badge>
                                  </div>
                                ) : (
                                  <span className="text-gray-400 text-sm">—</span>
                                )}
                              </td>
                              <td className="p-4">
                                {priceImpact ? (
                                  <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    {priceImpact}
                                  </Badge>
                                ) : hasValue ? (
                                  <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                                    <Target className="w-3 h-3 mr-1" />
                                    Влияет
                                  </Badge>
                                ) : (
                                  <span className="text-gray-400 text-sm">—</span>
                                )}
                              </td>
                              <td className="p-4">
                                {filter.recommendations && filter.recommendations.length > 0 && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 w-6 p-0 text-blue-500 hover:text-blue-700"
                                    onClick={() => toggleRecommendations(filter.id)}
                                  >
                                    <Lightbulb className="w-4 h-4" />
                                  </Button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Рекомендации по завершению настройки */}
              {stats.percentage < 70 && (
                <Card className="border-amber-200 bg-amber-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-amber-900 mb-2">Рекомендации по улучшению</h4>
                        <ul className="space-y-1 text-sm text-amber-800">
                          <li>• Настройте больше фильтров для получения лучшего результата</li>
                          <li>• Минимальная рекомендуемая готовность: 70%</li>
                          <li>• Чем детальнее настройки, тем точнее будет выполнена работа</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
