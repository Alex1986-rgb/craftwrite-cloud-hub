
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Wallet, Building, AlertCircle } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  fee: number;
  description: string;
  supported: boolean;
}

interface PaymentStepProps {
  selectedMethod: string;
  onMethodSelect: (method: string) => void;
  totalAmount: number;
  onPayment: () => void;
  loading: boolean;
}

export default function PaymentStep({
  selectedMethod,
  onMethodSelect,
  totalAmount,
  onPayment,
  loading
}: PaymentStepProps) {
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
      description: 'Все способы оплаты ЮKassa',
      supported: true
    },
    {
      id: 'bank',
      name: 'Банковский перевод',
      icon: <Building className="w-5 h-5" />,
      fee: 0,
      description: 'Для юридических лиц',
      supported: false
    }
  ];

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
              <span>
                {selectedMethod === 'yookassa' 
                  ? (totalAmount + Math.round(totalAmount * 0.029)).toLocaleString()
                  : totalAmount.toLocaleString()
                } ₽
              </span>
            </div>
          </div>
          
          <Button 
            onClick={onPayment}
            disabled={!selectedMethod || loading}
            className="w-full mt-4"
            size="lg"
          >
            {loading ? 'Обработка...' : 'Перейти к оплате'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
