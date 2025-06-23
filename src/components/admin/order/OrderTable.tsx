
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Download, Calendar, DollarSign } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EnhancedOrder } from "@/hooks/useEnhancedOrders";

interface OrderTableProps {
  orders: EnhancedOrder[];
  searchQuery: string;
  onStatusChange: (orderId: string, newStatus: string) => void;
  onViewOrder: (order: EnhancedOrder) => void;
}

export default function OrderTable({ orders, searchQuery, onStatusChange, onViewOrder }: OrderTableProps) {
  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { label: "Низкий", className: "bg-gray-100 text-gray-800" },
      medium: { label: "Средний", className: "bg-blue-100 text-blue-800" },
      high: { label: "Высокий", className: "bg-orange-100 text-orange-800" },
      urgent: { label: "Срочно", className: "bg-red-100 text-red-800" }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return <Badge variant="outline" className={config?.className}>{config?.label || priority}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: "Новый", className: "bg-green-100 text-green-800" },
      pending: { label: "Ожидает", className: "bg-yellow-100 text-yellow-800" },
      in_progress: { label: "В работе", className: "bg-blue-100 text-blue-800" },
      review: { label: "На проверке", className: "bg-purple-100 text-purple-800" },
      completed: { label: "Завершен", className: "bg-green-100 text-green-800" },
      cancelled: { label: "Отменен", className: "bg-red-100 text-red-800" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant="outline" className={config?.className}>{config?.label || status}</Badge>;
  };

  const formatPrice = (price?: number) => {
    if (!price) return "Не указано";
    return `₽${(price / 100).toLocaleString()}`;
  };

  return (
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
              <TableHead>Цена</TableHead>
              <TableHead>Дедлайн</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-medium text-sm">
                      {order.id.slice(0, 8)}...
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.contact_name}</div>
                    <div className="text-sm text-slate-500">{order.contact_email}</div>
                  </div>
                </TableCell>
                <TableCell>{order.service_name}</TableCell>
                <TableCell>
                  <Select 
                    value={order.status} 
                    onValueChange={(value) => onStatusChange(order.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Новый</SelectItem>
                      <SelectItem value="pending">Ожидает</SelectItem>
                      <SelectItem value="in_progress">В работе</SelectItem>
                      <SelectItem value="review">На проверке</SelectItem>
                      <SelectItem value="completed">Завершен</SelectItem>
                      <SelectItem value="cancelled">Отменен</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{getPriorityBadge(order.priority)}</TableCell>
                <TableCell className="font-medium">
                  {formatPrice(order.final_price || order.estimated_price)}
                </TableCell>
                <TableCell>
                  {order.deadline ? (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {new Date(order.deadline).toLocaleDateString('ru-RU')}
                    </div>
                  ) : (
                    <span className="text-slate-400">Не указан</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onViewOrder(order)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
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
  );
}
