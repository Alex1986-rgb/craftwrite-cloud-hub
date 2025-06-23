
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Globe, FileText, Clock, Star } from 'lucide-react';
import { useEnhancedOrders } from '@/hooks/useEnhancedOrders';
import { toast } from 'sonner';

const websiteTypes = [
  { id: 'corporate', name: 'Корпоративный сайт', basePrice: 3000, description: 'О компании, услуги, контакты' },
  { id: 'ecommerce', name: 'Интернет-магазин', basePrice: 5000, description: 'Каталог, описания товаров, категории' },
  { id: 'landing', name: 'Лендинг', basePrice: 4000, description: 'Продающая посадочная страница' },
  { id: 'blog', name: 'Блог/Медиа', basePrice: 3500, description: 'Статьи, новости, контент-проект' },
  { id: 'portfolio', name: 'Портфолио', basePrice: 2500, description: 'Презентация работ и услуг' },
  { id: 'other', name: 'Другое', basePrice: 3000, description: 'Нестандартный проект' }
];

const additionalServices = [
  { id: 'seo', name: 'SEO-оптимизация', price: 1500, description: 'Включение ключевых слов и метатегов' },
  { id: 'competitor', name: 'Анализ конкурентов', price: 2000, description: 'Исследование 5 конкурентов' },
  { id: 'urgent', name: 'Срочное выполнение (1-2 дня)', price: 3000, description: 'Ускоренная подготовка' },
  { id: 'revisions', name: 'Расширенные правки', price: 1000, description: 'До 5 итераций правок' },
  { id: 'copywriting', name: 'Продающие тексты', price: 2500, description: 'Фокус на конверсию и продажи' }
];

const pageCountOptions = [
  { count: '1-3', multiplier: 1, label: '1-3 страницы' },
  { count: '4-7', multiplier: 1.5, label: '4-7 страниц' },
  { count: '8-15', multiplier: 2.2, label: '8-15 страниц' },
  { count: '16-30', multiplier: 3.5, label: '16-30 страниц' },
  { count: '30+', multiplier: 5, label: 'Более 30 страниц' }
];

