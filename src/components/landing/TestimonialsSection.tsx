
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Дарья Козлова",
    role: "Маркетолог, TechStart",
    text: "Получили SEO-статью за один день. Результат превзошёл ожидания — текст легкий, грамотный и отлично оптимизирован под наши ключи!",
    rating: 5,
    avatar: "Д"
  },
  {
    name: "Игорь Михайлов",
    role: "Владелец интернет-магазина",
    text: "Заказываем описания товаров уже полгода — всегда качественно, вовремя и с учётом наших пожеланий. Команда профессионалов!",
    rating: 5,
    avatar: "И"
  },
  {
    name: "Анна Петрова",
    role: "PR-менеджер, InnovateCorp",
    text: "Быстро подготовили пресс-релиз для важного анонса. Сэкономили массу времени команде и получили отличный результат!",
    rating: 5,
    avatar: "А"
  }
];

const TestimonialsSection = () => (
  <section className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-yellow-500/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-56 h-56 bg-green-500/5 rounded-full blur-3xl"></div>
    </div>

    <div className="container max-w-6xl mx-auto px-4 relative z-10">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-yellow-200">
          <Star className="w-4 h-4" />
          Отзывы клиентов
        </div>
        <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
          Что говорят наши клиенты
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Мы гордимся доверием наших клиентов и стремимся превосходить их ожидания
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, idx) => (
          <Card key={idx} className="group hover:shadow-2xl transition-all duration-500 bg-card/90 backdrop-blur-sm border-primary/10 hover:border-primary/30 hover:-translate-y-2 relative overflow-hidden">
            {/* Decorative quote */}
            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Quote className="w-12 h-12 text-primary" />
            </div>
            
            <CardContent className="p-8 relative z-10">
              {/* Rating stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Review text */}
              <p className="text-muted-foreground mb-6 leading-relaxed italic">
                "{review.text}"
              </p>

              {/* Author info */}
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {review.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground">{review.name}</div>
                  <div className="text-sm text-muted-foreground">{review.role}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust indicators */}
      <div className="mt-16 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-green-600">4.9/5</div>
            <div className="text-sm text-muted-foreground">Средняя оценка</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-blue-600">98%</div>
            <div className="text-sm text-muted-foreground">Повторных заказов</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-purple-600">500+</div>
            <div className="text-sm text-muted-foreground">Довольных клиентов</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-orange-600">24ч</div>
            <div className="text-sm text-muted-foreground">Время ответа</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
