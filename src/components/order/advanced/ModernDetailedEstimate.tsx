import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  Star,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import EstimateExportActions from './EstimateExportActions';

interface ModernDetailedEstimateProps {
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

interface PricingBreakdown {
  basePrice: number;
  additionalCost: number;
  urgencyPrice: number;
  subtotal: number;
  tax: number;
  total: number;
  savings?: number;
}

export default function ModernDetailedEstimate({
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
}: ModernDetailedEstimateProps) {
  const [isApproved, setIsApproved] = useState(false);
  const [currentTab, setCurrentTab] = useState('overview');
  const [isProcessing, setIsProcessing] = useState(false);

  const calculatePrice = (): PricingBreakdown => {
    let basePrice = 0;
    
    // Базовая цена по типу услуги
    const servicePrices: Record<string, number> = {
      'article': 2.8, // за слово
      'selling-text': 4.2,
      'social-posts': 3.1,
      'website-texts': 3.7,
      'other': 3.2
    };
    
    const pricePerWord = servicePrices[serviceType] || 3.2;
    basePrice = totalWordCount * pricePerWord;
    
    // Дополнительные услуги
    let additionalCost = 0;
    additionalServices.forEach(service => {
      switch (service) {
        case 'seo-optimization':
          additionalCost += Math.round(basePrice * 0.35);
          break;
        case 'competitor-analysis':
          additionalCost += 2500;
          break;
        case 'images':
          additionalCost += 1200;
          break;
        case 'infographics':
          additionalCost += 3000;
          break;
        case 'expert-quotes':
          additionalCost += 1800;
          break;
        case 'statistics':
          additionalCost += 1000;
          break;
      }
    });
    
    // Множитель срочности
    const urgencyPrice = urgencyMultiplier > 1 ? Math.round(basePrice * (urgencyMultiplier - 1)) : 0;
    
    const subtotal = basePrice + additionalCost + urgencyPrice;
    const tax = Math.round(subtotal * 0.2); // НДС 20%
    const total = subtotal + tax;
    
    // Скидка за комплексный заказ
    const savings = additionalServices.length >= 3 ? Math.round(total * 0.1) : 0;
    
    return {
      basePrice: Math.round(basePrice),
      additionalCost,
      urgencyPrice,
      subtotal: Math.round(subtotal),
      tax,
      total: Math.round(total - savings),
      savings
    };
  };

  const pricing = calculatePrice();
  
  const getDeliveryDays = () => {
    let baseDays = Math.ceil(totalWordCount / 600); // 600 слов в день
    if (urgencyMultiplier > 1) {
      baseDays = Math.ceil(baseDays / urgencyMultiplier);
    }
    return Math.max(baseDays, 2); // минимум 2 дня
  };

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      console.log('Approving estimate...');
      await new Promise(resolve => setTimeout(resolve, 1500)); // Имитация обработки
      setIsApproved(true);
      onApprove();
      toast({
        title: "Смета одобрена!",
        description: "Теперь вы можете перейти к оплате",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось одобрить смету. Попробуйте снова.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const exportToPDF = () => {
    console.log('Экспорт сметы в PDF');
    toast({
      title: "PDF генерируется",
      description: "Смета будет загружена через несколько секунд"
    });
  };

  const getServiceTypeDisplayName = (type: string) => {
    const names: Record<string, string> = {
      'article': 'SEO-статья',
      'selling-text': 'Продающий текст',
      'social-posts': 'Посты для соцсетей',
      'website-texts': 'Тексты для сайта',
      'other': 'Другая услуга'
    };
    return names[type] || type;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card className="border-2 border-primary/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <div className="p-3 bg-primary text-primary-foreground rounded-xl shadow-md">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Детальная смета проекта</h2>
                <p className="text-sm text-muted-foreground font-normal">Техническое задание и расчет стоимости</p>
              </div>
            </CardTitle>
            
            <EstimateExportActions 
              estimateData={{
                serviceType,
                totalWordCount,
                pricing
              }}
            />
          </div>
          
          {isApproved && (
            <Alert className="mt-4 border-green-300 bg-green-50">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertDescription className="text-green-800 font-medium">
                ✅ Смета одобрена клиентом. Готово к оплате!
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        
        <CardContent className="p-6">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-muted/50">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="keywords">Ключевые слова</TabsTrigger>
              <TabsTrigger value="structure">Структура</TabsTrigger>
              <TabsTrigger value="services">Услуги</TabsTrigger>
              <TabsTrigger value="pricing">Стоимость</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Target className="w-5 h-5 text-primary" />
                      Основные параметры
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Тип услуги:</span>
                      <Badge variant="default" className="font-medium">
                        {getServiceTypeDisplayName(serviceType)}
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Объем:</span>
                      <Badge variant="secondary" className="font-medium">
                        {totalWordCount.toLocaleString()} слов
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Срок выполнения:</span>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-green-600" />
                        <span className="font-medium">{getDeliveryDays()} дней</span>
                      </div>
                    </div>
                    
                    {urgencyMultiplier > 1 && (
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Срочность:</span>
                        <Badge variant="destructive">×{urgencyMultiplier} (ускоренная)</Badge>
                      </div>
                    )}

                    <Separator />
                    
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Общая стоимость:</span>
                      <span className="text-primary">{pricing.total.toLocaleString()}₽</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="w-5 h-5 text-green-600" />
                      Детали проекта
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <span className="text-muted-foreground block mb-2 font-medium">Описание задачи:</span>
                      <div className="text-sm bg-muted/50 p-3 rounded-lg border max-h-32 overflow-y-auto leading-relaxed">
                        {projectDetails}
                      </div>
                    </div>
                    
                    {targetAudience && (
                      <div>
                        <span className="text-muted-foreground block mb-2 font-medium">Целевая аудитория:</span>
                        <div className="text-sm bg-muted/50 p-3 rounded-lg border leading-relaxed">
                          {targetAudience}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>Профессиональный уровень</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        <span>Гарантия качества</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="keywords" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Search className="w-5 h-5 text-primary" />
                      Основные ключевые слова ({keywords.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {keywords.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {keywords.map((keyword, index) => (
                          <Badge key={index} variant="default" className="text-sm font-medium">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">Основные ключевые слова не указаны</p>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Hash className="w-5 h-5 text-purple-600" />
                      LSI ключевые слова ({lsiKeywords.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {lsiKeywords.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {lsiKeywords.map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="text-sm">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm">LSI ключи не указаны</p>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {competitorUrls.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Анализ конкурентов</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {competitorUrls.map((url, index) => (
                        <div key={index} className="p-3 bg-muted/50 rounded-lg border text-sm font-mono">
                          {url}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="structure" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="w-5 h-5 text-green-600" />
                    Структура контента ({contentStructure.length} разделов)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contentStructure.map((section, index) => (
                      <div key={section.id} className="border rounded-lg p-4 bg-muted/20">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="font-semibold">
                              {index + 1}
                            </Badge>
                            <div>
                              <h4 className="font-semibold">{section.title}</h4>
                              <p className="text-sm text-muted-foreground capitalize">{section.type}</p>
                            </div>
                          </div>
                          
                          <Badge variant="secondary" className="text-sm font-medium">
                            {section.wordCount} слов
                          </Badge>
                        </div>
                        
                        {section.content && (
                          <div className="mt-3 text-sm text-muted-foreground bg-background/60 p-3 rounded border-l-2 border-primary/30">
                            {section.content}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-lg">Общий объем:</span>
                      <span className="text-2xl font-bold text-primary">
                        {totalWordCount.toLocaleString()} слов
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Star className="w-5 h-5 text-amber-500" />
                    Дополнительные услуги
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { key: 'seo-optimization', label: 'SEO оптимизация', price: Math.round(pricing.basePrice * 0.35), desc: 'Оптимизация под поисковые системы' },
                      { key: 'competitor-analysis', label: 'Анализ конкурентов', price: 2500, desc: 'Исследование конкурентной среды' },
                      { key: 'images', label: 'Подбор изображений', price: 1200, desc: 'Качественные изображения для контента' },
                      { key: 'infographics', label: 'Создание инфографики', price: 3000, desc: 'Визуализация данных и процессов' },
                      { key: 'expert-quotes', label: 'Экспертные мнения', price: 1800, desc: 'Интервью с экспертами отрасли' },
                      { key: 'statistics', label: 'Актуальная статистика', price: 1000, desc: 'Свежие данные и исследования' }
                    ].map((service) => (
                      <div key={service.key} className={`p-4 rounded-lg border-2 transition-all ${
                        additionalServices.includes(service.key)
                          ? 'border-green-300 bg-green-50 shadow-sm' 
                          : 'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold">{service.label}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-sm">
                              +{service.price.toLocaleString()}₽
                            </Badge>
                            {additionalServices.includes(service.key) && (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{service.desc}</p>
                      </div>
                    ))}
                  </div>
                  
                  {additionalServices.length >= 3 && pricing.savings && pricing.savings > 0 && (
                    <Alert className="mt-4 border-green-300 bg-green-50">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        🎉 Скидка за комплексный заказ: -{pricing.savings.toLocaleString()}₽
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6">
              <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Детальный расчет стоимости
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2">
                      <span>Базовая стоимость ({totalWordCount.toLocaleString()} слов):</span>
                      <span className="font-semibold">{pricing.basePrice.toLocaleString()}₽</span>
                    </div>
                    
                    {pricing.additionalCost > 0 && (
                      <div className="flex justify-between items-center py-2">
                        <span>Дополнительные услуги:</span>
                        <span className="font-semibold">+{pricing.additionalCost.toLocaleString()}₽</span>
                      </div>
                    )}
                    
                    {pricing.urgencyPrice > 0 && (
                      <div className="flex justify-between items-center py-2">
                        <span>Доплата за срочность (×{urgencyMultiplier}):</span>
                        <span className="font-semibold">+{pricing.urgencyPrice.toLocaleString()}₽</span>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center py-2">
                      <span>Подытог:</span>
                      <span className="font-semibold">{pricing.subtotal.toLocaleString()}₽</span>
                    </div>
                    
                    {pricing.savings && pricing.savings > 0 && (
                      <div className="flex justify-between items-center py-2 text-green-600">
                        <span>Скидка за комплексный заказ:</span>
                        <span className="font-semibold">-{pricing.savings.toLocaleString()}₽</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center py-2">
                      <span>НДС (20%):</span>
                      <span className="font-semibold">{pricing.tax.toLocaleString()}₽</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center py-3 text-xl font-bold bg-primary/10 rounded-lg px-4">
                      <span>Итого к оплате:</span>
                      <span className="text-primary">{pricing.total.toLocaleString()}₽</span>
                    </div>
                    
                    <div className="text-sm text-muted-foreground text-center mt-4">
                      💰 Цена действительна в течение 7 дней | 🛡️ Гарантия возврата 100%
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Кнопки действий */}
          <Separator className="my-6" />
          
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={onEdit}
              className="flex-1"
              disabled={isProcessing}
            >
              <Edit className="w-4 h-4 mr-2" />
              Редактировать
            </Button>
            
            {!isApproved ? (
              <Button 
                onClick={handleApprove}
                variant="default"
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={isProcessing}
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Обработка...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Одобрить смету
                  </>
                )}
              </Button>
            ) : (
              <Button 
                onClick={onPayment}
                className="flex-1 bg-primary hover:bg-primary/90"
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