
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Zap, ExternalLink, Globe } from "lucide-react";

export default function ProjectCTA() {
  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-primary/10 to-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container max-w-5xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-8 bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
          Хотите такие же результаты?
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Обсудим ваш проект и покажем, как наш опыт поможет достичь ваших целей
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button asChild size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Link to="/order" className="flex items-center gap-3">
              <Zap className="w-6 h-6" />
              Начать проект
              <ExternalLink className="w-6 h-6" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-10 py-6 border-2 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <Link to="/portfolio" className="flex items-center gap-3">
              <Globe className="w-6 h-6" />
              Все кейсы
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
