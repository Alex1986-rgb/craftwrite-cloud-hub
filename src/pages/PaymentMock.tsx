import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, CreditCard, AlertCircle } from 'lucide-react';

export default function PaymentMock() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [paymentProcessed, setPaymentProcessed] = useState(false);

  const paymentId = searchParams.get('payment_id');
  const amount = searchParams.get('amount');
  const currency = searchParams.get('currency');
  const description = searchParams.get('description');

  useEffect(() => {
    if (!paymentId || !amount) {
      navigate('/');
    }
  }, [paymentId, amount, navigate]);

  const processPayment = async (success: boolean) => {
    setLoading(true);
    try {
      const status = success ? 'completed' : 'failed';
      
      // Update payment status
      const { error: paymentError } = await supabase
        .from('payments')
        .update({ 
          payment_status: status,
          completed_at: success ? new Date().toISOString() : null
        })
        .eq('id', paymentId);

      if (paymentError) throw paymentError;

      // Get payment details to update order
      const { data: payment, error: getPaymentError } = await supabase
        .from('payments')
        .select('order_id')
        .eq('id', paymentId)
        .single();

      if (getPaymentError || !payment) throw new Error('Платеж не найден');

      // Update order status
      const orderStatus = success ? 'payment_confirmed' : 'payment_pending';
      const { error: orderError } = await supabase
        .from('orders')
        .update({ 
          status: orderStatus,
          payment_status: status
        })
        .eq('id', payment.order_id);

      if (orderError) throw orderError;

      setPaymentProcessed(true);

      if (success) {
        toast({
          title: 'Платеж успешен!',
          description: 'Ваш заказ принят в работу.',
        });

        // Notify admin via Telegram
        await supabase.functions.invoke('telegram-order-notifications', {
          body: {
            order_id: payment.order_id,
            event_type: 'payment_completed',
            message: `✅ Платеж на сумму ${Number(amount)/100} ${currency} успешно завершен для заказа #${payment.order_id.slice(0, 8)}`
          }
        });

        setTimeout(() => {
          navigate('/order-success');
        }, 3000);
      } else {
        toast({
          title: 'Платеж отклонен',
          description: 'Попробуйте еще раз или обратитесь в поддержку.',
          variant: 'destructive',
        });
      }

    } catch (error: any) {
      console.error('Error processing payment:', error);
      toast({
        title: 'Ошибка',
        description: error.message || 'Не удалось обработать платеж',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const formatAmount = (amount: string) => {
    return (Number(amount) / 100).toLocaleString();
  };

  if (paymentProcessed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Платеж завершен!</h2>
            <p className="text-gray-600 mb-6">
              Перенаправляем вас на страницу успешного заказа...
            </p>
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <CreditCard className="w-6 h-6" />
              Имитация оплаты
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-amber-800">Тестовый режим</span>
              </div>
              <p className="text-sm text-amber-700">
                Это демонстрационная страница оплаты. В реальной системе здесь будет интеграция с платежными системами.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Описание:</span>
                <span className="font-medium">{description}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Сумма:</span>
                <span className="font-bold text-lg">{formatAmount(amount || '0')} {currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Платеж ID:</span>
                <span className="text-sm text-gray-500">#{paymentId?.slice(0, 8)}</span>
              </div>
            </div>

            <div className="border-t pt-6 space-y-3">
              <p className="text-sm text-gray-600 text-center">
                Выберите результат для тестирования:
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => processPayment(true)}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {loading ? 'Обработка...' : 'Успешная оплата'}
                </Button>
                
                <Button
                  onClick={() => processPayment(false)}
                  disabled={loading}
                  variant="destructive"
                  className="w-full"
                >
                  {loading ? 'Обработка...' : 'Отклонить платеж'}
                </Button>
              </div>
            </div>

            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={() => navigate('/')}
                className="text-sm"
              >
                Вернуться на главную
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}