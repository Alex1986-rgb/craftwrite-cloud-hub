
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Star, Plus, Search, Filter, Copy, Edit, Trash2 } from "lucide-react";

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
  isCustom: boolean;
  isFavorite: boolean;
}

interface TemplateLibraryProps {
  onApplyTemplate: (template: Template) => void;
}

export default function TemplateLibrary({ onApplyTemplate }: TemplateLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const defaultTemplates: Template[] = [
    {
      id: "1",
      name: "SEO-статья для блога",
      description: "Оптимизированная статья для поискового продвижения",
      category: "seo",
      prompt: "Напиши SEO-оптимизированную статью на тему [ТЕМА]. Включи ключевые слова естественным образом, создай привлекательные заголовки и подзаголовки. Структурируй контент для лучшей читабельности.",
      settings: {
        textType: "seo-article",
        length: 2500,
        tone: "informative",
        audience: "general",
        seoOptimized: true,
        includeCTA: false
      },
      isCustom: false,
      isFavorite: true
    },
    {
      id: "2",
      name: "Продающий лендинг",
      description: "Конверсионная страница для продукта или услуги",
      category: "landing",
      prompt: "Создай продающий текст для лендинга [ПРОДУКТ/УСЛУГА]. Сфокусируйся на выгодах для клиента, преодолении возражений и мотивации к действию. Включи социальные доказательства.",
      settings: {
        textType: "landing",
        length: 1500,
        tone: "persuasive",
        audience: "b2c",
        seoOptimized: true,
        includeCTA: true
      },
      isCustom: false,
      isFavorite: false
    },
    {
      id: "3",
      name: "Email-рассылка",
      description: "Письмо для email-маркетинга",
      category: "email",
      prompt: "Напиши email для рассылки на тему [ТЕМА]. Создай цепляющую тему письма, персонализированное обращение и четкий призыв к действию. Учти мобильное отображение.",
      settings: {
        textType: "email",
        length: 800,
        tone: "friendly",
        audience: "b2c",
        seoOptimized: false,
        includeCTA: true
      },
      isCustom: false,
      isFavorite: true
    },
    {
      id: "4",
      name: "Пост для соцсетей",
      description: "Вирусный контент для социальных платформ",
      category: "social",
      prompt: "Создай вирусный пост для социальных сетей на тему [ТЕМА]. Используй эмоциональные триггеры, актуальные тренды и хэштеги. Адаптируй под формат платформы.",
      settings: {
        textType: "social",
        length: 300,
        tone: "casual",
        audience: "general",
        seoOptimized: false,
        includeCTA: false
      },
      isCustom: false,
      isFavorite: false
    },
    {
      id: "5",
      name: "Описание товара",
      description: "Коммерческое описание для интернет-магазина",
      category: "product",
      prompt: "Напиши продающее описание товара [ТОВАР]. Выдели уникальные характеристики, преимущества и применение. Включи технические характеристики и эмоциональные выгоды.",
      settings: {
        textType: "product",
        length: 600,
        tone: "professional",
        audience: "b2c",
        seoOptimized: true,
        includeCTA: true
      },
      isCustom: false,
      isFavorite: false
    }
  ];

  const [templates, setTemplates] = useState<Template[]>(defaultTemplates);

  const categories = [
    { value: "all", label: "Все категории" },
    { value: "seo", label: "SEO" },
    { value: "landing", label: "Лендинги" },
    { value: "email", label: "Email-маркетинг" },
    { value: "social", label: "Соцсети" },
    { value: "product", label: "Товары" },
    { value: "blog", label: "Блог" }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (templateId: string) => {
    setTemplates(prev => prev.map(template => 
      template.id === templateId 
        ? { ...template, isFavorite: !template.isFavorite }
        : template
    ));
  };

  const handleCreateTemplate = () => {
    // Логика создания нового шаблона
    setShowCreateDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Библиотека шаблонов</h3>
          <p className="text-slate-600">Готовые шаблоны для быстрой генерации контента</p>
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
              <Input placeholder="Название шаблона" />
              <Textarea placeholder="Описание шаблона" rows={2} />
              <Select>
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
              <Textarea placeholder="Промпт шаблона" rows={4} />
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
      </div>

      {/* Список шаблонов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
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
                {template.settings.seoOptimized && (
                  <Badge variant="outline" className="text-xs text-green-600">
                    SEO
                  </Badge>
                )}
                {template.isCustom && (
                  <Badge className="text-xs bg-purple-100 text-purple-800">
                    Пользовательский
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => onApplyTemplate(template)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  Применить
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
                {template.isCustom && (
                  <>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <p className="text-lg font-medium text-slate-600 mb-2">Шаблоны не найдены</p>
          <p className="text-sm text-slate-500">Попробуйте изменить параметры поиска</p>
        </div>
      )}
    </div>
  );
}
