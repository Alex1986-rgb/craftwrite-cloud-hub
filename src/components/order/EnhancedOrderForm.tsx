
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Calculator, 
  Clock, 
  Zap,
  FileText,
  User,
  CreditCard
} from 'lucide-react';
import { ALL_SERVICES } from '@/data/allServices';
import { EXTENDED_SERVICE_QUESTIONS } from '@/data/extendedServiceQuestions';
import { useSupabaseOrders } from '@/hooks/useSupabaseOrders';
import { useUnifiedAuth } from '@/contexts/UnifiedAuthContext';
import { toast } from 'sonner';

interface FormData {
  // Контактная информация
  name: string;
  email: string;
  phone: string;
  
  // Детали заказа
  details: string;
  additionalRequirements: string;
  deadline: string;
  
  // Специфичные для сервиса вопросы
  serviceAnswers: Record<string, any>;
}

export default function EnhancedOrderForm() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { user } = useUnifiedAuth();
  const { createOrder, loading } = useSupabaseOrders();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    details: '',
    additionalRequirements: '',
    deadline: 'standard',
    serviceAnswers: {}
  });
  
  const service = ALL_SERVICES.find(s => s.slug === serviceId);
  const serviceQuestions = EXTENDED_SERVICE_QUESTIONS[serviceId || ''] || [];
  
  const totalSteps = serviceQuestions.length > 0 ? 4 : 3;
  const progress = (currentStep / totalSteps) * 100;

  // Предзаполняем данные пользователя
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [user]);

  if (!service) {
    return (
      <div className="max-w-2xl mx-auto py-24 text-center">
        <h2 className="text-2xl font-bold mb-3">Услуга не найдена</h2>
        <p className="text-gray-600 mb-6">Проверьте правильность ссылки</p>
        <Button onClick={() => navigate('/services')}>
          К каталогу услуг
        </Button>
      </div>
    );
  }

  const calculatePrice = () => {
    let basePrice = service.price.min;
    let additionalCost = 0;

    // Добавляем стоимость дополнительных опций
    Object.entries(formData.serviceAnswers).forEach(([key, value]) => {
      const question = serviceQuestions.find(q => q.id === key);
      if (question?.type === 'checkbox' && value) {
        // Извлекаем цену из описания (например, "+2000₽")
        const priceMatch = question.description?.match(/\+(\d+)₽/);
        if (priceMatch) {
          additionalCost += parseInt(priceMatch[1]);
        }
      }
    });

    // Коэффициент срочности
    const urgencyMultiplier = formData.deadline === 'urgent' ? 1.5 : formData.deadline === 'express' ? 2 : 1;
    
    return Math.round((basePrice + additionalCost) * urgencyMultiplier);
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceAnswerChange = (questionId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      serviceAnswers: {
        ...prev.serviceAnswers,
        [questionId]: value
      }
    }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone && formData.details;
      case 2:
        return formData.deadline;
      case 3:
        if (serviceQuestions.length === 0) return true;
        const requiredQuestions = serviceQuestions.filter(q => q.required);
        return requiredQuestions.every(q => formData.serviceAnswers[q.id]);
      case 4:
        return true; // Страница подтверждения
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    const orderData = {
      service_slug: service.slug,
      service_name: service.name,
      contact_name: formData.name,
      contact_email: formData.email,
      contact_phone: formData.phone,
      details: formData.details,
      additional_requirements: formData.additionalRequirements,
      estimated_price: calculatePrice(),
      deadline: formData.deadline === 'standard' ? undefined : formData.deadline,
      service_options: formData.serviceAnswers
    };

    const success = await createOrder(orderData);
    if (success) {
      toast.success('Заказ создан!', {
        description: 'Переходим к оплате...'
      });
      
      setTimeout(() => {
        navigate('/client');
      }, 2000);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Контакты и детали заказа</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Ваше им

я*</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Введите имя"
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон*</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <Label htmlFor="details">Подробное описание задачи*</Label>
              <Textarea
                id="details"
                value={formData.details}
                onChange={(e) => handleInputChange('details', e.target.value)}
                placeholder="Опишите детально, что вам нужно..."
                rows={5}
              />
            </div>
            
            <div>
              <Label htmlFor="additional">Дополнительные требования</Label>
              <Textarea
                id="additional"
                value={formData.additionalRequirements}
                onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
                placeholder="Особые пожелания, примеры, ссылки..."
                rows={3}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Сроки выполнения</h3>
            </div>
            
            <div className="grid gap-4">
              {[
                { 
                  value: 'standard', 
                  label: 'Стандартные сроки', 
                  desc: `${service.deliveryTime.min}-${service.deliveryTime.max} ${service.deliveryTime.unit}`,
                  multiplier: '×1'
                },
                { 
                  value: 'urgent', 
                  label: 'Срочно', 
                  desc: 'В 2 раза быстрее',
                  multiplier: '×1.5'
                },
                { 
                  value: 'express', 
                  label: 'Экспресс', 
                  desc: 'Максимально быстро (1-2 дня)',
                  multiplier: '×2'
                }
              ].map((option) => (
                <Card 
                  key={option.value}
                  className={`cursor-pointer transition-all ${
                    formData.deadline === option.value ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-200'
                  }`}
                  onClick={() => handleInputChange('deadline', option.value)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{option.multiplier}</Badge>
                      {formData.deadline === option.value && (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        if (serviceQuestions.length === 0) {
          // Если нет специфичных вопросов, переходим к подтверждению
          setCurrentStep(4);
          return null;
        }
        
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Детали для {service.name}</h3>
            </div>
            
            {serviceQuestions.map((question) => (
              <div key={question.id} className="space-y-2">
                <Label>
                  {question.label}
                  {question.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                
                {question.description && (
                  <p className="text-sm text-gray-600">{question.description}</p>
                )}
                
                {question.type === 'text' && (
                  <Input
                    value={formData.serviceAnswers[question.id] || ''}
                    onChange={(e) => handleServiceAnswerChange(question.id, e.target.value)}
                    placeholder={question.placeholder}
                  />
                )}
                
                {question.type === 'textarea' && (
                  <Textarea
                    value={formData.serviceAnswers[question.id] || ''}
                    onChange={(e) => handleServiceAnswerChange(question.id, e.target.value)}
                    placeholder={question.placeholder}
                    rows={3}
                  />
                )}
                
                {question.type === 'select' && (
                  <Select
                    value={formData.serviceAnswers[question.id] || ''}
                    onValueChange={(value) => handleServiceAnswerChange(question.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите опцию" />
                    </SelectTrigger>
                    <SelectContent>
                      {question.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                
                {question.type === 'checkbox' && (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={question.id}
                      checked={formData.serviceAnswers[question.id] || false}
                      onCheckedChange={(checked) => handleServiceAnswerChange(question.id, checked)}
                    />
                    <Label htmlFor={question.id} className="text-sm">
                      {question.description}
                    </Label>
                  </div>
                )}
                
                {question.type === 'number' && (
                  <Input
                    type="number"
                    value={formData.serviceAnswers[question.id] || ''}
                    onChange={(e) => handleServiceAnswerChange(question.id, parseInt(e.target.value))}
                    placeholder={question.placeholder}
                    min={question.validation?.min}
                    max={question.validation?.max}
                  />
                )}
              </div>
            ))}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Подтверждение заказа</h3>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{service.name}</span>
                  <Badge>{service.difficulty}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Клиент:</h4>
                  <p>{formData.name} ({formData.email})</p>
                  <p>{formData.phone}</p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold mb-2">Описание задачи:</h4>
                  <p className="text-gray-700">{formData.details}</p>
                </div>
                
                {formData.additionalRequirements && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-semibold mb-2">Дополнительные требования:</h4>
                      <p className="text-gray-700">{formData.additionalRequirements}</p>
                    </div>
                  </>
                )}
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Итоговая стоимость:</h4>
                    <p className="text-sm text-gray-600">
                      Сроки: {formData.deadline === 'standard' ? 'Стандартные' : 
                              formData.deadline === 'urgent' ? 'Срочно' : 'Экспресс'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {calculatePrice().toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Хлебные крошки */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span>Услуги</span>
        <span>/</span>
        <span>{service.name}</span>
        <span>/</span>
        <span>Заказ</span>
      </div>

      {/* Заголовок и прогресс */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Заказ: {service.name}</h1>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Шаг {currentStep} из {totalSteps}</span>
            <span>{Math.round(progress)}% завершено</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Основной контент */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Форма */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              {renderStep()}
            </CardContent>
          </Card>
        </div>

        {/* Боковая панель */}
        <div className="space-y-6">
          {/* Калькулятор цены */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Стоимость
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Базовая стоимость:</span>
                  <span>{service.price.min.toLocaleString('ru-RU')} ₽</span>
                </div>
                
                {formData.deadline !== 'standard' && (
                  <div className="flex justify-between text-sm">
                    <span>Срочность:</span>
                    <span>×{formData.deadline === 'urgent' ? '1.5' : '2'}</span>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between font-bold">
                  <span>Итого:</span>
                  <span className="text-green-600">
                    {calculatePrice().toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Информация об услуге */}
          <Card>
            <CardHeader>
              <CardTitle>Что входит</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {service.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Кнопки навигации */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>

        {currentStep < totalSteps ? (
          <Button
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={!validateStep(currentStep)}
          >
            Далее
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={loading || !validateStep(currentStep)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            {loading ? (
              'Создание заказа...'
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Создать заказ
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
