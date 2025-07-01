
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Briefcase, 
  Clock, 
  MapPin, 
  ArrowRight,
  Heart,
  Zap,
  Target,
  Award
} from 'lucide-react';
import UnifiedHeader from '@/components/navigation/UnifiedHeader';
import EnhancedFooter from '@/components/common/EnhancedFooter';
import { useSeoMeta } from '@/hooks/useSeoMeta';

const openPositions = [
  {
    title: 'SEO-копирайтер',
    department: 'Контент',
    type: 'Полная занятость',
    location: 'Удаленно',
    experience: '2+ года',
    salary: '80 000 - 120 000 ₽',
    urgent: true
  },
  {
    title: 'Email-маркетинг специалист',
    department: 'Маркетинг',
    type: 'Полная занятость',
    location: 'Москва / Удаленно',
    experience: '3+ года',
    salary: '100 000 - 150 000 ₽',
    urgent: false
  },
  {
    title: 'Контент-менеджер',
    department: 'Управление',
    type: 'Полная занятость',
    location: 'Удаленно',
    experience: '1+ год',
    salary: '60 000 - 90 000 ₽',
    urgent: false
  }
];

const benefits = [
  {
    icon: Heart,
    title: 'Забота о команде',
    description: 'Медицинская страховка, оплачиваемые больничные, гибкий отпуск'
  },
  {
    icon: Zap,
    title: 'Развитие и обучение',
    description: 'Корпоративные курсы, конференции, сертификации за счет компании'
  },
  {
    icon: Target,
    title: 'Результат и признание',
    description: 'Бонусы за KPI, премии за успешные проекты, карьерный рост'
  },
  {
    icon: Users,
    title: 'Комфортная среда',
    description: 'Удаленная работа, современные инструменты, дружная команда'
  }
];

export default function Careers() {
  useSeoMeta({
    title: 'Карьера в CopyPro Cloud - Вакансии и работа в команде',
    description: 'Присоединяйтесь к команде профессионалов! Открытые вакансии в области копирайтинга, маркетинга и управления проектами.',
    keywords: 'вакансии, работа, карьера, копирайтер, маркетинг, удаленная работа'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <UnifiedHeader />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Карьера в CopyPro Cloud
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Присоединяйтесь к команде профессионалов и создавайте контент, который меняет бизнес
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
              Посмотреть вакансии
            </Button>
            <Button size="lg" variant="outline">
              Отправить резюме
            </Button>
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Открытые вакансии</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{position.title}</CardTitle>
                    {position.urgent && (
                      <Badge className="bg-red-100 text-red-800">Срочно</Badge>
                    )}
                  </div>
                  <p className="text-gray-600">{position.department}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Briefcase className="w-4 h-4" />
                      <span>{position.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{position.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Опыт: {position.experience}</span>
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      {position.salary}
                    </div>
                  </div>
                  <Button className="w-full">
                    Откликнуться
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Почему CopyPro Cloud?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Culture */}
        <Card className="mb-16 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Наша культура</h3>
            <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
              В CopyPro Cloud мы создали среду, где каждый может проявить свой потенциал. 
              Мы ценим креативность, профессионализм и стремление к результату. 
              Наша команда — это единомышленники, которые вместе создают будущее копирайтинга.
            </p>
            <Button size="lg" variant="outline">
              Узнать больше о команде
            </Button>
          </CardContent>
        </Card>
      </main>

      <EnhancedFooter />
    </div>
  );
}
