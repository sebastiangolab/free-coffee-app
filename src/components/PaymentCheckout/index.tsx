"use client";

import { useEffect, useState } from "react";
import CheckoutForm from "@/components/CheckoutForm";
import { staticAmountCents } from "@/config";
import { Elements } from "@stripe/react-stripe-js";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import styles from "./paymentCheckout.module.css";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
  throw Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  { locale: "en" }
);

const stripeElementsAppreance: Appearance = {
  variables: {
    fontSizeBase: "17px",
  },
};

const PaymentCheckout = () => {
  const [clientSecret, setClientSecret] = useState<string>();

  const [isCheckoutLoading, setIsCheckoutLoading] = useState(true);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: staticAmountCents }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const paymentElements = (
    <Elements
      options={{
        clientSecret: clientSecret,
        appearance: stripeElementsAppreance,
      }}
      stripe={stripePromise}
    >
      <CheckoutForm setIsCheckoutLoading={setIsCheckoutLoading} />
    </Elements>
  );

  return (
    <div className={styles.wrapper}>
      {isCheckoutLoading ? (
        <p className={styles.loadingMessage}>Loading...</p>
      ) : null}

      <div className={isCheckoutLoading ? styles.hidden : undefined}>
        {clientSecret ? paymentElements : null}
      </div>
    </div>
  );
};

export default PaymentCheckout;
