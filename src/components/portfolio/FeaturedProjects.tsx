
import { portfolioProjects } from "@/data/portfolioProjects";
import EnhancedPortfolioCard from "./EnhancedPortfolioCard";
import { Award, Sparkles, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type FeaturedProjectsProps = {
  projects: typeof portfolioProjects;
};

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const featuredProjects = projects.filter(project => project.featured);

  if (featuredProjects.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Modern background with geometric shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-500/8 to-blue-500/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Modern header with floating elements */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-6 py-3 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Sparkles className="w-5 h-5 mr-2" />
              Премиум кейсы
            </Badge>
            <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-playfair font-bold mb-8 bg-gradient-to-r from-slate-900 via-primary to-purple-600 bg-clip-text text-transparent leading-tight">
            Топовые кейсы
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
            Проекты, которые изменили бизнес наших клиентов и принесли миллионы рублей прибыли
          </p>

          {/* Statistics cards */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {[
              { value: "500%+", label: "Средний рост ROI" },
              { value: "25M₽", label: "Привлечено инвестиций" },
              { value: "98%", label: "Довольных клиентов" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Enhanced grid with staggered animation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {featuredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="animate-fade-in hover:scale-[1.02] transition-all duration-500"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <EnhancedPortfolioCard
                id={project.id}
                title={project.title}
                category={project.category}
                description={project.description}
                metrics={project.metrics}
                tags={project.tags}
                featured={project.featured}
                results={project.results}
                image="photo-1498050108023-c5249f4df085"
              />
            </div>
          ))}
        </div>

        {/* Call to action section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <TrendingUp className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h3 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                Готовы к таким же результатам?
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Начните свой проект сегодня и получите первые результаты уже через месяц
              </p>
              <button className="bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all duration-300 hover:scale-105 shadow-lg">
                Обсудить проект
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
