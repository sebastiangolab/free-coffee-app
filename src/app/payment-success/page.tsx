"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SuccessPaymentMessage from "@/components/SuccessPaymentMessage";
import { PaymentIntent } from "@stripe/stripe-js";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(
    null
  );

  useEffect(() => {
    const paymentIntentId = searchParams.get("payment_intent");

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
  }, [searchParams]);

  if (!paymentIntent) {
    return null;
  }

  return <SuccessPaymentMessage paymentId={""} />;
}
