
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/Seo";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { prices } from "@/data/prices";

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

const Prices = () => {
  const { loading, handleStripeCheckout } = useStripeCheckout();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handlePayClick = (priceId: string) => {
    setProcessingId(priceId);
    handleStripeCheckout(priceId);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col items-center py-10 px-4 bg-background">
        <Seo
          title="Цены на услуги — CopyPro Cloud"
          description="Прозрачные и доступные цены на копирайтинг, SEO-статьи, тексты для бизнеса. Экономьте время и бюджет с CopyPro Cloud!"
        />
        <section className="max-w-4xl mx-auto w-full">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">Цены на услуги</h1>
          <div className="border rounded-xl overflow-hidden bg-card shadow">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold">Услуга</th>
                  <th className="py-3 px-4 text-left font-semibold">Цена</th>
                  <th className="py-3 px-4 text-right font-semibold">Действие</th>
                </tr>
              </thead>
              <tbody>
                {prices.map((item) => (
                  <tr key={item.priceId} className="border-t even:bg-muted/40">
                    <td className="py-4 px-4">{item.service}</td>
                    <td className="py-4 px-4 font-semibold">{item.price}</td>
                    <td className="py-4 px-4 text-right">
                      <Button
                        onClick={() => handlePayClick(item.priceId)}
                        disabled={loading && processingId === item.priceId}
                        className="w-full sm:w-auto"
                      >
                        {loading && processingId === item.priceId
                          ? "Обработка..."
                          : "Оплатить"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-8">
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
