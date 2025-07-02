import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell,
  Mail,
  MessageCircle,
  Settings,
  Send,
  Users,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface NotificationTemplate {
  id: string;
  name: string;
  type: 'email' | 'telegram' | 'sms';
  trigger: string;
  subject: string;
  content: string;
  is_active: boolean;
  variables: string[];
}

interface NotificationLog {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  status: 'sent' | 'failed' | 'pending';
  sent_at: string;
  delivery_status?: string;
}

interface NotificationSettings {
  email_enabled: boolean;
  telegram_enabled: boolean;
  sms_enabled: boolean;
  order_notifications: boolean;
  payment_notifications: boolean;
  system_notifications: boolean;
  telegram_bot_token?: string;
  smtp_settings?: {
    host: string;
    port: number;
    username: string;
    password: string;
  };
}

export default function NotificationSystem() {
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [logs, setLogs] = useState<NotificationLog[]>([]);
  const [settings, setSettings] = useState<NotificationSettings>({
    email_enabled: true,
    telegram_enabled: false,
    sms_enabled: false,
    order_notifications: true,
    payment_notifications: true,
    system_notifications: true
  });
  const [loading, setLoading] = useState(true);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    type: 'email' as const,
    trigger: '',
    subject: '',
    content: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Загружаем шаблоны уведомлений
      const mockTemplates: NotificationTemplate[] = [
        {
          id: '1',
          name: 'Заказ готов',
          type: 'email',
          trigger: 'order_completed',
          subject: 'Ваш заказ {{order_id}} готов!',
          content: 'Здравствуйте, {{client_name}}!\n\nВаш заказ "{{service_name}}" успешно выполнен.',
          is_active: true,
          variables: ['order_id', 'client_name', 'service_name']
        },
        {
          id: '2',
          name: 'Уведомление в Telegram',
          type: 'telegram',
          trigger: 'order_created',
          subject: '',
          content: '🔔 Новый заказ: {{service_name}}\n👤 Клиент: {{client_name}}\n💰 Сумма: {{amount}}₽',
          is_active: true,
          variables: ['service_name', 'client_name', 'amount']
        }
      ];

      // Загружаем логи уведомлений
      const mockLogs: NotificationLog[] = [
        {
          id: '1',
          user_id: 'user1',
          type: 'email',
          title: 'Заказ готов',
          message: 'Ваш заказ SEO-статья готов',
          status: 'sent',
          sent_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          delivery_status: 'delivered'
        },
        {
          id: '2',
          user_id: 'admin',
          type: 'telegram',
          title: 'Новый заказ',
          message: 'Получен новый заказ на лендинг',
          status: 'sent',
          sent_at: new Date(Date.now() - 1000 * 60 * 60).toISOString()
        }
      ];

      setTemplates(mockTemplates);
      setLogs(mockLogs);
    } catch (error) {
      console.error('Error loading notification data:', error);
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить данные уведомлений",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createTemplate = async () => {
    if (!newTemplate.name || !newTemplate.content) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    const template: NotificationTemplate = {
      id: crypto.randomUUID(),
      ...newTemplate,
      is_active: true,
      variables: extractVariables(newTemplate.content)
    };

    setTemplates(prev => [template, ...prev]);
    setNewTemplate({ name: '', type: 'email', trigger: '', subject: '', content: '' });

    toast({
      title: "Шаблон создан",
      description: "Шаблон уведомления успешно создан",
    });
  };

  const extractVariables = (content: string): string[] => {
    const matches = content.match(/{{([^}]+)}}/g);
    return matches ? matches.map(match => match.slice(2, -2)) : [];
  };

  const toggleTemplate = async (id: string) => {
    setTemplates(prev => prev.map(template => 
      template.id === id 
        ? { ...template, is_active: !template.is_active }
        : template
    ));

    toast({
      title: "Статус обновлен",
      description: "Статус шаблона успешно изменен",
    });
  };

  const sendTestNotification = async (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;

    toast({
      title: "Тестовое уведомление отправлено",
      description: `Отправлено ${template.type} уведомление`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'telegram': return <MessageCircle className="h-4 w-4" />;
      case 'sms': return <Bell className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Система уведомлений</h2>
        <p className="text-muted-foreground">
          Автоматические уведомления для клиентов и администраторов
        </p>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">
            <Mail className="h-4 w-4 mr-2" />
            Шаблоны
          </TabsTrigger>
          <TabsTrigger value="logs">
            <Clock className="h-4 w-4 mr-2" />
            Логи ({logs.length})
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Настройки
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Создать шаблон</CardTitle>
                <CardDescription>
                  Новый шаблон для автоматических уведомлений
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Название шаблона"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newTemplate.type}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, type: e.target.value as any }))}
                  >
                    <option value="email">Email</option>
                    <option value="telegram">Telegram</option>
                    <option value="sms">SMS</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Триггер (order_created, order_completed)"
                    value={newTemplate.trigger}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, trigger: e.target.value }))}
                  />
                  {newTemplate.type === 'email' && (
                    <Input
                      placeholder="Тема письма"
                      value={newTemplate.subject}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, subject: e.target.value }))}
                    />
                  )}
                </div>

                <Textarea
                  placeholder="Содержание уведомления (используйте {{переменная}} для подстановки)"
                  rows={4}
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                />

                <Button onClick={createTemplate} className="w-full">
                  Создать шаблон
                </Button>
              </CardContent>
            </Card>

            {templates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {getTypeIcon(template.type)}
                        {template.name}
                      </CardTitle>
                      <CardDescription>
                        Триггер: {template.trigger} • Переменные: {template.variables.join(', ')}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={template.is_active}
                        onCheckedChange={() => toggleTemplate(template.id)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => sendTestNotification(template.id)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {template.subject && (
                    <div className="mb-2">
                      <strong>Тема:</strong> {template.subject}
                    </div>
                  )}
                  <div className="p-3 bg-muted rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm">{template.content}</pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs">
          <div className="space-y-4">
            {logs.map((log) => (
              <Card key={log.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(log.type)}
                      <div>
                        <div className="font-medium">{log.title}</div>
                        <div className="text-sm text-muted-foreground">{log.message}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(log.status)}>
                        {log.status === 'sent' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {log.status === 'failed' && <AlertCircle className="h-3 w-3 mr-1" />}
                        {log.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                        {log.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(log.sent_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Общие настройки</CardTitle>
                <CardDescription>Включение/отключение типов уведомлений</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <label>Email уведомления</label>
                  <Switch 
                    checked={settings.email_enabled}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, email_enabled: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label>Telegram уведомления</label>
                  <Switch 
                    checked={settings.telegram_enabled}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, telegram_enabled: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label>SMS уведомления</label>
                  <Switch 
                    checked={settings.sms_enabled}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, sms_enabled: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Категории уведомлений</CardTitle>
                <CardDescription>Настройка типов событий</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <label>Уведомления о заказах</label>
                  <Switch 
                    checked={settings.order_notifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, order_notifications: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label>Уведомления о платежах</label>
                  <Switch 
                    checked={settings.payment_notifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, payment_notifications: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label>Системные уведомления</label>
                  <Switch 
                    checked={settings.system_notifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, system_notifications: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Настройки интеграций</CardTitle>
                <CardDescription>Конфигурация внешних сервисов</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Telegram Bot Token</label>
                  <Input 
                    type="password"
                    placeholder="Введите токен бота"
                    value={settings.telegram_bot_token || ''}
                    onChange={(e) => setSettings(prev => ({ ...prev, telegram_bot_token: e.target.value }))}
                  />
                </div>
                
                <Button onClick={() => toast({ title: "Настройки сохранены" })}>
                  Сохранить настройки
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}