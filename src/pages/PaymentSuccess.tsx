
import Seo from "@/components/Seo";
import PaymentSuccessLayout from "@/components/payment/PaymentSuccessLayout";
import { getPaymentSuccessSeoData } from "@/components/payment/PaymentSuccessSEO";

export default function PaymentSuccess() {
  const seoData = getPaymentSuccessSeoData();

  return (
    <>
      <Seo {...seoData} />
      <PaymentSuccessLayout />
    </>
  );
}
