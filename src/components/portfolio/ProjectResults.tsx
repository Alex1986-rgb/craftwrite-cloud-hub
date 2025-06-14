
import { Award, CheckCircle } from "lucide-react";

type ProjectResultsProps = {
  results: string[];
};

export default function ProjectResults({ results }: ProjectResultsProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50/50 to-green-50/50">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-16 flex items-center justify-center gap-4">
          <Award className="w-12 h-12 text-primary" />
          <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            Достигнутые результаты
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {results.map((result, index) => (
            <div key={index} className="group flex items-start gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex-shrink-0 p-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-6 h-6" />
              </div>
              <span className="text-foreground font-medium text-lg">{result}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
