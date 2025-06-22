
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900">
          <span className="block mb-2">CopyPro Cloud</span>
          <span className="text-2xl md:text-3xl font-medium text-slate-700">
            Профессиональный SEO-копирайтинг
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
          Создаём качественный контент с командой из 30+ дипломированных SEO-копирайтеров
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="px-8 py-4" asChild>
            <Link to="/order" className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Заказать контент
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
