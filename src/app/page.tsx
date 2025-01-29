"use client";

import { useEffect, useState } from "react";
import { NextResponse } from "next/server";
import CheckoutForm from "@/components/CheckoutForm";
import { staticAmountCents } from "@/config";
import { Elements } from "@stripe/react-stripe-js";
import {
  loadStripe,
  StripeElementsOptionsClientSecret,
} from "@stripe/stripe-js";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  { locale: "en" }
);

export default function HomePage() {
  const [clientSecret, setClientSecret] = useState<string>();

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: staticAmountCents }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const options: StripeElementsOptionsClientSecret = {
    clientSecret: clientSecret,
  };

  if (!clientSecret) {
    return <h1>isLoading...</h1>;
  }

  return (
    <div>
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
