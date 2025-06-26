
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText } from 'lucide-react';

interface FormData {
  articleTopic: string;
  keywords: string;
  wordCount: string;
  contentStyle: string;
}

interface SeoArticleBasicInfoStepProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
}

export default function SeoArticleBasicInfoStep({ 
  formData, 
  onInputChange, 
  onSelectChange 
}: SeoArticleBasicInfoStepProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Основная информация
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="articleTopic">Тема статьи *</Label>
            <Input
              id="articleTopic"
              name="articleTopic"
              value={formData.articleTopic}
              onChange={onInputChange}
              placeholder="О чем должна быть статья?"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="keywords">Ключевые слова *</Label>
            <Textarea
              id="keywords"
              name="keywords"
              value={formData.keywords}
              onChange={onInputChange}
              placeholder="Перечислите основные ключевые слова через запятую"
              rows={3}
              required
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="wordCount">Объем статьи *</Label>
              <Select onValueChange={(value) => onSelectChange('wordCount', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите объем" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1000-2000">1000-2000 слов (2500₽)</SelectItem>
                  <SelectItem value="2000-3000">2000-3000 слов (4000₽)</SelectItem>
                  <SelectItem value="3000-5000">3000-5000 слов (6500₽)</SelectItem>
                  <SelectItem value="5000+">Более 5000 слов (9000₽)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="contentStyle">Стиль подачи</Label>
              <Select onValueChange={(value) => onSelectChange('contentStyle', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите стиль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="informational">Информационный</SelectItem>
                  <SelectItem value="expert">Экспертный (+30%)</SelectItem>
                  <SelectItem value="friendly">Дружелюбный</SelectItem>
                  <SelectItem value="formal">Официальный</SelectItem>
                  <SelectItem value="engaging">Вовлекающий</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
