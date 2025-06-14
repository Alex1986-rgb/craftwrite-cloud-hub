
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SaveResultDialogProps {
  generatedText: string;
  contentType: string;
  parameters: {
    tone: string;
    audience: string;
    keywords: string;
  };
  onSave: (title: string) => void;
}

export default function SaveResultDialog({ 
  generatedText, 
  contentType, 
  parameters, 
  onSave 
}: SaveResultDialogProps) {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите название для сохранения",
        variant: "destructive"
      });
      return;
    }

    onSave(title);
    setTitle("");
    setOpen(false);
    toast({
      title: "Результат сохранен",
      description: "Текст добавлен в историю генераций"
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" disabled={!generatedText}>
          <Save className="w-4 h-4 mr-2" />
          Сохранить результат
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Сохранить результат генерации</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="result-title">Название результата</Label>
            <Input
              id="result-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название для сохранения..."
              className="mt-1"
            />
          </div>
          
          <div className="text-sm text-slate-600 space-y-1">
            <p><strong>Тип контента:</strong> {contentType}</p>
            <p><strong>Параметры:</strong> {parameters.tone}, {parameters.audience}</p>
            <p><strong>Объем:</strong> {generatedText.split(' ').length} слов</p>
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Сохранить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
