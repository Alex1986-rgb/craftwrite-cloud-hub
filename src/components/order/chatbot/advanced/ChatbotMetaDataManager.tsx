
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Settings, Link, Building, Plus, X } from 'lucide-react';

interface ChatbotMetaData {
  metaTitle: string;
  metaDescription: string;
  companyName: string;
  includeLinks: boolean;
  internalLinks: string[];
}

interface ChatbotMetaDataManagerProps {
  onMetaDataChange: (metaData: ChatbotMetaData) => void;
  initialMetaData?: ChatbotMetaData;
}

export default function ChatbotMetaDataManager({ 
  onMetaDataChange, 
  initialMetaData = {
    metaTitle: '',
    metaDescription: '',
    companyName: '',
    includeLinks: false,
    internalLinks: []
  }
}: ChatbotMetaDataManagerProps) {
  const [metaData, setMetaData] = useState<ChatbotMetaData>(initialMetaData);
  const [newLink, setNewLink] = useState('');

  const updateMetaData = (updates: Partial<ChatbotMetaData>) => {
    const updated = { ...metaData, ...updates };
    setMetaData(updated);
    onMetaDataChange(updated);
  };

  const addInternalLink = () => {
    if (newLink.trim() && metaData.internalLinks.length < 3 && !metaData.internalLinks.includes(newLink.trim())) {
      const updatedLinks = [...metaData.internalLinks, newLink.trim()];
      updateMetaData({ internalLinks: updatedLinks });
      setNewLink('');
    }
  };

  const removeInternalLink = (link: string) => {
    const updatedLinks = metaData.internalLinks.filter(l => l !== link);
    updateMetaData({ internalLinks: updatedLinks });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Мета-данные и персонализация
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="meta-title">Мета-заголовок бота</Label>
            <Input
              id="meta-title"
              value={metaData.metaTitle}
              onChange={(e) => updateMetaData({ metaTitle: e.target.value })}
              placeholder="Например: Консультант по продуктам | Ваша компания"
              maxLength={60}
            />
            <p className="text-xs text-gray-500">
              {metaData.metaTitle.length}/60 символов. Используется в описании бота.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta-description">Мета-описание бота</Label>
            <Textarea
              id="meta-description"
              value={metaData.metaDescription}
              onChange={(e) => updateMetaData({ metaDescription: e.target.value })}
              placeholder="Краткое описание функций и возможностей вашего чат-бота"
              maxLength={160}
              rows={3}
            />
            <p className="text-xs text-gray-500">
              {metaData.metaDescription.length}/160 символов. Краткое описание для пользователей.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-name" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Название компании
            </Label>
            <Input
              id="company-name"
              value={metaData.companyName}
              onChange={(e) => updateMetaData({ companyName: e.target.value })}
              placeholder="Введите название вашей компании"
            />
            <p className="text-xs text-gray-500">
              Будет использоваться для персонализации ответов бота.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="include-links" className="flex items-center gap-2">
                <Link className="w-4 h-4" />
                Добавить ссылки в ответы бота
              </Label>
              <p className="text-xs text-gray-500">
                Бот будет интегрировать указанные ссылки в свои ответы
              </p>
            </div>
            <Switch
              id="include-links"
              checked={metaData.includeLinks}
              onCheckedChange={(checked) => updateMetaData({ includeLinks: checked })}
            />
          </div>

          {metaData.includeLinks && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Внутренние ссылки (до 3 ссылок)</Label>
                <div className="flex gap-2">
                  <Input
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                    placeholder="https://example.com/page"
                    disabled={metaData.internalLinks.length >= 3}
                    onKeyPress={(e) => e.key === 'Enter' && addInternalLink()}
                  />
                  <Button 
                    type="button" 
                    onClick={addInternalLink} 
                    size="sm"
                    disabled={metaData.internalLinks.length >= 3 || !newLink.trim()}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {metaData.internalLinks.length > 0 && (
                <div className="space-y-2">
                  <Label>Добавленные ссылки ({metaData.internalLinks.length}/3):</Label>
                  <div className="space-y-2">
                    {metaData.internalLinks.map((link, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                        <span className="text-sm truncate">{link}</span>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => removeInternalLink(link)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                <h4 className="text-sm font-medium text-blue-800 mb-1">Как будут использоваться ссылки:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Бот естественно интегрирует ссылки в ответы</li>
                  <li>• Ссылки привязываются к релевантным темам</li>
                  <li>• Повышение вовлеченности и переходов на сайт</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border">
          <h4 className="font-medium mb-2">Предварительный результат:</h4>
          <div className="space-y-2 text-sm">
            {metaData.companyName && (
              <div>
                <strong>Компания:</strong> {metaData.companyName}
              </div>
            )}
            {metaData.metaTitle && (
              <div>
                <strong>Заголовок:</strong> {metaData.metaTitle}
              </div>
            )}
            {metaData.metaDescription && (
              <div>
                <strong>Описание:</strong> {metaData.metaDescription}
              </div>
            )}
            {metaData.includeLinks && metaData.internalLinks.length > 0 && (
              <div>
                <strong>Интеграция ссылок:</strong> {metaData.internalLinks.length} ссылки
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
