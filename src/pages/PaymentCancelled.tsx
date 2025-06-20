
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/Seo";
import { XCircle } from "lucide-react";

const PaymentCancelled = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center justify-center py-10 px-4 bg-background text-center">
        <Seo
          title="Оплата отменена — CopyPro Cloud"
          description="Процесс оплаты был отменен. Вы можете попробовать снова."
        />
        <div className="max-w-md mx-auto">
          <XCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Оплата отменена</h1>
          <p className="text-muted-foreground mb-6">
            Вы отменили процесс оплаты. Ваш заказ не был оформлен. Вы можете вернуться на страницу с ценами и попробовать снова.
          </p>
          <Button asChild variant="secondary">
            <Link to="/prices">Вернуться к ценам</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PaymentCancelled;
