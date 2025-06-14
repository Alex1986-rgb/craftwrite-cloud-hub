
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Seo from "@/components/Seo";
import OrderServiceCard from "@/components/order/OrderServiceCard";
import OrderQuestionGroup from "@/components/order/OrderQuestionGroup";
import OrderFormHeader from "@/components/order/OrderFormHeader";
import OrderProgressBar from "@/components/order/OrderProgressBar";
import { useOrderProgress } from "@/hooks/useOrderProgress";
import { useOrderForm } from "@/hooks/useOrderForm";
import OrderSelectedService from "@/components/order/OrderSelectedService";
import OrderEmailHint from "@/components/order/OrderEmailHint";
import OrderConsent from "@/components/order/OrderConsent";

// NEW: главная зона формы с мягким градиентом и большими отступами
const Order = () => {
  const {
    form,
    loading,
    serviceFilter,
    setServiceFilter,
    filteredServices,
    handleServiceSelect,
    handleAdditionalChange,
    handleChange,
    handleSubmit,
    currentQuestions,
    nameInputRef,
  } = useOrderForm();

  const { calcProgress, showProgressFlash, setShowProgressFlash } = useOrderProgress(form);

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center order-bg-blur py-16 px-2 md:px-4 transition-all duration-300">
        <Seo
          title="Оформить заказ — CopyPro Cloud"
          description="Заполните форму заказа на тексты: копирайтинг для бизнеса, сайтов, маркетинга. Свяжемся быстро, работаем профессионально!"
        />
        <form
          onSubmit={handleSubmit}
          className="relative max-w-2xl w-full space-y-9 px-0 sm:px-8 py-12 rounded-3xl shadow-form-xl border border-muted/30 animate-scale-in bg-card transition-all duration-300"
          autoComplete="off"
          aria-label="Форма заказа текста"
        >
          {/* ИНДИКАТОР ПРОГРЕССА */}
          <OrderProgressBar
            progress={calcProgress()}
            flash={showProgressFlash}
            onFlashEnd={() => setShowProgressFlash(false)}
          />

          {/* ЗАГОЛОВОК */}
          <OrderFormHeader />

          {/* ВЫБРАННАЯ УСЛУГА */}
          <OrderSelectedService serviceName={form.service} />

          {/* ОСНОВНЫЕ ПОЛЯ */}
          <div className="flex flex-col gap-5">
            <Input
              name="name"
              placeholder="Ваше имя"
              required
              value={form.name}
              onChange={handleChange}
              autoFocus
              ref={nameInputRef}
              aria-label="Ваше имя"
              className="h-12 text-lg placeholder:font-normal rounded-xl border border-primary/20 focus:border-brand-accent transition"
            />
            <Input
              type="email"
              name="email"
              placeholder="Ваш e-mail"
              required
              value={form.email}
              className="h-12 text-lg placeholder:font-normal rounded-xl border border-primary/20 focus:border-brand-accent transition"
              onChange={handleChange}
              aria-label="Ваш e-mail"
            />
            <OrderEmailHint />
          </div>

          {/* ВЫБОР УСЛУГИ */}
          <div>
            <Input
              placeholder="Найти услугу…"
              className="mb-2 h-11 rounded-xl border-muted shadow-sm"
              value={serviceFilter}
              onChange={e => setServiceFilter(e.target.value)}
              aria-label="Найти услугу"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
              {filteredServices.map((s) => (
                <OrderServiceCard
                  key={s}
                  label={s}
                  active={form.service === s}
                  onClick={() => handleServiceSelect(s)}
                />
              ))}
            </div>
          </div>

          {/* ДОПОЛНИТЕЛЬНЫЕ ВОПРОСЫ */}
          {currentQuestions.length > 0 && (
            <div className="pb-4 pt-2 border-t border-dashed border-muted animate-fade-in">
              <span className="text-xs font-semibold text-brand-accent mb-2 inline-block animate-fade-in">
                {form.service}: уточните детали
              </span>
              <OrderQuestionGroup
                questions={currentQuestions}
                answers={form.additional}
                onChange={handleAdditionalChange}
              />
            </div>
          )}

          {/* КОММЕНТАРИЙ */}
          <Textarea
            name="details"
            placeholder="Комментарий, пожелания или ссылка на ТЗ"
            rows={4}
            required
            value={form.details}
            onChange={handleChange}
            className="mt-2 text-base rounded-xl border border-primary/20 focus:border-brand-accent transition"
            aria-label="Комментарий или задание"
          />
          <span className="text-xs text-muted-foreground ml-1 block">
            Здесь можно добавить детали, пожелания или ссылку на готовое ТЗ.
          </span>

          {/* КНОПКА */}
          <Button
            type="submit"
            size="lg"
            className={`w-full mt-5 shadow-xl rounded-xl text-xl font-bold tracking-tight py-4 transition-all duration-200
                        ${loading ? "bg-green-400 animate-pulse cursor-not-allowed" : "hover:scale-105 hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-primary"}`}
            disabled={loading}
            aria-busy={loading}
            aria-label="Отправить заказ"
          >
            {loading ? (
              <>
                <svg className="animate-spin mr-2" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="4" opacity="0.1" />
                  <path d="M12 2a10 10 0 1 0 10 10" stroke="#fff" strokeWidth="4" />
                </svg>
                Отправка...
              </>
            ) : "Оформить заказ"}
          </Button>
          <OrderConsent />
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Order;
