
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Send, Mail, User, MessageSquare, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
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
  );
}
