import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  RefreshCw,
  Download,
  Plus,
  Search
} from 'lucide-react';
import { useModernizedPayments } from '@/hooks/useModernizedPayments';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function ModernizedPaymentManager() {
  const { payments, loading, updatePaymentStatus, validatePromoCode } = useModernizedPayments();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreatePromo, setShowCreatePromo] = useState(false);
  const [newPromoCode, setNewPromoCode] = useState({
    code: '',
    discount_type: 'percentage' as 'percentage' | 'fixed',
    discount_value: 0,
    min_order_amount: 0,
    max_uses: undefined as number | undefined,
    valid_until: ''
  });

  // Фильтрация платежей
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.gateway_payment_id?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.payment_status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Статистика платежей
  const stats = {
    totalRevenue: payments
      .filter(p => p.payment_status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0) / 100,
    pendingPayments: payments.filter(p => p.payment_status === 'pending').length,
    failedPayments: payments.filter(p => p.payment_status === 'failed').length,
    avgPayment: payments.length > 0 
      ? payments.reduce((sum, p) => sum + p.amount, 0) / payments.length / 100 
      : 0
  };

  const handleStatusUpdate = async (paymentId: string, status: string) => {
    await updatePaymentStatus(paymentId, status as any);
  };

  const createPromoCode = async () => {
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .insert({
          code: newPromoCode.code.toUpperCase(),
          discount_type: newPromoCode.discount_type,
          discount_value: newPromoCode.discount_type === 'percentage' 
            ? newPromoCode.discount_value 
            : newPromoCode.discount_value * 100, // в копейках для фиксированной скидки
          min_order_amount: newPromoCode.min_order_amount * 100, // в копейках
          max_uses: newPromoCode.max_uses,
          valid_until: newPromoCode.valid_until || null
        });

      if (error) throw error;

      toast.success('Промокод создан');
      setShowCreatePromo(false);
      setNewPromoCode({
        code: '',
        discount_type: 'percentage',
        discount_value: 0,
        min_order_amount: 0,
        max_uses: undefined,
        valid_until: ''
      });
    } catch (error: any) {
      console.error('Error creating promo code:', error);
      toast.error('Ошибка создания промокода');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      case 'refunded': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Завершен';
      case 'pending': return 'Ожидает';
      case 'processing': return 'Обработка';
      case 'failed': return 'Ошибка';
      case 'refunded': return 'Возврат';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Общий доход</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()}₽</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ожидающие платежи</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingPayments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Неудачные платежи</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.failedPayments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Средний чек</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgPayment.toLocaleString()}₽</div>
          </CardContent>
        </Card>
      </div>

      {/* Управление */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Управление платежами</CardTitle>
            <div className="flex gap-2">
              <Dialog open={showCreatePromo} onOpenChange={setShowCreatePromo}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Создать промокод
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Создание промокода</DialogTitle>
                    <DialogDescription>
                      Создайте новый промокод для скидок
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="code">Код промокода</Label>
                      <Input
                        id="code"
                        value={newPromoCode.code}
                        onChange={(e) => setNewPromoCode({...newPromoCode, code: e.target.value.toUpperCase()})}
                        placeholder="EXAMPLE2025"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="discount_type">Тип скидки</Label>
                      <Select 
                        value={newPromoCode.discount_type} 
                        onValueChange={(value: 'percentage' | 'fixed') => 
                          setNewPromoCode({...newPromoCode, discount_type: value})
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Процент</SelectItem>
                          <SelectItem value="fixed">Фиксированная сумма</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="discount_value">
                        Размер скидки {newPromoCode.discount_type === 'percentage' ? '(%)' : '(₽)'}
                      </Label>
                      <Input
                        id="discount_value"
                        type="number"
                        value={newPromoCode.discount_value}
                        onChange={(e) => setNewPromoCode({...newPromoCode, discount_value: Number(e.target.value)})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="min_amount">Минимальная сумма заказа (₽)</Label>
                      <Input
                        id="min_amount"
                        type="number"
                        value={newPromoCode.min_order_amount}
                        onChange={(e) => setNewPromoCode({...newPromoCode, min_order_amount: Number(e.target.value)})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="max_uses">Максимальное количество использований</Label>
                      <Input
                        id="max_uses"
                        type="number"
                        value={newPromoCode.max_uses || ''}
                        onChange={(e) => setNewPromoCode({...newPromoCode, max_uses: e.target.value ? Number(e.target.value) : undefined})}
                        placeholder="Без ограничений"
                      />
                    </div>

                    <div>
                      <Label htmlFor="valid_until">Действителен до</Label>
                      <Input
                        id="valid_until"
                        type="date"
                        value={newPromoCode.valid_until}
                        onChange={(e) => setNewPromoCode({...newPromoCode, valid_until: e.target.value})}
                      />
                    </div>

                    <Button onClick={createPromoCode} className="w-full">
                      Создать промокод
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Экспорт
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по ID платежа..."
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
                <SelectItem value="pending">Ожидающие</SelectItem>
                <SelectItem value="processing">В обработке</SelectItem>
                <SelectItem value="completed">Завершенные</SelectItem>
                <SelectItem value="failed">Неудачные</SelectItem>
                <SelectItem value="refunded">Возвращенные</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Список платежей */}
      <div className="space-y-4">
        {filteredPayments.map(payment => (
          <Card key={payment.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(payment.payment_status)}>
                    {getStatusText(payment.payment_status)}
                  </Badge>
                  <div>
                    <p className="font-medium">
                      {payment.amount / 100}₽
                      {payment.discount_amount > 0 && (
                        <span className="text-green-600 ml-2">
                          (-{payment.discount_amount / 100}₽)
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ID: {payment.id.slice(-8)} • {payment.payment_gateway}
                      {payment.gateway_payment_id && ` • ${payment.gateway_payment_id}`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {new Date(payment.created_at).toLocaleDateString()}
                  </span>
                  
                  {payment.payment_status === 'pending' && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusUpdate(payment.id, 'completed')}
                      >
                        Подтвердить
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleStatusUpdate(payment.id, 'failed')}
                      >
                        Отклонить
                      </Button>
                    </div>
                  )}
                  
                  {payment.payment_status === 'completed' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleStatusUpdate(payment.id, 'refunded')}
                    >
                      Возврат
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPayments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Платежи не найдены</h3>
            <p className="text-muted-foreground">
              Попробуйте изменить параметры поиска или фильтры
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
