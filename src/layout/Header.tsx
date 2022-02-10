import React from "react";
import styles from "./Header.module.css";
type Props = {};

function Header({}: Props) {
  return (
    <header className={styles.container}>
      <h1 className={styles.title}>Smart home demo</h1>
    </header>
  );
}

export default Header;
