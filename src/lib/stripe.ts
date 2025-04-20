// src/lib/stripe.ts
import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  "pk_test_51R5t9ZG6fi6a6EKHj546szZs8r5TowiIT04Xlh5F6PG1CcWWEXiMuCLNEzbyHogK4h3tILi4bjObwE9PJ2zgzN1c00Cg0FFWmy"
);
