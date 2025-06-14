
import { useState } from "react";
import { MessageCircle, Phone, Mail, X, Headphones, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SupportWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Telegram",
      description: "Быстрый ответ в течение 15 мин",
      action: () => window.open("https://t.me/Koopeerayter", "_blank"),
      color: "text-blue-600",
      bgColor: "bg-blue-50 hover:bg-blue-100"
    },
    {
      icon: Phone,
      title: "Телефон", 
      description: "Звонок прямо сейчас",
      action: () => window.open("tel:+79257338648", "_self"),
      color: "text-green-600",
      bgColor: "bg-green-50 hover:bg-green-100"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Подробная консультация",
      action: () => window.open("mailto:optteem@mail.ru", "_self"),
      color: "text-purple-600", 
      bgColor: "bg-purple-50 hover:bg-purple-100"
    }
  ];

  return (
    <>
      {/* Support Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
        >
          <div className="relative">
            <Headphones className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </Button>
      </div>

      {/* Support Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Поддержка 24/7</h3>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Онлайн
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="rounded-xl"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Support Options */}
            <div className="space-y-4 mb-6">
              {supportOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={option.action}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl ${option.bgColor} transition-all duration-300 hover:scale-105 hover:shadow-md group`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center ${option.color} group-hover:scale-110 transition-transform`}>
                    <option.icon className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-slate-800">{option.title}</div>
                    <div className="text-sm text-slate-600">{option.description}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Working Hours */}
            <div className="flex items-center justify-center gap-2 text-sm text-slate-600 bg-slate-50 rounded-xl p-3">
              <Clock className="w-4 h-4" />
              <span>Работаем круглосуточно без выходных</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
