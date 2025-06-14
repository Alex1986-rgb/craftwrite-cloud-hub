
import { useState } from "react";
import { createStripeCheckoutSession } from "@/api/payments";

type CheckoutResult = {
  loading: boolean;
  error: string | null;
  handleStripeCheckout: (priceId: string) => Promise<void>;
};

/**
 * Custom hook to initiate Stripe Checkout flow.
 * Business logic is handled in src/api/payments.ts.
 */
export function useStripeCheckout(): CheckoutResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStripeCheckout = async (priceId: string) => {
    setLoading(true);
    setError(null);

    const { url, error: apiError } = await createStripeCheckoutSession({
      priceId,
      successUrl: `${window.location.origin}/payment-success`,
      cancelUrl: `${window.location.origin}/payment-cancelled`,
    });

    if (url) {
      window.location.href = url;
    } else {
      setError(apiError || "Ошибка при создании платежа. Попробуйте позже.");
      setLoading(false);
    }
  };

  return { loading, error, handleStripeCheckout };
}
