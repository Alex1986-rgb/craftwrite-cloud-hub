
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MessageSquare, Plus, Copy, Edit, Trash2, Search, ThumbsUp, BookOpen, Star, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PromptItem {
  id: string;
  title: string;
  prompt: string;
  category: string;
  niche: string;
  difficulty: string;
  tags: string[];
  isCustom: boolean;
  usageCount: number;
  rating: number;
  description: string;
  examples?: string[];
  createdAt: Date;
}

interface PromptLibraryProps {
  onSelectPrompt: (prompt: string) => void;
}

export default function PromptLibrary({ onSelectPrompt }: PromptLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [nicheFilter, setNicheFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [previewPrompt, setPreviewPrompt] = useState<PromptItem | null>(null);
  const [newPrompt, setNewPrompt] = useState({
    title: "",
    description: "",
    prompt: "",
    category: "",
    niche: "",
    difficulty: "",
    tags: "",
    examples: ""
  });
  const { toast } = useToast();

  const defaultPrompts: PromptItem[] = [
    {
      id: "1",
      title: "SEO-оптимизированная статья",
      description: "Создание статей с правильной структурой и ключевыми словами",
      prompt: "Напиши SEO-оптимизированную статью на тему [ТЕМА] объемом [ОБЪЕМ] слов. Включи:\n- Привлекательный заголовок с ключевым словом\n- Структурированные подзаголовки H2-H3\n- Естественное вхождение ключевых слов: [КЛЮЧЕВЫЕ_СЛОВА]\n- Мета-описание до 160 символов\n- Призыв к действию в конце\n\nСтруктура:\n1. Введение с хуком\n2. Основные разделы с подзаголовками\n3. Практические советы\n4. Заключение с выводами",
      category: "seo",
      niche: "universal",
      difficulty: "intermediate",
      tags: ["seo", "статья", "блог", "ключевые слова", "структура"],
      isCustom: false,
      usageCount: 127,
      rating: 4.8,
      examples: [
        "Статья 'Как выбрать CRM-систему' для IT-блога",
        "Материал 'Топ-10 трендов веб-дизайна' для агентства"
      ],
      createdAt: new Date("2024-01-15")
    },
    {
      id: "2",
      title: "Продающий лендинг с психологией",
      description: "Создание конверсионных страниц с применением психологических триггеров",
      prompt: "Создай продающую страницу для [ПРОДУКТ/УСЛУГА] с использованием психологических триггеров. Структура:\n\n🎯 ЗАГОЛОВОК:\n- УТП + выгода для клиента\n- Цифры и конкретика\n\n😰 ПРОБЛЕМА:\n- Боли целевой аудитории\n- Последствия бездействия\n- Эмоциональное воздействие\n\n✅ РЕШЕНИЕ:\n- Представление продукта как спасения\n- Простота использования\n- Быстрый результат\n\n💎 ВЫГОДЫ (минимум 5):\n- Конкретные преимущества\n- Результаты в цифрах\n- Экономия времени/денег\n\n👥 СОЦИАЛЬНЫЕ ДОКАЗАТЕЛЬСТВА:\n- Отзывы клиентов с фото\n- Кейсы и результаты\n- Логотипы компаний\n\n⚡ ПРИЗЫВ К ДЕЙСТВИЮ:\n- Ограниченное предложение\n- Бонусы за быстрое решение\n- Простая форма заказа",
      category: "landing",
      niche: "sales",
      difficulty: "advanced",
      tags: ["лендинг", "продажи", "конверсия", "психология", "триггеры"],
      isCustom: false,
      usageCount: 89,
      rating: 4.9,
      examples: [
        "Лендинг для онлайн-курса по маркетингу",
        "Страница продажи консультационных услуг"
      ],
      createdAt: new Date("2024-01-20")
    },
    {
      id: "3",
      title: "Email-последовательность nurturing",
      description: "Серия писем для прогрева аудитории и построения доверия",
      prompt: "Создай последовательность из [КОЛИЧЕСТВО] писем для прогрева подписчиков на тему [ТЕМА]. \n\nДля каждого письма:\n\n📧 ПИСЬМО №[N]:\n📌 Тема: [Цепляющая тема без спама]\n👋 Приветствие: Персонализированное обращение\n💡 Ценность: Полезный контент/инсайт\n📖 История: Личный опыт или кейс\n🎯 Мягкий CTA: Ненавязчивый призыв\n✨ P.S.: Дополнительная мотивация\n\nТон: [ТОН]\nЦель последовательности: [ЦЕЛЬ]\n\nПрогрессия писем:\n1. Знакомство и первая ценность\n2. Углубление в проблему\n3. Решение + социальные доказательства\n4. Преодоление возражений\n5. Мягкое предложение",
      category: "email",
      niche: "marketing",
      difficulty: "intermediate",
      tags: ["email", "рассылка", "последовательность", "nurturing", "воронка"],
      isCustom: false,
      usageCount: 64,
      rating: 4.6,
      examples: [
        "Серия для IT-агентства о цифровой трансформации",
        "Последовательность для фитнес-тренера"
      ],
      createdAt: new Date("2024-01-25")
    },
    {
      id: "4",
      title: "Вирусный пост для соцсетей",
      description: "Контент с высоким потенциалом виральности и вовлечения",
      prompt: "Создай вирусный пост для [ПЛАТФОРМА] на тему [ТЕМА]. \n\n🪝 ХУК (первые 3 слова):\n- Интригующий факт\n- Провокационный вопрос\n- Неожиданное утверждение\n\n📖 ИСТОРИЯ/ФАКТ:\n- Эмоциональная подача\n- Релевантность аудитории\n- Личный опыт или кейс\n\n💡 ИНСАЙТ:\n- Ценный совет\n- Неочевидная связь\n- Практическое применение\n\n🤔 ВОВЛЕЧЕНИЕ:\n- Вопрос для комментариев\n- Призыв поделиться мнением\n- Просьба отметить друзей\n\n#️⃣ ХЭШТЕГИ (5-10):\n- Популярные по теме\n- Нишевые для таргетинга\n- Брендовые\n\nСтиль: [СТИЛЬ]\nЭмодзи: Использовать для структуры\nДлина: Оптимальная для платформы",
      category: "social",
      niche: "content",
      difficulty: "intermediate",
      tags: ["соцсети", "вирусный", "вовлечение", "хэштеги", "контент"],
      isCustom: false,
      usageCount: 156,
      rating: 4.7,
      examples: [
        "Пост о мифах в маркетинге для LinkedIn",
        "История успеха клиента для Instagram"
      ],
      createdAt: new Date("2024-02-01")
    },
    {
      id: "5",
      title: "Описание товара для маркетплейса",
      description: "Продающие описания с учетом алгоритмов поисковых систем",
      prompt: "Напиши продающее описание для товара [ТОВАР] на маркетплейсе [ПЛАТФОРМА]. \n\n🎯 ЗАГОЛОВОК:\n- Ключевые слова в начале\n- Основные характеристики\n- УТП товара\n\n⭐ ОСНОВНЫЕ ВЫГОДЫ:\n- Решение проблем покупателя\n- Преимущества перед аналогами\n- Экономия времени/денег\n\n🔧 ХАРАКТЕРИСТИКИ:\n- Технические параметры\n- Размеры и вес\n- Материалы и качество\n\n✅ ПРИМЕНЕНИЕ:\n- Кому подходит\n- Где использовать\n- Сочетаемость с другими товарами\n\n🏆 КОНКУРЕНТНЫЕ ПРЕИМУЩЕСТВА:\n- Уникальные особенности\n- Сертификаты и гарантии\n- Награды и рейтинги\n\n📦 ДОСТАВКА И ГАРАНТИИ:\n- Условия доставки\n- Гарантийные обязательства\n- Возможность возврата\n\nКлючевые слова: [КЛЮЧЕВЫЕ_СЛОВА]\nДлина: 1000-1500 символов",
      category: "product",
      niche: "ecommerce",
      difficulty: "beginner",
      tags: ["товар", "маркетплейс", "описание", "характеристики", "продажи"],
      isCustom: false,
      usageCount: 93,
      rating: 4.5,
      examples: [
        "Описание смартфона для Wildberries",
        "Характеристики спортивной одежды для Ozon"
      ],
      createdAt: new Date("2024-02-05")
    },
    {
      id: "6",
      title: "Сторителлинг для бренда",
      description: "Создание эмоциональных историй для укрепления связи с аудиторией",
      prompt: "Создай брендовую историю для [КОМПАНИЯ] в стиле сторителлинг на тему [ТЕМА].\n\n📖 СТРУКТУРА ИСТОРИИ:\n\n🌟 ЭКСПОЗИЦИЯ:\n- Знакомство с героем (клиент/основатель)\n- Контекст и обстановка\n- Эмоциональная связь с аудиторией\n\n⚡ ЗАВЯЗКА:\n- Проблема или вызов\n- Внутренние сомнения\n- Момент принятия решения\n\n🔥 РАЗВИТИЕ:\n- Путь преодоления\n- Препятствия и их решение\n- Роль бренда в истории\n\n🎯 КУЛЬМИНАЦИЯ:\n- Переломный момент\n- Ключевое решение\n- Применение продукта/услуги\n\n✨ РАЗВЯЗКА:\n- Достигнутый результат\n- Трансформация героя\n- Эмоциональное завершение\n\n💎 МОРАЛЬ:\n- Ценности бренда\n- Применимость к аудитории\n- Призыв к действию\n\nТон: Искренний, вдохновляющий\nДлина: 500-800 слов\nЭмоции: [ЭМОЦИИ]",
      category: "brand",
      niche: "storytelling",
      difficulty: "advanced",
      tags: ["сторителлинг", "бренд", "эмоции", "история", "связь"],
      isCustom: false,
      usageCount: 45,
      rating: 4.9,
      examples: [
        "История создания стартапа для About-страницы",
        "Кейс трансформации клиента для рассылки"
      ],
      createdAt: new Date("2024-02-10")
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
    { value: "brand", label: "Бренд" },
    { value: "blog", label: "Блог" }
  ];

  const niches = [
    { value: "all", label: "Все ниши" },
    { value: "universal", label: "Универсальные" },
    { value: "sales", label: "Продажи" },
    { value: "marketing", label: "Маркетинг" },
    { value: "content", label: "Контент" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "storytelling", label: "Сторителлинг" },
    { value: "tech", label: "Технологии" },
    { value: "finance", label: "Финансы" },
    { value: "education", label: "Образование" }
  ];

  const difficulties = [
    { value: "all", label: "Любая сложность" },
    { value: "beginner", label: "Начинающий" },
    { value: "intermediate", label: "Средний" },
    { value: "advanced", label: "Продвинутый" }
  ];

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || prompt.category === categoryFilter;
    const matchesNiche = nicheFilter === "all" || prompt.niche === nicheFilter;
    const matchesDifficulty = difficultyFilter === "all" || prompt.difficulty === difficultyFilter;
    return matchesSearch && matchesCategory && matchesNiche && matchesDifficulty;
  });

  const handleCreatePrompt = () => {
    if (!newPrompt.title.trim() || !newPrompt.prompt.trim()) {
      toast({
        title: "Ошибка",
        description: "Заполните название и текст промпта",
        variant: "destructive"
      });
      return;
    }

    const prompt: PromptItem = {
      id: Date.now().toString(),
      title: newPrompt.title,
      description: newPrompt.description,
      prompt: newPrompt.prompt,
      category: newPrompt.category,
      niche: newPrompt.niche,
      difficulty: newPrompt.difficulty,
      tags: newPrompt.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      examples: newPrompt.examples ? newPrompt.examples.split('\n').filter(Boolean) : [],
      isCustom: true,
      usageCount: 0,
      rating: 0,
      createdAt: new Date()
    };

    setPrompts(prev => [prompt, ...prev]);
    setNewPrompt({
      title: "",
      description: "",
      prompt: "",
      category: "",
      niche: "",
      difficulty: "",
      tags: "",
      examples: ""
    });
    setShowCreateDialog(false);
    
    toast({
      title: "Промпт создан",
      description: "Новый промпт добавлен в библиотеку"
    });
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
      toast({
        title: "Промпт применен",
        description: "Промпт загружен в форму генерации"
      });
    }
  };

  const handlePreviewPrompt = (prompt: PromptItem) => {
    setPreviewPrompt(prompt);
    setShowPreviewDialog(true);
  };

  const copyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast({
      title: "Скопировано",
      description: "Промпт скопирован в буфер обмена"
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Библиотека промптов</h3>
          <p className="text-slate-600">Профессиональные промпты для эффективной генерации</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Создать промпт
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Создать новый промпт</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Название промпта"
                  value={newPrompt.title}
                  onChange={(e) => setNewPrompt(prev => ({ ...prev, title: e.target.value }))}
                />
                <Input
                  placeholder="Описание"
                  value={newPrompt.description}
                  onChange={(e) => setNewPrompt(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
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

                <Select
                  value={newPrompt.niche}
                  onValueChange={(value) => setNewPrompt(prev => ({ ...prev, niche: value }))}
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
                  value={newPrompt.difficulty}
                  onValueChange={(value) => setNewPrompt(prev => ({ ...prev, difficulty: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Сложность" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.slice(1).map(diff => (
                      <SelectItem key={diff.value} value={diff.value}>
                        {diff.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Textarea
                placeholder="Текст промпта"
                value={newPrompt.prompt}
                onChange={(e) => setNewPrompt(prev => ({ ...prev, prompt: e.target.value }))}
                rows={8}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Теги через запятую"
                  value={newPrompt.tags}
                  onChange={(e) => setNewPrompt(prev => ({ ...prev, tags: e.target.value }))}
                />
                <Textarea
                  placeholder="Примеры использования (каждый с новой строки)"
                  value={newPrompt.examples}
                  onChange={(e) => setNewPrompt(prev => ({ ...prev, examples: e.target.value }))}
                  rows={3}
                />
              </div>

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
      <div className="flex items-center gap-4 flex-wrap">
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
        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {difficulties.map(difficulty => (
              <SelectItem key={difficulty.value} value={difficulty.value}>
                {difficulty.label}
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
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {prompt.rating.toFixed(1)}
                  </div>
                  <span>{prompt.usageCount} использований</span>
                </div>
              </div>
              {prompt.description && (
                <p className="text-sm text-slate-600 mt-2">{prompt.description}</p>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-lg">
                <pre className="text-sm whitespace-pre-wrap font-mono line-clamp-4">
                  {prompt.prompt}
                </pre>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs">
                    {categories.find(c => c.value === prompt.category)?.label}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {niches.find(n => n.value === prompt.niche)?.label}
                  </Badge>
                  <Badge className={`text-xs ${getDifficultyColor(prompt.difficulty)}`}>
                    {difficulties.find(d => d.value === prompt.difficulty)?.label}
                  </Badge>
                  {prompt.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
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
                    onClick={() => handlePreviewPrompt(prompt)}
                  >
                    <Eye className="w-4 h-4" />
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
          <BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <p className="text-lg font-medium text-slate-600 mb-2">Промпты не найдены</p>
          <p className="text-sm text-slate-500">Попробуйте изменить параметры поиска</p>
        </div>
      )}

      {/* Диалог предпросмотра */}
      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Предпросмотр промпта</DialogTitle>
          </DialogHeader>
          {previewPrompt && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{previewPrompt.title}</h3>
                <p className="text-slate-600">{previewPrompt.description}</p>
              </div>

              <div className="flex gap-2 flex-wrap">
                <Badge>{categories.find(c => c.value === previewPrompt.category)?.label}</Badge>
                <Badge variant="outline">{niches.find(n => n.value === previewPrompt.niche)?.label}</Badge>
                <Badge className={getDifficultyColor(previewPrompt.difficulty)}>
                  {difficulties.find(d => d.value === previewPrompt.difficulty)?.label}
                </Badge>
                {previewPrompt.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>

              <div>
                <Label className="text-sm font-medium">Полный промпт:</Label>
                <div className="bg-slate-50 p-4 rounded-lg mt-1">
                  <pre className="text-sm whitespace-pre-wrap font-mono">
                    {previewPrompt.prompt}
                  </pre>
                </div>
              </div>

              {previewPrompt.examples && previewPrompt.examples.length > 0 && (
                <div>
                  <Label className="text-sm font-medium">Примеры использования:</Label>
                  <ul className="text-sm space-y-1 mt-1 list-disc list-inside">
                    {previewPrompt.examples.map((example, index) => (
                      <li key={index} className="text-slate-600">{example}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => copyPrompt(previewPrompt.prompt)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Копировать
                </Button>
                <Button variant="outline" onClick={() => setShowPreviewDialog(false)}>
                  Закрыть
                </Button>
                <Button 
                  onClick={() => {
                    usePrompt(previewPrompt.id);
                    setShowPreviewDialog(false);
                  }}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Использовать промпт
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
