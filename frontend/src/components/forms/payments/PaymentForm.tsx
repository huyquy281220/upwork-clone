"use client";

import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: "Huy Nguyen", // m replace bằng user name
      },
    });

    if (error) {
      console.log("[Stripe Error]", error);
    } else {
      console.log("[PaymentMethod Created]", paymentMethod);
      // Gửi paymentMethod.id về backend để attach hoặc charge
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Save Card
      </button>
    </form>
  );
};

export default PaymentForm;
