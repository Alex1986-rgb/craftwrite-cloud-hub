import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  History, Save, Target, Copy, Download, GitBranch, 
  BarChart3, FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import VersionComparison from "./VersionComparison";
import GenerationAnalytics from "./GenerationAnalytics";
import HistoryFilters from "./HistoryFilters";
import VersionTimeline from "./VersionTimeline";
import EnhancedHistoryItem from "./components/EnhancedHistoryItem";

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
                  <EnhancedHistoryItem
                    key={item.id}
                    item={item}
                    onView={() => {}}
                    onEdit={() => {}}
                    onDelete={onDeleteResult}
                    onToggleFavorite={(id, isFavorite) => onUpdateResult(id, { isFavorite: !isFavorite })}
                    onSelect={onSelectResult}
                    onCopy={(content) => navigator.clipboard.writeText(content)}
                    onCreateVariation={() => {}}
                  />
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
      </CardContent>
    </Card>
  );
}
