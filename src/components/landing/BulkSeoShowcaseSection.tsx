import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Upload, Table, FileSpreadsheet, Zap, CheckCircle, ArrowRight } from "lucide-react";

const DEMO_RESULTS = [
  {
    url: "example.com/services",
    title: "Профессиональные услуги копирайтинга в Москве | CopyPro",
    description: "Заказать качественные тексты от экспертов. Быстро, недорого, с гарантией. Более 500 довольных клиентов ⭐⭐⭐⭐⭐",
    keywords: "копирайтинг, услуги копирайтера, заказать текст",
    status: "completed"
  },
  {
    url: "example.com/seo-texts", 
    title: "SEO-тексты для сайтов: заказать оптимизированный контент",
    description: "Создание SEO-текстов с высокой конверсией. Анализ конкурентов, подбор ключей, LSI-оптимизация. Рост трафика до 300%",
    keywords: "seo тексты, оптимизированный контент, продвижение",
    status: "completed"
  },
  {
    url: "example.com/landing-pages",
    title: "Продающие лендинги: создание страниц с высокой конверсией",
    description: "Разработка лендингов, которые продают. Психология продаж, A/B тестирование, конверсия до 15%. Результат за 3 дня",
    keywords: "продающий лендинг, создание landing page, конверсия",
    status: "processing"
  }
];

export default function BulkSeoShowcaseSection() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleDemoStart = () => {
    // Simulate file upload
    let progress = 0;
    const uploadTimer = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(uploadTimer);
        
        // Start processing simulation
        let stage = 0;
        const processTimer = setInterval(() => {
          stage += 1;
          setProcessingStage(stage);
          if (stage >= 4) {
            clearInterval(processTimer);
            setTimeout(() => setShowResults(true), 500);
          }
        }, 1000);
      }
    }, 200);
  };

  const resetDemo = () => {
    setUploadProgress(0);
    setProcessingStage(0);
    setShowResults(false);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-slate-900 dark:to-blue-900/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-6 mb-16">
          <Badge className="glass-interactive px-4 py-2 text-lg">
            🚀 Массовые AI-решения
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-gradient">От файла до результата</span>
            <br />
            <span className="text-foreground">за 1 час</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Демонстрация процесса создания массового SEO-контента: 
            загружаете Excel с URL → получаете готовую таблицу с текстами и метатегами
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Demo Interface */}
            <div className="space-y-6">
              <Card className="glass-hero p-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-center">
                    Интерактивная демонстрация
                  </h3>

                  {/* File Upload Area */}
                  <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center space-y-4 glass-interactive">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-lg font-medium">Загрузите файл с URL-адресами</p>
                      <p className="text-sm text-muted-foreground">Excel, CSV до 10,000 строк</p>
                    </div>
                    
                    {uploadProgress === 0 ? (
                      <Button onClick={handleDemoStart} className="glass-interactive">
                        <FileSpreadsheet className="w-4 h-4 mr-2" />
                        Демо: загрузить sample.xlsx
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-sm">Загрузка файла...</p>
                        <Progress value={uploadProgress} className="w-full" />
                        <p className="text-xs text-muted-foreground">{uploadProgress}%</p>
                      </div>
                    )}
                  </div>

                  {/* Processing Stages */}
                  {uploadProgress === 100 && (
                    <div className="space-y-4">
                      <h4 className="font-semibold">AI обрабатывает данные:</h4>
                      
                      <div className="space-y-3">
                        {[
                          { stage: 1, text: "Анализ конкурентов в ТОП-10", icon: "🔍" },
                          { stage: 2, text: "Подбор ключевых слов и LSI", icon: "🔑" },
                          { stage: 3, text: "Генерация SEO-текстов", icon: "✍️" },
                          { stage: 4, text: "Создание метатегов", icon: "🏷️" }
                        ].map((item) => (
                          <div key={item.stage} className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                            processingStage >= item.stage 
                              ? 'glass-panel text-foreground' 
                              : 'text-muted-foreground'
                          }`}>
                            <div className="text-2xl">{item.icon}</div>
                            <span className="flex-1">{item.text}</span>
                            {processingStage >= item.stage && (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            )}
                            {processingStage === item.stage - 1 && (
                              <Zap className="w-5 h-5 text-blue-500 animate-pulse" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Results Ready */}
                  {showResults && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-green-600">✅ Результат готов!</h4>
                        <Button variant="outline" size="sm" onClick={resetDemo}>
                          Повторить демо
                        </Button>
                      </div>
                      <div className="glass-panel p-4 rounded-lg">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Table className="w-4 h-4" />
                          <span>Создана таблица: bulk_seo_results.xlsx</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                          <span>3 URL обработано • 9 SEO-текстов создано • 18 метатегов</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Features List */}
              <Card className="glass-panel p-6">
                <h4 className="font-semibold mb-4">Что входит в результат:</h4>
                <div className="space-y-3 text-sm">
                  {[
                    "SEO-тексты 3000-5000 символов с ключевыми словами",
                    "Оптимизированные Title (до 60 символов)",
                    "Продающие Meta Description (до 160 символов)", 
                    "LSI-семантика равномерно распределенная по тексту",
                    "Анализ конкурентов и рекомендации по улучшению",
                    "Техническое задание для программистов"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Results Preview */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Предварительный просмотр результата</h3>
              
              <div className="space-y-4">
                {DEMO_RESULTS.map((result, index) => (
                  <Card key={index} className={`glass-panel p-6 transition-all duration-500 ${
                    showResults ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'
                  }`}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground font-mono">
                          {result.url}
                        </div>
                        <Badge variant={result.status === 'completed' ? 'default' : 'secondary'}>
                          {result.status === 'completed' ? 'Готово' : 'Обработка...'}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-semibold text-blue-600 hover:underline cursor-pointer">
                          {result.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {result.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {result.keywords.split(', ').map((keyword, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* CTA */}
              <Card className="glass-hero p-6 text-center">
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold">Готовы попробовать?</h4>
                  <p className="text-muted-foreground">
                    Загрузите свой файл и получите готовый результат
                  </p>
                  <Button size="lg" className="glass-interactive">
                    <Upload className="w-4 h-4 mr-2" />
                    Заказать массовую обработку
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}