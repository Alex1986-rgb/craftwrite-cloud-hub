
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface NotificationTemplate {
  id: string;
  name: string;
  type: 'email' | 'push' | 'sms';
  event_type: string;
  subject_template: string;
  content_template: string;
  variables: string[];
  is_active: boolean;
}

export default function NotificationTemplateEditor() {
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    type: 'email' as 'email' | 'push' | 'sms',
    event_type: 'order_created',
    subject_template: '',
    content_template: '',
    variables: [] as string[],
    is_active: true
  });

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('notification_templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error: any) {
      console.error('Error loading templates:', error);
      toast({
        title: 'Ошибка загрузки',
        description: 'Не удалось загрузить шаблоны',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const templateData = {
        ...formData,
        variables: formData.variables
      };

      if (selectedTemplate) {
        // Обновляем существующий шаблон
        const { error } = await supabase
          .from('notification_templates')
          .update(templateData)
          .eq('id', selectedTemplate.id);

        if (error) throw error;
        toast({ title: 'Шаблон обновлен', description: 'Изменения сохранены успешно' });
      } else {
        // Создаем новый шаблон
        const { error } = await supabase
          .from('notification_templates')
          .insert(templateData);

        if (error) throw error;
        toast({ title: 'Шаблон создан', description: 'Новый шаблон добавлен успешно' });
      }

      loadTemplates();
      resetForm();
    } catch (error: any) {
      console.error('Error saving template:', error);
      toast({
        title: 'Ошибка сохранения',
        description: error.message || 'Не удалось сохранить шаблон',
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (template: NotificationTemplate) => {
    setSelectedTemplate(template);
    setFormData({
      name: template.name,
      type: template.type,
      event_type: template.event_type,
      subject_template: template.subject_template || '',
      content_template: template.content_template,
      variables: template.variables || [],
      is_active: template.is_active
    });
    setIsEditing(true);
  };

  const handleDelete = async (templateId: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот шаблон?')) return;

    try {
      const { error } = await supabase
        .from('notification_templates')
        .delete()
        .eq('id', templateId);

      if (error) throw error;
      
      toast({ title: 'Шаблон удален', description: 'Шаблон успешно удален' });
      loadTemplates();
    } catch (error: any) {
      console.error('Error deleting template:', error);
      toast({
        title: 'Ошибка удаления',
        description: error.message || 'Не удалось удалить шаблон',
        variant: 'destructive'
      });
    }
  };

  const resetForm = () => {
    setSelectedTemplate(null);
    setIsEditing(false);
    setFormData({
      name: '',
      type: 'email',
      event_type: 'order_created',
      subject_template: '',
      content_template: '',
      variables: [],
      is_active: true
    });
  };

  const addVariable = (variable: string) => {
    if (variable && !formData.variables.includes(variable)) {
      setFormData(prev => ({
        ...prev,
        variables: [...prev.variables, variable]
      }));
    }
  };

  const removeVariable = (variable: string) => {
    setFormData(prev => ({
      ...prev,
      variables: prev.variables.filter(v => v !== variable)
    }));
  };

  if (loading) {
    return <div className="p-6">Загрузка шаблонов...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Редактор шаблонов уведомлений</h2>
        <Button onClick={() => setIsEditing(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Новый шаблон
        </Button>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Список шаблонов</TabsTrigger>
          <TabsTrigger value="editor">Редактор</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="grid gap-4">
            {templates.map((template) => (
              <Card key={template.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium">{template.name}</h4>
                        <Badge variant={template.is_active ? 'default' : 'secondary'}>
                          {template.type}
                        </Badge>
                        <Badge variant="outline">
                          {template.event_type}
                        </Badge>
                        {!template.is_active && (
                          <Badge variant="destructive">Неактивен</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Переменные: {template.variables.join(', ') || 'Нет'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(template)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(template.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="editor" className="space-y-4">
          {isEditing && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedTemplate ? 'Редактирование шаблона' : 'Новый шаблон'}
                </CardTitle>
                <CardDescription>
                  Создайте или отредактируйте шаблон уведомления
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Название</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Название шаблона"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Тип</label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: 'email' | 'push' | 'sms') => 
                        setFormData(prev => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="push">Push</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Тип события</label>
                  <Select
                    value={formData.event_type}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, event_type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="order_created">Заказ создан</SelectItem>
                      <SelectItem value="order_status_changed">Статус изменен</SelectItem>
                      <SelectItem value="order_completed">Заказ завершен</SelectItem>
                      <SelectItem value="form_abandoned">Форма покинута</SelectItem>
                      <SelectItem value="reminder">Напоминание</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.type === 'email' && (
                  <div>
                    <label className="text-sm font-medium">Тема письма</label>
                    <Input
                      value={formData.subject_template}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject_template: e.target.value }))}
                      placeholder="Используйте {{переменные}} для подстановки"
                    />
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium">Содержание</label>
                  <Textarea
                    value={formData.content_template}
                    onChange={(e) => setFormData(prev => ({ ...prev, content_template: e.target.value }))}
                    placeholder="Содержание уведомления. Используйте {{переменные}} для подстановки"
                    rows={6}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Переменные</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.variables.map((variable) => (
                      <Badge
                        key={variable}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => removeVariable(variable)}
                      >
                        {variable} ✕
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Добавить переменную"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addVariable((e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={resetForm}>
                    Отмена
                  </Button>
                  <Button onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Сохранить
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
