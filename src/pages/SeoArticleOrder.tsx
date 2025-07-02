
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ComprehensiveSeo from '@/components/seo/ComprehensiveSeo';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, Loader2, DollarSign } from 'lucide-react';
import PaymentStep from '@/components/order/form-steps/PaymentStep';
import SeoArticleContactStep from '@/components/order/seo-article/SeoArticleContactStep';
import ModernSeoArticleBasicInfoStep from '@/components/order/seo-article/ModernSeoArticleBasicInfoStep';
import SeoArticleOptionsStep from '@/components/order/seo-article/SeoArticleOptionsStep';
import SeoArticleProgressIndicator from '@/components/order/seo-article/SeoArticleProgressIndicator';
import SeoArticleOrderSummary from '@/components/order/seo-article/SeoArticleOrderSummary';
import { useSupabaseOrders } from '@/hooks/useSupabaseOrders';
import { useModernSeoArticlePricing } from '@/hooks/useModernSeoArticlePricing';
import { toast } from 'sonner';

export default function SeoArticleOrder() {
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
    contentStyle: '',
    expertQuotes: false,
    statistics: false,
    seoLevel: '',
    competitorAnalysis: '',
    urgency: '',
    revision: '',
    niche: '',
    tone: '',
    cta_placement: '',
    lsiKeywords: [],
    autoGenerateMeta: true
  });
  
  const navigate = useNavigate();
  const { createOrder, loading } = useSupabaseOrders();
  const { calculatePrice } = useModernSeoArticlePricing(formData);

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
        service_slug: 'seo-article',
        service_name: 'SEO-статья',
        contact_name: contactInfo.name,
        contact_email: contactInfo.email,
        contact_phone: contactInfo.phone,
        details: `Тема: ${formData.articleTopic}\nКлючевые слова: ${formData.keywords}\nОбъем: ${formData.characterCount} символов`,
        additional_requirements: `${formData.metaDescription ? `Meta описание: ${formData.metaDescription}\n` : ''}${formData.callToAction ? `Призыв к действию: ${formData.callToAction}\n` : ''}${formData.competitorUrls ? `Конкуренты: ${formData.competitorUrls}` : ''}`,
        estimated_price: calculatePrice(),
        service_options: {
          ...formData,
          company: contactInfo.company,
          paymentMethod: paymentMethod
        }
      };

      const result = await createOrder(orderData);
      
      if (result.success) {
        toast.success('Заказ успешно создан!', {
          description: 'Мы свяжемся с вами в течение 1 рабочего дня'
        });
        navigate('/');
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
              service_name: 'SEO-статья',
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
        title="Заказать SEO-статью | Профессиональное написание SEO-текстов"
        description="Закажите SEO-оптимизированную статью от профессиональных копирайтеров. Гарантия уникальности, быстрые сроки, доступные цены."
      />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Заказать SEO-статью
            </h1>
            <p className="text-gray-600 text-lg">
              Профессиональное написание SEO-оптимизированных статей для вашего сайта
            </p>
          </div>

          <SeoArticleProgressIndicator
            currentStep={currentStep}
            totalSteps={4}
            getStepTitle={getStepTitle}
          />

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {renderStep()}
              
              <div className="flex justify-between items-center mt-8">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Назад
                  </Button>
                )}
                
                {currentStep < 4 ? (
                  <Button 
                    onClick={handleNext}
                    disabled={!isStepValid(currentStep)}
                    className="ml-auto"
                  >
                    Далее <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handlePayment}
                    disabled={loading || !isStepValid(currentStep)}
                    className="ml-auto bg-green-600 hover:bg-green-700"
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
  );
}
