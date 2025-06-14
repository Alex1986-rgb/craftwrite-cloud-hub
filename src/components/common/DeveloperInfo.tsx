
import { User, Briefcase, Award, MessageCircle } from "lucide-react";

interface DeveloperInfoProps {
  variant?: "full" | "compact";
  className?: string;
}

export default function DeveloperInfo({ variant = "full", className = "" }: DeveloperInfoProps) {
  if (variant === "compact") {
    return (
      <div className={`text-center ${className}`}>
        <div className="text-sm text-slate-600 mb-2">
          Разработчик и генеральный директор
        </div>
        <div className="font-semibold text-slate-800">
          Кырлан Александр Сергеевич
        </div>
        <a 
          href="https://t.me/Koopeerayter" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm mt-1 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          @Koopeerayter
        </a>
      </div>
    );
  }

  return (
    <div className={`bg-white/90 backdrop-blur-lg rounded-3xl p-8 border border-slate-200/50 ${className}`}>
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <User className="w-10 h-10 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          Кырлан Александр Сергеевич
        </h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-center gap-2 text-slate-600">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <span className="font-medium">Генеральный директор</span>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-slate-600">
            <Award className="w-5 h-5 text-purple-600" />
            <span className="font-medium">Веб-разработчик и дизайнер</span>
          </div>
        </div>

        <div className="space-y-3">
          <a 
            href="tel:+79257338648"
            className="flex items-center justify-center gap-3 p-3 bg-green-50 rounded-xl text-green-700 hover:bg-green-100 transition-colors"
          >
            <span className="font-semibold">+7 (925) 733-86-48</span>
          </a>
          
          <a 
            href="mailto:optteem@mail.ru"
            className="flex items-center justify-center gap-3 p-3 bg-purple-50 rounded-xl text-purple-700 hover:bg-purple-100 transition-colors"
          >
            <span className="font-semibold">optteem@mail.ru</span>
          </a>
          
          <a 
            href="https://t.me/Koopeerayter"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 p-3 bg-blue-50 rounded-xl text-blue-700 hover:bg-blue-100 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-semibold">@Koopeerayter</span>
          </a>
        </div>
      </div>
    </div>
  );
}
