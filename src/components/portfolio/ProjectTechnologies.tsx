
import { Badge } from "@/components/ui/badge";

type ProjectTechnologiesProps = {
  technologies: string[];
};

export default function ProjectTechnologies({ technologies }: ProjectTechnologiesProps) {
  return (
    <section className="py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Использованные технологии
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {technologies.map((tech) => (
            <Badge key={tech} className="group px-8 py-4 text-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 hover:from-purple-600 hover:to-pink-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <span className="relative z-10">{tech}</span>
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
