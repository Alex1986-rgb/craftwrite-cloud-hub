
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/Seo";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";
import { prices } from "@/data/prices";
import { PriceTable } from "@/components/prices/PriceTable";

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
          <PriceTable items={prices} />
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
