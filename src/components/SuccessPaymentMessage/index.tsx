import React, { ReactElement } from "react";
import { PaymentIntent } from "@stripe/stripe-js";
import Button from "../Button";
import Container from "../Container";
import styles from "./successPaymentMessage.module.css";

type SuccessPaymentMessageProps = {
  paymentIntent: PaymentIntent | null;
};

const SuccessPaymentMessage = ({
  paymentIntent,
}: SuccessPaymentMessageProps): ReactElement<SuccessPaymentMessageProps> => {
  return (
    <Container isSuccessPage>
      <div className={styles.wrapper}>
        {paymentIntent ? (
          <p className={styles.idText}>Stripe payment id: {paymentIntent.id}</p>
        ) : null}

        <h1 className={styles.title}>Thank you</h1>
        <h2 className={styles.subtitle}>Enjoy your day :)</h2>

        <Button href="/" title="back to checkout page">
          Back to payment checkout
        </Button>
      </div>
    </Container>
  );
};

export default SuccessPaymentMessage;
