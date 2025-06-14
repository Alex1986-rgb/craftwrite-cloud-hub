
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({
        title: "Спасибо!",
        description: "Ваша заявка отправлена — мы свяжемся с вами в течение дня.",
      });
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
    }, 1200);
  }

  return (
    <section className="py-12 max-w-xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-playfair font-bold text-center mb-4">Контакты</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-card rounded-2xl shadow-xl p-8 border border-primary/10"
        autoComplete="off"
      >
        <Input
          type="text"
          name="name"
          placeholder="Ваше имя"
          required
          value={form.name}
          onChange={handleChange}
          className="h-12 rounded-xl"
        />
        <Input
          type="email"
          name="email"
          placeholder="Email для связи"
          required
          value={form.email}
          onChange={handleChange}
          className="h-12 rounded-xl"
        />
        <Textarea
          name="message"
          placeholder="Ваш вопрос или пожелание"
          rows={4}
          required
          value={form.message}
          onChange={handleChange}
          className="rounded-xl"
        />
        <Button type="submit" size="lg" className="mt-2 rounded-xl shadow" disabled={loading}>
          {loading ? "Отправка..." : "Отправить"}
        </Button>
      </form>
      <p className="text-sm text-muted-foreground text-center mt-3">
        Или напишите на&nbsp;
        <a href="mailto:hello@copypro.cloud" className="underline hover:text-primary">
          hello@copypro.cloud
        </a>
      </p>
    </section>
  );
};

export default ContactSection;
