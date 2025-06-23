
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProductFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function ProductForm({ onClose, onSuccess }: ProductFormProps) {
  const [formData, setFormData] = useState({
    page_url: "",
    page_title: "",
    category: "",
    manufacturer: "",
    filters: {},
    link_slots: []
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const categories = [
    "кондиционеры",
    "вентиляция", 
    "отопление",
    "климатическое оборудование",
    "техника для дома"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('product_pages')
        .insert({
          page_url: formData.page_url,
          page_title: formData.page_title,
          category: formData.category,
          manufacturer: formData.manufacturer || null,
          filters: formData.filters,
          link_slots: formData.link_slots
        });

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Товар добавлен"
      });
      onSuccess();
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        title: "Ошибка", 
        description: "Не удалось добавить товар",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Добавить товар</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="page_url">URL страницы *</Label>
            <Input
              id="page_url"
              value={formData.page_url}
              onChange={(e) => setFormData({...formData, page_url: e.target.value})}
              placeholder="/konditsionery/daikin-ftxm"
              required
            />
          </div>

          <div>
            <Label htmlFor="page_title">Название страницы *</Label>
            <Input
              id="page_title"
              value={formData.page_title}
              onChange={(e) => setFormData({...formData, page_title: e.target.value})}
              placeholder="Кондиционер Daikin FTXM"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Категория *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData({...formData, category: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="manufacturer">Производитель</Label>
            <Input
              id="manufacturer"
              value={formData.manufacturer}
              onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
              placeholder="Daikin, Mitsubishi, LG..."
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Добавление..." : "Добавить"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
