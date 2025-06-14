
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function PricingCTA() {
  return (
    <div className="text-center mt-16">
      <p className="text-lg text-muted-foreground mb-6">
        Нужна консультация по выбору тарифа?
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" variant="outline">
          <Link to="/prices">Подробные цены</Link>
        </Button>
        <Button asChild size="lg">
          <Link to="/order">Получить расчет</Link>
        </Button>
      </div>
    </div>
  );
}
