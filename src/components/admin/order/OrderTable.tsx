
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

interface OrderTableProps {
  orders: Order[];
  searchQuery: string;
  onStatusChange: (orderId: string, newStatus: string) => void;
  onViewOrder: (order: Order) => void;
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
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
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
                    onValueChange={(value) => onStatusChange(order.id, value)}
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
