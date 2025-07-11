"use client";

import { ChildrenProps } from "@/types";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function StripeElementWrapper({ children }: ChildrenProps) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}
