
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
        <section className="max-w-2xl mx-auto w-full bg-muted/60 rounded-3xl shadow-2xl px-6 md:px-12 py-12 animate-fade-in mt-4 mb-4">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6 text-center text-primary drop-shadow-lg">О CopyPro Cloud</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-center font-inter">
            CopyPro Cloud — современная SaaS-платформа для заказа текстов любого формата.
            <br className="hidden md:inline" />
            Наша команда состоит из опытных копирайтеров, редакторов и экспертов по SEO.
          </p>
          <div className="space-y-6 text-base md:text-lg text-foreground">
            <p className="bg-background/60 p-4 rounded-xl shadow-sm">
              Мы работаем с 2017 года, накопив богатый опыт в создании текстов для бизнеса, IT, СМИ, маркетинга и интернет-магазинов.
            </p>
            <p className="bg-background/60 p-4 rounded-xl shadow-sm">
              Наша миссия — помогать компаниям и предпринимателям эффективно решать задачи с помощью грамотного и качественного текста. Мы ценим скорость, надежность и индивидуальный подход к каждому заказу.
            </p>
            <p className="bg-background/60 p-4 rounded-xl shadow-sm">
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
