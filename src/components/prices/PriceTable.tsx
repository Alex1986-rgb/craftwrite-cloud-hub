
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import type { Price } from "@/data/prices";

type PriceTableProps = {
  items: Price[];
};

export const PriceTable = ({ items }: PriceTableProps) => {
  const { loading, handleStripeCheckout } = useStripeCheckout();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handlePayClick = (priceId: string) => {
    setProcessingId(priceId);
    handleStripeCheckout(priceId);
  };

  return (
    <div className="border rounded-xl overflow-hidden bg-card shadow">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            <th className="py-3 px-4 text-left font-semibold">Услуга</th>
            <th className="py-3 px-4 text-left font-semibold">Цена</th>
            <th className="py-3 px-4 text-right font-semibold">Действие</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.priceId} className="border-t even:bg-muted/40">
              <td className="py-4 px-4">{item.service}</td>
              <td className="py-4 px-4 font-semibold">{item.price}</td>
              <td className="py-4 px-4 text-right">
                <Button
                  onClick={() => handlePayClick(item.priceId)}
                  disabled={loading && processingId === item.priceId}
                  className="w-full sm:w-auto"
                >
                  {loading && processingId === item.priceId
                    ? "Обработка..."
                    : "Оплатить"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
