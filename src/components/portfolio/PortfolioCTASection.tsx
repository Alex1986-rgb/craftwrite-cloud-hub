
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function PortfolioCTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
      <div className="container max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Хотите такие же результаты?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Обсудим ваш проект и покажем, как наш опыт поможет достичь ваших целей
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary">
            <Link to="/order" className="flex items-center gap-2">
              Начать проект
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
            <Link to="/#contact">Получить консультацию</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
