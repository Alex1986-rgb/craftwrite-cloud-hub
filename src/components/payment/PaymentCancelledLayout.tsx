
import PaymentCancelledContent from "./PaymentCancelledContent";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function PaymentCancelledLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <PaymentCancelledContent />
      <Footer />
    </div>
  );
}
