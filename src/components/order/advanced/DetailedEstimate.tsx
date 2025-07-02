import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Clock, 
  DollarSign, 
  Target, 
  Search,
  CheckCircle,
  Edit,
  CreditCard,
  Download,
  Eye,
  Users,
  Hash,
  Star
} from 'lucide-react';

interface DetailedEstimateProps {
  serviceType: string;
  projectDetails: string;
  keywords: string[];
  lsiKeywords: string[];
  contentStructure: any[];
  totalWordCount: number;
  targetAudience?: string;
  competitorUrls?: string[];
  additionalServices: string[];
  urgencyMultiplier: number;
  onEdit: () => void;
  onApprove: () => void;
  onPayment: () => void;
}

export default function DetailedEstimate({
  serviceType,
  projectDetails,
  keywords,
  lsiKeywords,
  contentStructure,
  totalWordCount,
  targetAudience,
  competitorUrls = [],
  additionalServices,
  urgencyMultiplier,
  onEdit,
  onApprove,
  onPayment
}: DetailedEstimateProps) {
  const [isApproved, setIsApproved] = useState(false);

  const calculatePrice = () => {
    let basePrice = 0;
    
    // Базовая цена по типу услуги
    const servicePrices: Record<string, number> = {
      'article': 2.5, // за слово
      'selling-text': 4,
      'social-posts': 3,
      'website-texts': 3.5,
      'other': 3
    };
    
    const pricePerWord = servicePrices[serviceType] || 3;
    basePrice = totalWordCount * pricePerWord;
    
    // Дополнительные услуги
    let additionalCost = 0;
    additionalServices.forEach(service => {
      switch (service) {
        case 'seo-optimization':
          additionalCost += Math.round(basePrice * 0.3);
          break;
        case 'competitor-analysis':
          additionalCost += 2000;
          break;
        case 'images':
          additionalCost += 1000;
          break;
        case 'infographics':
          additionalCost += 2500;
          break;
        case 'expert-quotes':
          additionalCost += 1500;
          break;
        case 'statistics':
          additionalCost += 800;
          break;
      }
    });
    
    // Множитель срочности
    const urgencyPrice = urgencyMultiplier > 1 ? Math.round(basePrice * (urgencyMultiplier - 1)) : 0;
    
    const subtotal = basePrice + additionalCost + urgencyPrice;
    const tax = Math.round(subtotal * 0.2); // НДС 20%
    const total = subtotal + tax;
    
    return {
      basePrice: Math.round(basePrice),
      additionalCost,
      urgencyPrice,
      subtotal: Math.round(subtotal),
      tax,
      total: Math.round(total)
    };
  };

  const pricing = calculatePrice();
  
  const getDeliveryDays = () => {
    let baseDays = Math.ceil(totalWordCount / 500); // 500 слов в день
    if (urgencyMultiplier > 1) {
      baseDays = Math.ceil(baseDays / urgencyMultiplier);
    }
    return Math.max(baseDays, 2); // минимум 2 дня
  };

  const handleApprove = () => {
    setIsApproved(true);
    onApprove();
  };

  const exportToPDF = () => {
    // Функция экспорта в PDF
    console.log('Экспорт сметы в PDF');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card className="border-2 border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 text-white rounded-lg">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Детальная смета</h2>
                <p className="text-sm text-gray-600 font-normal">Техническое задание и расчет стоимости</p>
              </div>
            </CardTitle>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={exportToPDF}>
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Предпросмотр
              </Button>
            </div>
          </div>
          
          {isApproved && (
            <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Смета одобрена клиентом</span>
              </div>
            </div>
          )}
        </CardHeader>
        
        <CardContent className="p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="keywords">Ключевые слова</TabsTrigger>
              <TabsTrigger value="structure">Структура</TabsTrigger>
              <TabsTrigger value="services">Услуги</TabsTrigger>
              <TabsTrigger value="pricing">Стоимость</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    Основные параметры
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-gray-600">Тип услуги:</span>
                      <Badge variant="default">{serviceType}</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Объем:</span>
                      <Badge variant="secondary">{totalWordCount.toLocaleString()} слов</Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Срок выполнения:</span>
                      <span className="font-medium flex items-center gap-1">
                        <Clock className="w-4 h-4 text-green-600" />
                        {getDeliveryDays()} дней
                      </span>
                    </div>
                    
                    {urgencyMultiplier > 1 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Срочность:</span>
                        <Badge variant="destructive">×{urgencyMultiplier}</Badge>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-600" />
                    Проект
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600 block mb-1">Описание задачи:</span>
                      <div className="text-sm bg-gray-50 p-3 rounded border max-h-32 overflow-y-auto">
                        {projectDetails}
                      </div>
                    </div>
                    
                    {targetAudience && (
                      <div>
                        <span className="text-gray-600 block mb-1">Целевая аудитория:</span>
                        <div className="text-sm bg-gray-50 p-2 rounded border">
                          {targetAudience}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="keywords" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                    <Search className="w-5 h-5 text-blue-600" />
                    Основные ключевые слова ({keywords.length})
                  </h3>
                  
                  <div className="space-y-2">
                    {keywords.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {keywords.map((keyword, index) => (
                          <Badge key={index} variant="default" className="text-sm">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">Ключевые слова не указаны</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                    <Hash className="w-5 h-5 text-purple-600" />
                    LSI ключевые слова ({lsiKeywords.length})
                  </h3>
                  
                  <div className="space-y-2">
                    {lsiKeywords.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {lsiKeywords.map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="text-sm">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">LSI ключи не указаны</p>
                    )}
                  </div>
                </div>
              </div>
              
              {competitorUrls.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-4">Анализ конкурентов</h3>
                  <div className="space-y-2">
                    {competitorUrls.map((url, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded border text-sm">
                        {url}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="structure" className="space-y-6">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                Структура контента
              </h3>
              
              <div className="space-y-3">
                {contentStructure.map((section, index) => (
                  <div key={section.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
                          {index + 1}
                        </span>
                        <div>
                          <h4 className="font-medium">{section.title}</h4>
                          <p className="text-sm text-gray-600">{section.type}</p>
                        </div>
                      </div>
                      
                      <Badge variant="outline" className="text-sm">
                        {section.wordCount} слов
                      </Badge>
                    </div>
                    
                    {section.content && (
                      <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {section.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Общий объем:</span>
                  <span className="text-xl font-bold text-blue-600">
                    {totalWordCount.toLocaleString()} слов
                  </span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="services" className="space-y-6">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-600" />
                Дополнительные услуги
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { key: 'seo-optimization', label: 'SEO оптимизация', price: Math.round(pricing.basePrice * 0.3) },
                  { key: 'competitor-analysis', label: 'Анализ конкурентов', price: 2000 },
                  { key: 'images', label: 'Подбор изображений', price: 1000 },
                  { key: 'infographics', label: 'Создание инфографики', price: 2500 },
                  { key: 'expert-quotes', label: 'Экспертные мнения', price: 1500 },
                  { key: 'statistics', label: 'Актуальная статистика', price: 800 }
                ].map((service) => (
                  <div key={service.key} className={`p-4 rounded-lg border-2 ${
                    additionalServices.includes(service.key)
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{service.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">+{service.price.toLocaleString()}₽</span>
                        {additionalServices.includes(service.key) && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  Детальный расчет стоимости
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Базовая стоимость ({totalWordCount.toLocaleString()} слов):</span>
                    <span className="font-medium">{pricing.basePrice.toLocaleString()}₽</span>
                  </div>
                  
                  {pricing.additionalCost > 0 && (
                    <div className="flex justify-between items-center">
                      <span>Дополнительные услуги:</span>
                      <span className="font-medium">+{pricing.additionalCost.toLocaleString()}₽</span>
                    </div>
                  )}
                  
                  {pricing.urgencyPrice > 0 && (
                    <div className="flex justify-between items-center">
                      <span>Доплата за срочность (×{urgencyMultiplier}):</span>
                      <span className="font-medium">+{pricing.urgencyPrice.toLocaleString()}₽</span>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center">
                    <span>Подытог:</span>
                    <span className="font-medium">{pricing.subtotal.toLocaleString()}₽</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>НДС (20%):</span>
                    <span className="font-medium">{pricing.tax.toLocaleString()}₽</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Итого к оплате:</span>
                    <span className="text-blue-600">{pricing.total.toLocaleString()}₽</span>
                  </div>
                  
                  <div className="text-sm text-gray-600 text-center">
                    Цена действительна в течение 7 дней
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Кнопки действий */}
          <Separator />
          
          <div className="flex gap-4 pt-4">
            <Button 
              variant="outline" 
              onClick={onEdit}
              className="flex-1"
            >
              <Edit className="w-4 h-4 mr-2" />
              Редактировать
            </Button>
            
            {!isApproved ? (
              <Button 
                onClick={handleApprove}
                variant="default"
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Одобрить смету
              </Button>
            ) : (
              <Button 
                onClick={onPayment}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Оплатить {pricing.total.toLocaleString()}₽
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}