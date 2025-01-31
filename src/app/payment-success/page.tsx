"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import SuccessPaymentMessage from "@/components/SuccessPaymentMessage";
import { PaymentIntent } from "@stripe/stripe-js";

const PaymentSuccessElement = () => {
  const searchParams = useSearchParams();

  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(
    null,
  );

  const redirectStatus = searchParams.get("redirect_status");
  const isPaymentSucceeded = redirectStatus === "succeeded";

  useEffect(() => {
    const paymentIntentId = searchParams.get("payment_intent");

    if (paymentIntentId) {
      fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/payment-intent/${paymentIntentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
        .then((response) => response.json())
        .then((data) => setPaymentIntent(data));
    }
  }, []);

  return (
    <SuccessPaymentMessage
      isPaymentSucceeded={isPaymentSucceeded}
      paymentIntent={paymentIntent}
    />
  );
};

export default function PaymentSuccessPage() {
  return (
    <Suspense>
      <PaymentSuccessElement />
    </Suspense>
  );
}
