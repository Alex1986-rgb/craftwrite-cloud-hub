
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Award, BarChart3, CheckCircle, ArrowRight } from "lucide-react";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  results: string[];
  metrics: Record<string, string>;
  tags: string[];
};

type FeaturedProjectsProps = {
  projects: Project[];
};

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Award className="w-8 h-8 text-primary" />
          Топовые кейсы
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {projects.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center relative">
                <BarChart3 className="w-16 h-16 text-primary" />
                <Badge className="absolute top-4 right-4">{item.category}</Badge>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground mb-6">{item.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(item.metrics).slice(0, 3).map(([key, value]) => (
                    <div key={key} className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{value}</div>
                      <div className="text-xs text-muted-foreground capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-6">
                  {item.results.map((result, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{result}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>

                <Button asChild className="w-full">
                  <Link to={`/portfolio/${item.id}`} className="flex items-center justify-center gap-2">
                    Подробнее о проекте
                    <ArrowRight className="w-4 h-4" />
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
