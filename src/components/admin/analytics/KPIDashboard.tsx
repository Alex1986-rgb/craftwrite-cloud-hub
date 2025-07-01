
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Target, AlertCircle } from 'lucide-react';
import { KPIData } from '@/hooks/useAdvancedAnalytics';

interface KPIDashboardProps {
  kpis: KPIData[];
}

export default function KPIDashboard({ kpis }: KPIDashboardProps) {
  const getKPIIcon = (category: string) => {
    switch (category) {
      case 'financial': return '💰';
      case 'operational': return '⚡';
      case 'satisfaction': return '😊';
      default: return '📊';
    }
  };

  const getKPIStatus = (value: number, target?: number) => {
    if (!target) return 'neutral';
    const percentage = (value / target) * 100;
    if (percentage >= 100) return 'success';
    if (percentage >= 80) return 'warning';
    return 'danger';
  };

  const getProgressValue = (value: number, target?: number) => {
    if (!target) return 50;
    return Math.min((value / target) * 100, 100);
  };

  const formatValue = (value: number, unit: string) => {
    switch (unit) {
      case 'currency':
        return `₽${value.toLocaleString()}`;
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'count':
        return value.toLocaleString();
      default:
        return value.toString();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'danger': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Ключевые показатели эффективности</h2>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Target className="w-4 h-4" />
          <span>Обновлено в реальном времени</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi) => {
          const status = getKPIStatus(kpi.kpi_value, kpi.kpi_target);
          const progressValue = getProgressValue(kpi.kpi_value, kpi.kpi_target);

          return (
            <Card key={kpi.kpi_name} className="relative overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getKPIIcon(kpi.category)}</span>
                    <CardTitle className="text-base capitalize">
                      {kpi.kpi_name.replace('_', ' ')}
                    </CardTitle>
                  </div>
                  <Badge className={getStatusColor(status)}>
                    {status === 'success' && <TrendingUp className="w-3 h-3 mr-1" />}
                    {status === 'danger' && <TrendingDown className="w-3 h-3 mr-1" />}
                    {status === 'warning' && <AlertCircle className="w-3 h-3 mr-1" />}
                    {status === 'success' ? 'Цель достигнута' : 
                     status === 'warning' ? 'Близко к цели' : 
                     status === 'danger' ? 'Ниже цели' : 'Без цели'}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-3xl font-bold text-slate-900">
                      {formatValue(kpi.kpi_value, kpi.unit)}
                    </span>
                    {kpi.kpi_target && (
                      <span className="text-sm text-slate-500">
                        / {formatValue(kpi.kpi_target, kpi.unit)}
                      </span>
                    )}
                  </div>

                  {kpi.kpi_target && (
                    <div className="space-y-2">
                      <Progress 
                        value={progressValue} 
                        className="h-2"
                      />
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>Прогресс к цели</span>
                        <span>{progressValue.toFixed(0)}%</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-xs text-slate-400">
                  Обновлено: {new Date(kpi.updated_at).toLocaleString('ru-RU')}
                </div>
              </CardContent>

              {/* Category indicator */}
              <div className={`absolute top-0 right-0 w-1 h-full ${
                kpi.category === 'financial' ? 'bg-green-500' :
                kpi.category === 'operational' ? 'bg-blue-500' :
                kpi.category === 'satisfaction' ? 'bg-purple-500' :
                'bg-gray-500'
              }`} />
            </Card>
          );
        })}
      </div>

      {kpis.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Target className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              KPI не найдены
            </h3>
            <p className="text-slate-600">
              Данные KPI будут отображаться здесь после обработки заказов и платежей
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
