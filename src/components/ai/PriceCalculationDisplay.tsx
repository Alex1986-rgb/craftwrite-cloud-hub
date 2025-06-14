
import { PriceCalculation } from "./PriceCalculator";

interface PriceCalculationDisplayProps {
  calculation: PriceCalculation;
}

export const PriceCalculationDisplay = ({ calculation }: PriceCalculationDisplayProps) => {
  return (
    <div className="ml-11 p-3 bg-green-50 border border-green-200 rounded-xl">
      <h4 className="font-semibold text-green-800 mb-2">💰 Расчет стоимости</h4>
      <div className="text-sm text-green-700 space-y-1">
        <p><strong>Базовая цена:</strong> {calculation.basePrice}₽</p>
        <p><strong>Итого:</strong> {calculation.finalPrice}₽</p>
        <p className="text-xs">{calculation.timeline}</p>
      </div>
    </div>
  );
};
