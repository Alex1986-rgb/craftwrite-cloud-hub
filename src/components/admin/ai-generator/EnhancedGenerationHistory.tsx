
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  History, Clock, FileText, Eye, Edit, Trash2, Save, Star, Tag, 
  GitBranch, BarChart3, Filter, Search, Calendar, TrendingUp,
  Copy, Download, Share2, MessageSquare, Target, Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VersionComparison from "./VersionComparison";
import GenerationAnalytics from "./GenerationAnalytics";
import HistoryFilters from "./HistoryFilters";
import VersionTimeline from "./VersionTimeline";

export interface EnhancedGenerationHistoryItem {
  id: string;
  title: string;
  content: string;
  contentType: string;
  createdAt: Date;
  updatedAt?: Date;
  wordCount: number;
  characterCount: number;
  parameters: {
    tone: string;
    audience: string;
    keywords: string;
    temperature: number;
    model: string;
  };
  metadata: {
    generationTime: number;
    tokensUsed: number;
    cost: number;
    quality: {
      seoScore: number;
      readabilityScore: number;
      uniquenessScore: number;
    };
    performance: {
      views: number;
      copies: number;
      exports: number;
      shares: number;
    };
  };
  tags: string[];
  notes: string;
  isFavorite: boolean;
  version: number;
  parentId?: string;
  variations: string[];
  status: 'draft' | 'published' | 'archived';
}

interface EnhancedGenerationHistoryProps {
  history: EnhancedGenerationHistoryItem[];
  onSelectResult: (content: string) => void;
  onSaveResult: (item: Omit<EnhancedGenerationHistoryItem, 'id' | 'createdAt'>) => void;
  onDeleteResult: (id: string) => void;
  onUpdateResult: (id: string, updates: Partial<EnhancedGenerationHistoryItem>) => void;
  onCreateVariation: (parentId: string, content: string) => void;
}

