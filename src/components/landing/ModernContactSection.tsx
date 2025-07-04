import React from "react";
import SimplifiedContactForm from "./SimplifiedContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";

const ModernContactSection = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "info@copypro.cloud",
      href: "mailto:info@copypro.cloud"
    },
    {
      icon: Phone,
      title: "Телефон", 
      value: "+7 (999) 123-45-67",
      href: "tel:+79991234567"
    },
    {
      icon: Clock,
      title: "Время работы",
      value: "Пн-Пт 9:00-18:00 МСК",
      href: null
    },
    {
      icon: MapPin,
      title: "Офис",
      value: "Москва, Россия",
      href: null
    }
  ];

  const guarantees = [
    "Ответ в течение дня",
    "Бесплатная консультация",
    "Персональный менеджер",
    "Гарантия результата"
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container max-w-6xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Готовы начать проект?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Свяжитесь с нами удобным способом — мы ответим в течение дня
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Form */}
          <div>
            <SimplifiedContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            
            {/* Contact methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactMethods.map((method, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <method.icon className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">
                          {method.title}
                        </h3>
                        {method.href ? (
                          <a
                            href={method.href}
                            className="text-blue-600 hover:text-blue-700 transition-colors"
                          >
                            {method.value}
                          </a>
                        ) : (
                          <p className="text-slate-600">{method.value}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Guarantees */}
            <Card className="border-0 shadow-sm bg-green-50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">
                  Наши гарантии
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {guarantees.map((guarantee, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{guarantee}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA Info */}
            <Card className="border-0 shadow-sm bg-blue-50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Что происходит после заявки?
                </h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                    <span>Анализируем вашу задачу и готовим предложение</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                    <span>Связываемся с вами для уточнения деталей</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                    <span>Отправляем смету и начинаем работу</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernContactSection;