"use client";

import React, { ReactElement, ReactNode } from "react";
import Link from "next/link";
import styles from "./container.module.css";

type ContainerProps = {
  children: ReactNode;
  isSuccessPage?: boolean;
};

const Container = ({
  children,
  isSuccessPage,
}: ContainerProps): ReactElement<ContainerProps> => {
  return (
    <div
      className={`${styles.wrapper} ${isSuccessPage ? styles.successPageContainer : ""}`}
    >
      <div className={styles.container}>{children}</div>

      <Link
        className={styles.mobileAuthorText}
        href="https://sebastiangolab.pl/"
        target="_blank"
        title="Sebastian Golab page"
      >
        By Sebastian Golab
      </Link>
    </div>
  );
};

export default Container;
