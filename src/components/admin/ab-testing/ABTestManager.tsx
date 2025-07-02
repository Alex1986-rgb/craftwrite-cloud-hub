import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TestTube,
  Play,
  Pause,
  BarChart3,
  Plus,
  TrendingUp,
  Target,
  CheckCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ABTest {
  id: string;
  name: string;
  service_type: string;
  status: 'draft' | 'running' | 'completed' | 'paused';
  variant_a: {
    name: string;
    prompt: string;
    results: number;
    conversions: number;
  };
  variant_b: {
    name: string;
    prompt: string;
    results: number;
    conversions: number;
  };
  start_date: string;
  end_date?: string;
  confidence_level: number;
  winner?: 'a' | 'b';
  created_at: string;
}

export default function ABTestManager() {
  const [tests, setTests] = useState<ABTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newTest, setNewTest] = useState({
    name: '',
    service_type: '',
    variant_a_name: '',
    variant_a_prompt: '',
    variant_b_name: '',
    variant_b_prompt: ''
  });

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      // Имитация загрузки данных - в реальности здесь будет запрос к БД
      const mockTests: ABTest[] = [
        {
          id: '1',
          name: 'SEO заголовки v2.0',
          service_type: 'seo-article',
          status: 'running',
          variant_a: {
            name: 'Стандартный промпт',
            prompt: 'Создай SEO-оптимизированный заголовок...',
            results: 45,
            conversions: 32
          },
          variant_b: {
            name: 'Эмоциональный промпт',
            prompt: 'Создай цепляющий эмоциональный заголовок...',
            results: 47,
            conversions: 38
          },
          start_date: '2024-01-15',
          confidence_level: 85,
          created_at: '2024-01-15T10:00:00Z'
        }
      ];
      
      setTests(mockTests);
    } catch (error) {
      console.error('Error loading tests:', error);
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить A/B тесты",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createTest = async () => {
    if (!newTest.name || !newTest.variant_a_prompt || !newTest.variant_b_prompt) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    try {
      setCreating(true);
      
      const test: ABTest = {
        id: crypto.randomUUID(),
        name: newTest.name,
        service_type: newTest.service_type,
        status: 'draft',
        variant_a: {
          name: newTest.variant_a_name || 'Вариант A',
          prompt: newTest.variant_a_prompt,
          results: 0,
          conversions: 0
        },
        variant_b: {
          name: newTest.variant_b_name || 'Вариант B',
          prompt: newTest.variant_b_prompt,
          results: 0,
          conversions: 0
        },
        start_date: new Date().toISOString(),
        confidence_level: 0,
        created_at: new Date().toISOString()
      };

      setTests(prev => [test, ...prev]);
      setNewTest({
        name: '',
        service_type: '',
        variant_a_name: '',
        variant_a_prompt: '',
        variant_b_name: '',
        variant_b_prompt: ''
      });

      toast({
        title: "Тест создан",
        description: "A/B тест успешно создан и готов к запуску",
      });

    } catch (error) {
      console.error('Error creating test:', error);
      toast({
        title: "Ошибка создания",
        description: "Не удалось создать A/B тест",
        variant: "destructive"
      });
    } finally {
      setCreating(false);
    }
  };

  const toggleTestStatus = async (testId: string) => {
    setTests(prev => prev.map(test => {
      if (test.id === testId) {
        const newStatus = test.status === 'running' ? 'paused' : 'running';
        return { ...test, status: newStatus };
      }
      return test;
    }));

    toast({
      title: "Статус обновлен",
      description: "Статус A/B теста успешно изменен",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Play className="h-3 w-3" />;
      case 'paused': return <Pause className="h-3 w-3" />;
      case 'completed': return <CheckCircle className="h-3 w-3" />;
      default: return <TestTube className="h-3 w-3" />;
    }
  };

  const calculateConversionRate = (conversions: number, results: number) => {
    return results > 0 ? ((conversions / results) * 100).toFixed(1) : '0.0';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">A/B тестирование промптов</h2>
          <p className="text-muted-foreground">
            Оптимизация качества генерации через сравнение промптов
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Создать тест
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">
            <TestTube className="h-4 w-4 mr-2" />
            Активные тесты ({tests.filter(t => t.status === 'running').length})
          </TabsTrigger>
          <TabsTrigger value="results">
            <BarChart3 className="h-4 w-4 mr-2" />
            Результаты
          </TabsTrigger>
          <TabsTrigger value="create">
            <Plus className="h-4 w-4 mr-2" />
            Создать тест
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="grid gap-4">
            {tests.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <TestTube className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Нет активных тестов</h3>
                  <p className="text-muted-foreground">
                    Создайте первый A/B тест для оптимизации промптов
                  </p>
                </CardContent>
              </Card>
            ) : (
              tests.map((test) => (
                <Card key={test.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{test.name}</CardTitle>
                        <CardDescription>
                          Услуга: {test.service_type} • Создан: {new Date(test.created_at).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(test.status)}>
                          {getStatusIcon(test.status)}
                          <span className="ml-1">{test.status}</span>
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleTestStatus(test.id)}
                        >
                          {test.status === 'running' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Вариант A */}
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">{test.variant_a.name}</h4>
                        <div className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {test.variant_a.prompt}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-xs">
                            <div>Результаты: {test.variant_a.results}</div>
                            <div>Конверсии: {test.variant_a.conversions}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-blue-600">
                              {calculateConversionRate(test.variant_a.conversions, test.variant_a.results)}%
                            </div>
                            <div className="text-xs text-muted-foreground">Конверсия</div>
                          </div>
                        </div>
                      </div>

                      {/* Вариант B */}
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">{test.variant_b.name}</h4>
                        <div className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {test.variant_b.prompt}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-xs">
                            <div>Результаты: {test.variant_b.results}</div>
                            <div>Конверсии: {test.variant_b.conversions}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">
                              {calculateConversionRate(test.variant_b.conversions, test.variant_b.results)}%
                            </div>
                            <div className="text-xs text-muted-foreground">Конверсия</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">
                          Уровень доверия: {test.confidence_level}%
                        </span>
                        {test.confidence_level >= 95 && (
                          <Badge variant="default">Статистически значимо</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="results">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Лучшие промпты</CardTitle>
                <CardDescription>Топ промптов по конверсии</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tests.filter(t => t.status === 'completed').slice(0, 5).map((test, index) => (
                    <div key={test.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{test.name}</div>
                        <div className="text-sm text-muted-foreground">{test.service_type}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">
                          {test.winner === 'a' 
                            ? calculateConversionRate(test.variant_a.conversions, test.variant_a.results)
                            : calculateConversionRate(test.variant_b.conversions, test.variant_b.results)
                          }%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Статистика тестирования</CardTitle>
                <CardDescription>Общие показатели</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Всего тестов</span>
                    <span className="font-bold">{tests.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Активных тестов</span>
                    <span className="font-bold text-green-600">
                      {tests.filter(t => t.status === 'running').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Завершенных тестов</span>
                    <span className="font-bold text-blue-600">
                      {tests.filter(t => t.status === 'completed').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Средний прирост конверсии</span>
                    <span className="font-bold text-purple-600">+12.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Создать новый A/B тест</CardTitle>
              <CardDescription>
                Сравните два промпта для определения лучшего варианта
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Название теста</label>
                  <Input
                    placeholder="Например: SEO заголовки v3.0"
                    value={newTest.name}
                    onChange={(e) => setNewTest(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Тип услуги</label>
                  <Input
                    placeholder="seo-article, landing-page, etc."
                    value={newTest.service_type}
                    onChange={(e) => setNewTest(prev => ({ ...prev, service_type: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Вариант A</h4>
                  <Input
                    placeholder="Название варианта A"
                    value={newTest.variant_a_name}
                    onChange={(e) => setNewTest(prev => ({ ...prev, variant_a_name: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Промпт для варианта A..."
                    rows={6}
                    value={newTest.variant_a_prompt}
                    onChange={(e) => setNewTest(prev => ({ ...prev, variant_a_prompt: e.target.value }))}
                  />
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Вариант B</h4>
                  <Input
                    placeholder="Название варианта B"
                    value={newTest.variant_b_name}
                    onChange={(e) => setNewTest(prev => ({ ...prev, variant_b_name: e.target.value }))}
                  />
                  <Textarea
                    placeholder="Промпт для варианта B..."
                    rows={6}
                    value={newTest.variant_b_prompt}
                    onChange={(e) => setNewTest(prev => ({ ...prev, variant_b_prompt: e.target.value }))}
                  />
                </div>
              </div>

              <Button 
                onClick={createTest}
                disabled={creating}
                className="w-full"
              >
                {creating ? "Создаём тест..." : "Создать A/B тест"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}