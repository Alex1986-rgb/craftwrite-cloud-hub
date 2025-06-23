
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText } from 'lucide-react';

interface OrderDetailsStepProps {
  formData: {
    details: string;
    additionalRequirements: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function OrderDetailsStep({ formData, onInputChange }: OrderDetailsStepProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Детали заказа</h3>
      </div>
      <div>
        <Label htmlFor="details">Описание задачи *</Label>
        <Textarea
          id="details"
          name="details"
          value={formData.details}
          onChange={onInputChange}
          placeholder="Опишите подробно, что вам нужно..."
          rows={5}
          required
        />
      </div>
      <div>
        <Label htmlFor="additionalRequirements">Дополнительные требования</Label>
        <Textarea
          id="additionalRequirements"
          name="additionalRequirements"
          value={formData.additionalRequirements}
          onChange={onInputChange}
          placeholder="Особые пожелания, примеры, ссылки..."
          rows={3}
        />
      </div>
    </div>
  );
}
