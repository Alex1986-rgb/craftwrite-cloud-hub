
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Target, TrendingUp, ExternalLink } from "lucide-react";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  metrics: Record<string, string>;
  tags: string[];
};

type AllProjectsProps = {
  projects: Project[];
};

export default function AllProjects({ projects }: AllProjectsProps) {
  return (
    <section className="py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Target className="w-8 h-8 text-primary" />
          Все проекты
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center relative">
                <TrendingUp className="w-12 h-12 text-slate-400" />
                <Badge variant="outline" className="absolute top-2 right-2 text-xs">
                  {item.category}
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {item.description}
                </p>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {Object.entries(item.metrics).slice(0, 2).map(([key, value]) => (
                    <div key={key} className="text-center p-2 bg-slate-50 rounded">
                      <div className="text-lg font-bold text-primary">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>

                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link to={`/portfolio/${item.id}`} className="flex items-center justify-center gap-2">
                    Детали
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
