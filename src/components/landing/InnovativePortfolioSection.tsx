
import PortfolioHeader from "./portfolio/PortfolioHeader";
import AchievementCards from "./portfolio/AchievementCards";
import PortfolioCards from "./portfolio/PortfolioCards";
import MetricsShowcase from "./portfolio/MetricsShowcase";
import PortfolioCTA from "./portfolio/PortfolioCTA";
import SuccessShowcase from "../portfolio/SuccessShowcase";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Eye } from "lucide-react";

export default function InnovativePortfolioSection() {
  return (
    <section className="py-32 bg-gradient-to-br from-slate-50/50 via-background to-primary/5 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/8 to-purple-500/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/8 to-blue-500/6 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-orange-500/6 to-pink-500/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <PortfolioHeader />
        <AchievementCards />
        <PortfolioCards />
        
        {/* Дополнительный блок со ссылкой на все кейсы */}
        <div className="text-center mb-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 max-w-2xl mx-auto border border-slate-200/50 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Хотите увидеть больше кейсов?
            </h3>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              У нас есть еще много успешных проектов в разных сферах. Изучите наше полное портфолио!
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white border-0 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Link to="/portfolio" className="flex items-center gap-3">
                <Eye className="w-6 h-6" />
                Все 25+ кейсов
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>

        <MetricsShowcase />
        <PortfolioCTA />
      </div>
      
      {/* Новая секция успеха */}
      <SuccessShowcase />
    </section>
  );
}
