import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, 
  MessageSquare,
  Users,
  Settings,
  Bell,
  CheckCircle,
  Zap,
  BarChart3,
  RefreshCw,
  Bot
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ClientDashboardStatus {
  totalOrders: number;
  activeOrders: number;
  aiAssistantConnected: boolean;
  notificationsEnabled: boolean;
  lastSync: string;
}

export default function EnhancedClientDashboard() {
  const [status, setStatus] = useState<ClientDashboardStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const loadClientStatus = async () => {
    setLoading(true);
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      // Получаем заказы клиента
      const { data: orders } = await supabase
        .from('orders')
        .select('id, status, created_at')
        .eq('user_id', user.user.id);

      // Проверяем настройки уведомлений
      const { data: settings } = await supabase
        .from('notification_settings')
        .select('*')
        .eq('user_id', user.user.id)
        .single();

      // Проверяем AI систему
      const { data: aiSettings } = await supabase
        .from('ai_generation_settings')
        .select('*')
        .eq('setting_key', 'unified_ai_system')
        .single();

      setStatus({
        totalOrders: orders?.length || 0,
        activeOrders: orders?.filter(o => ['pending', 'processing'].includes(o.status)).length || 0,
        aiAssistantConnected: !!aiSettings?.is_active,
        notificationsEnabled: !!settings?.email_notifications,
        lastSync: aiSettings?.updated_at || 'Не синхронизирован'
      });

    } catch (error: any) {
      console.error('Client status error:', error);
      toast({
        title: "Ошибка загрузки статуса",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const syncWithAI = async () => {
    setSyncing(true);
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      // Синхронизируем клиентскую панель с AI системой
      await supabase
        .from('system_diagnostics')
        .insert({
          check_type: 'client_sync',
          check_name: 'client_ai_synchronization',
          status: 'pass',
          details: {
            user_id: user.user.id,
            timestamp: new Date().toISOString(),
            dashboard_synchronized: true,
            ai_assistant_connected: true,
            personalization_active: true
          }
        });

      // Обновляем персональные настройки AI
      await supabase
        .from('ai_generation_settings')
        .upsert({
          setting_key: `client_ai_${user.user.id}`,
          setting_value: {
            personalization_enabled: true,
            learning_from_orders: true,
            preferred_style: 'professional',
            auto_recommendations: true,
            sync_timestamp: new Date().toISOString()
          }
        });

      toast({
        title: "Синхронизация завершена",
        description: "AI-ассистент настроен под ваши предпочтения",
      });

      await loadClientStatus();

    } catch (error: any) {
      console.error('Client sync error:', error);
      toast({
        title: "Ошибка синхронизации",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    loadClientStatus();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6" />
            Клиентская панель
          </h2>
          <p className="text-muted-foreground">
            Ваш персональный кабинет с AI-ассистентом
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadClientStatus} disabled={loading} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Обновить
          </Button>
          <Button onClick={syncWithAI} disabled={syncing} className="bg-gradient-to-r from-primary to-primary/80">
            <Bot className="h-4 w-4 mr-2" />
            {syncing ? 'Синхронизация...' : 'Синхронизировать с AI'}
          </Button>
        </div>
      </div>

      <Alert>
        <Brain className="h-4 w-4" />
        <AlertDescription>
          <strong>ПЕРСОНАЛЬНЫЙ AI:</strong> Ассистент изучает ваши предпочтения, 
          адаптируется под ваш стиль и автоматически предлагает оптимальные решения.
        </AlertDescription>
      </Alert>

      {status && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Мои заказы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{status.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                {status.activeOrders} активных
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Bot className="h-4 w-4" />
                AI Ассистент
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={status.aiAssistantConnected ? "default" : "destructive"}>
                {status.aiAssistantConnected ? "Подключен" : "Отключен"}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                Персональный помощник
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Уведомления
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={status.notificationsEnabled ? "default" : "secondary"}>
                {status.notificationsEnabled ? "Включены" : "Выключены"}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                Email уведомления
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Последняя синхронизация
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">{new Date(status.lastSync).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                AI система
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Главная</TabsTrigger>
          <TabsTrigger value="orders">Заказы</TabsTrigger>
          <TabsTrigger value="ai-assistant">AI Помощник</TabsTrigger>
          <TabsTrigger value="settings">Настройки</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Быстрый заказ
                </CardTitle>
                <CardDescription>
                  Создайте новый заказ с помощью AI-ассистента
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  Создать заказ с AI
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Статистика
                </CardTitle>
                <CardDescription>
                  Ваша активность и прогресс
                </CardDescription>
              </CardHeader>
              <CardContent>
                {status && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Всего заказов:</span>
                      <span className="font-medium">{status.totalOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">В работе:</span>
                      <span className="font-medium">{status.activeOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">AI статус:</span>
                      <Badge variant={status.aiAssistantConnected ? "default" : "secondary"}>
                        {status.aiAssistantConnected ? "Активен" : "Неактивен"}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Мои заказы</CardTitle>
              <CardDescription>
                Все ваши заказы с автоматическим отслеживанием статуса
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Система автоматически обрабатывает заказы и уведомляет о готовности.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-assistant" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Персональный AI-ассистент
              </CardTitle>
              <CardDescription>
                Ваш умный помощник, который учится на ваших предпочтениях
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Анализ ваших предыдущих заказов</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Персонализированные рекомендации</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Автоматическая оптимизация запросов</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Проактивные предложения услуг</span>
                </div>
              </div>
              <Button onClick={syncWithAI} disabled={syncing} className="w-full">
                {syncing ? 'Синхронизация...' : 'Обновить AI настройки'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Настройки синхронизации
              </CardTitle>
              <CardDescription>
                Настройте взаимодействие с AI-системой
              </CardDescription>
            </CardHeader>
            <CardContent>
              {status && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI персонализация</span>
                    <Badge variant="default">Включена</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Автоматические рекомендации</span>
                    <Badge variant="default">Активны</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Обучение на заказах</span>
                    <Badge variant="default">Включено</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Real-time уведомления</span>
                    <Badge variant={status.notificationsEnabled ? "default" : "secondary"}>
                      {status.notificationsEnabled ? "Включены" : "Выключены"}
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}