import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GitBranch,
  Clock,
  User,
  FileText,
  GitCompare,
  Download,
  ArrowLeft,
  Star,
  RotateCcw,
  Eye
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ContentVersion {
  id: string;
  order_id: string;
  version_number: number;
  content: string;
  created_by: string;
  created_at: string;
  is_active: boolean;
  change_notes?: string;
  quality_score?: number;
  ai_model: string;
  prompt_used?: string;
}

interface VersionComparison {
  versionA: ContentVersion;
  versionB: ContentVersion;
  differences: Array<{
    type: 'added' | 'removed' | 'modified';
    content: string;
    position: number;
  }>;
}

export default function ContentVersioning() {
  const [versions, setVersions] = useState<ContentVersion[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string>('');
  const [comparison, setComparison] = useState<VersionComparison | null>(null);
  const [loading, setLoading] = useState(true);
  const [newVersionNotes, setNewVersionNotes] = useState('');

  useEffect(() => {
    loadVersions();
  }, [selectedOrder]);

  const loadVersions = async () => {
    try {
      setLoading(true);
      
      // Имитация загрузки версий
      const mockVersions: ContentVersion[] = [
        {
          id: '1',
          order_id: 'order_1',
          version_number: 3,
          content: 'Современный SEO-текст о важности качественной мебели для дома. Выбор правильной мебели - это инвестиция в комфорт и стиль вашего жилища...',
          created_by: 'admin',
          created_at: '2024-01-20T14:30:00Z',
          is_active: true,
          change_notes: 'Улучшена структура текста, добавлены ключевые слова',
          quality_score: 92,
          ai_model: 'gpt-4.1-2025-04-14',
          prompt_used: 'Создай SEO-оптимизированную статью...'
        },
        {
          id: '2',
          order_id: 'order_1',
          version_number: 2,
          content: 'SEO-статья о выборе мебели для дома. Качественная мебель играет важную роль в создании уютной атмосферы...',
          created_by: 'admin',
          created_at: '2024-01-20T12:15:00Z',
          is_active: false,
          change_notes: 'Исправлена тональность, добавлены призывы к действию',
          quality_score: 87,
          ai_model: 'gpt-4.1-2025-04-14'
        },
        {
          id: '3',
          order_id: 'order_1',
          version_number: 1,
          content: 'Статья о мебели. При выборе мебели важно учитывать множество факторов...',
          created_by: 'system',
          created_at: '2024-01-20T10:00:00Z',
          is_active: false,
          change_notes: 'Первоначальная версия',
          quality_score: 73,
          ai_model: 'gpt-4.1-2025-04-14'
        }
      ];

      setVersions(mockVersions);
    } catch (error) {
      console.error('Error loading versions:', error);
      toast({
        title: "Ошибка загрузки",
        description: "Не удалось загрузить версии контента",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const createNewVersion = async (orderId: string, content: string) => {
    const newVersion: ContentVersion = {
      id: crypto.randomUUID(),
      order_id: orderId,
      version_number: Math.max(...versions.map(v => v.version_number)) + 1,
      content,
      created_by: 'admin',
      created_at: new Date().toISOString(),
      is_active: false,
      change_notes: newVersionNotes,
      ai_model: 'gpt-4.1-2025-04-14'
    };

    setVersions(prev => [newVersion, ...prev]);
    setNewVersionNotes('');

    toast({
      title: "Версия создана",
      description: "Новая версия контента успешно создана",
    });
  };

  const activateVersion = async (versionId: string) => {
    setVersions(prev => prev.map(version => ({
      ...version,
      is_active: version.id === versionId
    })));

    toast({
      title: "Версия активирована",
      description: "Версия контента активирована",
    });
  };

  const compareVersions = (versionAId: string, versionBId: string) => {
    const versionA = versions.find(v => v.id === versionAId);
    const versionB = versions.find(v => v.id === versionBId);

    if (!versionA || !versionB) return;

    // Простое сравнение для демонстрации
    const differences = [
      {
        type: 'modified' as const,
        content: 'Улучшена структура заголовков',
        position: 1
      },
      {
        type: 'added' as const,
        content: 'Добавлены ключевые слова',
        position: 2
      }
    ];

    setComparison({
      versionA,
      versionB,
      differences
    });
  };

  const exportVersion = (version: ContentVersion) => {
    const dataStr = JSON.stringify(version, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `content_v${version.version_number}_${version.order_id}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    toast({
      title: "Версия экспортирована",
      description: "Файл загружен на ваше устройство",
    });
  };

  const getScoreColor = (score?: number) => {
    if (!score) return 'text-gray-500';
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Управление версиями контента</h2>
          <p className="text-muted-foreground">
            Отслеживание и управление версиями сгенерированного контента
          </p>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="ID заказа"
            value={selectedOrder}
            onChange={(e) => setSelectedOrder(e.target.value)}
            className="w-48"
          />
          <Button onClick={loadVersions} disabled={loading}>
            <GitBranch className="h-4 w-4 mr-2" />
            Загрузить версии
          </Button>
        </div>
      </div>

      {comparison && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <GitCompare className="h-5 w-5" />
                Сравнение версий
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setComparison(null)}
              >
                <ArrowLeft className="h-4 w-4" />
                Закрыть
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">
                  Версия {comparison.versionA.version_number}
                  {comparison.versionA.is_active && <Badge className="ml-2">Активная</Badge>}
                </h4>
                <div className="p-3 bg-white rounded border max-h-32 overflow-y-auto">
                  <p className="text-sm">{comparison.versionA.content}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">
                  Версия {comparison.versionB.version_number}
                  {comparison.versionB.is_active && <Badge className="ml-2">Активная</Badge>}
                </h4>
                <div className="p-3 bg-white rounded border max-h-32 overflow-y-auto">
                  <p className="text-sm">{comparison.versionB.content}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium mb-2">Различия:</h4>
              <div className="space-y-2">
                {comparison.differences.map((diff, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Badge 
                      variant={diff.type === 'added' ? 'default' : diff.type === 'removed' ? 'destructive' : 'secondary'}
                    >
                      {diff.type === 'added' ? '+' : diff.type === 'removed' ? '-' : '~'}
                    </Badge>
                    <span>{diff.content}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="versions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="versions">
            <GitBranch className="h-4 w-4 mr-2" />
            Версии ({versions.length})
          </TabsTrigger>
          <TabsTrigger value="create">
            <FileText className="h-4 w-4 mr-2" />
            Создать версию
          </TabsTrigger>
        </TabsList>

        <TabsContent value="versions">
          <div className="space-y-4">
            {versions.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <GitBranch className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Нет версий</h3>
                  <p className="text-muted-foreground">
                    Выберите заказ для просмотра версий контента
                  </p>
                </CardContent>
              </Card>
            ) : (
              versions.map((version, index) => (
                <Card key={version.id} className={version.is_active ? 'border-green-200 bg-green-50' : ''}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                          v{version.version_number}
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            Версия {version.version_number}
                            {version.is_active && (
                              <Badge className="ml-2">
                                <Star className="h-3 w-3 mr-1" />
                                Активная
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {version.created_by}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(version.created_at).toLocaleString()}
                            </span>
                            {version.quality_score && (
                              <span className={`flex items-center gap-1 ${getScoreColor(version.quality_score)}`}>
                                <Star className="h-3 w-3" />
                                {version.quality_score}%
                              </span>
                            )}
                          </CardDescription>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!version.is_active && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => activateVersion(version.id)}
                          >
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Активировать
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => exportVersion(version)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        {index < versions.length - 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => compareVersions(version.id, versions[index + 1].id)}
                          >
                            <GitCompare className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {version.change_notes && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <h4 className="text-sm font-medium mb-1">Примечания к изменениям:</h4>
                          <p className="text-sm text-blue-700">{version.change_notes}</p>
                        </div>
                      )}
                      
                      <div className="p-3 bg-muted rounded-lg">
                        <h4 className="text-sm font-medium mb-2">Содержание:</h4>
                        <p className="text-sm line-clamp-3">{version.content}</p>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-1">
                          <Eye className="h-3 w-3 mr-1" />
                          Показать полностью
                        </Button>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Модель: {version.ai_model}</span>
                        {version.prompt_used && (
                          <span>Промпт: {version.prompt_used.substring(0, 50)}...</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Создать новую версию</CardTitle>
              <CardDescription>
                Создание новой версии контента с отслеживанием изменений
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">ID заказа</label>
                <Input
                  placeholder="Введите ID заказа"
                  value={selectedOrder}
                  onChange={(e) => setSelectedOrder(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Примечания к изменениям</label>
                <Input
                  placeholder="Опишите внесенные изменения"
                  value={newVersionNotes}
                  onChange={(e) => setNewVersionNotes(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Новый контент</label>
                <Textarea
                  placeholder="Введите обновленный контент..."
                  rows={6}
                />
              </div>

              <Button 
                onClick={() => createNewVersion(selectedOrder, 'Новый контент версии...')}
                disabled={!selectedOrder}
                className="w-full"
              >
                Создать версию
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}