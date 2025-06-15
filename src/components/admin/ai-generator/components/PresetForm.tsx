
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Save, X } from "lucide-react";

interface PresetFormData {
  name: string;
  description: string;
  category: string;
  textType: string;
  tone: string;
  audience: string;
  keywords: string;
  includeEmoji: boolean;
  includeCTA: boolean;
  seoOptimized: boolean;
  isPublic: boolean;
  tags: string[];
}

interface PresetFormProps {
  initialData?: Partial<PresetFormData>;
  onSave: (data: PresetFormData) => void;
  onCancel: () => void;
}

export default function PresetForm({ initialData, onSave, onCancel }: PresetFormProps) {
  const [formData, setFormData] = useState<PresetFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    category: initialData?.category || "general",
    textType: initialData?.textType || "blog",
    tone: initialData?.tone || "professional",
    audience: initialData?.audience || "general",
    keywords: initialData?.keywords || "",
    includeEmoji: initialData?.includeEmoji || false,
    includeCTA: initialData?.includeCTA || false,
    seoOptimized: initialData?.seoOptimized || false,
    isPublic: initialData?.isPublic || false,
    tags: initialData?.tags || []
  });

  const [newTag, setNewTag] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Название пресета</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Категория</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">Общие</SelectItem>
              <SelectItem value="seo">SEO</SelectItem>
              <SelectItem value="social">Соцсети</SelectItem>
              <SelectItem value="business">Бизнес</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={2}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="textType">Тип текста</Label>
          <Select value={formData.textType} onValueChange={(value) => setFormData(prev => ({ ...prev, textType: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blog">Блог</SelectItem>
              <SelectItem value="social">Соцсети</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="landing">Лендинг</SelectItem>
              <SelectItem value="product">Товар</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="tone">Тон</Label>
          <Select value={formData.tone} onValueChange={(value) => setFormData(prev => ({ ...prev, tone: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Профессиональный</SelectItem>
              <SelectItem value="casual">Неформальный</SelectItem>
              <SelectItem value="friendly">Дружелюбный</SelectItem>
              <SelectItem value="persuasive">Убедительный</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="keywords">Ключевые слова</Label>
        <Input
          id="keywords"
          value={formData.keywords}
          onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
          placeholder="Введите ключевые слова через запятую"
        />
      </div>

      <div>
        <Label>Теги</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Добавить тег"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          />
          <Button type="button" onClick={addTag} variant="outline">
            Добавить
          </Button>
        </div>
        <div className="flex flex-wrap gap-1">
          {formData.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Switch
            id="includeEmoji"
            checked={formData.includeEmoji}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includeEmoji: checked }))}
          />
          <Label htmlFor="includeEmoji">Включать эмодзи</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="includeCTA"
            checked={formData.includeCTA}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, includeCTA: checked }))}
          />
          <Label htmlFor="includeCTA">Включать призыв к действию</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="seoOptimized"
            checked={formData.seoOptimized}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, seoOptimized: checked }))}
          />
          <Label htmlFor="seoOptimized">SEO оптимизация</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="isPublic"
            checked={formData.isPublic}
            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPublic: checked }))}
          />
          <Label htmlFor="isPublic">Публичный пресет</Label>
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit">
          <Save className="w-4 h-4 mr-2" />
          Сохранить пресет
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
      </div>
    </form>
  );
}
