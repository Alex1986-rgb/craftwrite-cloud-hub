
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Settings, Plus, Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PresetForm from "./components/PresetForm";

interface Preset {
  id: string;
  name: string;
  description: string;
  category: string;
  settings: any;
  isPublic: boolean;
  tags: string[];
  createdAt: Date;
  author?: string;
}

interface PresetManagerProps {
  onApplyPreset: (preset: any) => void;
}

export default function PresetManager({ onApplyPreset }: PresetManagerProps) {
  const [presets, setPresets] = useState<Preset[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleCreatePreset = (formData: any) => {
    const newPreset: Preset = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date()
    };
    
    setPresets(prev => [...prev, newPreset]);
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Пресет создан",
      description: "Новый пресет успешно сохранен"
    });
  };

  const handleExportPresets = () => {
    const dataStr = JSON.stringify(presets, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'presets.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportPresets = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedPresets = JSON.parse(e.target?.result as string);
          setPresets(prev => [...prev, ...importedPresets]);
          toast({
            title: "Пресеты импортированы",
            description: `Добавлено ${importedPresets.length} пресетов`
          });
        } catch (error) {
          toast({
            title: "Ошибка импорта",
            description: "Неверный формат файла",
            variant: "destructive"
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Управление пресетами
          </CardTitle>
          <div className="flex gap-2">
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Создать пресет
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Создание нового пресета</DialogTitle>
                </DialogHeader>
                <PresetForm
                  onSave={handleCreatePreset}
                  onCancel={() => setIsCreateDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" size="sm" onClick={handleExportPresets}>
              <Download className="w-4 h-4 mr-2" />
              Экспорт
            </Button>
            
            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={handleImportPresets}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Импорт
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Личные</TabsTrigger>
            <TabsTrigger value="corporate">Корпоративные</TabsTrigger>
            <TabsTrigger value="public">Публичные</TabsTrigger>
            <TabsTrigger value="recommended">Рекомендуемые</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            {presets.filter(p => !p.isPublic).length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <Settings className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p>У вас нет личных пресетов</p>
                <p className="text-sm">Создайте первый пресет для быстрого доступа к настройкам</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {presets.filter(p => !p.isPublic).map(preset => (
                  <Card key={preset.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{preset.name}</h4>
                        <p className="text-sm text-slate-600">{preset.description}</p>
                      </div>
                      <Button onClick={() => onApplyPreset(preset.settings)}>
                        Применить
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="corporate">
            <div className="text-center py-8 text-slate-500">
              <p>Корпоративные пресеты будут доступны после настройки интеграции</p>
            </div>
          </TabsContent>

          <TabsContent value="public">
            <div className="text-center py-8 text-slate-500">
              <p>Публичные пресеты от сообщества</p>
            </div>
          </TabsContent>

          <TabsContent value="recommended">
            <div className="text-center py-8 text-slate-500">
              <p>Рекомендации будут доступны после анализа ваших предпочтений</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
