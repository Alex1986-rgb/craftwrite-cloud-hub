
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function PortfolioCTA() {
  return (
    <div className="text-center">
      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
        Готовы получить такие же результаты?
      </h3>
      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Начните с бесплатной консультации, и мы покажем, как контент может изменить ваш бизнес
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg">
          <Link to="/order">Заказать контент</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/portfolio">Все кейсы</Link>
        </Button>
      </div>
    </div>
  );
}
