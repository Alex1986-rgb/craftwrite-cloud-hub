
import { Mail, Phone, MessageCircle } from "lucide-react";
import SocialLinks from "@/components/common/SocialLinks";

export default function ContactMethods() {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-slate-200/50">
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Mail className="w-4 h-4 text-white" />
        </div>
        Контакты
      </h3>
      
      <div className="space-y-3 mb-4">
        <a 
          href="tel:+79257338648"
          className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl hover:scale-105 transition-transform duration-300 group"
        >
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Phone className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800">Телефон</div>
            <div className="text-green-600 font-medium text-sm">+7 (925) 733-86-48</div>
          </div>
        </a>

        <a 
          href="mailto:optteem@mail.ru"
          className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:scale-105 transition-transform duration-300 group"
        >
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <Mail className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800">Email</div>
            <div className="text-purple-600 font-medium text-sm">optteem@mail.ru</div>
          </div>
        </a>

        <a 
          href="https://t.me/Koopeerayter"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl hover:scale-105 transition-transform duration-300 group"
        >
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <MessageCircle className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800">Telegram</div>
            <div className="text-blue-600 font-medium text-sm">@Koopeerayter</div>
          </div>
        </a>
      </div>

      {/* Developer Info - Compact */}
      <div className="border-t border-slate-200 pt-4">
        <div className="text-center">
          <div className="text-xs text-slate-500 mb-1">Генеральный директор</div>
          <div className="font-semibold text-slate-700 text-sm mb-2">Кырлан Александр Сергеевич</div>
          <SocialLinks variant="default" className="justify-center" />
        </div>
      </div>
    </div>
  );
}
