import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Clock, Shield, AlertCircle, ExternalLink } from 'lucide-react';
import { PaymentMethodOption, OrderFormData } from '@/types/advancedOrder';
import { useToast } from '@/hooks/use-toast';
import ContactInfoForm from './payment/ContactInfoForm';
import PaymentMethodSelector from './payment/PaymentMethodSelector';

interface IntegratedPaymentFormProps {
  orderData: OrderFormData;
  onPersonalInfoChange: (info: Partial<OrderFormData['personalInfo']>) => void;
  onSubmit: (paymentMethod: PaymentMethodOption) => Promise<void>;
  isLoading: boolean;
  className?: string;
}

const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: 'stripe_card',
    name: 'Банковская карта',
    icon: '💳',
    fee: 0,
    description: 'Visa, MasterCard, МИР',
    supported: true
  },
  {
    id: 'yookassa',
    name: 'ЮKassa',
    icon: '🏦',
    fee: 0,
    description: 'Все способы оплаты ЮKassa',
    supported: true
  },
  {
    id: 'sberbank',
    name: 'Сбербанк Онлайн',
    icon: '🟢',
    fee: 0,
    description: 'Оплата через Сбербанк',
    supported: true
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '🔵',
    fee: 2.9,
    description: 'Международные платежи',
    supported: false
  },
  {
    id: 'crypto',
    name: 'Криптовалюта',
    icon: '₿',
    fee: 1,
    description: 'Bitcoin, Ethereum, USDT',
    supported: false
  }
];

export default function IntegratedPaymentForm({
  orderData,
  onPersonalInfoChange,
  onSubmit,
  isLoading,
  className
}: IntegratedPaymentFormProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodOption | null>(null);
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validatePersonalInfo = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!orderData.personalInfo.name?.trim()) {
      errors.name = 'Имя обязательно для заполнения';
    }
    
    if (!orderData.personalInfo.email?.trim()) {
      errors.email = 'Email обязателен для заполнения';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(orderData.personalInfo.email)) {
      errors.email = 'Некорректный формат email';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validatePersonalInfo()) {
      toast({
        title: "Ошибка валидации",
        description: "Проверьте корректность заполненных данных",
        variant: "destructive"
      });
      return;
    }

    if (!selectedPaymentMethod) {
      toast({
        title: "Выберите способ оплаты",
        description: "Необходимо выбрать способ оплаты для продолжения",
        variant: "destructive"
      });
      return;
    }

    if (!agreementAccepted) {
      toast({
        title: "Подтвердите согласие",
        description: "Необходимо принять условия соглашения",
        variant: "destructive"
      });
      return;
    }

    try {
      await onSubmit(selectedPaymentMethod);
    } catch (error) {
      console.error('Payment submission error:', error);
    }
  };

  const getFinalPrice = () => {
    if (!selectedPaymentMethod) return orderData.pricing.totalPrice;
    
    const fee = selectedPaymentMethod.fee || 0;
    return orderData.pricing.totalPrice + Math.round(orderData.pricing.totalPrice * fee / 100);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <ContactInfoForm
        personalInfo={orderData.personalInfo}
        onPersonalInfoChange={onPersonalInfoChange}
        validationErrors={validationErrors}
      />

      <PaymentMethodSelector
        paymentMethods={PAYMENT_METHODS}
        selectedMethod={selectedPaymentMethod}
        onMethodSelect={setSelectedPaymentMethod}
      />

      {/* Итоговая стоимость */}
      <Card>
        <CardHeader>
          <CardTitle>Итого к оплате</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Стоимость заказа:</span>
              <span>{orderData.pricing.totalPrice.toLocaleString()} {orderData.pricing.currency}</span>
            </div>
            
            {selectedPaymentMethod?.fee && selectedPaymentMethod.fee > 0 && (
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Комиссия ({selectedPaymentMethod.fee}%):</span>
                <span>+{Math.round(orderData.pricing.totalPrice * selectedPaymentMethod.fee / 100).toLocaleString()} {orderData.pricing.currency}</span>
              </div>
            )}
            
            <Separator />
            
            <div className="flex justify-between text-lg font-bold">
              <span>К оплате:</span>
              <span className="text-primary">
                {getFinalPrice().toLocaleString()} {orderData.pricing.currency}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Срок выполнения: {orderData.timeline.estimatedDays} дней
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700">
                Безопасная оплата через проверенные платежные системы
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Согласия и чекбоксы */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="agreement"
              checked={agreementAccepted}
              onCheckedChange={(checked) => setAgreementAccepted(checked as boolean)}
            />
            <Label htmlFor="agreement" className="text-sm leading-relaxed">
              Я принимаю{' '}
              <a href="/privacy" target="_blank" className="text-primary hover:underline">
                условия соглашения
              </a>{' '}
              и даю согласие на обработку персональных данных
            </Label>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="notifications"
              checked={emailNotifications}
              onCheckedChange={(checked) => setEmailNotifications(checked as boolean)}
            />
            <Label htmlFor="notifications" className="text-sm">
              Получать уведомления о статусе заказа на email
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Кнопка оплаты */}
      <Button
        onClick={handleSubmit}
        disabled={isLoading || !selectedPaymentMethod || !agreementAccepted}
        className="w-full h-12 text-lg font-medium"
        size="lg"
      >
        {isLoading ? (
          'Обработка...'
        ) : (
          <>
            Оплатить {getFinalPrice().toLocaleString()} {orderData.pricing.currency}
            <ExternalLink className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>

      {selectedPaymentMethod && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <div className="font-medium mb-1">Что происходит после оплаты:</div>
              <ul className="space-y-1 text-blue-700">
                <li>• Вы будете перенаправлены на страницу оплаты {selectedPaymentMethod.name}</li>
                <li>• После успешной оплаты заказ поступит в работу</li>
                <li>• Вы получите уведомление на email о начале работы</li>
                <li>• Мы свяжемся с вами для уточнения деталей в течение 2 часов</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
