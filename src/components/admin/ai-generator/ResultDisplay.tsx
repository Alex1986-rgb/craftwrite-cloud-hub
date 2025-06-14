
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Bot, CheckCircle, Copy, Download, RefreshCw, FileText, Mail, MessageSquare, Users } from "lucide-react";

interface ResultDisplayProps {
  generatedText: string;
  setGeneratedText: (text: string) => void;
  selectedContentType?: {
    value: string;
    label: string;
    icon: any;
    description: string;
  };
}

export default function ResultDisplay({ generatedText, setGeneratedText, selectedContentType }: ResultDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Сгенерированный текст</CardTitle>
          {generatedText && (
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="w-4 h-4 mr-1" />
                Уникальность: 95%
              </Badge>
              {selectedContentType && (
                <Badge variant="outline">
                  <selectedContentType.icon className="w-4 h-4 mr-1" />
                  {selectedContentType.label}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {generatedText ? (
          <div className="space-y-4">
            <Textarea
              value={generatedText}
              onChange={(e) => setGeneratedText(e.target.value)}
              rows={15}
              className="font-mono text-sm"
            />
            
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Копировать
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Excel
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                HTML
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Перегенерировать
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-bold">{generatedText.length}</div>
                <div className="text-sm text-slate-600">Символов</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">{generatedText.split(' ').length}</div>
                <div className="text-sm text-slate-600">Слов</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">{generatedText.split('.').length - 1}</div>
                <div className="text-sm text-slate-600">Предложений</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-500">
            <Bot className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium mb-2">Готов к генерации</p>
            <p className="text-sm">Заполните параметры и нажмите "Сгенерировать текст"</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
