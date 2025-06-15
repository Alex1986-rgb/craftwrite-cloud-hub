
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, CheckCircle } from 'lucide-react';
import { PaymentMethodOption } from '@/types/advancedOrder';

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
          <Button
            key={method.id}
            variant={selectedMethod?.id === method.id ? "default" : "outline"}
            className={`w-full h-auto p-4 justify-start ${
              !method.supported ? 'opacity-50' : ''
            }`}
            onClick={() => method.supported && onMethodSelect(method)}
            disabled={!method.supported}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{method.icon}</span>
                <div className="text-left">
                  <div className="font-medium">{method.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {method.description}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {method.fee && method.fee > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    +{method.fee}%
                  </Badge>
                )}
                {!method.supported && (
                  <Badge variant="outline" className="text-xs">
                    Скоро
                  </Badge>
                )}
                {selectedMethod?.id === method.id && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
