import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Play, RotateCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface TestResult {
  name: string;
  status: 'pending' | 'running' | 'success' | 'error';
  message?: string;
  details?: any;
}

export default function SystemTester() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  const tests = [
    {
      name: 'Подключение к базе данных',
      test: async () => {
        const { data, error } = await supabase.from('orders').select('count').limit(1);
        if (error) throw error;
        return { message: 'База данных доступна', data };
      }
    },
    {
      name: 'Edge Function анализа качества',
      test: async () => {
        const response = await supabase.functions.invoke('analyze-content-quality', {
          body: {
            orderId: 'test-order',
            content: 'Тестовый контент для анализа качества и проверки работы системы.'
          }
        });
        if (response.error) throw response.error;
        return { message: 'Анализ качества работает', data: response.data };
      }
    },
    {
      name: 'Создание тестового заказа',
      test: async () => {
        const { data, error } = await supabase.from('orders').insert({
          service_name: 'Тестовый SEO-текст',
          service_slug: 'seo-article',
          contact_name: 'Тестовый клиент',
          contact_email: 'test@example.com',
          details: 'Тестовый заказ для проверки системы автоматизации',
          status: 'pending'
        }).select().single();
        
        if (error) throw error;
        return { message: 'Тестовый заказ создан', data };
      }
    },
    {
      name: 'Проверка уведомлений',
      test: async () => {
        const { data, error } = await supabase.from('notifications').insert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          title: 'Тестовое уведомление',
          message: 'Система уведомлений работает корректно',
          type: 'info'
        }).select().single();
        
        if (error) throw error;
        return { message: 'Уведомления работают', data };
      }
    },
    {
      name: 'Аналитика системы',
      test: async () => {
        const { data, error } = await supabase.from('smart_order_analytics').insert({
          session_id: 'test-session',
          step_number: 1,
          step_name: 'Тестовый шаг',
          event_type: 'step_enter',
          timestamp: new Date().toISOString()
        }).select().single();
        
        if (error) throw error;
        return { message: 'Аналитика записывается', data };
      }
    }
  ];

  const runAllTests = async () => {
    setTesting(true);
    setResults([]);
    
    for (const testCase of tests) {
      const testResult: TestResult = {
        name: testCase.name,
        status: 'running'
      };
      
      setResults(prev => [...prev, testResult]);
      
      try {
        const result = await testCase.test();
        testResult.status = 'success';
        testResult.message = result.message;
        testResult.details = result.data;
        
        setResults(prev => prev.map(r => 
          r.name === testCase.name ? testResult : r
        ));
        
        // Небольшая задержка между тестами
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error: any) {
        testResult.status = 'error';
        testResult.message = error.message || 'Ошибка выполнения теста';
        
        setResults(prev => prev.map(r => 
          r.name === testCase.name ? testResult : r
        ));
      }
    }
    
    setTesting(false);
    
    const successCount = results.filter(r => r.status === 'success').length;
    const totalCount = tests.length;
    
    toast({
      title: "Тестирование завершено",
      description: `Пройдено ${successCount} из ${totalCount} тестов`,
      variant: successCount === totalCount ? "default" : "destructive"
    });
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'running':
        return <RotateCw className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return <div className="h-5 w-5 rounded-full bg-gray-300" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Тестирование системы</h2>
          <p className="text-muted-foreground">
            Проверка всех компонентов системы автоматизации
          </p>
        </div>
        <Button 
          onClick={runAllTests}
          disabled={testing}
          className="gap-2"
        >
          <Play className="h-4 w-4" />
          {testing ? 'Тестирование...' : 'Запустить тесты'}
        </Button>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Тестирование проверит работу всех ключевых компонентов: 
          анализ качества AI, уведомления, базу данных, аналитику и edge functions.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4">
        {results.map((result, index) => (
          <Card key={result.name} className="transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-3">
                  {getStatusIcon(result.status)}
                  {result.name}
                </CardTitle>
                <Badge variant={
                  result.status === 'success' ? 'default' :
                  result.status === 'error' ? 'destructive' :
                  result.status === 'running' ? 'secondary' : 'outline'
                }>
                  {result.status === 'success' ? 'Успех' :
                   result.status === 'error' ? 'Ошибка' :
                   result.status === 'running' ? 'Выполняется' : 'Ожидает'}
                </Badge>
              </div>
              {result.message && (
                <CardDescription className="mt-2">
                  {result.message}
                </CardDescription>
              )}
            </CardHeader>
            {result.details && (
              <CardContent>
                <pre className="text-xs bg-muted p-3 rounded-md overflow-auto">
                  {JSON.stringify(result.details, null, 2)}
                </pre>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {results.length > 0 && !testing && (
        <Card>
          <CardHeader>
            <CardTitle>Результаты тестирования</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {results.filter(r => r.status === 'success').length}
                </div>
                <div className="text-sm text-muted-foreground">Успешно</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {results.filter(r => r.status === 'error').length}
                </div>
                <div className="text-sm text-muted-foreground">Ошибки</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round((results.filter(r => r.status === 'success').length / results.length) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Готовность</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}