export default function WebsiteTextsOrder() {
  const { createOrder, loading } = useEnhancedOrders();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Контактная информация
    name: '',
    email: '',
    phone: '',
    
    // Основные параметры проекта
    websiteType: '',
    pageCount: '',
    websiteUrl: '',
    businessDescription: '',
    targetAudience: '',
    
    // Детали проекта
    pagesList: '',
    keywords: '',
    competitorUrls: '',
    toneOfVoice: 'professional',
    specialRequirements: '',
    
    // Дополнительные услуги
    selectedServices: [] as string[],
    
    // Временные рамки
    deadline: 'standard'
  });

  const calculatePrice = () => {
    const selectedWebsiteType = websiteTypes.find(t => t.id === formData.websiteType);
    const selectedPageCount = pageCountOptions.find(p => p.count === formData.pageCount);
    
    if (!selectedWebsiteType || !selectedPageCount) return 0;
    
    let basePrice = selectedWebsiteType.basePrice * selectedPageCount.multiplier;
    
    // Добавляем стоимость дополнительных услуг
    const servicesPrice = formData.selectedServices.reduce((sum, serviceId) => {
      const service = additionalServices.find(s => s.id === serviceId);
      return sum + (service?.price || 0);
    }, 0);
    
    // Применяем множитель за срочность
    if (formData.deadline === 'urgent') {
      basePrice *= 1.5;
    } else if (formData.deadline === 'express') {
      basePrice *= 1.3;
    }
    
    return Math.round(basePrice + servicesPrice);
  };

  const getDeliveryTime = () => {
    const baseTime = formData.deadline === 'urgent' ? '1-2 дня' : 
                    formData.deadline === 'express' ? '3-4 дня' : '5-7 дней';
    return baseTime;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(serviceId)
        ? prev.selectedServices.filter(id => id !== serviceId)
        : [...prev.selectedServices, serviceId]
    }));
  };

  const handleSubmit = async () => {
    try {
      const selectedWebsiteType = websiteTypes.find(t => t.id === formData.websiteType);
      const selectedServices = additionalServices.filter(s => formData.selectedServices.includes(s.id));
      
      const orderData = {
        service_slug: 'website-texts',
        service_name: 'Тексты для сайта',
        contact_name: formData.name,
        contact_email: formData.email,
        contact_phone: formData.phone,
        details: `Тип сайта: ${selectedWebsiteType?.name}
Количество страниц: ${formData.pageCount}
URL сайта: ${formData.websiteUrl}
Описание бизнеса: ${formData.businessDescription}
Целевая аудитория: ${formData.targetAudience}
Список страниц: ${formData.pagesList}
Ключевые слова: ${formData.keywords}
Конкуренты: ${formData.competitorUrls}
Стиль текста: ${formData.toneOfVoice}`,
        additional_requirements: formData.specialRequirements,
        estimated_price: calculatePrice() * 100, // в копейках
        deadline: getDeliveryTime(),
        status: 'new',
        priority: formData.deadline === 'urgent' ? 'high' : 'medium',
        service_options: {
          websiteType: formData.websiteType,
          pageCount: formData.pageCount,
          selectedServices: selectedServices.map(s => s.name),
          toneOfVoice: formData.toneOfVoice,
          deadline: formData.deadline
        }
      };

      await createOrder(orderData);
      
      // Сброс формы
      setFormData({
        name: '', email: '', phone: '', websiteType: '', pageCount: '',
        websiteUrl: '', businessDescription: '', targetAudience: '', pagesList: '',
        keywords: '', competitorUrls: '', toneOfVoice: 'professional',
        specialRequirements: '', selectedServices: [], deadline: 'standard'
      });
      setCurrentStep(1);
      
    } catch (error) {
      console.error('Ошибка создания заказа:', error);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Контактная информация</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Ваше имя *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Введите ваше имя"
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+7 (999) 123-45-67"
            />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="your@email.com"
            required
          />
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Основные параметры проекта</h3>
        
        <div className="mb-6">
          <Label className="text-base font-medium">Тип сайта *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
            {websiteTypes.map((type) => (
              <Card 
                key={type.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  formData.websiteType === type.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => handleInputChange('websiteType', type.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{type.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                    </div>
                    <Badge variant="secondary">от {type.basePrice}₽</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <Label className="text-base font-medium">Количество страниц *</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
            {pageCountOptions.map((option) => (
              <Button
                key={option.count}
                variant={formData.pageCount === option.count ? "default" : "outline"}
                onClick={() => handleInputChange('pageCount', option.count)}
                className="h-auto p-3 text-left"
              >
                <div>
                  <div className="font-medium">{option.label}</div>
                  <div className="text-xs opacity-70">×{option.multiplier}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="websiteUrl">URL сайта (если есть)</Label>
            <Input
              id="websiteUrl"
              value={formData.websiteUrl}
              onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
              placeholder="https://example.com"
            />
          </div>
          <div>
            <Label htmlFor="targetAudience">Целевая аудитория</Label>
            <Input
              id="targetAudience"
              value={formData.targetAudience}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
              placeholder="Кто ваши клиенты?"
            />
          </div>
        </div>

        <div className="mt-4">
          <Label htmlFor="businessDescription">Описание бизнеса *</Label>
          <Textarea
            id="businessDescription"
            value={formData.businessDescription}
            onChange={(e) => handleInputChange('businessDescription', e.target.value)}
            placeholder="Расскажите о вашей компании, продуктах или услугах..."
            className="min-h-[120px]"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Детали проекта</h3>
        
        <div className="mb-4">
          <Label htmlFor="pagesList">Список страниц для написания</Label>
          <Textarea
            id="pagesList"
            value={formData.pagesList}
            onChange={(e) => handleInputChange('pagesList', e.target.value)}
            placeholder="Например: Главная, О компании, Услуги, Контакты..."
            className="min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="keywords">Ключевые слова</Label>
            <Textarea
              id="keywords"
              value={formData.keywords}
              onChange={(e) => handleInputChange('keywords', e.target.value)}
              placeholder="Введите ключевые слова через запятую"
              className="min-h-[80px]"
            />
          </div>
          <div>
            <Label htmlFor="competitorUrls">Сайты конкурентов</Label>
            <Textarea
              id="competitorUrls"
              value={formData.competitorUrls}
              onChange={(e) => handleInputChange('competitorUrls', e.target.value)}
              placeholder="URL конкурентов для анализа"
              className="min-h-[80px]"
            />
          </div>
        </div>

        <div className="mb-4">
          <Label className="text-base font-medium">Стиль текста</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
            {[
              { id: 'professional', name: 'Деловой' },
              { id: 'friendly', name: 'Дружелюбный' },
              { id: 'creative', name: 'Креативный' },
              { id: 'technical', name: 'Технический' }
            ].map((style) => (
              <Button
                key={style.id}
                variant={formData.toneOfVoice === style.id ? "default" : "outline"}
                onClick={() => handleInputChange('toneOfVoice', style.id)}
              >
                {style.name}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="specialRequirements">Особые требования</Label>
          <Textarea
            id="specialRequirements"
            value={formData.specialRequirements}
            onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
            placeholder="Дополнительные пожелания к текстам..."
            className="min-h-[100px]"
          />
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Дополнительные услуги</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {additionalServices.map((service) => (
            <Card 
              key={service.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                formData.selectedServices.includes(service.id) ? 'ring-2 ring-green-500 bg-green-50' : ''
              }`}
              onClick={() => handleServiceToggle(service.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2">
                    {formData.selectedServices.includes(service.id) && (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-medium">{service.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">+{service.price}₽</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Сроки выполнения</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { id: 'standard', name: 'Стандартные сроки', time: '5-7 дней', multiplier: 1 },
            { id: 'express', name: 'Ускоренно', time: '3-4 дня', multiplier: 1.3 },
            { id: 'urgent', name: 'Срочно', time: '1-2 дня', multiplier: 1.5 }
          ].map((deadline) => (
            <Card 
              key={deadline.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                formData.deadline === deadline.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => handleInputChange('deadline', deadline.id)}
            >
              <CardContent className="p-4 text-center">
                <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <h4 className="font-medium">{deadline.name}</h4>
                <p className="text-sm text-gray-600">{deadline.time}</p>
                {deadline.multiplier > 1 && (
                  <Badge variant="outline" className="mt-2">
                    +{Math.round((deadline.multiplier - 1) * 100)}%
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => {
    const estimatedPrice = calculatePrice();
    const deliveryTime = getDeliveryTime();
    const selectedWebsiteType = websiteTypes.find(t => t.id === formData.websiteType);
    const selectedServices = additionalServices.filter(s => formData.selectedServices.includes(s.id));

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Итоговая стоимость</h3>
          <div className="text-4xl font-bold text-blue-600 mb-2">{estimatedPrice.toLocaleString()}₽</div>
          <p className="text-gray-600">Срок выполнения: {deliveryTime}</p>
        </div>

        <Separator />

        <div>
          <h4 className="font-semibold mb-3">Детали заказа:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Тип сайта:</span>
              <span className="font-medium">{selectedWebsiteType?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Количество страниц:</span>
              <span className="font-medium">{formData.pageCount} страниц</span>
            </div>
            <div className="flex justify-between">
              <span>Стиль текста:</span>
              <span className="font-medium">{
                formData.toneOfVoice === 'professional' ? 'Деловой' :
                formData.toneOfVoice === 'friendly' ? 'Дружелюбный' :
                formData.toneOfVoice === 'creative' ? 'Креативный' : 'Технический'
              }</span>
            </div>
            {selectedServices.length > 0 && (
              <div>
                <span>Дополнительные услуги:</span>
                <ul className="mt-1 ml-4">
                  {selectedServices.map(service => (
                    <li key={service.id} className="flex justify-between">
                      <span>• {service.name}</span>
                      <span>+{service.price}₽</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-semibold mb-3">Контактная информация:</h4>
          <div className="space-y-1 text-sm">
            <p><strong>Имя:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            {formData.phone && <p><strong>Телефон:</strong> {formData.phone}</p>}
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <Star className="w-5 h-5 text-blue-500 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900">Что входит в услугу:</p>
              <ul className="mt-2 space-y-1 text-blue-800">
                <li>• Уникальные тексты для всех страниц</li>
                <li>• SEO-оптимизация под ключевые слова</li>
                <li>• Проверка на уникальность</li>
                <li>• Бесплатные правки в течение 7 дней</li>
                <li>• Техническое задание и отчет</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const canProceedToNext = () => {
    if (currentStep === 1) {
      return formData.name && formData.email && formData.websiteType && 
             formData.pageCount && formData.businessDescription;
    }
    return true;
  };

  const canSubmit = () => {
    return formData.name && formData.email && formData.websiteType && 
           formData.pageCount && formData.businessDescription;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Globe className="w-8 h-8 text-blue-500 mr-3" />
              <h1 className="text-3xl font-bold">Заказ текстов для сайта</h1>
            </div>
            <p className="text-gray-600">Профессиональные тексты для вашего веб-проекта</p>
          </div>

          {/* Индикатор шагов */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === currentStep ? 'bg-blue-500 text-white' :
                  step < currentStep ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Основной контент */}
          <Card>
            <CardHeader>
              <CardTitle>
                {currentStep === 1 && 'Шаг 1: Основная информация'}
                {currentStep === 2 && 'Шаг 2: Детали проекта'}
                {currentStep === 3 && 'Шаг 3: Подтверждение заказа'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              {/* Навигация */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {currentStep > 1 ? (
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Назад
                  </Button>
                ) : <div />}

                {currentStep < 3 ? (
                  <Button 
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!canProceedToNext()}
                  >
                    Далее
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    disabled={!canSubmit() || loading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {loading ? 'Отправка...' : 'Оформить заказ'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Информационный блок */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Качественные тексты</h3>
                <p className="text-sm text-gray-600">Уникальный контент от профессиональных копирайтеров</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Быстрые сроки</h3>
                <p className="text-sm text-gray-600">От 1 дня до недели в зависимости от объема</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Гарантия качества</h3>
                <p className="text-sm text-gray-600">Бесплатные правки в течение 7 дней</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
