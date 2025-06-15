
interface PriceBreakdownDisplayProps {
  basePrice: number;
  adjustments: Record<string, number>;
  currency: string;
}

export default function PriceBreakdownDisplay({ 
  basePrice, 
  adjustments, 
  currency 
}: PriceBreakdownDisplayProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Базовая стоимость</span>
        <span className="font-medium">{basePrice.toLocaleString()} {currency}</span>
      </div>
      
      {Object.entries(adjustments).map(([name, amount]) => (
        <div key={name} className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">+ {name}</span>
          <span className={amount > 0 ? "text-orange-600" : "text-green-600"}>
            +{amount.toLocaleString()} {currency}
          </span>
        </div>
      ))}
    </div>
  );
}
