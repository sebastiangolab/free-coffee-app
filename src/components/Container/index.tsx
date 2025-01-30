"use client";

import React, { ReactElement, ReactNode } from "react";
import styles from "./container.module.css";

type ContainerProps = {
  children: ReactNode;
};

const Container = ({
  children,
}: ContainerProps): ReactElement<ContainerProps> => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

export default Container;
