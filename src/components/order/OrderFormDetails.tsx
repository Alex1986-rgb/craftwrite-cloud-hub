
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface OrderFormDetailsProps {
  details: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function OrderFormDetails({ details, handleChange }: OrderFormDetailsProps) {
  return (
    <div className="space-y-4 md:space-y-6">
      <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
        Детали проекта
      </h3>
      <div className="space-y-3">
        <Label htmlFor="details" className="text-sm md:text-base font-medium">
          Подробное описание *
        </Label>
        <Textarea
          id="details"
          name="details"
          value={details}
          onChange={handleChange}
          placeholder="Опишите ваш проект максимально подробно: цели, целевую аудиторию, стиль, особые требования..."
          rows={5}
          className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none text-sm md:text-base border-2 hover:border-primary/30"
          required
        />
        <div className="flex flex-col sm:flex-row justify-between text-xs text-muted-foreground gap-1">
          <span>Минимум 20 символов для качественного выполнения</span>
          <span className="text-primary font-medium">{details.length}/2000</span>
        </div>
      </div>
    </div>
  );
}
