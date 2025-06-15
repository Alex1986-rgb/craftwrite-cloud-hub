
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CreditCard, 
  Calendar, 
  Download,
  Plus,
  Filter,
  Search,
  CheckCircle,
  Clock,
  AlertCircle
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

interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export default function ClientPayments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const payments: Payment[] = [
    {
      id: 'PAY-001',
      orderId: 'ORD-001',
      amount: 8500,
      status: 'completed',
      method: 'card',
      date: '2024-12-10',
      description: 'Оплата за SEO-статью',
      invoiceUrl: '/invoices/PAY-001.pdf'
    },
    {
      id: 'PAY-002',
      orderId: 'ORD-002',
      amount: 25000,
      status: 'completed',
      method: 'transfer',
      date: '2024-12-05',
      description: 'Оплата за продающий лендинг',
      invoiceUrl: '/invoices/PAY-002.pdf'
    },
    {
      id: 'PAY-003',
      orderId: 'ORD-004',
      amount: 15000,
      status: 'pending',
      method: 'card',
      date: '2024-12-14',
      description: 'Оплата за SMM-контент'
    }
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'pm_1',
      type: 'card',
      last4: '4242',
      brand: 'visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    },
    {
      id: 'pm_2',
      type: 'card',
      last4: '0005',
      brand: 'mastercard',
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false
    }
  ];

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
      <Badge className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getMethodLabel = (method: Payment['method']) => {
    const methods = {
      card: 'Банковская карта',
      transfer: 'Банковский перевод',
      cash: 'Наличные'
    };
    return methods[method];
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPaid = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Платежи</h1>
        <p className="text-slate-600">Управляйте платежами и способами оплаты</p>
      </div>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Оплачено</p>
                <p className="text-xl font-bold">₽{totalPaid.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">К оплате</p>
                <p className="text-xl font-bold">₽{pendingAmount.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Всего платежей</p>
                <p className="text-xl font-bold">{payments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Способы оплаты</CardTitle>
            <CardDescription>Управляйте сохраненными картами</CardDescription>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Добавить карту
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-slate-600" />
                    <div>
                      <div className="font-medium">
                        **** **** **** {method.last4}
                      </div>
                      <div className="text-sm text-slate-600 capitalize">
                        {method.brand} • {method.expiryMonth}/{method.expiryYear}
                      </div>
                    </div>
                  </div>
                  {method.isDefault && (
                    <Badge variant="secondary">По умолчанию</Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Редактировать
                  </Button>
                  <Button variant="outline" size="sm">
                    Удалить
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Поиск по описанию или номеру заказа..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="pending">Ожидает</SelectItem>
                  <SelectItem value="completed">Завершен</SelectItem>
                  <SelectItem value="failed">Ошибка</SelectItem>
                  <SelectItem value="refunded">Возврат</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>История платежей</CardTitle>
          <CardDescription>Все ваши транзакции</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPayments.map((payment) => (
              <div
                key={payment.id}
                className="border rounded-lg p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium">{payment.description}</h3>
                    <p className="text-sm text-slate-600">
                      {payment.orderId} • {getMethodLabel(payment.method)}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">₽{payment.amount.toLocaleString()}</div>
                    {getStatusBadge(payment.status)}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(payment.date).toLocaleDateString('ru-RU')}</span>
                    <span>•</span>
                    <span>ID: {payment.id}</span>
                  </div>

                  <div className="flex gap-2">
                    {payment.invoiceUrl && (
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Счет
                      </Button>
                    )}
                    {payment.status === 'completed' && (
                      <Button variant="outline" size="sm">
                        Повторить оплату
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
