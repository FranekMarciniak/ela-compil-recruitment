import React, { useEffect, useState } from "react";
import { ICords } from "../types/Cords";
import Interactive from "../utils/Interactive";
import styles from "./CardModal.module.css";
type Props = { open: boolean };

function CardModal({ open }: Props) {
  const [cords, setCords] = useState<ICords>({
    x_drag: "150",
    y_drag: "100",
    x_resize: "0",
    y_resize: "0",
    width: "250",
    height: "250",
  });
  useEffect(() => {
    console.log("first");
  }, [open]);
  return (
    <>
      {open && (
        <Interactive cords={cords} setCords={setCords}>
          <div className={styles.resizable}>
            <p>OMG INTERACTIVE</p>
          </div>
        </Interactive>
      )}
    </>
  );
}

export default CardModal;
