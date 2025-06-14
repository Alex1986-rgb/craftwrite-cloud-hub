
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Bot,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const revenueData = [
  { month: "Янв", revenue: 45000, orders: 12 },
  { month: "Фев", revenue: 52000, orders: 15 },
  { month: "Мар", revenue: 68000, orders: 18 },
  { month: "Апр", revenue: 75000, orders: 22 },
  { month: "Май", revenue: 89000, orders: 28 },
  { month: "Июн", revenue: 95000, orders: 32 },
];

const serviceData = [
  { name: "SEO-статьи", value: 35, color: "#3B82F6" },
  { name: "Лендинги", value: 25, color: "#8B5CF6" },
  { name: "Email-кампании", value: 20, color: "#10B981" },
  { name: "Соцсети", value: 15, color: "#F59E0B" },
  { name: "Прочее", value: 5, color: "#EF4444" },
];

export default function AdminDashboard() {
  const [liveStats, setLiveStats] = useState({
    revenue: 158340,
    orders: 24,
    clients: 187,
    aiGenerated: 156
  });

  const [recentOrders, setRecentOrders] = useState([
    { id: "ORD-001", client: "ООО 'Технологии'", service: "SEO-статья", status: "В работе", amount: 8500 },
    { id: "ORD-002", client: "ИП Петров", service: "Лендинг", status: "Завершен", amount: 25000 },
    { id: "ORD-003", client: "Старт-ап XYZ", service: "Email-кампания", status: "Новый", amount: 12000 },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600">Добро пожаловать в панель управления CopyPro Cloud</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Система работает
          </Badge>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Bot className="w-4 h-4 mr-2" />
            Запустить AI
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Общий доход</p>
                <p className="text-2xl font-bold">₽{liveStats.revenue.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm">+12.5%</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Заказы</p>
                <p className="text-2xl font-bold">{liveStats.orders}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm">+8 новых</span>
                </div>
              </div>
              <ShoppingCart className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Клиенты</p>
                <p className="text-2xl font-bold">{liveStats.clients}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm">+15 новых</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">AI тексты</p>
                <p className="text-2xl font-bold">{liveStats.aiGenerated}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Bot className="w-4 h-4" />
                  <span className="text-sm">за месяц</span>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
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
                  dot={{ fill: "#3B82F6", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Распределение услуг</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {serviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Последние заказы</CardTitle>
            <Button variant="outline" size="sm">
              Посмотреть все
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                    {order.id.split('-')[1]}
                  </div>
                  <div>
                    <p className="font-medium">{order.client}</p>
                    <p className="text-sm text-slate-600">{order.service}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge 
                    variant={order.status === 'Завершен' ? 'default' : order.status === 'В работе' ? 'secondary' : 'outline'}
                    className={
                      order.status === 'Завершен' ? 'bg-green-100 text-green-800' :
                      order.status === 'В работе' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {order.status}
                  </Badge>
                  <p className="font-bold text-lg">₽{order.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
