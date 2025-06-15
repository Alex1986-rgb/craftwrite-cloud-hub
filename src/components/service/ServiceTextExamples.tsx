
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Eye, Download, BarChart3, Copy, CheckCircle } from "lucide-react";
import { EnhancedTextExample } from "@/data/types/textExample";
import { toast } from "sonner";

interface ServiceTextExamplesProps {
  examples: EnhancedTextExample[];
  serviceName: string;
}

const ServiceTextExamples = ({ examples, serviceName }: ServiceTextExamplesProps) => {
  const [selectedExample, setSelectedExample] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!examples || examples.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">
              Примеры текстов готовятся
            </h3>
            <p className="text-slate-500">
              Скоро здесь появятся профессиональные примеры для услуги "{serviceName}"
            </p>
          </div>
        </div>
      </section>
    );
  }

  const currentExample = examples[selectedExample];

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success("Текст скопирован в буфер обмена");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast.error("Не удалось скопировать текст");
    }
  };

  const renderBlock = (block: any, index: number) => {
    switch (block.type) {
      case 'heading':
        const HeadingTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={index} className={`font-bold mb-6 text-slate-800 ${
            block.level === 1 ? 'text-3xl' : block.level === 2 ? 'text-2xl' : 'text-xl'
          }`}>
            {block.content}
          </HeadingTag>
        );
      
      case 'paragraph':
        return (
          <p key={index} className="mb-6 leading-relaxed text-slate-700 text-lg">
            {block.content}
          </p>
        );
      
      case 'list':
        return (
          <ul key={index} className="mb-6 space-y-3">
            {block.items?.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-blue-500 mt-2 text-lg">•</span>
                <span className="text-slate-700 text-lg">{item}</span>
              </li>
            ))}
          </ul>
        );
      
      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-blue-500 pl-6 py-4 mb-6 bg-blue-50 rounded-r-lg">
            <p className="italic text-slate-700 mb-3 text-lg">"{block.content}"</p>
            {block.author && (
              <cite className="text-base font-semibold">
                — {block.author}
                {block.position && <span className="text-slate-500">, {block.position}</span>}
              </cite>
            )}
          </blockquote>
        );
      
      case 'table':
        return (
          <div key={index} className="mb-6 overflow-x-auto">
            <table className="w-full border-collapse border border-slate-300 text-base">
              <thead>
                <tr className="bg-slate-100">
                  {block.tableData?.headers.map((header: string, i: number) => (
                    <th key={i} className="border border-slate-300 px-4 py-3 font-semibold text-left">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.tableData?.rows.map((row: string[], i: number) => (
                  <tr key={i} className="hover:bg-slate-50">
                    {row.map((cell: string, j: number) => (
                      <td key={j} className="border border-slate-300 px-4 py-3">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      
      case 'cta':
        return (
          <div key={index} className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-lg mb-6 text-center font-bold text-lg">
            {block.content}
          </div>
        );
      
      default:
        return null;
    }
  };

  const getFullText = (example: EnhancedTextExample) => {
    return example.blocks.map(block => {
      switch (block.type) {
        case 'heading':
        case 'paragraph':
        case 'quote':
        case 'cta':
          return block.content;
        case 'list':
          return block.items?.join('\n');
        case 'table':
          return block.tableData?.rows.map(row => row.join(' | ')).join('\n');
        default:
          return '';
      }
    }).filter(Boolean).join('\n\n');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Примеры профессиональных текстов
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Изучите качественные образцы текстов для услуги "{serviceName}". 
            Каждый пример создан нашими экспертами и показывает высокий уровень работы.
          </p>
        </div>

        {/* Example selector */}
        {examples.length > 1 && (
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {examples.map((example, index) => (
              <Button
                key={index}
                variant={selectedExample === index ? "default" : "outline"}
                onClick={() => setSelectedExample(index)}
                className="rounded-xl"
              >
                {example.title}
              </Button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Example content */}
          <div className="lg:col-span-3">
            <Card className="p-8 shadow-xl border-0 bg-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                    {currentExample.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{currentExample.category}</Badge>
                    <Badge 
                      style={{ 
                        backgroundColor: currentExample.colors.primary + '20', 
                        color: currentExample.colors.primary 
                      }}
                    >
                      {currentExample.description}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(getFullText(currentExample), selectedExample)}
                    className="flex items-center gap-2"
                  >
                    {copiedIndex === selectedExample ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    Копировать
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Скачать
                  </Button>
                </div>
              </div>

              {/* Content blocks */}
              <div className="prose max-w-none">
                {currentExample.blocks.map((block, index) => renderBlock(block, index))}
              </div>
            </Card>
          </div>

          {/* Metrics sidebar */}
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <h4 className="flex items-center gap-2 font-semibold mb-4 text-blue-800">
                <BarChart3 className="w-5 h-5" />
                Характеристики текста
              </h4>
              <div className="space-y-3">
                {Object.entries(currentExample.metrics).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm text-blue-700 capitalize">{key}:</span>
                    <span className="font-semibold text-blue-900">{value}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <h4 className="font-semibold mb-4 text-green-800">
                Что входит в работу
              </h4>
              <ul className="space-y-2 text-sm text-green-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  SEO-оптимизация
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Уникальность 100%
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Готовая структура
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Экспертная проверка
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <h4 className="font-semibold mb-4 text-purple-800">
                Готовы заказать?
              </h4>
              <p className="text-sm text-purple-700 mb-4">
                Получите такой же качественный текст для вашего проекта
              </p>
              <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
                <a href="/order">Заказать текст</a>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceTextExamples;
