
import Seo from "@/components/Seo";
import PaymentCancelledLayout from "@/components/payment/PaymentCancelledLayout";
import { getPaymentCancelledSeoData } from "@/components/payment/PaymentCancelledSEO";

export default function PaymentCancelled() {
  const seoData = getPaymentCancelledSeoData();

  return (
    <>
      <Seo {...seoData} />
      <PaymentCancelledLayout />
    </>
  );
}
