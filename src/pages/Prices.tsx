
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PriceTable from "@/components/prices/PriceTable";
import PriceCalculator from "@/components/prices/PriceCalculator";
import PriceComparison from "@/components/prices/PriceComparison";
import PriceFAQ from "@/components/prices/PriceFAQ";
import { Star, Shield, Zap, Award, TrendingUp, Clock } from "lucide-react";

export default function Prices() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-emerald-600/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 px-6 py-3 rounded-full text-sm font-bold mb-6 border border-emerald-200/50 shadow-lg">
                <TrendingUp className="w-5 h-5" />
                Прозрачное ценообразование
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
                Цены на профессиональный <br />
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">копирайтинг</span>
              </h1>
              
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                Честные цены без скрытых платежей. Выберите подходящий тариф или рассчитайте стоимость индивидуального проекта
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                <div className="flex items-center gap-2 bg-white/80 px-6 py-3 rounded-full shadow-lg border border-slate-200/50">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-slate-700">Гарантия качества</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 px-6 py-3 rounded-full shadow-lg border border-slate-200/50">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold text-slate-700">Быстрое выполнение</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 px-6 py-3 rounded-full shadow-lg border border-slate-200/50">
                  <Award className="w-5 h-5 text-purple-500" />
                  <span className="font-semibold text-slate-700">Экспертный уровень</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Price Table */}
        <PriceTable />
        
        {/* Price Calculator */}
        <PriceCalculator />
        
        {/* Price Comparison */}
        <PriceComparison />
        
        {/* FAQ */}
        <PriceFAQ />
      </main>
      <Footer />
    </>
  );
}
