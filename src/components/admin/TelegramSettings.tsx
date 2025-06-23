
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MessageCircle, Settings, Check, X } from 'lucide-react';

export default function TelegramSettings() {
  const [chatId, setChatId] = useState('');
  const [username, setUsername] = useState('');
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [testLoading, setTestLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_telegram_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setSettings(data);
        setChatId(data.chat_id.toString());
        setUsername(data.username || '');
      }
    } catch (error: any) {
      console.error('Ошибка загрузки настроек:', error);
    }
  };

  const saveSettings = async () => {
    if (!chatId) {
      toast.error('Введите Chat ID');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('admin_telegram_settings')
        .upsert({
          chat_id: parseInt(chatId),
          username: username || null,
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;

      setSettings(data);
      toast.success('Настройки Telegram сохранены');
    } catch (error: any) {
      console.error('Ошибка сохранения настроек:', error);
      toast.error('Ошибка сохранения настроек');
    } finally {
      setLoading(false);
    }
  };

  const sendTestMessage = async () => {
    if (!settings) {
      toast.error('Сначала сохраните настройки');
      return;
    }

    setTestLoading(true);
    try {
      const { error } = await supabase.functions.invoke('telegram-order-notifications', {
        body: {
          orderId: 'test-' + Date.now(),
          orderData: {
            contact_name: 'Тестовый клиент',
            contact_email: 'test@example.com',
            contact_phone: '+7 (999) 123-45-67',
            service_name: 'SEO-статья',
            estimated_price: 150000, // 1500₽ в копейках
            deadline: new Date().toISOString().split('T')[0],
            details: 'Это тестовое сообщение для проверки работы Telegram уведомлений',
            additional_requirements: 'Проверка интеграции'
          },
          promptText: 'Это тестовый промпт для проверки работы системы уведомлений в Telegram. Если вы получили это сообщение - интеграция работает корректно!'
        }
      });

      if (error) throw error;

      toast.success('Тестовое сообщение отправлено в Telegram');
    } catch (error: any) {
      console.error('Ошибка отправки тестового сообщения:', error);
      toast.error('Ошибка отправки: ' + error.message);
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Настройки Telegram</h2>
        <p className="text-slate-600">Настройка уведомлений о новых заказах</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Telegram Bot Configuration
          </CardTitle>
          <CardDescription>
            Настройте Telegram бота для получения уведомлений о новых заказах
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {settings && (
            <div className="flex items-center gap-2 mb-4">
              <Badge variant={settings.is_active ? 'default' : 'secondary'}>
                {settings.is_active ? (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    Активно
                  </>
                ) : (
                  <>
                    <X className="w-3 h-3 mr-1" />
                    Неактивно
                  </>
                )}
              </Badge>
              {settings.username && (
                <Badge variant="outline">@{settings.username}</Badge>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Chat ID *
              </label>
              <Input
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
                placeholder="Введите Chat ID"
                type="text"
              />
              <p className="text-xs text-slate-500 mt-1">
                Получите Chat ID от @userinfobot в Telegram
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Username (опционально)
              </label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@username"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={saveSettings} 
              disabled={loading}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              {loading ? 'Сохранение...' : 'Сохранить настройки'}
            </Button>

            {settings && (
              <Button 
                variant="outline" 
                onClick={sendTestMessage} 
                disabled={testLoading}
              >
                {testLoading ? 'Отправка...' : 'Тест'}
              </Button>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Инструкция по настройке:</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Создайте бота через @BotFather в Telegram</li>
              <li>2. Получите токен бота и добавьте его в переменные окружения (TELEGRAM_BOT_TOKEN)</li>
              <li>3. Получите ваш Chat ID через @userinfobot</li>
              <li>4. Введите Chat ID выше и сохраните настройки</li>
              <li>5. Отправьте тестовое сообщение для проверки</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
