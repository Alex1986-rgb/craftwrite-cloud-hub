
import { ReactNode } from "react";
import OrderPagePerformance from "./OrderPagePerformance";
import OrderAccessibilityEnhancer from "./OrderAccessibilityEnhancer";

interface OrderSeoIntegrationProps {
  children: ReactNode;
  announcements?: string[];
  pageTitle?: string;
  pageDescription?: string;
}

export default function OrderSeoIntegration({ 
  children, 
  announcements = [],
  pageTitle = "Заказ профессиональных текстов",
  pageDescription = "Оформите заказ на создание качественного контента для вашего бизнеса"
}: OrderSeoIntegrationProps) {
  return (
    <OrderPagePerformance>
      <OrderAccessibilityEnhancer announcements={announcements}>
        {/* Enhanced page metadata */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": pageTitle,
              "description": pageDescription,
              "url": "https://copypro.cloud/order",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "description": "Профессиональные копирайтинг услуги",
                "seller": {
                  "@type": "Organization",
                  "name": "CopyPro Cloud",
                  "url": "https://copypro.cloud"
                }
              },
              "featureList": [
                "Создание SEO-статей",
                "Написание лендингов",
                "Контент для социальных сетей",
                "Email-маркетинг",
                "Описания товаров"
              ],
              "inLanguage": "ru",
              "isAccessibleForFree": false,
              "usageInfo": "Коммерческое использование разрешено"
            })
          }}
        />
        
        {/* Breadcrumb navigation for SEO */}
        <nav aria-label="Навигация по сайту" className="sr-only">
          <ol itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a itemProp="item" href="/">
                <span itemProp="name">Главная</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name">Заказ</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>
        
        {children}
      </OrderAccessibilityEnhancer>
    </OrderPagePerformance>
  );
}
