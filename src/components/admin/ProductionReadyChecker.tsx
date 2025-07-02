import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Globe, Database, Shield, Zap } from 'lucide-react';
import { useSystemSettings } from '@/hooks/useSystemSettings';
import { supabase } from '@/integrations/supabase/client';

interface SystemCheck {
  id: string;
  name: string;
  description: string;
  status: 'passed' | 'failed' | 'warning';
  icon: any;
  details?: string;
}

export default function ProductionReadyChecker() {
  const [checks, setChecks] = useState<SystemCheck[]>([]);
  const [loading, setLoading] = useState(true);
  const { settings } = useSystemSettings();

  const runSystemChecks = async () => {
    setLoading(true);
    const systemChecks: SystemCheck[] = [];

    // 1. Database connectivity
    try {
      const { data } = await supabase.from('system_settings').select('*').limit(1);
      systemChecks.push({
        id: 'database',
        name: 'База данных',
        description: 'Подключение к Supabase',
        status: data ? 'passed' : 'failed',
        icon: Database,
        details: data ? 'Подключение активно' : 'Ошибка подключения'
      });
    } catch (error) {
      systemChecks.push({
        id: 'database',
        name: 'База данных',
        description: 'Подключение к Supabase',
        status: 'failed',
        icon: Database,
        details: 'Ошибка подключения к БД'
      });
    }

    // 2. Edge Functions check
    try {
      const response = await fetch('/functions/v1/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: true })
      });
      
      systemChecks.push({
        id: 'edge_functions',
        name: 'Edge Functions',
        description: 'Серверные функции',
        status: response.ok ? 'passed' : 'warning',
        icon: Zap,
        details: response.ok ? 'Функции работают' : 'Проблемы с функциями'
      });
    } catch (error) {
      systemChecks.push({
        id: 'edge_functions',
        name: 'Edge Functions',
        description: 'Серверные функции',
        status: 'warning',
        icon: Zap,
        details: 'Не удалось проверить функции'
      });
    }

    // 3. Domain and SSL
    const currentDomain = window.location.hostname;
    const isProduction = !currentDomain.includes('localhost') && !currentDomain.includes('lovable.app');
    const hasSSL = window.location.protocol === 'https:';
    
    systemChecks.push({
      id: 'domain',
      name: 'Домен и SSL',
      description: 'Продакшн домен с HTTPS',
      status: isProduction && hasSSL ? 'passed' : 'warning',
      icon: Globe,
      details: `${currentDomain} (${hasSSL ? 'HTTPS' : 'HTTP'})`
    });

    // 4. Security settings
    const hasSecuritySettings = settings.email_notifications_enabled && settings.telegram_notifications_enabled;
    systemChecks.push({
      id: 'security',
      name: 'Безопасность',
      description: 'Уведомления и мониторинг',
      status: hasSecuritySettings ? 'passed' : 'warning',
      icon: Shield,
      details: hasSecuritySettings ? 'Уведомления настроены' : 'Требуется настройка уведомлений'
    });

    setChecks(systemChecks);
    setLoading(false);
  };

  useEffect(() => {
    if (Object.keys(settings).length > 0) {
      runSystemChecks();
    }
  }, [settings]);

  const getStatusIcon = (status: SystemCheck['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: SystemCheck['status']) => {
    switch (status) {
      case 'passed':
        return <Badge className="bg-green-100 text-green-800">Готово</Badge>;
      case 'failed':
        return <Badge variant="destructive">Ошибка</Badge>;
      case 'warning':
        return <Badge variant="secondary">Внимание</Badge>;
    }
  };

  const overallStatus = checks.every(c => c.status === 'passed') ? 'passed' : 
    checks.some(c => c.status === 'failed') ? 'failed' : 'warning';

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Проверка системы...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getStatusIcon(overallStatus)}
            Проверка готовности к продакшн
          </CardTitle>
          <CardDescription>
            Автоматическая проверка всех критических компонентов системы
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {checks.map((check) => (
              <div key={check.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <check.icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">{check.name}</h4>
                    <p className="text-sm text-muted-foreground">{check.description}</p>
                    {check.details && (
                      <p className="text-xs text-muted-foreground mt-1">{check.details}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(check.status)}
                  {getStatusBadge(check.status)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <Button onClick={runSystemChecks} variant="outline" className="w-full">
              Повторить проверку
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}