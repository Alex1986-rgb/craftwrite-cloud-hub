
import { useState, useMemo } from 'react';
import { ArrowLeft, Target, Settings, FileText, Users, List, Table, Image, HelpCircle, Search, Mail, MessageSquare, Globe } from 'lucide-react';
import { OrderFormData, PaymentMethod } from '@/types/advancedOrder';
import { Service } from '@/data/types/service';
import { COMMON_FILTERS, getServiceSpecificFilters } from '@/data/orderFiltersConfig';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FilterGroupCard from './FilterGroupCard';
import LivePriceCalculator from './LivePriceCalculator';
import ExpertTipsPanel from './ExpertTipsPanel';
import OrderThankYou from '../OrderThankYou';
import IntegratedPaymentForm from './IntegratedPaymentForm';

interface AdvancedOrderSystemProps {
  selectedService: Service;
  onClose?: () => void;
  className?: string;
}

const getServiceIcon = (serviceSlug: string) => {
  switch (serviceSlug) {
    case 'seo-article': return Search;
    case 'landing-page': return Target;
    case 'email-campaigns': return Mail;
    case 'telegram-content': return MessageSquare;
    default: return Globe;
  }
};

export default function AdvancedOrderSystem({ 
  selectedService, 
  onClose,
  className 
}: AdvancedOrderSystemProps) {
  const [currentStep, setCurrentStep] = useState<'configure' | 'payment' | 'success'>('configure');
  const [orderData, setOrderData] = useState<OrderFormData>({
    serviceSlug: selectedService.slug,
    serviceName: selectedService.name,
    filters: {},
    answers: {},
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      company: ''
    },
    pricing: {
      basePrice: selectedService.price.min,
      additionalCosts: {},
      totalPrice: selectedService.price.min,
      currency: selectedService.price.currency
    },
    timeline: {
      estimatedDays: selectedService.deliveryTime.min,
      priority: 'standard'
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const serviceSpecificFilters = useMemo(() => {
    return selectedService ? getServiceSpecificFilters(selectedService.slug) : [];
  }, [selectedService]);

  const ServiceIcon = getServiceIcon(selectedService.slug);

  // Группируем фильтры по логическим категориям
  const filterGroups = useMemo(() => {
    const basicFilters = COMMON_FILTERS.filter(f => 
      ['word_count', 'tone_style'].includes(f.id)
    );
    
    const audienceFilters = COMMON_FILTERS.filter(f => 
      ['target_audience'].includes(f.id)
    );
    
    const structureFilters = COMMON_FILTERS.filter(f => 
      ['content_structure', 'content_questions'].includes(f.id)
    );
    
    const visualFilters = COMMON_FILTERS.filter(f => 
      ['add_tables', 'add_icons'].includes(f.id)
    );
    
    const seoFilters = COMMON_FILTERS.filter(f => 
      ['keywords'].includes(f.id)
    );

    return [
      {
        id: 'basic',
        title: 'Основные параметры',
        description: 'Базовые настройки текста',
        icon: Settings,
        filters: basicFilters,
        defaultOpen: true
      },
      {
        id: 'audience', 
        title: 'Целевая аудитория',
        description: 'Для кого создается контент',
        icon: Users,
        filters: audienceFilters,
        defaultOpen: false
      },
      {
        id: 'structure',
        title: 'Структура контента',
        description: 'Организация и подача информации',
        icon: List,
        filters: structureFilters,
        defaultOpen: false
      },
      {
        id: 'visual',
        title: 'Визуальные элементы',
        description: 'Таблицы, иконки и оформление',
        icon: Table,
        filters: visualFilters,
        defaultOpen: false
      },
      {
        id: 'seo',
        title: 'SEO-оптимизация',
        description: 'Ключевые слова и поисковая оптимизация',
        icon: Search,
        filters: seoFilters,
        defaultOpen: false
      }
    ];
  }, []);

  const updateFilters = (filterId: string, value: any) => {
    setOrderData(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        [filterId]: value
      }
    }));
  };

  const updatePersonalInfo = (info: Partial<OrderFormData['personalInfo']>) => {
    setOrderData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...info
      }
    }));
  };

  const handleOrderNow = () => {
    const configuredFilters = Object.values({...orderData.filters, ...orderData.answers}).filter(value => 
      value !== undefined && value !== null && value !== '' && 
      (!Array.isArray(value) || value.length > 0)
    ).length;
    
    const totalPossible = filterGroups.reduce((acc, group) => acc + group.filters.length, 0) + serviceSpecificFilters.length;
    const configScore = Math.round((configuredFilters / Math.max(totalPossible, 1)) * 100);
    
    if (configScore < 50) {
      toast({
        title: "Недостаточно настроек",
        description: "Заполните минимум 50% параметров для оформления заказа",
        variant: "destructive"
      });
      return;
    }
    
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = async (paymentMethod: PaymentMethod) => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting order:', { orderData, paymentMethod });
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Заказ успешно создан!",
        description: "Оплата произведена успешно",
      });

      setCurrentStep('success');
      
    } catch (error) {
      toast({
        title: "Ошибка создания заказа",
        description: "Попробуйте еще раз или свяжитесь с поддержкой",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (currentStep === 'success') {
    return (
      <div className={`max-w-4xl mx-auto ${className}`}>
        <OrderThankYou orderData={orderData} />
      </div>
    );
  }

  if (currentStep === 'payment') {
    return (
      <div className={`max-w-4xl mx-auto ${className}`}>
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => setCurrentStep('configure')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад к настройкам
              </Button>
              <div className="flex items-center gap-2">
                <ServiceIcon className="w-5 h-5 text-blue-600" />
                <span className="font-medium">{selectedService.name}</span>
              </div>
            </div>
          </CardHeader>
        </Card>
        
        <IntegratedPaymentForm
          orderData={orderData}
          onPersonalInfoChange={updatePersonalInfo}
          onSubmit={handlePaymentSubmit}
          isLoading={isSubmitting}
        />
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto ${className}`}>
      {/* Заголовок страницы */}
      <Card className="mb-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-none shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl">
                <ServiceIcon className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{selectedService.name}</h1>
                <p className="text-gray-600 text-lg">Настройте все параметры для идеального результата</p>
              </div>
            </div>
            {onClose && (
              <Button variant="outline" onClick={onClose} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                К каталогу
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Основное содержимое - настройки */}
        <div className="lg:col-span-2 space-y-6">
          {/* Группы фильтров */}
          {filterGroups.map(group => (
            <FilterGroupCard
              key={group.id}
              title={group.title}
              description={group.description}
              icon={group.icon}
              filters={group.filters}
              values={orderData.filters}
              onValueChange={updateFilters}
              defaultOpen={group.defaultOpen}
            />
          ))}

          {/* Специфичные настройки для услуги */}
          {serviceSpecificFilters.length > 0 && (
            <FilterGroupCard
              title={`Специальные настройки для ${selectedService.name}`}
              description="Дополнительные параметры для данного типа контента"
              icon={ServiceIcon}
              filters={serviceSpecificFilters}
              values={orderData.filters}
              onValueChange={updateFilters}
              defaultOpen={false}
            />
          )}
        </div>

        {/* Боковая панель */}
        <div className="space-y-6">
          {/* Калькулятор цены */}
          <LivePriceCalculator
            selectedService={selectedService}
            filters={orderData.filters}
            answers={orderData.answers}
            onOrderNow={handleOrderNow}
          />

          {/* Советы экспертов */}
          <ExpertTipsPanel selectedService={selectedService} />
        </div>
      </div>
    </div>
  );
}
