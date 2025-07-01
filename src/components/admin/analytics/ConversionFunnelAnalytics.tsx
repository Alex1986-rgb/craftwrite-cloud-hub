
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowDown, Users, Clock, TrendingDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FunnelStep {
  step_number: number;
  step_name: string;
  total_entries: number;
  total_exits: number;
  total_completions: number;
  average_time_spent: number;
  conversion_rate: number;
}

export default function ConversionFunnelAnalytics() {
  const [funnelData, setFunnelData] = useState<FunnelStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFunnelData();
  }, []);

  const fetchFunnelData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_funnel_analytics');
      
      if (error) throw error;
      setFunnelData(data || []);
    } catch (err) {
      console.error('Error fetching funnel data:', err);
      setError('Ошибка загрузки данных воронки');
    } finally {
      setLoading(false);
    }
  };

  const getTotalDropoff = (current: FunnelStep, next?: FunnelStep) => {
    if (!next) return 0;
    return current.total_entries - next.total_entries;
  };

  const getDropoffRate = (current: FunnelStep, next?: FunnelStep) => {
    if (!next || current.total_entries === 0) return 0;
    return ((current.total_entries - next.total_entries) / current.total_entries) * 100;
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-4 text-slate-600">Загрузка аналитики воронки...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Воронка конверсий</h2>
        <Badge className="bg-blue-100 text-blue-800">
          Анализ этапов заказа
        </Badge>
      </div>

      {funnelData.length > 0 ? (
        <div className="space-y-4">
          {funnelData.map((step, index) => {
            const nextStep = funnelData[index + 1];
            const dropoff = getTotalDropoff(step, nextStep);
            const dropoffRate = getDropoffRate(step, nextStep);

            return (
              <div key={step.step_number} className="space-y-3">
                <Card className="border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Step Info */}
                      <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {step.step_number}
                          </div>
                          <h3 className="font-semibold text-lg">{step.step_name}</h3>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Users className="w-4 h-4" />
                            <span>{step.total_entries.toLocaleString()} входов</span>
                          </div>
                          {step.average_time_spent > 0 && (
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Clock className="w-4 h-4" />
                              <span>{step.average_time_spent.toFixed(0)}с средне</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Metrics */}
                      <div className="lg:col-span-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-slate-600 mb-1">Конверсия этапа</p>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-green-600">
                                {step.conversion_rate.toFixed(1)}%
                              </span>
                              <Progress value={step.conversion_rate} className="flex-1 h-2" />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-slate-600 mb-1">Завершений</p>
                            <span className="text-2xl font-bold text-blue-600">
                              {step.total_completions.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions needed */}
                      <div className="lg:col-span-1">
                        {step.conversion_rate < 70 && (
                          <Badge className="bg-orange-100 text-orange-800">
                            <TrendingDown className="w-3 h-3 mr-1" />
                            Требует оптимизации
                          </Badge>
                        )}
                        {step.conversion_rate >= 70 && step.conversion_rate < 90 && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            Хорошо
                          </Badge>
                        )}
                        {step.conversion_rate >= 90 && (
                          <Badge className="bg-green-100 text-green-800">
                            Отлично
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Dropoff Analysis */}
                {nextStep && dropoff > 0 && (
                  <div className="flex items-center justify-center py-2">
                    <div className="flex items-center gap-3 text-red-600 bg-red-50 px-4 py-2 rounded-lg">
                      <ArrowDown className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Потеряно {dropoff.toLocaleString()} пользователей ({dropoffRate.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Summary */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Сводка по воронке</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {funnelData[0]?.total_entries.toLocaleString() || 0}
                  </p>
                  <p className="text-sm text-slate-600">Всего входов</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {funnelData[funnelData.length - 1]?.total_completions.toLocaleString() || 0}
                  </p>
                  <p className="text-sm text-slate-600">Завершили весь путь</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">
                    {funnelData.length > 0 ? 
                      ((funnelData[funnelData.length - 1]?.total_completions / funnelData[0]?.total_entries) * 100).toFixed(1) : 0}%
                  </p>
                  <p className="text-sm text-slate-600">Общая конверсия</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Данные воронки не найдены
            </h3>
            <p className="text-slate-600">
              Аналитика воронки появится после обработки заказов через умную форму
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
