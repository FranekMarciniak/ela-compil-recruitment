import React from "react";
import styles from "./ItemCard.module.css";
import Bulb from "../images/lightbulb-line.svg";

type Props = {};

function ItemCard({}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.card__header}>
        <img src={Bulb} className={styles.image__wrapper} />
        <h3 className={styles.title}>Smart Temperature Sensor</h3>
      </div>
      <div className={styles.card__info}>
        <p className={styles.type__paragraph}>temperatureSensor</p>
        <p className={styles.connection__paragraph}>poorConnection</p>
      </div>
    </div>
  );
}

export default ItemCard;
