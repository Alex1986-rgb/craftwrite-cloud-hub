import React from "react";
import { MessageSquare, Search, FileText, CheckCircle } from "lucide-react";

const CleanProcessSection = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: "Анализ задачи",
      description: "Изучаем ваши требования и целевую аудиторию"
    },
    {
      icon: Search,
      title: "Исследование",
      description: "Анализируем конкурентов и подбираем ключевые слова"
    },
    {
      icon: FileText,
      title: "Создание контента",
      description: "Пишем уникальный текст с учетом SEO-требований"
    },
    {
      icon: CheckCircle,
      title: "Проверка и сдача",
      description: "Проверяем на уникальность и отправляем результат"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Как мы работаем
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Проверенный процесс создания качественного контента
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full text-white mb-4">
                    <Icon className="w-10 h-10" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {step.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Process guarantee */}
        <div className="text-center mt-16">
          <div className="inline-block p-6 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-center gap-3 text-green-800">
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg font-semibold">
                Гарантируем соблюдение сроков и качество результата
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CleanProcessSection;