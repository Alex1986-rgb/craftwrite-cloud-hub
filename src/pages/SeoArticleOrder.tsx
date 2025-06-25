
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ComprehensiveSeo from '@/components/seo/ComprehensiveSeo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  CheckCircle, 
  ArrowRight,
  Search,
  Target,
  TrendingUp,
  FileText,
  Users,
  BarChart3,
  Filter,
  Settings,
  DollarSign,
  Loader2
} from 'lucide-react';
import OrderEstimate from '@/components/order/OrderEstimate';
import { useSupabaseOrders } from '@/hooks/useSupabaseOrders';
import { toast } from 'sonner';

export default function SeoArticleOrder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [formData, setFormData] = useState({
    articleTopic: '',
    keywords: '',
    wordCount: '',
    targetAudience: '',
    competitorUrls: '',
    includeImages: false,
    includeInfographics: false,
    metaDescription: '',
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
    cta_placement: ''
  });
  
  const navigate = useNavigate();
  const { createOrder, loading } = useSupabaseOrders();

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

  const calculatePrice = () => {
    let basePrice = 0;
    
    // Базовая цена по объему
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
      default:
        basePrice = 2500;
    }

    // Дополнительные услуги
    if (formData.includeImages) basePrice += 800;
    if (formData.includeInfographics) basePrice += 1500;
    if (formData.expertQuotes) basePrice += 1200;
    if (formData.statistics) basePrice += 600;

    // Множители за сложность
    if (formData.seoLevel === 'advanced') basePrice *= 1.2;
    if (formData.seoLevel === 'technical') basePrice *= 1.4;
    if (formData.competitorAnalysis === 'basic') basePrice *= 1.1;
    if (formData.competitorAnalysis === 'detailed') basePrice *= 1.25;

    return Math.round(basePrice);
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return contactInfo.name && contactInfo.email;
      case 2:
        return formData.articleTopic && formData.keywords && formData.wordCount;
      case 3:
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handlePayment = async () => {
    if (!contactInfo.name || !contactInfo.email) {
      toast.error('Заполните контактную информацию');
      return;
    }

    if (!formData.articleTopic || !formData.keywords || !formData.wordCount) {
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
        details: `Тема: ${formData.articleTopic}\nКлючевые слова: ${formData.keywords}\nОбъем: ${formData.wordCount}`,
        additional_requirements: `${formData.metaDescription ? `Meta описание: ${formData.metaDescription}\n` : ''}${formData.callToAction ? `Призыв к действию: ${formData.callToAction}\n` : ''}${formData.competitorUrls ? `Конкуренты: ${formData.competitorUrls}` : ''}`,
        estimated_price: calculatePrice(),
        service_options: {
          ...formData,
          company: contactInfo.company
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

  const handleEdit = () => {
    setCurrentStep(1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Контактная информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={contactInfo.name}
                      onChange={handleContactChange}
                      placeholder="Ваше имя"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={contactInfo.email}
                      onChange={handleContactChange}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={contactInfo.phone}
                      onChange={handleContactChange}
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="company">Компания</Label>
                    <Input
                      id="company"
                      name="company"
                      value={contactInfo.company}
                      onChange={handleContactChange}
                      placeholder="Название компании"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Основная информация
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="articleTopic">Тема статьи *</Label>
                  <Input
                    id="articleTopic"
                    name="articleTopic"
                    value={formData.articleTopic}
                    onChange={handleInputChange}
                    placeholder="О чем должна быть статья?"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="keywords">Ключевые слова *</Label>
                  <Textarea
                    id="keywords"
                    name="keywords"
                    value={formData.keywords}
                    onChange={handleInputChange}
                    placeholder="Перечислите основные ключевые слова через запятую"
                    rows={3}
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="wordCount">Объем статьи *</Label>
                    <Select onValueChange={(value) => handleSelectChange('wordCount', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите объем" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1000-2000">1000-2000 слов (2500₽)</SelectItem>
                        <SelectItem value="2000-3000">2000-3000 слов (4000₽)</SelectItem>
                        <SelectItem value="3000-5000">3000-5000 слов (6500₽)</SelectItem>
                        <SelectItem value="5000+">Более 5000 слов (9000₽)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="contentStyle">Стиль подачи</Label>
                    <Select onValueChange={(value) => handleSelectChange('contentStyle', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите стиль" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="informational">Информационный</SelectItem>
                        <SelectItem value="expert">Экспертный (+30%)</SelectItem>
                        <SelectItem value="friendly">Дружелюбный</SelectItem>
                        <SelectItem value="formal">Официальный</SelectItem>
                        <SelectItem value="engaging">Вовлекающий</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  Дополнительные опции
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeImages"
                        checked={formData.includeImages}
                        onCheckedChange={(checked) => handleCheckboxChange('includeImages', !!checked)}
                      />
                      <Label htmlFor="includeImages">Подобрать изображения</Label>
                    </div>
                    <span className="text-sm text-green-600">+800₽</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeInfographics"
                        checked={formData.includeInfographics}
                        onCheckedChange={(checked) => handleCheckboxChange('includeInfographics', !!checked)}
                      />
                      <Label htmlFor="includeInfographics">Создать инфографику</Label>
                    </div>
                    <span className="text-sm text-green-600">+1500₽</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="expertQuotes"
                        checked={formData.expertQuotes}
                        onCheckedChange={(checked) => handleCheckboxChange('expertQuotes', !!checked)}
                      />
                      <Label htmlFor="expertQuotes">Добавить экспертные мнения</Label>
                    </div>
                    <span className="text-sm text-green-600">+1200₽</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="statistics"
                        checked={formData.statistics}
                        onCheckedChange={(checked) => handleCheckboxChange('statistics', !!checked)}
                      />
                      <Label htmlFor="statistics">Включить актуальную статистику</Label>
                    </div>
                    <span className="text-sm text-green-600">+600₽</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="metaDescription">Meta описание</Label>
                    <Textarea
                      id="metaDescription"
                      name="metaDescription"
                      value={formData.metaDescription}
                      onChange={handleInputChange}
                      placeholder="Желаемое описание для поисковых систем"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="callToAction">Призыв к действию</Label>
                    <Input
                      id="callToAction"
                      name="callToAction"
                      value={formData.callToAction}
                      onChange={handleInputChange}
                      placeholder="Что должен сделать читатель?"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="competitorUrls">Ссылки на статьи конкурентов</Label>
                  <Textarea
                    id="competitorUrls"
                    name="competitorUrls"
                    value={formData.competitorUrls}
                    onChange={handleInputChange}
                    placeholder="Укажите URL статей конкурентов для анализа"
                    rows={3}
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Итоговая стоимость:</span>
                    <span className="text-2xl font-bold text-green-600">
                      {calculatePrice().toLocaleString('ru-RU')} ₽
                    </span>
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

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {renderStep()}
              
              <div className="flex justify-between items-center mt-8">
                {currentStep > 1 && (
                  <Button variant="outline" onClick={handleBack}>
                    Назад
                  </Button>
                )}
                
                {currentStep < 3 ? (
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
                    disabled={loading}
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
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Сводка заказа</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Услуга:</span>
                      <span>SEO-статья</span>
                    </div>
                    {formData.wordCount && (
                      <div className="flex justify-between">
                        <span>Объем:</span>
                        <span>{formData.wordCount}</span>
                      </div>
                    )}
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Итого:</span>
                        <span className="text-green-600">{calculatePrice().toLocaleString('ru-RU')} ₽</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
