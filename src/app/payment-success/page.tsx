"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SuccessPaymentMessage from "@/components/SuccessPaymentMessage";
import { PaymentIntent } from "@stripe/stripe-js";

const PaymentSuccessElement = () => {
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
  }, []);

  return <SuccessPaymentMessage paymentIntent={paymentIntent} />;
};

export default function PaymentSuccessPage() {
  return (
    <Suspense>
      <PaymentSuccessElement />
    </Suspense>
  );
}
