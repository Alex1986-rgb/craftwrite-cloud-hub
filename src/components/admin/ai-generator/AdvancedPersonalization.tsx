
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Award,
  BarChart3,
  Lightbulb,
  Users
} from 'lucide-react';
import { enhancedOpenAIService } from '@/services/enhancedOpenAIService';

interface LearningInsight {
  category: string;
  insight: string;
  confidence: number;
  actionable: boolean;
}

interface PersonalizationStats {
  totalTexts: number;
  avgPerformance: number;
  bestCategory: string;
  improvement: number;
  adaptationLevel: number;
}

export default function AdvancedPersonalization() {
  const [insights, setInsights] = useState<LearningInsight[]>([]);
  const [stats, setStats] = useState<PersonalizationStats>({
    totalTexts: 0,
    avgPerformance: 0,
    bestCategory: '',
    improvement: 0,
    adaptationLevel: 0
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Load personalization data on component mount
    loadPersonalizationData();
  }, []);

  const loadPersonalizationData = async () => {
    setIsAnalyzing(true);
    
    // Mock loading personalization insights
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setInsights([
      {
        category: 'Стиль письма',
        insight: 'Вы показываете лучшие результаты с дружелюбным тоном (+23% конверсия)',
        confidence: 87,
        actionable: true
      },
      {
        category: 'Длина текста',
        insight: 'Оптимальная длина ваших текстов: 800-1200 символов',
        confidence: 92,
        actionable: true
      },
      {
        category: 'Время создания',
        insight: 'Ваша продуктивность выше в утренние часы (9-12)',
        confidence: 78,
        actionable: false
      },
      {
        category: 'Ключевые слова',
        insight: 'Эффективнее использовать 3-5 ключевых слов на текст',
        confidence: 83,
        actionable: true
      }
    ]);

    setStats({
      totalTexts: 47,
      avgPerformance: 78,
      bestCategory: 'Продающие тексты',
      improvement: 34,
      adaptationLevel: 72
    });
    
    setIsAnalyzing(false);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-100 text-green-800';
    if (confidence >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const handleApplyInsight = (insight: LearningInsight) => {
    console.log('Applying insight:', insight);
    // Logic to apply insight to user profile
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            Продвинутая персонализация
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalTexts}</div>
              <div className="text-sm text-slate-600">Создано текстов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.avgPerformance}%</div>
              <div className="text-sm text-slate-600">Ср. эффективность</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">+{stats.improvement}%</div>
              <div className="text-sm text-slate-600">Улучшение</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.adaptationLevel}%</div>
              <div className="text-sm text-slate-600">Адаптация ИИ</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Уровень адаптации ИИ</span>
              <span className="text-sm text-slate-600">{stats.adaptationLevel}%</span>
            </div>
            <Progress value={stats.adaptationLevel} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Инсайты
          </TabsTrigger>
          <TabsTrigger value="patterns" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Паттерны
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Рекомендации
          </TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4 mt-4">
          {isAnalyzing ? (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Анализируем ваши данные...</p>
            </div>
          ) : (
            insights.map((insight, index) => (
              <Card key={index} className="border-l-4 border-l-purple-500">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{insight.category}</Badge>
                        <Badge className={getConfidenceColor(insight.confidence)}>
                          {insight.confidence}% уверенность
                        </Badge>
                      </div>
                      <p className="text-slate-700">{insight.insight}</p>
                    </div>
                    {insight.actionable && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleApplyInsight(insight)}
                      >
                        Применить
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Успешные паттерны
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-800 mb-1">Структура заголовков</h4>
                <p className="text-sm text-green-700">Вопрос + Обещание + Выгода показывает +45% CTR</p>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-1">Эмоциональные триггеры</h4>
                <p className="text-sm text-blue-700">Слова "экономия", "эксклюзив", "ограниченно" увеличивают конверсию</p>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-800 mb-1">Призывы к действию</h4>
                <p className="text-sm text-purple-700">Персонализированные CTA работают на 28% лучше</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                Персональные рекомендации
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Users className="w-5 h-5 text-blue-500" />
                <div>
                  <h4 className="font-medium">Аудитория B2B</h4>
                  <p className="text-sm text-slate-600">Увеличьте использование статистики и кейсов</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Target className="w-5 h-5 text-green-500" />
                <div>
                  <h4 className="font-medium">SEO-оптимизация</h4>
                  <p className="text-sm text-slate-600">Добавляйте больше семантических связей</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <BarChart3 className="w-5 h-5 text-purple-500" />
                <div>
                  <h4 className="font-medium">Длина контента</h4>
                  <p className="text-sm text-slate-600">Ваш оптимум: 900-1100 символов</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
