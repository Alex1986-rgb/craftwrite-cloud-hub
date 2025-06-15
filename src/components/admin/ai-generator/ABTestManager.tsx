import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TestTube, 
  Trophy, 
  BarChart3, 
  TrendingUp, 
  AlertCircle,
  Play,
  Pause,
  RefreshCw
} from 'lucide-react';
import { abTestingService } from '@/services/abTestingService';

interface ABTest {
  id: string;
  name: string;
  variantA: string;
  variantB: string;
  status: 'draft' | 'running' | 'completed';
  performance: { a: number; b: number };
  winner?: 'A' | 'B' | 'tie';
  confidence: number;
  startDate?: Date;
  endDate?: Date;
}

export default function ABTestManager() {
  const [tests, setTests] = useState<ABTest[]>([]);
  const [currentTest, setCurrentTest] = useState<Partial<ABTest>>({
    name: '',
    variantA: '',
    variantB: '',
    status: 'draft'
  });
  const [isRunning, setIsRunning] = useState(false);

  const handleCreateTest = () => {
    if (!currentTest.name || !currentTest.variantA || !currentTest.variantB) return;

    const newTest: ABTest = {
      id: Date.now().toString(),
      name: currentTest.name,
      variantA: currentTest.variantA,
      variantB: currentTest.variantB,
      status: 'draft',
      performance: { a: 0, b: 0 },
      confidence: 0
    };

    setTests([...tests, newTest]);
    setCurrentTest({ name: '', variantA: '', variantB: '', status: 'draft' });
  };

  const handleRunTest = async (testId: string) => {
    setIsRunning(true);
    
    const test = tests.find(t => t.id === testId);
    if (!test) return;

    try {
      const result = await abTestingService.performABTest(test.variantA, test.variantB);
      
      const updatedTests = tests.map(t => 
        t.id === testId 
          ? {
              ...t,
              status: 'completed' as const,
              performance: result.performance,
              winner: result.winner,
              confidence: result.confidence,
              startDate: new Date(),
              endDate: new Date()
            }
          : t
      );
      
      setTests(updatedTests);
    } catch (error) {
      console.error('A/B test failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusBadge = (status: ABTest['status']) => {
    switch (status) {
      case 'draft': return <Badge variant="outline">Черновик</Badge>;
      case 'running': return <Badge className="bg-blue-100 text-blue-800">Выполняется</Badge>;
      case 'completed': return <Badge className="bg-green-100 text-green-800">Завершен</Badge>;
    }
  };

  const getWinnerBadge = (winner?: string, confidence?: number) => {
    if (!winner || winner === 'tie') return <Badge variant="secondary">Ничья</Badge>;
    
    const color = winner === 'A' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800';
    return (
      <Badge className={color}>
        Вариант {winner} ({confidence?.toFixed(0)}%)
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="w-5 h-5 text-blue-600" />
            A/B Тестирование текстов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Создать тест</TabsTrigger>
              <TabsTrigger value="results">Результаты</TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-2">Название теста</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="Например: Тест заголовка для лендинга"
                  value={currentTest.name || ''}
                  onChange={(e) => setCurrentTest({ ...currentTest, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Вариант A</label>
                  <Textarea
                    placeholder="Введите первый вариант текста..."
                    value={currentTest.variantA || ''}
                    onChange={(e) => setCurrentTest({ ...currentTest, variantA: e.target.value })}
                    rows={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Вариант B</label>
                  <Textarea
                    placeholder="Введите второй вариант текста..."
                    value={currentTest.variantB || ''}
                    onChange={(e) => setCurrentTest({ ...currentTest, variantB: e.target.value })}
                    rows={6}
                  />
                </div>
              </div>

              <Button onClick={handleCreateTest} className="w-full">
                <TestTube className="w-4 h-4 mr-2" />
                Создать A/B тест
              </Button>
            </TabsContent>

            <TabsContent value="results" className="space-y-4 mt-4">
              {tests.length === 0 ? (
                <div className="text-center py-8 text-slate-600">
                  <TestTube className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                  <p>У вас пока нет A/B тестов</p>
                  <p className="text-sm">Создайте первый тест для сравнения вариантов текста</p>
                </div>
              ) : (
                tests.map((test) => (
                  <Card key={test.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{test.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(test.status)}
                          {test.status === 'completed' && getWinnerBadge(test.winner, test.confidence)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            Вариант A
                            {test.winner === 'A' && <Trophy className="w-4 h-4 text-yellow-500" />}
                          </h4>
                          <div className="p-3 bg-slate-50 rounded-lg text-sm">
                            {test.variantA}
                          </div>
                          {test.status === 'completed' && (
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Эффективность</span>
                                <span className="font-medium">{test.performance.a.toFixed(1)}%</span>
                              </div>
                              <Progress value={test.performance.a} className="h-2 mt-1" />
                            </div>
                          )}
                        </div>

                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            Вариант B
                            {test.winner === 'B' && <Trophy className="w-4 h-4 text-yellow-500" />}
                          </h4>
                          <div className="p-3 bg-slate-50 rounded-lg text-sm">
                            {test.variantB}
                          </div>
                          {test.status === 'completed' && (
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-sm">
                                <span>Эффективность</span>
                                <span className="font-medium">{test.performance.b.toFixed(1)}%</span>
                              </div>
                              <Progress value={test.performance.b} className="h-2 mt-1" />
                            </div>
                          )}
                        </div>
                      </div>

                      {test.status === 'draft' && (
                        <Button 
                          onClick={() => handleRunTest(test.id)}
                          disabled={isRunning}
                          className="w-full"
                        >
                          {isRunning ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Выполняется тест...
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Запустить тест
                            </>
                          )}
                        </Button>
                      )}

                      {test.status === 'completed' && (
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="w-5 h-5 text-blue-600" />
                            <span className="font-medium">Результаты теста</span>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-slate-600">Победитель:</span>
                              <div className="font-medium">
                                {test.winner === 'tie' ? 'Ничья' : `Вариант ${test.winner}`}
                              </div>
                            </div>
                            <div>
                              <span className="text-slate-600">Уверенность:</span>
                              <div className="font-medium">{test.confidence.toFixed(0)}%</div>
                            </div>
                            <div>
                              <span className="text-slate-600">Улучшение:</span>
                              <div className="font-medium text-green-600">
                                +{Math.abs(test.performance.a - test.performance.b).toFixed(1)}%
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
