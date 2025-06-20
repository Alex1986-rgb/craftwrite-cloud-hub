
import { supabase } from "@/integrations/supabase/client";

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
    const { data, error } = await supabase.functions.invoke("create-payment", {
      body: {
        priceId,
        successUrl,
        cancelUrl,
      },
    });

    if (error) {
      console.error("Supabase function error:", error);
      return { error: error.message };
    }

    return data;
  } catch (error: any) {
    console.error("Network error:", error);
    return { error: error?.message || "Network error" };
  }
}
