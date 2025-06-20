
import { Star } from "lucide-react";

const ServiceSectionHeader = () => {
  return (
    <div className="text-center mb-16 md:mb-20">
      <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100/80 to-purple-100/80 text-blue-700 px-6 py-3 rounded-full text-sm font-bold mb-6 border border-blue-200/50 shadow-lg backdrop-blur-sm">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        <Star className="w-5 h-5" />
        <span>20 видов текстов</span>
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight tracking-tight">
        Каталог услуг
        <br />
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">копирайтинга</span>
      </h2>
      
      <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
        От маркетплейсов до лонгридов — полный спектр текстовых решений для любых задач
      </p>
    </div>
  );
};

export default ServiceSectionHeader;
