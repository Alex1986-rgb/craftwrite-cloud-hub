
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Library, Plus, Search, Star, Copy, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  niche: string;
  contentType: string;
  settings: {
    tone: string;
    audience: string;
    length: number[];
    includeEmoji: boolean;
    includeCTA: boolean;
    seoOptimized: boolean;
  };
  prompt: string;
  keywords?: string;
  isCustom: boolean;
  usageCount: number;
  rating: number;
  tags: string[];
  createdAt: Date;
}

interface TemplateLibraryProps {
  onApplyTemplate: (template: Template) => void;
}

export default function TemplateLibrary({ onApplyTemplate }: TemplateLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [nicheFilter, setNicheFilter] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [newTemplate, setNewTemplate] = useState({
    title: "",
    description: "",
    category: "",
    niche: "",
    contentType: "",
    prompt: "",
    keywords: "",
    tags: "",
    tone: "",
    audience: "",
    length: [1000],
    includeEmoji: false,
    includeCTA: true,
    seoOptimized: true
  });
  const { toast } = useToast();

  const defaultTemplates: Template[] = [
    {
      id: "1",
      title: "SEO-статья для IT-ниши",
      description: "Профессиональная статья с техническими деталями и оптимизацией",
      category: "seo",
      niche: "tech",
      contentType: "seo-article",
      settings: {
        tone: "professional",
        audience: "experts",
        length: [2000],
        includeEmoji: false,
        includeCTA: true,
        seoOptimized: true
      },
      prompt: "Напиши техническую SEO-статью на тему [ТЕМА] для IT-специалистов. Структура:\n- Привлекательный H1 с основным ключевым словом\n- Введение с описанием проблемы\n- Технические разделы с H2-H3\n- Практические примеры кода\n- Преимущества и недостатки\n- Заключение с выводами\n- Естественное включение ключевых слов: [КЛЮЧЕВЫЕ_СЛОВА]\nТон: профессиональный, экспертный",
      keywords: "разработка, программирование, технологии",
      isCustom: false,
      usageCount: 156,
      rating: 4.8,
      tags: ["seo", "tech", "статья", "it"],
      createdAt: new Date("2024-01-15")
    },
    {
      id: "2",
      title: "Email-последовательность для e-commerce",
      description: "Серия писем для увеличения продаж в интернет-магазине",
      category: "email",
      niche: "ecommerce",
      contentType: "email",
      settings: {
        tone: "friendly",
        audience: "b2c",
        length: [500],
        includeEmoji: true,
        includeCTA: true,
        seoOptimized: false
      },
      prompt: "Создай email-последовательность из 5 писем для интернет-магазина [ТЕМАТИКА]. Каждое письмо:\n- Тема: цепляющая, персонализированная\n- Приветствие с именем\n- Ценный контент или предложение\n- Социальные доказательства\n- Четкий призыв к действию\n- P.S. с дополнительной мотивацией\nТон: дружелюбный, доверительный\nИспользуй эмодзи для акцентов",
      keywords: "продажи, интернет-магазин, покупки",
      isCustom: false,
      usageCount: 89,
      rating: 4.6,
      tags: ["email", "ecommerce", "продажи", "маркетинг"],
      createdAt: new Date("2024-01-20")
    },
    {
      id: "3",
      title: "Лендинг для медицинских услуг",
      description: "Продающая страница для клиник и медицинских центров",
      category: "landing",
      niche: "medical",
      contentType: "landing",
      settings: {
        tone: "professional",
        audience: "b2c",
        length: [1500],
        includeEmoji: false,
        includeCTA: true,
        seoOptimized: true
      },
      prompt: "Создай лендинг для медицинской услуги [УСЛУГА]. Структура:\n- Заголовок с УТП и выгодой для пациента\n- Описание проблемы и последствий\n- Представление решения\n- Преимущества клиники (опыт, оборудование, врачи)\n- Этапы лечения\n- Цены и акции\n- Отзывы пациентов\n- Лицензии и сертификаты\n- Форма записи на консультацию\nТон: профессиональный, заботливый, вызывающий доверие",
      keywords: "медицина, здоровье, лечение, врач",
      isCustom: false,
      usageCount: 67,
      rating: 4.7,
      tags: ["лендинг", "медицина", "здоровье", "продажи"],
      createdAt: new Date("2024-01-25")
    },
    {
      id: "4",
      title: "Пост для финансового блога",
      description: "Информативный пост о финансовой грамотности",
      category: "social",
      niche: "finance",
      contentType: "social",
      settings: {
        tone: "informative",
        audience: "general",
        length: [300],
        includeEmoji: true,
        includeCTA: true,
        seoOptimized: false
      },
      prompt: "Напиши пост для соцсетей на финансовую тему [ТЕМА]. Структура:\n- Хук: интригующий факт или вопрос\n- Проблема: с чем сталкиваются люди\n- Решение: простые шаги\n- Практический совет\n- Призыв к обсуждению\n- Хэштеги: #финансы #инвестиции #деньги\nТон: понятный, мотивирующий\nИспользуй эмодзи для структуры",
      keywords: "финансы, инвестиции, деньги, бюджет",
      isCustom: false,
      usageCount: 134,
      rating: 4.5,
      tags: ["соцсети", "финансы", "образование", "инвестиции"],
      createdAt: new Date("2024-02-01")
    },
    {
      id: "5",
      title: "Описание для ресторана",
      description: "Аппетитное описание блюд и атмосферы заведения",
      category: "product",
      niche: "food",
      contentType: "product",
      settings: {
        tone: "persuasive",
        audience: "b2c",
        length: [800],
        includeEmoji: true,
        includeCTA: true,
        seoOptimized: true
      },
      prompt: "Создай описание для ресторана [НАЗВАНИЕ] специализирующегося на [КУХНЯ]. Включи:\n- Атмосферу и концепцию заведения\n- Фирменные блюда с аппетитными описаниями\n- Особенности кухни и ингредиентов\n- Целевые события (романтический ужин, бизнес-ланч)\n- Локацию и удобства\n- Призыв к бронированию\nТон: теплый, гостеприимный, аппетитный\nИспользуй сенсорные описания",
      keywords: "ресторан, кухня, блюда, атмосфера",
      isCustom: false,
      usageCount: 78,
      rating: 4.9,
      tags: ["ресторан", "еда", "описание", "гостеприимство"],
      createdAt: new Date("2024-02-05")
    }
  ];

  const [templates, setTemplates] = useState<Template[]>(defaultTemplates);

  const categories = [
    { value: "all", label: "Все категории" },
    { value: "seo", label: "SEO" },
    { value: "landing", label: "Лендинги" },
    { value: "email", label: "Email" },
    { value: "social", label: "Соцсети" },
    { value: "product", label: "Товары" },
    { value: "blog", label: "Блог" }
  ];

  const niches = [
    { value: "all", label: "Все ниши" },
    { value: "tech", label: "IT и технологии" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "medical", label: "Медицина" },
    { value: "finance", label: "Финансы" },
    { value: "food", label: "Еда и рестораны" },
    { value: "beauty", label: "Красота" },
    { value: "education", label: "Образование" },
    { value: "real-estate", label: "Недвижимость" },
    { value: "automotive", label: "Автомобили" },
    { value: "travel", label: "Путешествия" }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    const matchesNiche = nicheFilter === "all" || template.niche === nicheFilter;
    return matchesSearch && matchesCategory && matchesNiche;
  });

  const handleCreateTemplate = () => {
    if (!newTemplate.title.trim() || !newTemplate.prompt.trim()) {
      toast({
        title: "Ошибка",
        description: "Заполните название и промпт шаблона",
        variant: "destructive"
      });
      return;
    }

    const template: Template = {
      id: Date.now().toString(),
      title: newTemplate.title,
      description: newTemplate.description,
      category: newTemplate.category,
      niche: newTemplate.niche,
      contentType: newTemplate.contentType,
      settings: {
        tone: newTemplate.tone,
        audience: newTemplate.audience,
        length: newTemplate.length,
        includeEmoji: newTemplate.includeEmoji,
        includeCTA: newTemplate.includeCTA,
        seoOptimized: newTemplate.seoOptimized
      },
      prompt: newTemplate.prompt,
      keywords: newTemplate.keywords,
      tags: newTemplate.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      isCustom: true,
      usageCount: 0,
      rating: 0,
      createdAt: new Date()
    };

    setTemplates(prev => [template, ...prev]);
    setNewTemplate({
      title: "",
      description: "",
      category: "",
      niche: "",
      contentType: "",
      prompt: "",
      keywords: "",
      tags: "",
      tone: "",
      audience: "",
      length: [1000],
      includeEmoji: false,
      includeCTA: true,
      seoOptimized: true
    });
    setShowCreateDialog(false);
    
    toast({
      title: "Шаблон создан",
      description: "Новый шаблон добавлен в библиотеку"
    });
  };

  const handleUseTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setTemplates(prev => prev.map(t => 
        t.id === templateId 
          ? { ...t, usageCount: t.usageCount + 1 }
          : t
      ));
      onApplyTemplate(template);
      toast({
        title: "Шаблон применен",
        description: "Настройки и промпт загружены в форму"
      });
    }
  };

  const handlePreviewTemplate = (template: Template) => {
    setPreviewTemplate(template);
    setShowPreviewDialog(true);
  };

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast({
      title: "Скопировано",
      description: "Промпт скопирован в буфер обмена"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Библиотека шаблонов</h3>
          <p className="text-slate-600">Готовые шаблоны для разных ниш и задач</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Создать шаблон
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Создать новый шаблон</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Название шаблона"
                  value={newTemplate.title}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, title: e.target.value }))}
                />
                <Input
                  placeholder="Описание"
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Select
                  value={newTemplate.category}
                  onValueChange={(value) => setNewTemplate(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Категория" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={newTemplate.niche}
                  onValueChange={(value) => setNewTemplate(prev => ({ ...prev, niche: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Ниша" />
                  </SelectTrigger>
                  <SelectContent>
                    {niches.slice(1).map(niche => (
                      <SelectItem key={niche.value} value={niche.value}>
                        {niche.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={newTemplate.contentType}
                  onValueChange={(value) => setNewTemplate(prev => ({ ...prev, contentType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Тип контента" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seo-article">SEO-статья</SelectItem>
                    <SelectItem value="landing">Лендинг</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="social">Соцсети</SelectItem>
                    <SelectItem value="product">Товар</SelectItem>
                    <SelectItem value="blog">Блог</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Textarea
                placeholder="Промпт шаблона"
                value={newTemplate.prompt}
                onChange={(e) => setNewTemplate(prev => ({ ...prev, prompt: e.target.value }))}
                rows={6}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Ключевые слова"
                  value={newTemplate.keywords}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, keywords: e.target.value }))}
                />
                <Input
                  placeholder="Теги через запятую"
                  value={newTemplate.tags}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, tags: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  value={newTemplate.tone}
                  onValueChange={(value) => setNewTemplate(prev => ({ ...prev, tone: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Тон" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Профессиональный</SelectItem>
                    <SelectItem value="friendly">Дружелюбный</SelectItem>
                    <SelectItem value="formal">Официальный</SelectItem>
                    <SelectItem value="casual">Неформальный</SelectItem>
                    <SelectItem value="persuasive">Убедительный</SelectItem>
                    <SelectItem value="informative">Информативный</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={newTemplate.audience}
                  onValueChange={(value) => setNewTemplate(prev => ({ ...prev, audience: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Аудитория" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="b2b">B2B</SelectItem>
                    <SelectItem value="b2c">B2C</SelectItem>
                    <SelectItem value="experts">Эксперты</SelectItem>
                    <SelectItem value="beginners">Новички</SelectItem>
                    <SelectItem value="general">Широкая аудитория</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newTemplate.includeEmoji}
                    onCheckedChange={(checked) => setNewTemplate(prev => ({ ...prev, includeEmoji: checked }))}
                  />
                  <Label>Эмодзи</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newTemplate.includeCTA}
                    onCheckedChange={(checked) => setNewTemplate(prev => ({ ...prev, includeCTA: checked }))}
                  />
                  <Label>Призыв к действию</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newTemplate.seoOptimized}
                    onCheckedChange={(checked) => setNewTemplate(prev => ({ ...prev, seoOptimized: checked }))}
                  />
                  <Label>SEO-оптимизация</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Отмена
                </Button>
                <Button onClick={handleCreateTemplate}>
                  Создать шаблон
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Фильтры */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Поиск шаблонов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={nicheFilter} onValueChange={setNicheFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {niches.map(niche => (
              <SelectItem key={niche.value} value={niche.value}>
                {niche.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Список шаблонов */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Library className="w-5 h-5 text-purple-600" />
                  <CardTitle className="text-lg">{template.title}</CardTitle>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {template.rating.toFixed(1)}
                  </div>
                  <span>{template.usageCount} использований</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">{template.description}</p>
              
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  {categories.find(c => c.value === template.category)?.label}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {niches.find(n => n.value === template.niche)?.label}
                </Badge>
                {template.tags.slice(0, 2).map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {template.isCustom && (
                  <Badge className="text-xs bg-purple-100 text-purple-800">
                    Пользовательский
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleUseTemplate(template.id)}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Использовать
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreviewTemplate(template)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyPrompt(template.prompt)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                
                {template.isCustom && (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Library className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <p className="text-lg font-medium text-slate-600 mb-2">Шаблоны не найдены</p>
          <p className="text-sm text-slate-500">Попробуйте изменить параметры поиска</p>
        </div>
      )}

      {/* Диалог предпросмотра */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Предпросмотр шаблона</DialogTitle>
          </DialogHeader>
          {previewTemplate && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{previewTemplate.title}</h3>
                <p className="text-slate-600">{previewTemplate.description}</p>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Badge>{categories.find(c => c.value === previewTemplate.category)?.label}</Badge>
                <Badge variant="outline">{niches.find(n => n.value === previewTemplate.niche)?.label}</Badge>
                {previewTemplate.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>

              <div>
                <Label className="text-sm font-medium">Промпт:</Label>
                <div className="bg-slate-50 p-3 rounded-lg mt-1">
                  <pre className="text-sm whitespace-pre-wrap font-mono">
                    {previewTemplate.prompt}
                  </pre>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Настройки:</Label>
                  <div className="text-sm space-y-1 mt-1">
                    <div>Тон: {previewTemplate.settings.tone}</div>
                    <div>Аудитория: {previewTemplate.settings.audience}</div>
                    <div>Длина: {previewTemplate.settings.length[0]} символов</div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Опции:</Label>
                  <div className="text-sm space-y-1 mt-1">
                    <div>Эмодзи: {previewTemplate.settings.includeEmoji ? "Да" : "Нет"}</div>
                    <div>CTA: {previewTemplate.settings.includeCTA ? "Да" : "Нет"}</div>
                    <div>SEO: {previewTemplate.settings.seoOptimized ? "Да" : "Нет"}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowPreviewDialog(false)}>
                  Закрыть
                </Button>
                <Button 
                  onClick={() => {
                    handleUseTemplate(previewTemplate.id);
                    setShowPreviewDialog(false);
                  }}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Использовать шаблон
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
