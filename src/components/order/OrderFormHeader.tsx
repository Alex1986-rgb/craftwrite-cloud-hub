
import { FileText, Clock, Users, Award, Sparkles, Target, TrendingUp } from "lucide-react";

export default function OrderFormHeader() {
  return (
    <div className="text-center mb-8 md:mb-12 animate-fade-in">
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full text-sm font-medium text-blue-700 mb-6 shadow-lg">
        <Sparkles className="w-4 h-4" />
        Профессиональный заказ контента
        <FileText className="w-4 h-4" />
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
        Создайте идеальный контент
        <br className="hidden md:block" />
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          за несколько минут
        </span>
      </h1>
      
      <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto mb-12 leading-relaxed">
        Заполните форму ниже, и наши эксперты создадут для вас уникальный, 
        качественный контент, который поможет достичь ваших бизнес-целей
      </p>

      {/* Улучшенная статистика */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">10К+</div>
            <div className="text-sm text-slate-600 text-center font-medium">Довольных клиентов</div>
          </div>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">50К+</div>
            <div className="text-sm text-slate-600 text-center font-medium">Выполненных проектов</div>
          </div>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">24ч</div>
            <div className="text-sm text-slate-600 text-center font-medium">Средний срок</div>
          </div>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-slate-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">98%</div>
            <div className="text-sm text-slate-600 text-center font-medium">Успешных проектов</div>
          </div>
        </div>
      </div>

      {/* Дополнительные преимущества */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50">
          <Award className="w-8 h-8 text-green-600 flex-shrink-0" />
          <div className="text-left">
            <div className="font-semibold text-green-800">Гарантия качества</div>
            <div className="text-sm text-green-600">14 дней на правки</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50">
          <Sparkles className="w-8 h-8 text-blue-600 flex-shrink-0" />
          <div className="text-left">
            <div className="font-semibold text-blue-800">Уникальный контент</div>
            <div className="text-sm text-blue-600">100% оригинальность</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
          <Clock className="w-8 h-8 text-purple-600 flex-shrink-0" />
          <div className="text-left">
            <div className="font-semibold text-purple-800">Быстро и качественно</div>
            <div className="text-sm text-purple-600">От 24 часов</div>
          </div>
        </div>
      </div>
    </div>
  );
}
