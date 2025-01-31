import React, { ReactElement } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { PaymentIntent } from "@stripe/stripe-js";
import Button from "../Button";
import Container from "../Container";
import styles from "./successPaymentMessage.module.css";

type SuccessPaymentMessageProps = {
  isPaymentSucceeded: boolean;
  paymentIntent: PaymentIntent | null;
};

const SuccessPaymentMessage = ({
  isPaymentSucceeded,
  paymentIntent,
}: SuccessPaymentMessageProps): ReactElement<SuccessPaymentMessageProps> | null => {
  const paymentSucceededMessage = (
    <>
      <h1 className={styles.title}>Thank you</h1>
      <h2 className={styles.subtitle}>Enjoy your day :)</h2>
    </>
  );

  const paymentFailedMessage = (
    <>
      <h1 className={styles.title}>Payment failed</h1>
      <h2 className={styles.subtitle}>something went wrong :C</h2>
    </>
  );

  const messageElement = (
    <>
      <p className={styles.idText}>Payment id: {paymentIntent?.id}</p>

      {isPaymentSucceeded ? paymentSucceededMessage : paymentFailedMessage}

      <Button href="/" title="back to checkout page">
        Back to payment checkout
      </Button>
    </>
  );

  return (
    <Container isSuccessPage>
      <div className={styles.wrapper}>
        {!paymentIntent ? <ClipLoader /> : messageElement}
      </div>
    </Container>
  );
};

export default SuccessPaymentMessage;
