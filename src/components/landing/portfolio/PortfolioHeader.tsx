
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

export default function PortfolioHeader() {
  return (
    <div className="text-center mb-16">
      <Badge variant="secondary" className="mb-6 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border-emerald-500/20">
        <Eye className="w-5 h-5 mr-2" />
        Наши результаты
      </Badge>
      <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
        Кейсы, которые говорят сами за себя
      </h2>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        Каждый проект — это история успеха наших клиентов. Посмотрите, как мы помогаем бизнесу расти
      </p>
    </div>
  );
}
