
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FileUpload } from '@/components/ui/file-upload';
import { 
  FileText, 
  Download, 
  Upload, 
  Settings, 
  Zap,
  CheckCircle,
  AlertCircle,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface BulkSeoData {
  url: string;
  pageTitle: string;
  metaTitle: string;
  metaDescription: string;
  htmlContent: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

export default function BulkSeoOptimization() {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [urlList, setUrlList] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<BulkSeoData[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  
  const [settings, setSettings] = useState({
    textLength: '150-300',
    tone: 'professional',
    includeKeywords: true,
    keywordDensity: '2-3',
    includeMetaTags: true,
    includeStructuredData: false,
    language: 'ru',
    autoLink: false,
    pricePerPage: 50 // рублей за страницу
  });

  const navigate = useNavigate();

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      setUploadedFile(file);
      
      // Парсим файл для извлечения URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const urls = text.split('\n')
          .map(line => line.trim())
          .filter(line => line.startsWith('http') || line.includes('.'));
        
        setUrlList(urls);
        toast.success(`Загружено ${urls.length} ссылок для обработки`);
      };
      reader.readAsText(file);
    }
  };

  const startProcessing = async () => {
    if (urlList.length === 0) {
      toast.error('Загрузите файл со ссылками');
      return;
    }

    setProcessing(true);
    setCurrentStep(3);
    setCompletedCount(0);

    // Инициализация результатов
    const initialResults: BulkSeoData[] = urlList.map(url => ({
      url,
      pageTitle: '',
      metaTitle: '',
      metaDescription: '',
      htmlContent: '',
      status: 'pending'
    }));
    
    setResults(initialResults);

    // Симуляция обработки страниц
    for (let i = 0; i < urlList.length; i++) {
      const url = urlList[i];
      
      // Обновляем статус на "обработка"
      setResults(prev => prev.map((item, index) => 
        index === i ? { ...item, status: 'processing' } : item
      ));

      try {
        // Симуляция генерации контента
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const generatedContent = {
          pageTitle: `Оптимизированный заголовок для ${url}`,
          metaTitle: `SEO заголовок | ${url.split('/').pop()}`,
          metaDescription: `Профессиональное SEO описание для страницы ${url}. Оптимизировано для поисковиков.`,
          htmlContent: `<h1>SEO заголовок</h1><p>Оптимизированный SEO текст для страницы ${url}. Включает ключевые слова и структурированный контент для лучшего ранжирования.</p>`,
          status: 'completed' as const
        };

        setResults(prev => prev.map((item, index) => 
          index === i ? { ...item, ...generatedContent } : item
        ));

        setCompletedCount(prev => prev + 1);
        
      } catch (error) {
        setResults(prev => prev.map((item, index) => 
          index === i ? { ...item, status: 'error' } : item
        ));
      }
    }

    setProcessing(false);
    toast.success('Обработка завершена!');
  };

  const exportToExcel = () => {
    const csvContent = [
      ['Ссылка на страницу', 'Название страницы', 'Мета-заголовок', 'Мета-описание', 'HTML текст'],
      ...results.map(item => [
        item.url,
        item.pageTitle,
        item.metaTitle,
        item.metaDescription,
        item.htmlContent
      ])
    ].map(row => row.join('\t')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `seo_optimization_${Date.now()}.csv`;
    link.click();
    
    toast.success('Файл Excel экспортирован');
  };

  const totalPrice = urlList.length * settings.pricePerPage;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-600" />
                  Загрузка файла со ссылками
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Загрузите файл с ссылками на страницы для оптимизации. 
                    Поддерживаются форматы: .txt, .csv, .xlsx
                  </p>
                  
                  <FileUpload 
                    onFilesSelected={handleFileUpload}
                    maxFiles={1}
                    acceptedTypes={['.txt', '.csv', '.xlsx']}
                    maxSize={5}
                  />
                  
                  {urlList.length > 0 && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-800 font-medium">
                        ✅ Найдено {urlList.length} ссылок для обработки
                      </p>
                      <p className="text-sm text-green-600 mt-1">
                        Примерная стоимость: {totalPrice.toLocaleString()} ₽
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  Настройки оптимизации
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Длина SEO текста</Label>
                    <Select onValueChange={(value) => setSettings(prev => ({ ...prev, textLength: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите длину" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100-200">100-200 символов (краткие)</SelectItem>
                        <SelectItem value="150-300">150-300 символов (стандартные)</SelectItem>
                        <SelectItem value="300-500">300-500 символов (подробные)</SelectItem>
                        <SelectItem value="500+">500+ символов (развернутые)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Тон текста</Label>
                    <Select onValueChange={(value) => setSettings(prev => ({ ...prev, tone: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тон" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Профессиональный</SelectItem>
                        <SelectItem value="friendly">Дружелюбный</SelectItem>
                        <SelectItem value="expert">Экспертный</SelectItem>
                        <SelectItem value="casual">Неформальный</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeKeywords"
                        checked={settings.includeKeywords}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, includeKeywords: !!checked }))}
                      />
                      <Label htmlFor="includeKeywords">Автоматический подбор ключевых слов</Label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeMetaTags"
                        checked={settings.includeMetaTags}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, includeMetaTags: !!checked }))}
                      />
                      <Label htmlFor="includeMetaTags">Генерация мета-тегов</Label>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="autoLink"
                        checked={settings.autoLink}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoLink: !!checked }))}
                      />
                      <Label htmlFor="autoLink">Автоматическая внутренняя перелинковка</Label>
                    </div>
                    <span className="text-sm text-green-600">+10 ₽/страница</span>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Стоимость обработки</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Базовая стоимость ({urlList.length} страниц):</span>
                      <span>{(urlList.length * 50).toLocaleString()} ₽</span>
                    </div>
                    {settings.autoLink && (
                      <div className="flex justify-between text-orange-600">
                        <span>Автоперелинковка:</span>
                        <span>+{(urlList.length * 10).toLocaleString()} ₽</span>
                      </div>
                    )}
                    <hr className="my-2" />
                    <div className="flex justify-between font-medium text-blue-900">
                      <span>Итого:</span>
                      <span>{(urlList.length * (50 + (settings.autoLink ? 10 : 0))).toLocaleString()} ₽</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  Обработка страниц
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Прогресс:</span>
                    <span className="font-medium">{completedCount} из {urlList.length} страниц</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(completedCount / urlList.length) * 100}%` }}
                    />
                  </div>

                  <div className="max-h-96 overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>URL</TableHead>
                          <TableHead>Статус</TableHead>
                          <TableHead>Мета-заголовок</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {results.map((result, index) => (
                          <TableRow key={index}>
                            <TableCell className="max-w-xs truncate">{result.url}</TableCell>
                            <TableCell>
                              {result.status === 'pending' && <AlertCircle className="w-4 h-4 text-gray-400" />}
                              {result.status === 'processing' && <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />}
                              {result.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-600" />}
                              {result.status === 'error' && <AlertCircle className="w-4 h-4 text-red-600" />}
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{result.metaTitle || '-'}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {!processing && completedCount === urlList.length && (
                    <div className="flex gap-4 justify-center">
                      <Button onClick={exportToExcel} className="bg-green-600 hover:bg-green-700">
                        <Download className="w-4 h-4 mr-2" />
                        Скачать Excel
                      </Button>
                      <Button onClick={() => setCurrentStep(1)} variant="outline">
                        Новая обработка
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Массовая SEO-оптимизация
            </h1>
            <p className="text-gray-600 text-lg">
              Оптимизируйте сотни страниц автоматически с помощью ИИ
            </p>
          </div>

          {renderStep()}

          <div className="flex justify-between items-center mt-8">
            {currentStep > 1 && (
              <Button variant="outline" onClick={() => setCurrentStep(prev => prev - 1)}>
                Назад
              </Button>
            )}
            
            {currentStep === 1 && urlList.length > 0 && (
              <Button onClick={() => setCurrentStep(2)} className="ml-auto">
                Настроить параметры
              </Button>
            )}
            
            {currentStep === 2 && (
              <Button onClick={startProcessing} className="ml-auto bg-green-600 hover:bg-green-700">
                <DollarSign className="w-4 h-4 mr-2" />
                Начать обработку ({totalPrice.toLocaleString()} ₽)
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
