
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, Eye, Edit, Trash2, Star, Tag, GitBranch, 
  Copy, Download, MessageSquare, Target, Zap
} from "lucide-react";
import { EnhancedGenerationHistoryItem } from "../EnhancedGenerationHistory";

interface EnhancedHistoryItemProps {
  item: EnhancedGenerationHistoryItem;
  onView: (item: EnhancedGenerationHistoryItem) => void;
  onEdit: (item: EnhancedGenerationHistoryItem) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string, isFavorite: boolean) => void;
  onSelect: (content: string) => void;
  onCopy: (content: string) => void;
  onCreateVariation: (item: EnhancedGenerationHistoryItem) => void;
}

export default function EnhancedHistoryItem({
  item,
  onView,
  onEdit,
  onDelete,
  onToggleFavorite,
  onSelect,
  onCopy,
  onCreateVariation
}: EnhancedHistoryItemProps) {
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
    <Card className="border-l-4 border-l-blue-500">
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
              onClick={() => onToggleFavorite(item.id, item.isFavorite)}
            >
              <Star className={`w-4 h-4 ${item.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-slate-400'}`} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onView(item)}>
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <p className="text-xs text-slate-600 line-clamp-2 mb-3">
          {item.content.substring(0, 150)}...
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              onClick={() => onSelect(item.content)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Zap className="w-3 h-3 mr-1" />
              Использовать
            </Button>
            <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
              <Edit className="w-3 h-3 mr-1" />
              Редактировать
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onDelete(item.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
