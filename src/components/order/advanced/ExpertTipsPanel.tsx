
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  Quote, 
  TrendingUp, 
  Target, 
  Star, 
  Users,
  BarChart3,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { useState } from 'react';

interface ExpertTip {
  id: string;
  category: 'seo' | 'content' | 'strategy' | 'pricing';
  title: string;
  content: string;
  author: string;
  impact: 'low' | 'medium' | 'high';
  difficulty: 'easy' | 'medium' | 'hard';
  timeToImplement: string;
}

interface ExpertTipsPanelProps {
  selectedService: any;
  className?: string;
}

const expertTips: ExpertTip[] = [
  {
    id: 'seo-keywords',
    category: 'seo',
    title: 'Плотность ключевых слов',
    content: 'Оптимальная плотность ключевых слов составляет 2-3%. Превышение может привести к переспаму и снижению позиций.',
    author: 'Анна Петрова, SEO-эксперт',
    impact: 'high',
    difficulty: 'easy',
    timeToImplement: '10 мин'
  },
  {
    id: 'content-structure',
    category: 'content',
    title: 'Структура заголовков',
    content: 'Используйте иерархию H1-H6 для лучшего понимания поисковыми системами. H1 должен быть только один.',
    author: 'Дмитрий Иванов, контент-стратег',
    impact: 'medium',
    difficulty: 'easy',
    timeToImplement: '15 мин'
  },
  {
    id: 'competitor-analysis',
    category: 'strategy',
    title: 'Анализ конкурентов',
    content: 'Изучение топ-10 конкурентов поможет найти пробелы в контенте и создать уникальное предложение.',
    author: 'Елена Смирнова, маркетолог',
    impact: 'high',
    difficulty: 'medium',
    timeToImplement: '2 часа'
  },
  {
    id: 'pricing-strategy',
    category: 'pricing',
    title: 'Влияние качества на ROI',
    content: 'Инвестиции в качественный контент окупаются в 3-5 раз быстрее благодаря лучшим позициям в поиске.',
    author: 'Михаил Козлов, аналитик',
    impact: 'high',
    difficulty: 'hard',
    timeToImplement: '1 месяц'
  }
];

export default function ExpertTipsPanel({ selectedService, className }: ExpertTipsPanelProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Все советы', icon: Lightbulb, count: expertTips.length },
    { id: 'seo', label: 'SEO', icon: TrendingUp, count: expertTips.filter(t => t.category === 'seo').length },
    { id: 'content', label: 'Контент', icon: Target, count: expertTips.filter(t => t.category === 'content').length },
    { id: 'strategy', label: 'Стратегия', icon: BarChart3, count: expertTips.filter(t => t.category === 'strategy').length },
    { id: 'pricing', label: 'Цены', icon: Star, count: expertTips.filter(t => t.category === 'pricing').length }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'hard': return 'bg-purple-100 text-purple-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'easy': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTips = activeCategory === 'all' 
    ? expertTips 
    : expertTips.filter(tip => tip.category === activeCategory);

  return (
    <Card className={`${className}`}>
      <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          Советы экспертов
        </CardTitle>
        <p className="text-sm text-gray-600">
          Практические рекомендации для улучшения результата
        </p>
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Категории */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="gap-2"
              >
                <Icon className="w-3 h-3" />
                {category.label}
                <Badge variant="secondary" className="ml-1">
                  {category.count}
                </Badge>
              </Button>
            );
          })}
        </div>

        {/* Советы */}
        <div className="space-y-4">
          {filteredTips.map(tip => (
            <Card key={tip.id} className="border-l-4 border-l-yellow-400 hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getImpactColor(tip.impact)}>
                        Влияние: {tip.impact === 'high' ? 'Высокое' : tip.impact === 'medium' ? 'Среднее' : 'Низкое'}
                      </Badge>
                      <Badge className={getDifficultyColor(tip.difficulty)}>
                        {tip.difficulty === 'hard' ? 'Сложно' : tip.difficulty === 'medium' ? 'Средне' : 'Легко'}
                      </Badge>
                      <Badge variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        {tip.timeToImplement}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
                  >
                    {expandedTip === tip.id ? 'Скрыть' : 'Подробнее'}
                  </Button>
                </div>
                
                {expandedTip === tip.id && (
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-l-yellow-400">
                      <Quote className="w-4 h-4 text-yellow-600 mb-2" />
                      <p className="text-sm text-yellow-800 italic mb-2">"{tip.content}"</p>
                      <p className="text-xs text-yellow-700">— {tip.author}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Применимо к вашему заказу</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Статистика */}
        <Card className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">98%</div>
                <div className="text-xs text-blue-700">Клиентов довольны</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">500%</div>
                <div className="text-xs text-purple-700">Средний ROI</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">24ч</div>
                <div className="text-xs text-green-700">Среднее время</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
