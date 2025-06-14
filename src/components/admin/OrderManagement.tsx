
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Order {
  id: string;
  clientName: string;
  clientEmail: string;
  service: string;
  status: 'new' | 'in_progress' | 'review' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  amount: number;
  deadline: string;
  createdAt: string;
  description: string;
  aiGenerated: boolean;
}

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      clientName: "ООО 'Инновационные технологии'",
      clientEmail: "tech@company.ru",
      service: "SEO-статья",
      status: "in_progress",
      priority: "high",
      amount: 8500,
      deadline: "2024-12-20",
      createdAt: "2024-12-14",
      description: "Статья о внедрении AI в бизнес-процессы, 3000 знаков",
      aiGenerated: false
    },
    {
      id: "ORD-002",
      clientName: "ИП Петров Алексей",
      clientEmail: "petrov@business.ru",
      service: "Продающий лендинг",
      status: "completed",
      priority: "medium",
      amount: 25000,
      deadline: "2024-12-15",
      createdAt: "2024-12-10",
      description: "Лендинг для курсов по маркетингу",
      aiGenerated: true
    },
    {
      id: "ORD-003",
      clientName: "Старт-ап XYZ",
      clientEmail: "hello@startupxyz.com",
      service: "Email-кампания",
      status: "new",
      priority: "urgent",
      amount: 12000,
      deadline: "2024-12-18",
      createdAt: "2024-12-14",
      description: "Серия из 5 писем для email-рассылки",
      aiGenerated: false
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      new: { label: "Новый", className: "bg-yellow-100 text-yellow-800" },
      in_progress: { label: "В работе", className: "bg-blue-100 text-blue-800" },
      review: { label: "На проверке", className: "bg-purple-100 text-purple-800" },
      completed: { label: "Завершен", className: "bg-green-100 text-green-800" },
      cancelled: { label: "Отменен", className: "bg-red-100 text-red-800" }
    };
    
    const config = statusConfig[status];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: Order['priority']) => {
    const priorityConfig = {
      low: { label: "Низкий", className: "bg-gray-100 text-gray-800" },
      medium: { label: "Средний", className: "bg-blue-100 text-blue-800" },
      high: { label: "Высокий", className: "bg-orange-100 text-orange-800" },
      urgent: { label: "Срочно", className: "bg-red-100 text-red-800" }
    };
    
    const config = priorityConfig[priority];
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Управление заказами</h1>
          <p className="text-slate-600">Полный контроль над заказами и их статусами</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="w-4 h-4 mr-2" />
          Создать заказ
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Поиск по клиенту, услуге, номеру заказа..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Статус заказа" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="new">Новые</SelectItem>
                <SelectItem value="in_progress">В работе</SelectItem>
                <SelectItem value="review">На проверке</SelectItem>
                <SelectItem value="completed">Завершенные</SelectItem>
                <SelectItem value="cancelled">Отмененные</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Фильтры
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Заказы ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Заказ</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Услуга</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Приоритет</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead>Дедлайн</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-medium">{order.id}</span>
                      {order.aiGenerated && (
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          AI
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.clientName}</div>
                      <div className="text-sm text-slate-500">{order.clientEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>{order.service}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                  <TableCell className="font-medium">₽{order.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      {new Date(order.deadline).toLocaleDateString('ru-RU')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Детали заказа {order.id}</DialogTitle>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-slate-700">Клиент</label>
                                  <p className="text-slate-900">{selectedOrder.clientName}</p>
                                  <p className="text-sm text-slate-500">{selectedOrder.clientEmail}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-slate-700">Услуга</label>
                                  <p className="text-slate-900">{selectedOrder.service}</p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-slate-700">Статус</label>
                                  <div className="mt-1">{getStatusBadge(selectedOrder.status)}</div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-slate-700">Сумма</label>
                                  <p className="text-slate-900 font-medium">₽{selectedOrder.amount.toLocaleString()}</p>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-slate-700">Описание</label>
                                <p className="text-slate-900 mt-1">{selectedOrder.description}</p>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
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
