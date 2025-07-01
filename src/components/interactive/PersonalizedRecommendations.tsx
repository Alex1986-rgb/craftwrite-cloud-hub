
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  Zap,
  CheckCircle2,
  Clock,
  Star,
  ArrowRight
} from 'lucide-react';

interface UserProfile {
  industry: string;
  company_size: string;
  goals: string[];
  budget_range: string;
  urgency: string;
  previous_experience: string;
}

interface Recommendation {
  id: string;
  title: string;
  description: string;
  match_score: number;
  estimated_price: string;
  timeline: string;
  benefits: string[];
  case_study: {
    company: string;
    result: string;
    metric: string;
  };
  next_steps: string[];
}

const mockUserProfiles: UserProfile[] = [
  {
    industry: 'e-commerce',
    company_size: 'small',
    goals: ['increase-conversion', 'improve-seo'],
    budget_range: '15000-30000',
    urgency: 'medium',
    previous_experience: 'basic'
  },
  {
    industry: 'saas',
    company_size: 'medium',
    goals: ['lead-generation', 'brand-awareness'],
    budget_range: '50000+',
    urgency: 'high',
    previous_experience: 'advanced'
  },
  {
    industry: 'healthcare',
    company_size: 'large',
    goals: ['trust-building', 'patient-education'],
    budget_range: '30000-50000',
    urgency: 'low',
    previous_experience: 'intermediate'
  }
];

export default function PersonalizedRecommendations() {
  const [currentProfile, setCurrentProfile] = useState<UserProfile>(mockUserProfiles[0]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Имитация AI-анализа и генерации рекомендаций
  const generateRecommendations = async (profile: UserProfile) => {
    setIsLoading(true);
    
    // Имитация задержки API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const recs: Recommendation[] = [];
    
    // Логика генерации рекомендаций на основе профиля
    if (profile.industry === 'e-commerce' && profile.goals.includes('increase-conversion')) {
      recs.push({
        id: 'ecommerce-landing',
        title: 'Продающий лендинг для e-commerce',
        description: 'Создание высококонверсионной страницы товара с элементами психологического воздействия',
        match_score: 94,
        estimated_price: '25 000 - 35 000 ₽',
        timeline: '10-14 дней',
        benefits: [
          'Увеличение конверсии на 150-300%',
          'Снижение стоимости привлечения клиента',
          'Улучшение метрик рекламных кампаний'
        ],
        case_study: {
          company: 'Интернет-магазин MODERNO',
          result: '+287% к конверсии',
          metric: 'с 1.2% до 3.4%'
        },
        next_steps: [
          'Анализ текущих страниц товаров',
          'Исследование целевой аудитории',
          'Создание продающих текстов',
          'A/B тестирование'
        ]
      });
    }
    
    if (profile.industry === 'saas' && profile.goals.includes('lead-generation')) {
      recs.push({
        id: 'saas-content-strategy',
        title: 'Контент-стратегия для SaaS',
        description: 'Комплексная стратегия контент-маркетинга для привлечения B2B клиентов',
        match_score: 91,
        estimated_price: '45 000 - 65 000 ₽',
        timeline: '21-28 дней',
        benefits: [
          'Увеличение лидов на 200-400%',
          'Снижение CAC на 40-60%',
          'Построение экспертности бренда'
        ],
        case_study: {
          company: 'CRM Pro',
          result: '+340% лидов',
          metric: 'с 23 до 78 лидов/месяц'
        },
        next_steps: [
          'Аудит текущего контента',
          'Создание контент-плана',
          'Разработка lead-магнитов',
          'Настройка воронки'
        ]
      });
    }
    
    if (profile.goals.includes('improve-seo')) {
      recs.push({
        id: 'seo-content-package',
        title: 'SEO-контент пакет',
        description: 'Серия оптимизированных статей для роста органического трафика',
        match_score: 88,
        estimated_price: '18 000 - 28 000 ₽',
        timeline: '14-21 день',
        benefits: [
          'Рост органического трафика на 150-250%',
          'Выход в ТОП-10 по целевым запросам',
          'Снижение стоимости привлечения'
        ],
        case_study: {
          company: 'TechStart',
          result: '+195% органического трафика',
          metric: 'за 3 месяца'
        },
        next_steps: [
          'Аудит SEO-позиций',
          'Подбор семантического ядра',
          'Создание SEO-статей',
          'Мониторинг позиций'
        ]
      });
    }
    
    setRecommendations(recs);
    setIsLoading(false);
  };

  useEffect(() => {
    generateRecommendations(currentProfile);
  }, [currentProfile]);

  const handleProfileChange = (profile: UserProfile) => {
    setCurrentProfile(profile);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI-рекомендации для вашего бизнеса
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Персонализированные решения на основе анализа вашей отрасли и целей
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Профили пользователей */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Выберите профиль:</h3>
          <div className="space-y-3">
            {mockUserProfiles.map((profile, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  currentProfile === profile 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleProfileChange(profile)}
              >
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <Badge variant="secondary" className="text-xs">
                      {profile.industry}
                    </Badge>
                    <div className="text-sm">
                      <div className="font-medium">Размер: {profile.company_size}</div>
                      <div className="text-gray-600">Бюджет: {profile.budget_range} ₽</div>
                      <div className="text-gray-600">Цели: {profile.goals.length}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Рекомендации */}
        <div className="lg:col-span-3">
          {isLoading ? (
            <Card className="p-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Brain className="w-8 h-8 text-blue-600 animate-pulse" />
                <div className="text-xl font-semibold">AI анализирует ваш профиль...</div>
              </div>
              <Progress value={67} className="w-full max-w-md mx-auto" />
              <p className="text-gray-600 mt-4">
                Подбираем оптимальные решения на основе вашей отрасли и целей
              </p>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Заголовок с мета-информацией */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Рекомендации для {currentProfile.industry}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>Компания: {currentProfile.company_size}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          <span>Целей: {currentProfile.goals.length}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Срочность: {currentProfile.urgency}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Найдено решений</div>
                      <div className="text-3xl font-bold text-blue-600">{recommendations.length}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Список рекомендаций */}
              {recommendations.map((rec, index) => (
                <Card key={rec.id} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{rec.title}</CardTitle>
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <Star className="w-3 h-3 mr-1" />
                            {rec.match_score}% совпадение
                          </Badge>
                        </div>
                        <p className="text-gray-600">{rec.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{rec.estimated_price}</div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {rec.timeline}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Выгоды */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        Ожидаемые результаты:
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {rec.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Кейс */}
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-blue-600" />
                        Пример успеха:
                      </h4>
                      <div className="text-sm">
                        <div className="font-medium">{rec.case_study.company}</div>
                        <div className="text-blue-700 font-bold">{rec.case_study.result}</div>
                        <div className="text-gray-600">{rec.case_study.metric}</div>
                      </div>
                    </div>

                    {/* Следующие шаги */}
                    <div>
                      <h4 className="font-semibold mb-3">План реализации:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {rec.next_steps.map((step, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                              {i + 1}
                            </div>
                            <span className="text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm text-gray-600">
                        Подходит для решения {rec.match_score}% ваших задач
                      </div>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 flex items-center gap-2">
                        Заказать консультацию
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
