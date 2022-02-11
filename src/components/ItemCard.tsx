import React from "react";
import styles from "./ItemCard.module.css";
import imgPicker from "../utils/imgPicker";
import formatType from "../utils/typeFormat";
import formatConnection from "../utils/connectionFormat";
type Props = {
  name: string;
  type: string;
  connection: string;
  onClick: () => void;
};

function ItemCard({ name, type, connection, onClick }: Props) {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.card__header}>
        <img
          src={imgPicker(type)}
          className={styles.image__wrapper}
          alt={`${formatType(type)} icon`}
        />
        <h3 className={styles.title}>{name}</h3>
      </div>
      <div className={styles.card__info}>
        <p className={styles.type__paragraph}>{formatType(type)}</p>
        <p className={styles[`connection__paragraph--${connection}`]}>
          {formatConnection(connection)}
        </p>
      </div>
    </div>
  );
}

export default ItemCard;
