
import { CheckCircle, MessageSquare, FileText, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "1. Оставляете заявку",
    description: "Заполняете форму с техническим заданием"
  },
  {
    icon: FileText,
    title: "2. Анализируем задачу",
    description: "Наши эксперты изучают требования и готовят план"
  },
  {
    icon: CheckCircle,
    title: "3. Создаём контент",
    description: "Пишем уникальный SEO-оптимизированный текст"
  },
  {
    icon: Rocket,
    title: "4. Сдаём работу",
    description: "Отправляем готовый материал с отчётом о проверках"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Как мы работаем</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Простой и прозрачный процесс создания качественного контента
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
