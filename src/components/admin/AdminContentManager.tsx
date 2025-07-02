import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrderProcessingDebug from './OrderProcessingDebug';
import TestOrderGenerator from './TestOrderGenerator';
import OrderProcessingMonitor from './OrderProcessingMonitor';
import QualityAnalyzer from './ai-quality/QualityAnalyzer';
import ABTestManager from './ab-testing/ABTestManager';
import NotificationSystem from './notifications/NotificationSystem';
import AdvancedAnalytics from './analytics/AdvancedAnalytics';
import ContentVersioning from './versioning/ContentVersioning';
import SystemTester from './SystemTester';
import { 
  FileText, 
  Eye, 
  RefreshCw, 
  Download, 
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Play
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface GeneratedContent {
  id: string;
  order_id: string;
  content: string;
  content_type: string;
  prompt_used?: string;
  ai_model: string;
  quality_score?: number;
  is_active: boolean;
  created_at: string;
  order?: {
    id: string;
    service_name: string;
    contact_name: string;
    contact_email: string;
    status: string;
    generated_prompt?: string;
  };
}

interface Order {
  id: string;
  service_name: string;
  contact_name: string;
  status: string;
  generated_prompt?: string;
  created_at: string;
}

export default function AdminContentManager() {
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [processingOrders, setProcessingOrders] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadContent();
    loadOrders();
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('generated_content_versions')
        .select(`
          *,
          order:orders (
            id,
            service_name,
            contact_name,
            contact_email,
            status,
            generated_prompt
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGeneratedContent(data || []);
    } catch (error) {
      console.error('Error loading content:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить контент",
        variant: "destructive"
      });
    }
  };

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('id, service_name, contact_name, status, generated_prompt, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const reprocessOrder = async (orderId: string) => {
    setProcessingOrders(prev => new Set(prev).add(orderId));
    
    try {
      const { error } = await supabase.rpc('reprocess_order', { order_id: orderId });
      
      if (error) throw error;

      toast({
        title: "Успех",
        description: "Заказ отправлен на повторную обработку",
      });

      // Обновляем данные
      setTimeout(() => {
        loadContent();
        loadOrders();
      }, 2000);

    } catch (error) {
      console.error('Error reprocessing order:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось запустить повторную обработку",
        variant: "destructive"
      });
    } finally {
      setProcessingOrders(prev => {
        const newSet = new Set(prev);
        newSet.delete(orderId);
        return newSet;
      });
    }
  };

  const filteredContent = generatedContent.filter(content =>
    content.order?.service_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.order?.contact_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pendingOrders = orders.filter(order => 
    order.status === 'pending' || order.status === 'processing'
  );

  const completedOrders = orders.filter(order => 
    order.status === 'completed'
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Управление контентом</h2>
          <p className="text-muted-foreground">Просмотр и управление сгенерированными текстами</p>
        </div>
        <Button onClick={() => { loadContent(); loadOrders(); }} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Обновить
        </Button>
      </div>

      <Tabs defaultValue="test" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="test">Тестирование</TabsTrigger>
          <TabsTrigger value="monitor">Мониторинг</TabsTrigger>
          <TabsTrigger value="quality">Качество</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          <TabsTrigger value="automation">Автоматизация</TabsTrigger>
        </TabsList>

        <TabsContent value="test">
          <SystemTester />
        </TabsContent>

        <TabsContent value="monitor">
          <Tabs defaultValue="monitoring" className="space-y-4">
            <TabsList>
              <TabsTrigger value="monitoring">Мониторинг системы</TabsTrigger>
              <TabsTrigger value="generator">Тестовые заказы</TabsTrigger>
              <TabsTrigger value="debug">Отладка</TabsTrigger>
            </TabsList>
            <TabsContent value="monitoring">
              <OrderProcessingMonitor />
            </TabsContent>
            <TabsContent value="generator">
              <TestOrderGenerator />
            </TabsContent>
            <TabsContent value="debug">
              <OrderProcessingDebug />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="quality">
          <Tabs defaultValue="analyzer" className="space-y-4">
            <TabsList>
              <TabsTrigger value="analyzer">Анализ качества</TabsTrigger>
              <TabsTrigger value="abtest">A/B тестирование</TabsTrigger>
              <TabsTrigger value="versioning">Версионирование</TabsTrigger>
            </TabsList>
            <TabsContent value="analyzer">
              <QualityAnalyzer />
            </TabsContent>
            <TabsContent value="abtest">
              <ABTestManager />
            </TabsContent>
            <TabsContent value="versioning">
              <ContentVersioning />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="analytics">
          <AdvancedAnalytics />
        </TabsContent>

        <TabsContent value="automation">
          <NotificationSystem />
        </TabsContent>

      </Tabs>
    </div>
  );
}