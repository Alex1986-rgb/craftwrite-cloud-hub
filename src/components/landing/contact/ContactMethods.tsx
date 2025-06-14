
import { Mail, Phone } from "lucide-react";
import SocialLinks from "@/components/common/SocialLinks";

export default function ContactMethods() {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-slate-200/50">
      <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
          <Mail className="w-6 h-6 text-white" />
        </div>
        Свяжитесь прямо сейчас
      </h3>
      
      <div className="space-y-4 mb-6">
        <a 
          href="tel:+79257338648"
          className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl hover:scale-105 transition-transform duration-300 group"
        >
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Phone className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <div className="font-semibold text-slate-800">Телефон</div>
            <div className="text-green-600 font-medium">+7 (925) 733-86-48</div>
          </div>
        </a>

        <a 
          href="mailto:optteem@mail.ru"
          className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl hover:scale-105 transition-transform duration-300 group"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <Mail className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <div className="font-semibold text-slate-800">Email</div>
            <div className="text-purple-600 font-medium">optteem@mail.ru</div>
          </div>
        </a>
      </div>

      {/* Social Links */}
      <div className="text-center">
        <h4 className="font-semibold text-slate-700 mb-4">Мы в соцсетях</h4>
        <SocialLinks variant="default" className="justify-center" />
      </div>
    </div>
  );
}
