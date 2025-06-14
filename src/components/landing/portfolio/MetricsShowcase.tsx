
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, MousePointer, Users, ArrowRight } from "lucide-react";

export default function MetricsShowcase() {
  return (
    <div className="bg-gradient-to-r from-primary/5 via-purple-500/5 to-blue-500/5 rounded-3xl p-8 md:p-12 border border-primary/10 mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Средние результаты наших клиентов
          </h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">+245%</div>
                <div className="text-sm text-muted-foreground">Рост органического трафика</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <MousePointer className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">+180%</div>
                <div className="text-sm text-muted-foreground">Увеличение конверсий</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">+320%</div>
                <div className="text-sm text-muted-foreground">Рост вовлеченности</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center lg:text-left">
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Эти цифры — результат работы с командой профессионалов, которые понимают специфику вашего бизнеса и знают, как создавать контент, который работает.
          </p>
          <Button asChild size="lg" className="group">
            <Link to="/portfolio" className="flex items-center gap-2">
              Посмотреть все кейсы
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
