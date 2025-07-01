
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { useLiveOrderUpdates } from '@/hooks/useLiveOrderUpdates';
import { format } from 'date-fns';

export default function LiveOrderStatus() {
  const { liveOrders, isConnected, lastUpdate } = useLiveOrderUpdates();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      'pending': 'В ожидании',
      'in_progress': 'В работе',
      'completed': 'Завершён',
      'cancelled': 'Отменён'
    };
    return statusMap[status] || status;
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default' as const;
      case 'in_progress':
        return 'secondary' as const;
      case 'cancelled':
        return 'destructive' as const;
      default:
        return 'outline' as const;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Live статусы заказов</span>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-gray-500">
              {isConnected ? 'Подключено' : 'Отключено'}
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {liveOrders.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Нет активных заказов
            </p>
          ) : (
            liveOrders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <div className="font-medium text-sm">{order.service_name}</div>
                    <div className="text-xs text-gray-500">{order.contact_name}</div>
                  </div>
                </div>
                <Badge variant={getStatusVariant(order.status)}>
                  {getStatusText(order.status)}
                </Badge>
              </div>
            ))
          )}
          
          {isConnected && (
            <div className="text-xs text-gray-500 text-center">
              Последнее обновление: {format(lastUpdate, 'HH:mm:ss')}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
