
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const reviews = [
  {
    name: "Дарья, маркетолог",
    text: "Получили SEO-статью за один день. Результат превзошёл ожидания — текст легкий и отлично оптимизирован!",
  },
  {
    name: "Игорь, владелец интернет-магазина",
    text: "Заказываем описания товаров — всегда качественно, вовремя и с учётом наших пожеланий.",
  },
  {
    name: "Анна, PR-менеджер",
    text: "Быстро подготовили пресс-релиз. Сэкономили массу времени команде!",
  }
];

const TestimonialsSection = () => (
  <section className="py-12 bg-muted/50 rounded-xl mx-4 md:mx-auto max-w-5xl mt-12 shadow-md animate-fade-in">
    <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Отзывы клиентов</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2 md:px-0">
      {reviews.map((review, idx) => (
        <Card key={idx} className="p-0 border-primary/20 bg-background">
          <CardContent className="py-6 flex flex-col items-center gap-4">
            <Avatar>
              <AvatarFallback>{review.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-lg font-medium text-center">{review.name}</div>
            <p className="text-muted-foreground text-center">{review.text}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  </section>
);

export default TestimonialsSection;
