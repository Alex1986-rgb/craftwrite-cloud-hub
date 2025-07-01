
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, Star, TrendingUp, AlertTriangle } from 'lucide-react';
import { CustomerAnalytics } from '@/hooks/useAdvancedAnalytics';

interface CustomerLifetimeValueProps {
  customerData: CustomerAnalytics[];
}

export default function CustomerLifetimeValue({ customerData }: CustomerLifetimeValueProps) {
  // Calculate segments
  const highValueCustomers = customerData.filter(c => c.segment === 'high_value' || c.total_spent > 50000);
  const regularCustomers = customerData.filter(c => c.segment === 'regular' || (c.total_spent >= 10000 && c.total_spent <= 50000));
  const atRiskCustomers = customerData.filter(c => c.segment === 'at_risk' || c.churn_probability && c.churn_probability > 70);

  // Calculate metrics
  const totalCLV = customerData.reduce((sum, c) => sum + c.lifetime_value, 0);
  const avgCLV = customerData.length > 0 ? totalCLV / customerData.length : 0;
  const avgOrders = customerData.length > 0 ? 
    customerData.reduce((sum, c) => sum + c.total_orders, 0) / customerData.length : 0;
  const avgSatisfaction = customerData.filter(c => c.satisfaction_score).length > 0 ?
    customerData.filter(c => c.satisfaction_score).reduce((sum, c) => sum + (c.satisfaction_score || 0), 0) / 
    customerData.filter(c => c.satisfaction_score).length : 0;

  // Top customers by CLV
  const topCustomers = [...customerData]
    .sort((a, b) => b.lifetime_value - a.lifetime_value)
    .slice(0, 10);

  const getSegmentColor = (segment?: string) => {
    switch (segment) {
      case 'high_value': return 'bg-green-100 text-green-800';
      case 'regular': return 'bg-blue-100 text-blue-800';
      case 'at_risk': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSegmentLabel = (segment?: string) => {
    switch (segment) {
      case 'high_value': return 'VIP';
      case 'regular': return 'Обычный';
      case 'at_risk': return 'Под угрозой';
      default: return 'Новый';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Пожизненная ценность клиентов</h2>
        <Badge className="bg-purple-100 text-purple-800">
          CLV анализ
        </Badge>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Общая CLV</p>
                <p className="text-xl font-bold text-green-600">₽{totalCLV.toLocaleString()}</p>
                <p className="text-xs text-slate-500 mt-1">{customerData.length} клиентов</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Средняя CLV</p>
                <p className="text-xl font-bold text-blue-600">₽{avgCLV.toLocaleString()}</p>
                <p className="text-xs text-slate-500 mt-1">На клиента</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Средние заказы</p>
                <p className="text-xl font-bold text-purple-600">{avgOrders.toFixed(1)}</p>
                <p className="text-xs text-slate-500 mt-1">На клиента</p>
              </div>
              <Star className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Удовлетворенность</p>
                <p className="text-xl font-bold text-orange-600">{avgSatisfaction.toFixed(1)}/5</p>
                <p className="text-xs text-slate-500 mt-1">Средний рейтинг</p>
              </div>
              <Star className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Segments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-500" />
              VIP клиенты
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{highValueCustomers.length}</p>
                <p className="text-sm text-slate-600">клиентов</p>
              </div>
              <Progress 
                value={(highValueCustomers.length / customerData.length) * 100} 
                className="h-2"
              />
              <p className="text-xs text-slate-500 text-center">
                {((highValueCustomers.length / customerData.length) * 100).toFixed(1)}% от всех клиентов
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              Обычные клиенты
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{regularCustomers.length}</p>
                <p className="text-sm text-slate-600">клиентов</p>
              </div>
              <Progress 
                value={(regularCustomers.length / customerData.length) * 100} 
                className="h-2"
              />
              <p className="text-xs text-slate-500 text-center">
                {((regularCustomers.length / customerData.length) * 100).toFixed(1)}% от всех клиентов
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Под угрозой
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center">
                <p className="text-3xl font-bold text-red-600">{atRiskCustomers.length}</p>
                <p className="text-sm text-slate-600">клиентов</p>
              </div>
              <Progress 
                value={(atRiskCustomers.length / customerData.length) * 100} 
                className="h-2"
              />
              <p className="text-xs text-slate-500 text-center">
                Требуют внимания
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Customers */}
      <Card>
        <CardHeader>
          <CardTitle>Топ клиенты по CLV</CardTitle>
        </CardHeader>
        <CardContent>
          {topCustomers.length > 0 ? (
            <div className="space-y-3">
              {topCustomers.map((customer, index) => (
                <div key={customer.user_id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">Клиент #{customer.user_id.slice(-8)}</p>
                      <p className="text-sm text-slate-600">
                        {customer.total_orders} заказов • Первый заказ: {
                          customer.first_order_date ? 
                            new Date(customer.first_order_date).toLocaleDateString('ru-RU') : 
                            'Неизвестно'
                        }
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">₽{customer.lifetime_value.toLocaleString()}</p>
                    <Badge className={getSegmentColor(customer.segment)}>
                      {getSegmentLabel(customer.segment)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500 py-8">Данные о клиентах не найдены</p>
          )}
        </CardContent>
      </Card>

      {customerData.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Данные о клиентах не найдены
            </h3>
            <p className="text-slate-600">
              Аналитика CLV появится после завершения заказов клиентами
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
