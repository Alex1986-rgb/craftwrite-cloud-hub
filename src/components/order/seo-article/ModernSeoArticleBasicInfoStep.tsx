import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { FileText, Sparkles, Target, Hash, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { AIContentEnhancer } from '@/services/aiContentEnhancer';
import { toast } from 'sonner';

interface ModernFormData {
  articleTopic: string;
  keywords: string;
  characterCount: number;
  contentStyle: string;
  targetAudience: string;
  lsiKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  autoGenerateMeta: boolean;
}

interface LSIKeyword {
  keyword: string;
  relevance: number;
  category: string;
}

interface ModernSeoArticleBasicInfoStepProps {
  formData: ModernFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onFormDataChange: (updates: Partial<ModernFormData>) => void;
}

export default function ModernSeoArticleBasicInfoStep({ 
  formData, 
  onInputChange, 
  onSelectChange,
  onFormDataChange
}: ModernSeoArticleBasicInfoStepProps) {
  const [isGeneratingLSI, setIsGeneratingLSI] = useState(false);
  const [isGeneratingMeta, setIsGeneratingMeta] = useState(false);
  const [suggestedLSI, setSuggestedLSI] = useState<LSIKeyword[]>([]);
  const [selectedLSI, setSelectedLSI] = useState<string[]>(formData.lsiKeywords || []);

  const characterRanges = [
    { min: 1000, max: 3000, label: '1 000 - 3 000 символов', price: '1 500₽' },
    { min: 3000, max: 5000, label: '3 000 - 5 000 символов', price: '2 500₽' },
    { min: 5000, max: 10000, label: '5 000 - 10 000 символов', price: '4 500₽' },
    { min: 10000, max: 20000, label: '10 000+ символов', price: 'от 7 000₽' }
  ];

  // Автоматическая генерация LSI-ключей
  const generateLSIKeywords = async () => {
    if (!formData.articleTopic || !formData.keywords) {
      toast.error('Заполните тему статьи и основные ключевые слова');
      return;
    }

    setIsGeneratingLSI(true);
    try {
      const mainKeywords = formData.keywords.split(',').map(k => k.trim()).filter(k => k);
      const lsiKeywords = await AIContentEnhancer.generateLSIKeywords(
        mainKeywords,
        formData.articleTopic,
        15
      );
      
      setSuggestedLSI(lsiKeywords);
      toast.success(`Сгенерировано ${lsiKeywords.length} LSI-ключей`);
    } catch (error) {
      console.error('LSI generation error:', error);
      toast.error('Ошибка генерации LSI-ключей');
    } finally {
      setIsGeneratingLSI(false);
    }
  };

  // Автоматическая генерация мета-тегов
  const generateMetaTags = async () => {
    if (!formData.articleTopic || !formData.keywords) {
      toast.error('Заполните тему статьи и основные ключевые слова');
      return;
    }

    setIsGeneratingMeta(true);
    try {
      const mainKeywords = formData.keywords.split(',').map(k => k.trim()).filter(k => k);
      const metaTags = await AIContentEnhancer.generateMetaTags(
        formData.articleTopic,
        mainKeywords,
        formData.characterCount,
        formData.targetAudience
      );
      
      onFormDataChange({
        metaTitle: metaTags.title,
        metaDescription: metaTags.description
      });
      
      toast.success('Мета-теги сгенерированы');
    } catch (error) {
      console.error('Meta generation error:', error);
      toast.error('Ошибка генерации мета-тегов');
    } finally {
      setIsGeneratingMeta(false);
    }
  };

  // Добавление/удаление LSI-ключей
  const toggleLSIKeyword = (keyword: string) => {
    const newSelected = selectedLSI.includes(keyword)
      ? selectedLSI.filter(k => k !== keyword)
      : [...selectedLSI, keyword];
    
    setSelectedLSI(newSelected);
    onFormDataChange({ lsiKeywords: newSelected });
  };

  // Обновление количества символов
  const handleCharacterCountChange = (value: number[]) => {
    onFormDataChange({ characterCount: value[0] });
  };

  // Группировка LSI-ключей по категориям
  const groupedLSI = suggestedLSI.reduce((acc, keyword) => {
    if (!acc[keyword.category]) acc[keyword.category] = [];
    acc[keyword.category].push(keyword);
    return acc;
  }, {} as Record<string, LSIKeyword[]>);

  const getCharacterRangeInfo = () => {
    const count = formData.characterCount;
    return characterRanges.find(range => count >= range.min && count <= range.max) || characterRanges[0];
  };

  return (
    <div className="space-y-6">
      {/* Основная информация */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Основная информация о статье
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="articleTopic">Тема статьи *</Label>
            <Input
              id="articleTopic"
              name="articleTopic"
              value={formData.articleTopic}
              onChange={onInputChange}
              placeholder="Например: Лучшие практики SEO-продвижения в 2024 году"
              required
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="keywords">Основные ключевые слова *</Label>
            <Textarea
              id="keywords"
              name="keywords"
              value={formData.keywords}
              onChange={onInputChange}
              placeholder="SEO-продвижение, поисковая оптимизация, продвижение сайта"
              rows={3}
              required
              className="mt-1"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Перечислите через запятую основные ключевые слова для статьи
            </p>
          </div>

          <div>
            <Label htmlFor="targetAudience">Целевая аудитория</Label>
            <Input
              id="targetAudience"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={onInputChange}
              placeholder="Владельцы интернет-магазинов, маркетологи"
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Объем статьи */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-primary" />
            Объем статьи: {formData.characterCount.toLocaleString()} символов
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="px-2">
            <Slider
              value={[formData.characterCount]}
              onValueChange={handleCharacterCountChange}
              max={20000}
              min={1000}
              step={500}
              className="w-full"
            />
          </div>
          
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>1 000</span>
            <span>20 000+</span>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium">{getCharacterRangeInfo().label}</span>
              <Badge variant="secondary">{getCharacterRangeInfo().price}</Badge>
            </div>
          </div>

          <div>
            <Label htmlFor="contentStyle">Стиль подачи</Label>
            <Select onValueChange={(value) => onSelectChange('contentStyle', value)} value={formData.contentStyle}>
              <SelectTrigger className="mt-1">
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
        </CardContent>
      </Card>

      {/* LSI-ключи */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            LSI-ключевые слова
            <Badge variant="outline" className="ml-auto">
              {selectedLSI.length} выбрано
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              LSI-ключи улучшают релевантность статьи для поисковых систем
            </p>
            <Button
              onClick={generateLSIKeywords}
              disabled={isGeneratingLSI || !formData.articleTopic || !formData.keywords}
              size="sm"
              variant="outline"
            >
              {isGeneratingLSI ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Генерация...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Сгенерировать
                </>
              )}
            </Button>
          </div>

          {suggestedLSI.length > 0 && (
            <div className="space-y-3">
              {Object.entries(groupedLSI).map(([category, keywords]) => (
                <div key={category} className="space-y-2">
                  <h4 className="font-medium text-sm capitalize">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map(lsi => (
                      <Badge
                        key={lsi.keyword}
                        variant={selectedLSI.includes(lsi.keyword) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/10"
                        onClick={() => toggleLSIKeyword(lsi.keyword)}
                      >
                        {lsi.keyword}
                        <span className="ml-1 text-xs opacity-70">
                          {Math.round(lsi.relevance * 100)}%
                        </span>
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedLSI.length > 0 && (
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span>Стоимость LSI-ключей:</span>
                <span className="font-medium">+{selectedLSI.length * 50}₽</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Мета-теги */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            SEO мета-теги
            <div className="ml-auto flex items-center gap-2">
              <Switch
                checked={formData.autoGenerateMeta}
                onCheckedChange={(checked) => onFormDataChange({ autoGenerateMeta: checked })}
              />
              <span className="text-sm">Автогенерация</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Автоматически создаём оптимизированные Title и Description
            </p>
            <Button
              onClick={generateMetaTags}
              disabled={isGeneratingMeta || !formData.articleTopic || !formData.keywords}
              size="sm"
              variant="outline"
            >
              {isGeneratingMeta ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Генерация...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Сгенерировать
                </>
              )}
            </Button>
          </div>

          <div className="grid gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <span className={`text-xs ${formData.metaTitle.length > 60 ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {formData.metaTitle.length}/60
                </span>
              </div>
              <Input
                id="metaTitle"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={onInputChange}
                placeholder="SEO-заголовок для поисковых систем"
                className={formData.metaTitle.length > 60 ? 'border-red-500' : ''}
              />
              {formData.metaTitle.length > 60 && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Рекомендуется не более 60 символов
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <span className={`text-xs ${formData.metaDescription.length > 160 ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {formData.metaDescription.length}/160
                </span>
              </div>
              <Textarea
                id="metaDescription"
                name="metaDescription"
                value={formData.metaDescription}
                onChange={onInputChange}
                placeholder="Краткое описание статьи для поисковых систем"
                rows={3}
                className={formData.metaDescription.length > 160 ? 'border-red-500' : ''}
              />
              {formData.metaDescription.length > 160 && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Рекомендуется не более 160 символов
                </p>
              )}
            </div>
          </div>

          {formData.autoGenerateMeta && (
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span>Стоимость мета-тегов:</span>
                <span className="font-medium">+300₽</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}