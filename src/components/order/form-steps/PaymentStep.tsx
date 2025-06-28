import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Wallet, Building, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import BankCardForm from '@/components/payment/BankCardForm';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  fee: number;
  description: string;
  supported: boolean;
}

interface CardData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

interface PaymentStepProps {
  selectedMethod: string;
  onMethodSelect: (method: string) => void;
  totalAmount: number;
  onPayment: () => void;
  loading: boolean;
  orderData?: any;
}

export default function PaymentStep({
  selectedMethod,
  onMethodSelect,
  totalAmount,
  onPayment,
  loading,
  orderData
}: PaymentStepProps) {
  const [customerEmail, setCustomerEmail] = useState(orderData?.contact_email || '');
  const [customerPhone, setCustomerPhone] = useState(orderData?.contact_phone || '');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Банковская карта',
      icon: <CreditCard className="w-5 h-5" />,
      fee: 0,
      description: 'Visa, MasterCard, МИР',
      supported: true
    },
    {
      id: 'yookassa',
      name: 'ЮKassa',
      icon: <Wallet className="w-5 h-5" />,
      fee: 2.9,
      description: 'Банковские карты, СБП, электронные кошельки',
      supported: true
    },
    {
      id: 'bank',
      name: 'Банковский перевод',
      icon: <Building className="w-5 h-5" />,
      fee: 0,
      description: 'Для юридических лиц',
      supported: true
    }
  ];

  const handleCardPayment = async (cardData: CardData) => {
    if (!customerEmail) {
      toast.error('Введите email для получения чека');
      return;
    }

    setPaymentLoading(true);

    try {
      // В реальной системе здесь будет интеграция с процессингом
      // Пока создаем заказ и имитируем успешную оплату
      console.log('Processing card payment:', { cardData, amount: totalAmount });
      
      // Имитация обработки платежа
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Вызываем создание заказа
      await onPayment();
      
      toast.success('Платеж успешно обработан!');
    } catch (error: any) {
      console.error('Card payment error:', error);
      toast.error(error.message || 'Ошибка при обработке платежа');
    } finally {
      setPaymentLoading(false);
    }
  };

  const handlePaymentProcess = async () => {
    if (!selectedMethod) {
      toast.error('Выберите способ оплаты');
      return;
    }

    if (!customerEmail) {
      toast.error('Введите email для получения чека');
      return;
    }

    if (selectedMethod === 'card') {
      setShowCardForm(true);
      return;
    }

    setPaymentLoading(true);

    try {
      if (selectedMethod === 'yookassa') {
        // Создаем платеж через ЮKassa
        const { data, error } = await supabase.functions.invoke('yukassa-payment', {
          body: {
            amount: totalAmount,
            currency: 'RUB',
            description: `Оплата заказа: ${orderData?.service_name || 'Услуга'}`,
            order_id: Date.now().toString(),
            user_email: customerEmail,
            return_url: `${window.location.origin}/payment/success`
          }
        });

        if (error) throw error;

        if (data.confirmation_url) {
          window.location.href = data.confirmation_url;
        } else {
          throw new Error('Не удалось получить ссылку для оплаты');
        }
      } else if (selectedMethod === 'bank') {
        await onPayment();
        toast.success('Заказ создан. Мы отправим вам счет на оплату по электронной почте');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Ошибка при обработке платежа');
    } finally {
      setPaymentLoading(false);
    }
  };

  const finalAmount = selectedMethod === 'yookassa' 
    ? totalAmount + Math.round(totalAmount * 0.029)
    : totalAmount;

  if (showCardForm && selectedMethod === 'card') {
    return (
      <div className="space-y-4">
        <Button
          variant="outline"
          onClick={() => setShowCardForm(false)}
          className="mb-4"
        >
          ← Назад к выбору способа оплаты
        </Button>
        
        <BankCardForm
          onSubmit={handleCardPayment}
          loading={paymentLoading}
          amount={totalAmount}
          description={`Оплата заказа: ${orderData?.service_name || 'Услуга'}`}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Способ оплаты</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedMethod === method.id
                  ? 'border-blue-500 bg-blue-50'
                  : method.supported
                  ? 'border-gray-200 hover:border-blue-300'
                  : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
              }`}
              onClick={() => method.supported && onMethodSelect(method.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {method.icon}
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {method.name}
                      {!method.supported && (
                        <Badge variant="secondary" className="text-xs">
                          Скоро
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">{method.description}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  {method.fee > 0 ? (
                    <div className="text-sm text-orange-600">
                      +{method.fee}% комиссия
                    </div>
                  ) : (
                    <div className="text-sm text-green-600">
                      Без комиссии
                    </div>
                  )}
                </div>
              </div>

              {!method.supported && (
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <AlertCircle className="w-4 h-4" />
                  Этот способ оплаты пока недоступен
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {selectedMethod && (
        <Card>
          <CardHeader>
            <CardTitle>Данные для оплаты</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email для чека *</Label>
              <Input
                id="email"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="email@example.com"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+7 (999) 123-45-67"
              />
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Итого к оплате</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Стоимость услуги:</span>
              <span>{totalAmount.toLocaleString()} ₽</span>
            </div>
            {selectedMethod === 'yookassa' && (
              <div className="flex justify-between text-sm text-orange-600">
                <span>Комиссия ЮKassa (2.9%):</span>
                <span>+{Math.round(totalAmount * 0.029).toLocaleString()} ₽</span>
              </div>
            )}
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>К оплате:</span>
              <span className="text-green-600">
                {finalAmount.toLocaleString()} ₽
              </span>
            </div>
          </div>
          
          <Button 
            onClick={handlePaymentProcess}
            disabled={!selectedMethod || loading || paymentLoading || !customerEmail}
            className="w-full mt-4"
            size="lg"
          >
            {paymentLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Обработка платежа...
              </>
            ) : loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Создание заказа...
              </>
            ) : selectedMethod === 'yookassa' ? (
              'Перейти к оплате'
            ) : selectedMethod === 'bank' ? (
              'Создать заказ (оплата по счету)'
            ) : selectedMethod === 'card' ? (
              'Ввести данные карты'
            ) : (
              'Создать заказ'
            )}
          </Button>

          {selectedMethod === 'bank' && (
            <p className="text-sm text-gray-600 mt-2 text-center">
              После создания заказа мы отправим вам счет на указанный email
            </p>
          )}

          {selectedMethod === 'card' && (
            <p className="text-sm text-gray-600 mt-2 text-center">
              Безопасная обработка платежей с защитой данных
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
