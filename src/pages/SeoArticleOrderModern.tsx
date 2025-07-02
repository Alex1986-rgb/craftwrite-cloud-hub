import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ComprehensiveSeo from '@/components/seo/ComprehensiveSeo';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Loader2, DollarSign, Sparkles } from 'lucide-react';
import PaymentStep from '@/components/order/form-steps/PaymentStep';
import SeoArticleContactStep from '@/components/order/seo-article/SeoArticleContactStep';
import ModernSeoArticleBasicInfoStep from '@/components/order/seo-article/ModernSeoArticleBasicInfoStep';
import SeoArticleOptionsStep from '@/components/order/seo-article/SeoArticleOptionsStep';
import SeoArticleProgressIndicator from '@/components/order/seo-article/SeoArticleProgressIndicator';
import SeoArticleOrderSummary from '@/components/order/seo-article/SeoArticleOrderSummary';
import { useSupabaseOrders } from '@/hooks/useSupabaseOrders';
import { useModernSeoArticlePricing } from '@/hooks/useModernSeoArticlePricing';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SeoArticleOrderModern() {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [formData, setFormData] = useState({
    articleTopic: '',
    keywords: '',
    characterCount: 3000,
    targetAudience: '',
    competitorUrls: '',
    includeImages: false,
    includeInfographics: false,
    metaDescription: '',
    metaTitle: '',
    callToAction: '',
    contentStyle: 'informational',
    expertQuotes: false,
    statistics: false,
    seoLevel: 'basic',
    competitorAnalysis: 'none',
    urgency: 'standard',
    revision: '2',
    niche: '',
    tone: 'professional',
    cta_placement: 'end',
    lsiKeywords: [],
    autoGenerateMeta: true
  });
  
  const navigate = useNavigate();
  const { createOrder, loading } = useSupabaseOrders();
  const { calculatePrice, priceBreakdown } = useModernSeoArticlePricing(formData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleFormDataChange = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return contactInfo.name && contactInfo.email;
      case 2:
        return formData.articleTopic && formData.keywords && formData.characterCount > 0;
      case 3:
        return true;
      case 4:
        return paymentMethod && contactInfo.email;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleCreateOrder = async () => {
    if (!contactInfo.name || !contactInfo.email) {
      toast.error('Заполните контактную информацию');
      return;
    }

    if (!formData.articleTopic || !formData.keywords || !formData.characterCount) {
      toast.error('Заполните основную информацию о статье');
      return;
    }

    try {
      const orderData = {
        service_slug: 'seo-article-modern',
        service_name: 'SEO-статья (Современная)',
        contact_name: contactInfo.name,
        contact_email: contactInfo.email,
        contact_phone: contactInfo.phone,
        details: `Тема: ${formData.articleTopic}\nКлючевые слова: ${formData.keywords}\nОбъем: ${formData.characterCount} символов\nСтиль: ${formData.contentStyle}\nLSI-ключи: ${formData.lsiKeywords.length}`,
        additional_requirements: `${formData.metaDescription ? `Meta описание: ${formData.metaDescription}\n` : ''}${formData.callToAction ? `Призыв к действию: ${formData.callToAction}\n` : ''}${formData.competitorUrls ? `Конкуренты: ${formData.competitorUrls}` : ''}`,
        estimated_price: calculatePrice(),
        service_options: {
          ...formData,
          company: contactInfo.company,
          paymentMethod: paymentMethod,
          priceBreakdown: priceBreakdown
        }
      };

      const result = await createOrder(orderData);
      
      if (result.success) {
        toast.success('Заказ успешно создан!', {
          description: 'Мы свяжемся с вами в течение 1 рабочего дня'
        });
        navigate('/order-success');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Ошибка при создании заказа');
    }
  };

  const handlePayment = async () => {
    await handleCreateOrder();
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return 'Контактная информация';
      case 2: return 'Информация о статье';
      case 3: return 'Дополнительные опции';
      case 4: return 'Способ оплаты';
      default: return '';
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <SeoArticleContactStep
            contactInfo={contactInfo}
            onContactChange={handleContactChange}
          />
        );

      case 2:
        return (
          <ModernSeoArticleBasicInfoStep
            formData={formData}
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onFormDataChange={handleFormDataChange}
          />
        );

      case 3:
        return (
          <SeoArticleOptionsStep
            formData={formData}
            onInputChange={handleInputChange}
            onCheckboxChange={handleCheckboxChange}
            calculatePrice={calculatePrice}
          />
        );

      case 4:
        return (
          <PaymentStep
            selectedMethod={paymentMethod}
            onMethodSelect={setPaymentMethod}
            totalAmount={calculatePrice()}
            onPayment={handlePayment}
            loading={loading}
            orderData={{
              service_name: 'SEO-статья (Современная)',
              contact_email: contactInfo.email,
              contact_phone: contactInfo.phone,
              contact_name: contactInfo.name
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30">
      <ComprehensiveSeo 
        title="Заказать современную SEO-статью с AI-генерацией | CopyPro Cloud"
        description="Закажите SEO-оптимизированную статью с автоматической генерацией LSI-ключей и мета-тегов. Современный подход, AI-технологии, гарантия качества."
        keywords="seo статья заказать, lsi ключи, мета теги, ai генерация контента"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Modern header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Современная SEO-статья
              </h1>
            </div>
            <p className="text-xl text-gray-600 mb-4">
              AI-генерация LSI-ключей, мета-тегов и профессиональное написание
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-технологии
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                LSI-ключи
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Мета-теги
              </Badge>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                от 1500₽
              </Badge>
            </div>
          </div>

          <SeoArticleProgressIndicator
            currentStep={currentStep}
            totalSteps={4}
            getStepTitle={getStepTitle}
          />

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0 bg-white/60 backdrop-blur-sm">
                <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50">
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {getStepTitle(currentStep)}
                    </span>
                    <Badge variant="outline" className="ml-auto">
                      Шаг {currentStep}/4
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {renderStep()}
                </CardContent>
              </Card>
              
              <div className="flex justify-between items-center mt-8">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={handleBack} className="group">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Назад
                  </Button>
                )}
                
                {currentStep < 4 ? (
                  <Button 
                    onClick={handleNext}
                    disabled={!isStepValid(currentStep)}
                    className="ml-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 group"
                  >
                    Далее 
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handlePayment}
                    disabled={loading || !isStepValid(currentStep)}
                    className="ml-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Создание заказа...
                      </>
                    ) : (
                      <>
                        <DollarSign className="w-4 h-4 mr-2" />
                        Создать заказ
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <SeoArticleOrderSummary
                  wordCount={formData.characterCount.toString()}
                  paymentMethod={paymentMethod}
                  calculatePrice={calculatePrice}
                  currentStep={currentStep}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}