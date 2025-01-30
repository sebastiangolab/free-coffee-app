import React, { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import CoffeeCupImage from "@/images/coffee-cup.png";
import styles from "./content.module.css";

const Content = (): ReactElement => {
  return (
    <div className={styles.content}>
      <h1 className={styles.title}>Free Coffee</h1>

      <h2 className={styles.subtitle}>
        for me, only <strong>1 euro</strong>
      </h2>

      <Image
        className={styles.image}
        src={CoffeeCupImage}
        alt={"coffee cup"}
        width={384}
        height={384}
      />

      <Link
        className={styles.authorText}
        href="https://sebastiangolab.pl/"
        title="Sebastian Golab page"
      >
        By Sebastian Golab
      </Link>
    </div>
  );
};

export default Content;
