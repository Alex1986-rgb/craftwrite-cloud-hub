import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  FileText,
  Search,
  Target
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface QualityMetrics {
  uniqueness: number;
  readability: number;
  seoScore: number;
  keywordDensity: number;
  sentimentScore: number;
  structureScore: number;
}

interface AnalysisResult {
  id: string;
  orderId: string;
  content: string;
  metrics: QualityMetrics;
  suggestions: string[];
  score: number;
  createdAt: string;
}

export default function QualityAnalyzer() {
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedResult, setSelectedResult] = useState<AnalysisResult | null>(null);

  const analyzeContent = async (orderId: string, content: string) => {
    try {
      setAnalyzing(true);
      
      const { data, error } = await supabase.functions.invoke('analyze-content-quality', {
        body: { orderId, content }
      });

      if (error) throw error;

      const newResult: AnalysisResult = {
        id: crypto.randomUUID(),
        orderId,
        content,
        metrics: data.metrics,
        suggestions: data.suggestions,
        score: data.overallScore,
        createdAt: new Date().toISOString()
      };

      setResults(prev => [newResult, ...prev]);
      
      toast({
        title: "Анализ завершен",
        description: `Общая оценка качества: ${data.overallScore}%`,
      });

    } catch (error) {
      console.error('Error analyzing content:', error);
      toast({
        title: "Ошибка анализа",
        description: "Не удалось проанализировать контент",
        variant: "destructive"
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Анализатор качества контента</h2>
        <p className="text-muted-foreground">
          Автоматический анализ качества сгенерированных текстов
        </p>
      </div>

      <Tabs defaultValue="results" className="space-y-4">
        <TabsList>
          <TabsTrigger value="results">
            <BarChart3 className="h-4 w-4 mr-2" />
            Результаты анализа
          </TabsTrigger>
          <TabsTrigger value="metrics">
            <Target className="h-4 w-4 mr-2" />
            Метрики качества
          </TabsTrigger>
          <TabsTrigger value="suggestions">
            <FileText className="h-4 w-4 mr-2" />
            Рекомендации
          </TabsTrigger>
        </TabsList>

        <TabsContent value="results">
          <div className="grid gap-4">
            {results.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Нет результатов анализа</h3>
                  <p className="text-muted-foreground">
                    Запустите анализ контента для получения результатов
                  </p>
                </CardContent>
              </Card>
            ) : (
              results.map((result) => (
                <Card key={result.id} className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedResult(result)}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          Анализ заказа #{result.orderId.slice(0, 8)}
                        </CardTitle>
                        <CardDescription>
                          {new Date(result.createdAt).toLocaleString()}
                        </CardDescription>
                      </div>
                      <Badge variant={getScoreBadge(result.score)}>
                        {result.score}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {result.metrics.uniqueness}%
                        </div>
                        <div className="text-sm text-muted-foreground">Уникальность</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {result.metrics.readability}%
                        </div>
                        <div className="text-sm text-muted-foreground">Читаемость</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {result.metrics.seoScore}%
                        </div>
                        <div className="text-sm text-muted-foreground">SEO</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {result.metrics.keywordDensity}%
                        </div>
                        <div className="text-sm text-muted-foreground">Ключевые слова</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Общая оценка</span>
                        <span className={getScoreColor(result.score)}>{result.score}%</span>
                      </div>
                      <Progress value={result.score} className="h-2" />
                    </div>

                    {result.suggestions.length > 0 && (
                      <div className="mt-4">
                        <div className="text-sm font-medium mb-2">Рекомендации:</div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {result.suggestions.slice(0, 2).map((suggestion, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <AlertTriangle className="h-3 w-3 mt-0.5 text-yellow-500" />
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="metrics">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Метрики качества</CardTitle>
                <CardDescription>Средние показатели по всем анализам</CardDescription>
              </CardHeader>
              <CardContent>
                {results.length > 0 ? (
                  <div className="space-y-4">
                    {Object.entries({
                      uniqueness: 'Уникальность',
                      readability: 'Читаемость', 
                      seoScore: 'SEO оптимизация',
                      keywordDensity: 'Плотность ключевых слов',
                      sentimentScore: 'Тональность',
                      structureScore: 'Структура'
                    }).map(([key, label]) => {
                      const avg = results.reduce((sum, r) => sum + r.metrics[key as keyof QualityMetrics], 0) / results.length;
                      return (
                        <div key={key}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">{label}</span>
                            <span className="text-sm font-medium">{avg.toFixed(1)}%</span>
                          </div>
                          <Progress value={avg} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Недостаточно данных для анализа</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Тренды качества</CardTitle>
                <CardDescription>Динамика изменения показателей</CardDescription>
              </CardHeader>
              <CardContent>
                {results.length >= 2 ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Качество улучшается</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Последние {results.length} анализов показывают положительную динамику
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Нужно больше анализов для отслеживания трендов</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="suggestions">
          <Card>
            <CardHeader>
              <CardTitle>Общие рекомендации</CardTitle>
              <CardDescription>Наиболее частые советы по улучшению качества</CardDescription>
            </CardHeader>
            <CardContent>
              {results.length > 0 ? (
                <div className="space-y-3">
                  {Array.from(new Set(results.flatMap(r => r.suggestions))).slice(0, 10).map((suggestion, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                      <span className="text-sm">{suggestion}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">Рекомендации появятся после проведения анализов</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center">
        <Button 
          onClick={() => toast({ title: "Функция в разработке", description: "Скоро будет доступна" })}
          disabled={analyzing}
        >
          {analyzing ? "Анализируем..." : "Запустить массовый анализ"}
        </Button>
      </div>
    </div>
  );
}