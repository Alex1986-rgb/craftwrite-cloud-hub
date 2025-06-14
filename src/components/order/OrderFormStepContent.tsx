
import { OrderFormState } from "@/types/orderForm";
import OrderFormContact from "./OrderFormContact";
import OrderFormService from "./OrderFormService";
import OrderFormDetails from "./OrderFormDetails";
import OrderFormDeadline from "./OrderFormDeadline";
import OrderFormAdvanced from "./OrderFormAdvanced";
import OrderFormSummary from "./OrderFormSummary";

interface OrderFormStepContentProps {
  currentStep: number;
  form: OrderFormState;
  nameInputRef: React.RefObject<HTMLInputElement>;
  availableServices: string[];
  selectedService: any;
  estimatedPrice: number;
  deliveryTime: string;
  handleFormChange: (updates: any) => void;
}

export default function OrderFormStepContent({
  currentStep,
  form,
  nameInputRef,
  availableServices,
  selectedService,
  estimatedPrice,
  deliveryTime,
  handleFormChange
}: OrderFormStepContentProps) {
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <OrderFormContact
            form={form}
            handleChange={(e) => handleFormChange({ [e.target.name]: e.target.value })}
            nameInputRef={nameInputRef}
            formProgress={0}
          />
        );
      
      case 2:
        return (
          <OrderFormService
            filteredServices={availableServices}
            selectedService={form.service || ""}
            onServiceSelect={(service) => handleFormChange({ service })}
          />
        );
      
      case 3:
        return (
          <OrderFormDetails
            details={form.details || ""}
            handleChange={(e) => handleFormChange({ [e.target.name]: e.target.value })}
          />
        );
      
      case 4:
        return (
          <div className="space-y-8">
            <OrderFormDeadline
              selectedDeadline={form.deadline || ""}
              onDeadlineChange={(deadline) => handleFormChange({ deadline })}
            />
            
            <OrderFormAdvanced
              additionalServices={form.additionalServices || []}
              onAdditionalServicesChange={(additionalServices) => handleFormChange({ additionalServices })}
              targetAudience={form.targetAudience || ""}
              onTargetAudienceChange={(targetAudience) => handleFormChange({ targetAudience })}
              seoKeywords={form.seoKeywords || ""}
              onSeoKeywordsChange={(seoKeywords) => handleFormChange({ seoKeywords })}
              preferredStyle={form.preferredStyle || ""}
              onPreferredStyleChange={(preferredStyle) => handleFormChange({ preferredStyle })}
              additionalRequirements={form.additionalRequirements || ""}
              onAdditionalRequirementsChange={(additionalRequirements) => handleFormChange({ additionalRequirements })}
            />
          </div>
        );
      
      case 5:
        return (
          <OrderFormSummary
            service={form.service || ""}
            deadline={form.deadline || ""}
            estimatedPrice={estimatedPrice}
            deliveryTime={deliveryTime}
            clientName={form.name || ""}
            clientEmail={form.email || ""}
            details={form.details || ""}
            serviceDetails={selectedService}
            onEdit={() => {}}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[400px]">
      {renderStepContent()}
    </div>
  );
}
