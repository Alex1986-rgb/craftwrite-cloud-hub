
import { Button } from "@/components/ui/button";
import { Home, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function PaymentSuccessActions() {
  return (
    <nav className="flex flex-col sm:flex-row gap-4 justify-center mb-8" aria-label="Дальнейшие действия">
      <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
        <Link to="/" className="flex items-center gap-2">
          <Home className="w-5 h-5" aria-hidden="true" />
          На главную
        </Link>
      </Button>
      
      <Button asChild variant="outline" size="lg">
        <Link to="/portfolio" className="flex items-center gap-2">
          <ArrowRight className="w-5 h-5" aria-hidden="true" />
          Посмотреть примеры работ
        </Link>
      </Button>
    </nav>
  );
}
