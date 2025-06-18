
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
  BarChart3
} from 'lucide-react';
import UnifiedOrderForm from '@/components/order/UnifiedOrderForm';

export default function SeoArticleOrder() {
  const [showForm, setShowForm] = useState(false);
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
    statistics: false
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = () => {
    console.log('SEO Article Order Data:', formData);
    setShowForm(true);
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

        {/* Detailed Form Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Детали для создания SEO-статьи</h2>
              
              <div className="grid gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
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
                        <Label htmlFor="wordCount">Объем статьи</Label>
                        <Select onValueChange={(value) => setFormData(prev => ({ ...prev, wordCount: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите объем" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1000-2000">1000-2000 слов</SelectItem>
                            <SelectItem value="2000-3000">2000-3000 слов</SelectItem>
                            <SelectItem value="3000-5000">3000-5000 слов</SelectItem>
                            <SelectItem value="5000+">Более 5000 слов</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="contentStyle">Стиль подачи</Label>
                        <Select onValueChange={(value) => setFormData(prev => ({ ...prev, contentStyle: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите стиль" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="informational">Информационный</SelectItem>
                            <SelectItem value="expert">Экспертный</SelectItem>
                            <SelectItem value="friendly">Дружелюбный</SelectItem>
                            <SelectItem value="formal">Официальный</SelectItem>
                            <SelectItem value="engaging">Вовлекающий</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Целевая аудитория и конкуренты
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
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
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Дополнительные опции
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="includeImages"
                            checked={formData.includeImages}
                            onCheckedChange={(checked) => handleCheckboxChange('includeImages', !!checked)}
                          />
                          <Label htmlFor="includeImages">Подобрать изображения</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="includeInfographics"
                            checked={formData.includeInfographics}
                            onCheckedChange={(checked) => handleCheckboxChange('includeInfographics', !!checked)}
                          />
                          <Label htmlFor="includeInfographics">Создать инфографику</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="expertQuotes"
                            checked={formData.expertQuotes}
                            onCheckedChange={(checked) => handleCheckboxChange('expertQuotes', !!checked)}
                          />
                          <Label htmlFor="expertQuotes">Добавить экспертные мнения</Label>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="statistics"
                            checked={formData.statistics}
                            onCheckedChange={(checked) => handleCheckboxChange('statistics', !!checked)}
                          />
                          <Label htmlFor="statistics">Включить актуальную статистику</Label>
                        </div>
                      </div>
                    </div>
                    
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
                        placeholder="Что должен сделать читатель после прочтения?"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Button 
                    onClick={handleSubmit}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Создать SEO-статью
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Order Form Section */}
        {showForm && (
          <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="container mx-auto px-4">
              <UnifiedOrderForm 
                variant="public"
                onOrderCreated={() => {
                  setShowForm(false);
                  navigate('/order-tracking');
                }}
              />
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </>
  );
}
