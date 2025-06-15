
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Copy, 
  Download, 
  Eye, 
  Quote,
  Star,
  TrendingUp,
  Users,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Zap,
  Target,
  Award,
  MessageCircle,
  BarChart3
} from "lucide-react";
import { EnhancedTextExample as EnhancedTextExampleType, TextBlock } from "@/data/types/textExample";

interface EnhancedTextExampleProps {
  example: EnhancedTextExampleType;
  serviceSlug: string;
}

export const EnhancedTextExample: React.FC<EnhancedTextExampleProps> = ({ example, serviceSlug }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedBlock, setCopiedBlock] = useState<number | null>(null);

  const getIconForBlockType = (type: string) => {
    switch (type) {
      case 'heading': return <Target className="w-4 h-4" />;
      case 'quote': return <Quote className="w-4 h-4" />;
      case 'stats': return <BarChart3 className="w-4 h-4" />;
      case 'testimonial': return <MessageCircle className="w-4 h-4" />;
      case 'cta': return <Zap className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const copyToClipboard = async (content: string, blockIndex: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedBlock(blockIndex);
      setTimeout(() => setCopiedBlock(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const renderBlock = (block: TextBlock, index: number) => {
    const blockStyle = {
      borderLeft: `4px solid ${example.colors.primary}`,
    };

    switch (block.type) {
      case 'heading':
        const HeadingTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
        return (
          <div key={index} className="mb-6" style={blockStyle}>
            <div className="pl-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getIconForBlockType(block.type)}
                  <Badge variant="outline" style={{ color: example.colors.primary }}>
                    H{block.level || 2}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(block.content, index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedBlock === index ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <HeadingTag 
                className={`font-bold ${block.level === 1 ? 'text-3xl' : block.level === 2 ? 'text-2xl' : 'text-xl'} mb-2`}
                style={{ color: example.colors.primary }}
              >
                {block.content}
              </HeadingTag>
            </div>
          </div>
        );

      case 'quote':
        return (
          <div key={index} className="mb-6 group" style={blockStyle}>
            <div className="pl-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getIconForBlockType(block.type)}
                  <Badge variant="outline" style={{ color: example.colors.secondary }}>
                    Цитата
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(block.content, index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedBlock === index ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <div 
                className="bg-gradient-to-r from-slate-50 to-blue-50 p-4 rounded-lg border-l-4"
                style={{ borderLeftColor: example.colors.secondary }}
              >
                <Quote className="w-6 h-6 text-gray-400 mb-2" />
                <p className="text-gray-700 italic text-lg leading-relaxed mb-3">
                  "{block.content}"
                </p>
                {block.author && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {block.author.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{block.author}</div>
                      {block.position && (
                        <div className="text-sm text-gray-500">{block.position}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'table':
        return (
          <div key={index} className="mb-6 group" style={blockStyle}>
            <div className="pl-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getIconForBlockType(block.type)}
                  <Badge variant="outline" style={{ color: example.colors.accent }}>
                    Таблица
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(JSON.stringify(block.tableData, null, 2), index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedBlock === index ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              {block.tableData && (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
                    <thead>
                      <tr style={{ backgroundColor: example.colors.primary }}>
                        {block.tableData.headers.map((header, i) => (
                          <th key={i} className="text-white px-4 py-3 text-left font-semibold">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.tableData.rows.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          {row.map((cell, j) => (
                            <td key={j} className="px-4 py-3 border-b border-gray-200">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        );

      case 'list':
        return (
          <div key={index} className="mb-6 group" style={blockStyle}>
            <div className="pl-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getIconForBlockType(block.type)}
                  <Badge variant="outline" style={{ color: example.colors.accent }}>
                    Список
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(block.items?.join('\n') || '', index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedBlock === index ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <ul className="space-y-2">
                {block.items?.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div key={index} className="mb-6 group" style={blockStyle}>
            <div className="pl-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getIconForBlockType(block.type)}
                  <Badge variant="outline" style={{ color: example.colors.accent }}>
                    Призыв к действию
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(block.content, index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedBlock === index ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <div 
                className="bg-gradient-to-r p-6 rounded-lg text-center text-white shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${example.colors.primary}, ${example.colors.secondary})` 
                }}
              >
                <Zap className="w-8 h-8 mx-auto mb-3" />
                <p className="text-lg font-bold mb-4">{block.content}</p>
                <Button className="bg-white text-gray-800 hover:bg-gray-100 font-semibold px-6 py-2">
                  Действовать сейчас!
                </Button>
              </div>
            </div>
          </div>
        );

      case 'stats':
        return (
          <div key={index} className="mb-6 group" style={blockStyle}>
            <div className="pl-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getIconForBlockType(block.type)}
                  <Badge variant="outline" style={{ color: example.colors.primary }}>
                    Статистика
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(block.content, index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedBlock === index ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">+250%</div>
                  <div className="text-sm text-gray-600">Рост продаж</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">95%</div>
                  <div className="text-sm text-gray-600">Довольных клиентов</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">48ч</div>
                  <div className="text-sm text-gray-600">Среднее время</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-1">4.9★</div>
                  <div className="text-sm text-gray-600">Рейтинг качества</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div key={index} className="mb-4 group" style={blockStyle}>
            <div className="pl-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getIconForBlockType(block.type)}
                  <Badge variant="outline">
                    Текст
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(block.content, index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {copiedBlock === index ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <p className="text-gray-700 leading-relaxed">{block.content}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="mb-8 overflow-hidden">
      <CardHeader style={{ background: `linear-gradient(135deg, ${example.colors.primary}, ${example.colors.secondary})` }}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="w-5 h-5" />
            {example.title}
          </CardTitle>
          <Badge variant="secondary" className="bg-white/20 text-white">
            {example.category}
          </Badge>
        </div>
        <p className="text-white/90 text-sm">{example.description}</p>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-800">Пример профессионального текста</h4>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-1" />
                Предпросмотр
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Скачать
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {(isExpanded ? example.blocks : example.blocks.slice(0, 3)).map((block, index) => 
              renderBlock(block, index)
            )}
          </div>

          {example.blocks.length > 3 && (
            <div className="text-center mt-4">
              <Button
                variant="outline"
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    Свернуть
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    Показать больше ({example.blocks.length - 3} блоков)
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        <Separator />
        
        <div className="p-6 bg-gray-50">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Метрики эффективности
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(example.metrics).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-lg font-bold text-gray-800">{value}</div>
                <div className="text-sm text-gray-500 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
