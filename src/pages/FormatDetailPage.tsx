
import { useParams, Link } from "react-router-dom";
import { SERVICES } from "@/data/services";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";
import { ServiceSeoExcerpt } from "@/components/service/ServiceSeoExcerpt";

export default function FormatDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="max-w-2xl mx-auto py-24">
        <h2 className="text-2xl font-bold mb-3">Вид текста не найден</h2>
        <Button asChild variant="outline">
          <Link to="/">На главную</Link>
        </Button>
      </div>
    );
  }

  const seoTitle = `${service.name}: рекомендации, правила, SEO и грамматика | CopyPro Cloud`;
  const seoDesc = service.detail.length > 200 ? service.detail.substring(0,197) + "..." : service.detail;

  return (
    <section className="max-w-2xl mx-auto py-10">
      <Seo title={seoTitle} description={seoDesc} />
      <Card className="shadow-md border-primary/40 bg-background">
        <CardContent className="p-6">
          <CardTitle className="text-2xl flex gap-2 items-center mb-2">
            {service.name}
            <Badge variant="outline" className="ml-1">{service.format}</Badge>
          </CardTitle>
          <p className="text-muted-foreground mb-4">{service.detail}</p>
          <h3 className="font-bold mt-4 mb-2 text-primary">Рекомендации:</h3>
          <ul className="list-disc ml-5 mb-2">
            {service.recs.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
          <h3 className="font-bold mt-2 mb-2 text-primary">Правила и SEO:</h3>
          <ul className="list-decimal ml-5">
            {service.rules.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
          <ServiceSeoExcerpt seoText={service.seoText} />
          <div className="pt-6 flex gap-3">
            <Button asChild variant="default" size="sm">
              <Link to="/order">Заказать такой текст</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/#services">Назад к каталогу</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
