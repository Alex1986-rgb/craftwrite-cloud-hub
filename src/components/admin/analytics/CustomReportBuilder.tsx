import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus, FileText, Calendar, Settings, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { enhancedToast } from '@/components/ui/toast-enhanced';

interface ReportConfig {
  name: string;
  type: 'chart' | 'table' | 'dashboard';
  metrics: string[];
  dateRange: string;
  filters: Record<string, any>;
  schedule?: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string;
  };
}

export default function CustomReportBuilder() {
  const [reports, setReports] = useState<any[]>([]);
  const [showBuilder, setShowBuilder] = useState(false);
  const [reportConfig, setReportConfig] = useState<ReportConfig>({
    name: '',
    type: 'chart',
    metrics: [],
    dateRange: '30',
    filters: {},
    schedule: {
      enabled: false,
      frequency: 'weekly',
      time: '09:00'
    }
  });

  const availableMetrics = [
    { value: 'revenue', label: 'Доходы' },
    { value: 'orders', label: 'Заказы' },
    { value: 'conversion_rate', label: 'Конверсия' },
    { value: 'avg_order_value', label: 'Средний чек' },
    { value: 'customer_lifetime_value', label: 'CLV' },
    { value: 'satisfaction_score', label: 'Удовлетворенность' },
    { value: 'completion_time', label: 'Время выполнения' }
  ];

  const handleSaveReport = async () => {
    try {
      const { error } = await supabase
        .from('custom_reports')
        .insert({
          report_name: reportConfig.name,
          report_type: reportConfig.type,
          report_config: {
            metrics: reportConfig.metrics,
            dateRange: reportConfig.dateRange,
            filters: reportConfig.filters
          },
          schedule: reportConfig.schedule?.enabled ? reportConfig.schedule : null
        });

      if (error) throw error;

      enhancedToast.success('Отчет сохранен!', {
        description: 'Пользовательский отчет успешно создан'
      });

      setShowBuilder(false);
      setReportConfig({
        name: '',
        type: 'chart',
        metrics: [],
        dateRange: '30',
        filters: {},
        schedule: {
          enabled: false,
          frequency: 'weekly',
          time: '09:00'
        }
      });
    } catch (err) {
      console.error('Error saving report:', err);
      enhancedToast.error('Ошибка сохранения отчета');
    }
  };

  const handleMetricToggle = (metric: string) => {
    setReportConfig(prev => ({
      ...prev,
      metrics: prev.metrics.includes(metric)
        ? prev.metrics.filter(m => m !== metric)
        : [...prev.metrics, metric]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Конструктор отчетов</h2>
        <Button 
          onClick={() => setShowBuilder(!showBuilder)}
          className="bg-gradient-to-r from-purple-600 to-blue-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Создать отчет
        </Button>
      </div>

      {showBuilder && (
        <Card>
          <CardHeader>
            <CardTitle>Новый пользовательский отчет</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="report-name">Название отчета</Label>
                <Input
                  id="report-name"
                  value={reportConfig.name}
                  onChange={(e) => setReportConfig(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Например: Еженедельная сводка продаж"
                />
              </div>
              <div>
                <Label htmlFor="report-type">Тип отчета</Label>
                <Select 
                  value={reportConfig.type} 
                  onValueChange={(value: any) => setReportConfig(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="chart">График</SelectItem>
                    <SelectItem value="table">Таблица</SelectItem>
                    <SelectItem value="dashboard">Панель</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Metrics Selection */}
            <div>
              <Label>Метрики для отчета</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {availableMetrics.map((metric) => (
                  <div
                    key={metric.value}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      reportConfig.metrics.includes(metric.value)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleMetricToggle(metric.value)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{metric.label}</span>
                      {reportConfig.metrics.includes(metric.value) && (
                        <Badge className="bg-blue-500 text-white">✓</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <Label htmlFor="date-range">Период данных</Label>
              <Select 
                value={reportConfig.dateRange} 
                onValueChange={(value) => setReportConfig(prev => ({ ...prev, dateRange: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Последние 7 дней</SelectItem>
                  <SelectItem value="30">Последние 30 дней</SelectItem>
                  <SelectItem value="90">Последние 90 дней</SelectItem>
                  <SelectItem value="365">Последний год</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Schedule Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Автоматическая генерация</Label>
                <Switch
                  checked={reportConfig.schedule?.enabled}
                  onCheckedChange={(checked) => 
                    setReportConfig(prev => ({
                      ...prev,
                      schedule: { ...prev.schedule!, enabled: checked }
                    }))
                  }
                />
              </div>

              {reportConfig.schedule?.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-blue-200">
                  <div>
                    <Label>Частота</Label>
                    <Select 
                      value={reportConfig.schedule.frequency} 
                      onValueChange={(value: any) => 
                        setReportConfig(prev => ({
                          ...prev,
                          schedule: { ...prev.schedule!, frequency: value }
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Ежедневно</SelectItem>
                        <SelectItem value="weekly">Еженедельно</SelectItem>
                        <SelectItem value="monthly">Ежемесячно</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Время отправки</Label>
                    <Input
                      type="time"
                      value={reportConfig.schedule.time}
                      onChange={(e) => 
                        setReportConfig(prev => ({
                          ...prev,
                          schedule: { ...prev.schedule!, time: e.target.value }
                        }))
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t">
              <Button onClick={handleSaveReport} disabled={!reportConfig.name || reportConfig.metrics.length === 0}>
                <FileText className="w-4 h-4 mr-2" />
                Сохранить отчет
              </Button>
              <Button variant="outline" onClick={() => setShowBuilder(false)}>
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Сохраненные отчеты</CardTitle>
        </CardHeader>
        <CardContent>
          {reports.length > 0 ? (
            <div className="space-y-3">
              {reports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <div>
                      <h3 className="font-medium">{report.report_name}</h3>
                      <p className="text-sm text-slate-600">
                        {report.report_type} • {report.report_config.metrics?.length || 0} метрик
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.schedule && (
                      <Badge className="bg-green-100 text-green-800">
                        <Calendar className="w-3 h-3 mr-1" />
                        Авто
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Отчеты не найдены
              </h3>
              <p className="text-slate-600">
                Создайте свой первый пользовательский отчет
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
