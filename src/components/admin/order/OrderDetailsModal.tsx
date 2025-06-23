
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EnhancedOrder } from "@/hooks/useEnhancedOrders";

interface OrderDetailsModalProps {
  order: EnhancedOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  if (!order) return null;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { label: "Новый", className: "bg-yellow-100 text-yellow-800" },
      pending: { label: "Ожидает", className: "bg-yellow-100 text-yellow-800" },
      in_progress: { label: "В работе", className: "bg-blue-100 text-blue-800" },
      review: { label: "На проверке", className: "bg-purple-100 text-purple-800" },
      completed: { label: "Завершен", className: "bg-green-100 text-green-800" },
      cancelled: { label: "Отменен", className: "bg-red-100 text-red-800" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge className={config?.className}>{config?.label || status}</Badge>;
  };

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

  const formatPrice = (price?: number) => {
    if (!price) return "Не указано";
    return `₽${(price / 100).toLocaleString()}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Детали заказа {order.id.slice(0, 8)}...</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Клиент</label>
                <div className="mt-1 p-3 bg-slate-50 rounded-lg">
                  <p className="font-medium">{order.contact_name}</p>
                  <p className="text-sm text-slate-500">{order.contact_email}</p>
                  {order.contact_phone && (
                    <p className="text-sm text-slate-500">{order.contact_phone}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Услуга</label>
                <div className="mt-1 p-3 bg-slate-50 rounded-lg">
                  <p>{order.service_name}</p>
                  <p className="text-sm text-slate-500">Slug: {order.service_slug}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Статус и приоритет</label>
                <div className="mt-1 p-3 bg-slate-50 rounded-lg flex gap-2">
                  {getStatusBadge(order.status)}
                  {getPriorityBadge(order.priority)}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Финансы</label>
                <div className="mt-1 p-3 bg-slate-50 rounded-lg">
                  <p className="font-semibold text-lg">
                    {formatPrice(order.final_price || order.estimated_price)}
                  </p>
                  {order.deadline && (
                    <p className="text-sm text-slate-500">
                      Дедлайн: {new Date(order.deadline).toLocaleDateString('ru-RU')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Описание заказа</label>
            <div className="mt-1 p-4 bg-slate-50 rounded-lg">
              <p className="text-slate-900">{order.details}</p>
              {order.additional_requirements && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm font-medium text-slate-700 mb-1">Дополнительные требования:</p>
                  <p className="text-slate-600">{order.additional_requirements}</p>
                </div>
              )}
            </div>
          </div>
          {order.notes && (
            <div>
              <label className="text-sm font-medium text-slate-700">Заметки</label>
              <div className="mt-1 p-4 bg-slate-50 rounded-lg">
                <p className="text-slate-900">{order.notes}</p>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm text-slate-500">
              Создан: {new Date(order.created_at).toLocaleDateString('ru-RU')}
              {order.completed_at && (
                <span className="ml-4">
                  Завершен: {new Date(order.completed_at).toLocaleDateString('ru-RU')}
                </span>
              )}
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
      </DialogContent>
    </Dialog>
  );
}
