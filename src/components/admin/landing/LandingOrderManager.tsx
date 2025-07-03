import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Clock, 
  User, 
  CheckCircle, 
  AlertCircle, 
  PlayCircle,
  MessageSquare,
  FileText,
  Calendar,
  DollarSign,
  Users,
  Briefcase
} from 'lucide-react';

interface LandingOrder {
  id: string;
  service_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  package_type: string;
  status: string;
  payment_status: string;
  estimated_price: number;
  target_audience: string;
  business_goals: string;
  created_at: string;
  delivery_date: string;
  current_revisions: number;
  revision_limit: number;
  project_manager_id?: string;
  designer_id?: string;
  developer_id?: string;
}

interface WorkflowStep {
  id: string;
  step_name: string;
  step_order: number;
  status: string;
  assigned_to?: string;
  started_at?: string;
  completed_at?: string;
  estimated_duration?: string;
  actual_duration?: string;
}

const statusColors = {
  'pending': 'bg-yellow-100 text-yellow-800',
  'payment_pending': 'bg-orange-100 text-orange-800',
  'payment_confirmed': 'bg-blue-100 text-blue-800',
  'in_progress': 'bg-blue-100 text-blue-800',
  'review': 'bg-purple-100 text-purple-800',
  'revision_requested': 'bg-orange-100 text-orange-800',
  'completed': 'bg-green-100 text-green-800',
  'cancelled': 'bg-red-100 text-red-800',
};

const stepStatusColors = {
  'pending': 'bg-gray-100 text-gray-800',
  'in_progress': 'bg-blue-100 text-blue-800',
  'completed': 'bg-green-100 text-green-800',
  'skipped': 'bg-gray-100 text-gray-800',
};

