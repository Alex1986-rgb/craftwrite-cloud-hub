
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, User, Mail, Phone, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface UnifiedOrderFormProps {
  variant?: 'public' | 'client';
  serviceTitle?: string;
  selectedPackage?: string;
  onOrderCreated?: () => void;
  onSuccess?: () => void;
}

export default function UnifiedOrderForm({ 
  variant = 'public', 
  serviceTitle = '',
  selectedPackage = '',
  onOrderCreated,
  onSuccess 
}: UnifiedOrderFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: serviceTitle || selectedPackage || '',
    details: '',
    additionalRequirements: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    // Симуляция отправки заказа
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Заказ успешно создан! Мы свяжемся с вами в течение часа.');
    setLoading(false);
    onOrderCreated?.();
    onSuccess?.();
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone;
      case 2:
        return formData.service;
      case 3:
        return formData.details;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Контактная информация</h3>
            </div>
            <div>
              <Label htmlFor="name">Ваше имя *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Введите ваше имя"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Телефон *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+7 (999) 123-45-67"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Выберите услугу</h3>
            </div>
            {serviceTitle || selectedPackage ? (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-medium text-blue-900">Выбранная услуга:</p>
                <p className="text-blue-700">{serviceTitle || selectedPackage}</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {[
                  'SEO-статья',
                  'Лендинг',
                  'Email-рассылка',
                  'Контент для Telegram',
                  'Скрипты для чат-бота',
                  'Тексты для сайта',
                  'Посты для Instagram',
                  'Карточки Wildberries',
                  'Карточки Ozon',
                  'Скрипты для YouTube',
                  'Посты для LinkedIn'
                ].map((service) => (
                  <Card 
                    key={service}
                    className={`cursor-pointer transition-all ${
                      formData.service === service ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-200'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, service }))}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <span>{service}</span>
                      {formData.service === service && (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Детали заказа</h3>
            </div>
            <div>
              <Label htmlFor="details">Описание задачи *</Label>
              <Textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                placeholder="Опишите подробно, что вам нужно..."
                rows={5}
                required
              />
            </div>
            <div>
              <Label htmlFor="additionalRequirements">Дополнительные требования</Label>
              <Textarea
                id="additionalRequirements"
                name="additionalRequirements"
                value={formData.additionalRequirements}
                onChange={handleInputChange}
                placeholder="Особые пожелания, примеры, ссылки..."
                rows={3}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {serviceTitle ? `Заказ: ${serviceTitle}` : 'Оформление заказа'}
        </CardTitle>
        <div className="flex justify-center gap-2 mt-4">
          {[1, 2, 3].map((step) => (
            <Badge 
              key={step}
              variant={currentStep >= step ? "default" : "outline"}
              className={currentStep === step ? "bg-blue-600" : ""}
            >
              {step}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderStep()}
        
        <div className="flex justify-between">
          {currentStep > 1 && (
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(prev => prev - 1)}
            >
              Назад
            </Button>
          )}
          
          {currentStep < 3 ? (
            <Button 
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!isStepValid(currentStep)}
              className="ml-auto"
            >
              Далее
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={!isStepValid(currentStep) || loading}
              className="ml-auto"
            >
              {loading ? 'Отправка...' : 'Отправить заказ'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
