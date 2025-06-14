
import { useState } from "react";

type CheckoutResult = {
  loading: boolean;
  error: string | null;
  handleStripeCheckout: () => Promise<void>;
};

/**
 * Custom hook to initiate Stripe Checkout flow.
 */
export function useStripeCheckout(): CheckoutResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStripeCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      // Call the edge function to create a Stripe Checkout Session
      const res = await fetch("/functions/v1/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: "price_67890",
          successUrl: `${window.location.origin}/payment-success`,
          cancelUrl: `${window.location.origin}/payment-cancelled`,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Ошибка при создании платежа. Попробуйте позже.");
      }
    } catch (e) {
      setError("Ошибка соединения. Проверьте сеть.");
    }
    setLoading(false);
  };

  return { loading, error, handleStripeCheckout };
}
