
import { Card } from "@/components/ui/card";

type ProjectMetricsProps = {
  metrics: Record<string, string>;
};

export default function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  const getMetricLabel = (key: string) => {
    const labels: Record<string, string> = {
      conversion: 'Конверсия',
      traffic: 'Трафик',
      time: 'Время на сайте',
      bounce: 'Показатель отказов',
      leadCost: 'Стоимость лида',
      sales: 'Продажи',
      leads: 'Заявки',
      investment: 'Инвестиции',
      users: 'Пользователи',
      openRate: 'Open Rate',
      clickRate: 'Click Rate',
      churnReduction: 'Снижение Churn',
      ptSales: 'Продажи PT',
      topPositions: 'ТОП позиции',
      organicGrowth: 'Органический рост',
      brandAwareness: 'Узнаваемость',
      trialConversion: 'Trial конверсия',
      salesCycle: 'Цикл продаж',
      averageCheck: 'Средний чек',
      mrrGrowth: 'Рост MRR'
    };
    return labels[key] || key;
  };

  return (
    <section className="py-20 bg-white/60 backdrop-blur-sm">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center mb-16 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Ключевые результаты
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(metrics).map(([key, value]) => (
            <Card key={key} className="group p-8 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 bg-gradient-to-br from-white to-slate-50/50 border-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground font-medium">
                  {getMetricLabel(key)}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
