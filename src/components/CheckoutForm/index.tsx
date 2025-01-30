import React, { FormEvent, ReactElement, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Layout, StripePaymentElementOptions } from "@stripe/stripe-js";
import Button from "../Button";
import styles from "./checkoutForm.module.css";

const paymentElementOptions: StripePaymentElementOptions = {
  paymentMethodOrder: [
    "card",
    "apple_pay",
    "google_pay",
    "blik",
    "p24",
    "customer_balance",
  ],
  layout: "accordion" as Layout,
};

type CheckoutFormProps = {
  setIsCheckoutLoading: (value: boolean) => void;
};

const CheckoutForm = ({
  setIsCheckoutLoading,
}: CheckoutFormProps): ReactElement<CheckoutFormProps> => {
  const stripe = useStripe();
  const elements = useElements();

  const [isConfirmPaymentLoading, setIsConfirmPaymentLoading] =
    useState<boolean>(false);

  const [paymentErrorMessage, setPaymentErrorMessage] = useState<string | null>(
    null
  );

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsConfirmPaymentLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `/payment-success?payment_intent={CHECKOUT_SESSION_ID}`,
      },
    });

    if (error) {
      setPaymentErrorMessage(error.message || null);
    }

    setIsConfirmPaymentLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className={styles.demoMessage}>
        This is demo payment checkout,{" "}
        <strong>it not take your money :)</strong>
      </p>

      <div className={styles.paymentElementWrapper}>
        <PaymentElement
          options={paymentElementOptions}
          id="payment-element"
          onReady={() => setIsCheckoutLoading(false)}
        />
      </div>

      <Button
        isSubmitButton
        disabled={isConfirmPaymentLoading}
        title="Finalize payment"
        isFullWidth
      >
        Finalize payment
      </Button>

      {paymentErrorMessage ? (
        <div className={styles.errorMessage}>{paymentErrorMessage}</div>
      ) : null}
    </form>
  );
};

export default CheckoutForm;
