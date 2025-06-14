
import { portfolioProjects } from "@/data/portfolioProjects";
import EnhancedPortfolioCard from "./EnhancedPortfolioCard";
import { Target } from "lucide-react";

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

export default function AllProjects({ projects }: AllProjectsProps) {
  return (
    <section className="py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Target className="w-8 h-8 text-primary" />
          Все проекты
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
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
              image={imagePool[index % imagePool.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
