
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Smartphone, Building2, Loader2, Shield, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { EnhancedFormField } from '@/components/ui/enhanced-form-field';
import { ModernSelect } from '@/components/ui/modern-select';

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const paymentOptions = [
    { value: 'card', label: 'Банковская карта', description: 'Visa, MasterCard, Мир' },
    { value: 'sbp', label: 'Система быстрых платежей', description: 'Мгновенный перевод через СБП' },
    { value: 'bank', label: 'Интернет-банкинг', description: 'Оплата через банк-клиент' }
  ];

  // Валидация полей
  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case 'customerEmail':
        if (!value.trim()) return 'Email обязателен для получения чека';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Введите корректный email';
        return null;
      case 'customerPhone':
        if (value && !/^\+?[1-9]\d{1,14}$/.test(value.replace(/\s/g, ''))) {
          return 'Введите корректный номер телефона';
        }
        return null;
      default:
        return null;
    }
  };

  const handlePayment = async () => {
    // Валидация полей
    const newErrors: { [key: string]: string } = {};
    const emailError = validateField('customerEmail', customerEmail);
    const phoneError = validateField('customerPhone', customerPhone);
    
    if (emailError) newErrors.customerEmail = emailError;
    if (phoneError) newErrors.customerPhone = phoneError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Пожалуйста, исправьте ошибки в форме');
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
    <Card className="w-full max-w-md mx-auto form-modern">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-3 text-2xl">
          <Shield className="w-6 h-6 text-primary" />
          Безопасная оплата
        </CardTitle>
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 mt-2">
          <Lock className="w-4 h-4" />
          Защищено 256-битным шифрованием
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Сумма к оплате */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 rounded-2xl border border-primary/10">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Сумма к оплате:</span>
            <span className="text-2xl font-bold text-primary">{formatPrice(amount)}</span>
          </div>
          <div className="text-sm text-muted-foreground mt-2 bg-white/50 p-3 rounded-lg">
            {description}
          </div>
        </div>

        {/* Способ оплаты */}
        <ModernSelect
          options={paymentOptions}
          value={paymentMethod}
          onValueChange={(value) => setPaymentMethod(value as string)}
          label="Способ оплаты"
          placeholder="Выберите способ оплаты"
          searchable={false}
        />

        <Separator className="my-6" />

        {/* Контактные данные */}
        <div className="space-y-4">
          <EnhancedFormField
            id="customerEmail"
            name="customerEmail"
            type="email"
            label="Email для чека"
            placeholder="email@example.com"
            value={customerEmail}
            onChange={(e) => {
              setCustomerEmail(e.target.value);
              if (errors.customerEmail) {
                setErrors(prev => ({ ...prev, customerEmail: '' }));
              }
            }}
            error={errors.customerEmail}
            success={customerEmail.includes('@') && !errors.customerEmail}
            required
            validationRules={[(value) => validateField('customerEmail', value)]}
            realTimeValidation
            tooltip="На этот email будет отправлен чек об оплате"
          />
          
          <EnhancedFormField
            id="customerPhone"
            name="customerPhone"
            type="tel"
            label="Телефон (необязательно)"
            placeholder="+7 (999) 123-45-67"
            value={customerPhone}
            onChange={(e) => {
              setCustomerPhone(e.target.value);
              if (errors.customerPhone) {
                setErrors(prev => ({ ...prev, customerPhone: '' }));
              }
            }}
            error={errors.customerPhone}
            success={customerPhone.length > 0 && !errors.customerPhone}
            validationRules={[(value) => validateField('customerPhone', value)]}
            realTimeValidation
            tooltip="Дублирование чека на телефон (необязательно)"
          />
        </div>

        <Button 
          onClick={handlePayment}
          disabled={loading || !customerEmail}
          className="submit-button-enhanced"
          size="lg"
        >
          <div className="flex items-center justify-center gap-3">
            {loading ? (
              <>
                <div className="form-spinner" />
                Создание платежа...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5" />
                Оплатить {formatPrice(amount)}
              </>
            )}
          </div>
        </Button>

        {/* Безопасность и гарантии */}
        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex items-center justify-center gap-2 text-xs text-success">
            <Shield className="w-4 h-4" />
            <span>SSL-шифрование данных</span>
          </div>
          <div className="text-xs text-muted-foreground text-center leading-relaxed">
            Нажимая кнопку "Оплатить", вы соглашаетесь с{" "}
            <a href="/terms" className="text-primary hover:underline">условиями оферты</a>{" "}
            и переходите на защищенную страницу оплаты МодульБанк
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
