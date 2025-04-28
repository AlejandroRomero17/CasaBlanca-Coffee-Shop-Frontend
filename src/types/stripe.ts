// src/types/stripe.ts

import { PaymentIntent } from "@stripe/stripe-js";

/**
 * Extensión del PaymentIntent de Stripe para incluir campos opcionales
 * que pueden venir desde el backend o webhooks.
 */
export interface ExtendedPaymentIntent extends PaymentIntent {
  amount_received?: number;
  charges?: {
    data: Array<{
      receipt_url?: string;
    }>;
  };
}
