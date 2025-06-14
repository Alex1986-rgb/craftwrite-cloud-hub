
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Seo from "@/components/Seo";

const About = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background flex flex-col items-center py-10 px-4">
        <Seo
          title="О нас — CopyPro Cloud"
          description="CopyPro Cloud — команда профессиональных копирайтеров и редакторов. Работаем с 2017 года, сотни успешных текстовых проектов для бизнеса и СМИ."
        />
        <section className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-5">О CopyPro Cloud</h1>
          <p className="text-lg text-muted-foreground mb-7">
            CopyPro Cloud — современная SaaS-платформа для заказа текстов любого формата. Наша команда состоит из опытных копирайтеров, редакторов и экспертов по SEO. 
          </p>
          <div className="space-y-3">
            <p>
              Мы работаем с 2017 года, накопив богатый опыт в создании текстов для бизнеса, IT, СМИ, маркетинга и интернет-магазинов.
            </p>
            <p>
              Наша миссия — помогать компаниям и предпринимателям эффективно решать задачи с помощью грамотного и качественного текста. Мы ценим скорость, надежность и индивидуальный подход к каждому заказу.
            </p>
            <p>
              CopyPro Cloud — это сервис, которому доверяют сотни клиентов. <br />
              Всегда рады новым проектам!
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