export default function EnhancedGenerationHistory({ 
  history, 
  onSelectResult, 
  onSaveResult, 
  onDeleteResult,
  onUpdateResult,
  onCreateVariation
}: EnhancedGenerationHistoryProps) {
  const [selectedItem, setSelectedItem] = useState<EnhancedGenerationHistoryItem | null>(null);
  const [editingItem, setEditingItem] = useState<EnhancedGenerationHistoryItem | null>(null);
  const [compareItems, setCompareItems] = useState<EnhancedGenerationHistoryItem[]>([]);
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editTags, setEditTags] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    contentType: "all",
    dateRange: "all",
    status: "all",
    sortBy: "recent"
  });
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'timeline'>('list');
  const { toast } = useToast();

  const handleEdit = (item: EnhancedGenerationHistoryItem) => {
    setEditingItem(item);
    setEditContent(item.content);
    setEditTitle(item.title);
    setEditTags(item.tags.join(', '));
    setEditNotes(item.notes);
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      const updates = {
        title: editTitle,
        content: editContent,
        tags: editTags.split(',').map(tag => tag.trim()).filter(Boolean),
        notes: editNotes,
        wordCount: editContent.split(' ').length,
        characterCount: editContent.length,
        updatedAt: new Date()
      };
      
      onUpdateResult(editingItem.id, updates);
      setEditingItem(null);
      toast({
        title: "Результат обновлен",
        description: "Изменения успешно сохранены"
      });
    }
  };

  const handleToggleFavorite = (id: string, isFavorite: boolean) => {
    onUpdateResult(id, { isFavorite: !isFavorite });
    toast({
      title: isFavorite ? "Удалено из избранного" : "Добавлено в избранное",
      description: "Статус обновлен"
    });
  };

  const handleCreateVariation = (parentItem: EnhancedGenerationHistoryItem) => {
    const variationContent = `${parentItem.content}\n\n[Вариация для редактирования]`;
    onCreateVariation(parentItem.id, variationContent);
    toast({
      title: "Создана вариация",
      description: "Новая версия готова для редактирования"
    });
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Скопировано",
      description: "Текст скопирован в буфер обмена"
    });
  };

  const handleExport = (item: EnhancedGenerationHistoryItem) => {
    const exportData = {
      ...item,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.title.replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);

    onUpdateResult(item.id, {
      metadata: {
        ...item.metadata,
        performance: {
          ...item.metadata.performance,
          exports: item.metadata.performance.exports + 1
        }
      }
    });
  };

  const filteredHistory = history.filter(item => {
    const matchesSearch = !filters.search || 
      item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.content.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
    
    const matchesContentType = filters.contentType === "all" || item.contentType === filters.contentType;
    const matchesStatus = filters.status === "all" || item.status === filters.status;
    
    return matchesSearch && matchesContentType && matchesStatus;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case "popular":
        return b.metadata.performance.views - a.metadata.performance.views;
      case "quality":
        return b.metadata.quality.seoScore - a.metadata.quality.seoScore;
      case "recent":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getQualityColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      draft: { label: "Черновик", color: "bg-gray-100 text-gray-800" },
      published: { label: "Опубликован", color: "bg-green-100 text-green-800" },
      archived: { label: "Архив", color: "bg-slate-100 text-slate-800" }
    };
    return statusMap[status as keyof typeof statusMap] || statusMap.draft;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Расширенная история генераций
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 border rounded-lg p-1">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <FileText className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <BarChart3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'timeline' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('timeline')}
              >
                <GitBranch className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="history">История</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            <TabsTrigger value="compare">Сравнение</TabsTrigger>
            <TabsTrigger value="timeline">Временная шкала</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-4">
            <HistoryFilters 
              filters={filters}
              onFiltersChange={setFilters}
              history={history}
            />

            {filteredHistory.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <History className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p>История генераций пуста</p>
                <p className="text-sm">Сгенерированные тексты будут отображаться здесь</p>
              </div>
            ) : (
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-3'}`}>
                {filteredHistory.map((item) => (
                  <Card key={item.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm">{item.title}</h4>
                            {item.isFavorite && (
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            )}
                            <Badge className={getStatusBadge(item.status).color}>
                              {getStatusBadge(item.status).label}
                            </Badge>
                            {item.version > 1 && (
                              <Badge variant="outline" className="text-xs">
                                v{item.version}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                            <Clock className="w-3 h-3" />
                            {formatDate(item.createdAt)}
                            <Badge variant="outline" className="text-xs">
                              {item.wordCount} слов
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {item.contentType}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2 text-xs mb-2">
                            <span className={`font-medium ${getQualityColor(item.metadata.quality.seoScore)}`}>
                              SEO: {item.metadata.quality.seoScore}%
                            </span>
                            <span className={`font-medium ${getQualityColor(item.metadata.quality.readabilityScore)}`}>
                              Читаемость: {item.metadata.quality.readabilityScore}%
                            </span>
                            <span className="text-slate-500">
                              {item.metadata.performance.views} просмотров
                            </span>
                          </div>

                          {item.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {item.tags.slice(0, 3).map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  <Tag className="w-3 h-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                              {item.tags.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{item.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}

                          {item.notes && (
                            <p className="text-xs text-slate-600 italic mb-2">
                              <MessageSquare className="w-3 h-3 inline mr-1" />
                              {item.notes.substring(0, 100)}...
                            </p>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleFavorite(item.id, item.isFavorite)}
                          >
                            <Star className={`w-4 h-4 ${item.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-slate-400'}`} />
                          </Button>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  {item.title}
                                  <Badge className={getStatusBadge(item.status).color}>
                                    {getStatusBadge(item.status).label}
                                  </Badge>
                                </DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                  <div>
                                    <span className="font-medium">Тон:</span> {item.parameters.tone}
                                  </div>
                                  <div>
                                    <span className="font-medium">Аудитория:</span> {item.parameters.audience}
                                  </div>
                                  <div>
                                    <span className="font-medium">Модель:</span> {item.parameters.model}
                                  </div>
                                  <div>
                                    <span className="font-medium">Время:</span> {item.metadata.generationTime}сек
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div className="text-center p-3 bg-green-50 rounded-lg">
                                    <div className="font-medium text-green-800">SEO</div>
                                    <div className="text-2xl font-bold text-green-600">
                                      {item.metadata.quality.seoScore}%
                                    </div>
                                  </div>
                                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                                    <div className="font-medium text-blue-800">Читаемость</div>
                                    <div className="text-2xl font-bold text-blue-600">
                                      {item.metadata.quality.readabilityScore}%
                                    </div>
                                  </div>
                                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                                    <div className="font-medium text-purple-800">Уникальность</div>
                                    <div className="text-2xl font-bold text-purple-600">
                                      {item.metadata.quality.uniquenessScore}%
                                    </div>
                                  </div>
                                </div>
                                
                                <Textarea 
                                  value={item.content} 
                                  readOnly 
                                  rows={15}
                                  className="font-mono text-sm"
                                />
                                
                                <div className="flex gap-2 flex-wrap">
                                  <Button onClick={() => onSelectResult(item.content)}>
                                    <Target className="w-4 h-4 mr-2" />
                                    Использовать текст
                                  </Button>
                                  <Button variant="outline" onClick={() => handleCopy(item.content)}>
                                    <Copy className="w-4 h-4 mr-2" />
                                    Копировать
                                  </Button>
                                  <Button variant="outline" onClick={() => handleCreateVariation(item)}>
                                    <GitBranch className="w-4 h-4 mr-2" />
                                    Создать вариацию
                                  </Button>
                                  <Button variant="outline" onClick={() => handleExport(item)}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Экспорт
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                      
                      <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                        {item.content.substring(0, 150)}...
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => onSelectResult(item.content)}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            <Zap className="w-3 h-3 mr-1" />
                            Использовать
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                            <Edit className="w-3 h-3 mr-1" />
                            Редактировать
                          </Button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onDeleteResult(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics">
            <GenerationAnalytics history={history} />
          </TabsContent>

          <TabsContent value="compare">
            <VersionComparison 
              history={history}
              compareItems={compareItems}
              onCompareItemsChange={setCompareItems}
            />
          </TabsContent>

          <TabsContent value="timeline">
            <VersionTimeline history={history} onSelectResult={onSelectResult} />
          </TabsContent>
        </Tabs>

        {/* Диалог редактирования */}
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Редактирование результата</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Название</label>
                  <Input 
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Теги (через запятую)</label>
                  <Input 
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    placeholder="seo, копирайтинг, продажи"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Заметки</label>
                <Input 
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Добавьте заметки к этому результату"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Содержание</label>
                <Textarea 
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={15}
                  className="font-mono text-sm"
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleSaveEdit}>
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить изменения
                </Button>
                <Button variant="outline" onClick={() => setEditingItem(null)}>
                  Отмена
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
