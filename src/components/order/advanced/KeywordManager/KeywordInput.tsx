
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

interface KeywordInputProps {
  keywords: string[];
  onKeywordsChange: (keywords: string[]) => void;
}

export default function KeywordInput({ keywords, onKeywordsChange }: KeywordInputProps) {
  const [newKeyword, setNewKeyword] = useState('');

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      const updatedKeywords = [...keywords, newKeyword.trim()];
      onKeywordsChange(updatedKeywords);
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    const updatedKeywords = keywords.filter(k => k !== keyword);
    onKeywordsChange(updatedKeywords);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={newKeyword}
          onChange={(e) => setNewKeyword(e.target.value)}
          placeholder="Добавить ключевое слово"
          onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
        />
        <Button type="button" onClick={addKeyword} size="sm">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {keywords.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium">Добавленные ключевые слова:</div>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {keyword}
                <button
                  type="button"
                  onClick={() => removeKeyword(keyword)}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
