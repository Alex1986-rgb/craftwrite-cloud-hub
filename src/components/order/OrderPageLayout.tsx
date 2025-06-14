
import { ReactNode } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import OrderBackground from "./OrderBackground";
import OrderSeoIntegration from "./OrderSeoIntegration";

interface OrderPageLayoutProps {
  children: ReactNode;
  announcements?: string[];
}

export default function OrderPageLayout({ children, announcements }: OrderPageLayoutProps) {
  return (
    <OrderSeoIntegration announcements={announcements}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main 
          className="flex-1 bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30 relative overflow-hidden"
          role="main"
          aria-label="Страница заказа услуг"
          id="order-form"
        >
          <OrderBackground />
          <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-16 relative z-10">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </OrderSeoIntegration>
  );
}
