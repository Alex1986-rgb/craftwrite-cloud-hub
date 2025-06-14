
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
  DollarSign,
  User,
  Calendar
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
import { useOrderManagement } from "@/hooks/useOrderManagement";

export default function OrderManagement() {
  const { 
    orders, 
    loading, 
    searchQuery, 
    statusFilter, 
    priorityFilter,
    selectedOrder,
    loadOrders, 
    searchOrders, 
    setStatusFilter,
    setPriorityFilter,
    setSelectedOrder,
    updateOrderStatus
  } = useOrderManagement();

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: "Новый", className: "bg-yellow-100 text-yellow-800" },
      in_progress: { label: "В работе", className: "bg-blue-100 text-blue-800" },
      review: { label: "На проверке", className: "bg-purple-100 text-purple-800" },
      completed: { label: "Завершен", className: "bg-green-100 text-green-800" },
      cancelled: { label: "Отменен", className: "bg-red-100 text-red-800" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { label: "Низкий", className: "bg-gray-100 text-gray-800" },
      medium: { label: "Средний", className: "bg-blue-100 text-blue-800" },
      high: { label: "Высокий", className: "bg-orange-100 text-orange-800" },
      urgent: { label: "Срочно", className: "bg-red-100 text-red-800" }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    await updateOrderStatus(orderId, newStatus);
  };

  const orderStats = {
    total: orders.length,
    new: orders.filter(o => o.status === 'new').length,
    inProgress: orders.filter(o => o.status === 'in_progress').length,
    completed: orders.filter(o => o.status === 'completed').length,
    totalValue: orders.reduce((sum, o) => sum + o.amount, 0)
  };

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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Всего заказов</p>
                <p className="text-xl font-bold">{orderStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Новые</p>
                <p className="text-xl font-bold">{orderStats.new}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">В работе</p>
                <p className="text-xl font-bold">{orderStats.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Завершено</p>
                <p className="text-xl font-bold">{orderStats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Общая сумма</p>
                <p className="text-xl font-bold">₽{orderStats.totalValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
                onChange={(e) => searchOrders(e.target.value)}
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
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Приоритет" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все приоритеты</SelectItem>
                <SelectItem value="low">Низкий</SelectItem>
                <SelectItem value="medium">Средний</SelectItem>
                <SelectItem value="high">Высокий</SelectItem>
                <SelectItem value="urgent">Срочный</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Заказы ({orders.length})</CardTitle>
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
              {orders.map((order) => (
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
                  <TableCell>
                    <Select 
                      value={order.status} 
                      onValueChange={(value) => handleStatusChange(order.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Новый</SelectItem>
                        <SelectItem value="in_progress">В работе</SelectItem>
                        <SelectItem value="review">На проверке</SelectItem>
                        <SelectItem value="completed">Завершен</SelectItem>
                        <SelectItem value="cancelled">Отменен</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                  <TableCell className="font-medium">₽{order.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
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
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Детали заказа {order.id}</DialogTitle>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div>
                                    <label className="text-sm font-medium text-slate-700">Клиент</label>
                                    <div className="mt-1 p-3 bg-slate-50 rounded-lg">
                                      <p className="font-medium">{selectedOrder.clientName}</p>
                                      <p className="text-sm text-slate-500">{selectedOrder.clientEmail}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-slate-700">Услуга</label>
                                    <div className="mt-1 p-3 bg-slate-50 rounded-lg">
                                      <p>{selectedOrder.service}</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <div>
                                    <label className="text-sm font-medium text-slate-700">Статус и приоритет</label>
                                    <div className="mt-1 p-3 bg-slate-50 rounded-lg flex gap-2">
                                      {getStatusBadge(selectedOrder.status)}
                                      {getPriorityBadge(selectedOrder.priority)}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-slate-700">Финансы</label>
                                    <div className="mt-1 p-3 bg-slate-50 rounded-lg">
                                      <p className="font-semibold text-lg">₽{selectedOrder.amount.toLocaleString()}</p>
                                      <p className="text-sm text-slate-500">Дедлайн: {new Date(selectedOrder.deadline).toLocaleDateString('ru-RU')}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-slate-700">Описание заказа</label>
                                <div className="mt-1 p-4 bg-slate-50 rounded-lg">
                                  <p className="text-slate-900">{selectedOrder.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center justify-between pt-4 border-t">
                                <div className="text-sm text-slate-500">
                                  Создан: {new Date(selectedOrder.createdAt).toLocaleDateString('ru-RU')}
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Редактировать
                                  </Button>
                                  <Button variant="outline">
                                    <Download className="w-4 h-4 mr-2" />
                                    Скачать
                                  </Button>
                                </div>
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
          
          {orders.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p>Заказы не найдены</p>
              {searchQuery && (
                <p className="text-sm">Попробуйте изменить поисковый запрос</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
