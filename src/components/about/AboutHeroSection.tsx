
import { Button } from "@/components/ui/button";
import { Award, Users, Star, Shield, TrendingUp } from "lucide-react";

const AboutHeroSection = () => {
  return (
    <section className="relative py-32 px-4 bg-gradient-to-br from-background via-primary/5 to-purple-500/10 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/15 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/10 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-bold mb-8 border border-primary/20 shadow-lg">
            <Award className="w-5 h-5" />
            Элитная команда профессионалов
          </div>
          
          <h1 className="text-6xl md:text-7xl font-playfair font-black mb-8 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
            О CopyPro Cloud
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium mb-12">
            Мы — команда из <span className="text-primary font-bold">30+ дипломированных SEO-копирайтеров</span> с многолетним опытом создания премиального контента
          </p>

          {/* Trust stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="group bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-primary to-blue-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl font-black text-primary mb-2">30+</div>
              <div className="text-sm text-muted-foreground font-medium">Экспертов в команде</div>
            </div>
            
            <div className="group bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl font-black text-green-600 mb-2">100%</div>
              <div className="text-sm text-muted-foreground font-medium">Уникальность</div>
            </div>
            
            <div className="group bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Star className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl font-black text-blue-600 mb-2">5+</div>
              <div className="text-sm text-muted-foreground font-medium">Лет опыта</div>
            </div>
            
            <div className="group bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl font-black text-purple-600 mb-2">2000+</div>
              <div className="text-sm text-muted-foreground font-medium">Проектов</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
