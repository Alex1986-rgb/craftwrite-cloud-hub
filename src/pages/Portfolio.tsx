
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/Seo";

const works = [
  {
    title: "SEO-статья для IT-компании",
    desc: "Разработка экспертной статьи по кибербезопасности, релевантность 98%, заказчик: SaaS-платформа.",
  },
  {
    title: "Описания товаров для интернет-магазина",
    desc: "Более 1500 карточек товаров с уникальными текстами, повышена конверсия на 17%.",
  },
  {
    title: "Контент для лендинга онлайн-курса",
    desc: "Структурированный продающий текст, результат — 42% рост заявок.",
  },
];

const Portfolio = () => (
  <>
    <Header />
    <main className="min-h-screen flex flex-col items-center py-10 px-4 bg-background">
      <Seo
        title="Портфолио — CopyPro Cloud"
        description="Примеры наших текстов, успешные проекты и результаты для клиентов из разных ниш."
      />
      <section className="max-w-3xl w-full mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">Портфолио</h1>
        <div className="space-y-7">
          {works.map((item, idx) => (
            <div key={idx} className="bg-card rounded-xl p-5 shadow flex flex-col gap-1">
              <div className="text-lg md:text-2xl font-semibold">{item.title}</div>
              <div className="text-muted-foreground">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </>
);

export default Portfolio;
