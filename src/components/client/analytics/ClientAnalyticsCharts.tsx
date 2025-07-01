
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, PieChart } from 'lucide-react';

interface ChartData {
  month: string;
  orders: number;
  spending: number;
}

interface ServiceStat {
  service: string;
  count: number;
  percentage: number;
}

interface ClientAnalyticsChartsProps {
  monthlyData: ChartData[];
  serviceStats: ServiceStat[];
}

export default function ClientAnalyticsCharts({ monthlyData, serviceStats }: ClientAnalyticsChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Динамика по месяцам
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 text-sm font-medium">{data.month}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">Заказов: {data.orders}</span>
                      <Badge variant="secondary" className="text-xs">
                        ₽{data.spending.toLocaleString()}
                      </Badge>
                    </div>
                    <Progress 
                      value={(data.orders / Math.max(...monthlyData.map(d => d.orders))) * 100} 
                      className="h-2" 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-5 h-5" />
            Распределение услуг
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serviceStats.map((stat) => (
              <div key={stat.service} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{stat.service}</span>
                    <span className="text-sm text-slate-600">{stat.count} шт.</span>
                  </div>
                  <Progress value={stat.percentage} className="h-2" />
                </div>
                <div className="ml-3 text-sm font-medium">{stat.percentage}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
