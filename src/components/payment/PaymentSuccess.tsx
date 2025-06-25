
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const orderId = searchParams.get('order_id');
  const amount = searchParams.get('amount');

  useEffect(() => {
    if (orderId) {
      // Здесь можно загрузить детали заказа
      toast.success('Платеж успешно завершен!');
    }
  }, [orderId]);

  const formatPrice = (price: string) => {
    const numPrice = parseFloat(price);
    return numPrice.toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-green-700">
            Платеж успешен!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm text-green-600 mb-1">Сумма платежа</div>
            <div className="text-xl font-semibold text-green-700">
              {amount ? formatPrice(amount) : 'Загрузка...'}
            </div>
          </div>

          {orderId && (
            <div className="text-sm text-slate-600">
              <div>Номер заказа: <span className="font-mono">{orderId}</span></div>
            </div>
          )}

          <div className="text-sm text-slate-500">
            Ваш заказ принят в работу. Мы отправим уведомление на указанный email, когда заказ будет готов.
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/client')}
              className="w-full"
              size="lg"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Перейти в личный кабинет
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full"
            >
              На главную страницу
            </Button>
          </div>

          <div className="text-xs text-slate-400">
            Чек об оплате отправлен на указанный email
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
