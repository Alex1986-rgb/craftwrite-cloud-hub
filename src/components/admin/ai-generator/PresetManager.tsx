import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Settings, Plus, Star, Edit, Trash2, Copy, Search, Filter, Tag, Clock, Target, TrendingUp, Download, Upload, Building2, Lightbulb, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QuickPresets from "./QuickPresets";

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
  isCompany?: boolean;
  companyStyle?: {
    brandTone: string;
    brandVoice: string;
    brandValues: string[];
    prohibitedWords: string[];
    requiredElements: string[];
  };
}

interface PresetManagerProps {
  currentSettings: any;
  onApplyPreset: (preset: Preset) => void;
  onSavePreset: (preset: Omit<Preset, 'id' | 'createdAt'>) => void;
}

export default function PresetManager({ currentSettings, onApplyPreset, onSavePreset }: PresetManagerProps) {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [showCompanyStyleDialog, setShowCompanyStyleDialog] = useState(false);
  const [presetName, setPresetName] = useState("");
  const [presetDescription, setPresetDescription] = useState("");
  const [presetTags, setPresetTags] = useState("");
  const [presetCategory, setPresetCategory] = useState("");
  const [isCompanyPreset, setIsCompanyPreset] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [importData, setImportData] = useState("");
  const [companyStyle, setCompanyStyle] = useState({
    brandTone: "",
    brandVoice: "",
    brandValues: "",
    prohibitedWords: "",
    requiredElements: ""
  });
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
      id: "corporate-formal",
      name: "Корпоративный стиль",
      description: "Официальный стиль для корпоративных коммуникаций",
      settings: {
        textType: "blog",
        length: [1800],
        tone: "professional",
        audience: "b2b",
        keywords: "",
        includeEmoji: false,
        includeCTA: true,
        seoOptimized: true
      },
      tags: ["корпоративный", "официальный", "b2b"],
      category: "business",
      isCustom: false,
      isFavorite: true,
      createdAt: "2024-01-15",
      usageCount: 189,
      isCompany: true,
      companyStyle: {
        brandTone: "Профессиональный и авторитетный",
        brandVoice: "Экспертный, но доступный",
        brandValues: ["Качество", "Инновации", "Надежность"],
        prohibitedWords: ["дешево", "халява", "супер-пупер"],
        requiredElements: ["Данные и статистика", "Ссылки на источники"]
      }
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

  const getRecommendedPresets = () => {
    const recommendations = [];
    
    // Рекомендации на основе типа контента
    if (currentSettings.textType === "seo-article") {
      recommendations.push({
        id: "seo-boost",
        reason: "Для SEO-статей рекомендуем использовать структурированный подход с акцентом на ключевые слова",
        preset: presets.find(p => p.id === "seo-express")
      });
    }
    
    // Рекомендации на основе аудитории
    if (currentSettings.audience === "b2b") {
      recommendations.push({
        id: "b2b-professional",
        reason: "Для B2B аудитории подойдет профессиональный тон с фокусом на экспертность",
        preset: presets.find(p => p.id === "corporate-formal")
      });
    }
    
    return recommendations.filter(r => r.preset);
  };

  const exportPresets = () => {
    const exportData = {
      presets: presets.filter(p => p.isCustom),
      exportDate: new Date().toISOString(),
      version: "1.0"
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `presets-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Пресеты экспортированы",
      description: "Файл с пресетами сохранен на устройство"
    });
  };

  const importPresets = () => {
    try {
      const data = JSON.parse(importData);
      if (data.presets && Array.isArray(data.presets)) {
        const importedPresets = data.presets.map((preset: any) => ({
          ...preset,
          id: Date.now().toString() + Math.random().toString(36),
          createdAt: new Date().toISOString().split('T')[0],
          usageCount: 0,
          isCustom: true
        }));
        
        setPresets(prev => [...importedPresets, ...prev]);
        setImportData("");
        setShowImportDialog(false);
        
        toast({
          title: "Пресеты импортированы",
          description: `Добавлено ${importedPresets.length} пресетов`
        });
      }
    } catch (error) {
      toast({
        title: "Ошибка импорта",
        description: "Неверный формат файла",
        variant: "destructive"
      });
    }
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
      usageCount: 0,
      isCompany: isCompanyPreset,
      ...(isCompanyPreset && {
        companyStyle: {
          brandTone: companyStyle.brandTone,
          brandVoice: companyStyle.brandVoice,
          brandValues: companyStyle.brandValues.split(',').map(v => v.trim()).filter(Boolean),
          prohibitedWords: companyStyle.prohibitedWords.split(',').map(w => w.trim()).filter(Boolean),
          requiredElements: companyStyle.requiredElements.split(',').map(e => e.trim()).filter(Boolean)
        }
      })
    };

    onSavePreset(newPreset);
    
    const preset: Preset = {
      ...newPreset,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setPresets(prev => [preset, ...prev]);

    // Сброс формы
    setPresetName("");
    setPresetDescription("");
    setPresetTags("");
    setPresetCategory("");
    setIsCompanyPreset(false);
    setCompanyStyle({
      brandTone: "",
      brandVoice: "",
      brandValues: "",
      prohibitedWords: "",
      requiredElements: ""
    });
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
    setPresets(prev => prev.map(p => 
      p.id === preset.id 
        ? { ...p, usageCount: p.usageCount + 1 }
        : p
    ));
  };

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

  const recommendations = getRecommendedPresets();

  return (
    <div className="space-y-6">
      <Tabs defaultValue="presets" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="presets">Пресеты</TabsTrigger>
          <TabsTrigger value="quick">Быстрые</TabsTrigger>
          <TabsTrigger value="company">Корпоративные</TabsTrigger>
          <TabsTrigger value="recommendations">Рекомендации</TabsTrigger>
        </TabsList>

        <TabsContent value="presets" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold">Менеджер пресетов</h3>
            </div>
            <div className="flex gap-2">
              <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Импорт
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Импорт пресетов</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>JSON данные пресетов</Label>
                      <Textarea
                        value={importData}
                        onChange={(e) => setImportData(e.target.value)}
                        placeholder="Вставьте JSON данные..."
                        rows={8}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowImportDialog(false)}>
                        Отмена
                      </Button>
                      <Button onClick={importPresets}>
                        Импортировать
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="sm" onClick={exportPresets}>
                <Download className="w-4 h-4 mr-2" />
                Экспорт
              </Button>
              <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Сохранить текущие
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Сохранить пресет</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
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
                      <Label htmlFor="preset-tags">Теги (через запятую)</Label>
                      <Input
                        id="preset-tags"
                        value={presetTags}
                        onChange={(e) => setPresetTags(e.target.value)}
                        placeholder="быстро, seo, продажи"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={isCompanyPreset}
                        onCheckedChange={setIsCompanyPreset}
                      />
                      <Label>Корпоративный пресет</Label>
                    </div>

                    {isCompanyPreset && (
                      <div className="space-y-4 p-4 border rounded-lg bg-slate-50">
                        <h4 className="font-medium flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          Корпоративный стиль
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Тон бренда</Label>
                            <Input
                              value={companyStyle.brandTone}
                              onChange={(e) => setCompanyStyle(prev => ({ ...prev, brandTone: e.target.value }))}
                              placeholder="Профессиональный, дружелюбный..."
                            />
                          </div>
                          <div>
                            <Label>Голос бренда</Label>
                            <Input
                              value={companyStyle.brandVoice}
                              onChange={(e) => setCompanyStyle(prev => ({ ...prev, brandVoice: e.target.value }))}
                              placeholder="Экспертный, авторитетный..."
                            />
                          </div>
                        </div>
                        <div>
                          <Label>Ценности бренда (через запятую)</Label>
                          <Input
                            value={companyStyle.brandValues}
                            onChange={(e) => setCompanyStyle(prev => ({ ...prev, brandValues: e.target.value }))}
                            placeholder="Качество, Инновации, Надежность"
                          />
                        </div>
                        <div>
                          <Label>Запрещенные слова (через запятую)</Label>
                          <Input
                            value={companyStyle.prohibitedWords}
                            onChange={(e) => setCompanyStyle(prev => ({ ...prev, prohibitedWords: e.target.value }))}
                            placeholder="дешево, халява, супер-пупер"
                          />
                        </div>
                        <div>
                          <Label>Обязательные элементы (через запятую)</Label>
                          <Input
                            value={companyStyle.requiredElements}
                            onChange={(e) => setCompanyStyle(prev => ({ ...prev, requiredElements: e.target.value }))}
                            placeholder="Статистика, Ссылки на источники"
                          />
                        </div>
                      </div>
                    )}
                    
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
                        {preset.isCompany && (
                          <Badge className="text-xs bg-blue-100 text-blue-800">
                            <Building2 className="w-3 h-3 mr-1" />
                            Корпоративный
                          </Badge>
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
        </TabsContent>

        <TabsContent value="quick">
          <QuickPresets onApplyPreset={onApplyPreset} />
        </TabsContent>

        <TabsContent value="company" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">Корпоративные стили</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {presets.filter(p => p.isCompany).map((preset) => (
              <Card key={preset.id} className="border-blue-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-lg">{preset.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-slate-600">{preset.description}</p>
                  
                  {preset.companyStyle && (
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Тон:</span> {preset.companyStyle.brandTone}
                      </div>
                      <div>
                        <span className="font-medium">Голос:</span> {preset.companyStyle.brandVoice}
                      </div>
                      {preset.companyStyle.brandValues.length > 0 && (
                        <div>
                          <span className="font-medium">Ценности:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {preset.companyStyle.brandValues.map(value => (
                              <Badge key={value} variant="outline" className="text-xs">
                                {value}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <Button 
                    onClick={() => applyPreset(preset)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Применить стиль
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-orange-600" />
            <h3 className="text-lg font-semibold">Умные рекомендации</h3>
          </div>
          
          {recommendations.length > 0 ? (
            <div className="space-y-3">
              {recommendations.map((rec) => (
                <Card key={rec.id} className="border-orange-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-orange-50 rounded-lg">
                        <Wand2 className="w-4 h-4 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{rec.preset?.name}</h4>
                        <p className="text-sm text-slate-600 mb-3">{rec.reason}</p>
                        <Button 
                          onClick={() => rec.preset && applyPreset(rec.preset)}
                          size="sm"
                          className="bg-orange-600 hover:bg-orange-700"
                        >
                          Применить рекомендацию
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <Lightbulb className="w-12 h-12 mx-auto mb-4 text-slate-300" />
              <p className="text-lg font-medium mb-2">Нет рекомендаций</p>
              <p className="text-sm">Настройте параметры генерации, чтобы получить персональные рекомендации</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
