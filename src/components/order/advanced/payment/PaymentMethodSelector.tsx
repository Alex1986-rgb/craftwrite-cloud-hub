
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, AlertCircle } from 'lucide-react';

interface PaymentMethodOption {
  id: string;
  name: string;
  icon: string;
  fee: number;
  description: string;
  supported: boolean;
}

interface PaymentMethodSelectorProps {
  paymentMethods: PaymentMethodOption[];
  selectedMethod: PaymentMethodOption | null;
  onMethodSelect: (method: PaymentMethodOption) => void;
}

export default function PaymentMethodSelector({
  paymentMethods,
  selectedMethod,
  onMethodSelect
}: PaymentMethodSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Способ оплаты
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedMethod?.id === method.id
                ? 'border-blue-500 bg-blue-50'
                : method.supported
                ? 'border-gray-200 hover:border-blue-300'
                : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
            }`}
            onClick={() => method.supported && onMethodSelect(method)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{method.icon}</span>
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
  );
}
