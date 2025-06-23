
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Filter, 
  Eye, 
  MessageSquare, 
  Star,
  Clock,
  User,
  FileText,
  Download
} from 'lucide-react';
import { useEnhancedOrders } from '@/hooks/useEnhancedOrders';
import { useContentVersions } from '@/hooks/useContentVersions';
import { useModernizedChat } from '@/hooks/useModernizedChat';
import { toast } from 'sonner';

export default function ModernizedOrderManagement() {
  const { orders, updateOrderStatus, assignOrderToAdmin } = useEnhancedOrders();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Фильтрация заказов
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.contact_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.service_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.contact_email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    await updateOrderStatus(orderId, newStatus);
  };

  const handleAssignToMe = async (orderId: string) => {
    // Здесь нужно получить ID текущего пользователя
    // Для демонстрации используем заглушку
    await assignOrderToAdmin(orderId, 'current-admin-id');
  };

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

  return (
    <div className="space-y-6">
      {/* Фильтры и поиск */}
      <Card>
        <CardHeader>
          <CardTitle>Управление заказами</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по имени, email или услуге..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Фильтр по статусу" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="new">Новые</SelectItem>
                <SelectItem value="in_progress">В работе</SelectItem>
                <SelectItem value="completed">Завершенные</SelectItem>
                <SelectItem value="cancelled">Отмененные</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Список заказов */}
      <div className="grid gap-4">
        {filteredOrders.map(order => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                    {order.priority && (
                      <Badge variant="outline">
                        {order.priority === 'high' ? 'Высокий' : 
                         order.priority === 'medium' ? 'Средний' : 'Низкий'} приоритет
                      </Badge>
                    )}
                    {order.payment_status === 'paid' && (
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Оплачен
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-1">{order.service_name}</h3>
                  <p className="text-muted-foreground mb-2">
                    {order.contact_name} • {order.contact_email}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                    {order.deadline && (
                      <span className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        До {new Date(order.deadline).toLocaleDateString()}
                      </span>
                    )}
                    {order.estimated_price && (
                      <span className="font-medium">
                        {order.estimated_price / 100}₽
                      </span>
                    )}
                    {order.quality_rating && (
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {order.quality_rating}/5
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
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
                        <DialogTitle>Детали заказа</DialogTitle>
                        <DialogDescription>
                          Полная информация о заказе #{order.id.slice(-8)}
                        </DialogDescription>
                      </DialogHeader>
                      {selectedOrder && (
                        <OrderDetailsDialog order={selectedOrder} />
                      )}
                    </DialogContent>
                  </Dialog>

                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAssignToMe(order.id)}
                  >
                    <User className="h-4 w-4 mr-1" />
                    Взять в работу
                  </Button>

                  <Select onValueChange={(value) => handleStatusChange(order.id, value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Новый</SelectItem>
                      <SelectItem value="in_progress">В работе</SelectItem>
                      <SelectItem value="completed">Завершен</SelectItem>
                      <SelectItem value="cancelled">Отменен</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {order.details && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm">{order.details}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Заказы не найдены</h3>
            <p className="text-muted-foreground">
              Попробуйте изменить параметры поиска или фильтры
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function OrderDetailsDialog({ order }: { order: any }) {
  const { versions, createVersion } = useContentVersions(order.id);
  const { chatRoom, messages } = useModernizedChat(order.id);

  return (
    <div className="space-y-6">
      {/* Основная информация */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2">Информация о клиенте</h4>
          <div className="space-y-1 text-sm">
            <p><strong>Имя:</strong> {order.contact_name}</p>
            <p><strong>Email:</strong> {order.contact_email}</p>
            <p><strong>Телефон:</strong> {order.contact_phone || 'Не указан'}</p>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Детали заказа</h4>
          <div className="space-y-1 text-sm">
            <p><strong>Услуга:</strong> {order.service_name}</p>
            <p><strong>Статус:</strong> {order.status}</p>
            <p><strong>Создан:</strong> {new Date(order.created_at).toLocaleString()}</p>
            <p><strong>Дедлайн:</strong> {order.deadline ? new Date(order.deadline).toLocaleDateString() : 'Не указан'}</p>
          </div>
        </div>
      </div>

      {/* Описание */}
      {order.details && (
        <div>
          <h4 className="font-semibold mb-2">Описание заказа</h4>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm">{order.details}</p>
          </div>
        </div>
      )}

      {/* Версии контента */}
      <div>
        <h4 className="font-semibold mb-2">Версии контента ({versions.length})</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {versions.map(version => (
            <div key={version.id} className="flex items-center justify-between p-2 border rounded">
              <div>
                <span className="font-medium">Версия {version.version_number}</span>
                {version.is_active && <Badge className="ml-2">Активная</Badge>}
                {version.quality_score && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    Качество: {version.quality_score}/100
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Просмотр</Button>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Последние сообщения из чата */}
      {messages.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">Последние сообщения</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {messages.slice(-3).map(message => (
              <div key={message.id} className="p-2 border rounded text-sm">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium">{message.sender?.full_name || message.sender?.email}</span>
                  <span className="text-muted-foreground text-xs">
                    {new Date(message.created_at).toLocaleString()}
                  </span>
                </div>
                <p>{message.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
