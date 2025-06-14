
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Plus, Copy, Edit, Trash2, Search, ThumbsUp } from "lucide-react";

interface PromptItem {
  id: string;
  title: string;
  prompt: string;
  category: string;
  tags: string[];
  isCustom: boolean;
  usageCount: number;
  rating: number;
}

interface PromptLibraryProps {
  onSelectPrompt: (prompt: string) => void;
}

export default function PromptLibrary({ onSelectPrompt }: PromptLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newPrompt, setNewPrompt] = useState({
    title: "",
    prompt: "",
    category: "",
    tags: ""
  });

  const defaultPrompts: PromptItem[] = [
    {
      id: "1",
      title: "SEO-оптимизированная статья",
      prompt: "Напиши SEO-оптимизированную статью на тему [ТЕМА] объемом [ОБЪЕМ] слов. Включи:\n- Привлекательный заголовок с ключевым словом\n- Структурированные подзаголовки H2-H3\n- Естественное вхождение ключевых слов: [КЛЮЧЕВЫЕ_СЛОВА]\n- Мета-описание до 160 символов\n- Призыв к действию в конце",
      category: "seo",
      tags: ["seo", "статья", "блог", "ключевые слова"],
      isCustom: false,
      usageCount: 127,
      rating: 4.8
    },
    {
      id: "2",
      title: "Продающий лендинг",
      prompt: "Создай продающую страницу для [ПРОДУКТ/УСЛУГА]. Структура:\n- Цепляющий заголовок с УТП\n- Описание проблемы клиента\n- Представление решения\n- Выгоды и преимущества (минимум 5)\n- Социальные доказательства\n- Преодоление возражений\n- Сильный призыв к действию\n- Гарантии и риски",
      category: "landing",
      tags: ["лендинг", "продажи", "конверсия", "утп"],
      isCustom: false,
      usageCount: 89,
      rating: 4.9
    },
    {
      id: "3",
      title: "Email-последовательность",
      prompt: "Создай последовательность из [КОЛИЧЕСТВО] писем для email-маркетинга на тему [ТЕМА]. Для каждого письма включи:\n- Цепляющую тему письма\n- Персонализированное приветствие\n- Ценный контент\n- Мягкий призыв к действию\n- P.S. с дополнительной мотивацией\nТон: [ТОН]",
      category: "email",
      tags: ["email", "рассылка", "последовательность", "маркетинг"],
      isCustom: false,
      usageCount: 64,
      rating: 4.6
    },
    {
      id: "4",
      title: "Вирусный пост для соцсетей",
      prompt: "Создай вирусный пост для [ПЛАТФОРМА] на тему [ТЕМА]. Включи:\n- Хук в первых 3 словах\n- Эмоциональную историю или факт\n- Ценный инсайт или совет\n- Вопрос для вовлечения\n- Релевантные хэштеги (5-10)\n- Призыв к взаимодействию\nСтиль: [СТИЛЬ]",
      category: "social",
      tags: ["соцсети", "вирусный", "вовлечение", "хэштеги"],
      isCustom: false,
      usageCount: 156,
      rating: 4.7
    },
    {
      id: "5",
      title: "Описание товара для маркетплейса",
      prompt: "Напиши продающее описание для товара [ТОВАР] на маркетплейсе. Включи:\n- Привлекательный заголовок с ключевыми словами\n- Основные характеристики и выгоды\n- Область применения\n- Преимущества перед конкурентами\n- Технические характеристики\n- Гарантии и условия доставки\nИспользуй ключевые слова: [КЛЮЧЕВЫЕ_СЛОВА]",
      category: "product",
      tags: ["товар", "маркетплейс", "описание", "характеристики"],
      isCustom: false,
      usageCount: 93,
      rating: 4.5
    }
  ];

  const [prompts, setPrompts] = useState<PromptItem[]>(defaultPrompts);

  const categories = [
    { value: "all", label: "Все категории" },
    { value: "seo", label: "SEO" },
    { value: "landing", label: "Лендинги" },
    { value: "email", label: "Email" },
    { value: "social", label: "Соцсети" },
    { value: "product", label: "Товары" },
    { value: "blog", label: "Блог" }
  ];

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || prompt.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCreatePrompt = () => {
    if (!newPrompt.title.trim() || !newPrompt.prompt.trim()) return;

    const prompt: PromptItem = {
      id: Date.now().toString(),
      title: newPrompt.title,
      prompt: newPrompt.prompt,
      category: newPrompt.category,
      tags: newPrompt.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      isCustom: true,
      usageCount: 0,
      rating: 0
    };

    setPrompts(prev => [prompt, ...prev]);
    setNewPrompt({ title: "", prompt: "", category: "", tags: "" });
    setShowCreateDialog(false);
  };

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
  };

  const usePrompt = (promptId: string) => {
    const prompt = prompts.find(p => p.id === promptId);
    if (prompt) {
      setPrompts(prev => prev.map(p => 
        p.id === promptId 
          ? { ...p, usageCount: p.usageCount + 1 }
          : p
      ));
      onSelectPrompt(prompt.prompt);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Библиотека промптов</h3>
          <p className="text-slate-600">Готовые промпты для эффективной генерации</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Создать промпт
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Создать новый промпт</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Название промпта"
                value={newPrompt.title}
                onChange={(e) => setNewPrompt(prev => ({ ...prev, title: e.target.value }))}
              />
              <Select
                value={newPrompt.category}
                onValueChange={(value) => setNewPrompt(prev => ({ ...prev, category: value }))}
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
              <Textarea
                placeholder="Текст промпта"
                value={newPrompt.prompt}
                onChange={(e) => setNewPrompt(prev => ({ ...prev, prompt: e.target.value }))}
                rows={6}
              />
              <Input
                placeholder="Теги через запятую"
                value={newPrompt.tags}
                onChange={(e) => setNewPrompt(prev => ({ ...prev, tags: e.target.value }))}
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Отмена
                </Button>
                <Button onClick={handleCreatePrompt}>
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
            placeholder="Поиск промптов..."
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

      {/* Список промптов */}
      <div className="space-y-4">
        {filteredPrompts.map((prompt) => (
          <Card key={prompt.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  <CardTitle className="text-lg">{prompt.title}</CardTitle>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {prompt.rating.toFixed(1)}
                  </div>
                  <span>{prompt.usageCount} использований</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-lg">
                <pre className="text-sm whitespace-pre-wrap font-mono">
                  {prompt.prompt}
                </pre>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {categories.find(c => c.value === prompt.category)?.label}
                  </Badge>
                  {prompt.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {prompt.isCustom && (
                    <Badge className="text-xs bg-purple-100 text-purple-800">
                      Пользовательский
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => usePrompt(prompt.id)}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Использовать
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyPrompt(prompt.prompt)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  {prompt.isCustom && (
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
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrompts.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <p className="text-lg font-medium text-slate-600 mb-2">Промпты не найдены</p>
          <p className="text-sm text-slate-500">Попробуйте изменить параметры поиска</p>
        </div>
      )}
    </div>
  );
}
