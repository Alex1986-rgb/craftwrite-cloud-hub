
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard } from 'lucide-react';
import { PaymentMethod } from '@/types/advancedOrder';

interface PaymentMethodSelectorProps {
  paymentMethods: PaymentMethod[];
  selectedMethod: PaymentMethod | null;
  onMethodSelect: (method: PaymentMethod) => void;
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
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedMethod?.id === method.id
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                  : method.supported
                  ? 'border-gray-200 hover:border-gray-300'
                  : 'border-gray-100 opacity-50 cursor-not-allowed'
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
                        <Badge variant="secondary">Скоро</Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{method.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  {method.fee && method.fee > 0 ? (
                    <div className="text-sm text-orange-600">+{method.fee}%</div>
                  ) : (
                    <div className="text-sm text-green-600">Без комиссии</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
