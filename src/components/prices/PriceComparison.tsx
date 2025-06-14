
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X } from "lucide-react";

const comparisonData = [
  {
    feature: "Количество статей в месяц",
    starter: "До 5",
    professional: "До 15",
    corporate: "Безлимит"
  },
  {
    feature: "Максимальный объем статьи",
    starter: "3000 знаков",
    professional: "6000 знаков",
    corporate: "Без ограничений"
  },
  {
    feature: "SEO-оптимизация",
    starter: true,
    professional: true,
    corporate: true
  },
  {
    feature: "LSI-анализ",
    starter: false,
    professional: true,
    corporate: true
  },
  {
    feature: "Конкурентный анализ",
    starter: false,
    professional: true,
    corporate: true
  },
  {
    feature: "Технический аудит",
    starter: false,
    professional: false,
    corporate: true
  },
  {
    feature: "Бесплатные правки",
    starter: "2",
    professional: "5",
    corporate: "Безлимит"
  },
  {
    feature: "Сроки выполнения",
    starter: "3-5 дней",
    professional: "24-48 часов",
    corporate: "12-24 часа"
  },
  {
    feature: "Персональный менеджер",
    starter: false,
    professional: true,
    corporate: true
  },
  {
    feature: "Приоритетная поддержка",
    starter: false,
    professional: true,
    corporate: true
  },
  {
    feature: "API интеграция",
    starter: false,
    professional: false,
    corporate: true
  },
  {
    feature: "Отчеты и аналитика",
    starter: false,
    professional: false,
    corporate: true
  }
];

export default function PriceComparison() {
  const renderValue = (value: string | boolean | number) => {
    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <X className="w-5 h-5 text-red-400 mx-auto" />
      );
    }
    return <span className="text-center">{value}</span>;
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Сравнение тарифных планов
        </h2>
        <p className="text-lg text-muted-foreground">
          Детальное сравнение возможностей каждого плана
        </p>
      </div>

      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-blue-50/50">
                <th className="text-left p-6 font-semibold text-foreground">
                  Возможности
                </th>
                <th className="text-center p-6">
                  <div>
                    <Badge variant="outline" className="mb-2">Стартовый</Badge>
                    <div className="text-2xl font-bold text-primary">15K₽</div>
                    <div className="text-sm text-muted-foreground">/месяц</div>
                  </div>
                </th>
                <th className="text-center p-6 bg-primary/5">
                  <div>
                    <Badge className="mb-2">Популярный</Badge>
                    <div className="text-2xl font-bold text-primary">35K₽</div>
                    <div className="text-sm text-muted-foreground">/месяц</div>
                  </div>
                </th>
                <th className="text-center p-6">
                  <div>
                    <Badge variant="outline" className="mb-2">Корпоративный</Badge>
                    <div className="text-2xl font-bold text-primary">75K₽</div>
                    <div className="text-sm text-muted-foreground">/месяц</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr 
                  key={row.feature} 
                  className={`border-t border-slate-200/50 hover:bg-slate-50/50 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'
                  }`}
                >
                  <td className="p-6 font-medium text-foreground">
                    {row.feature}
                  </td>
                  <td className="p-6 text-center">
                    {renderValue(row.starter)}
                  </td>
                  <td className="p-6 text-center bg-primary/5">
                    {renderValue(row.professional)}
                  </td>
                  <td className="p-6 text-center">
                    {renderValue(row.corporate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
