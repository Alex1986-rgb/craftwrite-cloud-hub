import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  RefreshCw, 
  Settings,
  Database,
  Monitor,
  Zap,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useSystemDiagnostics } from '@/hooks/useSystemDiagnostics';
import { useOrderProcessingQueue } from '@/hooks/useOrderProcessingQueue';
import { useSystemSettings } from '@/hooks/useSystemSettings';

export default function EnhancedSystemMonitor() {
  const [activeTab, setActiveTab] = useState('overview');
  const { 
    diagnostics, 
    loading: diagLoading, 
    error: diagError, 
    runDiagnostics,
    getOverallStatus,
    getStatusCounts,
    getDiagnosticsByType
  } = useSystemDiagnostics();
  
  const {
    queueItems,
    loading: queueLoading,
    error: queueError,
    processQueue,
    getQueueStats,
    getPendingItems
  } = useOrderProcessingQueue();

  const { getSetting } = useSystemSettings();

  const overallStatus = getOverallStatus();
  const statusCounts = getStatusCounts();
  const queueStats = getQueueStats();
  const pendingItems = getPendingItems();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'pass':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'critical':
      case 'fail':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Monitor className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'pass':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical':
      case 'fail':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Расширенный мониторинг системы</h2>
          <p className="text-muted-foreground">
            Комплексная диагностика и управление производительностью
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={runDiagnostics}
            disabled={diagLoading}
            size="sm"
            variant="outline"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${diagLoading ? 'animate-spin' : ''}`} />
            Обновить диагностику
          </Button>
          <Button
            onClick={processQueue}
            disabled={queueLoading}
            size="sm"
          >
            <Zap className="w-4 h-4 mr-2" />
            Обработать очередь
          </Button>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className={`border-2 ${getStatusColor(overallStatus)}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              {getStatusIcon(overallStatus)}
              <div>
                <div className="font-medium">Общий статус</div>
                <div className="text-sm capitalize">{overallStatus}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium">Проверки</div>
                <div className="text-sm">
                  {diagnostics.length} выполнено
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-purple-600" />
              <div>
                <div className="font-medium">Очередь</div>
                <div className="text-sm">
                  {pendingItems.length} ожидают
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium">Продакшен</div>
                <div className="text-sm">
                  {getSetting('production_mode') ? 'Включен' : 'Отключен'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Errors Display */}
      {(diagError || queueError) && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {diagError || queueError}
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="diagnostics">Диагностика</TabsTrigger>
          <TabsTrigger value="queue">Очередь</TabsTrigger>
          <TabsTrigger value="settings">Настройки</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Статус проверок
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(statusCounts).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(status)}
                      <span className="capitalize">{status}</span>
                    </div>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Очередь обработки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(queueStats).map(([status, count]) => (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(status)}
                      <span className="capitalize">{status}</span>
                    </div>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="diagnostics">
          <div className="space-y-4">
            {['database', 'configuration', 'operations'].map(type => {
              const typeDiagnostics = getDiagnosticsByType(type);
              if (typeDiagnostics.length === 0) return null;

              return (
                <Card key={type}>
                  <CardHeader>
                    <CardTitle className="capitalize">{type} диагностика</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {typeDiagnostics.map((diagnostic, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(diagnostic.status)}
                            <div>
                              <div className="font-medium">{diagnostic.check_name}</div>
                              {diagnostic.error_message && (
                                <div className="text-sm text-red-600">{diagnostic.error_message}</div>
                              )}
                            </div>
                          </div>
                          <Badge className={getStatusColor(diagnostic.status)}>
                            {diagnostic.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="queue">
          <Card>
            <CardHeader>
              <CardTitle>Очередь обработки заказов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {queueItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Очередь пуста
                  </div>
                ) : (
                  queueItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(item.status)}
                        <div>
                          <div className="font-medium">{item.processing_step}</div>
                          <div className="text-sm text-muted-foreground">
                            Заказ: {item.order_id.slice(0, 8)}...
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Попыток: {item.attempts}/{item.max_attempts}
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Производственные настройки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium">Аналитика</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Google Analytics</span>
                      <Badge variant={getSetting('google_analytics_enabled') ? 'default' : 'secondary'}>
                        {getSetting('google_analytics_enabled') ? 'Включен' : 'Отключен'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Яндекс.Метрика</span>
                      <Badge variant={getSetting('yandex_metrika_enabled') ? 'default' : 'secondary'}>
                        {getSetting('yandex_metrika_enabled') ? 'Включена' : 'Отключена'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Система</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Режим продакшена</span>
                      <Badge variant={getSetting('production_mode') ? 'default' : 'secondary'}>
                        {getSetting('production_mode') ? 'Включен' : 'Отключен'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Статус запуска</span>
                      <Badge variant="outline">
                        {getSetting('launch_status', 'preparing')}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}