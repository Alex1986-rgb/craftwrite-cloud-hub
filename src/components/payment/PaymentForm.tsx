
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Smartphone, Building2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface PaymentFormProps {
  orderId: string;
  amount: number;
  description: string;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
}

export default function PaymentForm({ 
  orderId, 
  amount, 
  description, 
  onSuccess, 
  onError 
}: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!customerEmail) {
      toast.error('Введите email для получения чека');
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('modulbank-payment', {
        body: {
          orderId,
          amount,
          description,
          customerEmail,
          customerPhone
        }
      });

      if (error) throw error;

      if (data.success && data.payment_url) {
        // Перенаправляем на страницу оплаты ModulBank
        window.location.href = data.payment_url;
      } else {
        throw new Error(data.error || 'Ошибка создания платежа');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      const errorMessage = error.message || 'Ошибка при создании платежа';
      toast.error(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Оплата заказа
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Сумма к оплате:</span>
            <span className="text-lg font-semibold">{formatPrice(amount)}</span>
          </div>
          <div className="text-sm text-slate-500 mt-1">{description}</div>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="payment-method">Способ оплаты</Label>
            <RadioGroup 
              value={paymentMethod} 
              onValueChange={setPaymentMethod}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                  <CreditCard className="w-4 h-4" />
                  Банковская карта
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sbp" id="sbp" />
                <Label htmlFor="sbp" className="flex items-center gap-2 cursor-pointer">
                  <Smartphone className="w-4 h-4" />
                  Система быстрых платежей (СБП)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                  <Building2 className="w-4 h-4" />
                  Интернет-банкинг
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-3">
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
              <Label htmlFor="phone">Телефон (необязательно)</Label>
              <Input
                id="phone"
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+7 (999) 123-45-67"
              />
            </div>
          </div>

          <Button 
            onClick={handlePayment}
            disabled={loading || !customerEmail}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Создание платежа...
              </>
            ) : (
              `Оплатить ${formatPrice(amount)}`
            )}
          </Button>

          <div className="text-xs text-slate-500 text-center">
            Нажимая кнопку "Оплатить", вы соглашаетесь с условиями оферты и переходите на защищенную страницу оплаты МодульБанк
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
