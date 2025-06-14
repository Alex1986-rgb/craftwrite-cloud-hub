
import { Star, Play, Volume2, Quote, Award, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type ProjectTestimonialProps = {
  testimonial: {
    text: string;
    author: string;
    position: string;
  };
};

export default function ProjectTestimonial({ testimonial }: ProjectTestimonialProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFullQuote, setShowFullQuote] = useState(false);

  const achievements = [
    "Превзошел все ожидания",
    "Команда мечты",
    "Результат на 100%",
    "Рекомендую всем"
  ];

  const companyStats = [
    { label: "Лет на рынке", value: "15+", icon: Award },
    { label: "Сотрудников", value: "250+", icon: CheckCircle },
    { label: "Проектов", value: "500+", icon: Star }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-primary via-blue-600 to-purple-600 text-white relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <Quote className="w-6 h-6" />
            <span className="font-semibold">Отзыв клиента</span>
          </div>
          
          <div className="flex justify-center mb-8 animate-scale-in" style={{ animationDelay: '0.2s' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 text-yellow-400 fill-current animate-bounce-soft" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
          
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            Голос довольного клиента
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Testimonial Content */}
          <div className="lg:col-span-8">
            <Card className="p-10 bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              {/* Audio/Video Player Mockup */}
              <div className="flex items-center gap-4 mb-8 p-4 bg-white/10 rounded-xl">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                >
                  {isPlaying ? <Volume2 className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                </Button>
                <div className="flex-1">
                  <div className="text-sm font-medium mb-2">Аудио-отзыв • 2:34</div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-300 ${isPlaying ? 'w-1/3' : 'w-0'}`}></div>
                  </div>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-200 border-emerald-400/30">
                  Эксклюзив
                </Badge>
              </div>

              {/* Quote */}
              <blockquote className="text-2xl md:text-3xl italic mb-8 leading-relaxed font-light relative">
                <Quote className="absolute -top-4 -left-4 w-12 h-12 text-white/30" />
                <span className="relative z-10">
                  {showFullQuote 
                    ? `"${testimonial.text} Команда показала исключительный профессионализм и креативность. Результаты превзошли все наши ожидания. Настоятельно рекомендую!"`
                    : `"${testimonial.text}"`
                  }
                </span>
                <Quote className="absolute -bottom-4 -right-4 w-12 h-12 text-white/30 rotate-180" />
              </blockquote>

              <Button
                variant="ghost"
                onClick={() => setShowFullQuote(!showFullQuote)}
                className="text-white/80 hover:text-white hover:bg-white/10 mb-8"
              >
                {showFullQuote ? 'Свернуть' : 'Читать полностью'}
              </Button>

              {/* Achievement Tags */}
              <div className="flex flex-wrap gap-3 mb-8">
                {achievements.map((achievement, index) => (
                  <Badge 
                    key={achievement} 
                    className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-200 border-emerald-400/30 px-4 py-2 hover:scale-105 transition-transform duration-300 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {achievement}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* Client Info & Stats */}
          <div className="lg:col-span-4 space-y-6">
            {/* Client Card */}
            <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-scale-in" style={{ animationDelay: '0.8s' }}>
              <div className="text-center">
                {/* Avatar */}
                <div className="w-20 h-20 bg-gradient-to-r from-white/20 to-white/30 rounded-full flex items-center justify-center text-3xl font-bold mb-4 mx-auto shadow-lg">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                
                <div className="font-semibold text-2xl mb-2">{testimonial.author}</div>
                <div className="text-white/80 text-lg mb-6">{testimonial.position}</div>
                
                {/* Company Stats */}
                <div className="space-y-4">
                  {companyStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-emerald-400" />
                          <span className="text-white/80">{stat.label}</span>
                        </div>
                        <span className="font-bold text-lg">{stat.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Trust Indicators */}
            <Card className="p-6 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-emerald-400/30 backdrop-blur-sm shadow-xl animate-scale-in" style={{ animationDelay: '1s' }}>
              <div className="text-center">
                <Award className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <div className="font-bold text-lg mb-2">Verified Review</div>
                <div className="text-emerald-200 text-sm">
                  Подтвержденный отзыв от реального клиента
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <Card className="inline-flex items-center gap-6 p-8 bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
            <div>
              <div className="text-2xl font-bold mb-2">Хотите такой же результат?</div>
              <div className="text-white/80">Обсудим ваш проект прямо сейчас</div>
            </div>
            <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Начать проект
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
