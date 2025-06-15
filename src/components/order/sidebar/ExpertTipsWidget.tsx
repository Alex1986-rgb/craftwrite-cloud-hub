
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  Quote, 
  TrendingUp, 
  Target, 
  Star, 
  Clock,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { useState } from 'react';

interface ExpertTip {
  id: string;
  category: 'seo' | 'content' | 'strategy';
  title: string;
  content: string;
  author: string;
  impact: 'high' | 'medium' | 'low';
  readTime: string;
}

interface ExpertTipsWidgetProps {
  selectedService?: string;
  className?: string;
}

const expertTips: ExpertTip[] = [
  {
    id: 'seo-keywords',
    category: 'seo',
    title: 'Плотность ключевых слов',
    content: 'Оптимальная плотность ключевых слов составляет 2-3%. Превышение может привести к переспаму и снижению позиций.',
    author: 'Анна Петрова',
    impact: 'high',
    readTime: '2 мин'
  },
  {
    id: 'content-structure',
    category: 'content',
    title: 'Структура заголовков',
    content: 'Используйте иерархию H1-H6 для лучшего понимания поисковыми системами. H1 должен быть только один.',
    author: 'Дмитрий Иванов',
    impact: 'medium',
    readTime: '3 мин'
  },
  {
    id: 'conversion-strategy',
    category: 'strategy',
    title: 'Психология продаж',
    content: 'Используйте принципы социального доказательства и дефицита для увеличения конверсии на 40-60%.',
    author: 'Елена Смирнова',
    impact: 'high',
    readTime: '5 мин'
  }
];

export default function ExpertTipsWidget({ selectedService, className }: ExpertTipsWidgetProps) {
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'seo': return TrendingUp;
      case 'content': return Target;
      case 'strategy': return Star;
      default: return Lightbulb;
    }
  };

  return (
    <Card className={`sticky top-8 ${className}`}>
      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          Советы экспертов
        </CardTitle>
        <p className="text-sm text-gray-600">
          Практические рекомендации для вашего проекта
        </p>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {expertTips.map(tip => {
          const Icon = getCategoryIcon(tip.category);
          const isExpanded = expandedTip === tip.id;
          
          return (
            <div key={tip.id} className="group">
              <div 
                className="p-3 rounded-lg border border-gray-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all cursor-pointer"
                onClick={() => setExpandedTip(isExpanded ? null : tip.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-amber-600" />
                    <span className="font-medium text-sm">{tip.title}</span>
                  </div>
                  <ChevronRight 
                    className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                  />
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className={getImpactColor(tip.impact)}>
                    {tip.impact === 'high' ? 'Высокое влияние' : 
                     tip.impact === 'medium' ? 'Среднее влияние' : 'Низкое влияние'}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {tip.readTime}
                  </Badge>
                </div>
                
                {isExpanded && (
                  <div className="mt-3 space-y-3 animate-in slide-in-from-top-2 duration-200">
                    <div className="p-3 bg-amber-50 rounded-md border-l-4 border-l-amber-400">
                      <Quote className="w-4 h-4 text-amber-600 mb-2" />
                      <p className="text-sm text-amber-900 italic mb-2">"{tip.content}"</p>
                      <p className="text-xs text-amber-700">— {tip.author}, эксперт CopyPro</p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Применимо к вашему заказу</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
      
      {/* Статистика внизу */}
      <div className="p-4 border-t bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">98%</div>
            <div className="text-xs text-blue-700">Довольных клиентов</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">500%</div>
            <div className="text-xs text-purple-700">Средний ROI</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
