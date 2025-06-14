
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Clock, DollarSign, CheckCircle, Edit3 } from "lucide-react";

interface OrderFormSummaryProps {
  service: string;
  deadline: string;
  estimatedPrice: number;
  clientName: string;
  clientEmail: string;
  details: string;
  onEdit: () => void;
}

export default function OrderFormSummary({
  service,
  deadline,
  estimatedPrice,
  clientName,
  clientEmail,
  details,
  onEdit
}: OrderFormSummaryProps) {
  const getDeadlineText = (deadline: string) => {
    switch (deadline) {
      case "standard": return "3-5 рабочих дней";
      case "urgent": return "1-2 рабочих дня";
      case "express": return "24 часа";
      default: return "Стандартный";
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-white to-slate-50 border-2 border-primary/20 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          Сводка заказа
        </h3>
      </div>

      <div className="space-y-4">
        {/* Client Info */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Контактная информация</h4>
          <div className="space-y-1 text-sm text-blue-700">
            <div><strong>Имя:</strong> {clientName}</div>
            <div><strong>Email:</strong> {clientEmail}</div>
          </div>
        </div>

        {/* Service Info */}
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-2">Услуга</h4>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {service}
            </Badge>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-orange-50 rounded-lg p-4">
          <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Сроки выполнения
          </h4>
          <div className="text-sm text-orange-700">
            {getDeadlineText(deadline)}
          </div>
        </div>

        {/* Price */}
        <div className="bg-purple-50 rounded-lg p-4">
          <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Стоимость
          </h4>
          <div className="text-2xl font-bold text-purple-700">
            {estimatedPrice.toLocaleString()} ₽
          </div>
          <div className="text-xs text-purple-600">
            Финальная стоимость может отличаться
          </div>
        </div>

        {/* Details */}
        {details && (
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="font-semibold text-slate-800 mb-2">Описание проекта</h4>
            <div className="text-sm text-slate-700 max-h-32 overflow-y-auto">
              {details}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200">
        <Button 
          variant="outline" 
          onClick={onEdit}
          className="w-full flex items-center gap-2"
        >
          <Edit3 className="w-4 h-4" />
          Редактировать заказ
        </Button>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-lg">
        <CheckCircle className="w-4 h-4" />
        <span>Все данные проверены и готовы к отправке</span>
      </div>
    </Card>
  );
}
