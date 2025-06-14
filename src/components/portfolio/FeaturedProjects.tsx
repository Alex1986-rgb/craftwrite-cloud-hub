
import { portfolioProjects } from "@/data/portfolioProjects";
import EnhancedPortfolioCard from "./EnhancedPortfolioCard";
import { Award } from "lucide-react";

type FeaturedProjectsProps = {
  projects: typeof portfolioProjects;
};

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const featuredProjects = projects.filter(project => project.featured);

  if (featuredProjects.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Award className="w-8 h-8 text-primary" />
          Топовые кейсы
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project) => (
            <EnhancedPortfolioCard
              key={project.id}
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
          ))}
        </div>
      </div>
    </section>
  );
}
