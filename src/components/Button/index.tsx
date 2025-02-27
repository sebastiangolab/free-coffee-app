"use client";

import React, { ReactElement, ReactNode } from "react";
import Link from "next/link";
import { BarLoader } from "react-spinners";
import styles from "./button.module.css";

type ButtonProps = {
  children: ReactNode;
  title: string;
  href?: string;
  onClick?: () => void;
  isSubmitButton?: boolean;
  disabled?: boolean;
  isFullWidth?: boolean;
};

const Button = ({
  children,
  title,
  href,
  onClick,
  isSubmitButton,
  disabled,
  isFullWidth,
}: ButtonProps): ReactElement<ButtonProps> | null => {
  const buttonClassNames = `${styles.button} ${isFullWidth ? styles.fullWidth : ""} ${disabled ? styles.disabled : ""}`;

  if (href) {
    return (
      <Link href={href} title={title} className={buttonClassNames}>
        {children}
      </Link>
    );
  }

  if (onClick || isSubmitButton) {
    return (
      <button
        type={isSubmitButton ? "submit" : undefined}
        onClick={onClick}
        title={title}
        disabled={disabled}
        className={buttonClassNames}
      >
        {disabled ? <BarLoader color="#fff" /> : children}
      </button>
    );
  }

  return null;
};

export default Button;
