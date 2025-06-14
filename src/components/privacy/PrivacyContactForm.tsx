
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Send, Mail, Phone, MapPin, Clock } from "lucide-react";

export default function PrivacyContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Форма отправлена:", formData);
    // Здесь будет логика отправки формы
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Форма */}
      <Card className="p-8 bg-gradient-to-br from-white/95 to-green-50/30 border-green-200/50 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Свяжитесь с нами</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-slate-700 font-medium">Имя</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2"
                placeholder="Ваше имя"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2"
                placeholder="your@email.com"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="subject" className="text-slate-700 font-medium">Тема</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="mt-2"
              placeholder="Вопрос по конфиденциальности"
            />
          </div>
          
          <div>
            <Label htmlFor="message" className="text-slate-700 font-medium">Сообщение</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="mt-2"
              placeholder="Опишите ваш вопрос подробно..."
            />
          </div>
          
          <Button type="submit" className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
            <Send className="w-4 h-4 mr-2" />
            Отправить сообщение
          </Button>
        </form>
      </Card>

      {/* Контактная информация */}
      <div className="space-y-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50/80 to-white border-blue-200/50">
          <div className="flex items-center gap-3 mb-4">
            <Phone className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-slate-800">Телефон</h4>
          </div>
          <p className="text-slate-600">+7 (800) 123-45-67</p>
          <Badge variant="secondary" className="mt-2">
            <Clock className="w-3 h-3 mr-1" />
            Пн-Пт 9:00-18:00
          </Badge>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50/80 to-white border-green-200/50">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-5 h-5 text-green-600" />
            <h4 className="font-semibold text-slate-800">Email</h4>
          </div>
          <p className="text-slate-600">privacy@copypro.cloud</p>
          <Badge variant="secondary" className="mt-2">
            Ответ в течение 24 часов
          </Badge>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50/80 to-white border-purple-200/50">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-slate-800">Адрес</h4>
          </div>
          <p className="text-slate-600">
            Россия, Москва<br />
            ул. Примерная, д. 123<br />
            офис 456
          </p>
        </Card>
      </div>
    </div>
  );
}
