
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Settings, Plus, X, Link } from 'lucide-react';

interface MetaDataManagerProps {
  onMetaDataChange: (metaData: {
    metaTitle: string;
    metaDescription: string;
    companyName: string;
    includeLinks: boolean;
    internalLinks: string[];
  }) => void;
  initialMetaData?: {
    metaTitle: string;
    metaDescription: string;
    companyName: string;
    includeLinks: boolean;
    internalLinks: string[];
  };
}

export default function MetaDataManager({ onMetaDataChange, initialMetaData }: MetaDataManagerProps) {
  const [metaTitle, setMetaTitle] = useState(initialMetaData?.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(initialMetaData?.metaDescription || '');
  const [companyName, setCompanyName] = useState(initialMetaData?.companyName || '');
  const [includeLinks, setIncludeLinks] = useState(initialMetaData?.includeLinks || false);
  const [internalLinks, setInternalLinks] = useState<string[]>(initialMetaData?.internalLinks || []);
  const [newLink, setNewLink] = useState('');

  const updateMetaData = (updates: Partial<typeof initialMetaData>) => {
    const updatedData = {
      metaTitle,
      metaDescription,
      companyName,
      includeLinks,
      internalLinks,
      ...updates
    };
    
    onMetaDataChange(updatedData);
  };

  const handleMetaTitleChange = (value: string) => {
    setMetaTitle(value);
    updateMetaData({ metaTitle: value });
  };

  const handleMetaDescriptionChange = (value: string) => {
    setMetaDescription(value);
    updateMetaData({ metaDescription: value });
  };

  const handleCompanyNameChange = (value: string) => {
    setCompanyName(value);
    updateMetaData({ companyName: value });
  };

  const handleIncludeLinksChange = (checked: boolean) => {
    setIncludeLinks(checked);
    updateMetaData({ includeLinks: checked });
  };

  const addInternalLink = () => {
    if (newLink.trim() && internalLinks.length < 3 && !internalLinks.includes(newLink.trim())) {
      const updatedLinks = [...internalLinks, newLink.trim()];
      setInternalLinks(updatedLinks);
      updateMetaData({ internalLinks: updatedLinks });
      setNewLink('');
    }
  };

  const removeLink = (link: string) => {
    const updatedLinks = internalLinks.filter(l => l !== link);
    setInternalLinks(updatedLinks);
    updateMetaData({ internalLinks: updatedLinks });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Метаданные и SEO
          <Badge variant="secondary" className="ml-2">Опционально</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">
          Настройте мета-теги, название компании и внутренние ссылки для статьи
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="meta-title">Мета-заголовок (Title)</Label>
            <Input
              id="meta-title"
              value={metaTitle}
              onChange={(e) => handleMetaTitleChange(e.target.value)}
              placeholder="SEO заголовок для поисковых систем"
              maxLength={60}
            />
            <div className="text-xs text-gray-500">
              {metaTitle.length}/60 символов
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company-name">Название компании</Label>
            <Input
              id="company-name"
              value={companyName}
              onChange={(e) => handleCompanyNameChange(e.target.value)}
              placeholder="Ваша компания"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="meta-description">Мета-описание (Description)</Label>
          <Textarea
            id="meta-description"
            value={metaDescription}
            onChange={(e) => handleMetaDescriptionChange(e.target.value)}
            placeholder="Краткое описание для поисковых систем"
            rows={3}
            maxLength={160}
          />
          <div className="text-xs text-gray-500">
            {metaDescription.length}/160 символов
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Внутренние ссылки в тексте</Label>
              <p className="text-sm text-gray-600">
                Добавить ссылки на другие страницы вашего сайта
              </p>
            </div>
            <Switch
              checked={includeLinks}
              onCheckedChange={handleIncludeLinksChange}
            />
          </div>

          {includeLinks && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  placeholder="https://example.com/page"
                  disabled={internalLinks.length >= 3}
                />
                <Button 
                  type="button" 
                  onClick={addInternalLink} 
                  size="sm"
                  disabled={internalLinks.length >= 3 || !newLink.trim()}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {internalLinks.length > 0 && (
                <div className="space-y-2">
                  <Label>Ссылки для вставки ({internalLinks.length}/3):</Label>
                  <div className="space-y-2">
                    {internalLinks.map((link, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                        <div className="flex items-center gap-2">
                          <Link className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">{link}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLink(link)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-3 bg-blue-50 rounded border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Рекомендации:</strong>
                  <br />• Ссылки будут естественно интегрированы в текст
                  <br />• Используйте релевантные страницы вашего сайта
                  <br />• Ссылки помогают улучшить SEO и удержать посетителей
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
