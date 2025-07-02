
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useOrderSystem } from '@/hooks/useOrderSystem';
import { useSystemSettings } from '@/hooks/useSystemSettings';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function OrderSystemTest() {
  const { createOrder, loading, error } = useOrderSystem();
  const { settings, loading: settingsLoading } = useSystemSettings();
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [formData, setFormData] = useState({
    service_name: 'SEO-статья',
    service_slug: 'seo-article',
    details: 'Тестовая статья для проверки системы заказов',
    contact_name: 'Тестовый пользователь',
    contact_email: 'test@example.com',
    contact_phone: '+7 900 123-45-67',
    estimated_price: 5000,
    additional_requirements: 'Дополнительные требования к тестовому заказу'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setOrderId('');

    try {
      const order = await createOrder(formData);
      setSuccess(true);
      setOrderId(order.id);
    } catch (err) {
      console.error('Order creation failed:', err);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (settingsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Загрузка системных настроек...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Тестирование системы заказов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            {/* System Settings Display */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Системные настройки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <strong>Название сайта:</strong> {settings.site_title || 'Не установлено'}
                </div>
                <div className="text-sm">
                  <strong>Валюта:</strong> {settings.default_currency || 'RUB'}
                </div>
                <div className="text-sm">
                  <strong>Мин. сумма заказа:</strong> {settings.min_order_amount ? `${settings.min_order_amount / 100} руб.` : 'Не установлено'}
                </div>
                <div className="text-sm">
                  <strong>Аналитика:</strong> {settings.analytics_enabled ? '✅ Включена' : '❌ Отключена'}
                </div>
                <div className="text-sm">
                  <strong>Google Analytics:</strong> {settings.google_analytics_id || 'Не установлен'}
                </div>
                <div className="text-sm">
                  <strong>Яндекс.Метрика:</strong> {settings.yandex_metrica_id || 'Не установлен'}
                </div>
              </CardContent>
            </Card>

            {/* Order Form Test */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Тест создания заказа</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Название услуги"
                    value={formData.service_name}
                    onChange={(e) => handleInputChange('service_name', e.target.value)}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => handleInputChange('contact_email', e.target.value)}
                  />
                  <Input
                    placeholder="Имя"
                    value={formData.contact_name}
                    onChange={(e) => handleInputChange('contact_name', e.target.value)}
                  />
                  <Input
                    placeholder="Цена (в копейках)"
                    type="number"
                    value={formData.estimated_price}
                    onChange={(e) => handleInputChange('estimated_price', parseInt(e.target.value))}
                  />
                  <Textarea
                    placeholder="Описание заказа"
                    value={formData.details}
                    onChange={(e) => handleInputChange('details', e.target.value)}
                  />
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Создание заказа...
                      </>
                    ) : (
                      'Создать тестовый заказ'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Status Messages */}
          <div className="space-y-4 mt-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  ✅ Заказ успешно создан! ID: {orderId}
                  <br />
                  Аналитические события отправлены в консоль разработчика.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
