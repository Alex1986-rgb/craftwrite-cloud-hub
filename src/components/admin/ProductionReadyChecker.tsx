import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, Globe, Database, Shield, Zap } from 'lucide-react';
import { useSystemDiagnostics } from '@/hooks/useSystemDiagnostics';
import { useSystemSettings } from '@/hooks/useSystemSettings';

interface SystemCheck {
  id: string;
  name: string;
  description: string;
  status: 'passed' | 'failed' | 'warning';
  icon: any;
  details?: string;
}

export default function ProductionReadyChecker() {
  const { diagnostics, loading, error, runDiagnostics, getOverallStatus } = useSystemDiagnostics();
  const { settings } = useSystemSettings();

  const getSystemChecks = (): SystemCheck[] => {
    const checks: SystemCheck[] = [];

    // Map diagnostics to system checks
    diagnostics.forEach(diagnostic => {
      const statusMap: Record<string, 'passed' | 'failed' | 'warning'> = {
        'pass': 'passed',
        'fail': 'failed',
        'warning': 'warning'
      };

      checks.push({
        id: `${diagnostic.check_type}_${diagnostic.check_name}`,
        name: diagnostic.check_name === 'connectivity' ? 'База данных' :
              diagnostic.check_name === 'system_settings' ? 'Системные настройки' :
              diagnostic.check_name === 'orders_system' ? 'Система заказов' :
              diagnostic.check_name === 'edge_functions' ? 'Edge Functions' :
              diagnostic.check_name,
        description: diagnostic.check_type === 'database' ? 'Подключение к Supabase' :
                    diagnostic.check_type === 'configuration' ? 'Конфигурация системы' :
                    diagnostic.check_type === 'operations' ? 'Операционные процессы' :
                    diagnostic.check_type === 'infrastructure' ? 'Инфраструктура' :
                    `Проверка ${diagnostic.check_type}`,
        status: statusMap[diagnostic.status] || 'warning',
        icon: diagnostic.check_type === 'database' ? Database :
              diagnostic.check_type === 'configuration' ? Shield :
              diagnostic.check_type === 'operations' ? CheckCircle :
              diagnostic.check_type === 'infrastructure' ? Zap :
              Globe,
        details: typeof diagnostic.details === 'object' ? 
                JSON.stringify(diagnostic.details, null, 2) : 
                String(diagnostic.details || 'Проверка выполнена')
      });
    });

    // Add domain check if not present
    if (!checks.some(c => c.id.includes('domain'))) {
      const currentDomain = window.location.hostname;
      const isProduction = !currentDomain.includes('localhost') && !currentDomain.includes('lovable.app');
      const hasSSL = window.location.protocol === 'https:';
      
      checks.push({
        id: 'domain',
        name: 'Домен и SSL',
        description: 'Продакшн домен с HTTPS',
        status: isProduction && hasSSL ? 'passed' : 'warning',
        icon: Globe,
        details: `${currentDomain} (${hasSSL ? 'HTTPS' : 'HTTP'})`
      });
    }

    return checks;
  };

  const checks = getSystemChecks();

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
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Проверка системы...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-destructive">
            <AlertCircle className="h-8 w-8 mx-auto mb-4" />
            <p>Ошибка при проверке системы: {error}</p>
            <Button onClick={runDiagnostics} className="mt-4">
              Повторить проверку
            </Button>
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
            <Button onClick={runDiagnostics} variant="outline" className="w-full">
              Повторить проверку
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}