
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InteractiveCalculator from '@/components/interactive/InteractiveCalculator';
import SmartBriefConstructor from '@/components/interactive/SmartBriefConstructor';
import LiveExamplesShowcase from '@/components/interactive/LiveExamplesShowcase';
import PersonalizedRecommendations from '@/components/interactive/PersonalizedRecommendations';
import { Calculator, FileText, Eye, Brain } from 'lucide-react';

export default function InteractivePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Интерактивные инструменты
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Профессиональные инструменты для планирования, расчета и анализа контент-проектов
          </p>
        </div>

        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 p-1 bg-white shadow-lg rounded-xl">
            <TabsTrigger value="calculator" className="flex items-center gap-2 py-3">
              <Calculator className="w-5 h-5" />
              <span className="hidden sm:inline">Калькулятор</span>
            </TabsTrigger>
            <TabsTrigger value="brief" className="flex items-center gap-2 py-3">
              <FileText className="w-5 h-5" />
              <span className="hidden sm:inline">Конструктор ТЗ</span>
            </TabsTrigger>
            <TabsTrigger value="examples" className="flex items-center gap-2 py-3">
              <Eye className="w-5 h-5" />
              <span className="hidden sm:inline">Примеры</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2 py-3">
              <Brain className="w-5 h-5" />
              <span className="hidden sm:inline">AI-рекомендации</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="mt-8">
            <InteractiveCalculator />
          </TabsContent>

          <TabsContent value="brief" className="mt-8">
            <SmartBriefConstructor />
          </TabsContent>

          <TabsContent value="examples" className="mt-8">
            <LiveExamplesShowcase />
          </TabsContent>

          <TabsContent value="recommendations" className="mt-8">
            <PersonalizedRecommendations />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
