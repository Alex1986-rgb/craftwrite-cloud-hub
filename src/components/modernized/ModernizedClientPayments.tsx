
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  DollarSign, 
  CreditCard, 
  Clock,
  CheckCircle,
  AlertCircle,
  Receipt
} from 'lucide-react';
import { useModernizedPayments } from '@/hooks/useModernizedPayments';
import { toast } from 'sonner';

export default function ModernizedClientPayments() {
  const { payments, validatePromoCode, createPayment } = useModernizedPayments();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [amount, setAmount] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [promoValidation, setPromoValidation] = useState<any>(null);

  // Статистика платежей
  const stats = {
    totalSpent: payments
      .filter(p => p.payment_status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0) / 100,
    pendingPayments: payments.filter(p => p.payment_status === 'pending').length,
    completedPayments: payments.filter(p => p.payment_status === 'completed').length,
    totalSavings: payments
      .filter(p => p.payment_status === 'completed')
      .reduce((sum, p) => sum + p.discount_amount, 0) / 100
  };

  const handlePromoCodeCheck = async () => {
    if (!promoCode.trim() || amount <= 0) return;

    const result = await validatePromoCode(promoCode, amount * 100);
    setPromoValidation(result);
    
    if (result.valid) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handlePayment = async () => {
    if (!selectedOrderId || amount <= 0) {
      toast.error('Заполните все поля');
      return;
    }

    const result = await createPayment(selectedOrderId, amount * 100, promoCode);
    if (result) {
      setShowPaymentDialog(false);
      setSelectedOrderId('');
      setAmount(0);
      setPromoCode('');
      setPromoValidation(null);
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'failed': return <AlertCircle className="h-4 w-4" />;
      default: return <Receipt className="h-4 w-4" />;
    }
  };

  const finalAmount = promoValidation?.valid ? amount - (promoValidation.discountAmount / 100) : amount;

  return (
    <div className="space-y-6">
      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Потрачено</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSpent.toLocaleString()}₽</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Завершенных платежей</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedPayments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ожидают оплаты</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingPayments}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Экономия</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSavings.toLocaleString()}₽</div>
            <p className="text-xs text-muted-foreground">С промокодами</p>
          </CardContent>
        </Card>
      </div>

      {/* Управление */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>История платежей</CardTitle>
            <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
              <DialogTrigger asChild>
                <Button>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Создать платеж
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Создание платежа</DialogTitle>
                  <DialogDescription>
                    Оплатите заказ с возможностью применения промокода
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="order_id">ID заказа</Label>
                    <Input
                      id="order_id"
                      value={selectedOrderId}
                      onChange={(e) => setSelectedOrderId(e.target.value)}
                      placeholder="Введите ID заказа"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="amount">Сумма (₽)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="promo_code">Промокод (опционально)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="promo_code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        placeholder="PROMO2025"
                      />
                      <Button 
                        variant="outline" 
                        onClick={handlePromoCodeCheck}
                        disabled={!promoCode.trim() || amount <= 0}
                      >
                        Проверить
                      </Button>
                    </div>
                    {promoValidation && (
                      <div className={`mt-2 p-2 rounded text-sm ${
                        promoValidation.valid ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {promoValidation.message}
                      </div>
                    )}
                  </div>

                  {promoValidation?.valid && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span>Сумма к оплате:</span>
                        <span className="line-through text-muted-foreground">{amount}₽</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Итого со скидкой:</span>
                        <span className="text-green-600">{finalAmount}₽</span>
                      </div>
                    </div>
                  )}

                  <Button onClick={handlePayment} className="w-full">
                    Оплатить {finalAmount > 0 ? finalAmount.toLocaleString() + '₽' : ''}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Список платежей */}
      <div className="space-y-4">
        {payments.map(payment => (
          <Card key={payment.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(payment.payment_status)}>
                    {getStatusIcon(payment.payment_status)}
                    <span className="ml-1">{getStatusText(payment.payment_status)}</span>
                  </Badge>
                  <div>
                    <p className="font-medium">
                      {payment.amount / 100}₽
                      {payment.discount_amount > 0 && (
                        <span className="text-green-600 ml-2">
                          (скидка: -{payment.discount_amount / 100}₽)
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ID: {payment.id.slice(-8)} • {payment.payment_gateway}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {new Date(payment.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {payment.completed_at 
                      ? `Завершен: ${new Date(payment.completed_at).toLocaleDateString()}`
                      : 'В обработке'
                    }
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {payments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Пока нет платежей</h3>
            <p className="text-muted-foreground">
              Платежи будут отображаться здесь после их создания
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
