
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
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-white/85 to-background py-10 px-2 md:px-4">
        <Seo
          title="Оформить заказ — CopyPro Cloud"
          description="Заполните форму заказа на тексты: копирайтинг для бизнеса, сайтов, маркетинга. Свяжемся быстро, работаем профессионально!"
        />
        <form
          onSubmit={handleSubmit}
          className="relative bg-card max-w-xl w-full space-y-4 p-8 rounded-2xl shadow-2xl border border-muted/20 animate-scale-in"
          autoComplete="off"
          aria-label="Форма заказа текста"
        >
          <OrderProgressBar
            progress={calcProgress()}
            flash={showProgressFlash}
            onFlashEnd={() => setShowProgressFlash(false)}
          />
          <OrderFormHeader />
          <div className="mx-auto flex flex-col items-center -mt-3 mb-3 animate-fade-in">
            <span className="rounded-full border border-muted bg-muted/30 text-foreground px-3 py-1 text-sm font-semibold shadow flex items-center gap-1 hover:scale-105 transition-transform duration-200 animate-scale-in">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="inline-block mr-1 text-yellow-500">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M15 8l-5.5 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {form.service}
            </span>
          </div>
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
            />
            <Input
              type="email"
              name="email"
              placeholder="Ваш email"
              required
              value={form.email}
              className="mt-2"
              onChange={handleChange}
              aria-label="Ваш email"
            />
            <span className="text-xs text-muted-foreground ml-1">На этот email придёт подтверждение заказа</span>
          </div>
          <div>
            <Input
              placeholder="Найти услугу…"
              className="mb-2"
              value={serviceFilter}
              onChange={e => setServiceFilter(e.target.value)}
              aria-label="Найти услугу"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
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
            <div className="pb-2 pt-1 border-t border-dashed border-muted animate-fade-in">
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
            rows={3}
            required
            value={form.details}
            onChange={handleChange}
            className="mt-2"
            aria-label="Комментарий или задание"
          />
          <span className="text-xs text-muted-foreground ml-1">
            Здесь можно добавить детали, пожелания или ссылку на готовое ТЗ.
          </span>
          <Button
            type="submit"
            size="lg"
            className={`w-full mt-4 shadow-lg text-lg transition-all duration-200 
                        ${loading ? "bg-green-400 animate-pulse cursor-not-allowed" : "hover:scale-105"}`}
            disabled={loading}
            aria-busy={loading}
            aria-label="Отправить заказ"
          >
            {loading ? (
              <>
                <svg className="animate-spin mr-2" width="20" height="20" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="4" opacity="0.1" />
                  <path d="M12 2a10 10 0 1 0 10 10" stroke="#fff" strokeWidth="4" />
                </svg>
                Отправка...
              </>
            ) : "Отправить заказ"}
          </Button>
          <div className="text-xs text-muted-foreground text-center mt-1">
            Нажимая, вы даёте согласие на обработку персональных данных
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Order;

