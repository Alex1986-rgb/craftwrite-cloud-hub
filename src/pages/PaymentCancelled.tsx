
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ComprehensiveSeo from "@/components/seo/ComprehensiveSeo";
import { XCircle, ArrowLeft, RefreshCw, MessageCircle } from "lucide-react";

const PaymentCancelled = () => {
  return (
    <>
      <ComprehensiveSeo
        title="Оплата отменена — CopyPro Cloud"
        description="Процесс оплаты был отменен. Вы можете попробовать снова."
      />
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-orange-200/50">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Оплата отменена
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Вы отменили процесс оплаты. Ваш заказ не был оформлен. 
              Не переживайте — вы можете вернуться и попробовать снова в любое время.
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border border-blue-200/50">
              <h3 className="font-semibold text-blue-800 mb-3">Нужна помощь?</h3>
              <p className="text-sm text-blue-700 mb-3">
                Если у вас возникли вопросы или проблемы с оплатой, наша команда поддержки готова помочь.
              </p>
              <div className="text-sm text-blue-600">
                📞 +7 (800) 123-45-67 | ✉️ support@copypro.cloud
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                <Link to="/" className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Попробовать снова
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Связаться с поддержкой
                </Link>
              </Button>
              
              <Button variant="secondary" size="lg" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  На главную
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

export default PaymentCancelled;
