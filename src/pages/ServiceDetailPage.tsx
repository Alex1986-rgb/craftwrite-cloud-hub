
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Eye, ShoppingCart, Clock, DollarSign, Star, CheckCircle } from 'lucide-react';
import { ALL_SERVICES } from '@/data/allServices';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  console.log('ServiceDetailPage - slug:', slug);
  console.log('Available services:', ALL_SERVICES.map(s => s.slug));
  
  const service = ALL_SERVICES.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4">Услуга не найдена</h2>
            <p className="text-gray-600 mb-6">
              Проверьте правильность ссылки или выберите услугу из каталога
            </p>
            <div className="text-sm text-gray-500 mb-4">
              Запрошенная услуга: {slug}
            </div>
            <div className="space-y-3">
              <Button onClick={() => navigate('/services')} className="w-full">
                Перейти к каталогу услуг
              </Button>
              <Button variant="outline" onClick={() => navigate('/order')} className="w-full">
                Выбрать другую услугу
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-emerald-400/10 to-blue-400/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/services')}
            className="hover:text-blue-600"
          >
            Услуги
          </Button>
          <span>/</span>
          <span className="text-gray-800 font-medium">{service.name}</span>
        </div>

        {/* Service header */}
        <div className="mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-blue-100/50 shadow-lg">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl md:text-3xl mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {service.name}
                  </CardTitle>
                  <p className="text-gray-600 text-lg">{service.desc}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={() => navigate(`/order/${service.slug}`)}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white group"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Заказать услугу
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-green-800">
                      {service.price.min.toLocaleString()} - {service.price.max.toLocaleString()} ₽
                    </div>
                    <div className="text-sm text-green-600">Стоимость</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold text-blue-800">
                      {service.deliveryTime.min}-{service.deliveryTime.max} {service.deliveryTime.unit}
                    </div>
                    <div className="text-sm text-blue-600">Срок выполнения</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-bold text-purple-800 flex items-center gap-1">
                      {Array.from({ length: service.popularity }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                      ))}
                    </div>
                    <div className="text-sm text-purple-600">Популярность</div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Что включено в услугу:</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {service.difficulty}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {service.category}
                </Badge>
                {service.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/order')}
            className="group flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Назад к каталогу
          </Button>
          <Button 
            onClick={() => navigate(`/order/${service.slug}`)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Заказать эту услугу
          </Button>
        </div>
      </div>
    </div>
  );
}
