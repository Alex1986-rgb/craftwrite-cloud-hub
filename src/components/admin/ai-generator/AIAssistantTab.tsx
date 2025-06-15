
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Lightbulb, User, BookOpen } from 'lucide-react';
import SmartRecommendations from './SmartRecommendations';
import ContextualHints from './ContextualHints';
import WritingTips from './WritingTips';
import PersonalAssistant from './PersonalAssistant';

interface AIAssistantTabProps {
  text: string;
  textType: string;
  qualityAnalysis?: any;
  cursorPosition?: number;
  onApplyRecommendation?: (recommendationId: string, suggestion: string) => void;
}

export default function AIAssistantTab({
  text,
  textType,
  qualityAnalysis,
  cursorPosition = 0,
  onApplyRecommendation
}: AIAssistantTabProps) {
  const [showHints, setShowHints] = useState(true);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-600" />
            AI Ассистент копирайтера
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600">
            Умный помощник для создания качественных текстов с персональными рекомендациями и обучающими материалами.
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Рекомендации
          </TabsTrigger>
          <TabsTrigger value="tips" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Советы
          </TabsTrigger>
          <TabsTrigger value="assistant" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Помощник
          </TabsTrigger>
          <TabsTrigger value="learning" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Обучение
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-4">
          <SmartRecommendations
            text={text}
            textType={textType}
            qualityAnalysis={qualityAnalysis}
            onApplyRecommendation={onApplyRecommendation}
          />
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <WritingTips
            textType={textType}
            currentText={text}
          />
        </TabsContent>

        <TabsContent value="assistant" className="space-y-4">
          <PersonalAssistant />
        </TabsContent>

        <TabsContent value="learning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Обучающие материалы
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-medium mb-2">🎯 Формула AIDA</h4>
                  <p className="text-sm text-slate-600">
                    Attention → Interest → Desire → Action. Классическая формула продающего текста.
                  </p>
                </div>

                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-medium mb-2">📊 Правило пирамиды</h4>
                  <p className="text-sm text-slate-600">
                    Самая важная информация в начале, детали - в конце. Подходит для новостей и статей.
                  </p>
                </div>

                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-medium mb-2">🧠 Триггеры убеждения</h4>
                  <p className="text-sm text-slate-600">
                    Социальное доказательство, авторитет, дефицит - мощные инструменты влияния.
                  </p>
                </div>

                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-medium mb-2">📝 Структура PAS</h4>
                  <p className="text-sm text-slate-600">
                    Problem → Agitation → Solution. Эффективна для продающих текстов и email.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">📚 Полезные ресурсы:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Книга "Слова, которые продают" - Д. Огилви
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Курс по SEO-копирайтингу от Яндекс.Практикум
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Блог CopyPro - свежие кейсы и техники
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Контекстные подсказки */}
      <ContextualHints
        text={text}
        cursorPosition={cursorPosition}
        isVisible={showHints}
      />
    </div>
  );
}
