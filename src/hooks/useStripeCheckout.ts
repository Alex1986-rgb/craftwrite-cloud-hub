
import { useState } from "react";
import { createStripeCheckoutSession } from "@/api/payments";
import { toast } from "sonner";

type CheckoutResult = {
  loading: boolean;
  handleStripeCheckout: (priceId: string) => Promise<void>;
};

/**
 * Custom hook to initiate Stripe Checkout flow.
 * Business logic is handled in src/api/payments.ts.
 * It now uses toast notifications for error feedback.
 */
export function useStripeCheckout(): CheckoutResult {
  const [loading, setLoading] = useState(false);

  const handleStripeCheckout = async (priceId: string) => {
    setLoading(true);

    const { url, error: apiError } = await createStripeCheckoutSession({
      priceId,
      successUrl: `${window.location.origin}/payment-success`,
      cancelUrl: `${window.location.origin}/payment-cancelled`,
    });

    if (url) {
      // Open Stripe checkout in a new tab
      window.open(url, '_blank');
    } else {
      toast.error(apiError || "Ошибка при создании платежа. Попробуйте позже.");
    }
    
    setLoading(false);
  };

  return { loading, handleStripeCheckout };
}
