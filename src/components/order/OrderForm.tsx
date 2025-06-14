
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useOrderForm } from "@/hooks/useOrderForm";
import OrderFormHeader from "./OrderFormHeader";
import OrderProgressBar from "./OrderProgressBar";
import OrderSelectedService from "./OrderSelectedService";
import OrderServiceCard from "./OrderServiceCard";
import OrderQuestionGroup from "./OrderQuestionGroup";
import OrderEmailHint from "./OrderEmailHint";
import OrderConsent from "./OrderConsent";

export default function OrderForm() {
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

  const [progress, setProgress] = useState(0);
  const [flashProgress, setFlashProgress] = useState(false);

  // Calculate progress based on form completion
  const calculateProgress = () => {
    let completed = 0;
    const total = 4; // name, email, service, details

    if (form.name.trim()) completed++;
    if (form.email.trim()) completed++;
    if (form.service) completed++;
    if (form.details.trim()) completed++;

    return Math.round((completed / total) * 100);
  };

  const currentProgress = calculateProgress();
  if (currentProgress !== progress) {
    setProgress(currentProgress);
    if (currentProgress > progress) {
      setFlashProgress(true);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <OrderFormHeader />
      
      <OrderProgressBar 
        progress={progress} 
        flash={flashProgress}
        onFlashEnd={() => setFlashProgress(false)}
      />

      {form.service && (
        <OrderSelectedService serviceName={form.service} />
      )}

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Ваше имя *</Label>
              <Input
                ref={nameInputRef}
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Введите ваше имя"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
              <OrderEmailHint />
            </div>
          </div>

          {/* Service Selection */}
          <div className="space-y-4">
            <Label>Выберите услугу *</Label>
            <Input
              placeholder="Поиск услуг..."
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
              {filteredServices.map((service) => (
                <OrderServiceCard
                  key={service}
                  service={service}
                  isSelected={form.service === service}
                  onSelect={handleServiceSelect}
                />
              ))}
            </div>
          </div>

          {/* Additional Questions */}
          {currentQuestions.length > 0 && (
            <OrderQuestionGroup
              questions={currentQuestions}
              values={form.additional}
              onChange={handleAdditionalChange}
            />
          )}

          {/* Project Details */}
          <div className="space-y-2">
            <Label htmlFor="details">Подробности проекта *</Label>
            <Textarea
              id="details"
              name="details"
              value={form.details}
              onChange={handleChange}
              placeholder="Опишите ваш проект, цели, требования..."
              rows={4}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="space-y-3">
            <Button
              type="submit"
              disabled={loading || progress < 100}
              className="w-full"
              size="lg"
            >
              {loading ? "Отправляем..." : "Отправить заказ"}
            </Button>
            <OrderConsent />
          </div>
        </form>
      </Card>
    </div>
  );
}
