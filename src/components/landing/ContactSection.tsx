
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Send, Mail, User, MessageSquare, CheckCircle2, Sparkles } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({
        title: "🎉 Заявка отправлена!",
        description: "Мы получили ваш запрос и свяжемся с вами в течение дня.",
      });
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
    }, 1200);
  }

  const isFormValid = form.name.trim() && form.email.trim() && form.message.trim();

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-3 mb-6">
            <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
            <span className="text-blue-700 font-semibold">Свяжитесь с нами</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-slate-800 mb-6 leading-tight">
            Готовы начать?
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Обсудим ваш проект
            </span>
          </h2>
          
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Оставьте заявку, и наш эксперт свяжется с вами в течение часа для обсуждения деталей и расчета стоимости
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-slate-200/50">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                Контактная информация
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl hover:scale-105 transition-transform duration-300">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Email</div>
                    <a href="mailto:hello@copypro.cloud" className="text-blue-600 hover:underline">
                      hello@copypro.cloud
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl hover:scale-105 transition-transform duration-300">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800">Время ответа</div>
                    <div className="text-green-600 font-medium">В течение 1 часа</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-200/50 hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                <div className="text-sm text-slate-600 font-medium">Уникальность</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-slate-200/50 hover:shadow-lg transition-shadow duration-300">
                <div className="text-3xl font-bold text-purple-600 mb-2">30+</div>
                <div className="text-sm text-slate-600 font-medium">Экспертов</div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 p-8 hover:shadow-glow transition-shadow duration-500">
            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Ваше имя
                </label>
                <div className={`relative transition-all duration-300 ${focusedField === 'name' ? 'scale-[1.02]' : ''}`}>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Как к вам обращаться?"
                    required
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                    className="h-14 rounded-2xl border-2 border-slate-200 focus:border-blue-500 bg-white/80 backdrop-blur-sm text-base placeholder:text-slate-400 transition-all duration-300"
                  />
                  {form.name && (
                    <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 animate-in zoom-in duration-300" />
                  )}
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email для связи
                </label>
                <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.02]' : ''}`}>
                  <Input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    className="h-14 rounded-2xl border-2 border-slate-200 focus:border-blue-500 bg-white/80 backdrop-blur-sm text-base placeholder:text-slate-400 transition-all duration-300"
                  />
                  {form.email && form.email.includes('@') && (
                    <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500 animate-in zoom-in duration-300" />
                  )}
                </div>
              </div>

              {/* Message Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Расскажите о проекте
                </label>
                <div className={`relative transition-all duration-300 ${focusedField === 'message' ? 'scale-[1.02]' : ''}`}>
                  <Textarea
                    name="message"
                    placeholder="Опишите ваш проект: тип контента, объем, сроки, особые требования..."
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField('')}
                    className="rounded-2xl border-2 border-slate-200 focus:border-blue-500 bg-white/80 backdrop-blur-sm text-base placeholder:text-slate-400 resize-none transition-all duration-300"
                  />
                  {form.message && (
                    <CheckCircle2 className="absolute right-4 top-4 w-5 h-5 text-green-500 animate-in zoom-in duration-300" />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg" 
                disabled={loading || !isFormValid}
                className={`w-full h-14 rounded-2xl text-lg font-bold shadow-xl transition-all duration-500 relative overflow-hidden group ${
                  isFormValid 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 hover:scale-105 hover:shadow-glow' 
                    : 'bg-slate-300 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-center gap-3 relative z-10">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Отправляем...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      Отправить заявку
                    </>
                  )}
                </div>
                {isFormValid && (
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                )}
              </Button>

              {/* Privacy Notice */}
              <p className="text-xs text-slate-500 text-center leading-relaxed">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <a href="/privacy" className="underline hover:text-blue-600 transition-colors">
                  политикой конфиденциальности
                </a>
                . Мы не передаем данные третьим лицам.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
