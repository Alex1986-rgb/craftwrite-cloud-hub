
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  GitBranch, Clock, Eye, Copy, Target, Star, 
  ArrowRight, ArrowDown, Zap 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EnhancedGenerationHistoryItem } from "./EnhancedGenerationHistory";

interface VersionTimelineProps {
  history: EnhancedGenerationHistoryItem[];
  onSelectResult: (content: string) => void;
}

export default function VersionTimeline({ history, onSelectResult }: VersionTimelineProps) {
  const [selectedItem, setSelectedItem] = useState<EnhancedGenerationHistoryItem | null>(null);
  const [groupBy, setGroupBy] = useState<'date' | 'type' | 'parent'>('date');
  const { toast } = useToast();

  const groupedHistory = () => {
    const sorted = [...history].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    switch (groupBy) {
      case 'date':
        return sorted.reduce((acc, item) => {
          const date = item.createdAt.toISOString().split('T')[0];
          if (!acc[date]) acc[date] = [];
          acc[date].push(item);
          return acc;
        }, {} as Record<string, EnhancedGenerationHistoryItem[]>);
      
      case 'type':
        return sorted.reduce((acc, item) => {
          if (!acc[item.contentType]) acc[item.contentType] = [];
          acc[item.contentType].push(item);
          return acc;
        }, {} as Record<string, EnhancedGenerationHistoryItem[]>);
      
      case 'parent':
        return sorted.reduce((acc, item) => {
          const key = item.parentId || item.id;
          if (!acc[key]) acc[key] = [];
          acc[key].push(item);
          return acc;
        }, {} as Record<string, EnhancedGenerationHistoryItem[]>);
      
      default:
        return { 'all': sorted };
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Скопировано",
      description: "Текст скопирован в буфер обмена"
    });
  };

  const grouped = groupedHistory();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="w-5 h-5" />
            Временная шкала
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={groupBy === 'date' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setGroupBy('date')}
            >
              По дате
            </Button>
            <Button
              variant={groupBy === 'type' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setGroupBy('type')}
            >
              По типу
            </Button>
            <Button
              variant={groupBy === 'parent' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setGroupBy('parent')}
            >
              По версиям
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <GitBranch className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium mb-2">История пуста</p>
            <p className="text-sm">Временная шкала будет отображаться здесь</p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(grouped).map(([groupKey, items]) => (
              <div key={groupKey} className="space-y-4">
                {/* Заголовок группы */}
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold">
                    {groupBy === 'date' && formatDate(new Date(groupKey))}
                    {groupBy === 'type' && `Тип: ${groupKey}`}
                    {groupBy === 'parent' && `Группа версий`}
                  </h3>
                  <Badge variant="outline">{items.length} элементов</Badge>
                </div>
                
                {/* Линия времени */}
                <div className="ml-2 border-l-2 border-slate-200 pl-6 space-y-6">
                  {items.map((item, index) => (
                    <div key={item.id} className="relative">
                      {/* Точка на линии */}
                      <div className="absolute -left-8 top-3 w-3 h-3 bg-white border-2 border-blue-600 rounded-full"></div>
                      
                      {/* Соединительная линия к следующему элементу */}
                      {index < items.length - 1 && (
                        <div className="absolute -left-[30px] top-6 w-0.5 h-16 bg-slate-200"></div>
                      )}
                      
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-medium">{item.title}</h4>
                                {item.isFavorite && (
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                )}
                                <Badge className={getStatusBadge(item.status).color}>
                                  {getStatusBadge(item.status).label}
                                </Badge>
                                {item.version > 1 && (
                                  <Badge variant="outline">v{item.version}</Badge>
                                )}
                              </div>
                              
                              <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {formatTime(item.createdAt)}
                                </div>
                                <span>{item.wordCount} слов</span>
                                <span>{item.contentType}</span>
                              </div>

                              <div className="flex items-center gap-4 text-sm mb-2">
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
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => setSelectedItem(item)}
                                  >
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                      {selectedItem?.title}
                                      <Badge className={getStatusBadge(selectedItem?.status || 'draft').color}>
                                        {getStatusBadge(selectedItem?.status || 'draft').label}
                                      </Badge>
                                    </DialogTitle>
                                  </DialogHeader>
                                  {selectedItem && (
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div>
                                          <span className="font-medium">Создан:</span><br />
                                          {formatDate(selectedItem.createdAt)} в {formatTime(selectedItem.createdAt)}
                                        </div>
                                        <div>
                                          <span className="font-medium">Тон:</span><br />
                                          {selectedItem.parameters.tone}
                                        </div>
                                        <div>
                                          <span className="font-medium">Аудитория:</span><br />
                                          {selectedItem.parameters.audience}
                                        </div>
                                        <div>
                                          <span className="font-medium">Модель:</span><br />
                                          {selectedItem.parameters.model}
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div className="text-center p-3 bg-green-50 rounded-lg">
                                          <div className="font-medium text-green-800">SEO</div>
                                          <div className="text-2xl font-bold text-green-600">
                                            {selectedItem.metadata.quality.seoScore}%
                                          </div>
                                        </div>
                                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                                          <div className="font-medium text-blue-800">Читаемость</div>
                                          <div className="text-2xl font-bold text-blue-600">
                                            {selectedItem.metadata.quality.readabilityScore}%
                                          </div>
                                        </div>
                                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                                          <div className="font-medium text-purple-800">Уникальность</div>
                                          <div className="text-2xl font-bold text-purple-600">
                                            {selectedItem.metadata.quality.uniquenessScore}%
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <Textarea 
                                        value={selectedItem.content} 
                                        readOnly 
                                        rows={15}
                                        className="font-mono text-sm"
                                      />
                                      
                                      <div className="flex gap-2 flex-wrap">
                                        <Button onClick={() => onSelectResult(selectedItem.content)}>
                                          <Target className="w-4 h-4 mr-2" />
                                          Использовать текст
                                        </Button>
                                        <Button 
                                          variant="outline" 
                                          onClick={() => copyToClipboard(selectedItem.content)}
                                        >
                                          <Copy className="w-4 h-4 mr-2" />
                                          Копировать
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                          
                          <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                            {item.content.substring(0, 200)}...
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
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => copyToClipboard(item.content)}
                              >
                                <Copy className="w-3 h-3 mr-1" />
                                Копировать
                              </Button>
                            </div>
                            
                            {item.variations.length > 0 && (
                              <Badge variant="outline" className="text-xs">
                                <GitBranch className="w-3 h-3 mr-1" />
                                {item.variations.length} вариаций
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
