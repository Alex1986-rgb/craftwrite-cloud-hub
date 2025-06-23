
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { Plus, FileText, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SeoTemplate {
  id: string;
  name: string;
  category?: string;
  title_template: string;
  description_template: string;
  variables: string[];
  is_active: boolean;
  created_at: string;
}

export default function SeoTemplatesManager() {
  const [templates, setTemplates] = useState<SeoTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    title_template: "",
    description_template: "",
    variables: [] as string[],
    is_active: true
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('seo_meta_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить шаблоны",
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
        .from('seo_meta_templates')
        .insert({
          name: formData.name,
          category: formData.category || null,
          title_template: formData.title_template,
          description_template: formData.description_template,
          variables: formData.variables,
          is_active: formData.is_active
        });

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Шаблон добавлен"
      });
      
      setShowAddForm(false);
      setFormData({
        name: "",
        category: "",
        title_template: "",
        description_template: "",
        variables: [],
        is_active: true
      });
      fetchTemplates();
    } catch (error) {
      console.error('Error creating template:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось добавить шаблон",
        variant: "destructive"
      });
    }
  };

  const deleteTemplate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('seo_meta_templates')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      fetchTemplates();
      toast({
        title: "Успешно",
        description: "Шаблон удален"
      });
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить шаблон",
        variant: "destructive"
      });
    }
  };

  const toggleTemplate = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('seo_meta_templates')
        .update({ is_active: isActive })
        .eq('id', id);

      if (error) throw error;
      
      fetchTemplates();
    } catch (error) {
      console.error('Error updating template:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить шаблон",
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
              <FileText className="w-5 h-5" />
              SEO шаблоны ({templates.length})
            </CardTitle>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить шаблон
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            Шаблоны для автоматической генерации мета-заголовков и описаний
          </p>
        </CardContent>
      </Card>

      {/* Add Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Добавить шаблон</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Название *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Шаблон для кондиционеров"
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
              </div>

              <div>
                <Label htmlFor="title_template">Шаблон заголовка *</Label>
                <Input
                  id="title_template"
                  value={formData.title_template}
                  onChange={(e) => setFormData({...formData, title_template: e.target.value})}
                  placeholder="Купить {{page_title}} по выгодной цене | Каталог 2025"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description_template">Шаблон описания *</Label>
                <Textarea
                  id="description_template"
                  value={formData.description_template}
                  onChange={(e) => setFormData({...formData, description_template: e.target.value})}
                  placeholder="Закажите {{page_title}} с доставкой. Гарантия, цены от {{manufacturer}}. Быстрое оформление — за 1 минуту."
                  required
                />
              </div>

              <div>
                <Label htmlFor="variables">Переменные (через запятую)</Label>
                <Input
                  id="variables"
                  value={formData.variables.join(', ')}
                  onChange={(e) => setFormData({...formData, variables: e.target.value.split(',').map(v => v.trim()).filter(v => v)})}
                  placeholder="page_title, manufacturer, category"
                />
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

      {/* Templates List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className={template.is_active ? "" : "opacity-60"}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{template.name}</div>
                  {template.category && (
                    <Badge variant="secondary" className="mt-1">
                      {template.category}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-1">
                  <Switch
                    checked={template.is_active}
                    onCheckedChange={(checked) => toggleTemplate(template.id, checked)}
                  />
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => deleteTemplate(template.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-slate-700">Заголовок:</p>
                  <p className="text-sm text-slate-600 font-mono bg-slate-50 p-2 rounded">
                    {template.title_template}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-slate-700">Описание:</p>
                  <p className="text-sm text-slate-600 font-mono bg-slate-50 p-2 rounded">
                    {template.description_template}
                  </p>
                </div>

                {template.variables.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-1">Переменные:</p>
                    <div className="flex flex-wrap gap-1">
                      {template.variables.map((variable, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {variable}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-xs text-slate-500">
                  Создан: {new Date(template.created_at).toLocaleDateString('ru-RU')}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {templates.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Шаблоны не найдены</p>
            <Button className="mt-4" onClick={() => setShowAddForm(true)}>
              Добавить первый шаблон
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
