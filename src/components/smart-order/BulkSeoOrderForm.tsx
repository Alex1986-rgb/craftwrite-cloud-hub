import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  Globe, 
  Sparkles, 
  Download, 
  AlertCircle,
  CheckCircle,
  Loader2,
  Trash2,
  Eye,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';
import { useSupabaseOrders } from '@/hooks/useSupabaseOrders';

interface BulkSeoPage {
  url: string;
  pageTitle: string;
  contentType?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  generatedText?: string;
  metaTitle?: string;
  metaDescription?: string;
  error?: string;
}

interface BulkSeoProject {
  projectName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  pages: BulkSeoPage[];
  settings: {
    includeKeywords: boolean;
    seoOptimization: boolean;
    textLength: number;
    language: string;
  };
}

export default function BulkSeoOrderForm() {
  const [project, setProject] = useState<BulkSeoProject>({
    projectName: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    pages: [],
    settings: {
      includeKeywords: true,
      seoOptimization: true,
      textLength: 3000,
      language: 'ru'
    }
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadMethod, setUploadMethod] = useState<'manual' | 'file'>('manual');
  const [urlInput, setUrlInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const { createOrder } = useSupabaseOrders();

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      toast.error('Поддерживаются только CSV и Excel файлы');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          toast.error('Файл должен содержать минимум 2 строки (заголовок и данные)');
          return;
        }

        // Пропускаем заголовок и парсим данные
        const pages: BulkSeoPage[] = lines.slice(1).map((line, index) => {
          const [url, pageTitle] = line.split(',').map(cell => cell.trim().replace(/"/g, ''));
          
          if (!url || !pageTitle) {
            throw new Error(`Ошибка в строке ${index + 2}: URL или заголовок не указан`);
          }

          return {
            url: url.startsWith('http') ? url : `https://${url}`,
            pageTitle: pageTitle,
            status: 'pending' as const
          };
        });

        setProject(prev => ({ ...prev, pages }));
        toast.success(`Загружено ${pages.length} страниц`);
        
      } catch (error: any) {
        toast.error('Ошибка обработки файла: ' + error.message);
      }
    };

    reader.readAsText(file);
  }, []);

  const addUrlManually = () => {
    if (!urlInput.trim() || !titleInput.trim()) {
      toast.error('Заполните URL и заголовок страницы');
      return;
    }

    const url = urlInput.startsWith('http') ? urlInput : `https://${urlInput}`;
    
    const newPage: BulkSeoPage = {
      url: url.trim(),
      pageTitle: titleInput.trim(),
      status: 'pending'
    };

    setProject(prev => ({
      ...prev,
      pages: [...prev.pages, newPage]
    }));

    setUrlInput('');
    setTitleInput('');
    toast.success('Страница добавлена');
  };

  const removePage = (index: number) => {
    setProject(prev => ({
      ...prev,
      pages: prev.pages.filter((_, i) => i !== index)
    }));
  };

  const generateSeoTexts = async () => {
    if (!project.projectName || !project.clientName || !project.clientEmail) {
      toast.error('Заполните информацию о проекте и клиенте');
      return;
    }

    if (project.pages.length === 0) {
      toast.error('Добавьте минимум одну страницу');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      // Создаем заказ в системе
      const orderData = {
        service_slug: 'bulk-seo-optimization',
        service_name: 'Массовая SEO-оптимизация',
        contact_name: project.clientName,
        contact_email: project.clientEmail,
        contact_phone: project.clientPhone,
        details: `Массовая генерация SEO-текстов для ${project.pages.length} страниц проекта "${project.projectName}"`,
        estimated_price: calculateTotalPrice(),
        service_options: {
          projectName: project.projectName,
          totalPages: project.pages.length,
          settings: project.settings,
          pages: project.pages.map(page => ({
            url: page.url,
            pageTitle: page.pageTitle
          }))
        }
      };

      const result = await createOrder(orderData);
      
      if (result.success) {
        // Симулируем процесс генерации для демонстрации
        await simulateGeneration();
        
        toast.success('Заказ создан успешно!', {
          description: `Заказ #${result.order?.id.slice(0, 8)} принят в обработку`
        });
      } else {
        throw new Error(result.error || 'Ошибка создания заказа');
      }

    } catch (error: any) {
      toast.error('Ошибка создания заказа: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const simulateGeneration = async () => {
    const totalSteps = project.pages.length;
    
    for (let i = 0; i < totalSteps; i++) {
      // Симулируем генерацию для каждой страницы
      setProject(prev => ({
        ...prev,
        pages: prev.pages.map((page, index) => 
          index === i 
            ? { 
                ...page, 
                status: 'processing' as const 
              }
            : page
        )
      }));

      // Симулируем время обработки
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Завершаем обработку страницы
      setProject(prev => ({
        ...prev,
        pages: prev.pages.map((page, index) => 
          index === i 
            ? { 
                ...page, 
                status: 'completed' as const,
                generatedText: `Профессиональный SEO-текст для страницы "${page.pageTitle}". Оптимизированный контент длиной ${project.settings.textLength} символов с учетом ключевых слов и требований поисковых систем.`,
                metaTitle: `${page.pageTitle} | SEO-оптимизированный заголовок`,
                metaDescription: `${page.pageTitle} - профессиональные услуги с гарантией качества. ⭐ Быстро и надежно.`
              }
            : page
        )
      }));

      setProgress(((i + 1) / totalSteps) * 100);
    }
  };

  const calculateTotalPrice = () => {
    const pricePerPage = 500; // 500 руб за страницу
    const basePrice = project.pages.length * pricePerPage;
    
    let multiplier = 1;
    if (project.settings.seoOptimization) multiplier += 0.3;
    if (project.settings.includeKeywords) multiplier += 0.2;
    if (project.settings.textLength > 3000) multiplier += 0.5;
    
    return Math.round(basePrice * multiplier);
  };

  const exportResults = () => {
    const completedPages = project.pages.filter(page => page.status === 'completed');
    
    if (completedPages.length === 0) {
      toast.error('Нет готовых результатов для экспорта');
      return;
    }

    // Создаем CSV контент
    const csvHeader = 'URL,Заголовок страницы,Meta Title,Meta Description,SEO-текст\n';
    const csvContent = completedPages.map(page => 
      `"${page.url}","${page.pageTitle}","${page.metaTitle}","${page.metaDescription}","${page.generatedText}"`
    ).join('\n');

    const csvData = csvHeader + csvContent;
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${project.projectName}_seo_results.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    toast.success('Результаты экспортированы в CSV файл');
  };

  const getStatusIcon = (status: BulkSeoPage['status']) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
      case 'processing':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: BulkSeoPage['status']) => {
    const statusConfig = {
      pending: { label: 'Ожидает', variant: 'secondary' as const },
      processing: { label: 'Обработка', variant: 'default' as const },
      completed: { label: 'Готово', variant: 'default' as const },
      failed: { label: 'Ошибка', variant: 'destructive' as const }
    };

    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Project Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Информация о проекте
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="projectName">Название проекта *</Label>
              <Input
                id="projectName"
                value={project.projectName}
                onChange={(e) => setProject(prev => ({ ...prev, projectName: e.target.value }))}
                placeholder="Например: SEO-оптимизация интернет-магазина"
              />
            </div>
            <div>
              <Label htmlFor="clientName">Имя клиента *</Label>
              <Input
                id="clientName"
                value={project.clientName}
                onChange={(e) => setProject(prev => ({ ...prev, clientName: e.target.value }))}
                placeholder="Ваше имя"
              />
            </div>
            <div>
              <Label htmlFor="clientEmail">Email *</Label>
              <Input
                id="clientEmail"
                type="email"
                value={project.clientEmail}
                onChange={(e) => setProject(prev => ({ ...prev, clientEmail: e.target.value }))}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <Label htmlFor="clientPhone">Телефон</Label>
              <Input
                id="clientPhone"
                value={project.clientPhone}
                onChange={(e) => setProject(prev => ({ ...prev, clientPhone: e.target.value }))}
                placeholder="+7 (999) 123-45-67"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Добавление страниц
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Method Selection */}
          <div className="flex gap-4">
            <Button
              variant={uploadMethod === 'file' ? 'default' : 'outline'}
              onClick={() => setUploadMethod('file')}
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Загрузить файл
            </Button>
            <Button
              variant={uploadMethod === 'manual' ? 'default' : 'outline'}
              onClick={() => setUploadMethod('manual')}
              className="flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              Добавить вручную
            </Button>
          </div>

          {/* File Upload */}
          {uploadMethod === 'file' && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Загрузите CSV или Excel файл</p>
                <p className="text-sm text-gray-400 mt-1">
                  Формат: URL, Заголовок страницы
                </p>
              </label>
            </div>
          )}

          {/* Manual Input */}
          {uploadMethod === 'manual' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <Label htmlFor="urlInput">URL страницы</Label>
                <Input
                  id="urlInput"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com/page"
                />
              </div>
              <div>
                <Label htmlFor="titleInput">Заголовок страницы</Label>
                <Input
                  id="titleInput"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  placeholder="Название страницы"
                />
              </div>
              <Button onClick={addUrlManually} className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Добавить
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pages List */}
      {project.pages.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Страницы ({project.pages.length})
            </CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {showPreview ? 'Скрыть' : 'Показать'} контент
              </Button>
              {project.pages.some(page => page.status === 'completed') && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={exportResults}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Экспорт результатов
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {project.pages.map((page, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(page.status)}
                        <span className="font-medium">{page.pageTitle}</span>
                        {getStatusBadge(page.status)}
                      </div>
                      <div className="text-sm text-gray-600">{page.url}</div>
                      
                      {showPreview && page.status === 'completed' && page.generatedText && (
                        <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                          <div className="font-medium text-gray-700 mb-1">Сгенерированный контент:</div>
                          <div className="text-gray-600 mb-2">{page.generatedText}</div>
                          {page.metaTitle && (
                            <div className="text-xs text-gray-500">
                              <strong>Meta Title:</strong> {page.metaTitle}
                            </div>
                          )}
                          {page.metaDescription && (
                            <div className="text-xs text-gray-500">
                              <strong>Meta Description:</strong> {page.metaDescription}
                            </div>
                          )}
                        </div>
                      )}

                      {page.error && (
                        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                          Ошибка: {page.error}
                        </div>
                      )}
                    </div>
                    
                    {page.status === 'pending' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePage(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Настройки генерации
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="textLength">Длина текста (символов)</Label>
              <Input
                id="textLength"
                type="number"
                value={project.settings.textLength}
                onChange={(e) => setProject(prev => ({
                  ...prev,
                  settings: { ...prev.settings, textLength: parseInt(e.target.value) || 3000 }
                }))}
                min="1000"
                max="10000"
              />
            </div>
            <div>
              <Label htmlFor="language">Язык контента</Label>
              <select
                id="language"
                value={project.settings.language}
                onChange={(e) => setProject(prev => ({
                  ...prev,
                  settings: { ...prev.settings, language: e.target.value }
                }))}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={project.settings.includeKeywords}
                onChange={(e) => setProject(prev => ({
                  ...prev,
                  settings: { ...prev.settings, includeKeywords: e.target.checked }
                }))}
              />
              <span>Включить анализ ключевых слов</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={project.settings.seoOptimization}
                onChange={(e) => setProject(prev => ({
                  ...prev,
                  settings: { ...prev.settings, seoOptimization: e.target.checked }
                }))}
              />
              <span>Дополнительная SEO-оптимизация</span>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Progress and Generation */}
      {isProcessing && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Генерация SEO-текстов...</span>
                <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="text-sm text-gray-600">
                Обрабатываем страницы и создаем уникальные SEO-тексты
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Order Summary and Submit */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">Итого к оплате</h3>
              <div className="text-sm text-gray-600 mt-1">
                {project.pages.length} страниц × 500₽ = {project.pages.length * 500}₽
              </div>
              {(project.settings.seoOptimization || project.settings.includeKeywords) && (
                <div className="text-sm text-gray-600">
                  + дополнительные опции
                </div>
              )}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                {calculateTotalPrice()}₽
              </div>
              <div className="text-sm text-gray-600">
                Срок: {Math.ceil(project.pages.length / 10)} дня
              </div>
            </div>
          </div>

          <Button
            onClick={generateSeoTexts}
            disabled={isProcessing || project.pages.length === 0 || !project.projectName || !project.clientEmail}
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Создание заказа...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Создать заказ на {calculateTotalPrice()}₽
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}