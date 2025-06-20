
/**
 * API helpers for payment-related functions.
 */
export async function createStripeCheckoutSession({
  priceId,
  successUrl,
  cancelUrl
}: {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<{ url?: string; error?: string }> {
  try {
    const res = await fetch("/functions/v1/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priceId,
        successUrl,
        cancelUrl,
      }),
    });
    if (!res.ok) {
      const error = await res.text();
      return { error };
    }
    return await res.json();
  } catch (error: any) {
    return { error: error?.message || "Network error" };
  }
}
