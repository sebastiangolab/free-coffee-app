import React, { ReactElement } from "react";
import Button from "../Button";
import Container from "../Container";
import styles from "./successPaymentMessage.module.css";

type SuccessPaymentMessageProps = {
  paymentId: string;
};

const SuccessPaymentMessage = ({
  paymentId,
}: SuccessPaymentMessageProps): ReactElement<SuccessPaymentMessageProps> => {
  return (
    <Container isSuccessPage>
      <div className={styles.wrapper}>
        <p className={styles.idText}>Stripe payment id: {paymentId}</p>

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
