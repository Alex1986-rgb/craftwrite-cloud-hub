import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X, GripVertical, FileText, Hash } from 'lucide-react';

interface ContentSection {
  id: string;
  type: 'heading' | 'paragraph' | 'list' | 'table' | 'callout';
  title: string;
  content?: string;
  level?: number; // for headings (H2, H3, H4)
  wordCount?: number;
}

interface ContentStructureBuilderProps {
  onStructureChange: (structure: ContentSection[], totalWordCount: number) => void;
  initialStructure?: ContentSection[];
  targetWordCount?: number;
}

export default function ContentStructureBuilder({ 
  onStructureChange, 
  initialStructure = [],
  targetWordCount = 3000
}: ContentStructureBuilderProps) {
  const [sections, setSections] = useState<ContentSection[]>(
    initialStructure.length > 0 ? initialStructure : [
      { id: '1', type: 'heading', title: 'Введение', level: 2, wordCount: 200 },
      { id: '2', type: 'heading', title: 'Основная часть', level: 2, wordCount: 2200 },
      { id: '3', type: 'heading', title: 'Заключение', level: 2, wordCount: 300 },
      { id: '4', type: 'paragraph', title: 'Call to Action', wordCount: 300 }
    ]
  );

  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const addSection = () => {
    const newSection: ContentSection = {
      id: Date.now().toString(),
      type: 'heading',
      title: 'Новый раздел',
      level: 2,
      wordCount: 200
    };
    const updatedSections = [...sections, newSection];
    setSections(updatedSections);
    updateParent(updatedSections);
  };

  const removeSection = (id: string) => {
    const updatedSections = sections.filter(section => section.id !== id);
    setSections(updatedSections);
    updateParent(updatedSections);
  };

  const updateSection = (id: string, updates: Partial<ContentSection>) => {
    const updatedSections = sections.map(section =>
      section.id === id ? { ...section, ...updates } : section
    );
    setSections(updatedSections);
    updateParent(updatedSections);
  };

  const updateParent = (newSections: ContentSection[]) => {
    const totalWords = newSections.reduce((sum, section) => sum + (section.wordCount || 0), 0);
    onStructureChange(newSections, totalWords);
  };

  const getTotalWordCount = () => {
    return sections.reduce((sum, section) => sum + (section.wordCount || 0), 0);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'heading': return <Hash className="w-4 h-4" />;
      case 'paragraph': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const currentWordCount = getTotalWordCount();
  const wordCountStatus = currentWordCount === targetWordCount ? 'exact' : 
                         currentWordCount < targetWordCount ? 'under' : 'over';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Структура контента
        </CardTitle>
        <div className="flex items-center gap-4">
          <div className={`text-sm px-3 py-1 rounded-full ${
            wordCountStatus === 'exact' ? 'bg-green-100 text-green-800' :
            wordCountStatus === 'under' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {currentWordCount} / {targetWordCount} слов
          </div>
          {wordCountStatus !== 'exact' && (
            <div className="text-xs text-muted-foreground">
              {wordCountStatus === 'under' 
                ? `Не хватает ${targetWordCount - currentWordCount} слов`
                : `Превышение на ${currentWordCount - targetWordCount} слов`
              }
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {sections.map((section, index) => (
            <div key={section.id} className="border rounded-lg p-4 bg-white">
              <div className="flex items-start gap-3">
                <div className="cursor-move mt-2">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <Select 
                      value={section.type} 
                      onValueChange={(value) => updateSection(section.id, { type: value as any })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="heading">Заголовок</SelectItem>
                        <SelectItem value="paragraph">Абзац</SelectItem>
                        <SelectItem value="list">Список</SelectItem>
                        <SelectItem value="table">Таблица</SelectItem>
                        <SelectItem value="callout">Врезка</SelectItem>
                      </SelectContent>
                    </Select>

                    {section.type === 'heading' && (
                      <Select 
                        value={section.level?.toString() || '2'} 
                        onValueChange={(value) => updateSection(section.id, { level: parseInt(value) })}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">H2</SelectItem>
                          <SelectItem value="3">H3</SelectItem>
                          <SelectItem value="4">H4</SelectItem>
                        </SelectContent>
                      </Select>
                    )}

                    <div className="flex items-center gap-2">
                      {getTypeIcon(section.type)}
                      <Badge variant="outline" className="text-xs">
                        {section.wordCount || 0} слов
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <Label htmlFor={`title-${section.id}`} className="text-sm">
                        Название раздела
                      </Label>
                      <Input
                        id={`title-${section.id}`}
                        value={section.title}
                        onChange={(e) => updateSection(section.id, { title: e.target.value })}
                        placeholder="Название раздела"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`words-${section.id}`} className="text-sm">
                        Количество слов
                      </Label>
                      <Input
                        id={`words-${section.id}`}
                        type="number"
                        value={section.wordCount || 0}
                        onChange={(e) => updateSection(section.id, { wordCount: parseInt(e.target.value) || 0 })}
                        placeholder="200"
                        className="mt-1"
                        min="0"
                      />
                    </div>
                  </div>

                  {section.content !== undefined && (
                    <div>
                      <Label htmlFor={`content-${section.id}`} className="text-sm">
                        Описание содержания
                      </Label>
                      <Textarea
                        id={`content-${section.id}`}
                        value={section.content}
                        onChange={(e) => updateSection(section.id, { content: e.target.value })}
                        placeholder="Опишите, что должно быть в этом разделе..."
                        className="mt-1"
                        rows={2}
                      />
                    </div>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSection(section.id)}
                  className="mt-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button 
          variant="outline" 
          onClick={addSection}
          className="w-full border-dashed border-2 border-gray-300 hover:border-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Добавить раздел
        </Button>

        <div className="bg-slate-50 rounded-lg p-4 space-y-2">
          <h4 className="font-medium text-sm">Предварительная структура:</h4>
          <div className="space-y-1 text-sm text-muted-foreground">
            {sections.map((section, index) => (
              <div key={section.id} className="flex items-center gap-2">
                <span className="text-xs bg-white px-2 py-1 rounded">{index + 1}</span>
                <span>{section.title}</span>
                <Badge variant="secondary" className="text-xs">
                  {section.wordCount} сл.
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}