
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, ShoppingCart, DollarSign, Eye, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const revenueData = [
  { month: "Янв", revenue: 45000, orders: 12, visitors: 1500 },
  { month: "Фев", revenue: 52000, orders: 15, visitors: 1800 },
  { month: "Мар", revenue: 68000, orders: 18, visitors: 2100 },
  { month: "Апр", revenue: 75000, orders: 22, visitors: 2400 },
  { month: "Май", revenue: 89000, orders: 28, visitors: 2800 },
  { month: "Июн", revenue: 95000, orders: 32, visitors: 3200 },
];

const trafficSources = [
  { name: "Прямые заходы", value: 35, color: "#3B82F6" },
  { name: "Google", value: 30, color: "#8B5CF6" },
  { name: "Яндекс", value: 20, color: "#10B981" },
  { name: "Соцсети", value: 10, color: "#F59E0B" },
  { name: "Реклама", value: 5, color: "#EF4444" },
];

export default function AnalyticsPanel() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Аналитика</h1>
          <p className="text-slate-600">Подробная статистика и анализ эффективности</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">
          Данные за последние 30 дней
        </Badge>
      </div>

      {/* Основные метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Посетители</p>
                <p className="text-2xl font-bold">3,247</p>
                <p className="text-sm text-green-600">+12.5% ↗</p>
              </div>
              <Eye className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Конверсия</p>
                <p className="text-2xl font-bold">4.8%</p>
                <p className="text-sm text-green-600">+0.8% ↗</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Время на сайте</p>
                <p className="text-2xl font-bold">3:24</p>
                <p className="text-sm text-green-600">+15s ↗</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Отказы</p>
                <p className="text-2xl font-bold">24.3%</p>
                <p className="text-sm text-red-600">+2.1% ↘</p>
              </div>
              <Users className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="traffic">Трафик</TabsTrigger>
          <TabsTrigger value="conversion">Конверсии</TabsTrigger>
          <TabsTrigger value="ai">AI Аналитика</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Динамика доходов</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Источники трафика</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={trafficSources}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="traffic">
          <Card>
            <CardHeader>
              <CardTitle>Анализ трафика</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-500">
                <p>Детальная аналитика трафика</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conversion">
          <Card>
            <CardHeader>
              <CardTitle>Воронка конверсий</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-500">
                <p>Анализ конверсий по этапам</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>AI Аналитика</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-500">
                <p>Аналитика эффективности AI-текстов</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
