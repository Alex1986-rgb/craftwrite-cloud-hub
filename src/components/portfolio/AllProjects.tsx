
import { portfolioProjects } from "@/data/portfolioProjects";
import EnhancedPortfolioCard from "./EnhancedPortfolioCard";
import { Target, Grid3X3, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type AllProjectsProps = {
  projects: typeof portfolioProjects;
};

const imagePool = [
  "photo-1488590528505-98d2b5aba04b",
  "photo-1461749280684-dccba630e2f6", 
  "photo-1486312338219-ce68d2c6f44d",
  "photo-1498050108023-c5249f4df085",
  "photo-1483058712412-4245e9b90334",
  "photo-1496307653780-42ee777d4833"
];

const categories = ["Все", "E-commerce", "Лендинги", "SaaS", "Контент-маркетинг"];

export default function AllProjects({ projects }: AllProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjects = selectedCategory === "Все" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section className="py-20 bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20 relative">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Modern header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-primary/10 to-purple-500/10 text-primary border-primary/20 px-6 py-3 text-lg font-semibold">
            <Grid3X3 className="w-5 h-5 mr-2" />
            Полное портфолио
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-6 bg-gradient-to-r from-slate-900 via-primary to-purple-600 bg-clip-text text-transparent">
            Все проекты
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Изучите наши работы в разных сферах и найдите вдохновение для своего проекта
          </p>
        </div>

        {/* Enhanced filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg hover:shadow-xl'
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-primary/30'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-slate-500" />
            <span className="text-slate-600 font-medium">{filteredProjects.length} проектов</span>
          </div>
        </div>
        
        {/* Enhanced grid */}
        <div className={`grid gap-8 mb-16 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1 lg:grid-cols-2 gap-12'
        }`}>
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="group animate-fade-in hover:scale-[1.02] transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
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
                image={imagePool[index % imagePool.length]}
              />
            </div>
          ))}
        </div>

        {/* Load more section */}
        <div className="text-center">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 shadow-lg inline-block">
            <Target className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-playfair font-bold mb-4 text-slate-800">
              Нужен похожий проект?
            </h3>
            <p className="text-slate-600 mb-6 max-w-md">
              Расскажите нам о своих целях, и мы создадим стратегию роста именно для вас
            </p>
            <Button className="bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
              Получить консультацию
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
