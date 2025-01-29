import React, { FormEvent, ReactElement, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Layout } from "@stripe/stripe-js";

const CheckoutForm = (): ReactElement => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // eslint-disable-next-line camelcase
        return_url: `${process.env.BASE_URL}payment-success`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  if (!stripe || !elements) {
    return <h1>...Loading</h1>;
  }

  const options = {
    paymentMethodOrder: [
      "cards",
      "apple_pay",
      "google_pay",
      "blik",
      "p24",
      "customer_balance",
    ],
    layout: "accordion" as Layout,
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement options={options} id="payment-element" />

      <button type="submit" disabled={isLoading || !stripe || !elements}>
        <span>{isLoading ? "spinner" : "Pay now"}</span>
      </button>

      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
