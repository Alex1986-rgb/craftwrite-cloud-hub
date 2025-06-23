
import ContactSection from "@/components/landing/ContactSection";
import ContactHero from "@/components/contact/ContactHero";
import ContactFAQ from "@/components/contact/ContactFAQ";
import ContactMap from "@/components/contact/ContactMap";
import { useSeoMeta } from "@/hooks/useSeoMeta";
import { useSocialMeta } from "@/hooks/useSocialMeta";

export default function ContactPage() {
  useSeoMeta({
    title: "Свяжитесь с нами - CopyPro Cloud | Профессиональный копирайтинг",
    description: "Свяжитесь с командой экспертов CopyPro Cloud. Получите консультацию по копирайтингу, SEO-текстам и контент-маркетингу. Работаем 24/7.",
    keywords: "контакты копирайтинг, связаться копирайтер, консультация seo, заказать тексты",
    canonical: "https://copyprocloud.ru/contact"
  });

  useSocialMeta({
    title: "Свяжитесь с нами - CopyPro Cloud",
    description: "Получите профессиональную консультацию по копирайтингу и контент-маркетингу от экспертов CopyPro Cloud",
    image: "https://copyprocloud.ru/images/contact-og.jpg",
    url: "https://copyprocloud.ru/contact"
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <ContactHero />
      <ContactSection />
      <ContactMap />
      <ContactFAQ />
    </div>
  );
}
