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

// Улучшенные стили кнопки и формы добавлены в Tailwind-классы

const Order = () => {
  // Весь стейт и обработчики вынесены в useOrderForm
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
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent via-background to-muted py-14 px-2 md:px-4 font-inter transition-all">
        <Seo
          title="Оформить заказ — CopyPro Cloud"
          description="Заполните форму заказа на тексты: копирайтинг для бизнеса, сайтов, маркетинга. Свяжемся быстро, работаем профессионально!"
        />
        <form
          onSubmit={handleSubmit}
          className="relative bg-card max-w-2xl w-full space-y-8 p-10 rounded-3xl shadow-xl border border-muted/30 animate-scale-in transition-all"
          autoComplete="off"
          aria-label="Форма заказа текста"
        >
          <OrderProgressBar
            progress={calcProgress()}
            flash={showProgressFlash}
            onFlashEnd={() => setShowProgressFlash(false)}
          />
          <OrderFormHeader />
          <OrderSelectedService serviceName={form.service} />
          <div>
            <Input
              name="name"
              placeholder="Ваше имя"
              required
              value={form.name}
              onChange={handleChange}
              autoFocus
              ref={nameInputRef}
              aria-label="Ваше имя"
              className="h-12 text-lg placeholder:font-normal"
            />
            <Input
              type="email"
              name="email"
              placeholder="Ваш e-mail"
              required
              value={form.email}
              className="mt-4 h-12 text-lg placeholder:font-normal"
              onChange={handleChange}
              aria-label="Ваш e-mail"
            />
            <OrderEmailHint />
          </div>
          <div>
            <Input
              placeholder="Найти услугу…"
              className="mb-2 h-11"
              value={serviceFilter}
              onChange={e => setServiceFilter(e.target.value)}
              aria-label="Найти услугу"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
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
          {currentQuestions.length > 0 && (
            <div className="pb-3 pt-2 border-t border-dashed border-muted animate-fade-in">
              <span className="text-xs font-semibold text-muted-foreground mb-2 inline-block animate-fade-in">
                {form.service}: уточните детали
              </span>
              <OrderQuestionGroup
                questions={currentQuestions}
                answers={form.additional}
                onChange={handleAdditionalChange}
              />
            </div>
          )}
          <Textarea
            name="details"
            placeholder="Комментарий, пожелания или ссылка на ТЗ"
            rows={4}
            required
            value={form.details}
            onChange={handleChange}
            className="mt-4 text-base"
            aria-label="Комментарий или задание"
          />
          <span className="text-xs text-muted-foreground ml-1">
            Здесь можно добавить детали, пожелания или ссылку на готовое ТЗ.
          </span>
          <Button
            type="submit"
            size="lg"
            className={`w-full mt-7 shadow-xl rounded-xl text-xl font-bold tracking-tight py-4 transition-all duration-200
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
