
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

export default function PortfolioHero() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5"></div>
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 px-6 py-3 text-lg font-semibold">
            <Eye className="w-5 h-5 mr-2" />
            Портфолио
          </Badge>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Наши успешные проекты
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Реальные кейсы с измеримыми результатами. Посмотрите, как наш контент 
            помогает бизнесу достигать амбициозных целей
          </p>
        </div>
      </div>
    </section>
  );
}
