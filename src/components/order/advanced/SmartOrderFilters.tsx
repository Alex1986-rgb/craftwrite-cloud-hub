
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
  Settings
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

  const renderFilterGroup = (filterGroup: SmartFilter[], title: string, icon: React.ElementType) => {
    const Icon = icon;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        
        <div className="grid gap-6">
          {filterGroup.map((filter) => (
            <Card key={filter.id} className="border-l-4 border-l-primary/30">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label className="font-medium text-base">{filter.name}</Label>
                      {filter.description && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => toggleRecommendations(filter.id)}
                        >
                          <Info className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    {filters[filter.id] && (
                      <Badge variant="secondary" className="text-xs">
                        Настроено
                      </Badge>
                    )}
                  </div>

                  {filter.description && (
                    <p className="text-sm text-muted-foreground">{filter.description}</p>
                  )}

                  <FilterInput
                    filter={filter}
                    value={filters[filter.id]}
                    onChange={(value) => updateFilter(filter.id, value)}
                  />

                  {filter.recommendations && showRecommendations[filter.id] && (
                    <FilterRecommendations recommendations={filter.recommendations} />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Настройки заказа
          </CardTitle>
          <Button variant="outline" size="sm" onClick={resetFilters}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Сбросить
          </Button>
        </div>
        {selectedService && (
          <div className="flex items-center gap-2">
            <ServiceIcon className="w-4 h-4" />
            <Badge variant="secondary" className="w-fit">
              {selectedService.name}
            </Badge>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Основные
            </TabsTrigger>
            <TabsTrigger value="specific" className="flex items-center gap-2">
              <ServiceIcon className="w-4 h-4" />
              Специальные
            </TabsTrigger>
            <TabsTrigger value="table" className="flex items-center gap-2">
              <Table className="w-4 h-4" />
              Сводка
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            {renderFilterGroup(COMMON_FILTERS, 'Общие настройки', Settings)}
          </TabsContent>

          <TabsContent value="specific" className="mt-6">
            {serviceSpecificFilters.length > 0 ? (
              renderFilterGroup(serviceSpecificFilters, `Настройки для ${selectedService?.name}`, ServiceIcon)
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <ServiceIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Для этой услуги нет специальных фильтров</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="table" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Table className="w-5 h-5" />
                Сводная таблица настроек
              </h3>
              
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-3 font-medium">Параметр</th>
                          <th className="text-left p-3 font-medium">Значение</th>
                          <th className="text-left p-3 font-medium">Влияние на цену</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {[...COMMON_FILTERS, ...serviceSpecificFilters].map((filter) => {
                          const value = filters[filter.id];
                          const hasValue = value !== undefined && value !== null && value !== '';
                          
                          return (
                            <tr key={filter.id} className={hasValue ? 'bg-green-50/50' : ''}>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  {hasValue && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                                  {filter.name}
                                </div>
                              </td>
                              <td className="p-3">
                                {hasValue ? (
                                  <Badge variant="secondary">
                                    {Array.isArray(value) ? value.join(', ') : String(value)}
                                  </Badge>
                                ) : (
                                  <span className="text-muted-foreground">Не задано</span>
                                )}
                              </td>
                              <td className="p-3">
                                {hasValue ? (
                                  <span className="text-green-600 text-sm">Влияет</span>
                                ) : (
                                  <span className="text-muted-foreground text-sm">—</span>
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
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
