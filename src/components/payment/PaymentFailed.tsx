
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

export default function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get('order_id');
  const error = searchParams.get('error');

  const handleRetry = () => {
    if (orderId) {
      navigate(`/order/payment/${orderId}`);
    } else {
      navigate('/services');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>
          <CardTitle className="text-2xl text-red-700">
            Ошибка оплаты
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-sm text-red-600 mb-1">Причина ошибки</div>
            <div className="text-sm text-red-700">
              {error || 'Платеж был отклонен или отменен'}
            </div>
          </div>

          {orderId && (
            <div className="text-sm text-slate-600">
              <div>Номер заказа: <span className="font-mono">{orderId}</span></div>
            </div>
          )}

          <div className="text-sm text-slate-500">
            Попробуйте еще раз или свяжитесь с нашей службой поддержки для решения проблемы.
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleRetry}
              className="w-full"
              size="lg"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Повторить оплату
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              На главную страницу
            </Button>
          </div>

          <div className="text-xs text-slate-400">
            Если проблема повторяется, обратитесь в службу поддержки
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