export default function LandingOrderManager() {
  const [orders, setOrders] = useState<LandingOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<LandingOrder | null>(null);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  useEffect(() => {
    loadOrders();
  }, []);

  useEffect(() => {
    if (selectedOrder) {
      loadWorkflowSteps(selectedOrder.id);
    }
  }, [selectedOrder]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('service_slug', 'landing-page')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
      
      if (data && data.length > 0 && !selectedOrder) {
        setSelectedOrder(data[0]);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить заказы',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadWorkflowSteps = async (orderId: string) => {
    try {
      const { data, error } = await supabase
        .from('order_workflow_steps')
        .select('*')
        .eq('order_id', orderId)
        .order('step_order');

      if (error) throw error;
      setWorkflowSteps(data || []);
    } catch (error) {
      console.error('Error loading workflow steps:', error);
    }
  };

  const updateStepStatus = async (stepId: string, status: string) => {
    try {
      const updates: any = { status };
      
      if (status === 'in_progress') {
        updates.started_at = new Date().toISOString();
      } else if (status === 'completed') {
        updates.completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('order_workflow_steps')
        .update(updates)
        .eq('id', stepId);

      if (error) throw error;

      await loadWorkflowSteps(selectedOrder!.id);
      
      toast({
        title: 'Успешно',
        description: 'Статус этапа обновлен',
      });

      // Check if all steps are completed
      const updatedSteps = await supabase
        .from('order_workflow_steps')
        .select('*')
        .eq('order_id', selectedOrder!.id);

      if (updatedSteps.data?.every(step => step.status === 'completed')) {
        await supabase
          .from('orders')
          .update({ status: 'completed', completed_at: new Date().toISOString() })
          .eq('id', selectedOrder!.id);
        
        await loadOrders();
      }

    } catch (error) {
      console.error('Error updating step:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить статус этапа',
        variant: 'destructive',
      });
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;

      await loadOrders();
      
      toast({
        title: 'Успешно',
        description: 'Статус заказа обновлен',
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить статус заказа',
        variant: 'destructive',
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <PlayCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const calculateProgress = () => {
    if (workflowSteps.length === 0) return 0;
    const completedSteps = workflowSteps.filter(step => step.status === 'completed').length;
    return (completedSteps / workflowSteps.length) * 100;
  };

  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString() + ' ₽';
  };

  const getDaysRemaining = (deliveryDate: string) => {
    const delivery = new Date(deliveryDate);
    const now = new Date();
    const diffTime = delivery.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const renderOrdersList = () => (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card 
          key={order.id}
          className={`cursor-pointer transition-all hover:shadow-md ${
            selectedOrder?.id === order.id ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => setSelectedOrder(order)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{order.contact_name}</h3>
                <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                  {order.status}
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground">
                #{order.id.slice(0, 8)}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{order.package_type} - {formatPrice(order.estimated_price)}</span>
              <span>{new Date(order.created_at).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderOverview = () => {
    if (!selectedOrder) return null;
    
    const daysRemaining = getDaysRemaining(selectedOrder.delivery_date);
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Стоимость</p>
                  <p className="font-semibold">{formatPrice(selectedOrder.estimated_price)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Осталось дней</p>
                  <p className="font-semibold">{daysRemaining > 0 ? daysRemaining : 'Просрочен'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Правки</p>
                  <p className="font-semibold">{selectedOrder.current_revisions}/{selectedOrder.revision_limit}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Информация о клиенте
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium">Контактное лицо:</label>
              <p>{selectedOrder.contact_name}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Email:</label>
              <p>{selectedOrder.contact_email}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Телефон:</label>
              <p>{selectedOrder.contact_phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Целевая аудитория:</label>
              <p>{selectedOrder.target_audience}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Бизнес-цели:</label>
              <p>{selectedOrder.business_goals}</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button 
            onClick={() => updateOrderStatus(selectedOrder.id, 'in_progress')}
            disabled={selectedOrder.status === 'in_progress'}
          >
            Начать работу
          </Button>
          <Button 
            variant="outline"
            onClick={() => updateOrderStatus(selectedOrder.id, 'review')}
            disabled={selectedOrder.status !== 'in_progress'}
          >
            На проверку
          </Button>
          <Button 
            variant="outline"
            onClick={() => updateOrderStatus(selectedOrder.id, 'completed')}
            disabled={selectedOrder.status === 'completed'}
          >
            Завершить
          </Button>
        </div>
      </div>
    );
  };

  const renderWorkflow = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Прогресс выполнения</h3>
        <span className="text-sm text-muted-foreground">
          {Math.round(calculateProgress())}% завершено
        </span>
      </div>
      
      <Progress value={calculateProgress()} className="w-full" />
      
      <div className="space-y-3">
        {workflowSteps.map((step) => (
          <Card key={step.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    {getStatusIcon(step.status)}
                  </div>
                  <div>
                    <h4 className="font-medium">{step.step_name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Этап {step.step_order}
                      {step.estimated_duration && ` • ${step.estimated_duration}`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={stepStatusColors[step.status as keyof typeof stepStatusColors]}>
                    {step.status}
                  </Badge>
                  
                  {step.status === 'pending' && (
                    <Button 
                      size="sm" 
                      onClick={() => updateStepStatus(step.id, 'in_progress')}
                    >
                      Начать
                    </Button>
                  )}
                  
                  {step.status === 'in_progress' && (
                    <Button 
                      size="sm" 
                      onClick={() => updateStepStatus(step.id, 'completed')}
                    >
                      Завершить
                    </Button>
                  )}
                </div>
              </div>
              
              {step.started_at && (
                <div className="mt-2 text-xs text-muted-foreground">
                  Начато: {new Date(step.started_at).toLocaleString()}
                  {step.completed_at && (
                    <span> • Завершено: {new Date(step.completed_at).toLocaleString()}</span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-full gap-6">
      {/* Orders List */}
      <div className="w-1/3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Заказы лендингов ({orders.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Загрузка...</div>
            ) : (
              renderOrdersList()
            )}
          </CardContent>
        </Card>
      </div>

      {/* Order Details */}
      <div className="flex-1">
        {selectedOrder ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Заказ #{selectedOrder.id.slice(0, 8)}</span>
                <Badge className={statusColors[selectedOrder.status as keyof typeof statusColors]}>
                  {selectedOrder.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Обзор</TabsTrigger>
                  <TabsTrigger value="workflow">Рабочий процесс</TabsTrigger>
                  <TabsTrigger value="communication">Общение</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                  {renderOverview()}
                </TabsContent>
                
                <TabsContent value="workflow" className="mt-6">
                  {renderWorkflow()}
                </TabsContent>
                
                <TabsContent value="communication" className="mt-6">
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4" />
                    <p>Система общения с клиентами будет доступна скоро</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <p className="text-muted-foreground">Выберите заказ для просмотра деталей</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}