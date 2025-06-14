
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GitCompare, ArrowRight, ArrowLeft, Eye, Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EnhancedGenerationHistoryItem } from "./EnhancedGenerationHistory";

interface VersionComparisonProps {
  history: EnhancedGenerationHistoryItem[];
  compareItems: EnhancedGenerationHistoryItem[];
  onCompareItemsChange: (items: EnhancedGenerationHistoryItem[]) => void;
}

export default function VersionComparison({ 
  history, 
  compareItems, 
  onCompareItemsChange 
}: VersionComparisonProps) {
  const [selectedItem1, setSelectedItem1] = useState<string>("");
  const [selectedItem2, setSelectedItem2] = useState<string>("");
  const [viewMode, setViewMode] = useState<'side-by-side' | 'unified'>('side-by-side');
  const { toast } = useToast();

  const item1 = history.find(item => item.id === selectedItem1);
  const item2 = history.find(item => item.id === selectedItem2);

  const handleCompare = () => {
    if (item1 && item2) {
      onCompareItemsChange([item1, item2]);
      toast({
        title: "Сравнение готово",
        description: "Версии загружены для сравнения"
      });
    }
  };

  const generateDiff = (text1: string, text2: string) => {
    const words1 = text1.split(/\s+/);
    const words2 = text2.split(/\s+/);
    
    // Простейший алгоритм для демонстрации
    const maxLength = Math.max(words1.length, words2.length);
    const diff = [];
    
    for (let i = 0; i < maxLength; i++) {
      const word1 = words1[i] || '';
      const word2 = words2[i] || '';
      
      if (word1 === word2) {
        diff.push({ type: 'equal', text: word1 });
      } else if (word1 && word2) {
        diff.push({ type: 'changed', old: word1, new: word2 });
      } else if (word1) {
        diff.push({ type: 'deleted', text: word1 });
      } else if (word2) {
        diff.push({ type: 'added', text: word2 });
      }
    }
    
    return diff;
  };

  const getDiffStats = (text1: string, text2: string) => {
    const words1 = text1.split(/\s+/).length;
    const words2 = text2.split(/\s+/).length;
    const chars1 = text1.length;
    const chars2 = text2.length;
    
    return {
      wordsDiff: words2 - words1,
      charsDiff: chars2 - chars1,
      wordsPercent: ((words2 - words1) / words1 * 100).toFixed(1),
      charsPercent: ((chars2 - chars1) / chars1 * 100).toFixed(1)
    };
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Скопировано",
      description: "Текст скопирован в буфер обмена"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitCompare className="w-5 h-5" />
          Сравнение версий
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Селекторы версий */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Версия 1</label>
            <Select value={selectedItem1} onValueChange={setSelectedItem1}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите первую версию" />
              </SelectTrigger>
              <SelectContent>
                {history.map(item => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.title} - {formatDate(item.createdAt)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Версия 2</label>
            <Select value={selectedItem2} onValueChange={setSelectedItem2}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите вторую версию" />
              </SelectTrigger>
              <SelectContent>
                {history.map(item => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.title} - {formatDate(item.createdAt)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end">
            <Button 
              onClick={handleCompare}
              disabled={!selectedItem1 || !selectedItem2}
              className="w-full"
            >
              Сравнить версии
            </Button>
          </div>
        </div>

        {/* Переключатель режима просмотра */}
        {item1 && item2 && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'side-by-side' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('side-by-side')}
              >
                Рядом
              </Button>
              <Button
                variant={viewMode === 'unified' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('unified')}
              >
                Объединенный
              </Button>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>Сравнение:</span>
              <Badge variant="outline">{item1.title}</Badge>
              <ArrowRight className="w-4 h-4" />
              <Badge variant="outline">{item2.title}</Badge>
            </div>
          </div>
        )}

        {/* Результаты сравнения */}
        {item1 && item2 && (
          <div className="space-y-4">
            {/* Статистика сравнения */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {getDiffStats(item1.content, item2.content).wordsDiff > 0 ? '+' : ''}
                    {getDiffStats(item1.content, item2.content).wordsDiff}
                  </div>
                  <div className="text-sm text-slate-600">Слов</div>
                  <div className="text-xs text-slate-500">
                    {getDiffStats(item1.content, item2.content).wordsPercent}%
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {getDiffStats(item1.content, item2.content).charsDiff > 0 ? '+' : ''}
                    {getDiffStats(item1.content, item2.content).charsDiff}
                  </div>
                  <div className="text-sm text-slate-600">Символов</div>
                  <div className="text-xs text-slate-500">
                    {getDiffStats(item1.content, item2.content).charsPercent}%
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {item2.metadata.quality.seoScore - item1.metadata.quality.seoScore > 0 ? '+' : ''}
                    {item2.metadata.quality.seoScore - item1.metadata.quality.seoScore}
                  </div>
                  <div className="text-sm text-slate-600">SEO</div>
                  <div className="text-xs text-slate-500">Баллы</div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {item2.metadata.quality.readabilityScore - item1.metadata.quality.readabilityScore > 0 ? '+' : ''}
                    {item2.metadata.quality.readabilityScore - item1.metadata.quality.readabilityScore}
                  </div>
                  <div className="text-sm text-slate-600">Читаемость</div>
                  <div className="text-xs text-slate-500">Баллы</div>
                </div>
              </Card>
            </div>

            {/* Сравнение метаданных */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    {item1.title}
                  </CardTitle>
                  <div className="text-sm text-slate-600">
                    {formatDate(item1.createdAt)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Слов:</span>
                    <span>{item1.wordCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>SEO:</span>
                    <span>{item1.metadata.quality.seoScore}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Читаемость:</span>
                    <span>{item1.metadata.quality.readabilityScore}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Просмотры:</span>
                    <span>{item1.metadata.performance.views}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(item1.content)}>
                      <Copy className="w-3 h-3 mr-1" />
                      Копировать
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    {item2.title}
                  </CardTitle>
                  <div className="text-sm text-slate-600">
                    {formatDate(item2.createdAt)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Слов:</span>
                    <span>{item2.wordCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>SEO:</span>
                    <span>{item2.metadata.quality.seoScore}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Читаемость:</span>
                    <span>{item2.metadata.quality.readabilityScore}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Просмотры:</span>
                    <span>{item2.metadata.performance.views}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(item2.content)}>
                      <Copy className="w-3 h-3 mr-1" />
                      Копировать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Сравнение контента */}
            {viewMode === 'side-by-side' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Версия 1
                  </h4>
                  <div className="p-4 bg-slate-50 rounded-lg text-sm font-mono whitespace-pre-wrap max-h-96 overflow-y-auto">
                    {item1.content}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    Версия 2
                  </h4>
                  <div className="p-4 bg-slate-50 rounded-lg text-sm font-mono whitespace-pre-wrap max-h-96 overflow-y-auto">
                    {item2.content}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="font-medium mb-2">Объединенное сравнение</h4>
                <div className="p-4 bg-slate-50 rounded-lg text-sm font-mono max-h-96 overflow-y-auto">
                  {generateDiff(item1.content, item2.content).map((diff, index) => (
                    <span
                      key={index}
                      className={
                        diff.type === 'added' ? 'bg-green-200 text-green-800' :
                        diff.type === 'deleted' ? 'bg-red-200 text-red-800 line-through' :
                        diff.type === 'changed' ? 'bg-yellow-200 text-yellow-800' :
                        ''
                      }
                    >
                      {diff.type === 'changed' ? `${diff.old} → ${diff.new}` : diff.text}{' '}
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-xs text-slate-600">
                  <span className="inline-block w-4 h-4 bg-green-200 mr-1"></span>Добавлено
                  <span className="inline-block w-4 h-4 bg-red-200 mx-2 mr-1"></span>Удалено
                  <span className="inline-block w-4 h-4 bg-yellow-200 mx-2 mr-1"></span>Изменено
                </div>
              </div>
            )}
          </div>
        )}

        {(!item1 || !item2) && (
          <div className="text-center py-8 text-slate-500">
            <GitCompare className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium mb-2">Выберите две версии для сравнения</p>
            <p className="text-sm">Сравните различия между версиями текста</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
