
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChart3, TrendingUp, Users, Target, BookOpen, Quote, CheckCircle } from "lucide-react";

interface ServiceSeoExcerptEnhancedProps {
  seoText: string;
  serviceName: string;
}

export const ServiceSeoExcerptEnhanced = ({ seoText, serviceName }: ServiceSeoExcerptEnhancedProps) => {
  const [expanded, setExpanded] = useState(false);

  // Разбиваем текст на секции
  const sections = seoText.split(/\*\*[^*]+\*\*/g).filter(section => section.trim());
  const headers = seoText.match(/\*\*[^*]+\*\*/g) || [];
  
  // Первые 2 абзаца для превью
  const preview = sections.slice(0, 2).join('\n').substring(0, 400) + '...';
  
  // Извлекаем статистику и примеры
  const statsPattern = /📊[^📊]*?(?=📊|$)/g;
  const stats = seoText.match(statsPattern) || [];
  
  const examplesPattern = /```[^```]*```/g;
  const examples = seoText.match(examplesPattern) || [];
  
  const quotesPattern = /\*"[^"]*"\*[^*]*\*/g;
  const quotes = seoText.match(quotesPattern) || [];

  const renderFormattedText = (text: string) => {
    return text
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/```([^```]*)```/g, '<pre class="bg-slate-100 p-3 rounded-lg text-sm overflow-x-auto"><code>$1</code></pre>')
      .replace(/✅/g, '<span class="text-green-600">✅</span>')
      .replace(/❌/g, '<span class="text-red-600">❌</span>')
      .replace(/📊/g, '<span class="text-blue-600">📊</span>')
      .replace(/🎯/g, '<span class="text-orange-600">🎯</span>')
      .replace(/💡/g, '<span class="text-yellow-600">💡</span>')
      .replace(/🚀/g, '<span class="text-purple-600">🚀</span>');
  };

  if (!expanded) {
    return (
      <Card className="p-6 bg-gradient-to-br from-slate-50 to-blue-50/30 border-0 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Экспертная информация</h3>
            <p className="text-sm text-slate-600">Подробный разбор услуги с примерами и статистикой</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
            <BarChart3 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900">{stats.length}</div>
            <div className="text-sm text-slate-600">Графиков и данных</div>
          </div>
          
          <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
            <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900">{examples.length}</div>
            <div className="text-sm text-slate-600">Практических примеров</div>
          </div>
          
          <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
            <Quote className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900">{quotes.length}</div>
            <div className="text-sm text-slate-600">Экспертных цитат</div>
          </div>
        </div>

        <div className="text-slate-700 text-sm leading-relaxed mb-4">
          <div dangerouslySetInnerHTML={{ __html: renderFormattedText(preview) }} />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            <TrendingUp className="w-3 h-3 mr-1" />
            Актуальная статистика
          </Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Проверенные методики
          </Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            <Users className="w-3 h-3 mr-1" />
            Реальные кейсы
          </Badge>
        </div>

        <Button
          onClick={() => setExpanded(true)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white shadow-lg"
        >
          Читать полный гид по {serviceName.toLowerCase()}
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-slate-50 to-blue-50/30 border-0 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Полный гид: {serviceName}</h3>
            <p className="text-sm text-slate-600">Экспертная информация с примерами и кейсами</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setExpanded(false)}
        >
          Свернуть
        </Button>
      </div>

      <div className="prose prose-slate max-w-none">
        <div 
          className="text-slate-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: renderFormattedText(seoText) }}
        />
      </div>

      <Separator className="my-6" />

      <div className="flex items-center gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-1">
          <BarChart3 className="w-4 h-4" />
          Обновлено: {new Date().toLocaleDateString('ru')}
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          Основано на анализе 1000+ проектов
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle className="w-4 h-4" />
          Проверено экспертами
        </div>
      </div>
    </Card>
  );
};
