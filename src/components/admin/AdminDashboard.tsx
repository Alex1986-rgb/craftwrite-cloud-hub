
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Settings, Users, FileText, BarChart3, Wrench, Bug, Brain } from "lucide-react";
import OrderManagement from "./OrderManagement";
import ClientManagement from "./ClientManagement";
import AnalyticsPanel from "./AnalyticsPanel";
import SettingsPanel from "./SettingsPanel";
import SystemDiagnostics from "./SystemDiagnostics";
import OrderProcessingDebugger from "./OrderProcessingDebugger";
import UnifiedSystemManager from "./UnifiedSystemManager";
import LandingOrderManager from "./landing/LandingOrderManager";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Панель администратора</h1>
          <p className="text-gray-600">Управление заказами, клиентами и настройками системы</p>
        </div>

        <Tabs defaultValue="unified" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="unified" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Система
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Заказы
            </TabsTrigger>
            <TabsTrigger value="landing" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Лендинги
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Клиенты
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="diagnostics" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Диагностика
            </TabsTrigger>
            <TabsTrigger value="debugger" className="flex items-center gap-2">
              <Bug className="h-4 w-4" />
              Отладчик
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="unified">
            <UnifiedSystemManager />
          </TabsContent>

          <TabsContent value="orders">
            <OrderManagement />
          </TabsContent>

          <TabsContent value="landing">
            <LandingOrderManager />
          </TabsContent>

          <TabsContent value="clients">
            <ClientManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsPanel />
          </TabsContent>

          <TabsContent value="diagnostics">
            <SystemDiagnostics />
          </TabsContent>

          <TabsContent value="debugger">
            <OrderProcessingDebugger />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
