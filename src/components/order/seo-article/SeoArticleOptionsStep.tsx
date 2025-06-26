
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Settings } from 'lucide-react';

interface FormData {
  includeImages: boolean;
  includeInfographics: boolean;
  expertQuotes: boolean;
  statistics: boolean;
  metaDescription: string;
  callToAction: string;
  competitorUrls: string;
}

interface SeoArticleOptionsStepProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCheckboxChange: (name: string, checked: boolean) => void;
  calculatePrice: () => number;
}

export default function SeoArticleOptionsStep({ 
  formData, 
  onInputChange, 
  onCheckboxChange, 
  calculatePrice 
}: SeoArticleOptionsStepProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-600" />
            Дополнительные опции
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeImages"
                  checked={formData.includeImages}
                  onCheckedChange={(checked) => onCheckboxChange('includeImages', !!checked)}
                />
                <Label htmlFor="includeImages">Подобрать изображения</Label>
              </div>
              <span className="text-sm text-green-600">+800₽</span>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeInfographics"
                  checked={formData.includeInfographics}
                  onCheckedChange={(checked) => onCheckboxChange('includeInfographics', !!checked)}
                />
                <Label htmlFor="includeInfographics">Создать инфографику</Label>
              </div>
              <span className="text-sm text-green-600">+1500₽</span>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="expertQuotes"
                  checked={formData.expertQuotes}
                  onCheckedChange={(checked) => onCheckboxChange('expertQuotes', !!checked)}
                />
                <Label htmlFor="expertQuotes">Добавить экспертные мнения</Label>
              </div>
              <span className="text-sm text-green-600">+1200₽</span>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="statistics"
                  checked={formData.statistics}
                  onCheckedChange={(checked) => onCheckboxChange('statistics', !!checked)}
                />
                <Label htmlFor="statistics">Включить актуальную статистику</Label>
              </div>
              <span className="text-sm text-green-600">+600₽</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="metaDescription">Meta описание</Label>
              <Textarea
                id="metaDescription"
                name="metaDescription"
                value={formData.metaDescription}
                onChange={onInputChange}
                placeholder="Желаемое описание для поисковых систем"
                rows={2}
              />
            </div>
            
            <div>
              <Label htmlFor="callToAction">Призыв к действию</Label>
              <Input
                id="callToAction"
                name="callToAction"
                value={formData.callToAction}
                onChange={onInputChange}
                placeholder="Что должен сделать читатель?"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="competitorUrls">Ссылки на статьи конкурентов</Label>
            <Textarea
              id="competitorUrls"
              name="competitorUrls"
              value={formData.competitorUrls}
              onChange={onInputChange}
              placeholder="Укажите URL статей конкурентов для анализа"
              rows={3}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Итоговая стоимость:</span>
              <span className="text-2xl font-bold text-green-600">
                {calculatePrice().toLocaleString('ru-RU')} ₽
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
