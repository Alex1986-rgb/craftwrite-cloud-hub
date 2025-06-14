
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPortfolio() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-primary/5 to-background">
      <div className="container max-w-4xl mx-auto px-4 pt-32 pb-20 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-3xl rounded-full"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 text-white">
              Проект не найден
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Извините, запрашиваемый проект не существует или был перемещен.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
              <Link to="/portfolio" className="flex items-center gap-2">
                <ArrowLeft className="w-5 h-5" />
                Вернуться к портфолио
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
