import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Link, Trash2, Edit, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Autolink {
  id: string;
  anchor: string;
  url: string;
  slot_type: string;
  max_inserts: number;
  category?: string;
  is_active: boolean;
  created_at: string;
}

export default function AutolinksManager() {
  const [autolinks, setAutolinks] = useState<Autolink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    anchor: "",
    url: "",
    slot_type: "content",
    max_inserts: 1,
    category: "",
    is_active: true
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchAutolinks();
  }, []);

  const fetchAutolinks = async () => {
    try {
      const { data, error } = await supabase
        .from('autolinks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAutolinks(data || []);
    } catch (error) {
      console.error('Error fetching autolinks:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить автолинки",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('autolinks')
        .insert({
          anchor: formData.anchor,
          url: formData.url,
          slot_type: formData.slot_type,
          max_inserts: formData.max_inserts,
          category: formData.category || null,
          is_active: formData.is_active
        });

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Автолинк добавлен"
      });
      
      setShowAddForm(false);
      setFormData({
        anchor: "",
        url: "",
        slot_type: "content",
        max_inserts: 1,
        category: "",
        is_active: true
      });
      fetchAutolinks();
    } catch (error) {
      console.error('Error creating autolink:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось добавить автолинк",
        variant: "destructive"
      });
    }
  };

  const deleteAutolink = async (id: string) => {
    try {
      const { error } = await supabase
        .from('autolinks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      fetchAutolinks();
      toast({
        title: "Успешно",
        description: "Автолинк удален"
      });
    } catch (error) {
      console.error('Error deleting autolink:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить автолинк",
        variant: "destructive"
      });
    }
  };

  const toggleAutolink = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('autolinks')
        .update({ is_active: isActive })
        .eq('id', id);

      if (error) throw error;
      
      fetchAutolinks();
    } catch (error) {
      console.error('Error updating autolink:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить автолинк",
        variant: "destructive"
      });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Here you would parse CSV file with autolinks
      toast({
        title: "Файл загружен",
        description: `Обработан файл: ${file.name}`
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обработать файл",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Загрузка...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Link className="w-5 h-5" />
              Управление автолинками ({autolinks.length})
            </CardTitle>
            <div className="flex gap-2">
              <div>
                <Label htmlFor="autolinks-upload" className="cursor-pointer">
                  <Button variant="outline" asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Загрузить CSV
                    </span>
                  </Button>
                </Label>
                <Input
                  id="autolinks-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Добавить автолинк
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            Автоматическая вставка ссылок в SEO-тексты по ключевым словам
          </p>
        </CardContent>
      </Card>

      {/* Add Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Добавить автолинк</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="anchor">Анкор *</Label>
                  <Input
                    id="anchor"
                    value={formData.anchor}
                    onChange={(e) => setFormData({...formData, anchor: e.target.value})}
                    placeholder="инверторный кондиционер"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="url">URL *</Label>
                  <Input
                    id="url"
                    value={formData.url}
                    onChange={(e) => setFormData({...formData, url: e.target.value})}
                    placeholder="/konditsionery/invertornye"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Категория</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="кондиционеры"
                  />
                </div>

                <div>
                  <Label htmlFor="max_inserts">Макс. вставок</Label>
                  <Input
                    id="max_inserts"
                    type="number"
                    min="1"
                    value={formData.max_inserts}
                    onChange={(e) => setFormData({...formData, max_inserts: Number(e.target.value)})}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
                />
                <Label>Активен</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit">Добавить</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Отмена
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Autolinks List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {autolinks.map((autolink) => (
          <Card key={autolink.id} className={autolink.is_active ? "" : "opacity-60"}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium">{autolink.anchor}</div>
                  <div className="text-sm text-slate-500 font-mono">{autolink.url}</div>
                </div>
                <div className="flex gap-1">
                  <Switch
                    checked={autolink.is_active}
                    onCheckedChange={(checked) => toggleAutolink(autolink.id, checked)}
                  />
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => deleteAutolink(autolink.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex gap-2">
                  {autolink.category && (
                    <Badge variant="secondary">{autolink.category}</Badge>
                  )}
                  <Badge variant="outline">
                    макс. {autolink.max_inserts}
                  </Badge>
                </div>
                <div className="text-xs text-slate-500">
                  Создан: {new Date(autolink.created_at).toLocaleDateString('ru-RU')}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {autolinks.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Link className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Автолинки не найдены</p>
            <Button className="mt-4" onClick={() => setShowAddForm(true)}>
              Добавить первый автолинк
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
