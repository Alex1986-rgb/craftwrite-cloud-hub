
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  Clock, 
  DollarSign, 
  Target, 
  Users, 
  Search,
  CheckCircle,
  Edit,
  CreditCard
} from 'lucide-react';

interface OrderEstimateProps {
  formData: {
    articleTopic: string;
    keywords: string;
    wordCount: string;
    targetAudience: string;
    competitorUrls: string;
    includeImages: boolean;
    includeInfographics: boolean;
    metaDescription: string;
    callToAction: string;
    contentStyle: string;
    expertQuotes: boolean;
    statistics: boolean;
  };
  onEdit: () => void;
  onPayment: () => void;
}

export default function OrderEstimate({ formData, onEdit, onPayment }: OrderEstimateProps) {
  const calculatePrice = () => {
    let basePrice = 2500; // Базовая цена
    
    // Цена по объему
    switch (formData.wordCount) {
      case '1000-2000':
        basePrice = 2500;
        break;
      case '2000-3000':
        basePrice = 4000;
        break;
      case '3000-5000':
        basePrice = 6500;
        break;
      case '5000+':
        basePrice = 9000;
        break;
    }
    
    // Дополнительные услуги
    let additionalServices = 0;
    if (formData.includeImages) additionalServices += 800;
    if (formData.includeInfographics) additionalServices += 1500;
    if (formData.expertQuotes) additionalServices += 1200;
    if (formData.statistics) additionalServices += 600;
    
    // Стиль контента
    if (formData.contentStyle === 'expert') {
      basePrice = Math.round(basePrice * 1.3);
    }
    
    return { basePrice, additionalServices, total: basePrice + additionalServices };
  };

  const pricing = calculatePrice();
  
  const getDeliveryDays = () => {
    switch (formData.wordCount) {
      case '1000-2000': return '3-5';
      case '2000-3000': return '5-7';
      case '3000-5000': return '7-10';
      case '5000+': return '10-14';
      default: return '3-5';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-2 border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 text-white rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Смета заказа</h2>
              <p className="text-sm text-gray-600 font-normal">Проверьте детали перед оплатой</p>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          {/* Основная информация */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Основные параметры
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-gray-600">Тема статьи:</span>
                  <span className="font-medium text-right max-w-xs">{formData.articleTopic}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Объем:</span>
                  <Badge variant="secondary">{formData.wordCount} слов</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Стиль:</span>
                  <Badge variant="outline">{formData.contentStyle || 'Информационный'}</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Срок выполнения:</span>
                  <span className="font-medium flex items-center gap-1">
                    <Clock className="w-4 h-4 text-green-600" />
                    {getDeliveryDays()} дней
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Search className="w-5 h-5 text-green-600" />
                SEO параметры
              </h3>
              
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600 block mb-1">Ключевые слова:</span>
                  <div className="text-sm bg-gray-50 p-2 rounded border max-h-20 overflow-y-auto">
                    {formData.keywords || 'Не указаны'}
                  </div>
                </div>
                
                {formData.targetAudience && (
                  <div>
                    <span className="text-gray-600 block mb-1">Целевая аудитория:</span>
                    <div className="text-sm bg-gray-50 p-2 rounded border max-h-16 overflow-y-auto">
                      {formData.targetAudience}
                    </div>
                  </div>
                )}
                
                {formData.metaDescription && (
                  <div>
                    <span className="text-gray-600 block mb-1">Meta описание:</span>
                    <div className="text-sm bg-gray-50 p-2 rounded border max-h-16 overflow-y-auto">
                      {formData.metaDescription}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Дополнительные услуги */}
          <Separator />
          
          <div>
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-purple-600" />
              Дополнительные услуги
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { key: 'includeImages', label: 'Подбор изображений', price: 800 },
                { key: 'includeInfographics', label: 'Создание инфографики', price: 1500 },
                { key: 'expertQuotes', label: 'Экспертные мнения', price: 1200 },
                { key: 'statistics', label: 'Актуальная статистика', price: 600 }
              ].map((service) => (
                <div key={service.key} className={`p-3 rounded-lg border-2 ${
                  formData[service.key as keyof typeof formData] 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{service.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">+{service.price}₽</span>
                      {formData[service.key as keyof typeof formData] && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Стоимость */}
          <Separator />
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
              <DollarSign className="w-5 h-5 text-blue-600" />
              Расчет стоимости
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Базовая стоимость ({formData.wordCount} слов):</span>
                <span className="font-medium">{pricing.basePrice.toLocaleString()}₽</span>
              </div>
              
              {pricing.additionalServices > 0 && (
                <div className="flex justify-between items-center">
                  <span>Дополнительные услуги:</span>
                  <span className="font-medium">+{pricing.additionalServices.toLocaleString()}₽</span>
                </div>
              )}
              
              <Separator />
              
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Итого к оплате:</span>
                <span className="text-blue-600">{pricing.total.toLocaleString()}₽</span>
              </div>
              
              <div className="text-sm text-gray-600 text-center">
                Включает НДС 20%
              </div>
            </div>
          </div>
          
          {/* Кнопки действий */}
          <div className="flex gap-4 pt-4">
            <Button 
              variant="outline" 
              onClick={onEdit}
              className="flex-1"
            >
              <Edit className="w-4 h-4 mr-2" />
              Редактировать заказ
            </Button>
            
            <Button 
              onClick={onPayment}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Оплатить {pricing.total.toLocaleString()}₽
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
