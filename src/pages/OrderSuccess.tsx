import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, MessageCircle, Star, ArrowRight, Phone, Mail } from 'lucide-react';

export default function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('id');

  useEffect(() => {
    // Отправляем событие в аналитику
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'purchase', {
        event_category: 'ecommerce',
        event_label: 'order_completed',
        value: 1
      });
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50/30 to-purple-50/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Success Header */}
          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12" />
              </div>
              <CardTitle className="text-3xl mb-2">
                🎉 Заказ успешно создан!
              </CardTitle>
              <p className="text-xl opacity-90">
                Номер заказа: <span className="font-mono bg-white/20 px-2 py-1 rounded">#{orderId?.slice(-8) || 'XXX'}</span>
              </p>
            </CardHeader>
          </Card>

          {/* What Happens Next */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Что происходит дальше?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Подтверждение заказа</h4>
                    <p className="text-sm text-gray-600">
                      В течение 30 минут вы получите email с подтверждением и деталями заказа
                    </p>
                    <Badge variant="outline" className="mt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      30 минут
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-purple-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Звонок менеджера</h4>
                    <p className="text-sm text-gray-600">
                      Наш менеджер свяжется с вами для уточнения деталей проекта
                    </p>
                    <Badge variant="outline" className="mt-1">
                      <Phone className="w-3 h-3 mr-1" />
                      1-2 часа
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-green-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Начало работы</h4>
                    <p className="text-sm text-gray-600">
                      После согласования деталей мы приступаем к созданию вашего текста
                    </p>
                    <Badge variant="outline" className="mt-1">
                      <Star className="w-3 h-3 mr-1" />
                      В тот же день
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Остались вопросы?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <div>
                      <div className="font-medium">+7 (800) 123-45-67</div>
                      <div className="text-sm text-gray-500">Звонок бесплатный</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-green-600" />
                    <div>
                      <div className="font-medium">support@copypro.cloud</div>
                      <div className="text-sm text-gray-500">Ответим в течение часа</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-4 h-4 text-purple-600" />
                    <div>
                      <div className="font-medium">Онлайн-чат</div>
                      <div className="text-sm text-gray-500">Доступен 24/7</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Полезные ссылки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link 
                    to="/portfolio"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span>Примеры наших работ</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  
                  <Link 
                    to="/faq"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span>Часто задаваемые вопросы</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  
                  <Link 
                    to="/guarantees"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span>Гарантии качества</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Хотите заказать ещё один текст?
              </h3>
              <p className="text-gray-600 mb-4">
                Постоянным клиентам предоставляем скидки до 15%
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Link to="/smart-order">
                    Создать новый заказ
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/">
                    Вернуться на главную
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
