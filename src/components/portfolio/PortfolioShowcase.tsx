
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Eye, 
  MousePointer, 
  Users, 
  BarChart3,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { PORTFOLIO_EXAMPLES } from '@/data/portfolioExamples';
import { ALL_SERVICES } from '@/data/allServices';

interface PortfolioShowcaseProps {
  serviceSlug?: string;
  maxItems?: number;
}

export default function PortfolioShowcase({ serviceSlug, maxItems = 6 }: PortfolioShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const filteredPortfolio = PORTFOLIO_EXAMPLES
    .filter(item => !serviceSlug || item.service_slug === serviceSlug)
    .filter(item => selectedCategory === 'all' || item.service_slug === selectedCategory)
    .slice(0, maxItems);

  const categories = ['all', ...new Set(PORTFOLIO_EXAMPLES.map(item => item.service_slug))];
  
  const getServiceInfo = (slug: string) => {
    return ALL_SERVICES.find(s => s.slug === slug);
  };

  const formatMetric = (key: string, value: any) => {
    switch (key) {
      case 'trafficIncrease':
      case 'conversionRate':
      case 'bounceReduction':
      case 'timeOnSite':
      case 'revenueGrowth':
      case 'salesIncrease':
      case 'retentionIncrease':
      case 'engagement':
        return typeof value === 'string' ? value : `+${value}%`;
      case 'openRate':
      case 'clickRate':
        return typeof value === 'string' ? value : `${value}%`;
      case 'newClients':
        return `+${value}`;
      default:
        return value;
    }
  };

  const getMetricIcon = (key: string) => {
    switch (key) {
      case 'trafficIncrease':
      case 'salesIncrease':
      case 'revenueGrowth':
        return <TrendingUp className="w-4 h-4" />;
      case 'conversionRate':
      case 'clickRate':
        return <MousePointer className="w-4 h-4" />;
      case 'openRate':
      case 'engagement':
        return <Eye className="w-4 h-4" />;
      case 'newClients':
        return <Users className="w-4 h-4" />;
      default:
        return <BarChart3 className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {!serviceSlug && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Портфолио успешных проектов</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Реальные результаты наших клиентов с подтвержденными метриками и достижениями
          </p>
        </div>
      )}

      {!serviceSlug && (
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-8 mb-6">
            <TabsTrigger value="all">Все</TabsTrigger>
            {categories.slice(1, 7).map((category) => {
              const service = getServiceInfo(category);
              return (
                <TabsTrigger key={category} value={category} className="text-xs">
                  {service?.name.split(' ')[0] || category}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPortfolio.map((item) => {
          const service = getServiceInfo(item.service_slug);
          
          return (
            <Card key={item.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="mb-2">
                    {service?.name || item.service_slug}
                  </Badge>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-blue-600 transition-colors">
                  {item.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>

                {/* Метрики */}
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(item.metrics).slice(0, 4).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        {getMetricIcon(key)}
                        <span className="text-xs text-gray-600 uppercase tracking-wide">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </div>
                      <div className="font-bold text-lg text-green-600">
                        {formatMetric(key, value)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* До/После */}
                {item.before_text && item.after_text && (
                  <div className="space-y-3">
                    <div className="bg-red-50 border-l-4 border-red-200 p-3">
                      <h4 className="text-xs font-semibold text-red-800 mb-1">ДО</h4>
                      <p className="text-xs text-red-700">{item.before_text}</p>
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-200 p-3">
                      <h4 className="text-xs font-semibold text-green-800 mb-1">ПОСЛЕ</h4>
                      <p className="text-xs text-green-700">{item.after_text}</p>
                    </div>
                  </div>
                )}

                {/* Теги */}
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-between group-hover:bg-blue-50 group-hover:text-blue-600"
                >
                  Подробнее о проекте
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {PORTFOLIO_EXAMPLES.length > maxItems && (
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Смотреть все проекты
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
