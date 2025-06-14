import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/Seo";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const seoText = `
Цены на копирайтинг и создание текстов от CopyPro Cloud — всё прозрачно и честно.
Мы предлагаем гибкую ценовую политику для стандартных и индивидуальных заказов: SEO-статьи, продающие лендинги, описания товаров, рассылки и многое другое.

Преимущества работы с нами:
- Стоимость формируется только из объёма и сложности задания, без скрытых доплат.
- Для крупных заказов и постоянных клиентов действуют индивидуальные скидки.
- Вы всегда получаете качественный текст, соответствующий вашему брифу и требованиям ниши.
- Бесплатная SEO-оптимизация и корректировка по пожеланиям клиента.

С CopyPro Cloud вы заранее знаете, за что платите — никаких сюрпризов.
`;

const prices = [
  { service: "SEO-статья (1000 знаков)", price: "от 400 ₽" },
  { service: "Описание товара", price: "от 350 ₽" },
  { service: "Текст для соцсетей", price: "от 600 ₽" },
  { service: "Продающий лендинг", price: "от 4000 ₽" },
  { service: "Пресс-релиз", price: "от 3000 ₽" },
  { service: "E-mail рассылка", price: "от 1200 ₽" },
];

const handleStripeCheckout = async (
  setLoading: (loading: boolean) => void,
  setError: (msg: string | null) => void
) => {
  setLoading(true);
  setError(null);

  try {
    // Call the edge function to create a Stripe Checkout Session
    const res = await fetch("/functions/v1/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId: "price_67890",
        successUrl: `${window.location.origin}/payment-success`,
        cancelUrl: `${window.location.origin}/payment-cancelled`,
      }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      setError("Ошибка при создании платежа. Попробуйте позже.");
    }
  } catch (e) {
    setError("Ошибка соединения. Проверьте сеть.");
  }
  setLoading(false);
};

const Prices = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center py-10 px-4 bg-background">
        <Seo
          title="Цены на услуги — CopyPro Cloud"
          description="Прозрачные и доступные цены на копирайтинг, SEO-статьи, тексты для бизнеса. Экономьте время и бюджет с CopyPro Cloud!"
        />
        <section className="max-w-2xl mx-auto w-full">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">Цены на услуги</h1>
          <table className="w-full border rounded-xl overflow-hidden mb-8 bg-card shadow">
            <thead className="bg-muted">
              <tr>
                <th className="py-2 px-4 text-left">Услуга</th>
                <th className="py-2 px-4 text-left">Цена</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((item, idx) => (
                <tr key={idx} className="even:bg-muted/40">
                  <td className="py-2 px-4">{item.service}</td>
                  <td className="py-2 px-4 font-semibold">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mb-6">
            <Button
              onClick={() => handleStripeCheckout(setLoading, setError)}
              disabled={loading}
              className="text-lg px-8 py-3"
            >
              {loading ? "Перенаправление..." : "Оплатить"}
            </Button>
          </div>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <div className="text-center">
            Для крупных или уникальных заказов&nbsp;
            <span className="italic text-primary">
              цена обсуждается индивидуально.
            </span>
          </div>
        </section>
        <SeoTextExpandable text={seoText} />
      </main>
      <Footer />
    </>
  );
};

export default Prices;
