
import PortfolioHeader from "./portfolio/PortfolioHeader";
import AchievementCards from "./portfolio/AchievementCards";
import PortfolioCards from "./portfolio/PortfolioCards";
import MetricsShowcase from "./portfolio/MetricsShowcase";
import PortfolioCTA from "./portfolio/PortfolioCTA";

export default function InnovativePortfolioSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50/50 to-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-primary/6 to-purple-500/4 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-gradient-to-r from-emerald-500/6 to-blue-500/4 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <PortfolioHeader />
        <AchievementCards />
        <PortfolioCards />
        <MetricsShowcase />
        <PortfolioCTA />
      </div>
    </section>
  );
}
