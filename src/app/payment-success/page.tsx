"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SuccessPaymentMessage from "@/components/SuccessPaymentMessage";
import { PaymentIntent } from "@stripe/stripe-js";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(
    null
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(router.asPath);
    const paymentIntentId = urlParams.get("payment_intent");

    if (paymentIntentId) {
      fetch(`/api/payment-intent/${paymentIntentId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setPaymentIntent(data));
    }
  }, [router.asPath]);

  if (!paymentIntent) {
    return null;
  }

  return <SuccessPaymentMessage paymentId={""} />;
}
