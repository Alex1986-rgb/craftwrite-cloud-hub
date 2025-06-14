
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/Seo";
import { SeoTextExpandable } from "@/components/landing/SeoTextExpandable";

const seoText = `
Политика конфиденциальности на CopyPro Cloud — ваша приватность в безопасности.
Мы тщательно храним персональные данные, используем их только для связывания с клиентом и не передаём третьим лицам.

Коротко о политике:
- Хранение и обработка данных в соответствии с ФЗ "О персональных данных".
- Все вопросы по приватности вы можете задать через форму обратной связи.
- Перед оформлением заказа клиент подтверждает согласие на обработку информации.
- Мы используем только безопасные технологии передачи и хранения данных.

CopyPro Cloud выбирает честность и заботу о клиентах!
`;

const Privacy = () => (
  <>
    <Header />
    <main className="min-h-screen flex flex-col items-center py-10 px-4 bg-background">
      <Seo
        title="Политика конфиденциальности — CopyPro Cloud"
        description="Условия хранения, обработки персональных данных и защиты личной информации клиентов CopyPro Cloud."
      />
      <section className="max-w-2xl w-full mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">Политика конфиденциальности</h1>
        <div className="text-muted-foreground space-y-4 text-sm">
          <p>Ваша персональная информация строго защищается и не передаётся третьим лицам. Мы используем данные только для связи с вами по вопросам заказов и обратной связи.</p>
          <p>Оформляя заказ, вы соглашаетесь с обработкой персональных данных в соответствии с требованиями ФЗ «О персональных данных».</p>
          <p>По всем вопросам, связанным с обработкой и хранением данных, вы можете обратиться через форму обратной связи.</p>
        </div>
      </section>
      <SeoTextExpandable text={seoText} />
    </main>
    <Footer />
  </>
);

export default Privacy;
