"use client";

import { useEffect, useState } from "react";
import SuccessPaymentMessage from "@/components/SuccessPaymentMessage";
import { useStripe } from "@stripe/react-stripe-js";

export default function PaymentSuccessPage() {
  const stripe = useStripe();
  const [paymentId, setPaymentId] = useState<string | null>(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        return;
      }

      setPaymentId(paymentIntent.id);
    });
  }, [stripe]);

  if (!paymentId) {
    return null;
  }

  return <SuccessPaymentMessage paymentId={paymentId ?? ""} />;
}
