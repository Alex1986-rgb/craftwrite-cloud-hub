
import { TrendingUp, DollarSign } from 'lucide-react';

interface PriceRecommendationsProps {
  confidence: number;
}

export default function PriceRecommendations({ confidence }: PriceRecommendationsProps) {
  return (
    <>
      {confidence < 70 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4">
          <div className="flex items-start gap-2">
            <TrendingUp className="w-4 h-4 text-orange-600 mt-0.5" />
            <div className="text-sm">
              <div className="font-medium text-orange-900 mb-1">Уточните детали для точной оценки</div>
              <div className="text-orange-700">
                Заполните больше фильтров и вопросов для получения более точной стоимости проекта.
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <DollarSign className="w-4 h-4 text-blue-600 mt-0.5" />
          <div className="text-sm">
            <div className="font-medium text-blue-900 mb-1">Экономьте при заказе пакета</div>
            <div className="text-blue-700">
              При заказе 3+ текстов скидка до 15%. При заказе 5+ текстов скидка до 25%.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
