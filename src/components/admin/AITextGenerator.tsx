import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Wand2, Download, Copy, RefreshCw, CheckCircle, Settings, FileText, Mail, MessageSquare, Users, Library, Bookmark } from "lucide-react";
import TemplateLibrary from "./ai-generator/TemplateLibrary";
import PresetManager from "./ai-generator/PresetManager";
import PromptLibrary from "./ai-generator/PromptLibrary";

export default function AITextGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [formData, setFormData] = useState({
    prompt: "",
    textType: "",
    length: [3000],
    tone: "",
    audience: "",
    keywords: "",
    language: "russian",
    includeEmoji: false,
    includeCTA: true,
    seoOptimized: true
  });

  const contentTypes = [
    { value: "seo-article", label: "SEO-статья", icon: FileText, description: "Статья для поискового продвижения" },
    { value: "landing", label: "Лендинг", icon: Users, description: "Продающая страница" },
    { value: "email", label: "Email-рассылка", icon: Mail, description: "Письмо для подписчиков" },
    { value: "social", label: "Соцсети", icon: MessageSquare, description: "Пост для социальных сетей" },
    { value: "product", label: "Описание товара", icon: FileText, description: "Коммерческое описание" },
    { value: "blog", label: "Блог-пост", icon: FileText, description: "Информационная статья" },
    { value: "press-release", label: "Пресс-релиз", icon: FileText, description: "Новостное сообщение" }
  ];

  const toneOptions = [
    { value: "professional", label: "Профессиональный" },
    { value: "friendly", label: "Дружелюбный" },
    { value: "formal", label: "Официальный" },
    { value: "casual", label: "Неформальный" },
    { value: "persuasive", label: "Убедительный" },
    { value: "informative", label: "Информативный" }
  ];

  const audienceOptions = [
    { value: "b2b", label: "B2B (бизнес)" },
    { value: "b2c", label: "B2C (потребители)" },
    { value: "experts", label: "Эксперты" },
    { value: "beginners", label: "Новички" },
    { value: "general", label: "Широкая аудитория" }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Симуляция генерации текста
    setTimeout(() => {
      setGeneratedText(`Это профессиональный AI-текст типа "${contentTypes.find(t => t.value === formData.textType)?.label || 'текст'}" на основе промпта: "${formData.prompt}".

Параметры генерации:
- Длина: ${formData.length[0]} символов
- Тон: ${toneOptions.find(t => t.value === formData.tone)?.label || 'не указан'}
- Аудитория: ${audienceOptions.find(a => a.value === formData.audience)?.label || 'не указана'}
- Ключевые слова: ${formData.keywords || 'не указаны'}

Данный текст создан с учетом всех SEO-требований и оптимизирован для максимальной конверсии. Уникальность составляет 95%, что превышает требуемый минимум в 85%.

Ключевые особенности текста:
- Оптимизация под целевые ключевые слова
- Естественная интеграция призывов к действию
- Соответствие требованиям поисковых систем
- Высокая читабельность и вовлеченность
- Адаптация под целевую аудиторию

${formData.includeCTA ? 'Призыв к действию: Закажите профессиональный копирайтинг прямо сейчас!' : ''}

Текст готов к использованию и может быть экспортирован в любом из доступных форматов.`);
      setIsGenerating(false);
    }, 3000);
  };

  const handleApplyTemplate = (template: any) => {
    setFormData(prev => ({
      ...prev,
      textType: template.settings.textType,
      length: [template.settings.length],
      tone: template.settings.tone,
      audience: template.settings.audience,
      seoOptimized: template.settings.seoOptimized,
      includeCTA: template.settings.includeCTA,
      prompt: template.prompt
    }));
  };

  const handleApplyPreset = (preset: any) => {
    setFormData(prev => ({
      ...prev,
      ...preset.settings
    }));
  };

  const handleSavePreset = (preset: any) => {
    // Логика сохранения пресета
    console.log('Saving preset:', preset);
  };

  const handleSelectPrompt = (prompt: string) => {
    setFormData(prev => ({
      ...prev,
      prompt: prompt
    }));
  };

  const selectedContentType = contentTypes.find(type => type.value === formData.textType);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">AI Генератор текстов</h1>
          <p className="text-slate-600">Создание профессиональных текстов с помощью искусственного интеллекта</p>
        </div>
        <Badge className="bg-purple-100 text-purple-800">
          <Bot className="w-4 h-4 mr-2" />
          GPT-4 Turbo
        </Badge>
      </div>

      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="generator" className="flex items-center gap-2">
            <Wand2 className="w-4 h-4" />
            Генератор
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Library className="w-4 h-4" />
            Шаблоны
          </TabsTrigger>
          <TabsTrigger value="presets" className="flex items-center gap-2">
            <Bookmark className="w-4 h-4" />
            Пресеты
          </TabsTrigger>
          <TabsTrigger value="prompts" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Промпты
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Настройки генерации */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Параметры генерации
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Сохраняем весь существующий код настроек */}
                {/* Тип контента */}
                <div>
                  <label className="block text-sm font-medium mb-3">Тип контента</label>
                  <div className="grid grid-cols-1 gap-2">
                    {contentTypes.map((type) => (
                      <Card
                        key={type.value}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          formData.textType === type.value 
                            ? 'ring-2 ring-blue-500 bg-blue-50' 
                            : 'hover:bg-slate-50'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, textType: type.value }))}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center gap-3">
                            <type.icon className="w-5 h-5 text-blue-600" />
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-xs text-slate-500">{type.description}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Описание задачи */}
                <div>
                  <label className="block text-sm font-medium mb-2">Описание задачи</label>
                  <Textarea
                    placeholder="Опишите, какой текст нужно создать. Укажите тему, целевую аудиторию, ключевые слова..."
                    value={formData.prompt}
                    onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
                    rows={4}
                  />
                </div>

                {/* Ключевые слова */}
                <div>
                  <label className="block text-sm font-medium mb-2">Ключевые слова</label>
                  <Input
                    placeholder="копирайтинг, SEO, контент-маркетинг"
                    value={formData.keywords}
                    onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                  />
                </div>

                {/* Длина текста */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Объем текста: {formData.length[0]} символов
                  </label>
                  <Slider
                    value={formData.length}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, length: value }))}
                    max={10000}
                    min={500}
                    step={500}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>500</span>
                    <span>5000</span>
                    <span>10000</span>
                  </div>
                </div>

                {/* Тон и аудитория */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Тон</label>
                    <Select value={formData.tone} onValueChange={(value) => setFormData(prev => ({ ...prev, tone: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тон" />
                      </SelectTrigger>
                      <SelectContent>
                        {toneOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Аудитория</label>
                    <Select value={formData.audience} onValueChange={(value) => setFormData(prev => ({ ...prev, audience: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Целевая аудитория" />
                      </SelectTrigger>
                      <SelectContent>
                        {audienceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Дополнительные настройки */}
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-medium text-sm">Дополнительные настройки</h4>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="seo-optimized" className="text-sm">SEO-оптимизация</Label>
                    <Switch
                      id="seo-optimized"
                      checked={formData.seoOptimized}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, seoOptimized: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-cta" className="text-sm">Включить призыв к действию</Label>
                    <Switch
                      id="include-cta"
                      checked={formData.includeCTA}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includeCTA: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="include-emoji" className="text-sm">Использовать эмодзи</Label>
                    <Switch
                      id="include-emoji"
                      checked={formData.includeEmoji}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includeEmoji: checked }))}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !formData.prompt || !formData.textType}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Генерация...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Сгенерировать текст
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Результат */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Сгенерированный текст</CardTitle>
                  {generatedText && (
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Уникальность: 95%
                      </Badge>
                      {selectedContentType && (
                        <Badge variant="outline">
                          <selectedContentType.icon className="w-4 h-4 mr-1" />
                          {selectedContentType.label}
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {generatedText ? (
                  <div className="space-y-4">
                    <Textarea
                      value={generatedText}
                      onChange={(e) => setGeneratedText(e.target.value)}
                      rows={15}
                      className="font-mono text-sm"
                    />
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <Button variant="outline" size="sm">
                        <Copy className="w-4 h-4 mr-2" />
                        Копировать
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Excel
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        HTML
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Перегенерировать
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-lg font-bold">{generatedText.length}</div>
                        <div className="text-sm text-slate-600">Символов</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{generatedText.split(' ').length}</div>
                        <div className="text-sm text-slate-600">Слов</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold">{generatedText.split('.').length - 1}</div>
                        <div className="text-sm text-slate-600">Предложений</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <Bot className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p className="text-lg font-medium mb-2">Готов к генерации</p>
                    <p className="text-sm">Заполните параметры и нажмите "Сгенерировать текст"</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Пресеты внизу */}
          <PresetManager
            currentSettings={formData}
            onApplyPreset={handleApplyPreset}
            onSavePreset={handleSavePreset}
          />
        </TabsContent>

        <TabsContent value="templates">
          <TemplateLibrary onApplyTemplate={handleApplyTemplate} />
        </TabsContent>

        <TabsContent value="presets">
          <PresetManager
            currentSettings={formData}
            onApplyPreset={handleApplyPreset}
            onSavePreset={handleSavePreset}
          />
        </TabsContent>

        <TabsContent value="prompts">
          <PromptLibrary onSelectPrompt={handleSelectPrompt} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
