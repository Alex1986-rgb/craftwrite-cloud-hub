
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { History, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HistoryItem from "./components/HistoryItem";

interface GenerationHistoryItem {
  id: string;
  title: string;
  content: string;
  contentType: string;
  createdAt: Date;
  wordCount: number;
  parameters: {
    tone: string;
    audience: string;
    keywords: string;
  };
}

interface GenerationHistoryProps {
  history: GenerationHistoryItem[];
  onSelectResult: (content: string) => void;
  onSaveResult: (item: Omit<GenerationHistoryItem, 'id' | 'createdAt'>) => void;
  onDeleteResult: (id: string) => void;
}

export default function GenerationHistory({ 
  history, 
  onSelectResult, 
  onSaveResult, 
  onDeleteResult 
}: GenerationHistoryProps) {
  const [selectedItem, setSelectedItem] = useState<GenerationHistoryItem | null>(null);
  const [editingItem, setEditingItem] = useState<GenerationHistoryItem | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const { toast } = useToast();

  const handleEdit = (item: GenerationHistoryItem) => {
    setEditingItem(item);
    setEditContent(item.content);
    setEditTitle(item.title);
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      onSaveResult({
        title: editTitle,
        content: editContent,
        contentType: editingItem.contentType,
        wordCount: editContent.split(' ').length,
        parameters: editingItem.parameters
      });
      setEditingItem(null);
      toast({
        title: "Результат сохранен",
        description: "Изменения успешно применены"
      });
    }
  };

  const handleDelete = (id: string) => {
    onDeleteResult(id);
    toast({
      title: "Результат удален",
      description: "Элемент истории был удален"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5" />
          История генераций
        </CardTitle>
      </CardHeader>
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <History className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p>История генераций пуста</p>
            <p className="text-sm">Сгенерированные тексты будут отображаться здесь</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <HistoryItem
                key={item.id}
                item={item}
                onView={setSelectedItem}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Диалог просмотра */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedItem?.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-sm text-slate-600">
                <strong>Параметры:</strong> {selectedItem?.parameters.tone}, {selectedItem?.parameters.audience}
              </div>
              <Textarea 
                value={selectedItem?.content} 
                readOnly 
                rows={15}
                className="font-mono text-sm"
              />
              <div className="flex gap-2">
                <Button onClick={() => onSelectResult(selectedItem?.content || "")}>
                  Использовать текст
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Диалог редактирования */}
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Редактирование результата</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Название</label>
                <Input 
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
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
                  Сохранить
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
