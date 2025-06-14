
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Plus, Star, Edit, Trash2, Copy, Search, Filter, Tag, Clock, Target, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Preset {
  id: string;
  name: string;
  description: string;
  settings: {
    textType: string;
    length: number[];
    tone: string;
    audience: string;
    keywords: string;
    includeEmoji: boolean;
    includeCTA: boolean;
    seoOptimized: boolean;
  };
  tags: string[];
  category: string;
  isCustom: boolean;
  isFavorite: boolean;
  createdAt: string;
  usageCount: number;
}

interface PresetManagerProps {
  currentSettings: any;
  onApplyPreset: (preset: Preset) => void;
  onSavePreset: (preset: Omit<Preset, 'id' | 'createdAt'>) => void;
}

export default function PresetManager({ currentSettings, onApplyPreset, onSavePreset }: PresetManagerProps) {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [presetDescription, setPresetDescription] = useState("");
  const [presetTags, setPresetTags] = useState("");
  const [presetCategory, setPresetCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const { toast } = useToast();

  const defaultPresets: Preset[] = [
    {
      id: "seo-express",
      name: "SEO Экспресс",
      description: "Быстрая оптимизация для поисковых систем",
      settings: {
        textType: "seo-article",
        length: [2500],
        tone: "informative",
        audience: "general",
        keywords: "",
        includeEmoji: false,
        includeCTA: false,
        seoOptimized: true
      },
      tags: ["seo", "быстро", "оптимизация"],
      category: "seo",
      isCustom: false,
      isFavorite: true,
      createdAt: "2024-01-15",
      usageCount: 245
    },
    {
      id: "conversion-master",
      name: "Мастер конверсий",
      description: "Максимальная конверсия для продающих текстов",
      settings: {
        textType: "landing",
        length: [1500],
        tone: "persuasive",
        audience: "b2c",
        keywords: "",
        includeEmoji: false,
        includeCTA: true,
        seoOptimized: true
      },
      tags: ["конверсия", "продажи", "cta"],
      category: "sales",
      isCustom: false,
      isFavorite: true,
      createdAt: "2024-01-15",
      usageCount: 189
    },
    {
      id: "social-viral",
      name: "Вирусный контент",
      description: "Настройки для создания вирусного контента в соцсетях",
      settings: {
        textType: "social",
        length: [300],
        tone: "casual",
        audience: "general",
        keywords: "",
        includeEmoji: true,
        includeCTA: false,
        seoOptimized: false
      },
      tags: ["соцсети", "вирусный", "эмодзи"],
      category: "social",
      isCustom: false,
      isFavorite: true,
      createdAt: "2024-01-15",
      usageCount: 156
    },
    {
      id: "email-engagement",
      name: "Email вовлечение",
      description: "Высокое вовлечение в email-рассылках",
      settings: {
        textType: "email",
        length: [800],
        tone: "friendly",
        audience: "b2c",
        keywords: "",
        includeEmoji: false,
        includeCTA: true,
        seoOptimized: false
      },
      tags: ["email", "вовлечение", "дружелюбный"],
      category: "email",
      isCustom: false,
      isFavorite: false,
      createdAt: "2024-01-16",
      usageCount: 98
    },
    {
      id: "professional-b2b",
      name: "Профессиональный B2B",
      description: "Формальный стиль для корпоративной аудитории",
      settings: {
        textType: "blog",
        length: [2000],
        tone: "professional",
        audience: "b2b",
        keywords: "",
        includeEmoji: false,
        includeCTA: true,
        seoOptimized: true
      },
      tags: ["b2b", "профессиональный", "корпоративный"],
      category: "business",
      isCustom: false,
      isFavorite: false,
      createdAt: "2024-01-17",
      usageCount: 67
    },
    {
      id: "quick-product",
      name: "Быстрое описание товара",
      description: "Стандартные настройки для описания товаров",
      settings: {
        textType: "product",
        length: [600],
        tone: "professional",
        audience: "b2c",
        keywords: "",
        includeEmoji: false,
        includeCTA: true,
        seoOptimized: true
      },
      tags: ["товар", "ecommerce", "быстро"],
      category: "ecommerce",
      isCustom: false,
      isFavorite: false,
      createdAt: "2024-01-18",
      usageCount: 134
    }
  ];

  const [presets, setPresets] = useState<Preset[]>(defaultPresets);

  const categories = [
    { value: "all", label: "Все категории" },
    { value: "seo", label: "SEO" },
    { value: "sales", label: "Продажи" },
    { value: "social", label: "Соцсети" },
    { value: "email", label: "Email" },
    { value: "business", label: "Бизнес" },
    { value: "ecommerce", label: "E-commerce" }
  ];

  const sortOptions = [
    { value: "recent", label: "Недавние" },
    { value: "popular", label: "Популярные" },
    { value: "favorites", label: "Избранные" },
    { value: "name", label: "По названию" }
  ];

  const filteredAndSortedPresets = presets
    .filter(preset => {
      const matchesSearch = preset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           preset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           preset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = categoryFilter === "all" || preset.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.usageCount - a.usageCount;
        case "favorites":
          return (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0);
        case "name":
          return a.name.localeCompare(b.name);
        case "recent":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const toggleFavorite = (presetId: string) => {
    setPresets(prev => prev.map(preset => 
      preset.id === presetId 
        ? { ...preset, isFavorite: !preset.isFavorite }
        : preset
    ));
  };

  const handleSavePreset = () => {
    if (!presetName.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите название пресета",
        variant: "destructive"
      });
      return;
    }

    const newPreset: Omit<Preset, 'id' | 'createdAt'> = {
      name: presetName,
      description: presetDescription,
      settings: currentSettings,
      tags: presetTags.split(',').map(tag => tag.trim()).filter(Boolean),
      category: presetCategory || "other",
      isCustom: true,
      isFavorite: false,
      usageCount: 0
    };

    onSavePreset(newPreset);
    
    const preset: Preset = {
      ...newPreset,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setPresets(prev => [preset, ...prev]);

    setPresetName("");
    setPresetDescription("");
    setPresetTags("");
    setPresetCategory("");
    setShowSaveDialog(false);

    toast({
      title: "Пресет сохранен",
      description: "Новый пресет добавлен в коллекцию"
    });
  };

  const deletePreset = (presetId: string) => {
    setPresets(prev => prev.filter(p => p.id !== presetId));
    toast({
      title: "Пресет удален",
      description: "Пресет удален из коллекции"
    });
  };

  const duplicatePreset = (preset: Preset) => {
    const newPreset: Preset = {
      ...preset,
      id: Date.now().toString(),
      name: `${preset.name} (копия)`,
      isCustom: true,
      isFavorite: false,
      createdAt: new Date().toISOString().split('T')[0],
      usageCount: 0
    };
    setPresets(prev => [newPreset, ...prev]);
    toast({
      title: "Пресет скопирован",
      description: "Создана копия пресета"
    });
  };

  const applyPreset = (preset: Preset) => {
    onApplyPreset(preset);
    // Увеличиваем счетчик использования
    setPresets(prev => prev.map(p => 
      p.id === preset.id 
        ? { ...p, usageCount: p.usageCount + 1 }
        : p
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold">Менеджер пресетов</h3>
        </div>
        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Сохранить текущие
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Сохранить пресет</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="preset-name">Название пресета</Label>
                <Input
                  id="preset-name"
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  placeholder="Мой пресет"
                />
              </div>
              <div>
                <Label htmlFor="preset-description">Описание</Label>
                <Textarea
                  id="preset-description"
                  value={presetDescription}
                  onChange={(e) => setPresetDescription(e.target.value)}
                  placeholder="Описание настроек пресета"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="preset-category">Категория</Label>
                <Select value={presetCategory} onValueChange={setPresetCategory}>
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
                <Label htmlFor="preset-tags">Теги (через запятую)</Label>
                <Input
                  id="preset-tags"
                  value={presetTags}
                  onChange={(e) => setPresetTags(e.target.value)}
                  placeholder="быстро, seo, продажи"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                  Отмена
                </Button>
                <Button onClick={handleSavePreset} disabled={!presetName.trim()}>
                  Сохранить
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Фильтры и поиск */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Поиск пресетов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-40">
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
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Список пресетов */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredAndSortedPresets.map((preset) => (
          <Card key={preset.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{preset.name}</h4>
                    {preset.isFavorite && (
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    )}
                    {preset.usageCount > 50 && (
                      <Badge variant="outline" className="text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Популярный
                      </Badge>
                    )}
                  </div>
                  {preset.description && (
                    <p className="text-sm text-slate-600 mb-2">{preset.description}</p>
                  )}
                  
                  <div className="flex items-center gap-1 flex-wrap mb-2">
                    <Badge variant="outline" className="text-xs">
                      <Target className="w-3 h-3 mr-1" />
                      {preset.settings.length[0]} символов
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {preset.settings.tone}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {preset.usageCount} использований
                    </Badge>
                  </div>

                  {preset.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {preset.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                      {preset.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{preset.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-1 mb-2">
                    {preset.settings.seoOptimized && (
                      <Badge variant="outline" className="text-xs text-green-600">
                        SEO
                      </Badge>
                    )}
                    {preset.settings.includeCTA && (
                      <Badge variant="outline" className="text-xs text-blue-600">
                        CTA
                      </Badge>
                    )}
                    {preset.settings.includeEmoji && (
                      <Badge variant="outline" className="text-xs text-purple-600">
                        Эмодзи
                      </Badge>
                    )}
                    {preset.isCustom && (
                      <Badge className="text-xs bg-purple-100 text-purple-800">
                        Пользовательский
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleFavorite(preset.id)}
                  className="p-1"
                >
                  <Star 
                    className={`w-4 h-4 ${
                      preset.isFavorite 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-slate-400'
                    }`} 
                  />
                </Button>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  onClick={() => applyPreset(preset)}
                  size="sm"
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  Применить
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => duplicatePreset(preset)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                {preset.isCustom && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deletePreset(preset.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAndSortedPresets.length === 0 && (
        <div className="text-center py-8 text-slate-500">
          <Settings className="w-12 h-12 mx-auto mb-4 text-slate-300" />
          <p className="text-lg font-medium mb-2">Пресеты не найдены</p>
          <p className="text-sm">Попробуйте изменить параметры поиска или создать новый пресет</p>
        </div>
      )}
    </div>
  );
}
