
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Settings, Plus, Star, Edit, Trash2, Copy } from "lucide-react";

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
  isCustom: boolean;
  isFavorite: boolean;
  createdAt: string;
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

  const defaultPresets: Preset[] = [
    {
      id: "1",
      name: "Быстрая SEO-статья",
      description: "Оптимальные настройки для SEO-контента",
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
      isCustom: false,
      isFavorite: true,
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Продающий контент",
      description: "Настройки для конверсионных текстов",
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
      isCustom: false,
      isFavorite: false,
      createdAt: "2024-01-15"
    },
    {
      id: "3",
      name: "Соцсети casual",
      description: "Легкий контент для социальных сетей",
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
      isCustom: false,
      isFavorite: true,
      createdAt: "2024-01-15"
    }
  ];

  const [presets, setPresets] = useState<Preset[]>(defaultPresets);

  const toggleFavorite = (presetId: string) => {
    setPresets(prev => prev.map(preset => 
      preset.id === presetId 
        ? { ...preset, isFavorite: !preset.isFavorite }
        : preset
    ));
  };

  const handleSavePreset = () => {
    if (!presetName.trim()) return;

    const newPreset: Omit<Preset, 'id' | 'createdAt'> = {
      name: presetName,
      description: presetDescription,
      settings: currentSettings,
      isCustom: true,
      isFavorite: false
    };

    onSavePreset(newPreset);
    
    // Добавляем в локальный список
    const preset: Preset = {
      ...newPreset,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setPresets(prev => [preset, ...prev]);

    setPresetName("");
    setPresetDescription("");
    setShowSaveDialog(false);
  };

  const deletePreset = (presetId: string) => {
    setPresets(prev => prev.filter(p => p.id !== presetId));
  };

  const duplicatePreset = (preset: Preset) => {
    const newPreset: Preset = {
      ...preset,
      id: Date.now().toString(),
      name: `${preset.name} (копия)`,
      isCustom: true,
      isFavorite: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setPresets(prev => [newPreset, ...prev]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold">Пресеты настроек</h3>
        </div>
        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Сохранить текущие
            </Button>
          </DialogTrigger>
          <DialogContent>
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
                <Label htmlFor="preset-description">Описание (опционально)</Label>
                <Input
                  id="preset-description"
                  value={presetDescription}
                  onChange={(e) => setPresetDescription(e.target.value)}
                  placeholder="Описание настроек"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {presets.map((preset) => (
          <Card key={preset.id} className="hover:shadow-sm transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{preset.name}</h4>
                    {preset.isFavorite && (
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    )}
                  </div>
                  {preset.description && (
                    <p className="text-sm text-slate-600 mb-2">{preset.description}</p>
                  )}
                  <div className="flex items-center gap-1 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {preset.settings.length[0]} символов
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {preset.settings.tone}
                    </Badge>
                    {preset.settings.seoOptimized && (
                      <Badge variant="outline" className="text-xs text-green-600">
                        SEO
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
                  onClick={() => onApplyPreset(preset)}
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
    </div>
  );
}
