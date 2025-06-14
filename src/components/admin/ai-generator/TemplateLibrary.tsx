import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FileText, Star, Plus, Search, Filter, Copy, Edit, Trash2, TrendingUp, Users, Mail, MessageSquare, ShoppingBag, PenTool, Newspaper, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  prompt: string;
  settings: {
    textType: string;
    length: number;
    tone: string;
    audience: string;
    seoOptimized: boolean;
    includeCTA: boolean;
  };
  tags: string[];
  isCustom: boolean;
  isFavorite: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
}

interface TemplateLibraryProps {
  onApplyTemplate: (template: Template) => void;
}

export default function TemplateLibrary({ onApplyTemplate }: TemplateLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    category: "",
    prompt: "",
    tags: ""
  });
  const { toast } = useToast();

  const defaultTemplates: Template[] = [
    {
      id: "seo-article-comprehensive",
      name: "Комплексная SEO-статья",
      description: "Полноценная SEO-оптимизированная статья с разделами, подзаголовками и призывами",
      category: "seo",
      prompt: "Напиши комплексную SEO-статью на тему [ТЕМА]. Структура: введение, 3-5 основных разделов с подзаголовками H2-H3, заключение. Естественно интегрируй ключевые слова [КЛЮЧЕВЫЕ СЛОВА]. Добавь мета-описание, FAQ секцию и призыв к действию.",
      settings: {
        textType: "seo-article",
        length: 3500,
        tone: "informative",
        audience: "general",
        seoOptimized: true,
        includeCTA: true
      },
      tags: ["seo", "длинный контент", "структурированный"],
      isCustom: false,
      isFavorite: true,
      difficulty: "medium",
      estimatedTime: "15-20 мин"
    },
    {
      id: "landing-saas",
      name: "Лендинг для SaaS",
      description: "Продающая страница для SaaS продукта с акцентом на выгоды и преодоление возражений",
      category: "landing",
      prompt: "Создай продающий лендинг для SaaS продукта [ПРОДУКТ]. Структура: проблема целевой аудитории, решение, ключевые преимущества, социальные доказательства, тарифные планы, FAQ, сильный CTA. Используй принципы конверсионного копирайтинга.",
      settings: {
        textType: "landing",
        length: 2000,
        tone: "persuasive",
        audience: "b2b",
        seoOptimized: true,
        includeCTA: true
      },
      tags: ["saas", "b2b", "конверсия", "преодоление возражений"],
      isCustom: false,
      isFavorite: true,
      difficulty: "hard",
      estimatedTime: "25-30 мин"
    },
    {
      id: "email-welcome-sequence",
      name: "Цепочка приветственных писем",
      description: "Серия из 5 писем для новых подписчиков с постепенным вовлечением",
      category: "email",
      prompt: "Создай цепочку из 5 приветственных писем для новых подписчиков [НИША]. Письмо 1: добро пожаловать + бонус, 2: история бренда, 3: социальные доказательства, 4: полезные советы, 5: мягкое предложение. Каждое письмо 300-500 слов.",
      settings: {
        textType: "email",
        length: 2000,
        tone: "friendly",
        audience: "b2c",
        seoOptimized: false,
        includeCTA: true
      },
      tags: ["последовательность", "вовлечение", "автоматизация"],
      isCustom: false,
      isFavorite: false,
      difficulty: "hard",
      estimatedTime: "30-40 мин"
    },
    {
      id: "social-instagram-carousel",
      name: "Карусель для Instagram",
      description: "Образовательная карусель из 10 слайдов для Instagram",
      category: "social",
      prompt: "Создай контент для образовательной карусели Instagram на тему [ТЕМА]. 10 слайдов: 1-обложка с крючком, 2-9 основной контент (советы/факты), 10-призыв к действию. Каждый слайд 1-2 предложения. Используй эмодзи и хештеги.",
      settings: {
        textType: "social",
        length: 500,
        tone: "casual",
        audience: "general",
        seoOptimized: false,
        includeCTA: true
      },
      tags: ["карусель", "образование", "визуальный контент"],
      isCustom: false,
      isFavorite: true,
      difficulty: "easy",
      estimatedTime: "10-15 мин"
    },
    {
      id: "product-ecommerce",
      name: "Карточка товара для e-commerce",
      description: "Продающее описание товара с характеристиками и выгодами",
      category: "product",
      prompt: "Создай продающее описание товара [ТОВАР] для интернет-магазина. Включи: краткое описание, ключевые характеристики, преимущества для покупателя, способы применения, технические характеристики в таблице, гарантии и условия доставки.",
      settings: {
        textType: "product",
        length: 800,
        tone: "professional",
        audience: "b2c",
        seoOptimized: true,
        includeCTA: true
      },
      tags: ["ecommerce", "продажи", "характеристики"],
      isCustom: false,
      isFavorite: false,
      difficulty: "medium",
      estimatedTime: "15-20 мин"
    },
    {
      id: "blog-howto-guide",
      name: "Пошаговое руководство",
      description: "Детальный гайд 'Как сделать' с практическими шагами",
      category: "blog",
      prompt: "Напиши пошаговое руководство 'Как [ДЕЙСТВИЕ]'. Структура: введение с проблемой, список необходимых инструментов/материалов, детальные шаги с объяснениями, советы по оптимизации, возможные ошибки и их решения, заключение.",
      settings: {
        textType: "blog",
        length: 2500,
        tone: "informative",
        audience: "beginners",
        seoOptimized: true,
        includeCTA: false
      },
      tags: ["гайд", "инструкция", "практика"],
      isCustom: false,
      isFavorite: true,
      difficulty: "medium",
      estimatedTime: "20-25 мин"
    },
    {
      id: "press-release-product",
      name: "Пресс-релиз о продукте",
      description: "Официальный пресс-релиз о запуске нового продукта",
      category: "press-release",
      prompt: "Создай пресс-релиз о запуске [ПРОДУКТ/УСЛУГА]. Структура: заголовок, подзаголовок, город и дата, лид-абзац с ключевой информацией, основной текст с деталями, цитаты руководителей, информация о компании, контакты для СМИ.",
      settings: {
        textType: "press-release",
        length: 1200,
        tone: "formal",
        audience: "b2b",
        seoOptimized: false,
        includeCTA: false
      },
      tags: ["официальный", "медиа", "анонс"],
      isCustom: false,
      isFavorite: false,
      difficulty: "hard",
      estimatedTime: "20-25 мин"
    },
    {
      id: "case-study-template",
      name: "Кейс-стади клиента",
      description: "Детальный разбор успешного проекта с клиентом",
      category: "case-study",
      prompt: "Напиши кейс-стади успешного проекта. Структура: краткое описание клиента и его задач, вызовы и проблемы, предложенное решение, процесс внедрения, конкретные результаты с цифрами, выводы и уроки, рекомендации клиента.",
      settings: {
        textType: "case-study",
        length: 1800,
        tone: "professional",
        audience: "b2b",
        seoOptimized: true,
        includeCTA: true
      },
      tags: ["доказательства", "результаты", "b2b"],
      isCustom: false,
      isFavorite: false,
      difficulty: "hard",
      estimatedTime: "25-30 мин"
    }
  ];

  const [templates, setTemplates] = useState<Template[]>(defaultTemplates);

  const categories = [
    { value: "all", label: "Все категории", icon: FileText },
    { value: "seo", label: "SEO", icon: TrendingUp },
    { value: "landing", label: "Лендинги", icon: Users },
    { value: "email", label: "Email-маркетинг", icon: Mail },
    { value: "social", label: "Соцсети", icon: MessageSquare },
    { value: "product", label: "Товары", icon: ShoppingBag },
    { value: "blog", label: "Блог", icon: PenTool },
    { value: "press-release", label: "Пресс-релизы", icon: Newspaper },
    { value: "case-study", label: "Кейс-стади", icon: Briefcase }
  ];

  const difficulties = [
    { value: "all", label: "Все уровни" },
    { value: "easy", label: "Легкий", color: "green" },
    { value: "medium", label: "Средний", color: "yellow" },
    { value: "hard", label: "Сложный", color: "red" }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === "all" || template.difficulty === difficultyFilter;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const toggleFavorite = (templateId: string) => {
    setTemplates(prev => prev.map(template => 
      template.id === templateId 
        ? { ...template, isFavorite: !template.isFavorite }
        : template
    ));
  };

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.prompt) {
      toast({
        title: "Ошибка",
        description: "Заполните название и промпт шаблона",
        variant: "destructive"
      });
      return;
    }

    const template: Template = {
      id: Date.now().toString(),
      name: newTemplate.name,
      description: newTemplate.description,
      category: newTemplate.category || "blog",
      prompt: newTemplate.prompt,
      settings: {
        textType: newTemplate.category || "blog",
        length: 1500,
        tone: "informative",
        audience: "general",
        seoOptimized: true,
        includeCTA: false
      },
      tags: newTemplate.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      isCustom: true,
      isFavorite: false,
      difficulty: "medium",
      estimatedTime: "15-20 мин"
    };

    setTemplates(prev => [template, ...prev]);
    setNewTemplate({ name: "", description: "", category: "", prompt: "", tags: "" });
    setShowCreateDialog(false);
    
    toast({
      title: "Шаблон создан",
      description: "Новый шаблон добавлен в библиотеку"
    });
  };

  const deleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
    toast({
      title: "Шаблон удален",
      description: "Шаблон удален из библиотеки"
    });
  };

  const duplicateTemplate = (template: Template) => {
    const newTemplate: Template = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (копия)`,
      isCustom: true,
      isFavorite: false
    };
    setTemplates(prev => [newTemplate, ...prev]);
    toast({
      title: "Шаблон скопирован",
      description: "Создана копия шаблона"
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'hard': return 'text-red-600 bg-red-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Библиотека шаблонов</h3>
          <p className="text-slate-600">Готовые шаблоны для быстрой генерации профессионального контента</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Создать шаблон
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Создать новый шаблон</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="template-name">Название шаблона</Label>
                <Input
                  id="template-name"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate(prev => ({...prev, name: e.target.value}))}
                  placeholder="Название шаблона"
                />
              </div>
              <div>
                <Label htmlFor="template-description">Описание</Label>
                <Input
                  id="template-description"
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate(prev => ({...prev, description: e.target.value}))}
                  placeholder="Описание шаблона"
                />
              </div>
              <div>
                <Label htmlFor="template-category">Категория</Label>
                <Select value={newTemplate.category} onValueChange={(value) => setNewTemplate(prev => ({...prev, category: value}))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="template-tags">Теги (через запятую)</Label>
                <Input
                  id="template-tags"
                  value={newTemplate.tags}
                  onChange={(e) => setNewTemplate(prev => ({...prev, tags: e.target.value}))}
                  placeholder="seo, продажи, быстрый"
                />
              </div>
              <div>
                <Label htmlFor="template-prompt">Промпт шаблона</Label>
                <Textarea
                  id="template-prompt"
                  value={newTemplate.prompt}
                  onChange={(e) => setNewTemplate(prev => ({...prev, prompt: e.target.value}))}
                  placeholder="Напиши [ТИП КОНТЕНТА] на тему [ТЕМА]..."
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Отмена
                </Button>
                <Button onClick={handleCreateTemplate}>
                  Создать
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Расширенные фильтры */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Поиск по названию, описанию, тегам..."
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
                <div className="flex items-center gap-2">
                  <category.icon className="w-4 h-4" />
                  {category.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {difficulties.map(diff => (
              <SelectItem key={diff.value} value={diff.value}>
                {diff.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Список шаблонов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => {
          const CategoryIcon = categories.find(c => c.value === template.category)?.icon || FileText;
          
          return (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <CategoryIcon className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(template.id)}
                    className="p-1"
                  >
                    <Star 
                      className={`w-4 h-4 ${
                        template.isFavorite 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-slate-400'
                      }`} 
                    />
                  </Button>
                </div>
                <p className="text-sm text-slate-600">{template.description}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {categories.find(c => c.value === template.category)?.label}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {template.settings.length} символов
                  </Badge>
                  <Badge className={`text-xs ${getDifficultyColor(template.difficulty)}`}>
                    {difficulties.find(d => d.value === template.difficulty)?.label}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {template.estimatedTime}
                  </Badge>
                </div>

                {template.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {template.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {template.tags.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{template.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => onApplyTemplate(template)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    size="sm"
                  >
                    Применить
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => duplicateTemplate(template)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  {template.isCustom && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600"
                      onClick={() => deleteTemplate(template.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <p className="text-lg font-medium text-slate-600 mb-2">Шаблоны не найдены</p>
          <p className="text-sm text-slate-500">Попробуйте изменить параметры поиска или создать новый шаблон</p>
        </div>
      )}
    </div>
  );
}
