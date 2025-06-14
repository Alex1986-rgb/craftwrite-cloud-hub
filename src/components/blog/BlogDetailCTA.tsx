
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function BlogDetailCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Нужны тексты для вашего бизнеса?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Получите профессиональный контент, который приводит клиентов
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link to="/order">Заказать контент</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
            <Link to="/#contact">Получить консультацию</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
