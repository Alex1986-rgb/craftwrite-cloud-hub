
import { SEO_CONFIG, generateWebPageStructuredData, generateBreadcrumbStructuredData } from "@/utils/seoConfig";

export const getPaymentCancelledSeoData = () => ({
  title: "Оплата отменена | CopyPro Cloud - Попробуйте еще раз",
  description: "Оплата была отменена. Вы можете попробовать оплатить заказ еще раз или связаться с нашей службой поддержки для получения помощи.",
  keywords: "оплата отменена, попробовать снова, помощь с оплатой, копирайтинг услуги",
  canonicalUrl: `${SEO_CONFIG.baseUrl}/payment-cancelled`,
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      generateWebPageStructuredData({
        title: "Оплата отменена",
        description: "Страница отмены оплаты заказа",
        url: "/payment-cancelled",
        about: "Payment Cancelled",
        keywords: "оплата, отмена, заказ"
      }),
      generateBreadcrumbStructuredData([
        { name: "Главная", url: "/" },
        { name: "Заказ", url: "/order" },
        { name: "Оплата отменена", url: "/payment-cancelled" }
      ])
    ]
  }
});
