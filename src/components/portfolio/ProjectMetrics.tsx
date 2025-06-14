import { Card } from "@/components/ui/card";
import { RadialBarChart, RadialBar } from 'recharts';

type ProjectMetricsProps = {
  metrics: {
    roi: string;
  };
};

export default function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  return (
    <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 animate-scale-in">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-4">ROI</h3>
        
            <RadialBarChart
              width={200}
              height={200}
              cx={100}
              cy={100}
              innerRadius="60%"
              outerRadius="90%"
              data={[{ name: 'ROI', value: parseInt(metrics.roi), fill: '#10B981' }]}
            >
              <RadialBar
                label={{ fill: '#fff', position: 'insideStart' }}
                background
                clockWise
                dataKey="value"
                cornerRadius={10}
              />
            </RadialBarChart>
        
        <p className="text-sm text-slate-300">Увеличение возврата инвестиций</p>
      </div>
    </Card>
  );
}
