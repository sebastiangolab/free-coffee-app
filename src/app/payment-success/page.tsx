"use client";

import { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";

export default function PaymentSuccessPage() {
  const stripe = useStripe();
  const [intentId, setIntentId] = useState<string | null>(null);

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

      setIntentId(paymentIntent.id);
    });
  }, [stripe]);

  return <div>is ok, id: {intentId}</div>;
}
