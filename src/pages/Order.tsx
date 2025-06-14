import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import Seo from "@/components/Seo";

const SERVICES = [
  "SEO-статья",
  "Описание товара",
  "Текст для соцсетей",
  "Продающий текст",
  "Лендинг",
  "E-mail рассылка",
  "Уникальный заказ",
];

const Order = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: SERVICES[0],
    details: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast({
        title: "Заказ отправлен!",
        description: "Мы получили ваш запрос и свяжемся с вами в течение 1 рабочего дня.",
      });
      setForm({
        name: "",
        email: "",
        service: SERVICES[0],
        details: "",
      });
      setLoading(false);
    }, 1300);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background py-10 px-4">
      <Seo
        title="Оформить заказ — CopyPro Cloud"
        description="Заполните форму заказа на тексты: копирайтинг для бизнеса, сайтов, маркетинга. Свяжемся быстро, работаем профессионально!"
      />
      <form
        onSubmit={handleSubmit}
        className="bg-card max-w-md w-full space-y-4 p-8 rounded-xl shadow-md"
        autoComplete="off"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">Оформить заказ</h1>
        <Input
          name="name"
          placeholder="Ваше имя"
          required
          value={form.name}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Ваш email"
          required
          value={form.email}
          onChange={handleChange}
        />
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className="border-input bg-background rounded-md px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {SERVICES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <Textarea
          name="details"
          placeholder="Опишите задание или пришлите ссылку на ТЗ"
          rows={4}
          required
          value={form.details}
          onChange={handleChange}
        />
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "Отправка..." : "Отправить заказ"}
        </Button>
      </form>
    </main>
  );
};

export default Order;
