
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface ProjectData {
  goals: string;
  deadline: string;
}

interface Pricing {
  platformsPrice: number;
  scenariosPrice: number;
  dialogTypesPrice: number;
  totalPrice: number;
}

interface FinalStepProps {
  projectData: ProjectData;
  pricing: Pricing;
  platforms: string[];
  scenarios: number;
  complexity: string;
  audience: string;
  onProjectChange: (field: string, value: string) => void;
}

export default function FinalStep({
  projectData,
  pricing,
  platforms,
  scenarios,
  complexity,
  audience,
  onProjectChange
}: FinalStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Финальные детали</h3>
        <p className="text-gray-600">Последние настройки и подтверждение заказа</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="goals">Цели и KPI</Label>
          <Textarea
            id="goals"
            rows={3}
            value={projectData.goals}
            onChange={(e) => onProjectChange('goals', e.target.value)}
            placeholder="Чего хотите достичь с помощью бота?"
          />
        </div>

        <div>
          <Label htmlFor="deadline">Срок выполнения</Label>
          <Input
            id="deadline"
            value={projectData.deadline}
            onChange={(e) => onProjectChange('deadline', e.target.value)}
            placeholder="Например: 2 недели"
          />
        </div>
      </div>

      {/* Order Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-slate-900 mb-4">Итоговая стоимость</h4>
          <div className="space-y-2">
            {platforms.length > 0 && (
              <div className="flex justify-between">
                <span>Дополнительные платформы:</span>
                <span>{pricing.platformsPrice.toLocaleString()}₽</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Сценарии ({scenarios} шт.):</span>
              <span>{pricing.scenariosPrice.toLocaleString()}₽</span>
            </div>
            {pricing.dialogTypesPrice > 0 && (
              <div className="flex justify-between">
                <span>Типы диалогов:</span>
                <span>{pricing.dialogTypesPrice.toLocaleString()}₽</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Итого:</span>
              <span className="text-blue-600">{pricing.totalPrice.toLocaleString()}₽</span>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <div><strong>Платформы:</strong> {platforms.join(', ') || 'Telegram'}</div>
            <div><strong>Сложность:</strong> {complexity}</div>
            <div><strong>Аудитория:</strong> {audience}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
