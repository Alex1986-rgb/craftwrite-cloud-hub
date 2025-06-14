
import { FileText, Clock, Users, Award } from "lucide-react";

export default function OrderFormHeader() {
  return (
    <div className="text-center mb-8 md:mb-12 animate-fade-in">
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full text-sm font-medium text-blue-700 mb-6">
        <FileText className="w-4 h-4" />
        Профессиональный заказ контента
      </div>
      
      <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
        Создайте идеальный контент
        <br className="hidden md:block" />
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          за несколько минут
        </span>
      </h1>
      
      <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
        Заполните форму ниже, и наши эксперты создадут для вас уникальный, 
        качественный контент, который поможет достичь ваших бизнес-целей
      </p>

      {/* Статистика */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-slate-200/50">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">10К+</div>
            <div className="text-sm text-slate-600 text-center">Клиентов</div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-slate-200/50">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mb-3">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">50К+</div>
            <div className="text-sm text-slate-600 text-center">Проектов</div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-slate-200/50">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mb-3">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">24ч</div>
            <div className="text-sm text-slate-600 text-center">Средний срок</div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-slate-200/50">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-3">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">98%</div>
            <div className="text-sm text-slate-600 text-center">Довольных</div>
          </div>
        </div>
      </div>
    </div>
  );
}
