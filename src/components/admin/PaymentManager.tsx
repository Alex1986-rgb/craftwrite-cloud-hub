
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, CreditCard, Download, Eye, RefreshCw, DollarSign } from "lucide-react";

interface Payment {
  id: string;
  orderId: string;
  clientName: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'card' | 'bank_transfer' | 'yandex_money';
  date: string;
  transactionId: string;
}

export default function PaymentManager() {
  const [payments] = useState<Payment[]>([
    {
      id: "PAY-001",
      orderId: "ORD-001",
      clientName: "ООО 'Технологии'",
      amount: 8500,
      status: "completed",
      method: "card",
      date: "2024-12-14",
      transactionId: "txn_1234567890"
    },
    {
      id: "PAY-002",
      orderId: "ORD-002",
      clientName: "ИП Петров",
      amount: 25000,
      status: "pending",
      method: "bank_transfer",
      date: "2024-12-14",
      transactionId: "txn_0987654321"
    },
    {
      id: "PAY-003",
      orderId: "ORD-003",
      clientName: "Старт-ап XYZ",
      amount: 12000,
      status: "failed",
      method: "card",
      date: "2024-12-13",
      transactionId: "txn_1122334455"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const getStatusBadge = (status: Payment['status']) => {
    const statusConfig = {
      pending: { label: "Ожидает", className: "bg-yellow-100 text-yellow-800" },
      completed: { label: "Завершен", className: "bg-green-100 text-green-800" },
      failed: { label: "Ошибка", className: "bg-red-100 text-red-800" },
      refunded: { label: "Возврат", className: "bg-blue-100 text-blue-800" }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getMethodBadge = (method: Payment['method']) => {
    const methodConfig = {
      card: { label: "Карта", className: "bg-purple-100 text-purple-800" },
      bank_transfer: { label: "Банк", className: "bg-blue-100 text-blue-800" },
      yandex_money: { label: "ЯДеньги", className: "bg-orange-100 text-orange-800" }
    };
    
    const config = methodConfig[method];
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  const totalAmount = payments.reduce((sum, payment) => 
    payment.status === 'completed' ? sum + payment.amount : sum, 0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Управление платежами</h1>
          <p className="text-slate-600">Мониторинг и управление всеми платежными операциями</p>
        </div>
        <Button className="bg-gradient-to-r from-green-600 to-blue-600">
          <RefreshCw className="w-4 h-4 mr-2" />
          Обновить
        </Button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Всего получено</p>
                <p className="text-2xl font-bold text-green-600">₽{totalAmount.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Завершенных</p>
                <p className="text-2xl font-bold text-blue-600">
                  {payments.filter(p => p.status === 'completed').length}
                </p>
              </div>
              <CreditCard className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Ожидающих</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {payments.filter(p => p.status === 'pending').length}
                </p>
              </div>
              <RefreshCw className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Ошибок</p>
                <p className="text-2xl font-bold text-red-600">
                  {payments.filter(p => p.status === 'failed').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold">!</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Фильтры */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Поиск по клиенту, номеру заказа, ID транзакции..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Экспорт
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Таблица платежей */}
      <Card>
        <CardHeader>
          <CardTitle>Платежи ({payments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID платежа</TableHead>
                <TableHead>Заказ</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Способ</TableHead>
                <TableHead>Дата</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-mono">{payment.id}</TableCell>
                  <TableCell className="font-mono text-blue-600">{payment.orderId}</TableCell>
                  <TableCell>{payment.clientName}</TableCell>
                  <TableCell className="font-medium">₽{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>{getMethodBadge(payment.method)}</TableCell>
                  <TableCell>{new Date(payment.date).toLocaleDateString('ru-RU')}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
