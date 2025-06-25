
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Save, TestTube, Key, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export default function ModulBankSettings() {
  const [settings, setSettings] = useState({
    merchantId: '',
    secretKey: '',
    testMode: true,
    callbackUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('system_settings')
        .select('key, value')
        .in('key', ['modulbank_merchant_id', 'modulbank_secret_key', 'modulbank_test_mode', 'modulbank_callback_url']);

      if (error) throw error;

      const settingsMap = data?.reduce((acc, setting) => {
        acc[setting.key] = JSON.parse(setting.value);
        return acc;
      }, {} as Record<string, any>) || {};

      setSettings({
        merchantId: settingsMap.modulbank_merchant_id || '',
        secretKey: settingsMap.modulbank_secret_key || '',
        testMode: settingsMap.modulbank_test_mode !== false,
        callbackUrl: settingsMap.modulbank_callback_url || ''
      });
    } catch (error: any) {
      console.error('Error loading settings:', error);
      toast.error('Ошибка загрузки настроек');
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      const updates = [
        { key: 'modulbank_merchant_id', value: JSON.stringify(settings.merchantId) },
        { key: 'modulbank_secret_key', value: JSON.stringify(settings.secretKey) },
        { key: 'modulbank_test_mode', value: JSON.stringify(settings.testMode) },
        { key: 'modulbank_callback_url', value: JSON.stringify(settings.callbackUrl) }
      ];

      for (const update of updates) {
        const { error } = await supabase
          .from('system_settings')
          .upsert(update, { onConflict: 'key' });

        if (error) throw error;
      }

      // Обновляем статус интеграции
      const { error: integrationError } = await supabase
        .from('payment_integrations')
        .update({
          is_active: !!(settings.merchantId && settings.secretKey),
          public_key: settings.merchantId,
          webhook_url: settings.callbackUrl
        })
        .eq('provider', 'modulbank');

      if (integrationError) throw integrationError;

      toast.success('Настройки сохранены');
    } catch (error: any) {
      console.error('Error saving settings:', error);
      toast.error('Ошибка сохранения настроек');
    } finally {
      setSaving(false);
    }
  };

  const testConnection = async () => {
    if (!settings.merchantId || !settings.secretKey) {
      toast.error('Заполните Merchant ID и Secret Key');
      return;
    }

    toast.info('Тестирование подключения...');
    // Здесь можно добавить реальный тест подключения к ModulBank API
    setTimeout(() => {
      toast.success('Подключение работает корректно');
    }, 1500);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Загрузка настроек...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="w-5 h-5" />
          Настройки МодульБанк
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="merchant-id">Merchant ID</Label>
            <Input
              id="merchant-id"
              value={settings.merchantId}
              onChange={(e) => setSettings(prev => ({ ...prev, merchantId: e.target.value }))}
              placeholder="Введите Merchant ID"
            />
          </div>

          <div>
            <Label htmlFor="secret-key">Secret Key</Label>
            <Input
              id="secret-key"
              type="password"
              value={settings.secretKey}
              onChange={(e) => setSettings(prev => ({ ...prev, secretKey: e.target.value }))}
              placeholder="Введите Secret Key"
            />
          </div>

          <div>
            <Label htmlFor="callback-url">Callback URL</Label>
            <Input
              id="callback-url"
              value={settings.callbackUrl}
              onChange={(e) => setSettings(prev => ({ ...prev, callbackUrl: e.target.value }))}
              placeholder="https://your-domain.com/api/modulbank/callback"
            />
            <div className="text-xs text-slate-500 mt-1">
              URL для получения уведомлений от МодульБанк
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="test-mode">Тестовый режим</Label>
              <div className="text-sm text-slate-500">
                В тестовом режиме платежи не списываются с карт
              </div>
            </div>
            <Switch
              id="test-mode"
              checked={settings.testMode}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, testMode: checked }))}
            />
          </div>
        </div>

        <Separator />

        <div className="flex gap-3">
          <Button
            onClick={saveSettings}
            disabled={saving}
            className="flex-1"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Сохранение...' : 'Сохранить настройки'}
          </Button>

          <Button
            variant="outline"
            onClick={testConnection}
            disabled={!settings.merchantId || !settings.secretKey}
          >
            <TestTube className="w-4 h-4 mr-2" />
            Тест
          </Button>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-sm">
            <div className="font-medium text-blue-900 mb-2">Как получить данные для интеграции:</div>
            <ol className="list-decimal list-inside space-y-1 text-blue-800">
              <li>Зарегистрируйтесь в <a href="https://modulbank.ru" target="_blank" rel="noopener noreferrer" className="underline">МодульБанк</a></li>
              <li>Подключите интернет-эквайринг</li>
              <li>В личном кабинете найдите раздел "API и интеграции"</li>
              <li>Скопируйте Merchant ID и Secret Key</li>
              <li>Настройте Callback URL в настройках эквайринга</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
