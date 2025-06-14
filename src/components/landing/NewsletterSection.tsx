
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Send, Gift, TrendingUp, Users, CheckCircle } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setIsSubscribed(true);
    setEmail("");
  };

  const benefits = [
    { icon: TrendingUp, text: "SEO-тренды и алгоритмы", desc: "Еженедельно" },
    { icon: Users, text: "Кейсы клиентов", desc: "Реальные результаты" },
    { icon: Gift, text: "Эксклюзивные материалы", desc: "Только для подписчиков" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Mail className="w-4 h-4 mr-2" />
              Эксклюзивный контент
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Получайте инсайты от экспертов копирайтинга
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Еженедельная рассылка с трендами SEO, успешными кейсами и эксклюзивными материалами от команды CopyPro Cloud
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Subscription Form */}
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-slate-800">
                      Подписаться на рассылку
                    </h3>
                    <div className="flex gap-3">
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 py-3 text-base"
                      />
                      <Button type="submit" size="lg" className="px-6">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-slate-500 mt-3">
                      Без спама. Отписаться можно в любой момент.
                    </p>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-700 mb-2">
                    Спасибо за подписку!
                  </h3>
                  <p className="text-slate-600">
                    Проверьте почту для подтверждения подписки
                  </p>
                </div>
              )}
            </Card>

            {/* Benefits */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-slate-800 mb-6">
                Что вы получите:
              </h3>
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">
                      {benefit.text}
                    </h4>
                    <p className="text-slate-600 text-sm">{benefit.desc}</p>
                  </div>
                </div>
              ))}

              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50">
                <div className="flex items-center gap-3 mb-2">
                  <Gift className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">Бонус для новых подписчиков</span>
                </div>
                <p className="text-sm text-blue-700">
                  Гайд "10 формул продающих заголовков" и чек-лист по SEO-копирайтингу
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">15,000+</div>
              <div className="text-sm text-slate-600">Подписчиков</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-1">98%</div>
              <div className="text-sm text-slate-600">Открываемость</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 mb-1">4.9/5</div>
              <div className="text-sm text-slate-600">Рейтинг контента</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600 mb-1">52</div>
              <div className="text-sm text-slate-600">Выпуска</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
