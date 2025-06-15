
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  Clock, 
  Shield, 
  FileText, 
  Star, 
  Download, 
  MessageCircle,
  Calendar,
  Award,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderThankYouProps {
  orderData: any;
  className?: string;
}

export default function OrderThankYou({ orderData, className }: OrderThankYouProps) {
  const checklist = [
    {
      id: 'analysis',
      title: 'Анализ требований',
      description: 'Изучение ваших настроек и требований',
      icon: FileText,
      completed: true
    },
    {
      id: 'research',
      title: 'Исследование темы',
      description: 'Сбор информации и анализ конкурентов',
      icon: Star,
      completed: false
    },
    {
      id: 'writing',
      title: 'Написание текста',
      description: 'Создание уникального контента',
      icon: MessageCircle,
      completed: false
    },
    {
      id: 'optimization',
      title: 'Оптимизация',
      description: 'SEO-оптимизация и финальная проверка',
      icon: Zap,
      completed: false
    },
    {
      id: 'delivery',
      title: 'Доставка',
      description: 'Отправка готового текста',
      icon: Download,
      completed: false
    }
  ];

  const guarantees = [
    {
      icon: Shield,
      title: 'Уникальность 80-100%',
      description: 'Гарантируем высокую уникальность текста'
    },
    {
      icon: Calendar,
      title: 'Сроки 1-2 дня',
      description: 'Быстрое выполнение заказа'
    },
    {
      icon: Award,
      title: 'Бесплатные правки',
      description: 'Любые корректировки без доплат'
    }
  ];

  return (
    <div className={`max-w-4xl mx-auto space-y-6 ${className}`}>
      {/* Success Header */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">
            Спасибо! Оплата произведена
          </CardTitle>
          <p className="text-green-700">
            Ваш заказ принят в работу. Мы уже начали работать над вашим текстом!
          </p>
        </CardHeader>
      </Card>

      {/* Order Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Детали заказа
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Услуга:</span>
                <p className="font-medium">{orderData.serviceName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Сумма:</span>
                <p className="font-medium text-green-600">
                  {orderData.pricing.totalPrice.toLocaleString()} {orderData.pricing.currency}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Срок выполнения:</span>
                <p className="font-medium">{orderData.timeline.estimatedDays} дня</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Статус:</span>
                <Badge className="bg-blue-100 text-blue-800">В работе</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Process Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-600" />
            Этапы выполнения работы
          </CardTitle>
          <p className="text-sm text-gray-600">
            Отслеживайте прогресс выполнения вашего заказа
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {checklist.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className={`flex items-start gap-4 p-4 rounded-lg border-2 ${
                  item.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className={`p-2 rounded-full ${
                    item.completed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{item.title}</h4>
                      {item.completed && (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Этап {index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Guarantees */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Наши гарантии
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {guarantees.map((guarantee) => {
              const Icon = guarantee.icon;
              return (
                <div key={guarantee.title} className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{guarantee.title}</h4>
                  <p className="text-sm text-gray-600">{guarantee.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Receipt Note */}
      <Card className="border-dashed border-2 border-blue-200 bg-blue-50">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center gap-2 text-blue-800 mb-2">
            <FileText className="w-5 h-5" />
            <span className="font-semibold">Чек об оплате</span>
          </div>
          <p className="text-sm text-blue-700">
            Чек об оплате отправлен на вашу электронную почту. 
            Сохраните его для отчетности.
          </p>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild variant="outline" className="gap-2">
          <Link to="/">
            Вернуться на главную
          </Link>
        </Button>
        <Button asChild className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500">
          <Link to="/order">
            Заказать еще
          </Link>
        </Button>
      </div>
    </div>
  );
}
