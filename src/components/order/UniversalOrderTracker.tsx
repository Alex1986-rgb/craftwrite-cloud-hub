
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  FileText, 
  User, 
  Calendar,
  DollarSign,
  Phone,
  Mail,
  Loader2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useEnhancedAnalytics } from '@/hooks/useEnhancedAnalytics';
import { useRealtime } from '@/hooks/useRealtime';
import OrderProgressTracker from './advanced/OrderProgressTracker';

interface UniversalOrderTrackerProps {
  searchQuery: string;
}

interface Order {
  id: string;
  service_name: string;
  service_slug: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  status: string;
  estimated_price?: number;
  final_price?: number;
  created_at: string;
  updated_at: string;
  deadline?: string;
  details: string;
  additional_requirements?: string;
  payment_status?: string;
  priority?: string;
  notes?: string;
  technical_specification?: any;
}

export default function UniversalOrderTracker({ searchQuery }: UniversalOrderTrackerProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { trackEvent } = useEnhancedAnalytics();

  // Real-time updates for found orders
  useRealtime({
    table: 'orders',
    event: 'UPDATE',
    onUpdate: (payload) => {
      const updatedOrder = payload.new as Order;
      setOrders(prev => 
        prev.map(order => 
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
      
      // Update selected order if it's currently being viewed
      if (selectedOrder?.id === updatedOrder.id) {
        setSelectedOrder(updatedOrder);
      }
    }
  });

  const searchOrders = async () => {
    if (!searchQuery?.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Track search event
      trackEvent({
        action: 'order_search',
        category: 'Order Tracking',
        label: 'Search Initiated',
        custom_parameters: {
          search_type: searchQuery.includes('@') ? 'email' : 'order_id'
        }
      });

      let query = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      // Determine search type and build query
      if (searchQuery.includes('@')) {
        // Search by email
        query = query.eq('contact_email', searchQuery.toLowerCase().trim());
      } else if (searchQuery.startsWith('+')) {
        // Search by phone
        query = query.eq('contact_phone', searchQuery.trim());
      } else {
        // Search by order ID (exact match or partial)
        query = query.or(`id.eq.${searchQuery.trim()},id.ilike.%${searchQuery.trim()}%`);
      }

      const { data, error: searchError } = await query;

      if (searchError) {
        throw searchError;
      }

      if (!data || data.length === 0) {
        setError('Заказы не найдены. Проверьте правильность введенных данных.');
        trackEvent({
          action: 'order_search_no_results',
          category: 'Order Tracking',
          label: 'No Results Found'
        });
      } else {
        setOrders(data);
        trackEvent({
          action: 'order_search_success',
          category: 'Order Tracking',
          label: 'Orders Found',
          value: data.length
        });
      }
    } catch (err) {
      console.error('Error searching orders:', err);
      setError('Ошибка при поиске заказов. Попробуйте еще раз.');
      trackEvent({
        action: 'order_search_error',
        category: 'Order Tracking',
        label: 'Search Error'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      searchOrders();
    }
  }, [searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      'pending': 'В ожидании',
      'in_progress': 'В работе',
      'completed': 'Завершен',
      'cancelled': 'Отменен',
      'new': 'Новый'
    };
    return statusMap[status] || status;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in_progress':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const calculateProgress = (status: string) => {
    const progressMap: Record<string, number> = {
      'new': 10,
      'pending': 25,
      'in_progress': 60,
      'completed': 100,
      'cancelled': 0
    };
    return progressMap[status] || 0;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        Поиск заказов...
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  // Show detailed order tracking if a specific order is selected
  if (selectedOrder) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Детальное отслеживание заказа</h3>
          <Button variant="outline" onClick={() => setSelectedOrder(null)}>
            Назад к списку
          </Button>
        </div>
        
        <OrderProgressTracker 
          orderData={selectedOrder}
          onBack={() => setSelectedOrder(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.length > 0 && (
        <div className="text-sm text-gray-600">
          Найдено заказов: {orders.length}
        </div>
      )}

      {orders.map((order) => (
        <Card key={order.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {order.service_name}
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Заказ №{order.id.slice(0, 8)}...
                </p>
              </div>
              <Badge className={getStatusColor(order.status)}>
                {getStatusIcon(order.status)}
                <span className="ml-1">{getStatusText(order.status)}</span>
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Прогресс выполнения</span>
                <span>{calculateProgress(order.status)}%</span>
              </div>
              <Progress value={calculateProgress(order.status)} className="h-2" />
            </div>

            {/* Order Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>{order.contact_name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span>{order.contact_email}</span>
                </div>
                {order.contact_phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{order.contact_phone}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>Создан: {new Date(order.created_at).toLocaleDateString('ru-RU')}</span>
                </div>
                {order.deadline && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Срок: {new Date(order.deadline).toLocaleDateString('ru-RU')}</span>
                  </div>
                )}
                {(order.estimated_price || order.final_price) && (
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span>
                      {order.final_price 
                        ? `${(order.final_price / 100).toLocaleString()} ₽`
                        : `~${(order.estimated_price! / 100).toLocaleString()} ₽`
                      }
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Order Description */}
            {order.details && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Описание заказа:</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  {order.details.length > 200 
                    ? `${order.details.substring(0, 200)}...` 
                    : order.details
                  }
                </p>
              </div>
            )}

            {/* Notes */}
            {order.notes && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Комментарии:</h4>
                <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                  {order.notes}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button 
                onClick={() => setSelectedOrder(order)}
                className="flex-1"
              >
                Подробное отслеживание
              </Button>
              {order.contact_email && (
                <Button 
                  variant="outline"
                  onClick={() => window.open(`mailto:${order.contact_email}`, '_blank')}
                >
                  Написать
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
