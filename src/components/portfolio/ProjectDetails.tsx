
import { Card } from "@/components/ui/card";
import { Target, Zap } from "lucide-react";

type ProjectDetailsProps = {
  challenge: string;
  solution: string;
};

export default function ProjectDetails({ challenge, solution }: ProjectDetailsProps) {
  return (
    <section className="py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Card className="group p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-red-50 to-orange-50 border-red-200/50">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-playfair font-bold text-red-700">Вызов</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {challenge}
            </p>
          </Card>

          <Card className="group p-10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200/50">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-2xl group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-playfair font-bold text-blue-700">Решение</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {solution}
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
