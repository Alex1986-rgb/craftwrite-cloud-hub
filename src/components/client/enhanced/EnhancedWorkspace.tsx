
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Kanban, 
  Bot, 
  BarChart3,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { RealTimeChat } from '../chat/RealTimeChat';
import { OrderKanban } from '../kanban/OrderKanban';
import { ClientAIAssistant } from '../ai/ClientAIAssistant';
import EnhancedClientAnalytics from './EnhancedClientAnalytics';

export function EnhancedWorkspace() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 bg-white dark:bg-slate-900 z-50 p-6' : ''}`}>
      <div className="flex justify-between items-center animate-slide-in-up">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Рабочее пространство</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Полный контроль над вашими проектами
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Bot className="w-4 h-4 mr-1" />
            AI Enhanced
          </Badge>
          <Button
            variant="outline"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="glass-card border-0"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="kanban" className="w-full">
        <TabsList className="glass-card border-0 p-1 h-auto animate-slide-in-up" style={{ animationDelay: '100ms' }}>
          <TabsTrigger value="kanban" className="flex items-center gap-2 px-4 py-2">
            <Kanban className="w-4 h-4" />
            Kanban
          </TabsTrigger>
          <TabsTrigger value="chat" className="flex items-center gap-2 px-4 py-2">
            <MessageSquare className="w-4 h-4" />
            Чат
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2 px-4 py-2">
            <Bot className="w-4 h-4" />
            AI-Помощник
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 px-4 py-2">
            <BarChart3 className="w-4 h-4" />
            Аналитика
          </TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="animate-slide-in-up" style={{ animationDelay: '200ms' }}>
          <OrderKanban />
        </TabsContent>

        <TabsContent value="chat" className="animate-slide-in-up" style={{ animationDelay: '200ms' }}>
          <div className="max-w-4xl mx-auto">
            <RealTimeChat />
          </div>
        </TabsContent>

        <TabsContent value="ai" className="animate-slide-in-up" style={{ animationDelay: '200ms' }}>
          <ClientAIAssistant />
        </TabsContent>

        <TabsContent value="analytics" className="animate-slide-in-up" style={{ animationDelay: '200ms' }}>
          <EnhancedClientAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}
