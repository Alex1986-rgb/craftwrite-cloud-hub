
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ComprehensiveSeo from "@/components/seo/ComprehensiveSeo";
import { CheckCircle2, ArrowRight, Download, MessageCircle } from "lucide-react";

const PaymentSuccess = () => {
  return (
    <>
      <ComprehensiveSeo
        title="Оплата прошла успешно — CopyPro Cloud"
        description="Спасибо за ваш заказ! Ваш платеж успешно обработан."
      />
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-green-200/50">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Оплата прошла успешно!
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Спасибо за ваш заказ! Мы получили ваш платеж и скоро свяжемся с вами для уточнения деталей проекта.
            </p>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-200/50">
              <h3 className="font-semibold text-green-800 mb-3">Что происходит дальше?</h3>
              <div className="space-y-2 text-sm text-green-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>В течение 2 часов с вами свяжется менеджер проекта</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Обсудим техническое задание и детали</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Начнем работу над вашим проектом</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <Link to="/" className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Вернуться на главную
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Связаться с нами
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PaymentSuccess;
