
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Mail, Phone } from 'lucide-react';
import { OrderFormData } from '@/types/advancedOrder';

interface OrderThankYouProps {
  orderData: OrderFormData;
}

export default function OrderThankYou({ orderData }: OrderThankYouProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-700">
            Заказ успешно создан!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Детали заказа:</h3>
            <div className="text-left space-y-2">
              <div><strong>Услуга:</strong> {orderData.serviceName}</div>
              <div><strong>Стоимость:</strong> {orderData.pricing.totalPrice.toLocaleString()} {orderData.pricing.currency}</div>
              <div><strong>Срок выполнения:</strong> {orderData.timeline.estimatedDays} дней</div>
            </div>
          </div>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2 justify-center">
              <Clock className="w-4 h-4" />
              <span>Мы свяжемся с вами в течение 2 часов</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Mail className="w-4 h-4" />
              <span>Уведомления будут отправлены на {orderData.personalInfo.email}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full">
              Отслеживать заказ
            </Button>
            <Button variant="secondary" className="w-full">
              Создать новый заказ
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
