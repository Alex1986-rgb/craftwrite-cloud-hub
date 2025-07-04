import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send, CheckCircle, Mail, User, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SimplifiedContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Некорректный email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Сообщение обязательно";
    } else if (formData.message.length < 10) {
      newErrors.message = "Минимум 10 символов";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в течение дня.",
      });
      
      setFormData({ name: "", email: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim();

  return (
    <Card className="w-full max-w-lg mx-auto shadow-lg border-0">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-slate-900">
          Оставить заявку
        </CardTitle>
        <p className="text-slate-600">
          Расскажите о проекте — ответим в течение дня
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Name field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
              <User className="w-4 h-4 text-slate-500" />
              Ваше имя
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Как к вам обращаться?"
              className={`${errors.name ? 'border-red-500' : ''} transition-colors`}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Email field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
              <Mail className="w-4 h-4 text-slate-500" />
              Email для связи
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={`${errors.email ? 'border-red-500' : ''} transition-colors`}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Message field */}
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center gap-2 text-sm font-medium">
              <MessageSquare className="w-4 h-4 text-slate-500" />
              Расскажите о проекте
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Опишите ваш проект: тип контента, объем, сроки..."
              rows={4}
              className={`${errors.message ? 'border-red-500' : ''} resize-none transition-colors`}
            />
            {errors.message && (
              <p className="text-sm text-red-600">{errors.message}</p>
            )}
            <div className="text-xs text-slate-500 text-right">
              {formData.message.length}/500
            </div>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            size="lg"
            disabled={loading || !isFormValid}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Отправляем...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Отправить заявку
              </>
            )}
          </Button>

          {/* Guarantees */}
          <div className="flex flex-col gap-2 pt-4">
            {[
              "Ответим в течение дня",
              "Бесплатная консультация",
              "Никакого спама"
            ].map((guarantee, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span>{guarantee}</span>
              </div>
            ))}
          </div>

          {/* Privacy notice */}
          <p className="text-xs text-slate-500 text-center leading-relaxed">
            Нажимая кнопку, вы соглашаетесь с{" "}
            <a href="/privacy" className="underline hover:text-blue-600 transition-colors">
              политикой конфиденциальности
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default SimplifiedContactForm;