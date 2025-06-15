
import { OrderFormProvider, useOrderForm } from '@/contexts/OrderFormContext';
import { OrderFormLayout } from './OrderFormLayout';
import OrderFormHeader from './OrderFormHeader';
import OrderFormSteps from './OrderFormSteps';
import OrderSelectedService from './OrderSelectedService';
import { OrderFormContent } from './OrderFormContent';
import { OrderFormNavigation } from './OrderFormNavigation';
import { OrderFormSidebar } from './OrderFormSidebar';

interface UnifiedOrderFormProps {
  variant?: 'public' | 'client';
  onOrderCreated?: () => void;
}

function OrderFormContentWrapper({ variant, onOrderCreated }: UnifiedOrderFormProps) {
  const { form, currentStep, completedSteps } = useOrderForm();
  
  const {
    renderStepContent,
    handleSubmit,
    estimatedPrice,
    deliveryTime,
    loading,
    isFormValid
  } = OrderFormContent({ variant, onOrderCreated });

  const navigation = (
    <OrderFormNavigation
      variant={variant}
      loading={loading}
      isFormValid={isFormValid}
      onSubmit={handleSubmit}
    />
  );

  const sidebar = (
    <OrderFormSidebar
      variant={variant}
      estimatedPrice={estimatedPrice}
      deliveryTime={deliveryTime}
    />
  );

  return (
    <>
      {variant === 'public' && <OrderFormHeader />}
      
      {variant === 'client' && (
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-4">Новый заказ</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Создайте заказ на написание текстов с предзаполненными данными
          </p>
        </div>
      )}
      
      <OrderFormSteps currentStep={currentStep} completedSteps={completedSteps} />

      {form.service && currentStep > 2 && (
        <OrderSelectedService 
          serviceName={form.service}
        />
      )}

      <OrderFormLayout
        variant={variant}
        sidebar={sidebar}
        navigation={navigation}
      >
        {renderStepContent()}
      </OrderFormLayout>
    </>
  );
}

export default function UnifiedOrderForm(props: UnifiedOrderFormProps) {
  return (
    <OrderFormProvider>
      <OrderFormContentWrapper {...props} />
    </OrderFormProvider>
  );
}
