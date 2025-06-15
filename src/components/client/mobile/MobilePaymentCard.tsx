
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  CreditCard
} from 'lucide-react';

interface Payment {
  id: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'card' | 'transfer' | 'cash';
  date: string;
  description: string;
  invoiceUrl?: string;
}

interface MobilePaymentCardProps {
  payment: Payment;
}

export function MobilePaymentCard({ payment }: MobilePaymentCardProps) {
  const getStatusBadge = (status: Payment['status']) => {
    const statusConfig = {
      pending: { label: 'Ожидает', className: 'bg-yellow-100 text-yellow-800', icon: Clock },
      completed: { label: 'Завершен', className: 'bg-green-100 text-green-800', icon: CheckCircle },
      failed: { label: 'Ошибка', className: 'bg-red-100 text-red-800', icon: AlertCircle },
      refunded: { label: 'Возврат', className: 'bg-blue-100 text-blue-800', icon: AlertCircle }
    };
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <Badge className={`${config.className} text-xs`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getMethodLabel = (method: Payment['method']) => {
    const methods = {
      card: 'Карта',
      transfer: 'Перевод',
      cash: 'Наличные'
    };
    return methods[method];
  };

  return (
    <Card className="glass-card border-0 mobile-card">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">{payment.description}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {payment.orderId}
              </p>
            </div>
            <div className="ml-2">
              {getStatusBadge(payment.status)}
            </div>
          </div>

          {/* Amount */}
          <div className="text-right">
            <div className="text-lg font-bold">₽{payment.amount.toLocaleString()}</div>
          </div>

          {/* Details */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{new Date(payment.date).toLocaleDateString('ru-RU')}</span>
            </div>
            <div className="flex items-center gap-1">
              <CreditCard className="w-3 h-3" />
              <span>{getMethodLabel(payment.method)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            {payment.invoiceUrl && (
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                <Download className="w-3 h-3 mr-1" />
                Счет
              </Button>
            )}
            {payment.status === 'completed' && (
              <Button variant="outline" size="sm" className="flex-1 text-xs">
                Повторить
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
