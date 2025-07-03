import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Check, Star, Clock, Users } from 'lucide-react';

interface LandingPackage {
  id: string;
  package_type: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  included_revisions: number;
  delivery_days: number;
}

interface FormData {
  package_type: string;
  business_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  website_url: string;
  target_audience: string;
  business_goals: string;
  landing_requirements: {
    main_goal: string;
    target_actions: string[];
    competitors: string;
    brand_guidelines: string;
    content_ready: boolean;
  };
  design_preferences: {
    style: string;
    colors: string;
    examples: string;
  };
  timeline_requirements: string;
  additional_notes: string;
}

export default function LandingOrderForm() {
  const [packages, setPackages] = useState<LandingPackage[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    package_type: '',
    business_name: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    website_url: '',
    target_audience: '',
    business_goals: '',
    landing_requirements: {
      main_goal: '',
      target_actions: [],
      competitors: '',
      brand_guidelines: '',
      content_ready: false,
    },
    design_preferences: {
      style: '',
      colors: '',
      examples: '',
    },
    timeline_requirements: '',
    additional_notes: '',
  });

  const { toast } = useToast();

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      const { data, error } = await supabase
        .from('landing_packages')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;
      setPackages(data || []);
    } catch (error) {
      console.error('Error loading packages:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить пакеты услуг',
        variant: 'destructive',
      });
    }
  };

  const handlePackageSelect = (packageType: string) => {
    setSelectedPackage(packageType);
    setFormData(prev => ({ ...prev, package_type: packageType }));
    setCurrentStep(2);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedInputChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof FormData] as any),
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const selectedPkg = packages.find(pkg => pkg.package_type === selectedPackage);
      if (!selectedPkg) throw new Error('Пакет не найден');

      const orderData = {
        service_name: `${selectedPkg.name} - Landing Page`,
        service_slug: 'landing-page',
        project_type: 'landing-page',
        package_type: selectedPackage,
        contact_name: formData.contact_name,
        contact_email: formData.contact_email,
        contact_phone: formData.contact_phone,
        details: `Создание лендинга для ${formData.business_name}. Цель: ${formData.landing_requirements.main_goal}`,
        target_audience: formData.target_audience,
        business_goals: formData.business_goals,
        landing_requirements: formData.landing_requirements,
        design_preferences: formData.design_preferences,
        timeline_requirements: formData.timeline_requirements,
        additional_requirements: formData.additional_notes,
        estimated_price: selectedPkg.price,
        status: 'pending',
        revision_limit: selectedPkg.included_revisions,
        delivery_date: new Date(Date.now() + selectedPkg.delivery_days * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      };

      const { data: order, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (error) throw error;

      // Create payment intent
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-payment', {
        body: {
          order_id: order.id,
          amount: selectedPkg.price,
          currency: 'RUB',
          description: `Оплата за ${selectedPkg.name}`,
        },
      });

      if (paymentError) throw paymentError;

      toast({
        title: 'Заказ создан!',
        description: 'Переходим к оплате...',
      });

      // Redirect to payment
      if (paymentData?.payment_url) {
        window.open(paymentData.payment_url, '_blank');
      }

      setCurrentStep(4);
    } catch (error: any) {
      console.error('Error creating order:', error);
      toast({
        title: 'Ошибка',
        description: error.message || 'Не удалось создать заказ',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderPackageSelection = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Выберите пакет лендинга</h2>
        <p className="text-muted-foreground">Подберите подходящий тариф для вашего проекта</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card 
            key={pkg.id} 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              pkg.package_type === 'selling' ? 'border-primary ring-2 ring-primary/20' : ''
            }`}
            onClick={() => handlePackageSelect(pkg.package_type)}
          >
            <CardHeader className="text-center">
              {pkg.package_type === 'selling' && (
                <div className="flex justify-center mb-2">
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    Популярный
                  </span>
                </div>
              )}
              <CardTitle className="text-xl">{pkg.name}</CardTitle>
              <div className="text-3xl font-bold">
                {(pkg.price / 100).toLocaleString()} ₽
              </div>
              <p className="text-sm text-muted-foreground">{pkg.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {pkg.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {pkg.delivery_days} дней
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {pkg.included_revisions} правки
                </div>
              </div>

              <Button className="w-full" variant={pkg.package_type === 'selling' ? 'default' : 'outline'}>
                Выбрать пакет
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContactForm = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Контактная информация</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="business_name">Название компании/проекта *</Label>
          <Input
            id="business_name"
            value={formData.business_name}
            onChange={(e) => handleInputChange('business_name', e.target.value)}
            placeholder="ООО Инновации"
          />
        </div>
        
        <div>
          <Label htmlFor="contact_name">Контактное лицо *</Label>
          <Input
            id="contact_name"
            value={formData.contact_name}
            onChange={(e) => handleInputChange('contact_name', e.target.value)}
            placeholder="Иван Иванов"
          />
        </div>
        
        <div>
          <Label htmlFor="contact_email">Email *</Label>
          <Input
            id="contact_email"
            type="email"
            value={formData.contact_email}
            onChange={(e) => handleInputChange('contact_email', e.target.value)}
            placeholder="ivan@company.com"
          />
        </div>
        
        <div>
          <Label htmlFor="contact_phone">Телефон *</Label>
          <Input
            id="contact_phone"
            value={formData.contact_phone}
            onChange={(e) => handleInputChange('contact_phone', e.target.value)}
            placeholder="+7 (999) 123-45-67"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="website_url">Текущий сайт (если есть)</Label>
        <Input
          id="website_url"
          value={formData.website_url}
          onChange={(e) => handleInputChange('website_url', e.target.value)}
          placeholder="https://mycompany.com"
        />
      </div>

      <div className="flex gap-4">
        <Button onClick={() => setCurrentStep(1)} variant="outline">
          Назад
        </Button>
        <Button 
          onClick={() => setCurrentStep(3)}
          disabled={!formData.business_name || !formData.contact_name || !formData.contact_email || !formData.contact_phone}
        >
          Далее
        </Button>
      </div>
    </div>
  );

  const renderProjectDetails = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Детали проекта</h2>
      
      <div>
        <Label htmlFor="target_audience">Целевая аудитория *</Label>
        <Textarea
          id="target_audience"
          value={formData.target_audience}
          onChange={(e) => handleInputChange('target_audience', e.target.value)}
          placeholder="Опишите вашу целевую аудиторию: возраст, интересы, проблемы..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="business_goals">Бизнес-цели *</Label>
        <Textarea
          id="business_goals"
          value={formData.business_goals}
          onChange={(e) => handleInputChange('business_goals', e.target.value)}
          placeholder="Что вы хотите достичь с помощью лендинга? Увеличить продажи, собрать контакты, запустить новый продукт..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="main_goal">Главная цель лендинга *</Label>
        <Input
          id="main_goal"
          value={formData.landing_requirements.main_goal}
          onChange={(e) => handleNestedInputChange('landing_requirements', 'main_goal', e.target.value)}
          placeholder="Продажа курса, сбор заявок, регистрация на вебинар..."
        />
      </div>

      <div>
        <Label htmlFor="competitors">Конкуренты (примеры сайтов)</Label>
        <Textarea
          id="competitors"
          value={formData.landing_requirements.competitors}
          onChange={(e) => handleNestedInputChange('landing_requirements', 'competitors', e.target.value)}
          placeholder="Укажите ссылки на сайты конкурентов или примеры, которые вам нравятся"
          rows={2}
        />
      </div>

      <div>
        <Label htmlFor="design_style">Стиль дизайна</Label>
        <Input
          id="design_style"
          value={formData.design_preferences.style}
          onChange={(e) => handleNestedInputChange('design_preferences', 'style', e.target.value)}
          placeholder="Минимализм, корпоративный, яркий, современный..."
        />
      </div>

      <div>
        <Label htmlFor="colors">Предпочтения по цветам</Label>
        <Input
          id="colors"
          value={formData.design_preferences.colors}
          onChange={(e) => handleNestedInputChange('design_preferences', 'colors', e.target.value)}
          placeholder="Синий, зеленый, корпоративные цвета бренда..."
        />
      </div>

      <div>
        <Label htmlFor="timeline">Желаемые сроки</Label>
        <Input
          id="timeline"
          value={formData.timeline_requirements}
          onChange={(e) => handleInputChange('timeline_requirements', e.target.value)}
          placeholder="Нужно срочно, в течение недели, к конкретной дате..."
        />
      </div>

      <div>
        <Label htmlFor="additional_notes">Дополнительные пожелания</Label>
        <Textarea
          id="additional_notes"
          value={formData.additional_notes}
          onChange={(e) => handleInputChange('additional_notes', e.target.value)}
          placeholder="Любые дополнительные требования или пожелания..."
          rows={3}
        />
      </div>

      <div className="flex gap-4">
        <Button onClick={() => setCurrentStep(2)} variant="outline">
          Назад
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={loading || !formData.target_audience || !formData.business_goals || !formData.landing_requirements.main_goal}
        >
          {loading ? 'Создание заказа...' : 'Создать заказ и перейти к оплате'}
        </Button>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <Check className="w-8 h-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold">Заказ успешно создан!</h2>
      <p className="text-muted-foreground">
        Ваш заказ принят в работу. Мы свяжемся с вами в течение 2 часов для уточнения деталей.
      </p>
      <Button onClick={() => window.location.href = '/'}>
        Вернуться на главную
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= currentStep
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step < currentStep ? <Check className="w-4 h-4" /> : step}
                  </div>
                ))}
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Step content */}
            {currentStep === 1 && renderPackageSelection()}
            {currentStep === 2 && renderContactForm()}
            {currentStep === 3 && renderProjectDetails()}
            {currentStep === 4 && renderSuccess()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}