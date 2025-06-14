
import { SEO_CONFIG, generateWebPageStructuredData, generateBreadcrumbStructuredData } from "@/utils/seoConfig";

export const getPaymentSuccessSeoData = () => ({
  title: "Оплата прошла успешно | CopyPro Cloud - Заказ принят",
  description: "Спасибо за заказ! Оплата прошла успешно. Мы свяжемся с вами в ближайшее время для уточнения деталей и начала работы над вашим проектом.",
  keywords: "оплата успешна, заказ принят, копирайтинг услуги, спасибо за заказ",
  canonicalUrl: `${SEO_CONFIG.baseUrl}/payment-success`,
  structuredData: {
    "@context": "https://schema.org",
    "@graph": [
      generateWebPageStructuredData({
        title: "Оплата успешна",
        description: "Страница подтверждения успешной оплаты",
        url: "/payment-success",
        about: "Payment Success",
        keywords: "оплата, успех, заказ"
      }),
      generateBreadcrumbStructuredData([
        { name: "Главная", url: "/" },
        { name: "Заказ", url: "/order" },
        { name: "Оплата успешна", url: "/payment-success" }
      ])
    ]
  }
});
