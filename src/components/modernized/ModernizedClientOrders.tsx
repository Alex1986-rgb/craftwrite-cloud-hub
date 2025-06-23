
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  FileText, 
  MessageSquare, 
  Download, 
  Eye,
  Clock,
  CheckCircle,
  Star,
  AlertCircle
} from 'lucide-react';
import { useEnhancedOrders } from '@/hooks/useEnhancedOrders';
import { useContentVersions } from '@/hooks/useContentVersions';
import { Link } from 'react-router-dom';

export default function ModernizedClientOrders() {
  const { orders } = useEnhancedOrders();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'in_progress': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Новый';
      case 'in_progress': return 'В работе';
      case 'completed': return 'Завершен';
      case 'cancelled': return 'Отменен';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Clock className="h-4 w-4" />;
      case 'in_progress': return <AlertCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Мои заказы ({orders.length})</CardTitle>
            <Link to="/order">
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Новый заказ
              </Button>
            </Link>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {orders.map(order => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1">{getStatusText(order.status)}</span>
                    </Badge>
                    {order.payment_status === 'paid' && (
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Оплачен
                      </Badge>
                    )}
                    {order.payment_status === 'unpaid' && order.estimated_price && (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        Ожидает оплаты
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">{order.service_name}</h3>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                    <div>
                      <span className="font-medium">Создан:</span> {new Date(order.created_at).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Дедлайн:</span> {order.deadline ? new Date(order.deadline).toLocaleDateString() : 'Не указан'}
                    </div>
                    <div>
                      <span className="font-medium">Стоимость:</span> {order.estimated_price ? (order.estimated_price / 100) + '₽' : 'Не указана'}
                    </div>
                    {order.quality_rating && (
                      <div className="flex items-center gap-1">
                        <span className="font-medium">Оценка:</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star 
                              key={star} 
                              className={`h-4 w-4 ${star <= order.quality_rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {order.details && (
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <p className="text-sm line-clamp-2">{order.details}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 ml-6">
                  <Dialog open={showOrderDetails && selectedOrder?.id === order.id} onOpenChange={setShowOrderDetails}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Детали
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Заказ: {order.service_name}</DialogTitle>
                        <DialogDescription>
                          Подробная информация о заказе #{order.id.slice(-8)}
                        </DialogDescription>
                      </DialogHeader>
                      {selectedOrder && (
                        <ClientOrderDetailsDialog order={selectedOrder} />
                      )}
                    </DialogContent>
                  </Dialog>

                  {order.status === 'in_progress' || order.status === 'new' ? (
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Чат
                    </Button>
                  ) : order.status === 'completed' ? (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Скачать
                    </Button>
                  ) : null}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {orders.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">У вас пока нет заказов</h3>
            <p className="text-muted-foreground mb-4">
              Создайте свой первый заказ и начните работу с нами
            </p>
            <Link to="/order">
              <Button>
                <FileText className="h-4 w-4 mr-2" />
                Создать заказ
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ClientOrderDetailsDialog({ order }: { order: any }) {
  const { versions, activeVersion } = useContentVersions(order.id);

  return (
    <div className="space-y-6">
      {/* Основная информация */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-3">Информация о заказе</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Услуга:</span>
              <span>{order.service_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Статус:</span>
              <Badge variant="outline">{order.status}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Создан:</span>
              <span>{new Date(order.created_at).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Дедлайн:</span>
              <span>{order.deadline ? new Date(order.deadline).toLocaleDateString() : 'Не указан'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Стоимость:</span>
              <span>{order.estimated_price ? (order.estimated_price / 100) + '₽' : 'Не указана'}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Статистика</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Версий контента:</span>
              <span>{versions.length}</span>
            </div>
            {order.revision_count > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Правок:</span>
                <span>{order.revision_count}</span>
              </div>
            )}
            {order.quality_rating && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Ваша оценка:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star 
                      key={star} 
                      className={`h-4 w-4 ${star <= order.quality_rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Описание заказа */}
      {order.details && (
        <div>
          <h4 className="font-semibold mb-3">Описание заказа</h4>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm whitespace-pre-wrap">{order.details}</p>
          </div>
        </div>
      )}

      {/* Дополнительные требования */}
      {order.additional_requirements && (
        <div>
          <h4 className="font-semibold mb-3">Дополнительные требования</h4>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm whitespace-pre-wrap">{order.additional_requirements}</p>
          </div>
        </div>
      )}

      {/* Активная версия контента */}
      {activeVersion && (
        <div>
          <h4 className="font-semibold mb-3">Готовый контент</h4>
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">Версия {activeVersion.version_number}</span>
              <div className="flex gap-2">
                {activeVersion.quality_score && (
                  <Badge variant="outline">
                    Качество: {activeVersion.quality_score}/100
                  </Badge>
                )}
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-1" />
                  Скачать
                </Button>
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto bg-muted p-3 rounded text-sm">
              <pre className="whitespace-pre-wrap">{activeVersion.content}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Отзыв клиента */}
      {order.client_feedback && (
        <div>
          <h4 className="font-semibold mb-3">Ваш отзыв</h4>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm">{order.client_feedback}</p>
          </div>
        </div>
      )}
    </div>
  );
}
