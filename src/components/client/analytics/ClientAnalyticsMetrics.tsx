
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Target, Clock, DollarSign, BarChart3 } from 'lucide-react';

interface ProjectMetric {
  name: string;
  value: number;
  change: number;
  isPositive: boolean;
}

interface ClientAnalyticsMetricsProps {
  metrics: ProjectMetric[];
}

export default function ClientAnalyticsMetrics({ metrics }: ClientAnalyticsMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                {index === 0 && <Target className="w-5 h-5 text-blue-600" />}
                {index === 1 && <Clock className="w-5 h-5 text-blue-600" />}
                {index === 2 && <DollarSign className="w-5 h-5 text-blue-600" />}
                {index === 3 && <BarChart3 className="w-5 h-5 text-blue-600" />}
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                metric.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {metric.change}%
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">{metric.name}</p>
              <p className="text-xl font-bold">
                {index === 2 ? `₽${metric.value.toLocaleString()}` : 
                 index === 1 || index === 3 ? `${metric.value}` : 
                 metric.value}
                {index === 1 && ' дней'}
                {index === 3 && '/10'}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
