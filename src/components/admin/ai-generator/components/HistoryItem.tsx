
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Edit, Trash2 } from "lucide-react";

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

interface HistoryItemProps {
  item: GenerationHistoryItem;
  onView: (item: GenerationHistoryItem) => void;
  onEdit: (item: GenerationHistoryItem) => void;
  onDelete: (id: string) => void;
}

export default function HistoryItem({ item, onView, onEdit, onDelete }: HistoryItemProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h4 className="font-medium text-sm">{item.title}</h4>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <Clock className="w-3 h-3" />
              {formatDate(item.createdAt)}
              <Badge variant="outline" className="text-xs">
                {item.wordCount} слов
              </Badge>
              <Badge variant="outline" className="text-xs">
                {item.contentType}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => onView(item)}>
              <Eye className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(item.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-slate-600 line-clamp-2">
          {item.content.substring(0, 150)}...
        </p>
      </CardContent>
    </Card>
  );
}
