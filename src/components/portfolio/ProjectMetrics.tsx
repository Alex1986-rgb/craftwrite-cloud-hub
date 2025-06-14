
import { Card } from "@/components/ui/card";
import { RadialBarChart, RadialBar } from 'recharts';

type ProjectMetricsProps = {
  metrics: {
    [key: string]: string;
  };
};

export default function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  // Get the first metric value for display, regardless of the key
  const firstMetricKey = Object.keys(metrics)[0];
  const firstMetricValue = metrics[firstMetricKey];
  
  // Extract numeric value for the chart
  const numericValue = parseInt(firstMetricValue.replace(/[^0-9]/g, '')) || 0;
  
  return (
    <Card className="p-6 bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 animate-scale-in">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-4">Ключевая метрика</h3>
        
        <RadialBarChart
          width={200}
          height={200}
          cx={100}
          cy={100}
          innerRadius="60%"
          outerRadius="90%"
          data={[{ name: 'Metric', value: Math.min(numericValue, 100), fill: '#10B981' }]}
        >
          <RadialBar
            label={{ fill: '#fff', position: 'insideStart' }}
            background
            dataKey="value"
            cornerRadius={10}
          />
        </RadialBarChart>
        
        <div className="mt-4">
          <div className="text-2xl font-bold text-white">{firstMetricValue}</div>
          <p className="text-sm text-slate-300 capitalize">{firstMetricKey.replace(/([A-Z])/g, ' $1').toLowerCase()}</p>
        </div>
      </div>
    </Card>
  );
}
