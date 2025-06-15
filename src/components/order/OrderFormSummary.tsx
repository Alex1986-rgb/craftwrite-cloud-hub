
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Clock, DollarSign, CheckCircle, Edit3, Target, Users, Zap } from "lucide-react";
import { Service } from "@/data/services";

interface OrderFormSummaryProps {
  service: string;
  deadline: string;
  estimatedPrice: number;
  deliveryTime: string;
  clientName: string;
  clientEmail: string;
  details: string;
  serviceDetails?: Service;
  onEdit: () => void;
  variant?: 'public' | 'client';
}

export default function OrderFormSummary({
  service,
  deadline,
  estimatedPrice,
  deliveryTime,
  clientName,
  clientEmail,
  details,
  serviceDetails,
  onEdit,
  variant = 'public'
}: OrderFormSummaryProps) {
  const getDeadlineText = (deadline: string) => {
    switch (deadline) {
      case "standard": return "Стандартный";
      case "urgent": return "Срочный";
      case "express": return "Экспресс";
      default: return "Стандартный";
    }
  };

  const getDeadlineIcon = (deadline: string) => {
    switch (deadline) {
      case "urgent": return <Zap className="w-4 h-4" />;
      case "express": return <Target className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
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

      <div className="space-y-6">
        {/* Client Info */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Контактная информация
          </h4>
          <div className="space-y-2 text-sm text-blue-700">
            <div className="flex justify-between">
              <span className="font-medium">Имя:</span>
              <span>{clientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Email:</span>
              <span>{clientEmail}</span>
            </div>
          </div>
        </div>

        {/* Service Info */}
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-3">Выбранная услуга</h4>
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-medium text-green-800">{service}</div>
                {serviceDetails && (
                  <div className="text-sm text-green-600 mt-1">{serviceDetails.desc}</div>
                )}
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-700 ml-3">
                {serviceDetails?.category || "услуга"}
              </Badge>
            </div>
            
            {serviceDetails && serviceDetails.features.length > 0 && (
              <div className="mt-3">
                <div className="text-sm font-medium text-green-800 mb-2">Включенные услуги:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {serviceDetails.features.slice(0, 6).map((feature, index) => (
                    <div key={index} className="text-xs text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {feature}
                    </div>
                  ))}
                  {serviceDetails.features.length > 6 && (
                    <div className="text-xs text-green-600 font-medium">
                      + еще {serviceDetails.features.length - 6} услуг
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Timeline and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Timeline */}
          <div className="bg-orange-50 rounded-lg p-4">
            <h4 className="font-semibold text-orange-800 mb-3 flex items-center gap-2">
              {getDeadlineIcon(deadline)}
              Сроки выполнения
            </h4>
            <div className="space-y-2 text-sm text-orange-700">
              <div className="flex justify-between">
                <span>Тип:</span>
                <span className="font-medium">{getDeadlineText(deadline)}</span>
              </div>
              <div className="flex justify-between">
                <span>Срок:</span>
                <span className="font-medium">{deliveryTime}</span>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Стоимость
            </h4>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-purple-700">
                {estimatedPrice.toLocaleString()} ₽
              </div>
              {serviceDetails && (
                <div className="text-xs text-purple-600">
                  Диапазон: {serviceDetails.price.min.toLocaleString()}-{serviceDetails.price.max.toLocaleString()} ₽
                </div>
              )}
              <div className="text-xs text-purple-600">
                Финальная стоимость может отличаться
              </div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        {details && (
          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="font-semibold text-slate-800 mb-3">Описание проекта</h4>
            <div className="text-sm text-slate-700 max-h-32 overflow-y-auto bg-white rounded p-3 border">
              {details}
            </div>
          </div>
        )}

        {/* Key Requirements */}
        {serviceDetails && serviceDetails.rules.length > 0 && (
          <div className="bg-amber-50 rounded-lg p-4">
            <h4 className="font-semibold text-amber-800 mb-3">Ключевые требования к работе</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              {serviceDetails.rules.slice(0, 4).map((rule, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-3 h-3 mt-1 flex-shrink-0" />
                  {rule}
                </li>
              ))}
              {serviceDetails.rules.length > 4 && (
                <li className="text-amber-600 font-medium text-xs">
                  + еще {serviceDetails.rules.length - 4} требований
                </li>
              )}
            </ul>
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
