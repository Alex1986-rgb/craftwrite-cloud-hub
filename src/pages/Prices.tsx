
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/Seo";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";

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

const Prices = () => (
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
        <div className="text-center">Для крупных или уникальных заказов&nbsp;
          <span className="italic text-primary">цена обсуждается индивидуально.</span>
        </div>
      </section>
      <SeoTextExpandable text={seoText} />
    </main>
    <Footer />
  </>
);

export default Prices;
