
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import { EnhancedFormField } from "@/components/ui/enhanced-form-field";
import { ProgressiveTextarea } from "@/components/ui/progressive-textarea";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Очистка ошибок при вводе
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  // Валидация полей
  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Имя обязательно';
        if (value.length < 2) return 'Имя должно содержать минимум 2 символа';
        return null;
      case 'email':
        if (!value.trim()) return 'Email обязателен';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Введите корректный email';
        return null;
      case 'message':
        if (!value.trim()) return 'Сообщение обязательно';
        if (value.length < 10) return 'Сообщение должно содержать минимум 10 символов';
        return null;
      default:
        return null;
    }
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Валидация всех полей
    const newErrors: { [key: string]: string } = {};
    Object.entries(form).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast({
        title: "Ошибки в форме",
        description: "Пожалуйста, исправьте отмеченные ошибки",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast({
        title: "🎉 Заявка отправлена!",
        description: "Мы получили ваш запрос и свяжемся с вами в течение дня.",
      });
      setForm({ name: "", email: "", message: "" });
      setErrors({});
      setLoading(false);
    }, 1200);
  }

  const isFormValid = form.name.trim() && form.email.trim() && form.message.trim();

  return (
    <div className="form-modern">
      <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
        <EnhancedFormField
          id="name"
          name="name"
          type="text"
          label="Ваше имя"
          placeholder="Как к вам обращаться?"
          icon={User}
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          success={form.name.length > 0 && !errors.name}
          required
          validationRules={[(value) => validateField('name', value)]}
          realTimeValidation
          autoSave
          onAutoSave={(value) => {
            // Автосохранение в localStorage
            localStorage.setItem('contact_form_name', value);
          }}
        />

        <EnhancedFormField
          id="email"
          name="email"
          type="email"
          label="Email для связи"
          placeholder="your@email.com"
          icon={Mail}
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          success={form.email.includes('@') && !errors.email}
          required
          validationRules={[(value) => validateField('email', value)]}
          realTimeValidation
          autoSave
          onAutoSave={(value) => {
            localStorage.setItem('contact_form_email', value);
          }}
        />

        <ProgressiveTextarea
          id="message"
          name="message"
          label="Расскажите о проекте"
          placeholder="Опишите ваш проект: тип контента, объем, сроки, особые требования..."
          value={form.message}
          onChange={handleChange}
          error={errors.message}
          success={form.message.length >= 10 && !errors.message}
          required
          characterLimit={2000}
          showWordCount
          autoResize
          minRows={5}
          maxRows={10}
          suggestions={[
            "Нужен текст для главной страницы сайта",
            "Требуется SEO-статья на 3000 символов",
            "Нужны продающие тексты для карточек товаров",
            "Создание контент-плана для социальных сетей",
            "Написание коммерческого предложения"
          ]}
          autoSave
          onAutoSave={(value) => {
            localStorage.setItem('contact_form_message', value);
          }}
        />

        <Button 
          type="submit" 
          size="lg" 
          disabled={loading || !isFormValid}
          className="submit-button-enhanced"
        >
          <div className="flex items-center justify-center gap-3">
            {loading ? (
              <>
                <div className="form-spinner" />
                Отправляем...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                Отправить заявку
              </>
            )}
          </div>
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
