
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  "SEO-статьи",
  "Описания товаров",
  "Тексты для соцсетей",
  "Продающие тексты",
  "Тексты для лендингов",
  "Email-рассылки",
  "Скрипты продаж",
  "Статьи для СМИ",
  "Пресс-релизы",
  "Тексты для блогов",
  "Академические статьи",
  "Юридические тексты",
  "Уникальные услуги по запросу"
];

const ServicesCatalogSection = () => (
  <section id="services" className="pt-10 pb-8 bg-background">
    <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">
      Каталог услуг
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
      {services.map((service) => (
        <Card key={service} className="transition-all hover-scale hover:shadow-lg border-primary/30">
          <CardContent className="p-5 flex flex-col h-full justify-between">
            <CardTitle className="text-lg mb-3">{service}</CardTitle>
            <Button variant="outline" size="sm" className="mt-2 self-start">
              Заказать
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="flex justify-center mt-7">
      <Button size="lg" className="shadow hover-scale">Создать заказ</Button>
    </div>
  </section>
);

export default ServicesCatalogSection;
