import React from "react";
import styles from "./Layout.module.css";
import Header from "./Header";
type Props = {
  children?: JSX.Element | JSX.Element[];
};

function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.items__container}>{children}</main>
    </div>
  );
}

export default Layout;
