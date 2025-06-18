
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
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
  DollarSign
} from 'lucide-react';
import OrderEstimate from '@/components/order/OrderEstimate';
import { toast } from 'sonner';

export default function SeoArticleOrder() {
  const [currentStep, setCurrentStep] = useState(1);
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
    // Дополнительные фильтры
    seoLevel: '',
    competitorAnalysis: '',
    urgency: '',
    revision: '',
    niche: '',
    tone: '',
    cta_placement: ''
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.articleTopic && formData.keywords && formData.wordCount;
      case 2:
        return true; // Дополнительные параметры не обязательны
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

  const handlePayment = () => {
    toast.success('Переход к оплате...');
    // Здесь будет интеграция с платежной системой
    console.log('Payment data:', formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
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
                        <SelectItem value="1000-2000">
                          <div className="flex items-center justify-between w-full">
                            <span>1000-2000 слов</span>
                            <span className="text-sm text-green-600 ml-4">2500₽</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="2000-3000">
                          <div className="flex items-center justify-between w-full">
                            <span>2000-3000 слов</span>
                            <span className="text-sm text-green-600 ml-4">4000₽</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="3000-5000">
                          <div className="flex items-center justify-between w-full">
                            <span>3000-5000 слов</span>
                            <span className="text-sm text-green-600 ml-4">6500₽</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="5000+">
                          <div className="flex items-center justify-between w-full">
                            <span>Более 5000 слов</span>
                            <span className="text-sm text-green-600 ml-4">9000₽</span>
                          </div>
                        </SelectItem>
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
                        <SelectItem value="expert">
                          <div className="flex items-center justify-between w-full">
                            <span>Экспертный</span>
                            <span className="text-xs text-orange-600 ml-2">+30%</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="friendly">Дружелюбный</SelectItem>
                        <SelectItem value="formal">Официальный</SelectItem>
                        <SelectItem value="engaging">Вовлекающий</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="targetAudience">Целевая аудитория</Label>
                  <Textarea
                    id="targetAudience"
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    placeholder="Опишите вашу целевую аудиторию: возраст, интересы, боли..."
                    rows={3}
                  />
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
                  <Filter className="w-5 h-5 text-purple-600" />
                  Продвинутые настройки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="seoLevel">Уровень SEO-оптимизации</Label>
                    <Select onValueChange={(value) => handleSelectChange('seoLevel', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите уровень" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Базовая оптимизация</SelectItem>
                        <SelectItem value="advanced">
                          <div className="flex items-center justify-between w-full">
                            <span>Расширенная оптимизация</span>
                            <span className="text-xs text-orange-600 ml-2">+20%</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="technical">
                          <div className="flex items-center justify-between w-full">
                            <span>Техническая оптимизация</span>
                            <span className="text-xs text-orange-600 ml-2">+40%</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="competitorAnalysis">Анализ конкурентов</Label>
                    <Select onValueChange={(value) => handleSelectChange('competitorAnalysis', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип анализа" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Не требуется</SelectItem>
                        <SelectItem value="basic">
                          <div className="flex items-center justify-between w-full">
                            <span>Базовый анализ</span>
                            <span className="text-xs text-orange-600 ml-2">+10%</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="detailed">
                          <div className="flex items-center justify-between w-full">
                            <span>Детальный анализ</span>
                            <span className="text-xs text-orange-600 ml-2">+25%</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="competitorUrls">Ссылки на статьи конкурентов</Label>
                  <Textarea
                    id="competitorUrls"
                    name="competitorUrls"
                    value={formData.competitorUrls}
                    onChange={handleInputChange}
                    placeholder="Укажите URL статей конкурентов для анализа (по одной ссылке на строку)"
                    rows={4}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Дополнительные опции
                    </h4>
                    
                    <div className="space-y-3">
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
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Уточнения
                    </h4>
                    
                    <div>
                      <Label htmlFor="metaDescription">Meta описание</Label>
                      <Textarea
                        id="metaDescription"
                        name="metaDescription"
                        value={formData.metaDescription}
                        onChange={handleInputChange}
                        placeholder="Желаемое описание для поисковых систем (150-160 символов)"
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
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <OrderEstimate 
            formData={formData}
            onEdit={() => setCurrentStep(1)}
            onPayment={handlePayment}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <ComprehensiveSeo
        title="Заказать SEO-статью | CopyPro Cloud - Оптимизированный контент для продвижения"
        description="Создание SEO-статей для топ-позиций в поиске. Глубокий анализ конкурентов, LSI-ключи, техническая оптимизация. Рост трафика до 300%. От 2500₽"
        keywords="seo статья, сео текст, оптимизированная статья, продвижение сайта, контент маркетинг"
      />
      
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30">
                <Search className="w-4 h-4 mr-2" />
                SEO-статьи
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                SEO-статьи для топ-позиций в поиске
              </h1>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                Создаем оптимизированный контент, который выводит сайты в топ поисковых систем. 
                Глубокий анализ конкурентов, семантическое ядро, техническая SEO-оптимизация
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Progress */}
              <div className="flex justify-center gap-2 mb-8">
                {[1, 2, 3].map((step) => (
                  <Badge 
                    key={step}
                    variant={currentStep >= step ? "default" : "outline"}
                    className={`${currentStep === step ? "bg-blue-600" : ""} px-4 py-2`}
                  >
                    {step === 1 && "Основное"}
                    {step === 2 && "Настройки"}
                    {step === 3 && "Смета"}
                  </Badge>
                ))}
              </div>

              {renderStep()}
              
              {/* Navigation */}
              {currentStep < 3 && (
                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <Button 
                      variant="outline" 
                      onClick={handleBack}
                    >
                      Назад
                    </Button>
                  )}
                  
                  <Button 
                    onClick={handleNext}
                    disabled={!isStepValid(currentStep)}
                    className={`${currentStep === 1 ? 'ml-auto' : ''} bg-blue-600 hover:bg-blue-700`}
                  >
                    {currentStep === 2 ? 'Создать смету' : 'Далее'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
